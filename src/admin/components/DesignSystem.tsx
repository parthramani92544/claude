import React, { useState } from 'react';
import {
  Palette,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Sliders,
  Bell,
  Eye,
} from 'lucide-react';

interface DesignSystemProps {
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const DesignSystem: React.FC<DesignSystemProps> = ({ addToast }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'buttons' | 'badges' | 'toasts'>('tokens');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Admin Design System & Component Playground</h1>
          <p className="text-xs text-slate-400 mt-1">Design tokens, color swatches, button states, and notification toasts sandbox.</p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'tokens' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tokens & Colors
          </button>
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'buttons' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Buttons & Inputs
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'badges' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Badges & Statuses
          </button>
          <button
            onClick={() => setActiveTab('toasts')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'toasts' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Toast Sandbox
          </button>
        </div>
      </div>

      {/* Tokens View */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="text-sm font-extrabold text-white">Color Palette Swatches</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="h-16 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400">#020617</div>
                <div className="font-bold text-white">Slate 950</div>
                <div className="text-[10px] text-slate-500">Main Canvas</div>
              </div>

              <div className="space-y-1">
                <div className="h-16 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400">#0f172a</div>
                <div className="font-bold text-white">Slate 900</div>
                <div className="text-[10px] text-slate-500">Card Surface</div>
              </div>

              <div className="space-y-1">
                <div className="h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">#4f46e5</div>
                <div className="font-bold text-white">Indigo 600</div>
                <div className="text-[10px] text-slate-500">Primary Brand Accent</div>
              </div>

              <div className="space-y-1">
                <div className="h-16 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">#059669</div>
                <div className="font-bold text-white">Emerald 600</div>
                <div className="text-[10px] text-slate-500">Success / Approved</div>
              </div>

              <div className="space-y-1">
                <div className="h-16 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold">#d97706</div>
                <div className="font-bold text-white">Amber 600</div>
                <div className="text-[10px] text-slate-500">Reward Points / Pending</div>
              </div>

              <div className="space-y-1">
                <div className="h-16 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">#e11d48</div>
                <div className="font-bold text-white">Rose 600</div>
                <div className="text-[10px] text-slate-500">Danger / Rejected</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons View */}
      {activeTab === 'buttons' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-6">
          <h3 className="text-sm font-extrabold text-white">Button Variants & Controls</h3>

          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
              Success Button
            </button>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
              Warning Button
            </button>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
              Danger Button
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 cursor-pointer">
              Secondary Button
            </button>
          </div>
        </div>
      )}

      {/* Badges View */}
      {activeTab === 'badges' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-6">
          <h3 className="text-sm font-extrabold text-white">Badge Pills & Indicators</h3>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
              Active Session
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Approved
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
              Pending Approval
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
              Rejected / Terminated
            </span>
          </div>
        </div>
      )}

      {/* Toast Sandbox View */}
      {activeTab === 'toasts' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-6">
          <h3 className="text-sm font-extrabold text-white">Toast Notification Dispatcher Sandbox</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => addToast('success', 'Operation Completed', 'Student enrollment approved successfully.')}
              className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl text-emerald-200 font-bold text-xs hover:bg-emerald-900 cursor-pointer text-center space-y-1"
            >
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400" />
              <div>Trigger Success Toast</div>
            </button>

            <button
              onClick={() => addToast('error', 'Authentication Error', 'Invalid portal access key or credentials.')}
              className="p-4 bg-rose-950/60 border border-rose-800/80 rounded-2xl text-rose-200 font-bold text-xs hover:bg-rose-900 cursor-pointer text-center space-y-1"
            >
              <XCircle className="w-5 h-5 mx-auto text-rose-400" />
              <div>Trigger Error Toast</div>
            </button>

            <button
              onClick={() => addToast('warning', 'Cutoff Approaching', 'Daily Niyam submission window closes in 15 mins.')}
              className="p-4 bg-amber-950/60 border border-amber-800/80 rounded-2xl text-amber-200 font-bold text-xs hover:bg-amber-900 cursor-pointer text-center space-y-1"
            >
              <AlertTriangle className="w-5 h-5 mx-auto text-amber-400" />
              <div>Trigger Warning Toast</div>
            </button>

            <button
              onClick={() => addToast('info', 'System Sync Active', 'Refreshing Pathshala database records...')}
              className="p-4 bg-indigo-950/60 border border-indigo-800/80 rounded-2xl text-indigo-200 font-bold text-xs hover:bg-indigo-900 cursor-pointer text-center space-y-1"
            >
              <Info className="w-5 h-5 mx-auto text-indigo-400" />
              <div>Trigger Info Toast</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
