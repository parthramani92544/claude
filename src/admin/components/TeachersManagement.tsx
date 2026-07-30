import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Phone,
  Mail,
  MessageSquare,
  Edit2,
  Trash2,
  X,
  BookOpen,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { AdminTeacher, AdminRole, ScheduledClass } from '../types';

interface TeachersManagementProps {
  teachers: AdminTeacher[];
  classes: ScheduledClass[];
  currentRole: AdminRole;
  onAddTeacher: (teacher: AdminTeacher) => void;
  onUpdateTeacher: (teacher: AdminTeacher) => void;
  onDeleteTeacher: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const TeachersManagement: React.FC<TeachersManagementProps> = ({
  teachers,
  classes,
  currentRole,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  addToast,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<AdminTeacher | null>(null);

  const isAuditor = currentRole === 'Auditor';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    title: 'Guruji',
    mobile: '',
    email: '',
    assignedLevels: [] as string[],
    assignedBatches: [] as string[],
    status: 'Active' as 'Active' | 'Inactive',
  });

  const availableLevels = ['Level 1 - Prarambhik', 'Level 2 - Madhyamik', 'Level 3 - Shravak Junior'];
  const availableBatches = ['Batch A - Weekend Morning', 'Batch B - Weekend Evening'];

  const openAddModal = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      title: 'Guruji',
      mobile: '',
      email: '',
      assignedLevels: ['Level 1 - Prarambhik'],
      assignedBatches: ['Batch A - Weekend Morning'],
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: AdminTeacher) => {
    if (isAuditor) {
      addToast('warning', 'Access Restricted', 'View-Only Auditors cannot edit teacher profiles.');
      return;
    }
    setEditingTeacher(t);
    setFormData({
      name: t.name,
      title: t.title,
      mobile: t.mobile,
      email: t.email,
      assignedLevels: [...t.assignedLevels],
      assignedBatches: [...t.assignedBatches],
      status: t.status,
    });
    setIsModalOpen(true);
  };

  const handleToggleLevel = (lvl: string) => {
    if (formData.assignedLevels.includes(lvl)) {
      setFormData({
        ...formData,
        assignedLevels: formData.assignedLevels.filter((l) => l !== lvl),
      });
    } else {
      setFormData({
        ...formData,
        assignedLevels: [...formData.assignedLevels, lvl],
      });
    }
  };

  const handleToggleBatch = (bat: string) => {
    if (formData.assignedBatches.includes(bat)) {
      setFormData({
        ...formData,
        assignedBatches: formData.assignedBatches.filter((b) => b !== bat),
      });
    } else {
      setFormData({
        ...formData,
        assignedBatches: [...formData.assignedBatches, bat],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    if (editingTeacher) {
      onUpdateTeacher({
        ...editingTeacher,
        ...formData,
      });
      addToast('success', 'Teacher Updated', `Updated workload and allocations for ${formData.name}`);
    } else {
      const newTeacher: AdminTeacher = {
        id: `TCH-${Math.floor(10 + Math.random() * 90)}`,
        ...formData,
        classesConducted: 0,
      };
      onAddTeacher(newTeacher);
      addToast('success', 'Teacher Created', `Enrolled ${newTeacher.name} into Pathshala faculty.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (t: AdminTeacher) => {
    if (isAuditor) return;

    // Check if teacher is assigned to scheduled classes
    const activeAssignedClasses = classes.filter(
      (c) => c.teacherId === t.id && (c.status === 'Scheduled' || c.status === 'LIVE NOW')
    );

    if (activeAssignedClasses.length > 0) {
      addToast(
        'error',
        'Cannot Delete Faculty Member',
        `${t.name} is assigned to ${activeAssignedClasses.length} upcoming live class(es). Reassign classes first.`
      );
      return;
    }

    onDeleteTeacher(t.id);
    addToast('info', 'Teacher Removed', `Removed ${t.name} from faculty directory.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Teachers & Gurujis Directory</h1>
        </div>

        {!isAuditor && (
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Faculty Member</span>
          </button>
        )}
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#163E2B]">{t.id}</span>
                  <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t.title}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                    t.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              {/* Workload Badges */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Assigned Levels</span>
                  <div className="flex flex-wrap gap-1">
                    {t.assignedLevels.map((lvl, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-[#163E2B] text-[10px] font-semibold border border-amber-200">
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Assigned Batches</span>
                  <div className="flex flex-wrap gap-1">
                    {t.assignedBatches.map((bat, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-semibold border border-slate-200">
                        {bat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-slate-500">
                  <span>Classes Conducted:</span>
                  <span className="font-bold text-slate-900">{t.classesConducted} sessions</span>
                </div>
              </div>
            </div>

            {/* Direct Communication & Actions Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${t.mobile}`}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-md text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                  title="Call Instructor"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                </a>
                <a
                  href={`https://wa.me/${t.mobile.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-md text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                  title="WhatsApp Message"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                </a>
                <a
                  href={`mailto:${t.email}`}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-md text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#163E2B]" />
                </a>
              </div>

              {!isAuditor && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-[#163E2B] border border-slate-200 rounded-md cursor-pointer transition-colors"
                    title="Edit Faculty"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    className="p-1.5 bg-slate-50 hover:bg-rose-50 text-rose-600 border border-slate-200 rounded-md cursor-pointer transition-colors"
                    title="Delete Faculty"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingTeacher ? `Edit Teacher: ${editingTeacher.name}` : 'Add New Faculty Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Full Name & Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rajvi Ben Shah"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Role / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Senior Guruji"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="teacher@jainpathshala.org"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">
                  Assigned Pathshala Levels
                </label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {availableLevels.map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                      <input
                        type="checkbox"
                        checked={formData.assignedLevels.includes(lvl)}
                        onChange={() => handleToggleLevel(lvl)}
                        className="rounded border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">
                  Assigned Batch Slots
                </label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {availableBatches.map((bat) => (
                    <label key={bat} className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                      <input
                        type="checkbox"
                        checked={formData.assignedBatches.includes(bat)}
                        onChange={() => handleToggleBatch(bat)}
                        className="rounded border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                      />
                      <span>{bat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
