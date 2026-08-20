import React, { useState } from 'react';
import {
  Video,
  Plus,
  Play,
  Calendar,
  Clock,
  Link,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Users,
} from 'lucide-react';
import { ScheduledClass, AdminTeacher, AdminRole } from '../types';

interface LiveClassesProps {
  classes: ScheduledClass[];
  teachers: AdminTeacher[];
  currentRole: AdminRole;
  onAddClass: (cls: ScheduledClass) => void;
  onUpdateClass: (cls: ScheduledClass) => void;
  onDeleteClass: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const LiveClasses: React.FC<LiveClassesProps> = ({
  classes,
  teachers,
  currentRole,
  onAddClass,
  onUpdateClass,
  onDeleteClass,
  addToast,
}) => {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ScheduledClass | null>(null);

  const isAuditor = currentRole === 'Auditor';

  const formatToDisplayDateTime = (dateStr: string, timeStr: string) => {
    if (!dateStr) return '';
    if (!timeStr) return dateStr;
    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    const formattedH = h < 10 ? `0${h}` : `${h}`;
    return `${dateStr} ${formattedH}:${m} ${ampm}`;
  };

  const parseDateTimeString = (dtStr: string) => {
    if (!dtStr) return { date: '2026-07-26', time: '10:00' };
    const parts = dtStr.trim().split(' ');
    const datePart = parts[0] || '2026-07-26';
    if (parts.length >= 2) {
      const timePart = parts[1];
      const ampm = parts[2]?.toUpperCase();
      const [hStr, mStr] = timePart.split(':');
      let h = parseInt(hStr, 10);
      const m = mStr || '00';
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      const hh = h < 10 ? `0${h}` : `${h}`;
      return { date: datePart, time: `${hh}:${m}` };
    }
    return { date: datePart, time: '10:00' };
  };

  const [formData, setFormData] = useState({
    title: '',
    level: 'Level 1 - Prarambhik',
    batch: 'Batch A - Weekend Morning',
    teacherId: teachers[0]?.id || 'TCH-01',
    classType: 'Regular' as 'Regular' | 'General',
    date: '2026-07-26',
    time: '10:00',
    durationMinutes: 60,
    meetingLink: 'https://zoom.us/j/98234123415',
    status: 'Scheduled' as 'LIVE NOW' | 'Scheduled' | 'Completed' | 'Cancelled',
  });

  const filteredClasses = classes.filter((c) => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  const openAddModal = () => {
    setEditingClass(null);
    setFormData({
      title: '',
      level: 'Level 1 - Prarambhik',
      batch: 'Batch A - Weekend Morning',
      teacherId: teachers[0]?.id || 'TCH-01',
      classType: 'Regular',
      date: '2026-07-26',
      time: '10:00',
      durationMinutes: 60,
      meetingLink: 'https://zoom.us/j/98234123415',
      status: 'Scheduled',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cls: ScheduledClass) => {
    if (isAuditor) return;
    setEditingClass(cls);
    const { date, time } = parseDateTimeString(cls.dateTime);
    setFormData({
      title: cls.title,
      level: cls.level,
      batch: cls.batch,
      teacherId: cls.teacherId,
      classType: cls.classType,
      date,
      time,
      durationMinutes: cls.durationMinutes,
      meetingLink: cls.meetingLink,
      status: cls.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const matchedTeacher = teachers.find((t) => t.id === formData.teacherId);
    const teacherName = matchedTeacher ? matchedTeacher.name : 'Assigned Instructor';
    const formattedDateTime = formatToDisplayDateTime(formData.date, formData.time);

    if (editingClass) {
      onUpdateClass({
        ...editingClass,
        title: formData.title,
        level: formData.level,
        batch: formData.batch,
        teacherId: formData.teacherId,
        teacherName,
        classType: formData.classType,
        dateTime: formattedDateTime,
        durationMinutes: formData.durationMinutes,
        meetingLink: formData.meetingLink,
        status: editingClass.status || 'Scheduled',
      });
      addToast('success', 'Class Schedule Updated', `Updated live class details for ${formData.title}`);
    } else {
      const newCls: ScheduledClass = {
        id: `CLS-${Math.floor(500 + Math.random() * 500)}`,
        title: formData.title,
        level: formData.level,
        batch: formData.batch,
        teacherId: formData.teacherId,
        teacherName,
        classType: formData.classType,
        dateTime: formattedDateTime,
        durationMinutes: formData.durationMinutes,
        meetingLink: formData.meetingLink,
        status: 'Scheduled',
        registeredCount: 30,
      };
      onAddClass(newCls);
      addToast('success', 'Class Scheduled', `Scheduled ${newCls.title} for ${newCls.dateTime}`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Live Video Classes & Broadcasts</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium px-3 py-2 rounded-lg focus:outline-none focus:border-[#163E2B] focus:bg-white"
          >
            <option value="ALL">All Session Statuses</option>
            <option value="LIVE NOW">LIVE NOW Only</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>

          {!isAuditor && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Live Class</span>
            </button>
          )}
        </div>
      </div>

      {/* Classes Schedule Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Class Title & Type</th>
                <th className="py-2.5 px-4 font-bold">Target Level & Batch</th>
                <th className="py-2.5 px-4 font-bold">Assigned Instructor</th>
                <th className="py-2.5 px-4 font-bold">Date & Duration</th>
                <th className="py-2.5 px-4 font-bold">Registered</th>
                <th className="py-2.5 px-4 font-bold">Status</th>
                <th className="py-2.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {filteredClasses.map((cls) => {
                const isLive = cls.status === 'LIVE NOW';
                return (
                  <tr key={cls.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-[#163E2B] shrink-0" />
                        <div>
                          <div>{cls.title}</div>
                          <div className="text-[10px] font-mono font-normal text-[#163E2B]">{cls.id} • {cls.classType} Class</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-semibold">{cls.level}</div>
                      <div className="text-[10px] text-slate-500">{cls.batch}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{cls.teacherName}</td>
                    <td className="py-3 px-4 font-mono text-slate-700 text-[11px]">
                      <div>{cls.dateTime}</div>
                      <div className="text-[10px] text-slate-500">{cls.durationMinutes} minutes</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {cls.registeredCount} students
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase inline-flex items-center gap-1 ${
                          isLive
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : cls.status === 'Scheduled'
                            ? 'bg-amber-50 text-[#163E2B] border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />}
                        <span>{cls.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={cls.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => addToast('info', 'Video Launcher', `Launching session for ${cls.title}`)}
                          className="px-3 py-1 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-md transition-all inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{isLive ? 'Join Live' : 'Launch'}</span>
                        </a>

                        {!isAuditor && (
                          <>
                            <button
                              onClick={() => openEditModal(cls)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-[#163E2B] border border-slate-200 rounded-md cursor-pointer transition-colors"
                              title="Edit Class"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteClass(cls.id)}
                              className="p-1.5 bg-slate-50 hover:bg-rose-50 text-rose-600 border border-slate-200 rounded-md cursor-pointer transition-colors"
                              title="Delete Class"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingClass ? `Edit Live Class: ${editingClass.id}` : 'Schedule Live Video Class'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Class Topic / Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Sutra Navtatva Chapter 4"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Super Category: Batch Slot
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
                    <option value="Batch A & B Combined">Batch A & B Combined</option>
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
                    <option value="All Levels">All Levels (Assembly)</option>
                    {(formData.batch === 'Batch A & B Combined' || formData.batch === 'Batch A - Weekend Morning') && (
                      <>
                        <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                        <option value="Level 3 - Shravak Junior">Level 3 - Shravak Junior</option>
                      </>
                    )}
                    {(formData.batch === 'Batch A & B Combined' || formData.batch === 'Batch B - Weekend Evening') && (
                      <option value="Level 2 - Madhyamik">Level 2 - Madhyamik</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Assigned Instructor</label>
                  <select
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.title})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Class Category</label>
                  <select
                    value={formData.classType}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Regular">Regular Class</option>
                    <option value="General">General Assembly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Zoom / Google Meet URL</label>
                <input
                  type="text"
                  required
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
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
                  Save Class Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
