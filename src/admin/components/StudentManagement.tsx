import React, { useState } from 'react';
import {
  Search,
  Filter,
  UserPlus,
  Download,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  X,
  Check,
  Edit2,
  Trash2,
  CheckSquare,
  Square,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { AdminStudent, AdminRole } from '../types';

interface StudentManagementProps {
  students: AdminStudent[];
  currentRole: AdminRole;
  onAddStudent: (student: AdminStudent) => void;
  onUpdateStudent: (student: AdminStudent) => void;
  onDeleteStudent: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  currentRole,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  addToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [batchFilter, setBatchFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Bulk selection
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Modals
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AdminStudent | null>(null);
  const [viewingProfileStudent, setViewingProfileStudent] = useState<AdminStudent | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    dob: '2015-01-01',
    gender: 'Male' as 'Male' | 'Female',
    mobile: '',
    parentMobile: '',
    email: '',
    address: '',
    level: 'Level 1 - Prarambhik',
    batch: 'Batch A - Weekend Morning',
    isAttendingPathshala: true,
  });

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      `${s.firstName} ${s.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentMobile.includes(searchQuery);

    const matchesLevel = levelFilter === 'ALL' || s.level === levelFilter;
    const matchesBatch = batchFilter === 'ALL' || s.batch === batchFilter;
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

    return matchesSearch && matchesLevel && matchesBatch && matchesStatus;
  });

  const isAuditor = currentRole === 'Auditor';

  // Handlers
  const handleSelectAll = () => {
    if (selectedStudentIds.length === filteredStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredStudents.map((s) => s.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter((sid) => sid !== id));
    } else {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({
      firstName: '',
      surname: '',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      dob: '2015-01-01',
      gender: 'Male',
      mobile: '',
      parentMobile: '',
      email: '',
      address: '',
      level: 'Level 1 - Prarambhik',
      batch: 'Batch A - Weekend Morning',
      isAttendingPathshala: true,
    });
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (stu: AdminStudent) => {
    if (isAuditor) {
      addToast('warning', 'Access Restricted', 'View-Only Auditors cannot edit records.');
      return;
    }
    setEditingStudent(stu);
    setFormData({
      firstName: stu.firstName,
      surname: stu.surname,
      photoUrl: stu.photoUrl,
      dob: stu.dob,
      gender: stu.gender,
      mobile: stu.mobile,
      parentMobile: stu.parentMobile,
      email: stu.email,
      address: stu.address,
      level: stu.level,
      batch: stu.batch,
      isAttendingPathshala: stu.isAttendingPathshala,
    });
    setIsAddEditModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    if (editingStudent) {
      const updated: AdminStudent = {
        ...editingStudent,
        ...formData,
      };
      onUpdateStudent(updated);
      addToast('success', 'Student Updated', `Successfully updated profile for ${updated.firstName} ${updated.surname}`);
    } else {
      const newStu: AdminStudent = {
        id: `STU-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        attendanceRate: 100,
        totalGathas: 0,
        pointsBalance: 50,
        status: 'Active',
        registrationDate: new Date().toISOString().split('T')[0],
      };
      onAddStudent(newStu);
      addToast('success', 'Student Created', `New student ${newStu.firstName} ${newStu.surname} enrolled with ID ${newStu.id}`);
    }
    setIsAddEditModalOpen(false);
  };

  // Bulk Operations
  const handleBulkStatusToggle = () => {
    if (isAuditor) return;
    selectedStudentIds.forEach((id) => {
      const stu = students.find((s) => s.id === id);
      if (stu) {
        onUpdateStudent({
          ...stu,
          status: stu.status === 'Active' ? 'Inactive' : 'Active',
        });
      }
    });
    addToast('success', 'Bulk Action Complete', `Toggled status for ${selectedStudentIds.length} selected students.`);
    setSelectedStudentIds([]);
  };

  const handleBulkCSVExport = () => {
    const csvHeader = 'ID,First Name,Surname,Mobile,Parent Mobile,Level,Batch,Attendance %,Points,Status\n';
    const csvRows = filteredStudents
      .map(
        (s) =>
          `${s.id},${s.firstName},${s.surname},${s.mobile},${s.parentMobile},"${s.level}","${s.batch}",${s.attendanceRate},${s.pointsBalance},${s.status}`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pathshala_Student_Directory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addToast('info', 'CSV Download Initiated', `Exported ${filteredStudents.length} student records.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Management Directory</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleBulkCSVExport}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#163E2B]" />
            <span>Export CSV</span>
          </button>
          {!isAuditor && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, ID or Mobile..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white"
            />
          </div>

          {/* Super Category: Batch Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
              Super Category: Batch
            </label>
            <select
              value={batchFilter}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                setLevelFilter('ALL');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
            >
              <option value="ALL">All Batches (Super Category)</option>
              <option value="Batch A - Weekend Morning">Batch A - Weekend Morning</option>
              <option value="Batch B - Weekend Evening">Batch B - Weekend Evening</option>
            </select>
          </div>

          {/* Subcategory: Level Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
              Subcategory: Level
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-emerald-50/60 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-[#163E2B] font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
            >
              <option value="ALL">
                {batchFilter === 'ALL' ? 'All Levels' : `Levels in ${batchFilter}`}
              </option>
              {(batchFilter === 'ALL' || batchFilter === 'Batch A - Weekend Morning') && (
                <>
                  <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                  <option value="Level 3 - Shravak Junior">Level 3 - Shravak Junior</option>
                </>
              )}
              {(batchFilter === 'ALL' || batchFilter === 'Batch B - Weekend Evening') && (
                <option value="Level 2 - Madhyamik">Level 2 - Madhyamik</option>
              )}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Strip */}
        {selectedStudentIds.length > 0 && (
          <div className="bg-rose-50/80 border border-rose-200/80 p-3 rounded-lg flex items-center justify-between text-xs text-[#163E2B]">
            <span className="font-semibold">
              {selectedStudentIds.length} student(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkStatusToggle}
                className="px-3 py-1 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-md cursor-pointer text-xs"
              >
                Toggle Status (Active/Inactive)
              </button>
              <button
                onClick={() => setSelectedStudentIds([])}
                className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-md cursor-pointer text-xs"
              >
                Deselect All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Roster Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                  />
                </th>
                <th className="py-2.5 px-4 font-bold">Student ID & Name</th>
                <th className="py-2.5 px-4 font-bold">Parent Contact</th>
                <th className="py-2.5 px-4 font-bold">Level & Batch</th>
                <th className="py-2.5 px-4 text-center font-bold">Attendance Rate</th>
                <th className="py-2.5 px-4 text-center font-bold">Gathas</th>
                <th className="py-2.5 px-4 text-center font-bold">Points</th>
                <th className="py-2.5 px-4 font-bold">Status</th>
                <th className="py-2.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {filteredStudents.map((stu) => {
                const isSelected = selectedStudentIds.includes(stu.id);
                return (
                  <tr key={stu.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-rose-50/30' : ''}`}>
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(stu.id)}
                        className="rounded border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={stu.photoUrl} alt={stu.firstName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        <div>
                          <div
                            onClick={() => setViewingProfileStudent(stu)}
                            className="font-bold text-slate-900 hover:text-[#163E2B] cursor-pointer flex items-center gap-1"
                          >
                            <span>{stu.firstName} {stu.surname}</span>
                          </div>
                          <span className="text-[10px] font-mono font-semibold text-[#163E2B]">{stu.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-semibold">{stu.parentMobile}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{stu.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-semibold">{stu.level}</div>
                      <div className="text-[10px] text-slate-500">{stu.batch}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                          stu.attendanceRate >= 90
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : stu.attendanceRate >= 75
                            ? 'text-amber-700 bg-amber-50 border border-amber-200'
                            : 'text-rose-700 bg-rose-50 border border-rose-200'
                        }`}
                      >
                        {stu.attendanceRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                      {stu.totalGathas}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-700">
                      {stu.pointsBalance} pts
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                          stu.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {stu.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingProfileStudent(stu)}
                          className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold rounded-md cursor-pointer transition-colors"
                        >
                          Profile
                        </button>
                        {!isAuditor && (
                          <>
                            <button
                              onClick={() => openEditModal(stu)}
                              className="p-1 bg-slate-50 hover:bg-rose-50 text-[#163E2B] border border-slate-200 rounded-md cursor-pointer transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteStudent(stu.id)}
                              className="p-1 bg-slate-50 hover:bg-rose-100 text-rose-600 border border-slate-200 rounded-md cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-5 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingStudent ? `Edit Student: ${editingStudent.firstName} ${editingStudent.surname}` : 'Enroll New Student'}
              </h3>
              <button onClick={() => setIsAddEditModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Surname</label>
                  <input
                    type="text"
                    required
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Parent Mobile</label>
                  <input
                    type="text"
                    required
                    value={formData.parentMobile}
                    onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                    placeholder="+91 98200 00000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Student Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                    placeholder="student@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Super Category: Batch Slot Allocation
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) => {
                      const newBatch = e.target.value;
                      let defaultLvl = formData.level;
                      if (newBatch === 'Batch B - Weekend Evening') {
                        defaultLvl = 'Level 2 - Madhyamik';
                      } else if (newBatch === 'Batch A - Weekend Morning' && formData.level === 'Level 2 - Madhyamik') {
                        defaultLvl = 'Level 1 - Prarambhik';
                      }
                      setFormData({ ...formData, batch: newBatch, level: defaultLvl });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
                  >
                    <option value="Batch A - Weekend Morning">Batch A - Weekend Morning</option>
                    <option value="Batch B - Weekend Evening">Batch B - Weekend Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Subcategory: Level Allocation
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-emerald-50/60 border border-emerald-200 rounded-lg px-3 py-2 text-[#163E2B] font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
                  >
                    {formData.batch === 'Batch A - Weekend Morning' && (
                      <>
                        <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                        <option value="Level 3 - Shravak Junior">Level 3 - Shravak Junior</option>
                      </>
                    )}
                    {formData.batch === 'Batch B - Weekend Evening' && (
                      <option value="Level 2 - Madhyamik">Level 2 - Madhyamik</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Residential Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  placeholder="Full home address..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewing Detailed Profile Modal */}
      {viewingProfileStudent && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={viewingProfileStudent.photoUrl}
                  alt={viewingProfileStudent.firstName}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-[#163E2B]/30 shadow-xs"
                />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {viewingProfileStudent.firstName} {viewingProfileStudent.surname}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono font-bold text-[#163E2B]">{viewingProfileStudent.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {viewingProfileStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setViewingProfileStudent(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Parent Communication Triggers */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <a
                href={`tel:${viewingProfileStudent.parentMobile}`}
                className="p-2 bg-white hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Parent</span>
              </a>
              <a
                href={`https://wa.me/${viewingProfileStudent.parentMobile.replace(/[^0-9]/g, '')}?text=Jai%20Jinendra%20from%20Jain%20Pathshala!`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${viewingProfileStudent.email}`}
                className="p-2 bg-white hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#163E2B]" />
                <span>Email</span>
              </a>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Academic Level</span>
                <p className="font-bold text-slate-900">{viewingProfileStudent.level}</p>
                <p className="text-[11px] text-slate-600">{viewingProfileStudent.batch}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Attendance & Points</span>
                <p className="font-bold text-emerald-700">{viewingProfileStudent.attendanceRate}% Attendance</p>
                <p className="text-[11px] text-amber-700 font-bold">{viewingProfileStudent.pointsBalance} Reward Points</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 col-span-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Residential Address</span>
                <p className="font-medium text-slate-700">{viewingProfileStudent.address}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingProfileStudent(null)}
                className="px-5 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
