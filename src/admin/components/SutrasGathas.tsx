import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Award,
  Plus,
  Edit2,
  Trash2,
  X,
  Music,
  Check,
} from 'lucide-react';
import { SutraCatalogItem, GathaSubmission, AdminRole } from '../types';

interface SutrasGathasProps {
  sutras: SutraCatalogItem[];
  submissions: GathaSubmission[];
  currentRole: AdminRole;
  onAddSutra: (sutra: SutraCatalogItem) => void;
  onUpdateSutra: (sutra: SutraCatalogItem) => void;
  onApproveSubmission: (sub: GathaSubmission, points: number, notes: string) => void;
  onRejectSubmission: (sub: GathaSubmission, notes: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const SutrasGathas: React.FC<SutrasGathasProps> = ({
  sutras,
  submissions,
  currentRole,
  onAddSutra,
  onUpdateSutra,
  onApproveSubmission,
  onRejectSubmission,
  addToast,
}) => {
  const [subTab, setSubTab] = useState<'catalog' | 'submissions'>('submissions');
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);

  const isAuditor = currentRole === 'Auditor';

  // Submission review modal
  const [selectedSubmission, setSelectedSubmission] = useState<GathaSubmission | null>(null);
  const [reviewPoints, setReviewPoints] = useState(25);
  const [reviewNotes, setReviewNotes] = useState('');

  // Sutra modal
  const [isSutraModalOpen, setIsSutraModalOpen] = useState(false);
  const [editingSutra, setEditingSutra] = useState<SutraCatalogItem | null>(null);
  const [sutraForm, setSutraForm] = useState({
    name: '',
    targetLevel: 1,
    prakritText: '',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  });

  const toggleAudio = (url: string) => {
    if (playingAudioUrl === url) {
      setPlayingAudioUrl(null);
    } else {
      setPlayingAudioUrl(url);
    }
  };

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission || isAuditor) return;

    onApproveSubmission(selectedSubmission, reviewPoints, reviewNotes);
    addToast('success', 'Gatha Submission Approved', `Awarded ${reviewPoints} points to ${selectedSubmission.studentName}`);
    setSelectedSubmission(null);
  };

  const openAddSutraModal = () => {
    setEditingSutra(null);
    setSutraForm({
      name: '',
      targetLevel: 1,
      prakritText: '',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    });
    setIsSutraModalOpen(true);
  };

  const handleSutraFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const prakritLines = sutraForm.prakritText.split('\n').filter((l) => l.trim().length > 0);

    if (editingSutra) {
      onUpdateSutra({
        ...editingSutra,
        name: sutraForm.name,
        targetLevel: sutraForm.targetLevel,
        prakrit: prakritLines,
        audioUrl: sutraForm.audioUrl,
      });
      addToast('success', 'Sutra Catalog Updated', `Updated ${sutraForm.name}`);
    } else {
      const newSutra: SutraCatalogItem = {
        id: `SUT-${sutras.length + 1}`,
        name: sutraForm.name,
        targetLevel: sutraForm.targetLevel,
        prakrit: prakritLines,
        languages: ['Prakrit', 'English', 'Hindi', 'Gujarati'],
        audioUrl: sutraForm.audioUrl,
        pdfLyrics: true,
      };
      onAddSutra(newSutra);
      addToast('success', 'Sutra Added', `Added ${newSutra.name} to Pathshala catalog.`);
    }
    setIsSutraModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sutras & Gathas Recitation Management</h1>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setSubTab('submissions')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'submissions' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Submissions Queue ({submissions.filter((s) => s.status === 'Pending').length})</span>
          </button>
          <button
            onClick={() => setSubTab('catalog')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'catalog' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sutras Catalog ({sutras.length})</span>
          </button>
        </div>
      </div>

      {/* Submissions Queue View */}
      {subTab === 'submissions' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900">Student Recitation Submissions Queue</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Sub ID</th>
                    <th className="py-2.5 px-4 font-bold">Student</th>
                    <th className="py-2.5 px-4 font-bold">Sutra & Gatha Count</th>
                    <th className="py-2.5 px-4 font-bold">Audio Recitation</th>
                    <th className="py-2.5 px-4 font-bold">Submission Date</th>
                    <th className="py-2.5 px-4 font-bold">Status</th>
                    <th className="py-2.5 px-4 text-right font-bold">Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium bg-white">
                  {submissions.map((sub) => {
                    const isPending = sub.status === 'Pending';
                    const isPlaying = playingAudioUrl === sub.audioUrl;

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#163E2B]">{sub.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{sub.studentName}</td>
                        <td className="py-3 px-4">
                          <div className="text-slate-900 font-semibold">{sub.sutraName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{sub.gathaCount} Gatha(s) Recited</div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleAudio(sub.audioUrl)}
                            className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                              isPlaying
                                ? 'bg-[#163E2B] border-[#163E2B] text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                            <span>{isPlaying ? 'Pause Audio' : 'Listen Recording'}</span>
                          </button>

                          {isPlaying && (
                            <div className="mt-2">
                              <audio src={sub.audioUrl} autoPlay controls className="h-8 w-48 rounded" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">{sub.submittedDate}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              sub.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : sub.status === 'Pending'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {isPending && !isAuditor ? (
                            <button
                              onClick={() => {
                                setSelectedSubmission(sub);
                                setReviewPoints(sub.gathaCount * 15);
                                setReviewNotes('Excellent pronunciation.');
                              }}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Review & Grade</span>
                            </button>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-400">Graded (+{sub.pointsAwarded} pts)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sutras Catalog View */}
      {subTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900">Sutras Curriculum Catalog</h2>
            {!isAuditor && (
              <button
                onClick={openAddSutraModal}
                className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Sutra</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sutras.map((sut) => (
              <div key={sut.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#163E2B]">{sut.id} • Target Level {sut.targetLevel}</span>
                    <h3 className="text-base font-bold text-slate-900">{sut.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-[#163E2B] text-[10px] font-mono font-bold border border-amber-200">
                    {sut.prakrit.length} Gathas
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1 font-serif text-slate-700 text-xs italic">
                  {sut.prakrit.map((line, i) => (
                    <p key={i}>"{line}"</p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <span>Languages: {sut.languages.join(', ')}</span>
                  <a
                    href={sut.audioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#163E2B] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>Master Audio</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Grade Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Grade Recitation Submission</h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApproveSubmit} className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900">{selectedSubmission.studentName}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedSubmission.sutraName} ({selectedSubmission.gathaCount} Gathas)</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Award Pathshala Reward Points
                </label>
                <input
                  type="number"
                  required
                  value={reviewPoints}
                  onChange={(e) => setReviewPoints(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Reviewer Notes / Feedback for Student
                </label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  Approve & Award Points
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sutra Add Modal */}
      {isSutraModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Add Sutra to Catalog</h3>
              <button onClick={() => setIsSutraModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSutraFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Sutra Title</label>
                <input
                  type="text"
                  required
                  value={sutraForm.name}
                  onChange={(e) => setSutraForm({ ...sutraForm, name: e.target.value })}
                  placeholder="e.g., Namutthunam Sutra"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Target Academic Level</label>
                <select
                  value={sutraForm.targetLevel}
                  onChange={(e) => setSutraForm({ ...sutraForm, targetLevel: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                >
                  <option value={1}>Level 1 - Prarambhik</option>
                  <option value={2}>Level 2 - Madhyamik</option>
                  <option value={3}>Level 3 - Shravak Junior</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  Prakrit Verses (One per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={sutraForm.prakritText}
                  onChange={(e) => setSutraForm({ ...sutraForm, prakritText: e.target.value })}
                  placeholder="Line 1&#10;Line 2..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-serif"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSutraModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Sutra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
