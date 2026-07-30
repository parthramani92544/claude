import React, { useState } from 'react';
import {
  Gamepad2,
  Plus,
  Play,
  Edit2,
  Trash2,
  X,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { QuizGameItem, AdminRole } from '../types';

interface GamesConsoleProps {
  games: QuizGameItem[];
  currentRole: AdminRole;
  onAddGame: (game: QuizGameItem) => void;
  onDeleteGame: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const GamesConsole: React.FC<GamesConsoleProps> = ({
  games,
  currentRole,
  onAddGame,
  onDeleteGame,
  addToast,
}) => {
  const [playingGame, setPlayingGame] = useState<QuizGameItem | null>(null);
  const [gameScore, setGameScore] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuditor = currentRole === 'Auditor';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Memory Match' as 'Memory Match' | 'Quiz' | 'Word Puzzle',
    levelTarget: 1,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    rewardPoints: 30,
    configJson: '{"type":"memory_match","cards":12}',
  });

  const handleSimulateGame = (game: QuizGameItem) => {
    setPlayingGame(game);
    setGameScore(0);
    addToast('info', 'Game Simulator Launched', `Playing test instance for ${game.title}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const newGame: QuizGameItem = {
      id: `GM-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      timesPlayed: 0,
    };
    onAddGame(newGame);
    addToast('success', 'Game Published', `Published ${newGame.title} to student app console.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gamified Learning & Quiz Console</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure Jain values games, memory puzzles, and reward point quizzes.</p>
        </div>

        {!isAuditor && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Game Activity</span>
          </button>
        )}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {games.map((game) => (
          <div key={game.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#163E2B]">{game.id} • Level {game.levelTarget}</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-[#163E2B] text-[10px] font-mono font-bold border border-amber-200">
                  +{game.rewardPoints} Points
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{game.title}</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">{game.category}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">{game.difficulty}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Student Plays:</span>
              <span className="font-bold text-slate-800">{game.timesPlayed} completions</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleSimulateGame(game)}
                className="px-3 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test Simulator</span>
              </button>

              {!isAuditor && (
                <button
                  onClick={() => onDeleteGame(game.id)}
                  className="p-1.5 bg-slate-100 hover:bg-rose-50 text-rose-600 rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simulator Modal */}
      {playingGame && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800 text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Simulator: {playingGame.title}</h3>
              <button onClick={() => setPlayingGame(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <Gamepad2 className="w-12 h-12 text-[#163E2B] mx-auto animate-bounce" />
              <div>
                <p className="text-sm font-bold text-slate-900">Interactive Sandbox Active</p>
                <p className="text-xs text-slate-500 mt-1">Simulating student gameplay for reward point allocation testing.</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                <span>Score: {gameScore} / 100</span>
              </div>

              <button
                onClick={() => {
                  setGameScore(100);
                  addToast('success', 'Simulation Passed', `Awarded +${playingGame.rewardPoints} points in test sandbox!`);
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors"
              >
                Complete Sample Quiz Match (+{playingGame.rewardPoints} pts)
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPlayingGame(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Create Game Activity</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Game Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., 24 Tirthankaras Symbol Match"
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
                    <option value="Memory Match">Memory Match</option>
                    <option value="Quiz">MCQ Quiz</option>
                    <option value="Word Puzzle">Word Puzzle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Target Level</label>
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
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Reward Points</label>
                  <input
                    type="number"
                    required
                    value={formData.rewardPoints}
                    onChange={(e) => setFormData({ ...formData, rewardPoints: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                  />
                </div>
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
                  Publish Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
