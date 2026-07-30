import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Play,
  CheckCircle2,
  BookOpen,
  Calendar,
  Award,
  Sparkles,
  ExternalLink,
  Copy,
  Moon,
  Sun,
  Volume2,
  ChevronRight,
} from 'lucide-react';
import { SutraCatalogItem, DailyQuoteItem, ScheduledClass } from '../types';

interface GlobalShowcaseProps {
  sutras: SutraCatalogItem[];
  quotes: DailyQuoteItem[];
  classes: ScheduledClass[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const GlobalShowcase: React.FC<GlobalShowcaseProps> = ({ sutras, quotes, classes, addToast }) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [previewRole, setPreviewRole] = useState<'Student' | 'Parent'>('Student');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'sutras' | 'niyam' | 'classes'>('home');
  const [checkedNiyams, setCheckedNiyams] = useState<Record<string, boolean>>({
    'Navkarwali (108 times)': true,
    'Dev Vandan': false,
    'Kandmool Tyag': true,
  });

  const toggleNiyam = (name: string) => {
    setCheckedNiyams((prev) => ({ ...prev, [name]: !prev[name] }));
    addToast('info', 'Student Simulation', `Toggled Niyam: ${name}`);
  };

  const currentQuote = quotes[0] || {
    quote: 'अहिंसा परमो धर्मः - Non-violence is the supreme virtue.',
    author: 'Bhagwan Mahavir',
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="border-l-4 border-[#163E2B] pl-3.5">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Global Showcase & Mobile Preview</h1>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Selector */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setDeviceType('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                deviceType === 'mobile' ? 'bg-[#163E2B] text-white' : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setDeviceType('tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                deviceType === 'tablet' ? 'bg-[#163E2B] text-white' : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDeviceType('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                deviceType === 'desktop' ? 'bg-[#163E2B] text-white' : 'text-slate-600 hover:bg-stone-100'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Web Portal</span>
            </button>
          </div>

          {/* Role Toggle */}
          <select
            value={previewRole}
            onChange={(e) => setPreviewRole(e.target.value as any)}
            className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 shadow-xs focus:outline-none focus:border-[#163E2B]"
          >
            <option value="Student">Student Mobile View</option>
            <option value="Parent">Parent Portal View</option>
          </select>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-white border border-stone-200 rounded-xl text-slate-700 hover:bg-stone-50 cursor-pointer shadow-xs"
            title="Toggle Preview Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Simulator Device Frame Container */}
      <div className="flex justify-center items-center py-6 bg-stone-100 border border-stone-200/90 rounded-2xl min-h-[640px]">
        <div
          className={`transition-all duration-300 shadow-2xl overflow-hidden ${
            deviceType === 'mobile'
              ? 'w-[360px] h-[640px] rounded-[36px] border-[10px] border-slate-900 bg-white relative flex flex-col'
              : deviceType === 'tablet'
              ? 'w-[580px] h-[640px] rounded-[28px] border-[10px] border-slate-900 bg-white relative flex flex-col'
              : 'w-full max-w-4xl h-[600px] rounded-2xl border border-stone-300 bg-white relative flex flex-col'
          }`}
        >
          {/* Device Top Bar Notch */}
          {deviceType === 'mobile' && (
            <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-xl shrink-0 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>
          )}

          {/* Simulated App Header */}
          <div
            className={`p-4 border-b shrink-0 flex items-center justify-between ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#163E2B] text-white border-emerald-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <div>
                <h3 className="text-xs font-black tracking-tight leading-none">Gyan Vatika</h3>
                <span className="text-[9px] font-mono opacity-80 uppercase">{previewRole} Experience</span>
              </div>
            </div>

            <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 font-bold">
              Level 1
            </div>
          </div>

          {/* Simulated Screen Body */}
          <div
            className={`flex-1 p-4 overflow-y-auto space-y-4 text-xs ${
              isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-stone-50 text-slate-800'
            }`}
          >
            {activeTab === 'home' && (
              <>
                {/* Daily Quote Banner */}
                <div
                  className={`p-4 rounded-2xl border shadow-xs space-y-1.5 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-200/80'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold uppercase text-[#163E2B]">DAILY SUTRA QUOTE</span>
                  <p className="text-xs font-bold text-slate-900 italic">"{currentQuote.quote}"</p>
                  <span className="text-[10px] font-semibold text-slate-500 block">— {currentQuote.author}</span>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'}`}>
                    <span className="block text-base font-black text-[#163E2B]">420</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Karma Pts</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'}`}>
                    <span className="block text-base font-black text-emerald-600">7 Days</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Streak</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'}`}>
                    <span className="block text-base font-black text-amber-600">8 Gathas</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Learned</span>
                  </div>
                </div>

                {/* Upcoming Live Class Tile */}
                {classes.length > 0 && (
                  <div className={`p-3.5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-emerald-50 text-[#163E2B] border border-emerald-200">
                        NEXT LIVE CLASS
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{classes[0].dateTime.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs">{classes[0].topic}</h4>
                      <p className="text-[10px] text-slate-500">Guruji: {classes[0].guruji}</p>
                    </div>
                    <button
                      onClick={() => addToast('info', 'Live Class Launch', 'Simulating video class joining.')}
                      className="w-full py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Join Class Room</span>
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'sutras' && (
              <div className="space-y-3">
                <h3 className="font-black text-sm text-slate-900">Sutras & Recitations</h3>
                <div className="space-y-2">
                  {sutras.slice(0, 4).map((s) => (
                    <div
                      key={s.id}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200 shadow-xs'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#163E2B]">SEQ #{s.sequenceNo}</span>
                        <h4 className="font-bold text-slate-900 text-xs">{s.titleOriginal}</h4>
                        <p className="text-[10px] text-slate-500">{s.titleEnglish} ({s.gathasCount} Gathas)</p>
                      </div>
                      <button
                        onClick={() => addToast('info', 'Audio Audio Player', `Playing pronunciation for ${s.titleEnglish}`)}
                        className="p-2 rounded-xl bg-emerald-50 text-[#163E2B] hover:bg-emerald-100 cursor-pointer border border-emerald-200"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'niyam' && (
              <div className="space-y-3">
                <h3 className="font-black text-sm text-slate-900">Daily Niyam Checklist</h3>
                <div className="space-y-2">
                  {Object.entries(checkedNiyams).map(([name, isDone]) => (
                    <div
                      key={name}
                      onClick={() => toggleNiyam(name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                          : isDarkMode
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <span className="font-bold text-xs">{name}</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Simulated App Navigation Bar */}
          <div
            className={`p-2 border-t shrink-0 grid grid-cols-3 text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-stone-200 text-slate-600'
            }`}
          >
            <button
              onClick={() => setActiveTab('home')}
              className={`py-1 text-[10px] font-bold rounded-lg ${
                activeTab === 'home' ? 'text-[#163E2B] font-black' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('sutras')}
              className={`py-1 text-[10px] font-bold rounded-lg ${
                activeTab === 'sutras' ? 'text-[#163E2B] font-black' : ''
              }`}
            >
              Sutras
            </button>
            <button
              onClick={() => setActiveTab('niyam')}
              className={`py-1 text-[10px] font-bold rounded-lg ${
                activeTab === 'niyam' ? 'text-[#163E2B] font-black' : ''
              }`}
            >
              Niyams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
