import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Volume2, 
  Download, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw,
  FileText, 
  Eye, 
  Check, 
  X, 
  Sparkles, 
  ChevronRight, 
  Share2, 
  Heart, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  MoreHorizontal, 
  Headphones,
  SlidersHorizontal,
  LayoutGrid,
  GraduationCap,
  Music,
  ScrollText,
  Quote
} from 'lucide-react';
import { LevelSyllabus } from '../syllabusData';
import { PathshalaLogo } from './PathshalaLogo';
import { INITIAL_LEVELS } from '../admin/data';
import { AcademicLevel, LevelSyllabusItem } from '../admin/types';
import { sutrasList } from '../data';

interface SyllabusModuleProps {
  syllabusData?: Record<string, LevelSyllabus>;
  onUpdateSyllabusData?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  currentStudentLevel?: string;
  studentName?: string;
  onBackToHome: () => void;
  onOpenAudioPlayer?: (track: any) => void;
  initialSelectedLevelKey?: string | null;
  mode?: 'my_courses' | 'courses';
}

export const SyllabusModule: React.FC<SyllabusModuleProps> = ({
  syllabusData = {},
  onUpdateSyllabusData,
  currentStudentLevel = "Level 1: Basic Sutras",
  studentName = "Aarav Shah",
  onBackToHome,
  onOpenAudioPlayer,
  initialSelectedLevelKey = null,
  mode = 'my_courses',
}) => {
  // Retrieve academic levels from localStorage / INITIAL_LEVELS
  const [academicLevels, setAcademicLevels] = useState<AcademicLevel[]>(() => {
    try {
      const stored = localStorage.getItem('admin_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.academicLevels && Array.isArray(parsed.academicLevels)) {
          return parsed.academicLevels;
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
    return [
      {
        id: 'LVL-1',
        name: 'Level 1 – Prarambhik',
        syllabus: [
          { id: 'SYL-101', chapterName: 'Navkar Mantra – Part 1', learningType: 'Sutra', sequenceOrder: 1, durationWeeks: 2, description: 'The primordial mantra of Jainism offering reverent salutations to the Pancha Paramesthi.' },
          { id: 'SYL-102', chapterName: 'Navkar Mantra – Part 2', learningType: 'Sutra', sequenceOrder: 2, durationWeeks: 2, description: 'Explanation of Eso Pancha Namukkaro and its supreme auspicious protection.' },
          { id: 'SYL-103', chapterName: 'Chattari Mangalam: Padhamam', learningType: 'Sutra', sequenceOrder: 3, durationWeeks: 3, description: 'The four supreme refuges and four auspicious entities in the universe.' },
          { id: 'SYL-104', chapterName: 'Panchindiya Sutra: Paramesthi', learningType: 'Sutra', sequenceOrder: 4, durationWeeks: 2, description: 'Recitation on mastering sensory control and devotion to the five supreme souls.' },
          { id: 'SYL-105', chapterName: 'Pratham Stavan: Shlok 1', learningType: 'Stavan', sequenceOrder: 5, durationWeeks: 2, description: 'Devotional melodic hymn expressing praise to the 24 Tirthankaras.' },
          { id: 'SYL-106', chapterName: 'Mangalacharan Gatha', learningType: 'Gatha', sequenceOrder: 6, durationWeeks: 3, description: 'Poetic verse invoking auspicious divine blessings before undertaking sacred study.' },
          { id: 'SYL-107', chapterName: 'Khamasama Sutra: Part 1', learningType: 'Sutra', sequenceOrder: 7, durationWeeks: 2, description: 'Formula of humble prostration while seeking forgiveness and showing deep reverence to Gurus.' },
          { id: 'SYL-108', chapterName: 'Icchami Khamasamam', learningType: 'Sutra', sequenceOrder: 8, durationWeeks: 2, description: 'Reverential bowing and seeking guru permission for swadhyay and rituals.' },
          { id: 'SYL-109', chapterName: 'Tirthankara Stavan: Parshwanath', learningType: 'Stavan', sequenceOrder: 9, durationWeeks: 2, description: 'Soulful devotional tribute dedicated to Bhagwan Parshwanath.' },
          { id: 'SYL-110', chapterName: 'Panch Parameshthi Gatha', learningType: 'Gatha', sequenceOrder: 10, durationWeeks: 3, description: 'Classical Prakrit metered stanzas celebrating the virtues of Arihant, Siddha, Acharya, Upadhyay, Sadhu.' },
          { id: 'SYL-111', chapterName: 'Uvasaggaharam Sutra', learningType: 'Sutra', sequenceOrder: 11, durationWeeks: 2, description: 'Potent protector hymn composed by Acharya Bhadrabahu Svami.' },
          { id: 'SYL-112', chapterName: 'Jay Viyaray Sutra', learningType: 'Sutra', sequenceOrder: 12, durationWeeks: 2, description: 'Supplication for detachment, passionlessness, and true equanimity.' },
        ]
      },
      {
        id: 'LVL-2',
        name: 'Level 2 – Madhyam',
        syllabus: [
          { id: 'SYL-201', chapterName: 'Iriyavahiyam Sutra', learningType: 'Sutra', sequenceOrder: 1, durationWeeks: 2, description: 'Sutra for atonement of involuntary harm caused during movement.' },
          { id: 'SYL-202', chapterName: 'Karemi Bhante Vow', learningType: 'Gatha', sequenceOrder: 2, durationWeeks: 3, description: 'Solemn pledge renouncing all sinful activities during samayik.' },
          { id: 'SYL-203', chapterName: 'Bhaktamar Stotra: Shlok 1-10', learningType: 'Stavan', sequenceOrder: 3, durationWeeks: 4, description: 'Acclaimed praise to the first Tirthankara Rishabhdev by Acharya Manatunga.' },
        ]
      },
      {
        id: 'LVL-3',
        name: 'Level 3 – Uttam',
        syllabus: [
          { id: 'SYL-301', chapterName: 'Namostu Vardhamanaya', learningType: 'Gatha', sequenceOrder: 1, durationWeeks: 3, description: 'Salutations to Bhagwan Mahavira swami.' },
          { id: 'SYL-302', chapterName: 'Ajita Shanti Stavan', learningType: 'Stavan', sequenceOrder: 2, durationWeeks: 4, description: 'Joint prayer honoring Bhagwan Ajitnath and Shantinath.' },
        ]
      }
    ];
  });

  // Selected Level ID for filtering - Default to 'ALL' if in courses mode, otherwise 'LVL-1'
  const [selectedLevelId, setSelectedLevelId] = useState<string>(mode === 'courses' ? 'ALL' : 'LVL-1');

  useEffect(() => {
    if (mode === 'courses') {
      setSelectedLevelId('ALL');
    } else {
      setSelectedLevelId('LVL-1');
    }
  }, [mode]);

  // Search query on list page
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Syllabus Item for the Detail Screen (null = List Page, non-null = Detail Screen)
  const [selectedItem, setSelectedItem] = useState<(LevelSyllabusItem & { levelName?: string }) | null>(null);

  // Audio Lyrics Screen view toggle (true = Audio Lyrics screen open)
  const [isViewingLyrics, setIsViewingLyrics] = useState(false);

  // Language for Lyrics: 'English' | 'Hindi' | 'Gujarati'
  const [lyricsLanguage, setLyricsLanguage] = useState<'English' | 'Hindi' | 'Gujarati'>('Hindi');

  // Status mapping stored in localStorage
  const [itemStatuses, setItemStatuses] = useState<Record<string, 'Approved' | 'Reject' | 'Pending'>>(() => {
    try {
      const stored = localStorage.getItem('student_syllabus_statuses');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore localStorage read errors
    }
    return {
      'SYL-101': 'Approved',
      'SYL-102': 'Approved',
      'SYL-103': 'Reject',
      'SYL-104': 'Pending',
      'SYL-105': 'Pending',
      'SYL-106': 'Pending',
      'SYL-107': 'Pending',
      'SYL-108': 'Pending',
      'SYL-109': 'Pending',
      'SYL-110': 'Pending',
      'SYL-111': 'Pending',
      'SYL-112': 'Pending',
      'SYL-201': 'Approved',
      'SYL-202': 'Approved',
      'SYL-203': 'Reject',
      'SYL-301': 'Approved',
      'SYL-302': 'Approved',
    };
  });

  // Toast message state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Persist status updates to localStorage
  const updateItemStatus = (itemId: string, newStatus: 'Approved' | 'Reject' | 'Pending') => {
    setItemStatuses((prev) => {
      const updated = { ...prev, [itemId]: newStatus };
      try {
        localStorage.setItem('student_syllabus_statuses', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Flatten all syllabus items across levels with their parent level names
  const allSyllabusItems = useMemo(() => {
    return academicLevels.flatMap((level) =>
      (level.syllabus || []).map((syl) => ({
        ...syl,
        levelId: level.id,
        levelName: level.name,
      }))
    );
  }, [academicLevels]);

  // Filtered syllabus items for the List Page
  const displayedItems = useMemo(() => {
    return allSyllabusItems.filter((item) => {
      if (selectedLevelId !== 'ALL' && item.levelId !== selectedLevelId) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.chapterName.toLowerCase().includes(q);
        const matchesType = item.learningType.toLowerCase().includes(q);
        if (!matchesTitle && !matchesType) return false;
      }
      return true;
    });
  }, [allSyllabusItems, selectedLevelId, searchQuery]);

  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(29); // Progress in seconds
  const [audioDuration] = useState(84); // 1:24 mins = 84 seconds
  const [audioPlaybackSpeed, setAudioPlaybackSpeed] = useState<number>(1);
  const [isSpeedPopoverOpen, setIsSpeedPopoverOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // PDF Preview Modal on Detail Screen
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Audio playback simulation ticker
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= audioDuration) {
            if (isLooping) return 0;
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * audioPlaybackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioDuration, audioPlaybackSpeed, isLooping]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Find matching rich sutra lyrics data if available
  const currentVersesData = useMemo(() => {
    if (!selectedItem) return null;

    const titleLower = selectedItem.chapterName.toLowerCase();
    
    // Check if matching Navkar Mantra
    if (titleLower.includes('navkar') || titleLower.includes('namokar')) {
      const match = sutrasList.find(s => s.id === 'navkar');
      if (match) return match;
    }
    // Check other sutras
    const foundSutra = sutrasList.find(s => 
      titleLower.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(titleLower)
    );
    if (foundSutra) return foundSutra;

    // Default authentic verses fallback
    return {
      id: selectedItem.id,
      name: selectedItem.chapterName,
      prakrit: [
        "Namo Arihantanam",
        "Namo Siddhanam",
        "Namo Ayariyanam",
        "Namo Uvajjhayanam",
        "Namo Loe Savva Sahunam",
        "Eso Pancha Namukkaro",
        "Savva Pavappanasano",
        "Mangalanam Cha Savvesim",
        "Padhamam Havai Mangalam"
      ],
      english: [
        "I bow to the Arihants (destroyers of inner enemies).",
        "I bow to the Siddhas (liberated supreme souls).",
        "I bow to the Acharyas (spiritual leaders and masters).",
        "I bow to the Upadhyays (spiritual teachers and guides).",
        "I bow to all Sadhus and Sadhvis in the world.",
        "This fivefold bow of deep gratitude.",
        "Destroys all negative karma and obstacles.",
        "And among all auspicious invocations.",
        "It is supreme and foremost beneficial."
      ],
      hindi: [
        "मैं अरिहंतों (आंतरिक शत्रुओं के नाशक) को नमस्कार करता हूँ।",
        "मैं सिद्धों (मुक्त परम पवित्र आत्माओं) को नमस्कार करता हूँ।",
        "मैं आचार्यों (आध्यात्मिक गुरुओं और नायकों) को नमस्कार करता हूँ।",
        "मैं उपाध्यायों (ज्ञान और अध्यापन कराने वाले गुरुओं) को नमस्कार करता हूँ।",
        "मैं लोक के सभी साधु-साध्वियों को नमस्कार करता हूँ।",
        "यह पंच नमस्कार मंत्र सभी पापों और विघ्नों का नाश करता है।",
        "समस्त प्रकार के पापों का क्षय करने वाला है।",
        "और संपूर्ण कल्याणकारी मंगलों में यह।",
        "सर्वप्रमुख प्रथम मंगल है।"
      ],
      gujarati: [
        "હું અરિહંતો (આંતરિક શત્રુઓનો નાશ કરનાર) ને નમસ્કાર કરું છું.",
        "હું સિદ્ધો (મુક્ત અને પરમ પવિત્ર આત્માઓ) ને નમસ્કાર કરું છું.",
        "હું આચાર્યો (આધ્યાત્મિક નેતાઓ અને ગુરુઓ) ને નમસ્કાર કરું છું.",
        "હું ઉપાધ્યાયો (જ્ઞાન અને શિક્ષણ આપતા ગુરુઓ) ને નમસ્કાર કરું છું.",
        "હું લોકના સર્વ સાધુ-સાધ્વીઓને નમસ્કાર કરું છું.",
        "આ પંચ નમસ્કાર મંત્ર સર્વ વિઘ્નોને દૂર કરે છે.",
        "સર્વ પાપોનો નાશ કરનાર છે.",
        "અને સર્વ કલ્યાણકારી મંગલોમાં.",
        "આ પ્રથમ અને મુખ્ય મંગલ છે."
      ],
      meaning: selectedItem.description || "Sutra for atonement of involuntary harm caused during movement.",
      audioDuration: "1:24",
      level: 1,
      category: selectedItem.learningType
    };
  }, [selectedItem]);

  // Category Icon & Styling Helper
  const getCategoryConfig = (type: string) => {
    const norm = (type || '').trim().toLowerCase();
    if (norm === 'stavan' || norm === 'stuti') {
      return {
        name: 'STAVAN',
        icon: Music,
        bgBox: 'bg-[#F5EFFB] border-purple-100 text-[#7C3AED]',
        badge: 'bg-[#F3E8FF] text-[#6B21A8]',
      };
    }
    if (norm === 'gatha' || norm === 'gatra') {
      return {
        name: 'GATHA',
        icon: ScrollText,
        bgBox: 'bg-[#EBF7F0] border-emerald-100 text-[#163E2B]',
        badge: 'bg-[#E6F4EA] text-[#0D6E48]',
      };
    }
    // Default: Sutra
    return {
      name: 'SUTRA',
      icon: BookOpen,
      bgBox: 'bg-[#EFF7F0] border-emerald-100/80 text-[#163E2B]',
      badge: 'bg-[#E8F5EC] text-[#163E2B]',
    };
  };

  // =========================================================================
  // VIEW 1: AUDIO LYRICS SCREEN
  // =========================================================================
  if (selectedItem && isViewingLyrics && currentVersesData) {
    const totalVerses = currentVersesData.prakrit.length;
    const activeVerseIndex = Math.min(
      totalVerses - 1,
      Math.floor((audioProgress / audioDuration) * totalVerses)
    );

    const handleJumpToVerse = (index: number) => {
      const targetSec = (index / totalVerses) * audioDuration;
      setAudioProgress(targetSec);
      if (!isPlayingAudio) setIsPlayingAudio(true);
    };

    const handlePreviousVerse = () => {
      const prevIdx = Math.max(0, activeVerseIndex - 1);
      handleJumpToVerse(prevIdx);
    };

    const handleNextVerse = () => {
      const nextIdx = Math.min(totalVerses - 1, activeVerseIndex + 1);
      handleJumpToVerse(nextIdx);
    };

    return (
      <div className="absolute inset-0 z-50 bg-[#FAFAF7] flex flex-col text-slate-800 animate-fadeIn font-sans select-none overflow-hidden">
        
        {/* Top Header inside Mobile Frame */}
        <header className="bg-white border-b border-stone-200/80 px-3.5 py-2.5 shadow-2xs shrink-0 flex items-center justify-between gap-2 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <button
              id="btn-back-from-lyrics"
              onClick={() => setIsViewingLyrics(false)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-700 cursor-pointer active:scale-95 transition-all shrink-0"
              title="Back to Sutra Details"
            >
              <ChevronLeft className="w-4.5 h-4.5 -ml-0.5" />
            </button>
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {currentVersesData.name}
            </h1>
          </div>

          {/* Language Switcher Tabs: EN | हिन्दी | ગુજ */}
          <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-full border border-stone-200/70 shrink-0">
            <button
              type="button"
              onClick={() => setLyricsLanguage('English')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                lyricsLanguage === 'English'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLyricsLanguage('Hindi')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                lyricsLanguage === 'Hindi'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLyricsLanguage('Gujarati')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                lyricsLanguage === 'Gujarati'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ગુજ
            </button>
          </div>
        </header>

        {/* Scrollable Verses Container */}
        <main className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 no-scrollbar">
          <p className="text-center text-[11px] font-medium text-stone-500 pb-1">
            Tap any verse to practice or listen from that section.
          </p>

          <div className="space-y-3">
            {currentVersesData.prakrit.map((verseText, idx) => {
              const isActive = idx === activeVerseIndex;
              
              let translationText = currentVersesData.hindi[idx] || "";
              if (lyricsLanguage === 'English') {
                translationText = currentVersesData.english[idx] || "";
              } else if (lyricsLanguage === 'Gujarati') {
                translationText = currentVersesData.gujarati[idx] || "";
              }

              return (
                <div
                  key={idx}
                  id={`lyrics-verse-card-${idx}`}
                  onClick={() => handleJumpToVerse(idx)}
                  className={`rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 border relative ${
                    isActive
                      ? 'bg-[#EBF7EE] border-[#163E2B]/20 border-l-4 border-l-[#163E2B] shadow-xs scale-[1.01]'
                      : 'bg-white border-stone-100/90 hover:bg-stone-50/80 shadow-2xs'
                  }`}
                >
                  <h3
                    className={`text-base font-bold tracking-tight transition-colors ${
                      isActive ? 'text-[#163E2B]' : 'text-stone-700'
                    }`}
                  >
                    {verseText}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-relaxed transition-colors ${
                      isActive ? 'text-[#163E2B]/90 font-medium' : 'text-stone-400 font-normal'
                    }`}
                  >
                    {translationText}
                  </p>
                </div>
              );
            })}
          </div>

          {currentVersesData.meaning && (
            <div className="bg-white border border-stone-200/80 rounded-2xl p-3.5 mt-4 text-left space-y-1.5">
              <span className="text-[9.5px] font-black text-[#163E2B] uppercase tracking-widest">
                Spiritual Essence
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {currentVersesData.meaning}
              </p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-1 text-center">
            <Sparkles className="w-3.5 h-3.5 text-[#163E2B]" />
            <span className="text-[11px] font-bold text-slate-700">Gyan Vatika Pathshala</span>
            <span className="text-[9px] text-slate-400">Sacred Swadhyay & Recitation</span>
          </div>
        </main>

        {/* Bottom Audio Player Bar */}
        <div className="shrink-0 bg-white border-t border-stone-200 px-3 py-2 shadow-lg z-30 space-y-1.5">
          <div className="bg-[#163E2B] rounded-xl px-3 py-1.5 text-white shadow-xs flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <h4 className="font-bold text-xs text-white truncate">
                  {currentVersesData.name}
                </h4>
                <span className="shrink-0 text-[8px] font-black bg-white/20 text-emerald-100 uppercase px-1 py-0.2 rounded">
                  {lyricsLanguage}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-emerald-100/90 mt-0.5 truncate">
                <span className="truncate">Sacred guidance by Pujya Samanji</span>
                <span>•</span>
                <span>1:24 mins</span>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => showToast(`Link copied for ${currentVersesData.name}!`, 'info')}
                className="p-1 rounded text-emerald-100 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDownloaded(!isDownloaded);
                  showToast(isDownloaded ? 'Removed offline audio' : 'Saved for offline recitation!', 'info');
                }}
                className={`p-1 rounded transition-all cursor-pointer ${
                  isDownloaded ? 'text-amber-300 bg-white/15' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  showToast(isFavorite ? 'Removed from favorites' : 'Added to sacred favorites!', 'success');
                }}
                className={`p-1 rounded transition-all cursor-pointer ${
                  isFavorite ? 'text-rose-300 bg-white/15' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
                title="Favorite"
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-0.5 px-0.5">
            <input
              type="range"
              min="0"
              max={audioDuration}
              step="1"
              value={audioProgress}
              onChange={(e) => setAudioProgress(Number(e.target.value))}
              className="w-full h-1 bg-stone-200 rounded-full cursor-pointer appearance-none outline-none accent-[#163E2B]"
              style={{
                background: `linear-gradient(to right, #163E2B 0%, #163E2B ${(audioProgress / audioDuration) * 100}%, #e2e8f0 ${(audioProgress / audioDuration) * 100}%, #e2e8f0 100%)`
              }}
            />
            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-stone-500">
              <span>{formatTime(audioProgress)}</span>
              <span>{formatTime(audioDuration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-0.5 pt-0.5 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSpeedPopoverOpen(!isSpeedPopoverOpen)}
                className="px-1.5 py-0.5 rounded border border-stone-300 bg-stone-50 hover:bg-stone-100 text-[9px] font-bold text-stone-700 flex items-center gap-0.5 cursor-pointer"
              >
                <span className="text-[7.5px] text-stone-400 font-extrabold uppercase">SPEED</span>
                <span className="text-[#163E2B] font-black">{audioPlaybackSpeed}x</span>
              </button>

              {isSpeedPopoverOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-stone-200 p-1 rounded-xl shadow-xl w-20 z-50 flex flex-col gap-0.5">
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => {
                        setAudioPlaybackSpeed(spd);
                        setIsSpeedPopoverOpen(false);
                      }}
                      className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold text-left cursor-pointer ${
                        audioPlaybackSpeed === spd
                          ? 'bg-emerald-50 text-[#163E2B]'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {spd}x {audioPlaybackSpeed === spd && '✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handlePreviousVerse}
              className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              title="Previous verse"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              type="button"
              onClick={() => setAudioProgress((prev) => Math.max(0, prev - 10))}
              className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              title="Rewind 10s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-8 h-8 rounded-full bg-[#163E2B] hover:bg-[#0F2D1F] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              title={isPlayingAudio ? 'Pause' : 'Play'}
            >
              {isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-white text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLooping(!isLooping);
                showToast(isLooping ? 'Repeat turned off' : 'Repeat verse loop active', 'info');
              }}
              className={`p-1 cursor-pointer transition-colors ${
                isLooping ? 'text-[#163E2B] font-bold' : 'text-stone-400 hover:text-stone-900'
              }`}
              title="Repeat"
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleNextVerse}
              className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              title="Next verse"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              type="button"
              onClick={() => showToast(`Recitation by Jain Scholars`, 'info')}
              className="p-1 text-stone-400 hover:text-stone-800 cursor-pointer"
              title="Options"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: SUTRA / ITEM DETAIL SCREEN (Matching Exact Screenshot)
  // - Top Header: Circular Back button `<` | Title "Iriyavahiyam Sutra", "Sutra Detail • Level 2 • Madhyam" | Status Pill "[ ✓ Approved ]"
  // - Card 1 (Overview): Category Icon Circle + [ SUTRA ] Level 2 • Madhyam + Title + Subtle Mandala Pattern + Quote Box
  // - Card 2 (Audio Recitation): Beige Icon Circle + Title/Filename + [ LYRICS MODE ] + [ 📖 Open Lyrics > ] + Scrubber + [ ⟲ 15 ] [ ▶ ] [ ⟳ 15 ] [ 🔊 ]
  // - Card 3 (Scripture PDF Document): Sage Icon Circle + Title/Filename + [ Gujarati & Hindi ] + PDF Preview Box with [ 👁 View ] and [ ⤓ ]
  // - Bottom Bar: [ ✓ Completed ] and [ ✕ Cancel ]
  // =========================================================================
  if (selectedItem) {
    const currentStatus = itemStatuses[selectedItem.id] || 'Approved';
    const isApproved = currentStatus === 'Approved';
    const isReject = currentStatus === 'Reject';

    const audioFileName = selectedItem.audioFileName || `${selectedItem.chapterName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 26)}_recita...`;
    const pdfFileName = selectedItem.pdfFileName || `${selectedItem.chapterName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 24)}_script.pdf`;
    const pdfDisplayTruncated = `${selectedItem.chapterName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 26)}_script....`;

    const handleCompleted = () => {
      updateItemStatus(selectedItem.id, 'Approved');
      showToast(`"${selectedItem.chapterName}" marked as Completed (Approved)!`, 'success');
      setSelectedItem(null);
      setIsViewingLyrics(false);
    };

    const handleCancel = () => {
      setIsPlayingAudio(false);
      setSelectedItem(null);
      setIsViewingLyrics(false);
    };

    const categoryInfo = getCategoryConfig(selectedItem.learningType);
    const CategoryIcon = categoryInfo.icon;

    return (
      <div className="absolute inset-0 z-50 bg-[#FAF8F5] flex flex-col text-slate-800 animate-fadeIn font-sans overflow-hidden select-none">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-[#163E2B] text-white px-4 py-2 rounded-full shadow-lg text-[11px] font-bold flex items-center gap-1.5 border border-emerald-500/30 animate-bounce">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Top Header matching ss */}
        <header className="bg-[#FAF8F5] px-4 pt-3.5 pb-2.5 flex items-center justify-between gap-2 shrink-0 z-20">
          
          {/* Back button + Title & Subtitle */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="btn-back-from-detail"
              onClick={handleCancel}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs shrink-0"
              title="Back to List"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5 text-slate-700" />
            </button>
            
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-900 leading-tight truncate">
                {selectedItem.chapterName}
              </h1>
              <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                {selectedItem.learningType} Detail • {selectedItem.levelName || 'Level 2 • Madhyam'}
              </p>
            </div>
          </div>

          {/* Status Badge on Top Right matching screenshot */}
          <div className="shrink-0">
            {isApproved ? (
              <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] flex items-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                <span>Approved</span>
              </div>
            ) : isReject ? (
              <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5] flex items-center gap-1.5 shadow-2xs">
                <XCircle className="w-4 h-4 text-[#C2410C]" />
                <span>Reject</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] flex items-center gap-1.5 shadow-2xs">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>Pending</span>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content Container matching ss */}
        <main className="flex-1 overflow-y-auto px-4 py-2 space-y-3.5 no-scrollbar">
          
          {/* CARD 1: Overview & Quote Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-2xs relative overflow-hidden space-y-4">
            
            {/* Subtle Mandala Watermark in top right corner */}
            <svg 
              className="absolute -top-4 -right-4 w-28 h-28 text-amber-700/10 pointer-events-none select-none" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="35" />
              <circle cx="50" cy="50" r="25" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="15" />
              <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" strokeWidth="0.75" />
              <polygon points="50,10 60,35 85,35 65,50 75,75 50,60 25,75 35,50 15,35 40,35" strokeWidth="0.75" />
            </svg>

            {/* Top row: Category Circle + Level Tag + Title */}
            <div className="flex items-start gap-4">
              
              {/* Category Icon Circle */}
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center shrink-0 ${categoryInfo.bgBox}`}>
                <CategoryIcon className="w-6 h-6 text-[#163E2B]" />
              </div>

              {/* Title & Level Row */}
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-md ${categoryInfo.badge}`}>
                    {categoryInfo.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {selectedItem.levelName || 'Level 2 • Madhyam'}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-1.5 leading-snug truncate">
                  {selectedItem.chapterName}
                </h2>
              </div>

            </div>

            {/* Quote / Description Box matching ss */}
            <div className="bg-[#FBF9F5] border border-stone-200/70 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-stone-300 font-serif text-3xl font-bold leading-none select-none shrink-0 -mt-1">
                “
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {selectedItem.description || "Sutra for atonement of involuntary harm caused during movement."}
              </p>
            </div>

          </div>

          {/* CARD 2: Audio Recitation Card matching ss */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-2xs space-y-4">
            
            {/* Top Row: Beige Icon + Title + [ LYRICS MODE ] + [ 📖 Open Lyrics > ] */}
            <div className="flex items-start justify-between gap-2">
              
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Beige Volume Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-[#FDF6E9] border border-amber-200/70 flex items-center justify-center text-[#9A6B2F] shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Audio Recitation
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate max-w-[150px] mt-0.5">
                    {audioFileName}
                  </p>
                </div>
              </div>

              {/* Right Side: Tag and Open Lyrics Button */}
              <div className="flex flex-col items-end shrink-0">
                <span className="px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider rounded bg-[#E8F5EC] text-[#163E2B] mb-1.5">
                  LYRICS MODE
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setIsViewingLyrics(true);
                    setIsPlayingAudio(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#163E2B] hover:bg-[#0F2D1F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Lyrics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Bottom Player Box with Scrubber & Controls matching ss */}
            <div className="bg-[#FBF9F5] rounded-2xl p-4 border border-stone-200/70 space-y-3">
              
              {/* Progress Slider & Timestamps */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-700">
                  <span>{formatTime(audioProgress)}</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={audioDuration}
                    step="1"
                    value={audioProgress}
                    onChange={(e) => setAudioProgress(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-full cursor-pointer appearance-none outline-none accent-[#163E2B]"
                    style={{
                      background: `linear-gradient(to right, #163E2B 0%, #163E2B ${(audioProgress / audioDuration) * 100}%, #e2e8f0 ${(audioProgress / audioDuration) * 100}%, #e2e8f0 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Controls Row: [ ⟲ 15 ] [ ▶ ] [ ⟳ 15 ] [ 🔊 ] */}
              <div className="flex items-center justify-center gap-6 pt-1">
                
                {/* Rewind 15s */}
                <button
                  type="button"
                  onClick={() => setAudioProgress((prev) => Math.max(0, prev - 15))}
                  className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-950 transition-colors cursor-pointer active:scale-95 relative"
                  title="Rewind 15s"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-[7.5px] font-bold font-mono absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0.5">
                    15
                  </span>
                </button>

                {/* Main Play / Pause Circle Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-13 h-13 rounded-full bg-[#163E2B] hover:bg-[#0F2D1F] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                  title={isPlayingAudio ? 'Pause' : 'Play'}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-5 h-5 fill-white text-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  )}
                </button>

                {/* Forward 15s */}
                <button
                  type="button"
                  onClick={() => setAudioProgress((prev) => Math.min(audioDuration, prev + 15))}
                  className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-950 transition-colors cursor-pointer active:scale-95 relative"
                  title="Forward 15s"
                >
                  <RotateCw className="w-5 h-5" />
                  <span className="text-[7.5px] font-bold font-mono absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0.5">
                    15
                  </span>
                </button>

                {/* Volume Button */}
                <button
                  type="button"
                  onClick={() => showToast('Audio volume optimal', 'info')}
                  className="text-slate-700 hover:text-slate-950 transition-colors cursor-pointer active:scale-95"
                  title="Volume"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

              </div>

            </div>

          </div>

          {/* CARD 3: Scripture PDF Document Card matching ss */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-2xs space-y-3.5">
            
            {/* Top Row: Sage Icon + Title + [ Gujarati & Hindi ] */}
            <div className="flex items-center justify-between gap-2">
              
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Sage PDF Icon Circle */}
                <div className="w-11 h-11 rounded-full bg-[#EFF7F0] border border-emerald-100 flex items-center justify-center text-[#163E2B] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Scripture PDF Document
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate max-w-[150px] mt-0.5">
                    {pdfDisplayTruncated}
                  </p>
                </div>
              </div>

              {/* Tag: Gujarati & Hindi */}
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#F7EFE5] text-[#9A6B2F] border border-[#ECD9C5] shrink-0">
                Gujarati & Hindi
              </span>

            </div>

            {/* Document Action Box matching ss */}
            <div className="bg-[#FBF9F5] border border-stone-200/70 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              
              {/* Left PDF Icon + Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-12 bg-white border border-stone-300 rounded-xl shadow-2xs flex flex-col items-center justify-center p-1 shrink-0">
                  <div className="w-full h-1 bg-rose-500 rounded-full mb-1" />
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span className="text-[7.5px] font-black text-slate-600 font-mono mt-0.5">PDF</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {pdfFileName}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Official authentic scripture script
                  </p>
                </div>
              </div>

              {/* Right Action Buttons: [ 👁 View ] and [ ⤓ ] */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-700" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Downloaded "${pdfFileName}" to device!`, 'info')}
                  className="p-2.5 rounded-xl bg-[#163E2B] hover:bg-[#0F2D1F] text-white shadow-2xs active:scale-95 transition-all cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </main>

        {/* PDF Modal */}
        {isPdfModalOpen && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
            <div className="bg-white w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85%] border border-stone-200">
              <div className="p-3 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <h3 className="text-xs font-bold text-slate-900 truncate">{selectedItem.chapterName} - Scripture</h3>
                </div>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-slate-700 cursor-pointer transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-3 bg-[#FFFDF9] text-center flex-1 no-scrollbar">
                <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/40 space-y-2 text-slate-800">
                  <span className="text-[9px] font-extrabold tracking-widest text-[#163E2B] uppercase">
                    श्री जिनशासन पाठ्यपुस्तक
                  </span>
                  <h4 className="text-sm font-bold text-amber-950">
                    {selectedItem.chapterName}
                  </h4>
                  <div className="w-12 h-0.5 bg-amber-400 mx-auto rounded-full" />
                  
                  <div className="space-y-2 pt-1 text-xs leading-relaxed text-slate-800 font-medium">
                    <p className="font-semibold text-amber-900">
                      नमो अरिहंताणं, नमो सिद्धाणं, नमो आयरियाणं, નમો ઉવજ્ઝાયાણં, નમો લોએ સવ્વ સાહૂણં ।
                    </p>
                    <p className="text-[11px] text-slate-600 italic">
                      એસો પંચ નમુક્કારો, સવ્વપાવપ્પણાસણો । મંગલાણં ચ સવ્વેસિં, પઢમં હવઇ મંગલં ॥
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
                <button
                  onClick={() => showToast(`Downloaded "${pdfFileName}"!`, 'info')}
                  className="px-3 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-[11px] rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-slate-700 font-bold text-[11px] rounded-lg cursor-pointer transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Buttons: [ ✓ Completed ] and [ ✕ Cancel ] matching ss */}
        <div className="shrink-0 bg-[#FAF8F5] border-t border-stone-200/80 px-4 py-3 z-30 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            {/* Completed Button */}
            <button
              id="btn-syllabus-completed"
              type="button"
              onClick={handleCompleted}
              className="py-3.5 px-3 bg-[#163E2B] hover:bg-[#0F2D1F] active:scale-[0.98] transition-all text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#163E2B]/15 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Completed</span>
            </button>

            {/* Cancel Button */}
            <button
              id="btn-syllabus-cancel"
              type="button"
              onClick={handleCancel}
              className="py-3.5 px-3 bg-[#FBF9F5] hover:bg-stone-100 active:scale-[0.98] transition-all text-slate-700 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer border border-stone-300"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 3: LIST PAGE (Matching Screenshot ss.png)
  // =========================================================================
  return (
    <div className="w-full text-slate-800 font-sans select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-[#163E2B] text-white px-4 py-2 rounded-full shadow-lg text-[11px] font-bold flex items-center gap-1.5 border border-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top App Bar matching ss.png */}
      <header className="bg-[#FAF8F5] px-4 pt-3.5 pb-2">
        <div className="flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Back Button */}
            <button
              id="btn-back-to-home"
              onClick={onBackToHome}
              className="w-9 h-9 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs shrink-0"
              title="Back to Home"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5 text-slate-700" />
            </button>
            
            {/* Logo + Title Group */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white border border-emerald-100 flex items-center justify-center p-1.5 shadow-xs shrink-0">
                <PathshalaLogo className="w-full h-full" showText={false} />
              </div>
              <div className="min-w-0">
                <h1 className="text-base font-bold text-[#163E2B] leading-tight tracking-tight">
                  {mode === 'courses' ? 'Courses' : 'My Courses'}
                </h1>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {mode === 'courses' ? 'Curriculum & Study Material' : `${studentName} • ${currentStudentLevel}`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Badge: 📖 X Items */}
          <div className="shrink-0">
            <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[11px] font-bold flex items-center gap-1.5 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>{displayedItems.length} Items</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Container */}
      <main className="px-4 py-2 space-y-3 pb-24">
        {/* Search Bar with Filter Icon */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={mode === 'courses' ? "Search all courses & topics..." : "Search by title..."}
            className="w-full bg-white border border-slate-200/90 rounded-2xl pl-10 pr-10 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#163E2B] shadow-xs"
          />
          <button
            type="button"
            onClick={() => showToast('Filter options', 'info')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Filter"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Level Filter Tabs (Highlighted points) - Displayed in Courses page, removed from My Courses page */}
        {mode === 'courses' && (
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar select-none pt-0.5">
            <button
              id="course-tab-all"
              type="button"
              onClick={() => setSelectedLevelId('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedLevelId === 'ALL'
                  ? 'bg-[#163E2B] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              All Levels
            </button>
            {academicLevels.map((lvl) => {
              const isSel = selectedLevelId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  id={`course-tab-${lvl.id}`}
                  type="button"
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSel
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  {lvl.name}
                </button>
              );
            })}
          </div>
        )}

        {/* SYLLABUS CARDS LIST matching ss.png */}
        {displayedItems.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-2 shadow-xs mt-2">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-1" />
            <h4 className="text-sm font-bold text-slate-700">No course items found</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {searchQuery ? 'Try adjusting your search query.' : 'Items added from the Admin Portal will appear here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedItems.map((item) => {
              const currentStatus = itemStatuses[item.id] || 'Pending';
              const isApproved = currentStatus === 'Approved';
              const isReject = currentStatus === 'Reject';

              const categoryConfig = getCategoryConfig(item.learningType);
              const CategoryIcon = categoryConfig.icon;

              return (
                <div
                  key={item.id}
                  id={`course-item-card-${item.id}`}
                  onClick={() => {
                    setSelectedItem(item);
                    setIsViewingLyrics(false);
                  }}
                  className="bg-white border border-slate-100/90 rounded-2xl p-3.5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
                >
                  {/* Left Column: Consistent Category Icon & Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    
                    {/* Consistent Category Icon Box */}
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${categoryConfig.bgBox}`}>
                      <CategoryIcon className="w-5.5 h-5.5" />
                    </div>

                    {/* Title & Category Badge */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13.5px] font-bold text-slate-900 group-hover:text-[#163E2B] transition-colors leading-snug truncate">
                        {item.chapterName}
                      </h3>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider rounded ${categoryConfig.badge}`}>
                          {categoryConfig.name}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Status Badge & Chevron */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    
                    {/* Status Badge */}
                    {isApproved ? (
                      <div className="px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Approved</span>
                      </div>
                    ) : isReject ? (
                      <div className="px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5] flex items-center gap-1.5 shadow-2xs">
                        <XCircle className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>Reject</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] flex items-center gap-1.5 shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Pending</span>
                      </div>
                    )}

                    {/* Right Chevron */}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors ml-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
};
