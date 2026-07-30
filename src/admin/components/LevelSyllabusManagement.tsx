import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  ArrowUp,
  ArrowDown,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Filter,
  Check,
} from 'lucide-react';
import { AcademicLevel, LevelSyllabusItem, SyllabusLearningType, AdminRole } from '../types';

interface LevelSyllabusManagementProps {
  levels: AcademicLevel[];
  currentRole: AdminRole;
  onAddLevel: (lvl: AcademicLevel) => void;
  onUpdateLevel: (lvl: AcademicLevel) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const LevelSyllabusManagement: React.FC<LevelSyllabusManagementProps> = ({
  levels,
  currentRole,
  onAddLevel,
  onUpdateLevel,
  addToast,
}) => {
  const isAuditor = currentRole === 'Auditor';

  // State for Level currently being managed in dedicated syllabus page
  const [selectedLevelForSyllabus, setSelectedLevelForSyllabus] = useState<AcademicLevel | null>(null);

  // Search & Filter for Syllabus Items
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  // Level Edit / View Modals
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

  // Syllabus Item Add/Edit Modal
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [editingSyllabusItem, setEditingSyllabusItem] = useState<LevelSyllabusItem | null>(null);
  const [syllabusForm, setSyllabusForm] = useState({
    chapterName: '',
    description: '',
    learningType: 'Sutra' as SyllabusLearningType,
    displayOrder: 1,
    status: 'Active' as 'Active' | 'Inactive',
  });

  // Level Create/Edit Handlers
  const openAddLevel = () => {
    setEditingLevel(null);
    setLevelForm({
      code: `LVL-${levels.length + 1}`,
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
      description: lvl.description,
      minAge: lvl.minAge,
      maxAge: lvl.maxAge,
      prerequisite: lvl.prerequisite,
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
      if (selectedLevelForSyllabus?.id === editingLevel.id) {
        setSelectedLevelForSyllabus(updated);
      }
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

  // Syllabus CRUD Handlers on selectedLevelForSyllabus
  const activeSyllabus = selectedLevelForSyllabus?.syllabus || [];

  const filteredSyllabusItems = activeSyllabus.filter((item) => {
    const matchesSearch =
      item.chapterName.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(syllabusSearch.toLowerCase()));
    const matchesType = typeFilter === 'ALL' || item.learningType === typeFilter;
    return matchesSearch && matchesType;
  });

  const openAddSyllabusItem = () => {
    setEditingSyllabusItem(null);
    const nextOrder = activeSyllabus.length + 1;
    setSyllabusForm({
      chapterName: '',
      description: '',
      learningType: 'Sutra',
      displayOrder: nextOrder,
      status: 'Active',
    });
    setIsSyllabusModalOpen(true);
  };

  const openEditSyllabusItem = (item: LevelSyllabusItem) => {
    if (isAuditor) return;
    setEditingSyllabusItem(item);
    setSyllabusForm({
      chapterName: item.chapterName,
      description: item.description || '',
      learningType: item.learningType,
      displayOrder: item.displayOrder,
      status: item.status,
    });
    setIsSyllabusModalOpen(true);
  };

  const handleSyllabusFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevelForSyllabus || isAuditor) return;

    const currentSyllabus = [...(selectedLevelForSyllabus.syllabus || [])];

    if (editingSyllabusItem) {
      const updatedSyllabus = currentSyllabus.map((item) =>
        item.id === editingSyllabusItem.id
          ? {
              ...item,
              chapterName: syllabusForm.chapterName,
              description: syllabusForm.description,
              learningType: syllabusForm.learningType,
              displayOrder: syllabusForm.displayOrder,
              status: syllabusForm.status,
            }
          : item
      );
      updatedSyllabus.sort((a, b) => a.displayOrder - b.displayOrder);

      const updatedLevel: AcademicLevel = {
        ...selectedLevelForSyllabus,
        syllabus: updatedSyllabus,
      };
      setSelectedLevelForSyllabus(updatedLevel);
      onUpdateLevel(updatedLevel);
      addToast('success', 'Syllabus Updated', `Updated "${syllabusForm.chapterName}"`);
    } else {
      const newItem: LevelSyllabusItem = {
        id: `SYL-${Date.now()}`,
        levelId: selectedLevelForSyllabus.id,
        chapterName: syllabusForm.chapterName,
        description: syllabusForm.description,
        learningType: syllabusForm.learningType,
        displayOrder: syllabusForm.displayOrder,
        status: syllabusForm.status,
      };
      const updatedSyllabus = [...currentSyllabus, newItem];
      updatedSyllabus.sort((a, b) => a.displayOrder - b.displayOrder);

      const updatedLevel: AcademicLevel = {
        ...selectedLevelForSyllabus,
        syllabus: updatedSyllabus,
      };
      setSelectedLevelForSyllabus(updatedLevel);
      onUpdateLevel(updatedLevel);
      addToast('success', 'Topic Added', `Added "${newItem.chapterName}" to ${selectedLevelForSyllabus.name}`);
    }

    setIsSyllabusModalOpen(false);
  };

  const handleDeleteSyllabusItem = (itemId: string) => {
    if (!selectedLevelForSyllabus || isAuditor) return;

    const updatedSyllabus = (selectedLevelForSyllabus.syllabus || [])
      .filter((item) => item.id !== itemId)
      .map((item, idx) => ({ ...item, displayOrder: idx + 1 }));

    const updatedLevel: AcademicLevel = {
      ...selectedLevelForSyllabus,
      syllabus: updatedSyllabus,
    };

    setSelectedLevelForSyllabus(updatedLevel);
    onUpdateLevel(updatedLevel);
    addToast('success', 'Item Deleted', 'Syllabus item removed from level.');
  };

  const handleToggleSyllabusStatus = (item: LevelSyllabusItem) => {
    if (!selectedLevelForSyllabus || isAuditor) return;

    const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
    const updatedSyllabus = (selectedLevelForSyllabus.syllabus || []).map((s) =>
      s.id === item.id ? { ...s, status: newStatus as 'Active' | 'Inactive' } : s
    );

    const updatedLevel: AcademicLevel = {
      ...selectedLevelForSyllabus,
      syllabus: updatedSyllabus,
    };

    setSelectedLevelForSyllabus(updatedLevel);
    onUpdateLevel(updatedLevel);
    addToast('info', 'Status Changed', `Topic "${item.chapterName}" is now ${newStatus}`);
  };

  const handleMoveSyllabusOrder = (index: number, direction: 'up' | 'down') => {
    if (!selectedLevelForSyllabus || isAuditor) return;

    const currentSyllabus = [...(selectedLevelForSyllabus.syllabus || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= currentSyllabus.length) return;

    // Swap items
    const temp = currentSyllabus[index];
    currentSyllabus[index] = currentSyllabus[targetIdx];
    currentSyllabus[targetIdx] = temp;

    // Normalize display orders
    const reordered = currentSyllabus.map((s, i) => ({
      ...s,
      displayOrder: i + 1,
    }));

    const updatedLevel: AcademicLevel = {
      ...selectedLevelForSyllabus,
      syllabus: reordered,
    };

    setSelectedLevelForSyllabus(updatedLevel);
    onUpdateLevel(updatedLevel);
    addToast('success', 'Order Changed', `Updated syllabus sequence for ${selectedLevelForSyllabus.name}`);
  };

  const getLearningTypeBadge = (type: SyllabusLearningType) => {
    switch (type) {
      case 'Sutra':
        return 'bg-[#163E2B]/10 text-[#163E2B] border-[#163E2B]/20';
      case 'Stavan':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Story':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Activity':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // =========================================================
  // RENDER DEDICATED MANAGE SYLLABUS PAGE
  // =========================================================
  if (selectedLevelForSyllabus) {
    return (
      <div className="space-y-6">
        {/* Top Header Navigation Bar */}
        <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedLevelForSyllabus(null)}
              className="p-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Levels</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#163E2B] text-white">
                  {selectedLevelForSyllabus.code}
                </span>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Manage Syllabus: {selectedLevelForSyllabus.name}
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure syllabus topics, order sequence, and learning types for this specific level.
              </p>
            </div>
          </div>

          {!isAuditor && (
            <button
              onClick={openAddSyllabusItem}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Syllabus Item</span>
            </button>
          )}
        </div>

        {/* Level Information Summary Box */}
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
          <span className="text-[10px] font-mono font-bold text-[#163E2B] uppercase tracking-wider block">
            Level Information Summary
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Level Code:</span>
              <strong className="text-slate-900 font-mono font-bold">{selectedLevelForSyllabus.code}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Age Bracket:</span>
              <strong className="text-slate-900 font-bold">{selectedLevelForSyllabus.minAge} - {selectedLevelForSyllabus.maxAge} Years</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Enrolled Students:</span>
              <strong className="text-slate-900 font-bold">{selectedLevelForSyllabus.enrolledCount} Students</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Prerequisite:</span>
              <strong className="text-slate-900 font-bold">{selectedLevelForSyllabus.prerequisite}</strong>
            </div>
          </div>

          {selectedLevelForSyllabus.description && (
            <div className="pt-2 border-t border-stone-200 text-xs text-slate-700 leading-relaxed">
              <strong>Description:</strong> {selectedLevelForSyllabus.description}
            </div>
          )}
        </div>

        {/* Assigned Syllabus Controls & List */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Assigned Syllabus Topics ({activeSyllabus.length})</h2>
              <p className="text-xs text-slate-500">Each Level has its own isolated syllabus structure.</p>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={syllabusSearch}
                  onChange={(e) => setSyllabusSearch(e.target.value)}
                  placeholder="Search topic or description..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Types</option>
                <option value="Sutra">Sutra</option>
                <option value="Stavan">Stavan</option>
                <option value="Story">Story</option>
                <option value="Activity">Activity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Syllabus Items Table / Empty State */}
          {filteredSyllabusItems.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 rounded-xl border border-dashed border-stone-200 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No syllabus items found</p>
              <p className="text-xs text-slate-500">
                {activeSyllabus.length === 0
                  ? 'No syllabus topics have been assigned to this level yet.'
                  : 'No topics match your current search/type filter.'}
              </p>
              {!isAuditor && (
                <button
                  onClick={openAddSyllabusItem}
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#163E2B] text-white text-xs font-bold rounded-xl hover:bg-[#0F2D1F] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Topic</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
                {filteredSyllabusItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors"
                  >
                    {/* Left: Order badge + Topic details */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 text-[#163E2B] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        #{item.displayOrder}
                      </span>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xs font-bold text-slate-900">{item.chapterName}</h3>

                          {/* Learning Type Badge */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getLearningTypeBadge(
                              item.learningType
                            )}`}
                          >
                            {item.learningType}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              item.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-stone-100 text-slate-500 border border-stone-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    {!isAuditor && (
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {/* Order Up */}
                        <button
                          onClick={() => handleMoveSyllabusOrder(index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1.5 bg-stone-50 hover:bg-stone-100 disabled:opacity-30 border border-stone-200 rounded-lg text-slate-600 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Order Down */}
                        <button
                          onClick={() => handleMoveSyllabusOrder(index, 'down')}
                          disabled={index === filteredSyllabusItems.length - 1}
                          title="Move Down"
                          className="p-1.5 bg-stone-50 hover:bg-stone-100 disabled:opacity-30 border border-stone-200 rounded-lg text-slate-600 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Toggle Status */}
                        <button
                          onClick={() => handleToggleSyllabusStatus(item)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg border cursor-pointer transition-colors ${
                            item.status === 'Active'
                              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>

                        {/* Edit Item */}
                        <button
                          onClick={() => openEditSyllabusItem(item)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-[#163E2B] border border-stone-200 text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Item */}
                        <button
                          onClick={() => handleDeleteSyllabusItem(item.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg cursor-pointer"
                          title="Delete Topic"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ADD / EDIT SYLLABUS ITEM MODAL */}
        {isSyllabusModalOpen && (
          <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-base font-bold text-slate-900">
                  {editingSyllabusItem ? 'Edit Syllabus Topic' : 'Add New Syllabus Topic'}
                </h3>
                <button
                  onClick={() => setIsSyllabusModalOpen(false)}
                  className="text-slate-400 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSyllabusFormSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Topic Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={syllabusForm.chapterName}
                    onChange={(e) => setSyllabusForm({ ...syllabusForm, chapterName: e.target.value })}
                    placeholder="e.g., Navkar Mantra - Verse 1 & Pronunciation"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                      Learning Type
                    </label>
                    <select
                      value={syllabusForm.learningType}
                      onChange={(e) =>
                        setSyllabusForm({ ...syllabusForm, learningType: e.target.value as SyllabusLearningType })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-medium"
                    >
                      <option value="Sutra">Sutra</option>
                      <option value="Stavan">Stavan</option>
                      <option value="Story">Story</option>
                      <option value="Activity">Activity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={syllabusForm.displayOrder}
                      onChange={(e) =>
                        setSyllabusForm({
                          ...syllabusForm,
                          displayOrder: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={syllabusForm.status}
                    onChange={(e) =>
                      setSyllabusForm({ ...syllabusForm, status: e.target.value as 'Active' | 'Inactive' })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={syllabusForm.description}
                    onChange={(e) => setSyllabusForm({ ...syllabusForm, description: e.target.value })}
                    placeholder="Brief description of verses, learning outcomes, or chapters..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-medium"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsSyllabusModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Topic
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================
  // RENDER MAIN MODULE VIEW: LIST OF ALL LEVELS
  // =========================================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Level & Syllabus Management</h1>
        </div>

        {!isAuditor && (
          <button
            onClick={openAddLevel}
            className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Level</span>
          </button>
        )}
      </div>

      {/* Levels Table */}
      <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
            Pathshala Levels ({levels.length})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Select "Manage Syllabus" on any level to view & edit its topics
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-bold">Level Name</th>
                <th className="py-3 px-4 font-bold">Age Group</th>
                <th className="py-3 px-4 font-bold">Prerequisite</th>
                <th className="py-3 px-4 font-bold">Assigned Topics</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
              {levels.map((lvl) => {
                const syllabusCount = lvl.syllabus?.length || 0;

                return (
                  <tr key={lvl.id} className="hover:bg-stone-50/80 transition-colors">
                    {/* Level Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#163E2B]/10 text-[#163E2B]">
                          {lvl.code}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{lvl.name}</div>
                          <span className="text-[10px] text-slate-500 line-clamp-1">{lvl.description}</span>
                        </div>
                      </div>
                    </td>

                    {/* Age Group */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      {lvl.minAge} - {lvl.maxAge} Yrs
                    </td>

                    {/* Prerequisite */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {lvl.prerequisite}
                    </td>

                    {/* Assigned Topics */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 inline-block">
                        {syllabusCount} Topics
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                        Active ({lvl.enrolledCount} Enrolled)
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingLevelModal(lvl)}
                          className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        {!isAuditor && (
                          <button
                            onClick={() => openEditLevel(lvl)}
                            className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#163E2B] font-bold text-xs rounded-lg cursor-pointer inline-flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedLevelForSyllabus(lvl)}
                          className="px-3 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Manage Syllabus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW LEVEL DETAILS MODAL */}
      {viewingLevelModal && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#163E2B] bg-[#163E2B]/10 px-2 py-0.5 rounded-full">
                  {viewingLevelModal.code}
                </span>
                <h3 className="text-base font-bold text-slate-900">{viewingLevelModal.name}</h3>
              </div>
              <button onClick={() => setViewingLevelModal(null)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
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
                  <strong className="text-slate-900 font-bold">{viewingLevelModal.prerequisite}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono uppercase">Syllabus Topics</span>
                  <strong className="text-[#163E2B] font-bold">{viewingLevelModal.syllabus?.length || 0} Assigned</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] font-mono uppercase mb-1">Description</span>
                <p className="bg-white p-3 rounded-lg border border-stone-200 text-slate-800 leading-relaxed">
                  {viewingLevelModal.description}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  const target = viewingLevelModal;
                  setViewingLevelModal(null);
                  setSelectedLevelForSyllabus(target);
                }}
                className="px-4 py-2 bg-[#163E2B] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Syllabus Manager</span>
              </button>

              <button
                onClick={() => setViewingLevelModal(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
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
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingLevel ? `Edit Level: ${editingLevel.code}` : 'Create New Pathshala Level'}
              </h3>
              <button onClick={() => setIsLevelModalOpen(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLevelFormSubmit} className="space-y-3.5 text-xs">
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
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={levelForm.description}
                  onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })}
                  placeholder="Overview of level objectives..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Min Age</label>
                  <input
                    type="number"
                    required
                    value={levelForm.minAge}
                    onChange={(e) => setLevelForm({ ...levelForm, minAge: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Max Age</label>
                  <input
                    type="number"
                    required
                    value={levelForm.maxAge}
                    onChange={(e) => setLevelForm({ ...levelForm, maxAge: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
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
