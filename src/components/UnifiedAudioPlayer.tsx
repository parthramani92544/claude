import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Download, 
  Share2, 
  RotateCcw, 
  RotateCw,
  BookOpen,
  Clock,
  Globe
} from 'lucide-react';

interface UnifiedAudioPlayerProps {
  title: string;
  subtitle: string;
  duration: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  onProgressChange: (val: number) => void;
  speed: string;
  onSpeedChange: (val: string) => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  isDownloaded: boolean;
  onDownloadToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShare: () => void;
  isCompact?: boolean;
}

export default function UnifiedAudioPlayer({
  title,
  subtitle,
  duration,
  isPlaying,
  onPlayPause,
  progress,
  onProgressChange,
  speed,
  onSpeedChange,
  isFavorite,
  onFavoriteToggle,
  isDownloaded,
  onDownloadToggle,
  onPrevious,
  onNext,
  onShare,
  isCompact = false,
}: UnifiedAudioPlayerProps) {
  const [isSpeedPopoverOpen, setIsSpeedPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close speed popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsSpeedPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format dynamic progress time
  const formatTime = (pct: number, durStr: string) => {
    let totalSeconds = 105;
    const parts = durStr.split(':');
    if (parts.length === 2) {
      totalSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      totalSeconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    const currentSeconds = Math.floor((pct / 100) * totalSeconds);
    const m = Math.floor(currentSeconds / 60);
    const s = currentSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getSecondsFromDur = (durStr: string) => {
    let totalSeconds = 105;
    const parts = durStr.split(':');
    if (parts.length === 2) {
      totalSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      totalSeconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return totalSeconds;
  };

  const handleSkipBackward = () => {
    const totalSeconds = getSecondsFromDur(duration);
    const currentSeconds = (progress / 100) * totalSeconds;
    const newSeconds = Math.max(0, currentSeconds - 10);
    const newPct = (newSeconds / totalSeconds) * 100;
    onProgressChange(newPct);
  };

  const handleSkipForward = () => {
    const totalSeconds = getSecondsFromDur(duration);
    const currentSeconds = (progress / 100) * totalSeconds;
    const newSeconds = Math.min(totalSeconds, currentSeconds + 10);
    const newPct = (newSeconds / totalSeconds) * 100;
    onProgressChange(newPct);
  };

  const speedOptions = ['0.5×', '1×', '1.5×', '2×'];
  const selectedLang = localStorage.getItem('selectedLanguage') || 'English';

  return (
    <div 
      id="unified-audio-player" 
      className="bg-white border-t border-slate-200 py-2.5 px-4 rounded-t-2xl shadow-[0_-8px_30px_rgba(15,23,42,0.06)] shrink-0 relative z-30 font-sans text-slate-800"
    >
      {/* 1. SOLID LOGO GREEN HEADER CARD (HIGHLY COMPACT INTEGRATION) */}
      <div className="bg-[#163E2B] rounded-xl px-3 py-1.5 text-white shadow-sm flex items-center justify-between gap-3 mb-2 max-w-2xl mx-auto">
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4 className="font-extrabold text-xs text-white leading-tight truncate">
              {title}
            </h4>
            <span className="shrink-0 inline-flex items-center gap-0.5 text-[8px] font-black text-amber-200 uppercase tracking-wider bg-white/10 px-1.5 py-0.2 rounded border border-white/10">
              {selectedLang}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-emerald-100/90 mt-0.5 font-medium">
            <span className="truncate">{subtitle}</span>
            <span className="shrink-0 text-emerald-300/60">•</span>
            <span className="shrink-0">{duration} {duration.includes('mins') || duration.includes('duration') ? '' : 'mins'}</span>
          </div>
        </div>

        {/* Action Buttons (Compact outline style) */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Share */}
          <button
            onClick={onShare}
            className="p-1 rounded-lg border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer active:scale-95"
            title="Share lesson"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Download */}
          <button
            onClick={onDownloadToggle}
            className={`p-1 rounded-lg border transition-all cursor-pointer relative active:scale-95 ${
              isDownloaded 
                ? 'border-white bg-white text-[#163E2B] font-bold' 
                : 'border-white/10 hover:bg-white/10 text-white'
            }`}
            title="Download offline"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloaded && (
              <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
            )}
          </button>

          {/* Favourite */}
          <button
            onClick={onFavoriteToggle}
            className={`p-1 rounded-lg border transition-all cursor-pointer active:scale-95 ${
              isFavorite 
                ? 'border-white bg-white text-[#163E2B] font-bold' 
                : 'border-white/10 hover:bg-white/10 text-white'
            }`}
            title="Add to study deck"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. THIN LOGO GREEN PROGRESS BAR */}
      <div className="space-y-0.5 px-0.5 max-w-2xl mx-auto">
        <div className="relative flex items-center group">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={progress}
            onChange={(e) => onProgressChange(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 rounded-full cursor-pointer appearance-none outline-none transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#163E2B] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#163E2B] [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, #163E2B 0%, #163E2B ${progress}%, #e2e8f0 ${progress}%, #e2e8f0 100%)`
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-bold font-mono text-slate-500 px-0.5 mt-0.5">
          <span>{formatTime(progress, duration)}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* 3. CENTERED AND EQUALLY SPACED CONTROLS GRID */}
      <div className="grid grid-cols-3 items-center gap-1.5 px-0.5 mt-0.5 max-w-2xl mx-auto">
        
        {/* Playback Speed Pill */}
        <div className="justify-self-start relative" ref={popoverRef}>
          <button
            onClick={() => setIsSpeedPopoverOpen(!isSpeedPopoverOpen)}
            className="px-2 py-0.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-full text-[9px] font-bold tracking-wide transition-all cursor-pointer active:scale-95 flex items-center gap-0.5 shadow-2xs"
            title="Recitation speed"
          >
            <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-wider">Speed</span>
            <span className="text-[#163E2B] font-black">{speed}</span>
          </button>

          {/* Speed Selector Dropdown overlay */}
          {isSpeedPopoverOpen && (
            <div className="absolute bottom-full left-0 mb-1.5 bg-white border border-slate-200 p-1 rounded-xl shadow-xl w-24 z-50 flex flex-col gap-0.5 text-center animate-in fade-in slide-in-from-bottom-2 duration-200">
              <span className="text-[7.5px] font-black font-sans tracking-wider text-slate-400 uppercase py-1 border-b border-slate-100 mb-0.5">SPEED</span>
              {speedOptions.map((opt) => {
                const isSelected = speed === opt || (opt === '1×' && speed === '1.0x') || (opt === '1×' && speed === '1.0×') || (opt === '1×' && speed === '1×') || (opt === '1×' && speed === '1');
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      onSpeedChange(opt);
                      setIsSpeedPopoverOpen(false);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all text-left flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50 text-[#163E2B] border border-emerald-200' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <span className="text-[#163E2B] text-[8px]">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Central Audio Control Suite */}
        <div className="justify-self-center flex items-center gap-1.5">
          {/* Previous Track */}
          <button
            onClick={onPrevious}
            className="p-1 rounded-full text-slate-400 hover:text-[#163E2B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90"
            title="Previous track"
          >
            <SkipBack className="w-3.5 h-3.5 fill-current" />
          </button>

          {/* Replay 10 Seconds */}
          <button
            onClick={handleSkipBackward}
            className="p-1 rounded-full text-slate-400 hover:text-[#163E2B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90 flex flex-col items-center justify-center relative group"
            title="Replay 10s"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[6.5px] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[1.5px] scale-90 text-slate-500 group-hover:text-[#163E2B]">10</span>
          </button>

          {/* Play / Pause */}
          <button
            onClick={onPlayPause}
            className="w-8 h-8 bg-[#163E2B] hover:bg-[#0F2D1F] text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-[#163E2B]/20 hover:scale-105 active:scale-95 transition-all relative shrink-0"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current text-white" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white" />
            )}
          </button>

          {/* Forward 10 Seconds */}
          <button
            onClick={handleSkipForward}
            className="p-1 rounded-full text-slate-400 hover:text-[#163E2B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90 flex flex-col items-center justify-center relative group"
            title="Forward 10s"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[6.5px] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[1.5px] scale-90 text-slate-500 group-hover:text-[#163E2B]">10</span>
          </button>

          {/* Next Track */}
          <button
            onClick={onNext}
            className="p-1 rounded-full text-slate-400 hover:text-[#163E2B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90"
            title="Next track"
          >
            <SkipForward className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Equalizer activity feedback icon */}
        <div className="justify-self-end flex items-center gap-[1px] h-2.5 justify-end w-10 pr-0.5 select-none font-sans">
          {[1, 2, 3, 4, 5].map((val, idx) => (
            <span
              key={idx}
              className={`w-[1px] rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#163E2B]' : 'bg-slate-300'}`}
              style={{
                height: isPlaying ? `${Math.sin(progress * 0.4 + idx) * 3 + 5}px` : '1.5px',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
