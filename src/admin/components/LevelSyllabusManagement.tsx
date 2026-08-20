import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Eye,
  X,
  Search,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { AcademicLevel, AcademicBatch, AdminRole } from '../types';

interface LevelSyllabusManagementProps {
  levels: AcademicLevel[];
  batches?: AcademicBatch[];
  currentRole: AdminRole;
  onAddLevel: (lvl: AcademicLevel) => void;
  onUpdateLevel: (lvl: AcademicLevel) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const LevelSyllabusManagement: React.FC<LevelSyllabusManagementProps> = ({
  levels,
  batches = [],
  currentRole,
  onAddLevel,
  onUpdateLevel,
  addToast,
}) => {
  const isAuditor = currentRole === 'Auditor';

  // Level Search & State
  const [levelSearch, setLevelSearch] = useState('');
  const [viewingLevelModal, setViewingLevelModal] = useState<AcademicLevel | null>(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<AcademicLevel | null>(null);
  const [levelForm, setLevelForm] = useState({
    code: '',
    name: '',
    description: '',
    minAge: 5,
    maxAge: 10,
    prerequisite: 'None',
  });

  // Filtered levels to display in table
  const displayedLevels = levels.filter((lvl) => {
    if (!levelSearch) return true;
    const q = levelSearch.toLowerCase();
    return (
      lvl.name.toLowerCase().includes(q) ||
      lvl.code.toLowerCase().includes(q) ||
      (lvl.description && lvl.description.toLowerCase().includes(q)) ||
      (lvl.prerequisite && lvl.prerequisite.toLowerCase().includes(q))
    );
  });

  // Level Create/Edit Handlers
  const openAddLevel = () => {
    setEditingLevel(null);
    setLevelForm({
      code: `LVL-0${levels.length + 1}`,
      name: `Level ${levels.length + 1}`,
      description: '',
      minAge: 5,
      maxAge: 12,
      prerequisite: 'None',
    });
    setIsLevelModalOpen(true);
  };

  const openEditLevel = (lvl: AcademicLevel) => {
    if (isAuditor) return;
    setEditingLevel(lvl);
    setLevelForm({
      code: lvl.code,
      name: lvl.name,
      description: lvl.description || '',
      minAge: lvl.minAge,
      maxAge: lvl.maxAge,
      prerequisite: lvl.prerequisite || 'None',
    });
    setIsLevelModalOpen(true);
  };

  const handleLevelFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    if (editingLevel) {
      const updated: AcademicLevel = {
        ...editingLevel,
        ...levelForm,
      };
      onUpdateLevel(updated);
      addToast('success', 'Level Updated', `Updated details for ${levelForm.name}`);
    } else {
      const newLevel: AcademicLevel = {
        id: `LVL-${Math.floor(100 + Math.random() * 900)}`,
        ...levelForm,
        enrolledCount: 0,
        syllabus: [],
      };
      onAddLevel(newLevel);
      addToast('success', 'Level Created', `Created ${newLevel.name}`);
    }
    setIsLevelModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#163E2B]/10 border border-[#163E2B]/20 flex items-center justify-center text-[#163E2B]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Level Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure academic levels, student age guidelines, prerequisites, and progression standards.
            </p>
          </div>
        </div>

        {!isAuditor && (
          <button
            onClick={openAddLevel}
            className="px-4 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Level</span>
          </button>
        )}
      </div>

      {/* Search and Level Count Bar */}
      <div className="bg-white border border-stone-200/90 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={levelSearch}
            onChange={(e) => setLevelSearch(e.target.value)}
            placeholder="Search by level name, code, description, or prerequisite..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-stone-50 border border-stone-200/80 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-600">
            <span>Total Levels:</span>
            <strong className="text-slate-900 font-bold ml-1.5">
              {displayedLevels.length} Level{displayedLevels.length !== 1 ? 's' : ''}
            </strong>
          </div>
        </div>
      </div>

      {/* Levels Table */}
      <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
            Academic Levels Directory ({displayedLevels.length})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Pathshala progressive learning framework
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-bold">Level Name & Code</th>
                <th className="py-3 px-4 font-bold">Age Bracket</th>
                <th className="py-3 px-4 font-bold">Prerequisite</th>
                <th className="py-3 px-4 font-bold">Enrollment</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
              {displayedLevels.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-slate-700 text-sm">No levels found</p>
                    <p className="text-xs text-slate-500">Try adjusting your search criteria or create a new level.</p>
                  </td>
                </tr>
              ) : (
                displayedLevels.map((lvl) => {
                  return (
                    <tr key={lvl.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Level Name & Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#163E2B]/10 text-[#163E2B] border border-[#163E2B]/20 shrink-0">
                            {lvl.code}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{lvl.name}</div>
                            {lvl.description && (
                              <span className="text-[10px] text-slate-500 line-clamp-1 max-w-xs">{lvl.description}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Age Group */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                        {lvl.minAge} - {lvl.maxAge} Years
                      </td>

                      {/* Prerequisite */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-slate-700 border border-stone-200">
                          {lvl.prerequisite || 'None'}
                        </span>
                      </td>

                      {/* Enrollment */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Users className="w-3.5 h-3.5 text-[#163E2B]" />
                          <span>{lvl.enrolledCount} Students</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Active</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingLevelModal(lvl)}
                            title="View Level Details"
                            className="p-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-lg cursor-pointer inline-flex items-center justify-center transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {!isAuditor && (
                            <button
                              onClick={() => openEditLevel(lvl)}
                              title="Edit Level"
                              className="p-2 bg-stone-100 hover:bg-stone-200 text-[#163E2B] rounded-lg cursor-pointer inline-flex items-center justify-center transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW LEVEL DETAILS MODAL */}
      {viewingLevelModal && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#163E2B] text-white">
                  {viewingLevelModal.code}
                </span>
                <h3 className="text-base font-bold text-slate-900">{viewingLevelModal.name}</h3>
              </div>
              <button
                onClick={() => setViewingLevelModal(null)}
                className="text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase">Enrolled Students</span>
                  <strong className="text-slate-900 font-bold text-sm">{viewingLevelModal.enrolledCount} Students</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase">Age Bracket</span>
                  <strong className="text-slate-900 font-bold text-sm">{viewingLevelModal.minAge} - {viewingLevelModal.maxAge} Years</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase">Prerequisite</span>
                  <strong className="text-slate-900 font-bold">{viewingLevelModal.prerequisite || 'None'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase">Status</span>
                  <strong className="text-emerald-700 font-bold">Active</strong>
                </div>
              </div>

              {viewingLevelModal.description && (
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase mb-1">Description</span>
                  <p className="bg-white p-3 rounded-lg border border-stone-200 text-slate-800 leading-relaxed">
                    {viewingLevelModal.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end items-center">
              <button
                onClick={() => setViewingLevelModal(null)}
                className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT LEVEL MODAL */}
      {isLevelModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingLevel ? `Edit Level: ${editingLevel.code}` : 'Create New Pathshala Level'}
              </h3>
              <button
                onClick={() => setIsLevelModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLevelFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Level Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={levelForm.name}
                  onChange={(e) => setLevelForm({ ...levelForm, name: e.target.value })}
                  placeholder="e.g. Level 1 - Prarambhik"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Short Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={levelForm.description}
                  onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })}
                  placeholder="Overview of level learning objectives and topics..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Min Age (Years) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={levelForm.minAge}
                    onChange={(e) => setLevelForm({ ...levelForm, minAge: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Max Age (Years) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={levelForm.maxAge}
                    onChange={(e) => setLevelForm({ ...levelForm, maxAge: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Level Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={levelForm.code}
                    onChange={(e) => setLevelForm({ ...levelForm, code: e.target.value })}
                    placeholder="e.g. LVL-01"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Prerequisite
                  </label>
                  <input
                    type="text"
                    value={levelForm.prerequisite}
                    onChange={(e) => setLevelForm({ ...levelForm, prerequisite: e.target.value })}
                    placeholder="e.g. None or Level 1"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsLevelModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Level
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
