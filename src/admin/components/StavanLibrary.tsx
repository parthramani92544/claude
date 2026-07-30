import React, { useState } from 'react';
import {
  Music,
  Plus,
  Play,
  Pause,
  Youtube,
  BookOpen,
  Edit2,
  Trash2,
  X,
  Search,
} from 'lucide-react';
import { StavanItem, AdminRole } from '../types';

interface StavanLibraryProps {
  stavans: StavanItem[];
  currentRole: AdminRole;
  onAddStavan: (stavan: StavanItem) => void;
  onUpdateStavan: (stavan: StavanItem) => void;
  onDeleteStavan: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const StavanLibrary: React.FC<StavanLibraryProps> = ({
  stavans,
  currentRole,
  onAddStavan,
  onUpdateStavan,
  onDeleteStavan,
  addToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bhagwanFilter, setBhagwanFilter] = useState('ALL');
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);

  const [selectedLyricsStavan, setSelectedLyricsStavan] = useState<StavanItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStavan, setEditingStavan] = useState<StavanItem | null>(null);

  const isAuditor = currentRole === 'Auditor';

  const [formData, setFormData] = useState({
    title: '',
    dedicatedBhagwan: 'Bhagwan Adinath',
    alphabetGroup: 'A',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    youtubeUrl: '',
    lyricsText: '',
  });

  const filteredStavans = stavans.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dedicatedBhagwan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBhagwan = bhagwanFilter === 'ALL' || s.dedicatedBhagwan.includes(bhagwanFilter);

    return matchesSearch && matchesBhagwan;
  });

  const openAddModal = () => {
    setEditingStavan(null);
    setFormData({
      title: '',
      dedicatedBhagwan: 'Bhagwan Adinath',
      alphabetGroup: 'A',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      youtubeUrl: '',
      lyricsText: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (stavan: StavanItem) => {
    if (isAuditor) return;
    setEditingStavan(stavan);
    setFormData({
      title: stavan.title,
      dedicatedBhagwan: stavan.dedicatedBhagwan,
      alphabetGroup: stavan.alphabetGroup,
      audioUrl: stavan.audioUrl,
      youtubeUrl: stavan.youtubeUrl,
      lyricsText: stavan.lyrics.join('\n'),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const lyricsArray = formData.lyricsText.split('\n').filter((l) => l.trim().length > 0);

    if (editingStavan) {
      onUpdateStavan({
        ...editingStavan,
        title: formData.title,
        dedicatedBhagwan: formData.dedicatedBhagwan,
        alphabetGroup: formData.title.charAt(0).toUpperCase(),
        audioUrl: formData.audioUrl,
        youtubeUrl: formData.youtubeUrl,
        lyrics: lyricsArray,
      });
      addToast('success', 'Stavan Updated', `Updated stavan ${formData.title}`);
    } else {
      const newStavan: StavanItem = {
        id: `STV-${Math.floor(10 + Math.random() * 90)}`,
        title: formData.title,
        dedicatedBhagwan: formData.dedicatedBhagwan,
        alphabetGroup: formData.title.charAt(0).toUpperCase(),
        audioUrl: formData.audioUrl,
        youtubeUrl: formData.youtubeUrl,
        lyrics: lyricsArray,
      };
      onAddStavan(newStavan);
      addToast('success', 'Stavan Added', `Added ${newStavan.title} to library.`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Jain Stavan Library Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">Categorized devotional hymns, audio assets, and lyric sheets.</p>
        </div>

        {!isAuditor && (
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stavan to Library</span>
          </button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Stavan title or Tirthankar..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
          />
        </div>

        <select
          value={bhagwanFilter}
          onChange={(e) => setBhagwanFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white w-full sm:w-auto"
        >
          <option value="ALL">All Tirthankaras</option>
          <option value="Adinath">Bhagwan Adinath</option>
          <option value="Mahavir">Bhagwan Mahavir</option>
          <option value="Other">Other Tirthankars</option>
        </select>
      </div>

      {/* Stavans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStavans.map((stavan) => {
          const isPlaying = playingAudioUrl === stavan.audioUrl;

          return (
            <div key={stavan.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#163E2B]">{stavan.id} • Group {stavan.alphabetGroup}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-[#163E2B] text-[10px] font-bold border border-amber-200">
                    {stavan.dedicatedBhagwan}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{stavan.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-serif italic">"{stavan.lyrics[0]}"</p>
              </div>

              {/* Actions & Player */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayingAudioUrl(isPlaying ? null : stavan.audioUrl)}
                    className={`p-2 rounded-md border text-xs font-bold cursor-pointer transition-all ${
                      isPlaying
                        ? 'bg-[#163E2B] border-[#163E2B] text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Audio Preview"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setSelectedLyricsStavan(stavan)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lyrics</span>
                  </button>

                  {stavan.youtubeUrl && (
                    <a
                      href={stavan.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-rose-50 border border-rose-200 rounded-md text-rose-600 hover:text-rose-800 cursor-pointer transition-colors"
                      title="Watch YouTube Video"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {!isAuditor && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(stavan)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteStavan(stavan.id)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-50 text-rose-600 rounded-md cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lyrics Viewer Modal */}
      {selectedLyricsStavan && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedLyricsStavan.title}</h3>
                <p className="text-xs text-[#163E2B] font-mono mt-0.5">{selectedLyricsStavan.dedicatedBhagwan}</p>
              </div>
              <button onClick={() => setSelectedLyricsStavan(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 max-h-[350px] overflow-y-auto text-xs font-serif text-slate-700 leading-relaxed italic text-center">
              {selectedLyricsStavan.lyrics.map((verse, i) => (
                <p key={i} className="py-1 border-b border-slate-200/60 last:border-0">{verse}</p>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLyricsStavan(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close Lyrics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Stavan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingStavan ? `Edit Stavan: ${editingStavan.title}` : 'Add Stavan to Library'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Stavan Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Adinath Dada Nu Stavan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Dedicated Tirthankar</label>
                <select
                  value={formData.dedicatedBhagwan}
                  onChange={(e) => setFormData({ ...formData, dedicatedBhagwan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                >
                  <option value="Bhagwan Adinath">Bhagwan Adinath</option>
                  <option value="Bhagwan Mahavir">Bhagwan Mahavir</option>
                  <option value="Bhagwan Parshwanath">Bhagwan Parshwanath</option>
                  <option value="Other Tirthankars">Other Tirthankars</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Audio MP3 URL</label>
                <input
                  type="text"
                  required
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">YouTube Video Link (Optional)</label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Lyrics Verses (One per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.lyricsText}
                  onChange={(e) => setFormData({ ...formData, lyricsText: e.target.value })}
                  placeholder="Line 1&#10;Line 2..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-serif"
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
                  Save Stavan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
