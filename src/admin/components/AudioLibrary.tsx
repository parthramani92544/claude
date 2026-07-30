import React, { useState } from 'react';
import {
  Music,
  Plus,
  Play,
  Pause,
  Trash2,
  X,
  FileAudio,
  HardDrive,
} from 'lucide-react';
import { AudioAsset, AdminRole } from '../types';

interface AudioLibraryProps {
  assets: AudioAsset[];
  currentRole: AdminRole;
  onAddAsset: (asset: AudioAsset) => void;
  onDeleteAsset: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const AudioLibrary: React.FC<AudioLibraryProps> = ({
  assets,
  currentRole,
  onAddAsset,
  onDeleteAsset,
  addToast,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuditor = currentRole === 'Auditor';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Sutra' as 'Sutra' | 'Stavan' | 'Pravachan',
    levelTarget: 1,
    duration: '03:30',
    fileSize: '4.2 MB',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  });

  const filteredAssets = assets.filter((a) => {
    if (categoryFilter === 'ALL') return true;
    return a.category === categoryFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const newAsset: AudioAsset = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
    };
    onAddAsset(newAsset);
    addToast('success', 'Audio Asset Added', `Uploaded ${newAsset.title} (${newAsset.fileSize})`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Audio Asset Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">Central audio files management for Pravachans, Recitations & Hymns.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-800 px-3 py-2 rounded-lg focus:outline-none focus:border-[#163E2B]"
          >
            <option value="ALL">All Categories</option>
            <option value="Sutra">Sutra Recitations</option>
            <option value="Stavan">Devotional Stavans</option>
            <option value="Pravachan">Pravachan Discourses</option>
          </select>

          {!isAuditor && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Audio Asset</span>
            </button>
          )}
        </div>
      </div>

      {/* Audio Assets Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Asset ID & Title</th>
                <th className="py-2.5 px-4 font-bold">Category</th>
                <th className="py-2.5 px-4 font-bold">Target Level</th>
                <th className="py-2.5 px-4 font-mono font-bold">Duration</th>
                <th className="py-2.5 px-4 font-mono font-bold">Size</th>
                <th className="py-2.5 px-4 font-bold">Playback</th>
                <th className="py-2.5 px-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {filteredAssets.map((asset) => {
                const isPlaying = playingAudioUrl === asset.audioUrl;

                return (
                  <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <FileAudio className="w-4 h-4 text-[#163E2B] shrink-0" />
                      <div>
                        <div>{asset.title}</div>
                        <div className="text-[10px] font-mono font-bold text-[#163E2B]">{asset.id}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200">
                        {asset.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">Level {asset.levelTarget}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{asset.duration}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{asset.fileSize}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPlayingAudioUrl(isPlaying ? null : asset.audioUrl)}
                        className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          isPlaying
                            ? 'bg-[#163E2B] border-[#163E2B] text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        <span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!isAuditor && (
                        <button
                          onClick={() => onDeleteAsset(asset.id)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-50 text-rose-600 rounded-md cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Audio Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Upload Audio Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Asset Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Navkar Mantra Slow Chanting"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Sutra">Sutra</option>
                    <option value="Stavan">Stavan</option>
                    <option value="Pravachan">Pravachan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Level Target</label>
                  <select
                    value={formData.levelTarget}
                    onChange={(e) => setFormData({ ...formData, levelTarget: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Duration String</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="05:20"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">File Size</label>
                  <input
                    type="text"
                    required
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="3.5 MB"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">MP3 Audio File URL</label>
                <input
                  type="text"
                  required
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
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
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
