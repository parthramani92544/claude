import React, { useState } from 'react';
import {
  Layers,
  Clock,
  Database,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Search,
} from 'lucide-react';
import { AcademicLevel, AcademicBatch, MasterEntry, AdminRole, LevelSyllabusItem, SyllabusLearningType } from '../types';
import { SyllabusManagementView } from './SyllabusManagementView';

interface AcademicStructureProps {
  levels: AcademicLevel[];
  batches: AcademicBatch[];
  masters: MasterEntry[];
  currentRole: AdminRole;
  onAddLevel: (lvl: AcademicLevel) => void;
  onUpdateLevel: (lvl: AcademicLevel) => void;
  onAddBatch: (bat: AcademicBatch) => void;
  onUpdateBatch: (bat: AcademicBatch) => void;
  onAddMaster: (mst: MasterEntry) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const AcademicStructure: React.FC<AcademicStructureProps> = ({
  levels,
  batches,
  masters,
  currentRole,
  onAddLevel,
  onUpdateLevel,
  onAddBatch,
  onUpdateBatch,
  onAddMaster,
  addToast,
}) => {
  const [subTab, setSubTab] = useState<'batches' | 'syllabus'>('batches');

  const isAuditor = currentRole === 'Auditor';

  // Level Modal
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

  // Batch Modal
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<AcademicBatch | null>(null);
  const [batchForm, setBatchForm] = useState({
    code: '',
    timeSlot: '', // Batch name
    description: '',
    level: levels[0]?.name || 'Level 1 - Prarambhik',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    maxCapacity: 50,
    operatingDays: ['Saturday', 'Sunday'],
  });

  // Master Modal
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [masterForm, setMasterForm] = useState({
    category: 'Cities' as 'Cities' | 'Sangh' | 'Relationships' | 'Documents',
    value: '',
  });

  // Selected level for detail & syllabus modal
  const [selectedLevelForSyllabus, setSelectedLevelForSyllabus] = useState<AcademicLevel | null>(null);
  const [levelDetailTab, setLevelDetailTab] = useState<'syllabus' | 'general'>('syllabus');

  // Syllabus search and filters
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [learningTypeFilter, setLearningTypeFilter] = useState<string>('ALL');

  // Syllabus Item Modal
  const [isSyllabusItemModalOpen, setIsSyllabusItemModalOpen] = useState(false);
  const [editingSyllabusItem, setEditingSyllabusItem] = useState<LevelSyllabusItem | null>(null);
  const [syllabusItemForm, setSyllabusItemForm] = useState({
    chapterName: '', // Syllabus name
    description: '',
    batch: batches[0]?.timeSlot || 'Batch A - Weekend Morning',
    learningType: 'Sutra' as SyllabusLearningType,
    displayOrder: 1,
    status: 'Active' as 'Active' | 'Inactive',
    referenceTopic: '',
  });

  // Handlers for Level
  const openAddLevel = () => {
    setEditingLevel(null);
    setLevelForm({
      code: `LEVEL-${levels.length + 1}`,
      name: '',
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

  const openLevelSyllabus = (lvl: AcademicLevel) => {
    setSelectedLevelForSyllabus(lvl);
    setLevelDetailTab('syllabus');
    setSyllabusSearch('');
    setLearningTypeFilter('ALL');
  };

  const handleLevelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    if (editingLevel) {
      const updated = {
        ...editingLevel,
        ...levelForm,
      };
      onUpdateLevel(updated);
      if (selectedLevelForSyllabus?.id === editingLevel.id) {
        setSelectedLevelForSyllabus(updated);
      }
      addToast('success', 'Level Updated', `Updated curriculum details for ${levelForm.name}`);
    } else {
      const newLvl: AcademicLevel = {
        id: `LVL-${Math.floor(10 + Math.random() * 90)}`,
        ...levelForm,
        enrolledCount: 0,
        syllabus: [],
      };
      onAddLevel(newLvl);
      addToast('success', 'Level Created', `Created level ${newLvl.name}`);
    }
    setIsLevelModalOpen(false);
  };

  // Handlers for Batch
  const openAddBatch = () => {
    setEditingBatch(null);
    setBatchForm({
      code: `BATCH-${String.fromCharCode(65 + batches.length)}`,
      timeSlot: '',
      description: '',
      level: levels[0]?.name || 'Level 1 - Prarambhik',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      maxCapacity: 50,
      operatingDays: ['Saturday', 'Sunday'],
    });
    setIsBatchModalOpen(true);
  };

  const openEditBatch = (bat: AcademicBatch) => {
    if (isAuditor) return;
    setEditingBatch(bat);
    setBatchForm({
      code: bat.code,
      timeSlot: bat.timeSlot,
      description: bat.description || '',
      level: bat.level || levels[0]?.name || 'Level 1 - Prarambhik',
      startTime: bat.startTime,
      endTime: bat.endTime,
      maxCapacity: bat.maxCapacity,
      operatingDays: [...bat.operatingDays],
    });
    setIsBatchModalOpen(true);
  };

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    if (editingBatch) {
      onUpdateBatch({
        ...editingBatch,
        ...batchForm,
        timeSlot: batchForm.timeSlot || editingBatch.timeSlot,
      });
      addToast('success', 'Batch Updated', `Updated slot ${batchForm.timeSlot}`);
    } else {
      const newBat: AcademicBatch = {
        id: `BAT-${Math.floor(100 + Math.random() * 900)}`,
        code: batchForm.code || `BATCH-${String.fromCharCode(65 + batches.length)}`,
        timeSlot: batchForm.timeSlot || 'Batch Slot',
        description: batchForm.description,
        level: batchForm.level,
        startTime: batchForm.startTime,
        endTime: batchForm.endTime,
        maxCapacity: batchForm.maxCapacity || 50,
        enrolledCount: 0,
        operatingDays: batchForm.operatingDays || ['Saturday', 'Sunday'],
      };
      onAddBatch(newBat);
      addToast('success', 'Batch Created', `Created batch slot ${newBat.timeSlot}`);
    }
    setIsBatchModalOpen(false);
  };

  // Handler for Master Entry
  const handleMasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor || !masterForm.value.trim()) return;

    const newMst: MasterEntry = {
      id: `MST-${Math.floor(100 + Math.random() * 900)}`,
      category: masterForm.category,
      value: masterForm.value.trim(),
      status: 'Active',
    };
    onAddMaster(newMst);
    addToast('success', 'Master Created', `Added ${newMst.value} under ${newMst.category}`);
    setMasterForm({ ...masterForm, value: '' });
    setIsMasterModalOpen(false);
  };

  // Syllabus Reordering & CRUD
  const activeSyllabusList = selectedLevelForSyllabus?.syllabus || [];

  const filteredSyllabusItems = activeSyllabusList.filter((item) => {
    const matchesSearch =
      item.chapterName.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(syllabusSearch.toLowerCase()));
    const matchesType = learningTypeFilter === 'ALL' || item.learningType === learningTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleMoveSyllabusItem = (index: number, direction: 'up' | 'down') => {
    if (!selectedLevelForSyllabus || isAuditor) return;
    const currentSyllabus = [...(selectedLevelForSyllabus.syllabus || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= currentSyllabus.length) return;

    // Swap elements
    const temp = currentSyllabus[index];
    currentSyllabus[index] = currentSyllabus[targetIndex];
    currentSyllabus[targetIndex] = temp;

    // Re-assign displayOrder 1..N
    const reordered = currentSyllabus.map((item, i) => ({
      ...item,
      displayOrder: i + 1,
    }));

    const updatedLevel: AcademicLevel = {
      ...selectedLevelForSyllabus,
      syllabus: reordered,
    };

    setSelectedLevelForSyllabus(updatedLevel);
    onUpdateLevel(updatedLevel);
    addToast('success', 'Sequence Updated', `Reordered syllabus topics for ${selectedLevelForSyllabus.name}`);
  };

  const openAddSyllabusItem = () => {
    setEditingSyllabusItem(null);
    const nextOrder = (selectedLevelForSyllabus?.syllabus?.length || 0) + 1;
    setSyllabusItemForm({
      chapterName: '',
      description: '',
      learningType: 'Sutra',
      displayOrder: nextOrder,
      status: 'Active',
      referenceTopic: '',
    });
    setIsSyllabusItemModalOpen(true);
  };

  const openEditSyllabusItem = (item: LevelSyllabusItem) => {
    if (isAuditor) return;
    setEditingSyllabusItem(item);
    setSyllabusItemForm({
      chapterName: item.chapterName,
      description: item.description || '',
      learningType: item.learningType,
      displayOrder: item.displayOrder,
      status: item.status,
      referenceTopic: item.referenceTopic || '',
    });
    setIsSyllabusItemModalOpen(true);
  };

  const handleRemoveSyllabusItem = (itemId: string) => {
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
    addToast('success', 'Item Removed', 'Syllabus item removed from level.');
  };

  const handleSyllabusItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevelForSyllabus || isAuditor) return;

    const currentSyllabus = [...(selectedLevelForSyllabus.syllabus || [])];

    if (editingSyllabusItem) {
      const updated = currentSyllabus.map((item) =>
        item.id === editingSyllabusItem.id
          ? {
              ...item,
              ...syllabusItemForm,
            }
          : item
      );
      updated.sort((a, b) => a.displayOrder - b.displayOrder);

      const updatedLevel: AcademicLevel = {
        ...selectedLevelForSyllabus,
        syllabus: updated,
      };
      setSelectedLevelForSyllabus(updatedLevel);
      onUpdateLevel(updatedLevel);
      addToast('success', 'Syllabus Item Updated', `Updated topic "${syllabusItemForm.chapterName}"`);
    } else {
      const newItem: LevelSyllabusItem = {
        id: `SYL-${Date.now()}`,
        levelId: selectedLevelForSyllabus.id,
        ...syllabusItemForm,
      };
      const updated = [...currentSyllabus, newItem];
      updated.sort((a, b) => a.displayOrder - b.displayOrder);

      const updatedLevel: AcademicLevel = {
        ...selectedLevelForSyllabus,
        syllabus: updated,
      };
      setSelectedLevelForSyllabus(updatedLevel);
      onUpdateLevel(updatedLevel);
      addToast('success', 'Syllabus Item Created', `Added "${newItem.chapterName}" to ${selectedLevelForSyllabus.name}`);
    }

    setIsSyllabusItemModalOpen(false);
  };

  const getLearningTypeBadgeStyle = (type: SyllabusLearningType) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Batch and syllabus management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage batch timing slots and assigned syllabus curriculum items.</p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setSubTab('batches')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'batches' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Batches ({batches.length})</span>
          </button>
          <button
            onClick={() => setSubTab('syllabus')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'syllabus' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Syllabus Management</span>
          </button>
        </div>
      </div>

      {/* Batches View */}
      {subTab === 'batches' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900">Batch Slot Schedules & Configuration</h2>
            {!isAuditor && (
              <button
                onClick={openAddBatch}
                className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Batch</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {batches.map((bat) => {
              const utilizationPct = Math.round((bat.enrolledCount / bat.maxCapacity) * 100);

              return (
                <div
                  key={bat.id}
                  className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#163E2B]">{bat.code}</span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {bat.enrolledCount} / {bat.maxCapacity} Seats ({utilizationPct}%)
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{bat.timeSlot}</h3>
                    {bat.description && (
                      <p className="text-xs text-slate-600">{bat.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-700 pt-1">
                      <span>⏰ <strong>{bat.startTime}</strong> - <strong>{bat.endTime}</strong></span>
                      {bat.level && (
                        <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-bold text-[11px]">
                          Level: {bat.level}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Operating Days</span>
                      <span className="font-bold text-slate-800">{bat.operatingDays.join(', ')}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#163E2B] h-full rounded-full transition-all"
                        style={{ width: `${utilizationPct}%` }}
                      />
                    </div>
                  </div>

                  {!isAuditor && (
                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => openEditBatch(bat)}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-[#163E2B] border border-slate-200 text-xs font-semibold rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Batch</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Syllabus View */}
      {subTab === 'syllabus' && (
        <SyllabusManagementView
          levels={levels}
          batches={batches}
          currentRole={currentRole}
          onUpdateLevel={onUpdateLevel}
          addToast={addToast}
        />
      )}

      {/* LEVEL DETAILS & ASSIGNED SYLLABUS MODAL */}
      {selectedLevelForSyllabus && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 text-slate-800 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#163E2B]/10 rounded-xl text-[#163E2B]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#163E2B] bg-[#163E2B]/10 px-2 py-0.5 rounded-full">
                      {selectedLevelForSyllabus.code}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{selectedLevelForSyllabus.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedLevelForSyllabus.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLevelForSyllabus(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level Sub-tabs Navigation */}
            <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLevelDetailTab('syllabus')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    levelDetailTab === 'syllabus'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Assigned Syllabus ({selectedLevelForSyllabus.syllabus?.length || 0})</span>
                </button>
                <button
                  onClick={() => setLevelDetailTab('general')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    levelDetailTab === 'general'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Level Configuration</span>
                </button>
              </div>

              {levelDetailTab === 'syllabus' && !isAuditor && (
                <button
                  onClick={openAddSyllabusItem}
                  className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Syllabus Item</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT: ASSIGNED SYLLABUS */}
            {levelDetailTab === 'syllabus' && (
              <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                {/* Controls Bar: Search & Type Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={syllabusSearch}
                      onChange={(e) => setSyllabusSearch(e.target.value)}
                      placeholder="Search chapter or topic..."
                      className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#163E2B]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    <span className="text-[11px] font-mono text-slate-500 font-bold whitespace-nowrap">Learning Type:</span>
                    {(['ALL', 'Sutra', 'Stavan', 'Story', 'Activity', 'Other'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setLearningTypeFilter(type)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          learningTypeFilter === type
                            ? 'bg-[#163E2B] text-white'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Syllabus Items List / Table */}
                {filteredSyllabusItems.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                    <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No syllabus items found</p>
                    <p className="text-xs text-slate-500">
                      {selectedLevelForSyllabus.syllabus?.length === 0
                        ? 'No chapters or topics assigned to this level yet.'
                        : 'Try adjusting your search query or learning type filter.'}
                    </p>
                    {!isAuditor && (
                      <button
                        onClick={openAddSyllabusItem}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#163E2B] text-white text-xs font-semibold rounded-lg hover:bg-[#0F2D1F] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Syllabus Item</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1 text-[11px] font-mono text-slate-500 font-bold uppercase">
                      <span>Order # & Topic ({filteredSyllabusItems.length} Items)</span>
                      <span>Sequence Controls & Actions</span>
                    </div>

                    <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                      {filteredSyllabusItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                        >
                          {/* Left details */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 font-mono text-xs font-bold text-[#163E2B] flex items-center justify-center flex-shrink-0">
                              {item.displayOrder}
                            </span>

                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xs font-bold text-slate-900">{item.chapterName}</h4>
                                
                                {/* Learning Type Badge */}
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getLearningTypeBadgeStyle(item.learningType)}`}>
                                  {item.learningType}
                                </span>

                                {/* Status Badge */}
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                    item.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>

                              {item.description && (
                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
                              )}

                              {item.referenceTopic && (
                                <span className="inline-block text-[10px] font-mono text-slate-400">
                                  Ref: {item.referenceTopic}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right action controls */}
                          {!isAuditor && (
                            <div className="flex items-center gap-1.5 self-end md:self-center flex-shrink-0">
                              {/* Move Up */}
                              <button
                                onClick={() => handleMoveSyllabusItem(index, 'up')}
                                disabled={index === 0}
                                title="Move Up"
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              {/* Move Down */}
                              <button
                                onClick={() => handleMoveSyllabusItem(index, 'down')}
                                disabled={index === filteredSyllabusItems.length - 1}
                                title="Move Down"
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Item */}
                              <button
                                onClick={() => openEditSyllabusItem(item)}
                                title="Edit Topic"
                                className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-[#163E2B] border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              {/* Remove Item */}
                              <button
                                onClick={() => handleRemoveSyllabusItem(item.id)}
                                title="Remove Topic"
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg transition-colors cursor-pointer"
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
            )}

            {/* TAB CONTENT: LEVEL CONFIGURATION */}
            {levelDetailTab === 'general' && (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase font-bold block">Level Code</span>
                    <span className="text-slate-900 font-bold text-sm font-mono">{selectedLevelForSyllabus.code}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase font-bold block">Enrolled Students</span>
                    <span className="text-slate-900 font-bold text-sm">{selectedLevelForSyllabus.enrolledCount} Students</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase font-bold block">Age Bracket</span>
                    <span className="text-slate-900 font-bold">{selectedLevelForSyllabus.minAge} - {selectedLevelForSyllabus.maxAge} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase font-bold block">Prerequisite</span>
                    <span className="text-slate-900 font-bold">{selectedLevelForSyllabus.prerequisite}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase font-bold block mb-1">Description</span>
                  <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                    {selectedLevelForSyllabus.description}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-slate-500 font-mono">
                Total Assigned Syllabus: <strong className="text-slate-800">{selectedLevelForSyllabus.syllabus?.length || 0} Topics</strong>
              </span>
              <button
                onClick={() => setSelectedLevelForSyllabus(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT SYLLABUS ITEM MODAL */}
      {isSyllabusItemModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingSyllabusItem ? 'Edit Syllabus Item' : 'Add New Syllabus Item'}
              </h3>
              <button onClick={() => setIsSyllabusItemModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSyllabusItemSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Syllabus Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={syllabusItemForm.chapterName}
                  onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, chapterName: e.target.value })}
                  placeholder="e.g. Navkar Mantra - Part 1: Pronunciation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={syllabusItemForm.description}
                  onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, description: e.target.value })}
                  placeholder="Brief overview of learning objectives or topic contents..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Batch Selection (Dropdown) <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={syllabusItemForm.batch}
                  onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, batch: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-bold cursor-pointer"
                >
                  {batches.length > 0 ? (
                    batches.map((b) => (
                      <option key={b.id} value={b.timeSlot}>
                        {b.timeSlot}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Batch A - Weekend Morning">Batch A - Weekend Morning</option>
                      <option value="Batch B - Weekend Evening">Batch B - Weekend Evening</option>
                    </>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Learning Type
                  </label>
                  <select
                    value={syllabusItemForm.learningType}
                    onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, learningType: e.target.value as SyllabusLearningType })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
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
                    value={syllabusItemForm.displayOrder}
                    onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, displayOrder: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Status
                </label>
                <select
                  value={syllabusItemForm.status}
                  onChange={(e) => setSyllabusItemForm({ ...syllabusItemForm, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSyllabusItemModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Syllabus Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Level Create/Edit Modal */}
      {isLevelModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingLevel ? `Edit Level: ${editingLevel.code}` : 'Create Academic Level'}
              </h3>
              <button onClick={() => setIsLevelModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLevelSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Level Name</label>
                <input
                  type="text"
                  required
                  value={levelForm.name}
                  onChange={(e) => setLevelForm({ ...levelForm, name: e.target.value })}
                  placeholder="e.g., Level 4 - Praveen"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={levelForm.description}
                  onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Max Age</label>
                  <input
                    type="number"
                    required
                    value={levelForm.maxAge}
                    onChange={(e) => setLevelForm({ ...levelForm, maxAge: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLevelModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Level Config
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Master Modal */}
      {isMasterModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Add Master Entry</h3>
              <button onClick={() => setIsMasterModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMasterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Category</label>
                <select
                  value={masterForm.category}
                  onChange={(e) => setMasterForm({ ...masterForm, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                >
                  <option value="Cities">Cities</option>
                  <option value="Sangh">Sangh / Temple</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Documents">Documents</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Master Value</label>
                <input
                  type="text"
                  required
                  value={masterForm.value}
                  onChange={(e) => setMasterForm({ ...masterForm, value: e.target.value })}
                  placeholder="e.g., Borivali Sangh"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMasterModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT BATCH MODAL */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingBatch ? `Edit Batch: ${editingBatch.code}` : 'Add New Batch'}
              </h3>
              <button onClick={() => setIsBatchModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBatchSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Batch Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={batchForm.timeSlot}
                  onChange={(e) => setBatchForm({ ...batchForm, timeSlot: e.target.value })}
                  placeholder="e.g. Batch A - Weekend Morning"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={batchForm.description}
                  onChange={(e) => setBatchForm({ ...batchForm, description: e.target.value })}
                  placeholder="Overview of batch timing slot or group..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Level Selection (Dropdown) <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={batchForm.level}
                  onChange={(e) => setBatchForm({ ...batchForm, level: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
                >
                  {levels.length > 0 ? (
                    levels.map((lvl) => (
                      <option key={lvl.id} value={lvl.name}>
                        {lvl.name} ({lvl.code})
                      </option>
                    ))
                  ) : (
                    <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Start Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={batchForm.startTime}
                    onChange={(e) => setBatchForm({ ...batchForm, startTime: e.target.value })}
                    placeholder="e.g. 09:00 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    End Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={batchForm.endTime}
                    onChange={(e) => setBatchForm({ ...batchForm, endTime: e.target.value })}
                    placeholder="e.g. 10:30 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
