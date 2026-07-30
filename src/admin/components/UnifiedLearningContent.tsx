import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Music,
  FileAudio,
  Gamepad2,
  Bookmark,
  Sparkles,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Archive,
  Layers,
  CheckCircle2,
  Play,
  Pause,
  X,
  RotateCcw,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Award,
} from 'lucide-react';
import {
  SutraCatalogItem,
  GathaSubmission,
  StavanItem,
  AudioAsset,
  QuizGameItem,
  AcademicLevel,
  AdminRole,
} from '../types';

export type ContentCategory = 'Sutras' | 'Stavans' | 'Audio Library' | 'Games' | 'Stories' | 'Future Categories';

export interface ContentItem {
  id: string;
  name: string;
  category: ContentCategory;
  assignedLevel: string;
  type: string;
  status: 'Active' | 'Archived' | 'Draft';
  lastUpdated: string;
  rawItem?: any;
}

interface UnifiedLearningContentProps {
  sutras: SutraCatalogItem[];
  submissions: GathaSubmission[];
  stavans: StavanItem[];
  audioAssets: AudioAsset[];
  games: QuizGameItem[];
  levels: AcademicLevel[];
  currentRole: AdminRole;
  onAddSutra: (sutra: SutraCatalogItem) => void;
  onUpdateSutra: (sutra: SutraCatalogItem) => void;
  onApproveSubmission: (sub: GathaSubmission, points: number, notes: string) => void;
  onRejectSubmission: (sub: GathaSubmission, notes: string) => void;
  onAddStavan: (stavan: StavanItem) => void;
  onUpdateStavan: (stavan: StavanItem) => void;
  onDeleteStavan: (id: string) => void;
  onAddAudio: (asset: AudioAsset) => void;
  onUpdateAudio: (asset: AudioAsset) => void;
  onDeleteAudio: (id: string) => void;
  onAddGame: (game: QuizGameItem) => void;
  onUpdateGame: (game: QuizGameItem) => void;
  onDeleteGame: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const UnifiedLearningContent: React.FC<UnifiedLearningContentProps> = ({
  sutras,
  submissions,
  stavans,
  audioAssets,
  games,
  levels,
  currentRole,
  onAddSutra,
  onUpdateSutra,
  onApproveSubmission,
  onRejectSubmission,
  onAddStavan,
  onUpdateStavan,
  onDeleteStavan,
  onAddAudio,
  onUpdateAudio,
  onDeleteAudio,
  onAddGame,
  onUpdateGame,
  onDeleteGame,
  addToast,
}) => {
  const isAuditor = currentRole === 'Auditor';

  // Active Category State
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('Sutras');
  const [viewSubmissionsQueue, setViewSubmissionsQueue] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Audio Playback
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);

  // Modals
  const [viewingItem, setViewingItem] = useState<ContentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [levelAssignItem, setLevelAssignItem] = useState<ContentItem | null>(null);
  const [assignLevelSelect, setAssignLevelSelect] = useState<string>('Level 1');

  // Submission review modal
  const [selectedSubmission, setSelectedSubmission] = useState<GathaSubmission | null>(null);
  const [reviewPoints, setReviewPoints] = useState(25);
  const [reviewNotes, setReviewNotes] = useState('');

  // Story & Future mock local state for full editing
  const [customStories, setCustomStories] = useState<ContentItem[]>([
    {
      id: 'STORY-1',
      name: 'Story of King Kumarapala & Hemachandracharya',
      category: 'Stories',
      assignedLevel: 'Level 2 - Madhyamik',
      type: 'Moral Story',
      status: 'Active',
      lastUpdated: '2026-07-20',
      rawItem: { description: 'Historical narrative on non-violence (Ahimsa) and Jain principles.' },
    },
    {
      id: 'STORY-2',
      name: 'Chandanbala and Bhagwan Mahavira',
      category: 'Stories',
      assignedLevel: 'Level 1 - Prarambhik',
      type: 'Devotional Story',
      status: 'Active',
      lastUpdated: '2026-07-18',
      rawItem: { description: 'Inspirational story of pure devotion and charity (Anekantavada).' },
    },
  ]);

  const [customFuture, setCustomFuture] = useState<ContentItem[]>([
    {
      id: 'FUT-1',
      name: 'Interactive Jain Geography 3D Map',
      category: 'Future Categories',
      assignedLevel: 'Level 3 - Shravak Junior',
      type: 'Interactive Map',
      status: 'Draft',
      lastUpdated: '2026-07-22',
      rawItem: { description: 'Upcoming 3D visualization of Jambudvipa and Sacred Tirthas.' },
    },
  ]);

  // Unified items mapping
  const unifiedItems: ContentItem[] = useMemo(() => {
    const list: ContentItem[] = [];

    // Sutras
    sutras.forEach((s) => {
      list.push({
        id: s.id,
        name: s.name,
        category: 'Sutras',
        assignedLevel: `Level ${s.targetLevel}`,
        type: 'Sutra Recitation',
        status: 'Active',
        lastUpdated: '2026-07-21',
        rawItem: s,
      });
    });

    // Stavans
    stavans.forEach((st) => {
      list.push({
        id: st.id,
        name: st.title,
        category: 'Stavans',
        assignedLevel: 'All Levels',
        type: `Bhagwan ${st.dedicatedBhagwan}`,
        status: 'Active',
        lastUpdated: '2026-07-19',
        rawItem: st,
      });
    });

    // Audio Library
    audioAssets.forEach((a) => {
      list.push({
        id: a.id,
        name: a.title,
        category: 'Audio Library',
        assignedLevel: `Level ${a.levelTarget}`,
        type: a.category,
        status: 'Active',
        lastUpdated: '2026-07-22',
        rawItem: a,
      });
    });

    // Games
    games.forEach((g) => {
      list.push({
        id: g.id,
        name: g.title,
        category: 'Games',
        assignedLevel: `Level ${g.levelTarget}`,
        type: `${g.category} (${g.difficulty})`,
        status: 'Active',
        lastUpdated: '2026-07-23',
        rawItem: g,
      });
    });

    // Stories
    customStories.forEach((st) => list.push(st));

    // Future
    customFuture.forEach((f) => list.push(f));

    return list;
  }, [sutras, stavans, audioAssets, games, customStories, customFuture]);

  // Items for selected category
  const categoryItems = useMemo(() => {
    return unifiedItems.filter((item) => item.category === activeCategory);
  }, [unifiedItems, activeCategory]);

  // Filtered items based on search/filters
  const filteredItems = useMemo(() => {
    return categoryItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedLevel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = levelFilter === 'ALL' || item.assignedLevel.includes(levelFilter);
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [categoryItems, searchQuery, levelFilter, statusFilter]);

  // Audio Handler
  const toggleAudio = (url: string) => {
    if (playingAudioUrl === url) {
      setPlayingAudioUrl(null);
    } else {
      setPlayingAudioUrl(url);
    }
  };

  // Actions
  const handleDuplicate = (item: ContentItem) => {
    if (isAuditor) return;
    if (item.category === 'Sutras' && item.rawItem) {
      const newSutra: SutraCatalogItem = {
        ...item.rawItem,
        id: `SUT-${Date.now()}`,
        name: `${item.name} (Copy)`,
      };
      onAddSutra(newSutra);
    } else if (item.category === 'Stavans' && item.rawItem) {
      const newStavan: StavanItem = {
        ...item.rawItem,
        id: `STV-${Date.now()}`,
        title: `${item.name} (Copy)`,
      };
      onAddStavan(newStavan);
    } else if (item.category === 'Audio Library' && item.rawItem) {
      const newAudio: AudioAsset = {
        ...item.rawItem,
        id: `AUD-${Date.now()}`,
        title: `${item.name} (Copy)`,
      };
      onAddAudio(newAudio);
    } else if (item.category === 'Games' && item.rawItem) {
      const newGame: QuizGameItem = {
        ...item.rawItem,
        id: `GM-${Date.now()}`,
        title: `${item.name} (Copy)`,
      };
      onAddGame(newGame);
    } else if (item.category === 'Stories') {
      const copy: ContentItem = {
        ...item,
        id: `STORY-${Date.now()}`,
        name: `${item.name} (Copy)`,
      };
      setCustomStories((prev) => [copy, ...prev]);
    } else {
      const copy: ContentItem = {
        ...item,
        id: `FUT-${Date.now()}`,
        name: `${item.name} (Copy)`,
      };
      setCustomFuture((prev) => [copy, ...prev]);
    }
    addToast('success', 'Content Duplicated', `Created a duplicate copy of ${item.name}`);
  };

  const handleToggleArchive = (item: ContentItem) => {
    if (isAuditor) return;
    const nextStatus = item.status === 'Active' ? 'Archived' : 'Active';
    if (item.category === 'Stories') {
      setCustomStories((prev) => prev.map((s) => (s.id === item.id ? { ...s, status: nextStatus } : s)));
    } else if (item.category === 'Future Categories') {
      setCustomFuture((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: nextStatus } : f)));
    }
    addToast('info', 'Status Updated', `${item.name} status set to ${nextStatus}`);
  };

  const handleDelete = (item: ContentItem) => {
    if (isAuditor) return;
    if (item.category === 'Stavans') onDeleteStavan(item.id);
    else if (item.category === 'Audio Library') onDeleteAudio(item.id);
    else if (item.category === 'Games') onDeleteGame(item.id);
    else if (item.category === 'Stories') setCustomStories((prev) => prev.filter((s) => s.id !== item.id));
    else if (item.category === 'Future Categories') setCustomFuture((prev) => prev.filter((f) => f.id !== item.id));
    addToast('warning', 'Content Deleted', `Removed ${item.name} from ${item.category}`);
  };

  const handleAssignLevelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!levelAssignItem || isAuditor) return;

    if (levelAssignItem.category === 'Sutras' && levelAssignItem.rawItem) {
      const lvlNum = parseInt(assignLevelSelect.replace(/\D/g, '')) || 1;
      onUpdateSutra({ ...levelAssignItem.rawItem, targetLevel: lvlNum });
    } else if (levelAssignItem.category === 'Audio Library' && levelAssignItem.rawItem) {
      const lvlNum = parseInt(assignLevelSelect.replace(/\D/g, '')) || 1;
      onUpdateAudio({ ...levelAssignItem.rawItem, levelTarget: lvlNum });
    } else if (levelAssignItem.category === 'Games' && levelAssignItem.rawItem) {
      const lvlNum = parseInt(assignLevelSelect.replace(/\D/g, '')) || 1;
      onUpdateGame({ ...levelAssignItem.rawItem, levelTarget: lvlNum });
    } else if (levelAssignItem.category === 'Stories') {
      setCustomStories((prev) =>
        prev.map((s) => (s.id === levelAssignItem.id ? { ...s, assignedLevel: assignLevelSelect } : s))
      );
    }
    addToast('success', 'Level Assigned', `Updated assigned level for ${levelAssignItem.name}`);
    setLevelAssignItem(null);
  };

  // Add Item Modal Form state
  const [newContentForm, setNewContentForm] = useState({
    title: '',
    category: 'Sutras' as ContentCategory,
    assignedLevel: 'Level 1',
    type: 'General',
    description: '',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  });

  const handleAddContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const category = newContentForm.category;
    if (category === 'Sutras') {
      const lvlNum = parseInt(newContentForm.assignedLevel.replace(/\D/g, '')) || 1;
      onAddSutra({
        id: `SUT-${Date.now()}`,
        name: newContentForm.title,
        targetLevel: lvlNum,
        prakrit: [newContentForm.description || 'Prakrit verses text...'],
        languages: ['Hindi', 'English'],
        audioUrl: newContentForm.audioUrl,
        pdfLyrics: true,
      });
    } else if (category === 'Stavans') {
      onAddStavan({
        id: `STV-${Date.now()}`,
        title: newContentForm.title,
        dedicatedBhagwan: newContentForm.type || 'Mahavira',
        alphabetGroup: newContentForm.title.charAt(0).toUpperCase(),
        audioUrl: newContentForm.audioUrl,
        youtubeUrl: 'https://youtube.com',
        lyrics: [newContentForm.description || 'Devotional lyrics text...'],
      });
    } else if (category === 'Audio Library') {
      const lvlNum = parseInt(newContentForm.assignedLevel.replace(/\D/g, '')) || 1;
      onAddAudio({
        id: `AUD-${Date.now()}`,
        title: newContentForm.title,
        category: 'Sutra',
        levelTarget: lvlNum,
        duration: '04:15',
        fileSize: '3.8 MB',
        audioUrl: newContentForm.audioUrl,
      });
    } else if (category === 'Games') {
      const lvlNum = parseInt(newContentForm.assignedLevel.replace(/\D/g, '')) || 1;
      onAddGame({
        id: `GM-${Date.now()}`,
        title: newContentForm.title,
        category: 'Quiz',
        levelTarget: lvlNum,
        difficulty: 'Easy',
        rewardPoints: 20,
        timesPlayed: 0,
        configJson: '{}',
      });
    } else if (category === 'Stories') {
      setCustomStories((prev) => [
        {
          id: `STORY-${Date.now()}`,
          name: newContentForm.title,
          category: 'Stories',
          assignedLevel: newContentForm.assignedLevel,
          type: newContentForm.type || 'Moral Story',
          status: 'Active',
          lastUpdated: new Date().toISOString().split('T')[0],
          rawItem: { description: newContentForm.description },
        },
        ...prev,
      ]);
    } else {
      setCustomFuture((prev) => [
        {
          id: `FUT-${Date.now()}`,
          name: newContentForm.title,
          category: 'Future Categories',
          assignedLevel: newContentForm.assignedLevel,
          type: newContentForm.type || 'Interactive Module',
          status: 'Draft',
          lastUpdated: new Date().toISOString().split('T')[0],
          rawItem: { description: newContentForm.description },
        },
        ...prev,
      ]);
    }

    addToast('success', 'Content Created', `Added ${newContentForm.title} to ${category}`);
    setIsAddModalOpen(false);
    setNewContentForm({
      title: '',
      category: activeCategory,
      assignedLevel: 'Level 1',
      type: 'General',
      description: '',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    });
  };

  const pendingSubmissions = submissions.filter((s) => s.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Learning Content Repository</h1>
        </div>

        <div className="flex items-center gap-2">
          {activeCategory === 'Sutras' && (
            <button
              onClick={() => setViewSubmissionsQueue(!viewSubmissionsQueue)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                viewSubmissionsQueue
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4 text-[#163E2B]" />
              <span>Recitations Queue</span>
              {pendingSubmissions.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#163E2B] text-white font-mono">
                  {pendingSubmissions.length}
                </span>
              )}
            </button>
          )}

          {!isAuditor && (
            <button
              onClick={() => {
                setNewContentForm((prev) => ({ ...prev, category: activeCategory }));
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Content</span>
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY SELECTOR CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: 'Sutras', label: 'Sutras', icon: BookOpen, count: sutras.length },
          { id: 'Stavans', label: 'Stavans', icon: Music, count: stavans.length },
          { id: 'Audio Library', label: 'Audio Library', icon: FileAudio, count: audioAssets.length },
          { id: 'Games', label: 'Games', icon: Gamepad2, count: games.length },
          { id: 'Stories', label: 'Stories', icon: Bookmark, count: customStories.length },
          { id: 'Future Categories', label: 'Future Content', icon: Sparkles, count: customFuture.length },
        ].map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as ContentCategory);
                setViewSubmissionsQueue(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#163E2B] text-white border-[#163E2B] shadow-sm'
                  : 'bg-white text-slate-800 border-stone-200/90 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-200' : 'text-[#163E2B]'}`} />
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold leading-snug">{cat.label}</h3>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  File Management
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* STUDENT RECITATIONS SUBMISSIONS QUEUE VIEW */}
      {viewSubmissionsQueue && activeCategory === 'Sutras' ? (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Student Recitations Submissions Queue</h2>
              <p className="text-xs text-slate-500">
                Review student audio recordings and award points for Sutra Gathas.
              </p>
            </div>
            <button
              onClick={() => setViewSubmissionsQueue(false)}
              className="text-xs font-bold text-[#163E2B] hover:underline cursor-pointer"
            >
              Back to Sutras Table
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Sub ID</th>
                  <th className="py-3 px-4 font-bold">Student</th>
                  <th className="py-3 px-4 font-bold">Sutra Name</th>
                  <th className="py-3 px-4 font-bold">Audio Recitation</th>
                  <th className="py-3 px-4 font-bold">Submission Date</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/80">
                    <td className="py-3.5 px-4 font-mono text-[#163E2B] font-bold">{sub.id}</td>
                    <td className="py-3.5 px-4 font-bold">{sub.studentName}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold">{sub.sutraName}</div>
                      <span className="text-[10px] font-mono text-slate-500">{sub.gathaCount} Gatha(s) Recited</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleAudio(sub.audioUrl)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {playingAudioUrl === sub.audioUrl ? (
                          <Pause className="w-3.5 h-3.5 text-[#163E2B]" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-[#163E2B]" />
                        )}
                        <span>{playingAudioUrl === sub.audioUrl ? 'Pause' : 'Listen Recording'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{sub.submittedDate}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : sub.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {sub.status === 'Pending' && !isAuditor ? (
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Review & Grade</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">
                          {sub.status === 'Approved' ? `Graded (+${sub.pointsAwarded} pts)` : 'Closed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* MAIN CONTENT TABLE VIEW */
        <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden space-y-3">
          {/* Controls Header */}
          <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 font-mono uppercase">
                {activeCategory} Catalog ({filteredItems.length})
              </span>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeCategory.toLowerCase()}...`}
                  className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] font-medium"
                />
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Levels</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
                <option value="Draft">Draft</option>
              </select>

              {(searchQuery || levelFilter !== 'ALL' || statusFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLevelFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#163E2B] hover:bg-[#163E2B]/10 rounded-xl cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* TABLE */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 space-y-2 bg-stone-50/50">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No {activeCategory} found</p>
              <p className="text-xs text-slate-500">Try adjusting your search filter or add a new content file.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Name</th>
                    <th className="py-3 px-4 font-bold">Assigned Level</th>
                    <th className="py-3 px-4 font-bold">Type</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Last Updated</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">({item.id})</span>
                        </div>
                      </td>

                      {/* Assigned Level */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-100 text-slate-800 border border-stone-200 inline-block">
                          {item.assignedLevel}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 font-mono text-slate-600">{item.type}</td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                            item.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : item.status === 'Archived'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Last Updated */}
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{item.lastUpdated}</td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View */}
                          <button
                            onClick={() => setViewingItem(item)}
                            className="p-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Assign Level */}
                          {!isAuditor && (
                            <button
                              onClick={() => {
                                setLevelAssignItem(item);
                                setAssignLevelSelect(item.assignedLevel);
                              }}
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-indigo-700 rounded-lg cursor-pointer transition-colors"
                              title="Assign Level"
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Duplicate */}
                          {!isAuditor && (
                            <button
                              onClick={() => handleDuplicate(item)}
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-emerald-700 rounded-lg cursor-pointer transition-colors"
                              title="Duplicate Content"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Archive */}
                          {!isAuditor && (
                            <button
                              onClick={() => handleToggleArchive(item)}
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-amber-700 rounded-lg cursor-pointer transition-colors"
                              title={item.status === 'Active' ? 'Archive Content' : 'Unarchive Content'}
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete */}
                          {!isAuditor && (
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg cursor-pointer transition-colors"
                              title="Delete Content"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW ITEM MODAL */}
      {viewingItem && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#163E2B] bg-[#163E2B]/10 px-2.5 py-0.5 rounded-full uppercase">
                  {viewingItem.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{viewingItem.name}</h3>
              </div>
              <button onClick={() => setViewingItem(null)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-slate-500 block text-[10px]">Assigned Level:</span>
                  <strong className="text-slate-900 font-bold">{viewingItem.assignedLevel}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Type / Category:</span>
                  <strong className="text-slate-900 font-bold">{viewingItem.type}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Status:</span>
                  <strong className="text-slate-900 font-bold">{viewingItem.status}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Last Updated:</span>
                  <strong className="text-slate-900 font-mono font-bold">{viewingItem.lastUpdated}</strong>
                </div>
              </div>

              {viewingItem.rawItem?.description && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-slate-500 block text-[10px] mb-0.5">Description:</span>
                  <p className="text-slate-800 leading-relaxed">{viewingItem.rawItem.description}</p>
                </div>
              )}

              {viewingItem.rawItem?.audioUrl && (
                <div className="pt-2">
                  <span className="text-slate-500 block text-[10px] mb-1">Audio Player:</span>
                  <button
                    onClick={() => toggleAudio(viewingItem.rawItem.audioUrl)}
                    className="w-full p-2.5 bg-[#163E2B] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {playingAudioUrl === viewingItem.rawItem.audioUrl ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>{playingAudioUrl === viewingItem.rawItem.audioUrl ? 'Pause Audio' : 'Play Audio Recording'}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setViewingItem(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN LEVEL MODAL */}
      {levelAssignItem && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">Assign Level to Content</h3>
              <button onClick={() => setLevelAssignItem(null)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignLevelSubmit} className="space-y-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Content Name:</span>
                <strong className="text-slate-900 text-sm font-bold block mt-0.5">{levelAssignItem.name}</strong>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Pathshala Level</label>
                <select
                  value={assignLevelSelect}
                  onChange={(e) => setAssignLevelSelect(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                  <option value="Level 2 - Madhyamik">Level 2 - Madhyamik</option>
                  <option value="Level 3 - Shravak Junior">Level 3 - Shravak Junior</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLevelAssignItem(null)}
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

      {/* ADD CONTENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">Add New Learning Content</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Content Category</label>
                <select
                  value={newContentForm.category}
                  onChange={(e) =>
                    setNewContentForm({ ...newContentForm, category: e.target.value as ContentCategory })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  <option value="Sutras">Sutras</option>
                  <option value="Stavans">Stavans</option>
                  <option value="Audio Library">Audio Library</option>
                  <option value="Games">Games</option>
                  <option value="Stories">Stories</option>
                  <option value="Future Categories">Future Categories</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Title / Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newContentForm.title}
                  onChange={(e) => setNewContentForm({ ...newContentForm, title: e.target.value })}
                  placeholder="e.g., Logassa Sutra or Neminath Stavan"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Assigned Level</label>
                  <select
                    value={newContentForm.assignedLevel}
                    onChange={(e) => setNewContentForm({ ...newContentForm, assignedLevel: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  >
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Type / Sub-type</label>
                  <input
                    type="text"
                    value={newContentForm.type}
                    onChange={(e) => setNewContentForm({ ...newContentForm, type: e.target.value })}
                    placeholder="e.g. Recitation, Moral, Hymn"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description / Lyrics / Verses</label>
                <textarea
                  rows={3}
                  value={newContentForm.description}
                  onChange={(e) => setNewContentForm({ ...newContentForm, description: e.target.value })}
                  placeholder="Enter details, Prakrit verses, or lyrics..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW & GRADE SUBMISSION MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">Review Audio Recitation</h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                <div>Student: <strong className="text-slate-900">{selectedSubmission.studentName}</strong></div>
                <div>Sutra: <strong className="text-[#163E2B]">{selectedSubmission.sutraName}</strong> ({selectedSubmission.gathaCount} Gathas)</div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Award Points</label>
                <input
                  type="number"
                  value={reviewPoints}
                  onChange={(e) => setReviewPoints(parseInt(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Feedback Notes</label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Excellent pronunciation and rhythm..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onRejectSubmission(selectedSubmission, reviewNotes || 'Needs practice');
                    setSelectedSubmission(null);
                    addToast('warning', 'Submission Rejected', 'Sent feedback for re-recording.');
                  }}
                  className="px-4 py-2 bg-rose-50 text-rose-800 border border-rose-200 font-bold rounded-xl hover:bg-rose-100 cursor-pointer"
                >
                  Reject & Re-record
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onApproveSubmission(selectedSubmission, reviewPoints, reviewNotes || 'Well recited');
                    setSelectedSubmission(null);
                    addToast('success', 'Submission Approved', `Awarded ${reviewPoints} points.`);
                  }}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Approve & Award Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
