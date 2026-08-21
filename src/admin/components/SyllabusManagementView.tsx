import React, { useState, useMemo, useRef } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Volume2,
  FileText,
  UploadCloud,
  Check,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  Music,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { AcademicLevel, AcademicBatch, LevelSyllabusItem, SyllabusLearningType, AdminRole } from '../types';

interface SyllabusManagementViewProps {
  levels: AcademicLevel[];
  batches: AcademicBatch[];
  currentRole: AdminRole;
  onUpdateLevel: (level: AcademicLevel) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const SyllabusManagementView: React.FC<SyllabusManagementViewProps> = ({
  levels,
  batches,
  currentRole,
  onUpdateLevel,
  addToast,
}) => {
  const isAuditor = currentRole === 'Auditor';

  // Active Category Tab: 'ALL' | 'Sutra' | 'Stavan' | 'Gatha'
  const [activeTab, setActiveTab] = useState<'ALL' | 'Sutra' | 'Stavan' | 'Gatha'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Audio player state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // PDF Preview modal
  const [previewPdfItem, setPreviewPdfItem] = useState<{ title: string; fileName: string } | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LevelSyllabusItem | null>(null);

  // Form State matching requested 6 fields:
  // 1. Content Category (Dropdown: Sutra, Stavan, Gatha)
  // 2. Title Name
  // 3. Assigned Level
  // 4. Short Description
  // 5. Upload Audio
  // 6. Upload PDF
  // + batch and status
  const [formData, setFormData] = useState<{
    learningType: SyllabusLearningType;
    chapterName: string;
    levelId: string;
    description: string;
    audioFileName: string;
    audioUrl: string;
    pdfFileName: string;
    pdfUrl: string;
    batch: string;
    displayOrder: number;
    status: 'Active' | 'Inactive';
  }>({
    learningType: 'Sutra',
    chapterName: '',
    levelId: levels[0]?.id || 'LVL-1',
    description: '',
    audioFileName: '',
    audioUrl: '',
    pdfFileName: '',
    pdfUrl: '',
    batch: 'All Batches',
    displayOrder: 1,
    status: 'Active',
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Flatten all syllabus items across all levels
  const allSyllabusItems = useMemo(() => {
    return levels.flatMap((lvl) =>
      (lvl.syllabus || []).map((syl) => ({
        ...syl,
        levelId: lvl.id,
        levelName: lvl.name,
        levelCode: lvl.code,
      }))
    );
  }, [levels]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    const all = allSyllabusItems.length;
    const sutra = allSyllabusItems.filter((i) => i.learningType === 'Sutra').length;
    const stavan = allSyllabusItems.filter((i) => i.learningType === 'Stavan').length;
    const gatha = allSyllabusItems.filter((i) => i.learningType === 'Gatha').length;
    return { all, sutra, stavan, gatha };
  }, [allSyllabusItems]);

  // Filtered items based on tab, level filter, and search query
  const filteredItems = useMemo(() => {
    return allSyllabusItems.filter((item) => {
      // 1. Category Tab Filter
      if (activeTab !== 'ALL' && item.learningType !== activeTab) {
        return false;
      }

      // 2. Level Filter
      if (selectedLevelFilter !== 'ALL' && item.levelId !== selectedLevelFilter) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.chapterName?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesLevel = item.levelName?.toLowerCase().includes(query);
        const matchesType = item.learningType?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLevel && !matchesType) {
          return false;
        }
      }

      return true;
    });
  }, [allSyllabusItems, activeTab, selectedLevelFilter, searchQuery]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, safeCurrentPage, itemsPerPage]);

  // Reset page to 1 when filters change
  const handleTabChange = (tab: 'ALL' | 'Sutra' | 'Stavan' | 'Gatha') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLevelFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevelFilter(e.target.value);
    setCurrentPage(1);
  };

  // Open modal for Create
  const handleOpenAddModal = () => {
    setEditingItem(null);
    const defaultLevel = levels[0];
    const nextOrder = (defaultLevel?.syllabus?.length || 0) + 1;

    setFormData({
      learningType: activeTab === 'ALL' ? 'Sutra' : activeTab,
      chapterName: '',
      levelId: defaultLevel?.id || 'LVL-1',
      description: '',
      audioFileName: '',
      audioUrl: '',
      pdfFileName: '',
      pdfUrl: '',
      batch: 'All Batches',
      displayOrder: nextOrder,
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (item: LevelSyllabusItem & { levelId?: string; levelName?: string }) => {
    if (isAuditor) return;
    setEditingItem(item);

    setFormData({
      learningType: (item.learningType as SyllabusLearningType) || 'Sutra',
      chapterName: item.chapterName || '',
      levelId: item.levelId || levels[0]?.id || 'LVL-1',
      description: item.description || '',
      audioFileName: item.audioFileName || (item.audioUrl ? 'audio_recording.mp3' : ''),
      audioUrl: item.audioUrl || '',
      pdfFileName: item.pdfFileName || (item.pdfUrl ? 'syllabus_document.pdf' : ''),
      pdfUrl: item.pdfUrl || '',
      batch: item.batch || 'All Batches',
      displayOrder: item.displayOrder || 1,
      status: item.status || 'Active',
    });
    setIsModalOpen(true);
  };

  // Handle Audio File Selection
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        audioFileName: file.name,
        audioUrl: URL.createObjectURL(file),
      }));
      addToast('info', 'Audio Uploaded', `Attached "${file.name}"`);
    }
  };

  // Handle PDF File Selection
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        pdfFileName: file.name,
        pdfUrl: URL.createObjectURL(file),
      }));
      addToast('info', 'PDF Uploaded', `Attached "${file.name}"`);
    }
  };

  // Remove Audio
  const handleRemoveAudio = () => {
    setFormData((prev) => ({
      ...prev,
      audioFileName: '',
      audioUrl: '',
    }));
    if (audioInputRef.current) audioInputRef.current.value = '';
  };

  // Remove PDF
  const handleRemovePdf = () => {
    setFormData((prev) => ({
      ...prev,
      pdfFileName: '',
      pdfUrl: '',
    }));
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.chapterName.trim()) {
      addToast('warning', 'Validation Error', 'Title name is required.');
      return;
    }

    const targetLevel = levels.find((lvl) => lvl.id === formData.levelId);
    if (!targetLevel) {
      addToast('error', 'Error', 'Target level not found.');
      return;
    }

    if (editingItem) {
      // If item moved from one level to another
      const sourceLevel = levels.find((lvl) => lvl.id === editingItem.levelId);

      if (sourceLevel && sourceLevel.id !== targetLevel.id) {
        // Remove from old level
        const updatedSourceSyllabus = (sourceLevel.syllabus || []).filter((s) => s.id !== editingItem.id);
        onUpdateLevel({
          ...sourceLevel,
          syllabus: updatedSourceSyllabus,
        });

        // Add to new level
        const updatedTargetSyllabus = [
          ...(targetLevel.syllabus || []),
          {
            id: editingItem.id,
            levelId: targetLevel.id,
            chapterName: formData.chapterName.trim(),
            description: formData.description.trim(),
            learningType: formData.learningType,
            displayOrder: formData.displayOrder,
            status: formData.status,
            batch: formData.batch,
            audioFileName: formData.audioFileName,
            audioUrl: formData.audioUrl,
            pdfFileName: formData.pdfFileName,
            pdfUrl: formData.pdfUrl,
          },
        ].sort((a, b) => a.displayOrder - b.displayOrder);

        onUpdateLevel({
          ...targetLevel,
          syllabus: updatedTargetSyllabus,
        });
      } else {
        // Update in same level
        const updatedSyllabus = (targetLevel.syllabus || []).map((s) =>
          s.id === editingItem.id
            ? {
                ...s,
                chapterName: formData.chapterName.trim(),
                description: formData.description.trim(),
                learningType: formData.learningType,
                displayOrder: formData.displayOrder,
                status: formData.status,
                batch: formData.batch,
                audioFileName: formData.audioFileName,
                audioUrl: formData.audioUrl,
                pdfFileName: formData.pdfFileName,
                pdfUrl: formData.pdfUrl,
              }
            : s
        ).sort((a, b) => a.displayOrder - b.displayOrder);

        onUpdateLevel({
          ...targetLevel,
          syllabus: updatedSyllabus,
        });
      }

      addToast('success', 'Syllabus Updated', `Updated "${formData.chapterName}" successfully.`);
    } else {
      // Create new syllabus item
      const newItem: LevelSyllabusItem = {
        id: `SYL-${Date.now()}`,
        levelId: targetLevel.id,
        chapterName: formData.chapterName.trim(),
        description: formData.description.trim(),
        learningType: formData.learningType,
        displayOrder: formData.displayOrder,
        status: formData.status,
        batch: formData.batch,
        audioFileName: formData.audioFileName,
        audioUrl: formData.audioUrl,
        pdfFileName: formData.pdfFileName,
        pdfUrl: formData.pdfUrl,
      };

      const updatedSyllabus = [...(targetLevel.syllabus || []), newItem].sort(
        (a, b) => a.displayOrder - b.displayOrder
      );

      onUpdateLevel({
        ...targetLevel,
        syllabus: updatedSyllabus,
      });

      addToast('success', 'Syllabus Created', `Added "${newItem.chapterName}" to ${targetLevel.name}.`);
    }

    setIsModalOpen(false);
  };

  // Delete item
  const handleDelete = (item: LevelSyllabusItem & { levelId?: string }) => {
    if (isAuditor) return;
    const targetLevel = levels.find((lvl) => lvl.id === item.levelId);
    if (!targetLevel) return;

    const updatedSyllabus = (targetLevel.syllabus || [])
      .filter((s) => s.id !== item.id)
      .map((s, idx) => ({ ...s, displayOrder: idx + 1 }));

    onUpdateLevel({
      ...targetLevel,
      syllabus: updatedSyllabus,
    });

    addToast('success', 'Item Deleted', `Removed "${item.chapterName}" from syllabus.`);
  };

  // Category pill style
  const getCategoryBadge = (type: SyllabusLearningType) => {
    switch (type) {
      case 'Sutra':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Stavan':
        return 'bg-purple-50 text-purple-800 border-purple-200/80';
      case 'Gatha':
        return 'bg-blue-50 text-blue-800 border-blue-200/80';
      case 'Story':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Activity':
        return 'bg-teal-50 text-teal-800 border-teal-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER SECTION (Matching screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#163E2B]/10 text-[#163E2B] rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Syllabus Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage syllabus topics, curriculum chapters, and assigned batches.
              </p>
            </div>
          </div>
        </div>

        {!isAuditor && (
          <button
            id="add-syllabus-item-btn"
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Syllabus Item</span>
          </button>
        )}
      </div>

      {/* 4 CATEGORY TABS & SEARCH/FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* 4 TABS: All, Sutra, Stavan, Gatha */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 overflow-x-auto">
            <button
              id="tab-syllabus-all"
              onClick={() => handleTabChange('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'ALL'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
              }`}
            >
              <span>All</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'ALL' ? 'bg-white/20 text-white' : 'bg-stone-200 text-slate-700'
                }`}
              >
                {tabCounts.all}
              </span>
            </button>

            <button
              id="tab-syllabus-sutra"
              onClick={() => handleTabChange('Sutra')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'Sutra'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
              }`}
            >
              <span>Sutra</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'Sutra' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {tabCounts.sutra}
              </span>
            </button>

            <button
              id="tab-syllabus-stavan"
              onClick={() => handleTabChange('Stavan')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'Stavan'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
              }`}
            >
              <span>Stavan</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'Stavan' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                }`}
              >
                {tabCounts.stavan}
              </span>
            </button>

            <button
              id="tab-syllabus-gatha"
              onClick={() => handleTabChange('Gatha')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'Gatha'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
              }`}
            >
              <span>Gatha</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'Gatha' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {tabCounts.gatha}
              </span>
            </button>
          </div>

          {/* Search & Level Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[220px] flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search topics, mantra, level..."
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#163E2B] focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="min-w-[170px]">
              <select
                value={selectedLevelFilter}
                onChange={handleLevelFilterChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white transition-all cursor-pointer"
              >
                <option value="ALL">All Levels ({levels.length})</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name} ({lvl.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SYLLABUS CARDS GRID (2 Columns matching screenshot) */}
      {paginatedItems.length === 0 ? (
        <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Syllabus Items Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || selectedLevelFilter !== 'ALL' || activeTab !== 'ALL'
              ? 'Try clearing your search filters or selecting a different category tab.'
              : 'Click "+ Add Syllabus Item" above to add new curriculum topics, stavans, or gathas.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300/80 transition-all space-y-3"
            >
              {/* Top Row: Category Badge & Batch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider font-mono ${getCategoryBadge(
                      item.learningType
                    )}`}
                  >
                    {item.learningType}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    {item.batch || 'All Batches'}
                  </span>
                </div>

                {/* Title Name */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.chapterName}</h3>

                {/* Short Description */}
                {item.description && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
                )}
              </div>

              {/* Media Attachments Preview (Audio & PDF) */}
              {(item.audioFileName || item.pdfFileName) && (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100">
                  {item.audioFileName && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/80 border border-emerald-200/70 rounded-lg text-[11px] text-emerald-800 font-medium">
                      <button
                        type="button"
                        onClick={() => setPlayingAudioId(playingAudioId === item.id ? null : item.id)}
                        className="text-emerald-700 hover:text-emerald-900 cursor-pointer flex items-center gap-1 font-bold"
                      >
                        {playingAudioId === item.id ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current" />
                        )}
                        <span className="truncate max-w-[120px]">{item.audioFileName}</span>
                      </button>
                    </div>
                  )}

                  {item.pdfFileName && (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewPdfItem({
                          title: item.chapterName,
                          fileName: item.pdfFileName || 'Document.pdf',
                        })
                      }
                      className="flex items-center gap-1 px-2.5 py-1 bg-rose-50/80 border border-rose-200/70 rounded-lg text-[11px] text-rose-800 font-medium hover:bg-rose-100 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-600" />
                      <span className="truncate max-w-[120px]">{item.pdfFileName}</span>
                      <Eye className="w-3 h-3 ml-0.5 text-rose-500" />
                    </button>
                  )}
                </div>
              )}

              {/* Bottom Row: Level on left, Edit button on right (matching screenshot) */}
              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-mono">
                  Level: <strong className="text-slate-800 font-bold">{item.levelName}</strong>
                </div>

                {!isAuditor && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="px-3.5 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#163E2B]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION BAR */}
      {totalPages > 1 && (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-500">
            Showing <strong className="text-slate-800">{(safeCurrentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-slate-800">
              {Math.min(safeCurrentPage * itemsPerPage, totalItems)}
            </strong>{' '}
            of <strong className="text-slate-800">{totalItems}</strong> syllabus items
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-2 border border-stone-200 rounded-lg text-xs text-slate-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  safeCurrentPage === pageNum
                    ? 'bg-[#163E2B] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="p-2 border border-stone-200 rounded-lg text-xs text-slate-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CREATE / EDIT SYLLABUS MODAL */}
      {/* Strictly implements the 6 requested fields:
          1. Content Category (Dropdown: Sutra, Stavan, Gatha)
          2. Title Name
          3. Assigned Level
          4. Short Description
          5. Upload Audio
          6. Upload PDF
      */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-800 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#163E2B]/10 rounded-xl text-[#163E2B]">
                  {editingItem ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingItem ? 'Edit Syllabus Item' : 'Add New Syllabus Item'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload and configure syllabus content, audio guides, and learning documents.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* FIELD 1: Content Category (Dropdown: Sutra, Stavan, Gatha) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono mb-1.5">
                  1. Content Category <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.learningType}
                  onChange={(e) =>
                    setFormData({ ...formData, learningType: e.target.value as SyllabusLearningType })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer transition-all"
                >
                  <option value="Sutra">Sutra (Sacred Recitation)</option>
                  <option value="Stavan">Stavan (Devotional Hymn)</option>
                  <option value="Gatha">Gatha (Prakrit / Sanskrit Verse)</option>
                </select>
              </div>

              {/* FIELD 2: Title Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono mb-1.5">
                  2. Title Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.chapterName}
                  onChange={(e) => setFormData({ ...formData, chapterName: e.target.value })}
                  placeholder="e.g., Navkar Mantra - Part 1: Pronunciation & Recitation"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white transition-all"
                />
              </div>

              {/* FIELD 3: Assigned Level (Dropdown) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono mb-1.5">
                  3. Assigned Level <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.levelId}
                  onChange={(e) => setFormData({ ...formData, levelId: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer transition-all"
                >
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name} ({lvl.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* FIELD 4: Short Description */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono mb-1.5">
                  4. Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief overview of topic, pronunciation guidelines, or spiritual meaning..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white transition-all"
                />
              </div>

              {/* FIELD 5: Upload Audio */}
              <div className="bg-stone-50/80 p-3.5 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono">
                    5. Upload Audio (.mp3, .wav, .m4a)
                  </label>
                  {formData.audioFileName && (
                    <button
                      type="button"
                      onClick={handleRemoveAudio}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      Remove Audio
                    </button>
                  )}
                </div>

                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />

                {formData.audioFileName ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-xs truncate max-w-[260px]">
                        {formData.audioFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => audioInputRef.current?.click()}
                      className="text-[10px] font-bold text-emerald-700 underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => audioInputRef.current?.click()}
                    className="w-full py-3 px-4 border border-dashed border-stone-300 hover:border-[#163E2B] rounded-xl flex items-center justify-center gap-2 bg-white text-slate-600 hover:text-[#163E2B] cursor-pointer transition-all group"
                  >
                    <UploadCloud className="w-4 h-4 text-slate-400 group-hover:text-[#163E2B]" />
                    <span className="font-semibold">Click to select or upload audio file</span>
                  </button>
                )}
              </div>

              {/* FIELD 6: Upload PDF */}
              <div className="bg-stone-50/80 p-3.5 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono">
                    6. Upload PDF (Syllabus / Lyrics Document)
                  </label>
                  {formData.pdfFileName && (
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      Remove PDF
                    </button>
                  )}
                </div>

                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />

                {formData.pdfFileName ? (
                  <div className="flex items-center justify-between p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span className="font-semibold text-xs truncate max-w-[260px]">
                        {formData.pdfFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => pdfInputRef.current?.click()}
                      className="text-[10px] font-bold text-rose-700 underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    className="w-full py-3 px-4 border border-dashed border-stone-300 hover:border-rose-500 rounded-xl flex items-center justify-center gap-2 bg-white text-slate-600 hover:text-rose-700 cursor-pointer transition-all group"
                  >
                    <UploadCloud className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                    <span className="font-semibold">Click to select or upload PDF document</span>
                  </button>
                )}
              </div>

              {/* Batch, Display Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Batch Slot
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
                  >
                    <option value="All Batches">All Batches</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.timeSlot}>
                        {b.timeSlot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: Math.max(1, parseInt(e.target.value) || 1) })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex justify-end gap-2.5 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingItem ? 'Save Changes' : 'Save Syllabus Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {previewPdfItem && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">{previewPdfItem.title}</h3>
              </div>
              <button
                onClick={() => setPreviewPdfItem(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center space-y-3">
              <FileText className="w-12 h-12 text-rose-500 mx-auto" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{previewPdfItem.fileName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Syllabus notes, recitation text & meaning PDF document</p>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PDF Verified & Ready
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewPdfItem(null)}
                className="px-4 py-2 bg-[#163E2B] text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-[#0F2D1F]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
