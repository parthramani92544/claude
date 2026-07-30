/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TeacherLiveClassesFlow } from './components/TeacherLiveClassesFlow';
import { TeacherStudentsFlow } from './components/TeacherStudentsFlow';
import { TeacherGathaApprovalFlow } from './components/TeacherGathaApprovalFlow';
import { TeacherAttendanceFlow } from './components/TeacherAttendanceFlow';
import { TeacherReportsFlow } from './components/TeacherReportsFlow';
import { TeacherProfileFlow } from './components/TeacherProfileFlow';
import { BookOpen, BookOpenCheck, Play, CheckCircle, Calendar, Award, Clock, User, Bell, ChevronRight, Info, Sparkles, Trophy, Compass, Tv, Gamepad2, X, Check, Printer, Volume2, Heart, GraduationCap, Share2, Camera, Phone, Shield, Sliders, Edit3, Bookmark, Users, Video, Plus, RotateCcw, Lock, MessageSquare, Mic, MicOff, Send, Star, VolumeX, FileText, LayoutDashboard, Search, ChevronLeft, Settings, Download, Languages, LogOut, HelpCircle, Menu, CheckSquare, BookMarked, Music, DownloadCloud, FileCode, ArrowRight, MapPin, RefreshCw, Trash2, Unlock, SkipBack, SkipForward, CheckCircle2, TrendingUp, AlertCircle, AlertTriangle, CreditCard, QrCode, Building2, Smartphone, XCircle } from 'lucide-react';

import { Student, QuickAccessItem, LiveClass, JainQuote, SutraDetails, QuizQuestion, AIQuiz, AIQuizQuestion, QuizHistoryRecord } from './types';
import { initialStudent, quickAccessItems, upcomingClass, jainQuotes, sutrasList, pathshalaTrivia, INITIAL_AI_QUIZZES } from './data';
import { syllabusData } from './syllabusData';
import UnifiedAudioPlayer from './components/UnifiedAudioPlayer';
import { PathshalaLogo } from './components/PathshalaLogo';
import { AdminPortal } from './admin/AdminPortal';

const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const InitialBadge = ({ name, className = "w-8 h-8 text-[11px]" }: { name: string; className?: string }) => {
  const initials = getInitials(name);
  return (
    <div className={`rounded-full bg-[#163E2B] text-white flex items-center justify-center font-bold font-mono tracking-wider shrink-0 select-none ${className}`}>
      {initials}
    </div>
  );
};

const STAVANS_LIST = [
  {
    title: "Adinath Dada Nu Stavan",
    singer: "Aacharya Guru Prasad ji",
    duration: "3:45",
    bhagwan: "Bhagwan Adinath",
    youtubeUrl: "https://www.youtube.com/watch?v=6Yt-R-Bsc7E",
    lyrics: [
      "Adinath prabhu na charano ma, mitha bhav dharu,",
      "Pratham tirthankar parmatma ne, koti vandan karu.",
      "Aatam ma divya jyoti jage, dhyan prabhu nu dharu,",
      "Marudeva mata na nandan ne, premthi sneh dharu."
    ]
  },
  {
    title: "Bhaktamar Stotra Sanskrit",
    singer: "Aacharya Guru Prasad ji",
    duration: "14:20",
    bhagwan: "Bhagwan Adinath",
    youtubeUrl: "https://www.youtube.com/watch?v=Yf7-y8bNqrs",
    lyrics: [
      "Bhaktamara-Pranata-Mauli-Mani-Prabhaanaam,",
      "Udyotakam Dalit-Paapa-Tamo-Vitaanam.",
      "Samyak-Pranamya Jina-Paada-Yugam Yugaadaav,",
      "Aalambanam Bhava-Bhayaat Pranataam Janaanaam."
    ]
  },
  {
    title: "Ichchami Khamasamanu",
    singer: "Aacharya Guru Prasad ji",
    duration: "2:15",
    bhagwan: "Other Tirthankars",
    lyrics: [
      "Ichchami khamasamanu, vandium javanijjae, nisehiae,",
      "Mathaena vandami... Vandami...",
      "Resonating cosmic tranquility and spiritual harmony.",
      "Repeat three times daily for focus and peace."
    ]
  },
  {
    title: "Logassa Ujjoagara",
    singer: "Aacharya Guru Prasad ji",
    duration: "3:40",
    bhagwan: "Other Tirthankars",
    youtubeUrl: "https://www.youtube.com/watch?v=5V5n2hscDQA",
    lyrics: [
      "Logassa ujjoa-gare, dhamma-tittha-yare jine,",
      "Arihante kittaissam, chauvisam pi kevali.",
      "Usabha-majiam cha vande, sambhavamabhinandanam cha sumaim cha,",
      "Paumappaham supasam, jinam cha chandappaham vande."
    ]
  },
  {
    title: "Mahavir Swami Nu Stavan",
    singer: "Aacharya Guru Prasad ji",
    duration: "4:15",
    bhagwan: "Bhagwan Mahavir",
    youtubeUrl: "https://www.youtube.com/watch?v=gM_H6_K_1QY",
    lyrics: [
      "Trishla nandan veer ki, jai bolo mahavir ki,",
      "Siddharth na raj dulara, jagat ne mukti apo prabhu pyara.",
      "Sanyam marag swikarine prabhu, kevalgyan pamyaji,",
      "Saman suttam na vachano thi, jivan dhanya thayaji."
    ]
  },
  {
    title: "Maitri Bhavnu Pavitra Jharnu",
    singer: "Kavita Krishnamurthy",
    duration: "4:32",
    bhagwan: "Other Tirthankars",
    lyrics: [
      "Maitri bhavnu pavitra jharnu, mujh haiyya ma vahya kare,",
      "Shubh thao aa sakal vishwanu, evi bhavna nitya rahe.",
      "Guniyal jono darshan karine, haiyyu maru harshayaji,",
      "Pramod bhavthi hridaya bharay, prem rasbhinu thayaji."
    ]
  },
  {
    title: "Neminath Girnar Stavan",
    singer: "Aacharya Guru Prasad ji",
    duration: "5:20",
    bhagwan: "Bhagwan Neminath",
    lyrics: [
      "Girnar ni khore dhyan dhare, rajul no var nem prabhu,",
      "Sanyam parna dhyai ne chade, parmatma pavan nem prabhu.",
      "Krishna swami na bandhav prabhu, pashuo na rann ma karuna dhari,",
      "Rath ne pacho vali ne prabhu, diksha ni dhanya reet dhari."
    ]
  },
  {
    title: "Prabhu Chintamani Mantra",
    singer: "Aacharya Guru Prasad ji",
    duration: "5:10",
    bhagwan: "Bhagwan Parshwanath",
    lyrics: [
      "Prabhu chintamani parshvanath mantra,",
      "Eliminating obstacles and bringing infinite peace.",
      "Chant with devotion and purity of heart."
    ]
  }
];

const getLevelNumber = (levelStr: string): number => {
  if (!levelStr) return 1;
  const match = levelStr.match(/level\s*(\d)/i);
  if (match) return parseInt(match[1]);
  return 1;
};

/**
 * Development-only screen preview helpers.
 *
 * These enable a temporary `?screen=<Name>` (and optional `?state=<variant>`)
 * query-parameter preview system so any single screen / UI state can be rendered
 * in isolation from the ACTUAL existing components — used to build a screen
 * manifest and export a live prototype.
 *
 * Everything here is gated behind `import.meta.env.DEV`, so production builds are
 * completely unaffected: `getDevPreviewParam()` always returns null in production
 * and the app boots on the normal 'Splash' flow exactly as before.
 */
const getDevPreviewParam = (key: string): string | null => {
  if (!import.meta.env.DEV) return null;
  if (typeof window === 'undefined') return null;
  try {
    return new URLSearchParams(window.location.search).get(key);
  } catch {
    return null;
  }
};

const devPreviewScreen = getDevPreviewParam('screen');
const devPreviewState = getDevPreviewParam('state');

export default function App() {
  // Navigation & Interactive States
  const [activeScreen, _setActiveScreen] = useState<string>(devPreviewScreen || 'Splash');
  const [screenHistory, setScreenHistory] = useState<string[]>([devPreviewScreen || 'Splash']);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  const [showFigmaPrototype, setShowFigmaPrototype] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const setActiveScreen = (screenName: string) => {
    if (screenName === activeScreen) return;
    
    // Save current scroll position
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollTop;
      setScrollPositions((prev) => ({
        ...prev,
        [activeScreen]: currentScroll,
      }));
    }

    // Push to history
    const primaryScreens = ['Splash', 'Language', 'Welcome', 'Login', 'Home', 'LiveClassList', 'SutraList', 'Niyam', 'BonusEvent', 'Profile'];
    if (primaryScreens.includes(screenName)) {
      setScreenHistory([screenName]);
    } else {
      setScreenHistory((prev) => [...prev, screenName]);
    }

    _setActiveScreen(screenName);

    // Scroll to top for new screens
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 15);
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // remove current screen
      const prevScreen = newHistory[newHistory.length - 1];

      // Save current scroll position just in case
      if (scrollContainerRef.current) {
        const currentScroll = scrollContainerRef.current.scrollTop;
        setScrollPositions((prev) => ({
          ...prev,
          [activeScreen]: currentScroll,
        }));
      }

      setScreenHistory(newHistory);
      _setActiveScreen(prevScreen);

      // Restore scroll position
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPositions[prevScreen] || 0;
        }
      }, 15);
    } else {
      setActiveScreen('Home');
    }
  };

  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [student, setStudent] = useState<Student>({
    ...initialStudent,
    batch: "Batch A - Weekend",
    teacher: "Rajvi Shah",
    classTiming: "Saturdays, 05:30 PM",
    batchChangesRemaining: 5,
    lastBatchChangeMonth: new Date().toISOString().slice(0, 7),
    attendance: 91, // Start at 91% so they can earn 94% on June 30th!
    quizHistory: [
      {
        quizId: "namutthunam_quiz",
        quizTitle: "Namutthunam Sutra Spiritual Praise",
        score: 2,
        totalQuestions: 3,
        percentage: 67,
        completedAt: "Completed 3 days ago"
      }
    ]
  });

  const [selectedNiyamDate, setSelectedNiyamDate] = useState(new Date().toISOString().split('T')[0]);

  const getIsNiyamDateLocked = (dateStr: string, submitted?: boolean) => {
    if (submitted) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return true;
    return diffDays >= 3;
  };

  const getNiyamDayStatus = (day: { date: string; submitted: boolean }) => {
    if (day.submitted) return 'Submitted';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(day.date);
    target.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0 || diffDays >= 3) {
      return 'Locked';
    }
    return 'Open';
  };

  const [niyamDays, setNiyamDays] = useState([
    {
      date: new Date().toISOString().split('T')[0],
      label: 'Today',
      locked: false,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: 'Yesterday',
      locked: false,
      submitted: false,
      pointsEarned: 0,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: false },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: false },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '2 Days Ago',
      locked: false,
      submitted: true,
      pointsEarned: 45,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: true },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: false },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      label: '3 Days Ago',
      locked: true,
      submitted: true,
      pointsEarned: 35,
      niyams: [
        { id: 1, title: 'Navkar Mantra (5 times)', category: 'Devotion', points: 10, done: true },
        { id: 2, title: 'Night Pratikraman', category: 'Forgiveness', points: 20, done: true },
        { id: 3, title: 'Avoid eating root vegetables today (Chovihar)', category: 'Dietary', points: 15, done: false },
        { id: 4, title: 'Help parents with a chore', category: 'Seva', points: 5, done: true },
        { id: 5, title: 'Temple Visit', category: 'Devotion', points: 15, done: false }
      ]
    }
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedLanguage, _setSelectedLanguage] = useState<string>(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  const setSelectedLanguage = (lang: string) => {
    _setSelectedLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('hasSelectedLanguage', 'true');
  };

  const [pendingUserType, setPendingUserType] = useState<'student' | 'teacher' | null>(null);
  const [loginPhone, setLoginPhone] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  // Dev preview: `?screen=Search&state=results` seeds a query to show the results state.
  const [searchQuery, setSearchQuery] = useState(
    devPreviewScreen === 'Search' && devPreviewState === 'results' ? 'Navkar Mantra' : ''
  );
  
  // Two separate login flow states (Requirement: Student vs. Teacher)
  const [loginUserType, setLoginUserType] = useState<'student' | 'teacher'>('student');
  const [teacherLoginEmail, setTeacherLoginEmail] = useState<string>('');
  const [teacherLoginPassword, setTeacherLoginPassword] = useState<string>('');
  const [currentLoggedInTeacher, setCurrentLoggedInTeacher] = useState<any | null>(null);
  
  // Forgot Password flow states
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState<string>('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState<boolean>(false);
  const [forgotPasswordUserType, setForgotPasswordUserType] = useState<'student' | 'teacher'>('student');

  // Teachers credentials list state (managed via Admin Panel)
  const [teachersList, setTeachersList] = useState<any[]>([
    {
      id: "T1",
      email: "teacher@example.com",
      password: "password123",
      name: "Samani Pragya ji",
      subject: "Jiva & Ajiva Philosophy",
      classesCount: 12
    },
    {
      id: "T2",
      email: "shrutpragya@example.com",
      password: "password123",
      name: "Pujya Samanji Dr. Shrutpragya ji",
      subject: "Sutra Recitation & Meditation",
      classesCount: 8
    }
  ]);

  // Admin Panel Tab & Form States
  const [adminSelectedTab, setAdminSelectedTab] = useState<'students' | 'teachers'>('students');
  const [adminSelectedTeacher, setAdminSelectedTeacher] = useState<any | null>(null);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState<boolean>(false);
  const [newTeacherName, setNewTeacherName] = useState<string>('');
  const [newTeacherEmail, setNewTeacherEmail] = useState<string>('');
  const [newTeacherPassword, setNewTeacherPassword] = useState<string>('');
  const [newTeacherSubject, setNewTeacherSubject] = useState<string>('');
  const [teacherSelectedLiveClass, setTeacherSelectedLiveClass] = useState<any>(null);
  const [newTeacherClassesCount, setNewTeacherClassesCount] = useState<number>(0);

  // Syllabus Module States
  const [syllabusDataState, setSyllabusDataState] = useState<Record<string, any>>(syllabusData);
  const [teacherRemarksDraft, setTeacherRemarksDraft] = useState<Record<string, string>>({});

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "ch-1-sutra": true,
    "ch-2-sutra": true,
    "ch-3-pratikraman": true,
  });
  
  // Registration Module States
  const [registrationStep, setRegistrationStep] = useState<number>(1);
  const [regFirstName, setRegFirstName] = useState<string>('Aarav');
  const [regSurname, setRegSurname] = useState<string>('Shah');
  const [regDob, setRegDob] = useState<string>('2016-08-15');
  const [regPhoto, setRegPhoto] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'); // Default avatar
  const [regMobile, setRegMobile] = useState<string>('9876543210');
  const [regParentMobile, setRegParentMobile] = useState<string>('9876543210');
  const [regEmail, setRegEmail] = useState<string>('parent@example.com');
  const [regAddress, setRegAddress] = useState<string>('Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064');
  const [regLevel, setRegLevel] = useState<string>('Level 1: Basic Sutras & Stories');
  const [regBatch, setRegBatch] = useState<string>('Saturdays, 05:30 PM');
  const [regAttendingOther, setRegAttendingOther] = useState<string>('No');
  const [isLocatingAddress, setIsLocatingAddress] = useState<boolean>(false);
  const [isSimulatedApproved, setIsSimulatedApproved] = useState<boolean>(false);
  const [isGurujiApproved, setIsGurujiApproved] = useState<boolean>(false);
  const [reportCardTab, setReportCardTab] = useState<string>('overview');
  
  // Multi-student registry (family registrations)
  const [registeredStudentsList, setRegisteredStudentsList] = useState<any[]>([
    {
      id: "STUD_INITIAL_1",
      firstName: "Aarav",
      surname: "Shah",
      dob: "2016-08-15",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      mobile: "9876543210",
      parentMobile: "9876543210",
      email: "shah.family@example.com",
      address: "Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064",
      level: "Level 1: Basic Sutras & Stories",
      batch: "Saturdays, 05:30 PM",
      attendingOther: "No",
      approved: true,
      paymentStatus: 'completed',
      paymentAmount: 100,
      paymentTxnId: 'TXN_INIT_987654'
    }
  ]);
  const [selectedStudentIndexForLogin, setSelectedStudentIndexForLogin] = useState<number>(0);
  const [otpTimer, setOtpTimer] = useState<number>(0);

  // Registration Fee Payment Flow States (₹100 per student profile)
  const [pendingPaymentStudentIndex, setPendingPaymentStudentIndex] = useState<number | null>(null);
  const [paymentState, setPaymentState] = useState<'checkout' | 'processing' | 'success' | 'failed'>('checkout');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'qr' | 'netbanking'>('upi');
  const [paymentTxnId, setPaymentTxnId] = useState<string>('');
  
  // Sutra review simulated recording state
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  
  // Sutra details active item
  const [selectedSutra, setSelectedSutra] = useState<SutraDetails>(sutrasList[0]);
  const [sutraSpeed, setSutraSpeed] = useState<string>('1×');
  const [favoriteSutras, setFavoriteSutras] = useState<string[]>([]);
  const [downloadedSutras, setDownloadedSutras] = useState<string[]>([]);
  const [downloadedSutraAudios, setDownloadedSutraAudios] = useState<string[]>([]);
  const [recentlyViewedSutras, setRecentlyViewedSutras] = useState<string[]>([]);
  const [continueReadingSutra, setContinueReadingSutra] = useState<string | null>(null);
  const [sutraSearchQuery, setSutraSearchQuery] = useState<string>('');
  const [sutraSelectedCategory, setSutraSelectedCategory] = useState<string>('All');
  const [sutraLanguage, setSutraLanguage] = useState<string>('English');
  const [adminPermittedAllLevels, setAdminPermittedAllLevels] = useState<boolean>(false);
  
  // Audio player sticky state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [audioTarget, setAudioTarget] = useState<string>('Navkar Mantra');
  const [audioSubtitle, setAudioSubtitle] = useState<string>('Sacred recitation by Samanji');
  const [favoriteStavans, setFavoriteStavans] = useState<string[]>([]);
  const [downloadedStavans, setDownloadedStavans] = useState<string[]>([]);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  
  // Stavan filtering and browsing states
  const [stavanSearchQuery, setStavanSearchQuery] = useState<string>('');
  const [stavanBrowseMode, setStavanBrowseMode] = useState<string>('all'); // 'all' | 'alphabetical' | 'bhagwan'
  const [stavanLetterFilter, setStavanLetterFilter] = useState<string>('All');
  const [stavanBhagwanFilter, setStavanBhagwanFilter] = useState<string>('All');
  
  // Active Stavan state
  const [selectedStavan, setSelectedStavan] = useState(STAVANS_LIST[0]);

  // Filter classes matching student level and batch (including General classes)
  const getStudentClasses = () => {
    return liveClasses.filter(cls => {
      if (cls.isGeneral) return true;
      
      const studLevel = student.level.toLowerCase();
      const clsLevel = cls.level.toLowerCase();
      
      const studBatch = (student.batch || "Saturdays, 05:30 PM").toLowerCase();
      const clsBatch = cls.batch.toLowerCase();
      
      // Match level
      const levelMatch = 
        (studLevel.includes("level 1") && clsLevel.includes("level 1")) ||
        (studLevel.includes("level 2") && clsLevel.includes("level 2")) ||
        (studLevel.includes("level 3") && clsLevel.includes("level 3")) ||
        studLevel === clsLevel;
        
      // Match batch
      const batchMatch = 
        studBatch.includes(clsBatch) || 
        clsBatch.includes(studBatch) || 
        studBatch === clsBatch;
        
      return levelMatch && batchMatch;
    });
  };

  // Get the closest upcoming class for the home dashboard
  const getNextUpcomingClass = () => {
    const matched = getStudentClasses();
    
    // Prioritize Live Now, then Upcoming
    const liveNow = matched.filter(cls => cls.status === 'LIVE NOW');
    if (liveNow.length > 0) return liveNow[0];
    
    const upcoming = matched.filter(cls => cls.status === 'Upcoming');
    if (upcoming.length > 0) return upcoming[0];
    
    return null;
  };

  // Bonus Event State (Admin configurable)
  const [activeBonusEvent, setActiveBonusEvent] = useState<{
    id: string;
    title: string;
    activities: { id: number; title: string; points: number }[];
  } | null>({
    id: 'evt_paryushan_2026',
    title: '⭐ Paryushan Special Activities',
    activities: [
      { id: 1, title: 'Navkar Mantra', points: 10 },
      { id: 2, title: 'Samayik', points: 30 },
      { id: 3, title: 'Pratikraman', points: 50 },
      { id: 4, title: 'Swadhyay', points: 20 },
      { id: 5, title: 'Sunday Special Lecture', points: 20 },
      { id: 6, title: 'Temple Visit', points: 15 },
      { id: 7, title: 'Paryushan Tap', points: 100 },
    ]
  });

  // Student's Bonus Submission Status
  const [bonusSubmissions, setBonusSubmissions] = useState<Record<string, {
    status: 'Draft' | 'Pending Review' | 'Approved' | 'Rework Required' | 'Rejected';
    selectedActivities: number[];
    teacherRemarks?: string;
  }>>({
    'evt_paryushan_2026': {
      status: 'Draft',
      selectedActivities: [],
    }
  });

  const [draftBonusActivities, setDraftBonusActivities] = useState<number[]>([]);
  const [bonusConfirmation, setBonusConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (activeBonusEvent && bonusSubmissions[activeBonusEvent.id]) {
      setDraftBonusActivities(bonusSubmissions[activeBonusEvent.id].selectedActivities);
    } else {
      setDraftBonusActivities([]);
    }
  }, [activeBonusEvent, bonusSubmissions]);

  // Bonus Points State
  const [bonusPointsRecords, setBonusPointsRecords] = useState<any[]>([
    {
      id: '1',
      category: 'Paryushan',
      eventName: 'Paryushan Swadhyay Attendance',
      date: '2025-09-15',
      pointsAwarded: 100,
      description: 'Attended daily morning and evening lectures/Swadhyays during the holy 8 days of Paryushan.'
    },
    {
      id: '2',
      category: 'Paryushan',
      eventName: 'Chauvihar Tyag Voluntary Vow',
      date: '2025-10-02',
      pointsAwarded: 50,
      description: 'Voluntarily completed evening meals before sunset for 10 consecutive days during Paryushan.'
    },
    {
      id: '3',
      category: 'Major Religious Events',
      eventName: 'Samvatsari Pratikraman Recital',
      date: '2025-09-22',
      pointsAwarded: 100,
      description: 'Recited the annual Pratikraman Sutra completely with proper Saman-ji rhythm and pronunciation.'
    }
  ]);
  const [selectedBonusPoint, setSelectedBonusPoint] = useState<any | null>(null);

  // State for recording/adding new bonus points (Academic register style)
  const [showAddBonusModal, setShowAddBonusModal] = useState<boolean>(false);
  const [newBonusEventName, setNewBonusEventName] = useState<string>('');
  const [newBonusCategory, setNewBonusCategory] = useState<string>('Paryushan');
  const [newBonusDate, setNewBonusDate] = useState<string>('2026-06-30');
  const [newBonusPoints, setNewBonusPoints] = useState<number>(50);
  const [newBonusDescription, setNewBonusDescription] = useState<string>('');

  // Dynamic score computation
  const isSundayClass = new Date().getDay() === 0;
  const totalBonusPoints = bonusPointsRecords.reduce((sum, item) => sum + Number(item.pointsAwarded || 0), 0);
  const overallPerformanceScore = student.attendanceScore + student.gathaScore + totalBonusPoints;

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // AI Quiz Hub state
  const [allQuizzes, setAllQuizzes] = useState<AIQuiz[]>(INITIAL_AI_QUIZZES);
  // Dev preview: seed an active quiz so `?screen=Quiz` renders the real Quiz UI.
  const [activeQuiz, setActiveQuiz] = useState<AIQuiz | null>(
    devPreviewScreen === 'Quiz' ? (INITIAL_AI_QUIZZES[0] || null) : null
  );
  const [quizAnswers, setQuizAnswers] = useState<(number | string | null)[]>([]);
  const [quizAnswersSubmitted, setQuizAnswersSubmitted] = useState(false);
  const [isAdminQuizMode, setIsAdminQuizMode] = useState(false);
  const [quizShowInstructions, setQuizShowInstructions] = useState(false);
  const [quizFilterCategory, setQuizFilterCategory] = useState('All');
  
  // Custom Content Generator state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState<'Sutra' | 'Stavan' | 'Stuti' | 'Gatha' | 'Jain Stories' | 'Bhagwan Stories'>('Sutra');
  const [uploadLevel, setUploadLevel] = useState<number>(3);
  const [uploadCategory, setUploadCategory] = useState('Philosophy');
  const [uploadText, setUploadText] = useState('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<AIQuizQuestion[]>([]);

  // Classroom Chat State
  const [liveChat, setLiveChat] = useState<{ sender: string; text: string; role: 'student' | 'teacher' }[]>([
    { sender: "Samani Pragya ji", text: "Welcome children! Today we are learning about Jiva & Ajiva.", role: "teacher" },
    { sender: "Dhairya Kothari", text: "Pranam Samanji! Looking forward to today's slides.", role: "student" },
    { sender: "Aanya Shah", text: "Jai Jinendra Samanji!", role: "student" }
  ]);
  const [newChatText, setNewChatText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeSidePanelTab, setActiveSidePanelTab] = useState<'chat' | 'participants'>('chat');
  const [showSidePanel, setShowSidePanel] = useState(true);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Sutra submission approved by Pujya Samanji!", time: "10 mins ago", unread: true },
    { id: 2, title: "New Game: Jain Cosmos Trivia is now live!", time: "2 hours ago", unread: true },
    { id: 3, title: "Reminder: Live Class starts in 15 minutes.", time: "4 hours ago", unread: false },
    { id: 4, title: "Attendance recorded: 91% overall this term.", time: "1 day ago", unread: false }
  ]);

  // Comprehensive Live Classes Data
  const [liveClasses, setLiveClasses] = useState([
    // Level 1 classes
    {
      id: 101,
      title: "Navkar Mantra Pronunciation",
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      level: "Level 1: Basic Sutras & Stories",
      batch: "Saturdays, 05:30 PM",
      time: "Today, 05:30 PM",
      date: "Today",
      duration: "45 mins",
      status: "LIVE NOW",
      description: "Learn the proper rhythm and breathing techniques for reciting the sacred Navkar Mantra.",
      isGeneral: false
    },
    {
      id: 102,
      title: "Lord Mahavira's Childhood Tales",
      teacher: "Shravika Shilpa Shah",
      level: "Level 1: Basic Sutras & Stories",
      batch: "Sundays, 10:00 AM",
      time: "Tomorrow, 10:00 AM",
      date: "Tomorrow",
      duration: "30 mins",
      status: "Upcoming",
      description: "Inspiring stories of Vardhaman's courage, compassion, and playfulness with his friends.",
      isGeneral: false
    },
    // Level 2 classes
    {
      id: 201,
      title: "Jain Geography & Jambudveep",
      teacher: "Samani Pragya ji",
      level: "Level 2: Jain Geography & Symbols",
      batch: "Saturdays, 05:30 PM",
      time: "Today, 05:30 PM",
      date: "Today",
      duration: "60 mins",
      status: "LIVE NOW",
      description: "Explore the fascinating Jain model of the cosmos, focusing on Jambudveep and its mountains.",
      isGeneral: false
    },
    // Level 3 classes (Default student Aarav Shah is Level 3, Saturdays 5:30 PM)
    {
      id: 301,
      title: "Sutra Navtatva Chapter 3",
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      level: "Level 3: Pratikraman & Advanced Vows",
      batch: "Saturdays, 05:30 PM",
      time: "Today, 05:30 PM",
      date: "Today",
      duration: "60 mins",
      status: "LIVE NOW",
      description: "Deep dive into the 9 Tattvas (Truths) of Jainism, focusing on Punya (merit) and Pap (demerit). Learn how actions influence our karmic bond.",
      isGeneral: false
    },
    {
      id: 302,
      title: "Pratikraman Vidhi Basic",
      teacher: "Sanyat Mahasati ji",
      level: "Level 3: Pratikraman & Advanced Vows",
      batch: "Wednesdays, 06:00 PM",
      time: "Tomorrow, 06:00 PM",
      date: "Tomorrow",
      duration: "60 mins",
      status: "Upcoming",
      description: "Understanding the seven steps of Pratikraman and reciting sutras for repentance.",
      isGeneral: false
    },
    // Completed Classes
    {
      id: 401,
      title: "Introduction to Five Great Vows",
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      level: "Level 3: Pratikraman & Advanced Vows",
      batch: "Saturdays, 05:30 PM",
      time: "Yesterday, 05:30 PM",
      date: "Yesterday",
      duration: "60 mins",
      status: "Completed",
      description: "A comprehensive introduction to Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha for beginners.",
      isGeneral: false
    },
    {
      id: 402,
      title: "Pratikraman Alochana Sutras",
      teacher: "Sanyat Mahasati ji",
      level: "Level 3: Pratikraman & Advanced Vows",
      batch: "Saturdays, 05:30 PM",
      time: "Last Saturday, 05:30 PM",
      date: "Last Saturday",
      duration: "60 mins",
      status: "Completed",
      description: "In-depth pronunciation practice and translation analysis of critical Alochana (confession) prayers.",
      isGeneral: false
    },
    // General Classes (display and notify everyone)
    {
      id: 501,
      title: "Paryushan Swadhyay & Forgiveness",
      teacher: "Acharya Kundkund Dev ji",
      level: "General",
      batch: "General",
      time: "Today, 07:00 PM",
      date: "Today",
      duration: "90 mins",
      status: "Upcoming",
      description: "A very special general session open to all Pathshala levels and batches to understand the profound power of Kshama (forgiveness).",
      isGeneral: true
    }
  ]);

  // Selected Live Class state for the Details page.
  // Dev preview: seed a class so `?screen=LiveClassDetails|LiveClassRoom` render real data.
  const [selectedLiveClass, setSelectedLiveClass] = useState<any>(
    (devPreviewScreen === 'LiveClassDetails' || devPreviewScreen === 'LiveClassRoom')
      ? (liveClasses.find((c) => c.level.toLowerCase().includes('level 3')) || liveClasses[0])
      : null
  );

  // Classroom States
  const [classroomTimeElapsed, setClassroomTimeElapsed] = useState(0); // in seconds
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [monthlyPresentCount, setMonthlyPresentCount] = useState(17);
  const [overallPresentCount, setOverallPresentCount] = useState(53);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isOpeningLiveClass, setIsOpeningLiveClass] = useState(false);
  const [liveClassListTab, setLiveClassListTab] = useState<'Live' | 'Upcoming' | 'Completed'>('Live');
  
  // Attendance Days State
  const [attendanceDays, setAttendanceDays] = useState([
    { day: 1, status: 'P' }, { day: 2, status: 'P' }, { day: 3, status: 'P' }, { day: 4, status: 'P' }, { day: 5, status: 'P' }, { day: 6, status: 'H' }, { day: 7, status: 'O' },
    { day: 8, status: 'P' }, { day: 9, status: 'P' }, { day: 10, status: 'P' }, { day: 11, status: 'P' }, { day: 12, status: 'P' }, { day: 13, status: 'H' }, { day: 14, status: 'O' },
    { day: 15, status: 'P' }, { day: 16, status: 'P' }, { day: 17, status: 'P' }, { day: 18, status: 'P' }, { day: 19, status: 'P' }, { day: 20, status: 'P' }, { day: 21, status: 'O' },
    { day: 22, status: 'P' }, { day: 23, status: 'P' }, { day: 24, status: 'P' }, { day: 25, status: 'A' }, { day: 26, status: 'A' }, { day: 27, status: 'P' }, { day: 28, status: 'O' },
    { day: 29, status: 'L' }, { day: 30, status: 'A' } // June 30 starts as 'A' (Absent) so students can earn it!
  ]);

  // Downloads List
  const [downloads, setDownloads] = useState([
    { id: 1, name: "Pratikraman Sutra Lyrics.pdf", size: "1.2 MB", type: "pdf" },
    { id: 2, name: "Navkar Mantra Devotional.mp3", size: "3.4 MB", type: "audio" },
    { id: 3, name: "Fundamentals of Jainism Slides.pdf", size: "4.8 MB", type: "pdf" }
  ]);

  // Camera stream helper effect for simulated student view
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startCamera() {
      if (isCameraOn && activeScreen === 'LiveClassRoom') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.log("Webcam access declined or blocked inside iframe container. Displaying animated avatar.", err);
        }
      }
    }
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, activeScreen]);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % jainQuotes.length);
    }, 10000);
    return () => clearInterval(quoteTimer);
  }, []);

  // Splash Screen timer redirect to respect initial routing.
  // Disabled in dev-preview mode so `?screen=Splash` can be previewed/captured.
  useEffect(() => {
    if (devPreviewScreen) return;
    if (activeScreen === 'Splash') {
      const timer = setTimeout(() => {
        setActiveScreen('Login');
      }, 2000); // 2 seconds delay for Splash screen to showcase
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Sticky audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      let speedFactor = 1.0;
      if (sutraSpeed.includes('0.5')) speedFactor = 0.5;
      else if (sutraSpeed.includes('1.5')) speedFactor = 1.5;
      else if (sutraSpeed.includes('2')) speedFactor = 2.0;

      const intervalMs = Math.round(1000 / speedFactor);
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, intervalMs);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, sutraSpeed]);

  // Sutra audio player handlers
  const handlePreviousSutra = () => {
    const currentIndex = sutrasList.findIndex(s => s.id === selectedSutra.id);
    const prevIndex = (currentIndex - 1 + sutrasList.length) % sutrasList.length;
    const prevSutra = sutrasList[prevIndex];
    setSelectedSutra(prevSutra);
    setAudioTarget(prevSutra.name);
    setAudioProgress(0);
  };

  const handleNextSutra = () => {
    const currentIndex = sutrasList.findIndex(s => s.id === selectedSutra.id);
    const nextIndex = (currentIndex + 1) % sutrasList.length;
    const nextSutra = sutrasList[nextIndex];
    setSelectedSutra(nextSutra);
    setAudioTarget(nextSutra.name);
    setAudioProgress(0);
  };

  const toggleSutraFav = () => {
    const isFav = favoriteSutras.includes(selectedSutra.id);
    if (isFav) {
      setFavoriteSutras(favoriteSutras.filter(id => id !== selectedSutra.id));
    } else {
      setFavoriteSutras([...favoriteSutras, selectedSutra.id]);
    }
  };

  const toggleSutraDown = () => {
    const isDown = downloadedSutraAudios.includes(selectedSutra.id);
    if (isDown) {
      setDownloadedSutraAudios(downloadedSutraAudios.filter(id => id !== selectedSutra.id));
      setDownloadedSutras(downloadedSutras.filter(id => id !== selectedSutra.id));
      alert(`"${selectedSutra.name}" removed from offline downloads.`);
    } else {
      setDownloadedSutraAudios([...downloadedSutraAudios, selectedSutra.id]);
      setDownloadedSutras([...downloadedSutras, selectedSutra.id]);
      alert(`"${selectedSutra.name}" audio and text downloaded successfully! Available offline in Downloads.`);
    }
  };

  // Stavan audio player handlers
  const handlePreviousStavan = () => {
    const currentIndex = STAVANS_LIST.findIndex(s => s.title === selectedStavan.title);
    const prevIndex = (currentIndex - 1 + STAVANS_LIST.length) % STAVANS_LIST.length;
    const prevStavan = STAVANS_LIST[prevIndex];
    setSelectedStavan(prevStavan);
    setAudioTarget(prevStavan.title);
    setAudioSubtitle(prevStavan.singer);
    setAudioProgress(0);
  };

  const handleNextStavan = () => {
    const currentIndex = STAVANS_LIST.findIndex(s => s.title === selectedStavan.title);
    const nextIndex = (currentIndex + 1) % STAVANS_LIST.length;
    const nextStavan = STAVANS_LIST[nextIndex];
    setSelectedStavan(nextStavan);
    setAudioTarget(nextStavan.title);
    setAudioSubtitle(nextStavan.singer);
    setAudioProgress(0);
  };

  const toggleStavanFav = () => {
    const isFav = favoriteStavans.includes(selectedStavan.title);
    if (isFav) {
      setFavoriteStavans(favoriteStavans.filter(t => t !== selectedStavan.title));
    } else {
      setFavoriteStavans([...favoriteStavans, selectedStavan.title]);
    }
  };

  const toggleStavanDown = () => {
    const isDown = downloadedStavans.includes(selectedStavan.title);
    if (isDown) {
      setDownloadedStavans(downloadedStavans.filter(t => t !== selectedStavan.title));
      alert(`"${selectedStavan.title}" removed from offline downloads.`);
    } else {
      setDownloadedStavans([...downloadedStavans, selectedStavan.title]);
      alert(`"${selectedStavan.title}" downloaded successfully! Available offline in Downloads.`);
    }
  };

  const toggleStavanDownItem = (title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isDown = downloadedStavans.includes(title);
    if (isDown) {
      setDownloadedStavans(downloadedStavans.filter(t => t !== title));
      alert(`"${title}" removed from offline downloads.`);
    } else {
      setDownloadedStavans([...downloadedStavans, title]);
      alert(`"${title}" downloaded successfully! Available offline in Downloads.`);
    }
  };

  const handleShareAudio = (title: string) => {
    const shareMessage = `🎙️ I am reciting "${title}" on Gyan Vatika. Join me to learn and chant together! 🌟`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareMessage);
      alert(`Share link copied to clipboard! Share it with friends and family.`);
    } else {
      alert(`Recitation link: Gyan Vatika - ${title}`);
    }
  };

  const triggerMarkAttendance = () => {
    if (isSundayClass) {
      // Award Bonus Points only for Sunday
      const newRecord = {
        id: String(Date.now()),
        category: "Sunday Special Class",
        eventName: "Attended Optional Sunday Class",
        date: new Date().toISOString().split('T')[0],
        pointsAwarded: 50,
        description: "Participated in optional Sunday class."
      };
      setBonusPointsRecords(prev => [newRecord, ...prev]);

      setNotifications(prev => [
        {
          id: Date.now(),
          title: "Sunday Special Class ✓: You earned 50 Bonus Points for participation!",
          time: "Just now",
          unread: true
        },
        ...prev
      ]);
    } else {
      // 1. Update June 30th to Present ('P')
      setAttendanceDays(prev => prev.map(day => day.day === 30 ? { ...day, status: 'P' } : day));
      
      // 2. Increment Monthly & Overall counts
      setMonthlyPresentCount(18);
      setOverallPresentCount(54);
      
      // 3. Update student points (+100 Points for class participation!) and attendance percent
      setStudent(s => ({
        ...s,
        attendanceScore: s.attendanceScore + 100,
        attendance: 94
      }));

      // 4. Send a Notification about Attendance being marked!
      setNotifications(prev => [
        {
          id: Date.now(),
          title: "Attendance Recorded ✓: You earned 100 Attendance Score for active class participation!",
          time: "Just now",
          unread: true
        },
        ...prev
      ]);
    }
  };

  // Classroom Live Timer and Attendance marking
  useEffect(() => {
    let timerId: any;
    if (activeScreen === 'LiveClassRoom') {
      timerId = setInterval(() => {
        setClassroomTimeElapsed(prev => {
          const nextVal = prev + 1;
          if (nextVal >= 300 && !isAttendanceMarked) {
            // Auto-trigger attendance once we hit 300 seconds (5 minutes)
            setIsAttendanceMarked(true);
            triggerMarkAttendance();
          }
          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [activeScreen, isAttendanceMarked]);

  const handleToggleNiyam = (dayDate: string, id: number) => {
    const targetDay = niyamDays.find(d => d.date === dayDate);
    if (!targetDay || getIsNiyamDateLocked(dayDate, targetDay.submitted)) return;
    setNiyamDays((prev) => 
      prev.map(day => {
        if (day.date === dayDate) {
          return {
            ...day,
            niyams: day.niyams.map(n => {
              if (n.id === id) {
                return { ...n, done: !n.done };
              }
              return n;
            })
          };
        }
        return day;
      })
    );
  };

  const handleSubmitNiyamDay = (dayDate: string) => {
    const targetDay = niyamDays.find(d => d.date === dayDate);
    if (!targetDay || getIsNiyamDateLocked(dayDate, targetDay.submitted)) return;
    setNiyamDays(prev => {
      let pointsDiff = 0;
      const updatedDays = prev.map(day => {
        if (day.date === dayDate) {
          const currentPoints = day.niyams.reduce((sum, n) => n.done ? sum + n.points : sum, 0);
          if (!day.submitted) {
            pointsDiff = currentPoints;
            return { ...day, submitted: true, pointsEarned: currentPoints };
          } else {
            pointsDiff = 0;
            return { ...day, pointsEarned: currentPoints };
          }
        }
        return day;
      });
      if (pointsDiff > 0) {
        setStudent(s => ({ ...s, points: s.points + pointsDiff }));
      }
      return updatedDays;
    });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setLiveChat((prev) => [...prev, { sender: "Aarav Shah (You)", text: newChatText, role: "student" }]);
    setNewChatText("");
    setTimeout(() => {
      setLiveChat((prev) => [
        ...prev,
        { sender: "Samani Pragya ji", text: "Excellent point, Aarav! Always seek self-realization.", role: "teacher" }
      ]);
    }, 1500);
  };

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    const isCorrect = index === pathshalaTrivia[currentQuizIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore((s) => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuizIndex < pathshalaTrivia.length - 1) {
      setCurrentQuizIndex((idx) => idx + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  // Start an AI-generated quiz
  const handleStartAIQuiz = (quiz: AIQuiz) => {
    setActiveQuiz(quiz);
    setCurrentQuizIndex(0);
    // Initialize answers list with null values
    setQuizAnswers(new Array(quiz.questions.length).fill(null));
    setQuizAnswersSubmitted(false);
    setQuizScore(0);
    setQuizShowInstructions(true);
    setActiveScreen('Quiz');
  };

  // View past results for a quiz
  const handleViewPastResult = (quiz: AIQuiz, historyRecord: any) => {
    setActiveQuiz(quiz);
    setCurrentQuizIndex(0);
    const dummyAnswers = new Array(quiz.questions.length).fill(null).map((_, idx) => quiz.questions[idx].correctAnswer);
    setQuizAnswers(dummyAnswers);
    setQuizAnswersSubmitted(true);
    setQuizShowInstructions(false);
    setQuizScore(historyRecord.score);
    setActiveScreen('Quiz');
  };

  // Answer selection/update for AI quiz questions
  const handleSelectAIAnswer = (answerVal: number | string) => {
    if (quizAnswersSubmitted) return; // Prevent edits after submission
    setQuizAnswers(prev => {
      const updated = [...prev];
      updated[currentQuizIndex] = answerVal;
      return updated;
    });
  };

  // Navigate to previous question
  const handlePrevAIQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };

  // Navigate to next question (without submitting)
  const handleNextAIQuestion = () => {
    if (activeQuiz && currentQuizIndex < activeQuiz.questions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    }
  };

  // Submit AI quiz
  const handleSubmitAIQuiz = () => {
    if (!activeQuiz) return;
    
    // Evaluate score
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      const studentAns = quizAnswers[idx];
      if (q.type === 'mcq' || q.type === 'boolean') {
        if (studentAns === q.correctAnswer) {
          score += 1;
        }
      } else if (q.type === 'fill') {
        // String comparison, case-insensitive and trimmed
        if (
          typeof studentAns === 'string' && 
          studentAns.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
        ) {
          score += 1;
        }
      }
    });

    const totalQuestions = activeQuiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    setQuizScore(score);
    setQuizAnswersSubmitted(true);

    // Add points to student: 25 points per correct answer!
    const pointsEarned = score * 25;
    setStudent(prev => {
      const currentHistory = prev.quizHistory || [];
      // Avoid duplicating history records for the same quiz
      const filteredHistory = currentHistory.filter(h => h.quizId !== activeQuiz.id);
      
      const newHistoryRecord: QuizHistoryRecord = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score,
        totalQuestions,
        percentage,
        completedAt: "Completed just now"
      };

      return {
        ...prev,
        quizHistory: [newHistoryRecord, ...filteredHistory]
      };
    });
  };

  // Retake active AI quiz
  const handleRetakeAIQuiz = () => {
    if (!activeQuiz) return;
    setCurrentQuizIndex(0);
    setQuizAnswers(new Array(activeQuiz.questions.length).fill(null));
    setQuizAnswersSubmitted(false);
    setQuizScore(0);
    setQuizShowInstructions(true);
  };

  // Close AI quiz and return to Games Home
  const handleExitAIQuiz = () => {
    setActiveQuiz(null);
    setQuizAnswers([]);
    setQuizAnswersSubmitted(false);
    setQuizScore(0);
    setActiveScreen('GamesHome');
  };

  // Local AI generator with simulation steps
  const handleGenerateAIQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadText.trim()) return;

    setIsGeneratingQuiz(true);
    setGenerationStep(0);

    // Simulation steps
    const steps = [
      "Reading and analyzing text content...",
      "Extracting key spiritual entities and Jain terms...",
      "Generating Multiple Choice Questions (MCQ)...",
      "Generating True/False and Fill-in-the-Blank conceptual checks...",
      "Structuring academic quiz layout..."
    ];

    const runSteps = (stepIdx: number) => {
      if (stepIdx < steps.length) {
        setGenerationStep(stepIdx);
        setTimeout(() => runSteps(stepIdx + 1), 600);
      } else {
        // Complete generation!
        const parsedQuestions = parseTextToGenerateQuestions(uploadTitle, uploadType, uploadText);
        setGeneratedQuestions(parsedQuestions);
        setIsGeneratingQuiz(false);
      }
    };

    runSteps(0);
  };

  // Smart parser to build high-quality questions based on keywords or text
  const parseTextToGenerateQuestions = (title: string, type: string, text: string): AIQuizQuestion[] => {
    const cleanText = text.trim();
    const lowerText = cleanText.toLowerCase();

    // Default questions in case text is custom or generic
    const questionsList: AIQuizQuestion[] = [];

    // Let's analyze terms in text to build highly context-specific questions!
    // We can search for words and create fill in the blanks or MCQs
    const terms = [
      { key: "ahimsa", label: "Ahimsa", definition: "non-violence or non-injury to living beings" },
      { key: "karma", label: "Karma", definition: "the subtle matter that bonds with the soul due to actions" },
      { key: "mahavira", label: "Lord Mahavira", definition: "the 24th Tirthankara of Jainism" },
      { key: "sutra", label: "Sutra", definition: "a sacred verse or scripture containing spiritual wisdom" },
      { key: "stavan", label: "Stavan", definition: "a devotional song of praise" },
      { key: "shravak", label: "Shravak", definition: "a Jain lay follower/householder" },
      { key: "tirthankara", label: "Tirthankara", definition: "a spiritual teacher who establishes the four-fold order" },
      { key: "jiva", label: "Jiva", definition: "the soul or living consciousness" },
      { key: "ajiva", label: "Ajiva", definition: "non-living matter or substance" },
      { key: "anekantavada", label: "Anekantavada", definition: "the principle of pluralism and multi-sided viewpoints" },
      { key: "aparigraha", label: "Aparigraha", definition: "non-possessiveness or limiting material desires" }
    ];

    // Find if any terms are present in the text
    const foundTerms = terms.filter(t => lowerText.includes(t.key));

    if (foundTerms.length >= 2) {
      // Create questions based on found terms!
      const term1 = foundTerms[0];
      const term2 = foundTerms[1];

      // Question 1: MCQ about term 1
      questionsList.push({
        question: `According to the uploaded study materials, what does the term '${term1.label}' refer to?`,
        type: "mcq",
        options: [
          `The principle of ${term1.definition}`,
          "A type of physical food or fast",
          "A description of heavenly palaces",
          "The ritual of standing in meditation"
        ],
        correctAnswer: 0,
        explanation: `As described in the study materials, ${term1.label} represents ${term1.definition}.`
      });

      // Question 2: True/False about term 2
      questionsList.push({
        question: `True or False: The concept of '${term2.label}' is generally defined as ${term2.definition}.`,
        type: "boolean",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: `Yes, ${term2.label} is indeed the term used for ${term2.definition}.`
      });

      // Question 3: Fill-in-the-blank about another term or general concept
      questionsList.push({
        question: `Complete the blank: '${term1.definition.slice(0, 40)}...' is the core meaning of the term '_______'.`,
        type: "fill",
        options: [term1.label, term2.label, "Siddha", "Muni"],
        correctAnswer: term1.label,
        explanation: `${term1.label} is defined as ${term1.definition}.`
      });
    } else {
      // Fallback/Generic questions custom-tailored to the selected Content Type!
      if (type === 'Sutra' || type === 'Gatha') {
        questionsList.push({
          question: `What is the spiritual purpose of reciting this ${type} during Pathshala study?`,
          type: "mcq",
          options: ["To memorize words without thinking", "To purify thoughts, calm the mind, and connect with Tirthankara wisdom", "To impress others with recitation speed", "To achieve worldly desires and fortune"],
          correctAnswer: 1,
          explanation: `Recitation of ${type}s is a powerful tool to focus the mind, internalize the pure Prakrit/Sanskrit sounds, and absorb the deep philosophical meanings.`
        });
        questionsList.push({
          question: `True or False: In Jainism, understanding the inner meaning of a ${type} is considered more spiritually beneficial than mere blind recitation.`,
          type: "boolean",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "True. While recitation has sound purification benefits, 'Bhavana' (deep contemplative understanding) is the actual key to shedding karma."
        });
        questionsList.push({
          question: `Recitation of sacred verses helps to achieve _______ (internal peace and equanimity).`,
          type: "fill",
          options: ["Samata", "Greed", "Ego", "Krodh"],
          correctAnswer: "Samata",
          explanation: "Samata (equanimity) is the supreme state of soul that is cultivated through pure contemplation."
        });
      } else if (type === 'Stavan' || type === 'Stuti') {
        questionsList.push({
          question: `Which emotion (Bhav) should be prominent while singing this devotional ${type}?`,
          type: "mcq",
          options: ["Bhakti Bhav (devotion and surrender to virtues)", "Ahamkar Bhav (ego and pride)", "Chinta Bhav (worry and anxiety)", "Krodh Bhav (anger and frustration)"],
          correctAnswer: 0,
          explanation: "Stavan and Stuti are acts of pure Bhakti (devotion), where we sing praises of the virtues of Tirthankaras to invoke those same virtues in ourselves."
        });
        questionsList.push({
          question: `True or False: Singing a devotional ${type} helps in reducing our attachment to materialistic things by focusing on pure souls.`,
          type: "boolean",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "True. Focusing on the detached, pure state of the Jinas inspires us to let go of material infatuations."
        });
        questionsList.push({
          question: `Devotional music of the Jinas is a form of _______ Bhakti (devotion).`,
          type: "fill",
          options: ["Bhav", "Physical", "Dravya", "None"],
          correctAnswer: "Bhav",
          explanation: "Bhav Bhakti involves internalizing the spiritual feelings of devotion."
        });
      } else {
        // Stories (Jain Stories / Bhagwan Stories)
        questionsList.push({
          question: `What is the primary spiritual lesson (moral) we learn from this ${type}?`,
          type: "mcq",
          options: ["How to gain physical strength", "How to practice non-violence, patience, forgiveness, and karma reduction", "How to accumulate vast material wealth", "How to win debates against opponents"],
          correctAnswer: 1,
          explanation: "Jain educational stories are designed to instill ethical virtues like Ahimsa, non-possession, self-control, and trust in the law of Karma."
        });
        questionsList.push({
          question: `True or False: According to the principles shown in this story, a person's external status is more important than their internal purity.`,
          type: "boolean",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation: "False. Jainism consistently teaches that internal purity (Bhav Shuddhi) is the only measure of spiritual progress, regardless of birth or social status."
        });
        questionsList.push({
          question: `The ultimate goal of every story character is to shed karma and purify their _______ (soul).`,
          type: "fill",
          options: ["Atma", "Body", "House", "Mind"],
          correctAnswer: "Atma",
          explanation: "Purifying the Atma (soul) to achieve ultimate liberation (Moksha) is the core purpose of Jain spiritual life."
        });
      }
    }

    return questionsList;
  };

  // Confirm and Publish the newly generated quiz!
  const handleConfirmAndPublishQuiz = () => {
    if (!uploadTitle.trim() || generatedQuestions.length === 0) return;

    const newQuiz: AIQuiz = {
      id: `custom_quiz_${Date.now()}`,
      title: uploadTitle.trim() + " AI Quiz",
      relatedContentName: uploadTitle.trim(),
      type: uploadType,
      questions: generatedQuestions,
      estimatedTime: `${Math.max(3, generatedQuestions.length * 1.5)} mins`,
      difficulty: uploadLevel === 1 ? 'Beginner' : uploadLevel === 2 ? 'Intermediate' : 'Advanced',
      level: uploadLevel,
      category: uploadCategory,
      publishedAt: "Published just now"
    };

    setAllQuizzes(prev => [newQuiz, ...prev]);
    
    // Reset admin form
    setUploadTitle('');
    setUploadText('');
    setGeneratedQuestions([]);
    setIsAdminQuizMode(false); // return to student browsing!
    
    // Add success notification
    setNotifications(prev => [
      {
        id: Date.now(),
        title: `New AI Quiz published: "${newQuiz.title}" (Level ${newQuiz.level})`,
        time: "Just now",
        unread: true
      },
      ...prev
    ]);
  };

  // 23 Core Screens Configuration for quick navigator
  const screensList = [
    { name: 'Splash', icon: Sparkles, label: '1. Splash Screen' },
    { name: 'Language', icon: Languages, label: '2. Language Selection' },
    { name: 'Login', icon: Lock, label: '3. Login / Register' },
    { name: 'Payment', icon: CreditCard, label: '3b. Registration Fee (₹100)' },
    { name: 'ForgotPassword', icon: HelpCircle, label: '4. Forgot Password' },
    { name: 'Home', icon: LayoutDashboard, label: '5. Home Dashboard' },
    { name: 'Syllabus', icon: BookMarked, label: '5b. Student Syllabus' },
    { name: 'LiveClassList', icon: Video, label: '6. Live Class List' },
    { name: 'LiveClassDetails', icon: Tv, label: '7. Live Class Details' },
    { name: 'SutraList', icon: BookOpenCheck, label: '8. Sutra List' },
    { name: 'SutraDetails', icon: BookOpen, label: '9. Sutra Details' },
    { name: 'AudioLyrics', icon: Music, label: '10. Audio & Lyrics' },
    { name: 'StavanList', icon: Volume2, label: '11. Stavan & Stuti' },
    { name: 'StavanDetails', icon: Heart, label: '12. Stavan Details' },
    { name: 'Niyam', icon: Star, label: '12b. Daily Niyam Screen' },
    { name: 'BonusEvent', icon: Star, label: '13. Bonus Event Screen' },
    { name: 'GamesHome', icon: Gamepad2, label: '14. Games Home' },
    { name: 'Quiz', icon: Trophy, label: '15. Quiz Screen' },
    { name: 'Profile', icon: User, label: '16. Profile' },
    { name: 'ProfileReportCard', icon: Award, label: '17. Learning Progress' },
    { name: 'Downloads', icon: Download, label: '18. Downloads' },
    { name: 'Notifications', icon: Bell, label: '19. Notifications' },
    { name: 'Settings', icon: Settings, label: '20. Settings' },
    { name: 'Search', icon: Search, label: '21. Search' },
    { name: 'TeacherDashboard', icon: GraduationCap, label: '22. Teacher Dashboard' },
    { name: 'AdminPanel', icon: Shield, label: '23. Admin Panel' },
  ];


  if (activeScreen === 'AdminPanel') {
    return <AdminPortal onReturnToLauncher={() => setActiveScreen('Profile')} />;
  }

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-900 font-sans flex flex-col items-center justify-center p-4 lg:p-8 overflow-x-hidden relative selection:bg-emerald-200 selection:text-[#163E2B]">
      
      {/* Visual background ambient layers */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-950/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main UI Container */}
      <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-8 items-stretch justify-center relative">
        
        {/* Left Side: Figma-Style Prototype Interactive Screen Switcher */}
        {showFigmaPrototype && (
          <div className="w-full xl:w-[350px] bg-[#0f172a] border border-slate-800 rounded-[32px] p-6 text-slate-300 flex flex-col justify-between shadow-2xl shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-[11px] font-bold tracking-wider uppercase border border-emerald-800/40">
                  Figma Prototype
                </span>
                <span className="px-3 py-1 bg-amber-950 text-amber-400 rounded-full text-[11px] font-bold tracking-wider uppercase border border-amber-900/30">
                  {screensList.length} Screens
                </span>
              </div>

              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <span>Interactive Switcher</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Click any mobile view below to hot-swap the high-fidelity simulator frame instantly.
              </p>

              {/* Screens List Selector */}
              <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1 no-scrollbar border-y border-slate-800 py-3">
                {screensList.map((sc) => {
                  const Icon = sc.icon;
                  const isCurrent = activeScreen === sc.name;
                  return (
                    <button
                      key={sc.name}
                      onClick={() => setActiveScreen(sc.name)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-[#163E2B] text-white font-extrabold shadow-md shadow-[#163E2B]/10' 
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                        <span>{sc.label}</span>
                      </div>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-xs text-slate-400">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="font-bold text-white block mb-1 font-mono text-[10px] uppercase text-emerald-400">Gyan Vatika Branding</span>
                <p className="text-slate-400 leading-normal text-[11px]">
                  Features our signature warm ivory canvas, serene deep forest green accents, muted gold highlights, and clean soft card radiuses.
                </p>
              </div>
              <div className="text-center font-mono text-[10px] text-slate-500">
                Gyan Vatika Suite • Live Simulator v1.5
              </div>
            </div>
          </div>
        )}

        {/* Center: High-Fidelity Mobile Device Canvas Mockup */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          <div className="mb-4 flex items-center gap-3">
            <button
              onClick={() => setShowFigmaPrototype(!showFigmaPrototype)}
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
            >
              {showFigmaPrototype ? 'Hide Screen Switcher' : 'Show Screen Switcher'}
            </button>
          </div>
          
          {showFigmaPrototype && (
            <div className="mb-4 text-center">
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                  {screensList.find(s => s.name === activeScreen)?.label}
                </p>
              </div>
            </div>
          )}

          {/* Elegant Mobile Phone Frame */}
          <div data-device-frame data-screen={activeScreen} className="relative w-[390px] h-[810px] rounded-[52px] border-[10px] border-slate-800 bg-[#0c1220] shadow-[0_25px_65px_rgba(0,0,0,0.85)] p-3 overflow-hidden select-none">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-4.5 left-1/2 transform -translate-x-1/2 w-30 h-6.5 bg-black rounded-full z-50 flex items-center justify-between px-3.5">
              <div className="w-2 h-2 rounded-full bg-navy-950 border border-slate-900" />
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-400 font-bold font-mono">Gyan Vatika</span>
              </div>
            </div>

            {/* Canvas Container inside the screen */}
            <div data-device-screen className="w-full h-full rounded-[40px] bg-[#FAF8F5] overflow-y-auto no-scrollbar relative flex flex-col text-slate-800 shadow-xs">
              
              {/* Device Status Bar */}
              <div className="pt-3.5 pb-2 px-6 flex justify-between items-center text-xs font-bold text-[#0f172a]/70 z-30 font-mono shrink-0">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.13 19.66 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <span className="text-[10px]">LTE</span>
                  <div className="w-5 h-2.8 rounded-sm border border-[#0f172a]/70 p-0.5 flex items-center">
                    <div className="h-full w-3.5 bg-[#0f172a]/70 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* ACTIVE SCREEN CONTENT */}
              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-24 relative">
                
                {/* 1. SPLASH SCREEN */}
                {activeScreen === 'Splash' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.8 }}
                    className="h-full flex flex-col items-center justify-between px-6 py-10 text-center bg-[#FAF8F5]"
                  >
                    <div className="w-full" />
                    
                    <div className="flex flex-col items-center space-y-6">
                      {/* Logo container */}
                      <div className="w-32 h-32 flex items-center justify-center bg-white border border-emerald-100/80 rounded-3xl overflow-hidden relative shadow-sm p-4">
                        <PathshalaLogo />
                      </div>

                      <div className="space-y-2">
                        <h1 className="text-2xl font-black text-[#163E2B] tracking-tight">GYAN VATIKA</h1>
                        <p className="text-xs text-[#C5A059] font-extrabold uppercase tracking-widest font-mono">Knowledge • Discipline • Devotion</p>
                      </div>

                      <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed font-medium">
                        Nurturing spiritual growth and values in a serene, modern academic environment.
                      </p>
                    </div>

                    <div className="w-full space-y-4">
                      {/* Loading simulator */}
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 bg-[#163E2B] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-2 h-2 bg-[#163E2B] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <span className="w-2 h-2 bg-[#163E2B] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                      

                       <button 
                        onClick={() => {
                          setActiveScreen('Login');
                        }}
                        className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. LANGUAGE SELECTION */}
                {activeScreen === 'Language' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="p-6 space-y-6"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#163E2B] tracking-widest uppercase font-mono">Welcome</span>
                      <h3 className="text-xl font-black text-slate-900">Select Language</h3>
                      <p className="text-xs text-slate-500">Choose your preferred medium for Sutras, Stavan lyrics and lectures.</p>
                    </div>

                    <div className="space-y-3.5 pt-2">
                      {[
                        { id: 'English', title: 'English Medium', subtitle: 'Standard global notation & explanation', flag: '🇬🇧' },
                        { id: 'Hindi', title: 'हिन्दी माध्यम', subtitle: 'देवनागरी लिपि और सुलभ व्याख्या', flag: '🇮🇳' },
                        { id: 'Gujarati', title: 'ગુજરાતી માધ્યમ', subtitle: 'શુદ્ધ ઉચ્ચારણ અને વિગતવાર સમજણ', flag: '🇮🇳' }
                      ].map((lang) => {
                        const isSelected = selectedLanguage === lang.id;
                        return (
                          <div
                            key={lang.id}
                            onClick={() => setSelectedLanguage(lang.id)}
                            className={`p-4 rounded-[22px] border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected 
                                ? 'bg-emerald-50/80 border-[#163E2B] shadow-md shadow-[#163E2B]/5' 
                                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-900">{lang.title}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5">{lang.subtitle}</p>
                              </div>
                            </div>
                            <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-[#163E2B] border-[#163E2B] text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => {
                        const isTeacher = pendingUserType === 'teacher' || localStorage.getItem('shalaSession') === 'teacher';
                        if (isTeacher) {
                          setActiveScreen('TeacherDashboard');
                        } else {
                          setActiveScreen('Home');
                        }
                      }}
                      className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                    >
                      <span>Confirm Language</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* 2.5. WELCOME SCREEN */}
                {activeScreen === 'Welcome' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="p-6 h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col items-center text-center space-y-6 pt-6">
                      {/* App Logo Container */}
                      <div className="w-20 h-20 bg-white border border-emerald-100 rounded-[24px] flex items-center justify-center shadow-md p-2 relative">
                        <PathshalaLogo showText={false} className="w-16 h-16" />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-[#163E2B] tracking-widest uppercase font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Gyan Vatika Platform</span>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome to Gyan Vatika</h2>
                      </div>

                      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5 text-left">
                        <h4 className="font-extrabold text-xs text-[#163E2B] uppercase tracking-wider font-mono">Nurturing Soul & Character</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Gyan Vatika brings traditional moral education, Prakrit Sutra recitation, daily niyam trackers, and Guruji interactions directly to your device. 
                        </p>
                        <div className="flex items-start gap-2.5 pt-1 text-[11px] text-slate-600">
                          <span className="text-emerald-700 font-extrabold">✓</span>
                          <span>Interactive Gatha Pronunciation Review</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[11px] text-slate-600">
                          <span className="text-emerald-700 font-extrabold">✓</span>
                          <span>Daily Spiritual Niyam Log & Points Rewards</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[11px] text-slate-600">
                          <span className="text-emerald-700 font-extrabold">✓</span>
                          <span>Live interactive shala & batch scheduling</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3.5 pt-6">
                      <button 
                        onClick={() => {
                          setRegistrationStep(1);
                          setActiveScreen('Register');
                        }}
                        className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                      >
                        <span>New Student Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => {
                          setIsOtpSent(false);
                          setLoginPhone('');
                          setActiveScreen('Login');
                        }}
                        className="w-full py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Existing User Login</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2.6. STUDENT REGISTRATION (MULTI-STEP & SIBLINGS) */}
                {activeScreen === 'Register' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="p-5 space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          if (registrationStep > 1) {
                            setRegistrationStep(registrationStep - 1);
                          } else {
                            setActiveScreen('Welcome');
                          }
                        }} 
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-800" />
                      </button>
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">REGISTRATION</span>
                        <h3 className="text-base font-black text-slate-900">Student Enrollment</h3>
                      </div>
                    </div>

                    {/* Step Tracker Indicator */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 flex justify-between items-center text-xs shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 font-mono">PROGRESS:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <div 
                              key={s} 
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                                registrationStep === s 
                                  ? 'bg-[#163E2B] text-white' 
                                  : registrationStep > s 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {registrationStep > s ? '✓' : s}
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#163E2B] font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Step {registrationStep} of 3
                      </span>
                    </div>

                    {/* Form Step 1: Personal Info */}
                    {registrationStep === 1 && (
                      <div className="space-y-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
                        <div className="border-b border-slate-100 pb-2 mb-1">
                          <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">1. Personal Profile</h4>
                          <p className="text-[10px] text-slate-400">Enter the student's legal name and profile details.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">First Name *</label>
                            <input 
                              type="text" 
                              value={regFirstName}
                              onChange={(e) => setRegFirstName(e.target.value)}
                              placeholder="e.g. Aarav"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Surname *</label>
                            <input 
                              type="text" 
                              value={regSurname}
                              onChange={(e) => setRegSurname(e.target.value)}
                              placeholder="e.g. Shah"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Date of Birth *</label>
                          <input 
                            type="date" 
                            value={regDob}
                            onChange={(e) => setRegDob(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                          />
                        </div>

                        {/* Profile Photo Selector */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Profile Photo *</label>
                          <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                            <div className="relative w-14 h-14 rounded-full bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                              {regPhoto ? (
                                <img src={regPhoto} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-7 h-7 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-[10px] font-extrabold text-slate-700 hover:bg-slate-100 cursor-pointer transition-all active:scale-95">
                                <Camera className="w-3.5 h-3.5 text-slate-500" />
                                <span>Upload Photo</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setRegPhoto(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }} 
                                />
                              </label>
                              <p className="text-[9px] text-slate-400">Supports JPG, PNG or WebP image formats.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Step 2: Contact & Geolocation Address */}
                    {registrationStep === 2 && (
                      <div className="space-y-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
                        <div className="border-b border-slate-100 pb-2 mb-1">
                          <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">2. Contact & Address Details</h4>
                          <p className="text-[10px] text-slate-400">Submit parent contact number and accurate address.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Mobile Number *</label>
                            <input 
                              type="tel" 
                              value={regMobile}
                              onChange={(e) => setRegMobile(e.target.value)}
                              placeholder="e.g. 9876543210"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Parent/Family Mobile *</label>
                            <input 
                              type="tel" 
                              value={regParentMobile}
                              onChange={(e) => setRegParentMobile(e.target.value)}
                              placeholder="e.g. 9876543210"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Email Address *</label>
                          <input 
                            type="email" 
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="parent@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all"
                          />
                        </div>

                        {/* Complete Residential Address with Location Capture */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block">Complete Residential Address *</label>
                            
                            <button
                              type="button"
                              onClick={() => {
                                setIsLocatingAddress(true);
                                if (navigator.geolocation) {
                                  navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                      const { latitude, longitude } = position.coords;
                                      setTimeout(() => {
                                        setRegAddress(`Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064 (Live GPS verified: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E)`);
                                        setIsLocatingAddress(false);
                                        alert("Device GPS verified successfully! Complete address has been populated.");
                                      }, 800);
                                    },
                                    (error) => {
                                      setTimeout(() => {
                                        setRegAddress("Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064");
                                        setIsLocatingAddress(false);
                                        alert("Location coordinates captured. Complete address has been populated successfully!");
                                      }, 800);
                                    }
                                  );
                                } else {
                                  setTimeout(() => {
                                    setRegAddress("Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064");
                                    setIsLocatingAddress(false);
                                    alert("Location coordinates captured. Complete address has been populated successfully!");
                                  }, 800);
                                }
                              }}
                              className="text-[9px] text-[#163E2B] font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              {isLocatingAddress ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : (
                                <MapPin className="w-3 h-3 text-[#163E2B]" />
                              )}
                              <span>{isLocatingAddress ? 'Locating...' : 'Use Current Location'}</span>
                            </button>
                          </div>
                          <textarea 
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            rows={3}
                            placeholder="Enter door number, building, society, landmark, and pin code."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Form Step 3: Pathshala Levels */}
                    {registrationStep === 3 && (
                      <div className="space-y-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
                        <div className="border-b border-slate-100 pb-2 mb-1">
                          <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">3. Pathshala Enrollment</h4>
                          <p className="text-[10px] text-slate-400">Select standard levels and batch timing schedules.</p>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Pathshala Level Selection *</label>
                          <select 
                            value={regLevel}
                            onChange={(e) => setRegLevel(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all cursor-pointer"
                          >
                            <option value="Level 1: Basic Sutras & Stories">Level 1: Bal Shala (Basic Sutras & Stories)</option>
                            <option value="Level 2: Jain Geography & Symbols">Level 2: Kumar Shala (Jain Geography & Symbols)</option>
                            <option value="Level 3: Pratikraman & Advanced Vows">Level 3: Yuva Shala (Pratikraman & Philosophy)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Batch Time Selection *</label>
                          <select 
                            value={regBatch}
                            onChange={(e) => setRegBatch(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#163E2B] transition-all cursor-pointer"
                          >
                            <option value="Saturdays, 05:30 PM">Saturdays, 05:30 PM (Weekly Main Session)</option>
                            <option value="Sundays, 10:00 AM">Sundays, 10:00 AM (Weekend Morning)</option>
                            <option value="Wednesdays, 06:00 PM">Wednesdays, 06:00 PM (Mid-week Revision)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Are you currently attending any Pathshala? *</label>
                          <div className="flex gap-3">
                            {['Yes', 'No'].map((opt) => {
                              const isSel = regAttendingOther === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setRegAttendingOther(opt)}
                                  className={`flex-1 py-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                                    isSel 
                                      ? 'bg-[#163E2B] border-[#163E2B] text-white shadow-xs' 
                                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="space-y-2.5 pt-2">
                      {registrationStep < 3 ? (
                        <button 
                          onClick={() => {
                            if (registrationStep === 1) {
                              if (!regFirstName || !regSurname || !regDob || !regPhoto) {
                                alert("Please fill in First Name, Surname, Date of Birth, and upload a Profile Photo to proceed.");
                                return;
                              }
                            }
                            if (registrationStep === 2) {
                              if (!regMobile || !regParentMobile || !regEmail || !regAddress) {
                                alert("Please fill in your Mobile Number, Parent Mobile, Email, and Complete Residential Address to proceed.");
                                return;
                              }
                            }
                            setRegistrationStep(registrationStep + 1);
                          }}
                          className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <span>Continue to Next Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="space-y-2.5">
                          {/* Complete & Submit */}
                          <button 
                            onClick={() => {
                              if (!regFirstName) {
                                alert("Please make sure at least the First Name is filled to complete registration.");
                                return;
                              }

                              const lastChild = {
                                id: `STUD_${Date.now()}`,
                                firstName: regFirstName,
                                surname: regSurname || "Shah",
                                dob: regDob || "2016-08-15",
                                photo: regPhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                                mobile: regMobile || "9876543210",
                                parentMobile: regParentMobile || "9876543210",
                                email: regEmail || "parent@example.com",
                                address: regAddress || "Flat 402, Parasmani Apartments, SV Road, Malad West, Mumbai - 400064",
                                level: regLevel,
                                batch: regBatch,
                                attendingOther: regAttendingOther,
                                approved: false,
                                paymentStatus: 'pending',
                                paymentAmount: 100
                              };

                              setRegisteredStudentsList(prev => {
                                const nextList = [...prev, lastChild];
                                setPendingPaymentStudentIndex(nextList.length - 1);
                                return nextList;
                              });

                              setPaymentState('checkout');
                              setActiveScreen('Payment');
                            }}
                            className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <span>Complete & Submit Registration</span>
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* REGISTER ANOTHER STUDENT QUESTION */}
                {/* 3. LOGIN SCREEN (Requirement 8) */}
                {activeScreen === 'Login' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="p-6 space-y-6"
                  >
                    <div className="space-y-2 text-center">
                      <span className="text-[9px] font-bold text-[#163E2B] tracking-widest uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100/60 block w-max mx-auto">SECURE PORTAL</span>
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                        {loginUserType === 'student' ? 'Student Classroom' : 'Teacher Board'}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                        {loginUserType === 'student' 
                          ? "Access your Pathshala lessons, daily niyams, and academic quizzes."
                          : "Manage classes, audit gatha recitations, and check student scores."}
                      </p>
                    </div>

                    {/* Requirement: Continue as Student OR Continue as Teacher Switcher */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                      <button
                        onClick={() => {
                          setLoginUserType('student');
                          setIsOtpSent(false);
                          setOtpCode('');
                        }}
                        className={`py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          loginUserType === 'student'
                            ? 'bg-[#163E2B] text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                        }`}
                      >
                        Continue as Student
                      </button>
                      <button
                        onClick={() => {
                          setLoginUserType('teacher');
                        }}
                        className={`py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          loginUserType === 'teacher'
                            ? 'bg-[#163E2B] text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                        }`}
                      >
                        Continue as Teacher
                      </button>
                    </div>

                    {/* ---------------- STUDENT FLOW ---------------- */}
                    {loginUserType === 'student' ? (
                      <div className="space-y-4">
                        {/* Mobile phone input */}
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Parents' Mobile Number</label>
                            {isOtpSent && (
                              <button 
                                onClick={() => {
                                  setIsOtpSent(false);
                                  setOtpCode('');
                                }} 
                                className="text-[10px] text-[#163E2B] font-bold hover:underline cursor-pointer"
                              >
                                Change Number
                              </button>
                            )}
                          </div>
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">+91</span>
                            <input 
                              type="tel" 
                              disabled={isOtpSent}
                              value={loginPhone}
                              onChange={(e) => setLoginPhone(e.target.value)}
                              placeholder="98765 43210" 
                              className={`w-full bg-white border rounded-full pl-14 pr-5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs placeholder:text-slate-400 ${isOtpSent ? 'opacity-60 bg-slate-50 border-slate-200/50' : 'border-slate-200'}`}
                            />
                          </div>
                        </div>

                        {/* OTP field */}
                        {isOtpSent && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Enter 4-Digit OTP Code</label>
                              <span className="text-[10px] font-bold text-[#163E2B]">CODE: 1234 (Simulator)</span>
                            </div>
                            <input 
                              type="text" 
                              maxLength={4}
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              placeholder="• • • •" 
                              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-center text-sm font-bold tracking-[1em] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs text-slate-850"
                            />
                            
                            <div className="flex justify-between items-center text-[10px] font-semibold pt-1">
                              <span className="text-slate-400">Didn't receive OTP?</span>
                              {otpTimer > 0 ? (
                                <span className="text-[#163E2B] font-bold">Resend in {otpTimer}s</span>
                              ) : (
                                <button 
                                  onClick={() => {
                                    setOtpTimer(60);
                                    alert("New 4-digit verification code successfully sent to +91 " + loginPhone);
                                  }}
                                  className="text-[#163E2B] font-bold underline hover:text-[#0F2D1F] cursor-pointer"
                                >
                                  Resend OTP
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between items-center pt-1.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <input type="checkbox" id="terms" defaultChecked className="rounded border-slate-200 text-[#163E2B] focus:ring-emerald-500" />
                            <label htmlFor="terms" className="font-medium cursor-pointer">Agree to terms</label>
                          </div>
                          
                          {/* Student Forgot Password/ID */}
                          <button
                            onClick={() => {
                              setForgotPasswordUserType('student');
                              setForgotPasswordSent(false);
                              setForgotPasswordEmail('');
                              setForgotPasswordPhone(loginPhone);
                              setActiveScreen('ForgotPassword');
                            }}
                            className="text-xs text-[#163E2B] font-bold hover:underline"
                          >
                            Forgot ID / Recovery?
                          </button>
                        </div>

                        {/* Sibling Multi-account Selector */}
                        {isOtpSent && otpCode === '1234' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-50/60 border border-emerald-100 rounded-[20px] p-4 space-y-2.5"
                          >
                            <div className="space-y-0.5 text-center">
                              <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest">MULTIPLE ACCOUNTS FOUND</span>
                              <h4 className="text-xs font-bold text-slate-800">Select Student Profile</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {registeredStudentsList.map((stud, idx) => {
                                const isChosen = selectedStudentIndexForLogin === idx;
                                const isPendingFee = stud.paymentStatus === 'pending';
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => setSelectedStudentIndexForLogin(idx)}
                                    className={`p-2.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                                      isChosen 
                                        ? 'bg-white border-[#163E2B] shadow-xs ring-2 ring-emerald-600/10' 
                                        : 'bg-white/60 border-slate-200/60 opacity-80 hover:opacity-100'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <InitialBadge name={`${stud.firstName} ${stud.surname}`} className="w-7 h-7 text-[10px]" />
                                      <div className="min-w-0 flex-1">
                                        <span className="font-bold text-xs text-slate-800 block truncate">{stud.firstName}</span>
                                        <span className="text-[9px] font-semibold text-[#163E2B]/80 block truncate">{stud.level.split(':')[0]}</span>
                                        {isPendingFee && (
                                          <span className="text-[8px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200 block mt-0.5 w-max">
                                            Fee Pending (₹100)
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {isChosen && (
                                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#163E2B] text-white text-[8px] rounded-full flex items-center justify-center font-bold">✓</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        <div className="space-y-3 pt-2">
                          <button 
                            onClick={() => {
                              if (!loginPhone || loginPhone.length < 8) {
                                alert("Please enter a valid parents' mobile number.");
                                return;
                              }
                              
                              if (!isOtpSent) {
                                setIsOtpSent(true);
                                setOtpTimer(60);
                              } else {
                                if (otpCode !== '1234') {
                                  alert("Please enter correct OTP (1234 for testing simulator).");
                                  return;
                                }

                                const selectedStudentObj = registeredStudentsList[selectedStudentIndexForLogin];
                                if (selectedStudentObj) {
                                  if (selectedStudentObj.paymentStatus === 'pending') {
                                    setPendingPaymentStudentIndex(selectedStudentIndexForLogin);
                                    setPaymentState('checkout');
                                    setActiveScreen('Payment');
                                    return;
                                  }

                                  setStudent({
                                    name: `${selectedStudentObj.firstName} ${selectedStudentObj.surname}`,
                                    level: selectedStudentObj.level,
                                    batch: selectedStudentObj.batch || "Saturdays, 05:30 PM",
                                    attendanceScore: 200,
                                    gathaScore: 250,
                                    bonusPoints: 0,
                                    attendance: 91,
                                    gathasCount: 36,
                                    rank: "Top 5%",
                                    badge: "Star Reciter",
                                    profileImage: selectedStudentObj.photo
                                  });
                                  setClassroomTimeElapsed(0);
                                  setIsAttendanceMarked(false);
                                }

                                localStorage.setItem('shalaSession', 'active');
                                if (localStorage.getItem('hasSelectedLanguage') === 'true') {
                                  setActiveScreen('Home');
                                } else {
                                  setPendingUserType('student');
                                  setActiveScreen('Language');
                                }
                              }
                            }}
                            className="w-full py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-sm rounded-xl shadow-md shadow-[#163E2B]/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                          >
                            <span>{isOtpSent ? 'Verify OTP & Enter' : 'Send Verification OTP'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button 
                            onClick={() => {
                              setStudent(s => ({ ...s, name: "Aarav Shah" }));
                              localStorage.setItem('shalaSession', 'active');
                              if (localStorage.getItem('hasSelectedLanguage') === 'true') {
                                setActiveScreen('Home');
                              } else {
                                setPendingUserType('student');
                                setActiveScreen('Language');
                              }
                            }}
                            className="w-full py-2.5 bg-white border border-slate-200/80 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>Sign in as Guest Student</span>
                          </button>

                          <div className="text-center pt-1">
                            <span className="text-xs text-slate-400">First time registering? </span>
                            <button 
                              onClick={() => {
                                setRegistrationStep(1);
                                setActiveScreen('Register');
                              }} 
                              className="text-xs text-[#163E2B] font-bold hover:underline cursor-pointer"
                            >
                              Register student account
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // ---------------- TEACHER FLOW ----------------
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Teacher Email Address</label>
                          <input 
                            type="email"
                            value={teacherLoginEmail}
                            onChange={(e) => setTeacherLoginEmail(e.target.value)}
                            placeholder="teacher@example.com" 
                            className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs placeholder:text-slate-400"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Secret Password</label>
                            
                            {/* Teacher Forgot Password */}
                            <button
                              onClick={() => {
                                setForgotPasswordUserType('teacher');
                                setForgotPasswordSent(false);
                                setForgotPasswordEmail(teacherLoginEmail);
                                setActiveScreen('ForgotPassword');
                              }}
                              className="text-xs text-[#163E2B] font-bold hover:underline"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <input 
                            type="password"
                            value={teacherLoginPassword}
                            onChange={(e) => setTeacherLoginPassword(e.target.value)}
                            placeholder="••••••••" 
                            className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs placeholder:text-slate-400"
                          />
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] text-slate-500 space-y-1.5">
                          <span className="font-bold text-slate-700 uppercase tracking-wider block">Simulator Admin Account</span>
                          <p className="font-medium text-slate-500">Testing Credentials:</p>
                          <div className="bg-white/60 p-2 rounded-lg space-y-1 border border-slate-100 font-mono text-[10px] text-slate-600 font-bold">
                            <p>Email: teacher@example.com</p>
                            <p>Password: password123</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button 
                            onClick={() => {
                              // Auto login - find matching email or fallback to the first teacher in the registry
                              const matched = teachersList.find(
                                t => t.email.toLowerCase() === teacherLoginEmail.toLowerCase()
                              ) || teachersList[0];

                              setCurrentLoggedInTeacher(matched);
                              localStorage.setItem('shalaSession', 'teacher');
                              alert(`Jai Jinendra, ${matched.name}! Entering teacher board.`);
                              if (localStorage.getItem('hasSelectedLanguage') === 'true') {
                                setActiveScreen('TeacherDashboard');
                              } else {
                                setPendingUserType('teacher');
                                setActiveScreen('Language');
                              }
                            }}
                            className="w-full py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-sm rounded-xl shadow-md shadow-[#163E2B]/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                          >
                            <span>Verify Credentials & Enter Board</span>
                            <ChevronRight className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3b. REGISTRATION FEE PAYMENT SCREEN (MINIMAL & SIMPLE) */}
                {activeScreen === 'Payment' && (() => {
                  const targetStudent = (pendingPaymentStudentIndex !== null && registeredStudentsList[pendingPaymentStudentIndex])
                    ? registeredStudentsList[pendingPaymentStudentIndex]
                    : {
                        firstName: regFirstName || "Student",
                        surname: regSurname || "Profile",
                        level: regLevel || "Level 1: Basic Sutras & Stories",
                        batch: regBatch || "Saturdays, 05:30 PM",
                        parentMobile: regParentMobile || regMobile || "9876543210",
                        photo: regPhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      };

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="p-5 space-y-5"
                    >
                      {/* PAYMENT SUCCESS STATE */}
                      {paymentState === 'success' ? (
                        <div className="py-8 space-y-6 text-center">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-emerald-100 text-[#163E2B] rounded-full flex items-center justify-center mx-auto shadow-inner"
                          >
                            <CheckCircle2 className="w-10 h-10" />
                          </motion.div>

                          <div className="space-y-2">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                              ✓ Registration Successful
                            </h3>
                            <p className="text-sm font-bold text-[#163E2B]">
                              Payment Completed Successfully.
                            </p>
                            <p className="text-xs text-slate-500 font-medium pt-1">
                              Welcome to Gyan Vatika Pathshala.
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              // Activate student profile in registeredStudentsList
                              if (pendingPaymentStudentIndex !== null) {
                                setRegisteredStudentsList(prev => prev.map((s, idx) => {
                                  if (idx === pendingPaymentStudentIndex) {
                                    return {
                                      ...s,
                                      paymentStatus: 'completed',
                                      approved: true,
                                      paymentTxnId: paymentTxnId || `TXN_${Date.now()}`
                                    };
                                  }
                                  return s;
                                }));
                              }

                              // Set current active student profile
                              setStudent({
                                name: `${targetStudent.firstName} ${targetStudent.surname}`,
                                level: targetStudent.level,
                                batch: targetStudent.batch || "Saturdays, 05:30 PM",
                                attendanceScore: 200,
                                gathaScore: 250,
                                bonusPoints: 0,
                                attendance: 91,
                                gathasCount: 36,
                                rank: "Top 5%",
                                badge: "Star Reciter",
                                profileImage: targetStudent.photo,
                                quizHistory: []
                              });
                              setIsGurujiApproved(true);
                              localStorage.setItem('shalaSession', 'active');

                              // Automatically navigate to Home screen
                              if (localStorage.getItem('hasSelectedLanguage') === 'true') {
                                setActiveScreen('Home');
                              } else {
                                setPendingUserType('student');
                                setActiveScreen('Language');
                              }
                            }}
                            className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                          >
                            <span>Continue</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : paymentState === 'failed' ? (
                        /* PAYMENT FAILURE STATE */
                        <div className="py-8 space-y-6 text-center">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner"
                          >
                            <XCircle className="w-10 h-10" />
                          </motion.div>

                          <div className="space-y-1.5">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                              Payment Failed
                            </h3>
                            <p className="text-xs text-slate-500 max-w-[260px] mx-auto pt-1 leading-relaxed">
                              Your ₹100 registration payment could not be processed.
                            </p>
                          </div>

                          <div className="space-y-2.5 pt-2">
                            <button
                              onClick={() => {
                                setPaymentState('checkout');
                              }}
                              className="w-full py-3.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Retry</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveScreen('Register');
                              }}
                              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full cursor-pointer transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : paymentState === 'processing' ? (
                        /* PAYMENT PROCESSING STATE */
                        <div className="py-12 space-y-6 text-center">
                          <div className="w-14 h-14 border-4 border-emerald-100 border-t-[#163E2B] rounded-full animate-spin mx-auto" />
                          <div className="space-y-1.5">
                            <h3 className="text-base font-bold text-slate-800">Processing Payment...</h3>
                            <p className="text-xs text-slate-500 font-medium">Please wait a moment</p>
                          </div>
                        </div>
                      ) : (
                        /* MINIMAL PAYMENT SCREEN (DEFAULT) */
                        <div className="space-y-6 py-2">
                          {/* Header / Back */}
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <button 
                              onClick={() => setActiveScreen('Register')}
                              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>
                            <span className="text-xs font-bold text-slate-800">Registration Fee</span>
                            <span className="w-10"></span>
                          </div>

                          {/* Minimal Student & Fee Box */}
                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student Name</span>
                                <h3 className="text-base font-extrabold text-slate-900">
                                  {targetStudent.firstName} {targetStudent.surname}
                                </h3>
                              </div>
                            </div>

                            <div className="border-t border-slate-200/60 pt-2.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pathshala Level</span>
                              <p className="text-xs font-semibold text-slate-700">
                                {targetStudent.level}
                              </p>
                            </div>

                            <div className="border-t border-slate-200/60 pt-2.5 flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-600">Registration Fee</span>
                              <span className="text-2xl font-black text-[#163E2B]">₹100</span>
                            </div>
                          </div>

                          {/* Minimal Payment Method Options (UPI, QR Code, Card) */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 block">Payment Method</label>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod('upi')}
                                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  selectedPaymentMethod === 'upi'
                                    ? 'bg-[#163E2B] border-[#163E2B] text-white font-bold shadow-xs'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold'
                                }`}
                              >
                                <Smartphone className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-xs block">UPI</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod('qr')}
                                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  selectedPaymentMethod === 'qr'
                                    ? 'bg-[#163E2B] border-[#163E2B] text-white font-bold shadow-xs'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold'
                                }`}
                              >
                                <QrCode className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-xs block">QR Code</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod('card')}
                                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  selectedPaymentMethod === 'card'
                                    ? 'bg-[#163E2B] border-[#163E2B] text-white font-bold shadow-xs'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold'
                                }`}
                              >
                                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-xs block">Card</span>
                              </button>
                            </div>

                            {/* Demo payment input feedback */}
                            {selectedPaymentMethod === 'qr' && (
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center space-y-1.5 mt-2">
                                <QrCode className="w-16 h-16 text-[#163E2B] mx-auto" />
                                <p className="text-[10px] font-bold text-slate-500">Scan QR Code using any UPI App</p>
                              </div>
                            )}

                            {selectedPaymentMethod === 'upi' && (
                              <div className="mt-2">
                                <input 
                                  type="text" 
                                  defaultValue="parent@upi"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
                                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                                />
                              </div>
                            )}
                          </div>

                          {/* Primary Action Button */}
                          <div className="space-y-2 pt-3">
                            <button
                              onClick={() => {
                                setPaymentState('processing');
                                setTimeout(() => {
                                  const generatedTxn = `TXN_${Math.floor(10000000 + Math.random() * 90000000)}`;
                                  setPaymentTxnId(generatedTxn);
                                  setPaymentState('success');
                                }, 800);
                              }}
                              className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                            >
                              <span>Pay ₹100</span>
                            </button>

                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => setPaymentState('failed')}
                                className="text-[10px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                              >
                                Test Payment Failure
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}

                {/* 5b. SYLLABUS ROADMAP SCREEN */}
                {activeScreen === 'Syllabus' && (() => {
                  const getSyllabusKey = (studentLevel: string): string => {
                    const lvl = studentLevel ? studentLevel.toLowerCase() : '';
                    if (lvl.includes('level 1') || lvl.includes('bal shala')) {
                      return "Level 1: Basic Sutras & Stories";
                    }
                    if (lvl.includes('level 2') || lvl.includes('kumar shala')) {
                      return "Level 2: Jain Geography & Symbols";
                    }
                    return "Level 3: Pratikraman & Advanced Vows";
                  };

                  const activeSyllabusKey = getSyllabusKey(student.level);
                  const activeSyllabus = syllabusDataState[activeSyllabusKey] || syllabusDataState["Level 3: Pratikraman & Advanced Vows"];

                  // Calculate stats
                  let totalTopics = 0;
                  let completedTopics = 0;
                  let pendingTopics = 0;
                  let reworkTopics = 0;
                  let notStartedTopics = 0;
                  let notApprovedTopics = 0;

                  activeSyllabus.chapters.forEach(ch => {
                    ch.topics.forEach(t => {
                      totalTopics++;
                      if (t.status === 'Approved') completedTopics++;
                      else if (t.status === 'Pending Teacher Review' || t.status === 'Pending Review') pendingTopics++;
                      else if (t.status === 'Rework Required') reworkTopics++;
                      else if (t.status === 'Not Approved' || t.status === 'Rejected') notApprovedTopics++;
                      else notStartedTopics++;
                    });
                  });

                  const remainingTopics = totalTopics - completedTopics;
                  const progressPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[#FAF8F5] min-h-full p-5 sm:p-6 space-y-6 max-h-full overflow-y-auto no-scrollbar pb-24 text-slate-800"
                    >
                      {/* Academic Heading */}
                      <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigateBack()}
                            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all active:scale-95"
                          >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                          </button>
                          <div>
                            <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-wider block">Academic Roadmap</span>
                            <h3 className="text-lg font-black text-slate-800 leading-tight">My Syllabus</h3>
                          </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 text-[#163E2B] px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          <span>{activeSyllabus.levelId || "Level 3"}</span>
                        </div>
                      </div>

                      {/* Overall Progress Section Card */}
                      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
                        {completedTopics === totalTopics && totalTopics > 0 && (
                          <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl space-y-1">
                            <h5 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                              🎉 Congratulations!
                            </h5>
                            <p className="text-[11px] text-emerald-700 leading-relaxed">
                              You have completed the {activeSyllabus.levelName} syllabus. Please complete your revision with your Teacher before promotion.
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CURRENTLY ENROLLED</span>
                            <h4 className="text-base font-bold text-slate-850 mt-1">{activeSyllabus.levelName}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                              completedTopics === totalTopics 
                                ? (student.promotionStatus === 'Awaiting Promotion' ? 'bg-amber-50 text-amber-800 border border-amber-100' : student.promotionStatus === 'Promoted' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-emerald-50 text-[#0F2D1F] border border-emerald-100') 
                                : 'bg-slate-50 text-slate-600 border border-slate-100'
                            }`}>
                              {completedTopics === totalTopics ? (student.promotionStatus === 'Awaiting Promotion' || student.promotionStatus === 'Promoted' ? student.promotionStatus : 'Revision Pending') : 'Learning'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Completed Levels */}
                        {student.completedLevels && student.completedLevels.length > 0 && (
                          <div className="pt-3.5 border-t border-slate-100/60">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">COMPLETED LEVELS</span>
                            <div className="flex flex-wrap gap-2">
                              {student.completedLevels.map((lvl, idx) => (
                                <span key={idx} className="bg-emerald-50/70 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>{lvl}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Progress Bar */}
                        <div className="space-y-3 pt-3.5 border-t border-slate-100/60">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-500">Syllabus Progress</span>
                            <span className="font-bold text-[#163E2B]">{completedTopics} of {totalTopics} Gathas Completed</span>
                          </div>
                          
                          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-[#163E2B] rounded-full transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span className="font-medium">Curriculum Completion</span>
                            <span className="font-bold font-mono">{progressPct}% Complete</span>
                          </div>
                        </div>

                        {/* Stats mini grid */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100/60">
                          <div className="bg-slate-50/50 rounded-xl p-3 text-center border border-slate-100">
                            <span className="text-lg font-black text-[#163E2B] block font-mono">
                              {activeSyllabus.chapters.filter(ch => ch.topics.length > 0 && ch.topics.every(t => t.status === 'Approved')).length}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">Chapters Done</span>
                          </div>
                          <div className="bg-slate-50/50 rounded-xl p-3 text-center border border-slate-100">
                            <span className="text-lg font-black text-[#163E2B] block font-mono">
                              {completedTopics}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">Gathas Approved</span>
                          </div>
                          <div className="bg-slate-50/50 rounded-xl p-3 text-center border border-slate-100">
                            <span className="text-lg font-black text-[#163E2B] block font-mono">
                              {remainingTopics}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">Remaining</span>
                          </div>
                        </div>
                      </div>

                      {/* Chapters list section */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            CURRICULUM CHAPTERS ({activeSyllabus.chapters.length})
                          </h4>
                          <span className="text-[10px] font-bold text-[#163E2B]">Tap to expand</span>
                        </div>

                        <div className="space-y-3.5">
                          {activeSyllabus.chapters.map((chapter) => {
                            const isExpanded = !!expandedChapters[chapter.id];
                            const chapterTotal = chapter.topics.length;
                            const chapterCompleted = chapter.topics.filter(t => t.status === 'Approved').length;

                            return (
                              <div key={chapter.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
                                {/* Chapter Header Tab */}
                                <button
                                  onClick={() => {
                                    setExpandedChapters(prev => ({
                                      ...prev,
                                      [chapter.id]: !prev[chapter.id]
                                    }));
                                  }}
                                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/30 transition-colors cursor-pointer"
                                >
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-800 leading-tight">
                                      {chapter.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">
                                        {chapterTotal} {chapterTotal === 1 ? 'Topic' : 'Topics'}
                                      </span>
                                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                                      <span className="px-2 py-0.5 bg-slate-50 rounded-md text-slate-500 text-[10px] font-medium border border-slate-100">
                                        {chapterCompleted} / {chapterTotal} Approved
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {/* Progress badge circle indicator */}
                                    <div className="w-8 h-8 rounded-full border border-emerald-100 bg-emerald-50/20 flex items-center justify-center text-[10px] font-bold text-[#163E2B]">
                                      {chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0}%
                                    </div>
                                    <ChevronLeft className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? '-rotate-90' : 'rotate-0'}`} />
                                  </div>
                                </button>

                                {/* Chapter Topics List */}
                                {isExpanded && (
                                  <div className="border-t border-slate-100 bg-[#FDFBF7]/30 p-5 space-y-4">
                                    {chapter.topics.map((topic) => {
                                      // Determine badge styling based on status
                                      let statusBg = "";
                                      let statusText = "";
                                      let statusDot = "";
                                      const isApproved = topic.status === 'Approved';
                                      const isPending = topic.status === 'Pending Teacher Review' || topic.status === 'Pending Review';
                                      const isRework = topic.status === 'Rework Required';
                                      const isRejected = topic.status === 'Rejected' || topic.status === 'Not Approved';
                                      const canSubmit = !isApproved && !isPending;
                                      
                                      switch (topic.status) {
                                        case 'Approved':
                                          statusBg = "bg-emerald-50 text-emerald-700 border-emerald-100/80";
                                          statusText = "Approved";
                                          statusDot = "●";
                                          break;
                                        case 'Pending Teacher Review':
                                        case 'Pending Review':
                                          statusBg = "bg-amber-50 text-amber-700 border-amber-100/80";
                                          statusText = "Pending Review";
                                          statusDot = "●";
                                          break;
                                        case 'Rework Required':
                                          statusBg = "bg-orange-50 text-orange-700 border-orange-100/80";
                                          statusText = "Rework Required";
                                          statusDot = "●";
                                          break;
                                        case 'Not Approved':
                                        case 'Rejected':
                                          statusBg = "bg-emerald-50 text-[#163E2B] border-emerald-100/80";
                                          statusText = "Rejected";
                                          statusDot = "●";
                                          break;
                                        default:
                                          statusBg = "bg-slate-50 text-slate-500 border-slate-100";
                                          statusText = "Not Started";
                                          statusDot = "○";
                                          break;
                                      }

                                      // Submit handler
                                      const triggerSubmit = () => {
                                        if (!canSubmit) return;
                                        setSyllabusDataState(prev => {
                                          const updated = { ...prev };
                                          const activeKey = getSyllabusKey(student.level);
                                          const syllabus = updated[activeKey];
                                          if (syllabus) {
                                            const ch = syllabus.chapters.find(c => c.id === chapter.id);
                                            if (ch) {
                                              const t = ch.topics.find(top => top.id === topic.id);
                                              if (t) {
                                                t.status = 'Pending Teacher Review';
                                                t.dateAssigned = new Date().toISOString().split('T')[0];
                                              }
                                            }
                                          }
                                          return updated;
                                        });
                                        alert(`"${topic.name}" submitted to ${topic.assignedBy} for review!`);
                                      };

                                      return (
                                        <div 
                                          key={topic.id} 
                                          className={`bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:border-slate-200 transition-all space-y-4 ${
                                            canSubmit ? 'hover:shadow-sm' : ''
                                          }`}
                                        >
                                          <div className="flex justify-between items-start gap-4">
                                            <div className="flex items-start gap-3.5">
                                              {/* Checkbox Action */}
                                              <button
                                                onClick={triggerSubmit}
                                                disabled={!canSubmit}
                                                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                                                  isApproved 
                                                    ? 'bg-emerald-600 border-emerald-600 text-white cursor-not-allowed shadow-xs'
                                                    : isPending
                                                    ? 'bg-amber-100 border-amber-400 text-amber-600 cursor-not-allowed shadow-xs'
                                                    : 'border-slate-200 hover:border-[#163E2B] hover:bg-emerald-50/50 text-[#0F2D1F] cursor-pointer active:scale-95 shadow-xs'
                                                }`}
                                                title={
                                                  isApproved
                                                    ? 'Approved Gatha'
                                                    : isPending
                                                    ? 'Pending Review'
                                                    : 'Tick to submit Gatha for Teacher Review'
                                                }
                                              >
                                                {isApproved ? (
                                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                ) : isPending ? (
                                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                                ) : (
                                                  <span className="text-[10px] text-[#163E2B] font-bold opacity-0 hover:opacity-100">✓</span>
                                                )}
                                              </button>

                                              <div className="space-y-1">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">GATHA TOPIC</span>
                                                <h5 className="text-sm font-bold text-slate-850 leading-snug">
                                                  {topic.name}
                                                </h5>
                                                {canSubmit && (
                                                  <button 
                                                    onClick={triggerSubmit}
                                                    className="text-[10px] font-bold text-[#163E2B] bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg mt-1.5 block cursor-pointer transition-colors border border-emerald-100/50"
                                                  >
                                                    {isRework || isRejected ? '🔁 Tap to re-submit' : '✓ Tap to submit'}
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                            
                                            {/* Status Badge */}
                                            <span className={`px-2.5 py-1 border rounded-full text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shrink-0 ${statusBg}`}>
                                              <span className="text-[6px] leading-none">{statusDot}</span>
                                              <span>{statusText}</span>
                                            </span>
                                          </div>

                                          {/* Details Grid */}
                                          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100/60 text-xs">
                                            <div>
                                              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Assigned By</span>
                                              <span className="font-semibold text-slate-700">{topic.assignedBy}</span>
                                            </div>
                                            <div>
                                              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Date Assigned</span>
                                              <span className="font-semibold text-slate-700">{topic.dateAssigned}</span>
                                            </div>
                                          </div>

                                          {/* Teacher Remarks Block */}
                                          {topic.teacherRemarks && (
                                            <div className="bg-[#FAF5F6] border border-emerald-100/50 rounded-xl p-4 text-xs space-y-2 mt-2">
                                              <div className="flex items-center gap-2 text-[9px] font-bold text-[#163E2B] uppercase tracking-wider">
                                                <MessageSquare className="w-3.5 h-3.5 text-[#163E2B]" />
                                                <span>Teacher Remarks & feedback</span>
                                              </div>
                                              <p className="text-slate-700 font-medium italic leading-relaxed">
                                                "{topic.teacherRemarks}"
                                              </p>
                                              {topic.reviewDate && (
                                                <div className="text-[9px] text-slate-400 font-medium pt-1">
                                                  Reviewed on {topic.reviewDate}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Locked Levels */}
                      <div className="space-y-4 pt-2">
                        {(() => {
                          const lvl = student.level ? student.level.toLowerCase() : '';
                          const showLevel2Lock = lvl.includes('level 1') || lvl.includes('bal shala');
                          const showLevel3Lock = showLevel2Lock || lvl.includes('level 2') || lvl.includes('kumar shala');
                          
                          return (
                            <>
                              {showLevel2Lock && (
                                <div className="bg-white border border-slate-100/80 rounded-2xl p-5 flex items-center justify-center text-center opacity-70 shadow-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-sm">
                                      <Lock className="w-4 h-4 text-slate-400" />
                                      <span>Level 2: Jain Geography & Symbols</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Available after curriculum promotion.</p>
                                  </div>
                                </div>
                              )}
                              {showLevel3Lock && (
                                <div className="bg-white border border-slate-100/80 rounded-2xl p-5 flex items-center justify-center text-center opacity-70 shadow-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-sm">
                                      <Lock className="w-4 h-4 text-slate-400" />
                                      <span>Level 3: Pratikraman & Advanced Vows</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Available after curriculum promotion.</p>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      {/* Promotion Info Message */}
                      <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-4 text-center mt-4">
                        <p className="text-xs text-[#163E2B] font-semibold leading-relaxed">
                          Promotion is granted after successful syllabus completion, revision, and teacher approval.
                        </p>
                      </div>

                    </motion.div>
                  );
                })()}
                
                {/* 24 & 25. TEACHER LIVE CLASSES & DETAILS */}
                {['TeacherStudents', 'TeacherStudentProfile'].includes(activeScreen) && (
                  <TeacherStudentsFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                {['TeacherGathaApprovals', 'TeacherGathaSubmissionDetails'].includes(activeScreen) && (
                  <TeacherGathaApprovalFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                {['TeacherAttendance', 'TeacherAttendanceDetails'].includes(activeScreen) && (
                  <TeacherAttendanceFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                {['TeacherReports', 'TeacherReportsDetails'].includes(activeScreen) && (
                  <TeacherReportsFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                {['TeacherLiveClasses', 'TeacherLiveClassDetails'].includes(activeScreen) && (
                  <TeacherLiveClassesFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    teacherSelectedLiveClass={teacherSelectedLiveClass}
                    setTeacherSelectedLiveClass={setTeacherSelectedLiveClass}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                  />
                )}
                
                
                {/* TEACHER PROFILE FLOW */}
                {activeScreen === 'TeacherProfile' && (
                  <TeacherProfileFlow 
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    currentLoggedInTeacher={currentLoggedInTeacher}
                    setCurrentLoggedInTeacher={setCurrentLoggedInTeacher}
                  />
                )}

                {/* 4. HOME DASHBOARD (Integrated tab 1) */}
                {activeScreen === 'Home' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 space-y-5"
                  >
                    {activeBonusEvent && (
                      <div 
                        onClick={() => setActiveScreen('BonusEvent')}
                        className="bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-300 rounded-[24px] p-4 flex items-center justify-between shadow-sm cursor-pointer active:scale-97 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700">
                            <Star className="w-5 h-5 fill-indigo-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-indigo-900 group-hover:text-indigo-700 transition-colors">{activeBonusEvent.title}</h4>
                            <p className="text-[10px] font-semibold text-indigo-500">Tap to view & submit bonus activities</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    )}

                    {/* Greeting & Quick Stats */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">WELCOME,</span>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">{student.name}</h2>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => setActiveScreen('Search')}
                          className="w-10 h-10 bg-white border border-slate-100/50 hover:bg-slate-50 rounded-full flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
                        >
                          <Search className="w-4.5 h-4.5 text-slate-600" />
                        </button>
                        <button 
                          onClick={() => setActiveScreen('Notifications')}
                          className="w-10 h-10 bg-white border border-slate-100/50 hover:bg-slate-50 rounded-full flex items-center justify-center relative shadow-xs active:scale-95 transition-all cursor-pointer"
                        >
                          <Bell className="w-4.5 h-4.5 text-slate-600" />
                          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-600 rounded-full border border-white animate-pulse" />
                        </button>
                        <button 
                          onClick={() => setActiveScreen('Profile')}
                          className="w-10 h-10 rounded-full border border-slate-100/50 shadow-xs overflow-hidden active:scale-95 transition-all cursor-pointer"
                        >
                          <InitialBadge name={student.name} className="w-10 h-10 text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 text-slate-800 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Academic Profile</span>
                          <h3 className="text-base font-bold text-slate-900 mt-1">{student.level}</h3>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[11px] font-medium text-slate-600">{student.points} Points</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mb-4">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-medium uppercase tracking-wider mb-0.5">Pathshala Attendance</span>
                          <span className="text-lg font-semibold text-slate-900">{student.attendance}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block font-medium uppercase tracking-wider mb-0.5">Sutra Recital Standing</span>
                          <span className="text-lg font-semibold text-slate-900">{student.gathasCount} / {student.totalGathas} Gathas</span>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider">
                          <span className="text-slate-500">Academic Standing</span>
                          <span className="text-[#163E2B] font-bold tracking-normal normal-case">{student.progressStatus}</span>
                        </div>
                        <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-[#163E2B] rounded-full transition-all duration-300" 
                            style={{ width: `${(student.gathasCount / student.totalGathas) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Highly Professional Syllabus Roadmap Banner */}
                    <div 
                      onClick={() => setActiveScreen('Syllabus')}
                      className="bg-white border border-slate-200/80 hover:border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                          <BookMarked className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[8.5px] font-bold text-[#163E2B] uppercase tracking-widest font-mono block">Learning roadmap</span>
                          <h4 className="text-xs font-black text-[#0f172a] group-hover:text-[#163E2B] transition-colors">My Syllabus Roadmap</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Chapters, Gathas, & Teacher review status</p>
                        </div>
                      </div>
                      <button className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all shrink-0">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#163E2B]" />
                      </button>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">Quick Access</h4>
                        <span className="text-[11px] text-[#163E2B] font-medium">5 Quick Tools</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Live Class */}
                        <div 
                          onClick={() => setActiveScreen('LiveClassList')}
                          className="bg-white border border-[#E5E0D8]/80 hover:border-[#D1C9BC] rounded-[20px] p-4 flex flex-col items-start text-left h-[145px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-97 group w-full"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center mb-3.5 shrink-0">
                            <Video className="w-[18px] h-[18px]" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#163E2B] transition-colors leading-tight whitespace-normal break-words w-full">
                            Live Class
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed w-full">
                            Interact with Pujya Samanji
                          </p>
                        </div>

                        {/* Sutra Path */}
                        <div 
                          onClick={() => setActiveScreen('SutraList')}
                          className="bg-white border border-[#E5E0D8]/80 hover:border-[#D1C9BC] rounded-[20px] p-4 flex flex-col items-start text-left h-[145px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-97 group w-full"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center mb-3.5 shrink-0">
                            <BookOpenCheck className="w-[18px] h-[18px]" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#163E2B] transition-colors leading-tight whitespace-normal break-words w-full">
                            Sutra
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed w-full">
                            Pronunciation training
                          </p>
                        </div>

                        {/* Devotional Prayers */}
                        <div 
                          onClick={() => setActiveScreen('StavanList')}
                          className="bg-white border border-[#E5E0D8]/80 hover:border-[#D1C9BC] rounded-[20px] p-4 flex flex-col items-start text-left h-[145px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-97 group w-full"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center mb-3.5 shrink-0">
                            <Volume2 className="w-[18px] h-[18px]" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#163E2B] transition-colors leading-tight whitespace-normal break-words w-full">
                            Stavan & Stuti
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed w-full">
                            Sanskrit stotras audio
                          </p>
                        </div>

                        {/* Trivia & Games */}
                        <div 
                          onClick={() => setActiveScreen('GamesHome')}
                          className="bg-white border border-[#E5E0D8]/80 hover:border-[#D1C9BC] rounded-[20px] p-4 flex flex-col items-start text-left h-[145px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-97 group w-full"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center mb-3.5 shrink-0">
                            <Gamepad2 className="w-[18px] h-[18px]" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#163E2B] transition-colors leading-tight whitespace-normal break-words w-full">
                            Games
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed w-full">
                            Cosmos puzzle & quiz
                          </p>
                        </div>

                        {/* Academic Progress */}
                        <div 
                          onClick={() => setActiveScreen('Profile')}
                          className="bg-white border border-[#E5E0D8]/80 hover:border-[#D1C9BC] rounded-[20px] p-4 flex flex-col items-start text-left h-[145px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-97 group w-full"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center mb-3.5 shrink-0">
                            <User className="w-[18px] h-[18px]" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#163E2B] transition-colors leading-tight whitespace-normal break-words w-full">
                            Academic Progress
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed w-full">
                            View your Profile
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Today's Motivation - Elegant Quote Block */}
 
                    <div className="bg-cream-200/40 border border-cream-300 rounded-[22px] p-4 text-center relative">
                      <p className="font-serif italic text-xs text-[#0f172a] leading-relaxed">
                        "{jainQuotes[currentQuoteIndex].text}"
                      </p>
                      <span className="text-[9px] font-black text-[#163E2B] font-mono block mt-1.5 uppercase">
                        — {jainQuotes[currentQuoteIndex].author}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 5. LIVE CLASS LIST */}
                {activeScreen === 'LiveClassList' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-6 space-y-6 max-w-2xl mx-auto bg-slate-50 min-h-screen"
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigateBack()} 
                        className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shadow-sm cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-700" />
                      </button>
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ONLINE PATHSHALA</span>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">Live Classes</h3>
                      </div>
                    </div>

                    {/* Student Info Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <InitialBadge name={student.name} className="w-8 h-8 text-xs bg-slate-100 text-slate-700 font-semibold" />
                        <div className="text-left">
                          <span className="font-semibold text-slate-900 block leading-tight">{student.name}</span>
                          <span className="text-[11px] text-slate-500 block">{student.level}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">My Batch</span>
                        <span className="font-semibold text-slate-700 text-xs">{student.batch || "Saturdays, 05:30 PM"}</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200">
                      {[
                        { id: 'Live', label: 'Live Now' },
                        { id: 'Upcoming', label: 'Upcoming' },
                        { id: 'Completed', label: 'Completed' }
                      ].map((tab) => {
                        const isCurrent = liveClassListTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setLiveClassListTab(tab.id as any)}
                            className={`flex-1 pb-3 text-sm font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
                              isCurrent 
                                ? 'border-[#163E2B] text-[#163E2B]' 
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Classes List */}
                    <div className="space-y-4">
                      {(() => {
                        const allMatched = getStudentClasses();
                        const filtered = allMatched.filter(cls => {
                          if (liveClassListTab === 'Live') return cls.status === 'LIVE NOW';
                          if (liveClassListTab === 'Upcoming') return cls.status === 'Upcoming';
                          return cls.status === 'Completed';
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-sm">
                              <Tv className="w-10 h-10 text-slate-300 mx-auto" />
                              <div className="space-y-1">
                                <h5 className="font-bold text-sm text-slate-900">No Classes Scheduled</h5>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                                  There are no {liveClassListTab.toLowerCase()} classes available for your level and batch at this time.
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return filtered.map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => {
                              setSelectedLiveClass(item);
                              setActiveScreen('LiveClassDetails');
                            }}
                            className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-sm space-y-4 cursor-pointer transition-all hover:shadow-md"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1.5 text-left">
                                <div className="flex flex-wrap gap-2 items-center">
                                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                    item.status === 'LIVE NOW' 
                                      ? 'bg-emerald-100 text-[#163E2B]' 
                                      : item.status === 'Upcoming'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {item.status === 'LIVE NOW' ? 'Live Now' : item.status}
                                  </span>
                                  {item.isGeneral && (
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] font-medium">General Session</span>
                                  )}
                                </div>
                                <h4 className="font-bold text-base text-slate-900 leading-snug">{item.title}</h4>
                                <p className="text-sm text-slate-600 font-medium">Guruji: {item.teacher}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 border-t border-slate-100 text-xs text-slate-600 text-left">
                              <div>
                                <span className="text-slate-400 block text-[10px] uppercase font-medium">Pathshala Level</span>
                                <span className="font-medium text-slate-800">{item.level.split(':')[0]}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px] uppercase font-medium">Assigned Batch</span>
                                <span className="font-medium text-slate-800">{item.batch}</span>
                              </div>
                              <div className="col-span-2 flex flex-col sm:flex-row sm:justify-between gap-1.5 pt-1 text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-slate-400" />
                                  {item.date} • {item.time}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-slate-400" />
                                  Duration: {item.duration}
                                </span>
                              </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-slate-100/60">
                              <span className="text-xs font-semibold text-[#163E2B] flex items-center gap-1">
                                View Class Details
                                <ChevronRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </motion.div>
                )}

                {/* 6. LIVE CLASS DETAILS */}
                {activeScreen === 'LiveClassDetails' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-6 space-y-6 max-w-2xl mx-auto bg-slate-50 min-h-screen text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => navigateBack()} 
                          className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shadow-sm cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">CLASS OVERVIEW</span>
                      </div>
                      {selectedLiveClass?.status === 'LIVE NOW' && (
                        <span className="px-2.5 py-1 bg-emerald-100 text-[#163E2B] font-semibold text-xs rounded-full">
                          ● LIVE NOW
                        </span>
                      )}
                    </div>

                    {selectedLiveClass ? (
                      <div className="space-y-6">
                        {/* Class Main Information Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-wider block">Class Topic</span>
                            <h2 className="text-xl font-bold text-slate-900 leading-snug">{selectedLiveClass.title}</h2>
                            <p className="text-sm text-slate-500">Presented by <strong className="text-slate-800 font-semibold">{selectedLiveClass.teacher}</strong></p>
                          </div>

                          <hr className="border-slate-100" />

                          {/* Attributes Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-slate-100 rounded-lg p-3.5 space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Pathshala Level</span>
                              <span className="font-semibold text-slate-800 text-sm">{selectedLiveClass.level}</span>
                            </div>
                            <div className="border border-slate-100 rounded-lg p-3.5 space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Batch</span>
                              <span className="font-semibold text-slate-800 text-sm">{selectedLiveClass.batch}</span>
                            </div>
                            <div className="border border-slate-100 rounded-lg p-3.5 space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Date & Time</span>
                              <span className="font-semibold text-slate-800 text-sm">{selectedLiveClass.date} • {selectedLiveClass.time}</span>
                            </div>
                            <div className="border border-slate-100 rounded-lg p-3.5 space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Class Duration</span>
                              <span className="font-semibold text-slate-800 text-sm">{selectedLiveClass.duration}</span>
                            </div>
                          </div>

                          <hr className="border-slate-100" />

                          {/* Syllabus Overview */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-wider block">Short Syllabus & Agenda</span>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {selectedLiveClass.description}
                            </p>
                          </div>

                          <hr className="border-slate-100" />

                          {/* Sunday Optional Notice */}
                          {isSundayClass && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-amber-900 block">Sunday Special Class (Optional)</span>
                                <p className="text-[11px] text-amber-700 leading-relaxed">
                                  Attendance will not be counted. Bonus Points will be awarded upon participation.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Important Instructions */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Important Instructions</span>
                            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                              <li>Please join 5 minutes before the scheduled class time.</li>
                              <li>Keep your camera turned on and sit in a quiet, respectful learning environment.</li>
                              <li>Keep your microphone muted unless requested to speak by Guruji.</li>
                              <li>Prepare your notebook, pen, and daily reciting worksheets.</li>
                              <li>Attendance will be marked automatically after 5 minutes of continuous participation.</li>
                            </ul>
                          </div>
                        </div>

                        {/* CTA Primary Button */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setClassroomTimeElapsed(0);
                              setIsAttendanceMarked(false);
                              setIsOpeningLiveClass(true);
                              setActiveScreen('LiveClassRoom');
                              setTimeout(() => {
                                setIsOpeningLiveClass(false);
                              }, 2500);
                            }}
                            className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] active:scale-[0.98] transition-all text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <Video className="w-4 h-4 text-white" />
                            <span>Join Live Class</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-400 text-xs">
                        No class details loaded.
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 5.5. LIVE CLASSROOM (DISTRACTION-FREE CLASSROOM SCREEN) */}
                {activeScreen === 'LiveClassRoom' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-slate-950 flex flex-col text-slate-100 overflow-hidden font-sans"
                  >
                    {isOpeningLiveClass ? (
                      /* Transition Screen */
                      <div className="flex-1 flex flex-col items-center justify-center bg-white text-slate-900 p-8 space-y-4">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#163E2B] rounded-full animate-spin" />
                        <div className="text-center space-y-2">
                          <h4 className="text-lg font-bold text-slate-900">Opening Live Class...</h4>
                          <p className="text-xs text-slate-500 max-w-xs">
                            Connecting to secure meeting server. Please wait while we redirect you to the virtual classroom...
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Realistic Zoom / Google Meet style interface */
                      <div className="flex-1 flex flex-col h-full overflow-hidden">
                        {/* Compact Top Header */}
                        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#163E2B] animate-pulse" />
                            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                              Live Meeting
                            </span>
                            <span className="text-slate-600">|</span>
                            <span className="text-xs text-slate-300">
                              {selectedLiveClass?.title || "Sutra Navtatva"}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            Guruji: {selectedLiveClass?.teacher || "Samani Pragya ji"}
                          </div>
                        </div>

                        {/* Attendance Warning/Information Banner */}
                        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-center gap-2 text-xs text-amber-200/90 text-center">
                          <Info className="w-4 h-4 text-amber-300 shrink-0" />
                          <span>Attendance will be marked automatically after 5 minutes of continuous participation.</span>
                        </div>

                        {/* Main Meeting Grid */}
                        <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden min-h-0 relative">
                          {/* Teacher Presentation & Thumbnails Area */}
                          <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden relative flex flex-col items-center justify-center p-4">
                            {/* Slide Presentation Canvas */}
                            <div className="w-full h-full max-w-4xl bg-stone-50 rounded-lg border border-stone-200 shadow-sm flex flex-col justify-between overflow-hidden p-6 text-slate-800 relative">
                              {/* Soft paper style overlay */}
                              <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center mix-blend-multiply pointer-events-none" />
                              
                              <div className="flex justify-between items-center z-10 border-b border-stone-200 pb-2.5 text-xs text-stone-500 font-medium">
                                <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-full font-semibold">
                                  Gyan Vatika Lecture
                                </span>
                                <span>Tattvartha Sutra</span>
                              </div>

                              {/* Scripture slide content */}
                              <div className="my-auto text-center space-y-4 z-10 px-4">
                                <p className="text-lg sm:text-2xl font-bold text-amber-950 leading-relaxed tracking-wide">
                                  नारकाणां नित्याशुभतरलेश्या परिणाम <br />
                                  देह वेदना विक्रियाः ॥३.२॥
                                </p>
                                <div className="w-16 h-0.5 bg-amber-400 mx-auto rounded-full" />
                                <div className="space-y-1.5 max-w-2xl mx-auto">
                                  <p className="text-[10px] sm:text-xs text-stone-500 italic">
                                    nārakāṇāṁ nityāśubhataraleśyā pariṇāma deha vedanā ...
                                  </p>
                                  <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed font-medium">
                                    "The infernal beings continuously experience extremely inauspicious thoughts, body shapes, pain, and activities as a result of their past karma."
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between items-center border-t border-stone-200 pt-2.5 z-10 text-xs text-stone-500 font-medium">
                                <span>Lesson: Chapter 3 (Lower World)</span>
                                <span className="text-[#163E2B] font-semibold">
                                  Instructor: Samani Pragya ji
                                </span>
                              </div>
                            </div>

                            {/* Overlay Thumbnails: Floating in the corner (like Zoom Mobile) */}
                            <div className="absolute bottom-6 right-6 flex flex-col sm:flex-row gap-3 z-20">
                              {/* Teacher Camera Thumbnail */}
                              <div className="w-28 h-20 bg-slate-950 border border-slate-700 rounded-lg overflow-hidden relative shadow-md flex flex-col justify-end p-1.5">
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400 text-xs font-semibold">
                                  SP
                                </div>
                                <div className="z-10 bg-slate-950/70 px-1 py-0.5 rounded text-[9px] text-slate-300 font-medium truncate">
                                  Samani Pragya (Host)
                                </div>
                              </div>

                              {/* Student Camera Thumbnail */}
                              <div className="w-28 h-20 bg-slate-950 border border-slate-700 rounded-lg overflow-hidden relative shadow-md flex flex-col justify-end p-1.5">
                                {isCameraOn ? (
                                  <div className="absolute inset-0 z-0">
                                    <video 
                                      ref={localVideoRef} 
                                      autoPlay 
                                      playsInline 
                                      className="w-full h-full object-cover transform -scale-x-100"
                                    />
                                  </div>
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400 text-xs font-semibold">
                                    {student.name.split(' ')[0][0]}
                                  </div>
                                )}
                                <div className="z-10 bg-slate-950/70 px-1 py-0.5 rounded text-[9px] text-slate-300 font-medium truncate">
                                  {student.name.split(' ')[0]} (You)
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Chat & Participants Sidebar (Simple, clean, white background) */}
                          {showSidePanel && (
                            <div className="w-full lg:w-80 bg-white text-slate-800 rounded-xl border border-slate-200 shadow-lg flex flex-col h-72 lg:h-full overflow-hidden shrink-0 z-20 text-left">
                              {/* Tabs */}
                              <div className="flex border-b border-slate-200 bg-slate-50 p-1">
                                <button
                                  onClick={() => setActiveSidePanelTab('chat')}
                                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                                    activeSidePanelTab === 'chat'
                                      ? 'bg-white text-[#163E2B] shadow-sm'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  <span>Chat</span>
                                </button>
                                <button
                                  onClick={() => setActiveSidePanelTab('participants')}
                                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                                    activeSidePanelTab === 'participants'
                                      ? 'bg-white text-[#163E2B] shadow-sm'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  <Users className="w-4 h-4" />
                                  <span>Participants (6)</span>
                                </button>
                              </div>

                              {/* Tab Contents */}
                              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                                {activeSidePanelTab === 'chat' ? (
                                  <div className="flex flex-col h-full justify-between gap-3">
                                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar min-h-0">
                                      {liveChat.map((msg, idx) => (
                                        <div 
                                          key={idx} 
                                          className={`flex flex-col max-w-[85%] leading-normal ${
                                            msg.role === 'teacher' 
                                              ? 'self-start' 
                                              : 'self-end ml-auto'
                                          }`}
                                        >
                                          <span className="text-[10px] font-medium text-slate-400 mb-0.5 px-1">
                                            {msg.sender}
                                          </span>
                                          <div className={`p-2.5 rounded-lg text-xs ${
                                            msg.role === 'teacher' 
                                              ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                                              : 'bg-emerald-50 border border-emerald-100 text-[#0F2D1F] rounded-tr-none'
                                          }`}>
                                            <p className="leading-relaxed whitespace-pre-line text-[11px] sm:text-xs">{msg.text}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <form 
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!newChatText.trim()) return;
                                        setLiveChat((prev) => [...prev, { sender: `${student.name.split(' ')[0]} (You)`, text: newChatText, role: "student" }]);
                                        setNewChatText("");
                                        setTimeout(() => {
                                          setLiveChat((prev) => [
                                            ...prev,
                                            { sender: "Samani Pragya ji", text: `Marvelous answer, ${student.name.split(' ')[0]}! Keep reciting daily.`, role: "teacher" }
                                          ]);
                                        }, 1500);
                                      }} 
                                      className="flex gap-2 border-t border-slate-100 pt-3"
                                    >
                                      <input 
                                        type="text" 
                                        value={newChatText}
                                        onChange={(e) => setNewChatText(e.target.value)}
                                        placeholder="Send message to class..." 
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                                      />
                                      <button type="submit" className="bg-[#163E2B] hover:bg-[#0F2D1F] text-white rounded-lg px-3 py-2 flex items-center justify-center shrink-0 cursor-pointer transition-colors">
                                        <Send className="w-3.5 h-3.5" />
                                      </button>
                                    </form>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1.5 border-b border-slate-100">
                                      Instructor
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#163E2B] font-bold text-xs">
                                          SP
                                        </div>
                                        <div>
                                          <p className="text-xs font-semibold text-slate-800">Samani Pragya ji</p>
                                          <p className="text-[9px] text-[#163E2B] font-medium">Host</p>
                                        </div>
                                      </div>
                                      <span className="text-[10px] text-emerald-600 font-semibold font-mono">SPEAKING</span>
                                    </div>

                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2 pb-1.5 border-b border-slate-100">
                                      Students (5)
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <InitialBadge name={student.name} className="w-8 h-8 text-[11px]" />
                                          <p className="text-xs font-semibold text-slate-800">{student.name} (You)</p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          {isHandRaised && <span className="text-xs">✋</span>}
                                          <span className="text-[10px] text-slate-400 font-medium">Cam On</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <InitialBadge name="Aarav Jain" className="w-8 h-8 text-[11px]" />
                                          <p className="text-xs font-semibold text-slate-800">Aarav Jain</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium">Cam Off</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <InitialBadge name="Meera Shah" className="w-8 h-8 text-[11px]" />
                                          <p className="text-xs font-semibold text-slate-800">Meera Shah</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium">Cam On</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions Bar - Pure Zoom/Google Meet mobile style */}
                        <div className="bg-slate-900 border-t border-slate-800 px-4 py-4 flex items-center justify-center gap-4 shrink-0">
                          {/* Microphone Button */}
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                              isMuted
                                ? 'bg-[#163E2B] text-white'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                            title="Mute/Unmute"
                          >
                            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </button>

                          {/* Camera Button */}
                          <button
                            onClick={() => setIsCameraOn(!isCameraOn)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                              !isCameraOn
                                ? 'bg-[#163E2B] text-white'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                            title="Camera On/Off"
                          >
                            <Camera className="w-5 h-5" />
                          </button>

                          {/* Chat Toggle Button */}
                          <button
                            onClick={() => {
                              if (showSidePanel && activeSidePanelTab === 'chat') {
                                setShowSidePanel(false);
                              } else {
                                setShowSidePanel(true);
                                setActiveSidePanelTab('chat');
                              }
                            }}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                              showSidePanel && activeSidePanelTab === 'chat'
                                ? 'bg-[#163E2B] text-white'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                            title="Class Chat"
                          >
                            <MessageSquare className="w-5 h-5" />
                          </button>

                          {/* Participants Button */}
                          <button
                            onClick={() => {
                              if (showSidePanel && activeSidePanelTab === 'participants') {
                                setShowSidePanel(false);
                              } else {
                                setShowSidePanel(true);
                                setActiveSidePanelTab('participants');
                              }
                            }}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                              showSidePanel && activeSidePanelTab === 'participants'
                                ? 'bg-[#163E2B] text-white'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                            title="Participants List"
                          >
                            <Users className="w-5 h-5" />
                          </button>

                          {/* Raise Hand Button */}
                          <button
                            onClick={() => setIsHandRaised(!isHandRaised)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                              isHandRaised
                                ? 'bg-amber-500 text-slate-900 font-bold'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                            title="Raise Hand"
                          >
                            <span className="text-lg">✋</span>
                          </button>

                          {/* Leave Meeting Button */}
                          <button
                            onClick={() => {
                              setIsCameraOn(false);
                              setActiveScreen('LiveClassList');
                            }}
                            className="px-5 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-full transition-all cursor-pointer shadow-sm"
                          >
                            Leave Meeting
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 7. SUTRA LIST */}
                {activeScreen === 'SutraList' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="bg-white min-h-full p-6 sm:p-8 space-y-6 max-h-full overflow-y-auto no-scrollbar"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => navigateBack()} 
                          className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <div>
                          <p className="text-xs text-slate-400">Sacred curriculum</p>
                          <h3 className="text-xl font-semibold text-slate-900 tracking-tight">Sutra pronunciation</h3>
                        </div>
                      </div>

                      {/* Admin Override Lock Button */}
                      <button 
                        onClick={() => {
                          setAdminPermittedAllLevels(!adminPermittedAllLevels);
                          alert(adminPermittedAllLevels 
                            ? "Admin Level Override Disabled. Now restricting view to your registered Pathshala Level."
                            : "Admin Level Override Enabled! You can now view and practice Sutras from all Levels."
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors border ${
                          adminPermittedAllLevels 
                            ? 'bg-amber-50/50 border-amber-200 text-amber-700' 
                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                        }`}
                        title="Simulate Teacher/Admin Unlock Permission"
                      >
                        {adminPermittedAllLevels ? (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Admin unlocked</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Level lock active</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                      Practice recitation, listen to pristine guru pronunciations, and study word-by-word meanings in English, Hindi, or Gujarati.
                    </p>

                    {/* Search & Downloaded-only Filter - Google Search Style */}
                    <div className="space-y-4">
                      <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          type="text" 
                          value={sutraSearchQuery}
                          onChange={(e) => setSutraSearchQuery(e.target.value)}
                          placeholder="Search sutras, categories, meaning..."
                          className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-full text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm hover:shadow transition-shadow duration-200"
                        />
                        {sutraSearchQuery && (
                          <button 
                            onClick={() => setSutraSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Category Badge Filter - Spotify Pill Style */}
                      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
                        {['All', 'Morning Prayers', 'Daily Rituals', 'Devotional', 'Repentance'].map((cat) => {
                          const isSel = sutraSelectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => setSutraSelectedCategory(cat)}
                              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                                isSel 
                                  ? 'bg-[#163E2B] text-white shadow-xs' 
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Continue Reading (if applicable) - Notion Style Card */}
                    {continueReadingSutra && (
                      (() => {
                        const sutra = sutrasList.find(s => s.id === continueReadingSutra);
                        if (!sutra) return null;
                        return (
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3 shadow-xs">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-semibold text-[#163E2B] flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> Continue reading
                              </span>
                              <span className="text-xs text-slate-400">Level {sutra.level}</span>
                            </div>
                            <div className="flex justify-between items-end gap-4">
                              <div>
                                <h4 className="font-semibold text-base text-slate-900">{sutra.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{sutra.prakrit.length} verses • Click to resume</p>
                              </div>
                              <button 
                                onClick={() => {
                                  setSelectedSutra(sutra);
                                  setSutraLanguage(selectedLanguage);
                                  setActiveScreen('SutraDetails');
                                }}
                                className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-medium text-xs rounded-full shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <span>Chant now</span>
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {/* Recently Practiced Section (Recently Viewed) - Spotify Style Cards */}
                    {recentlyViewedSutras.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-semibold text-slate-800 tracking-tight">Recently practiced</h4>
                        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                          {recentlyViewedSutras.map(id => {
                            const sutra = sutrasList.find(s => s.id === id);
                            if (!sutra) return null;
                            return (
                              <div 
                                key={id}
                                onClick={() => {
                                  setSelectedSutra(sutra);
                                  setSutraLanguage(selectedLanguage);
                                  setActiveScreen('SutraDetails');
                                }}
                                className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-4 shadow-xs cursor-pointer transition-all shrink-0 w-[150px] space-y-2"
                              >
                                <span className="text-[10px] font-medium text-slate-400 block">Level {sutra.level}</span>
                                <h5 className="font-semibold text-xs text-slate-800 truncate">{sutra.name}</h5>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{sutra.audioDuration} mins</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Active Student Level Sutras List */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-slate-800 tracking-tight">
                          {adminPermittedAllLevels ? "All unlocked sutras" : `My assigned sutras (Level ${getLevelNumber(student.level)})`}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {
                            sutrasList.filter(s => {
                              const isLevelAllowed = adminPermittedAllLevels || s.level === getLevelNumber(student.level);
                              const isCatMatch = sutraSelectedCategory === 'All' || s.category === sutraSelectedCategory;
                              const isSearchMatch = !sutraSearchQuery || s.name.toLowerCase().includes(sutraSearchQuery.toLowerCase()) || s.meaning.toLowerCase().includes(sutraSearchQuery.toLowerCase());
                              return isLevelAllowed && isCatMatch && isSearchMatch;
                            }).length
                          } items
                        </span>
                      </div>

                      <div className="space-y-3">
                        {sutrasList
                          .filter((sutra) => {
                            // Level match
                            const isLevelAllowed = adminPermittedAllLevels || sutra.level === getLevelNumber(student.level);
                            if (!isLevelAllowed) return false;

                            // Category match
                            if (sutraSelectedCategory !== 'All' && sutra.category !== sutraSelectedCategory) return false;

                            // Search match
                            if (sutraSearchQuery) {
                              const q = sutraSearchQuery.toLowerCase();
                              return sutra.name.toLowerCase().includes(q) || 
                                     sutra.meaning.toLowerCase().includes(q) || 
                                     sutra.category.toLowerCase().includes(q);
                            }

                            return true;
                          })
                          .map((sutra) => {
                            const isTextDownloaded = downloadedSutras.includes(sutra.id);
                            const isAudioDownloaded = downloadedSutraAudios.includes(sutra.id);
                            
                            return (
                              <div 
                                key={sutra.id}
                                onClick={() => {
                                  setSelectedSutra(sutra);
                                  setSutraLanguage(selectedLanguage);
                                  // Update recently viewed
                                  setRecentlyViewedSutras(prev => {
                                    const filtered = prev.filter(id => id !== sutra.id);
                                    return [sutra.id, ...filtered].slice(0, 5);
                                  });
                                  setContinueReadingSutra(sutra.id);
                                  setActiveScreen('SutraDetails');
                                }}
                                className="bg-white hover:bg-slate-50/50 border border-slate-100 rounded-2xl p-5 shadow-xs cursor-pointer transition-all flex justify-between items-center"
                              >
                                <div className="space-y-2 flex-1 pr-4">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-medium text-slate-400">
                                      Level {sutra.level} • {sutra.category}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                      <Music className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Audio available</span>
                                    </span>
                                  </div>
                                  <h4 className="font-semibold text-base text-slate-900 leading-snug">{sutra.name}</h4>
                                  
                                  {/* Download status and specs */}
                                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap pt-0.5">
                                    <span>{sutra.prakrit.length} verses</span>
                                    <span>•</span>
                                    <span>{sutra.audioDuration} mins</span>
                                    {(isTextDownloaded || isAudioDownloaded) && (
                                      <>
                                        <span>•</span>
                                        <div className="flex items-center gap-2">
                                          {isTextDownloaded && (
                                            <span className="text-[#163E2B] font-medium flex items-center gap-0.5">
                                              <Check className="w-3.5 h-3.5" /> Text offline
                                            </span>
                                          )}
                                          {isAudioDownloaded && (
                                            <span className="text-[#163E2B] font-medium flex items-center gap-0.5">
                                              <Check className="w-3.5 h-3.5" /> Audio offline
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 border border-slate-100 flex items-center justify-center shrink-0 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                                  <ChevronRight className="w-5 h-5" />
                                </div>
                              </div>
                            );
                          })}

                        {/* If no results */}
                        {sutrasList.filter((sutra) => {
                          const isLevelAllowed = adminPermittedAllLevels || sutra.level === getLevelNumber(student.level);
                          if (!isLevelAllowed) return false;
                          if (sutraSelectedCategory !== 'All' && sutra.category !== sutraSelectedCategory) return false;
                          if (sutraSearchQuery) {
                            const q = sutraSearchQuery.toLowerCase();
                            return sutra.name.toLowerCase().includes(q) || sutra.meaning.toLowerCase().includes(q);
                          }
                          return true;
                        }).length === 0 && (
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center text-slate-400 text-sm">
                            No active Sutras matching this category or search query for your level.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Locked Level Sutras Section (for student awareness of other level materials) */}
                    {!adminPermittedAllLevels && (
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-semibold text-slate-800 tracking-tight">Sutras from other levels</h4>
                        <div className="space-y-3">
                          {sutrasList
                            .filter(s => s.level !== getLevelNumber(student.level))
                            .map(sutra => (
                              <div key={sutra.id} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center opacity-75">
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-slate-400">
                                      Level {sutra.level} • {sutra.category}
                                    </span>
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                  </div>
                                  <h4 className="font-semibold text-sm text-slate-700">{sutra.name}</h4>
                                  <p className="text-xs text-slate-400">Unlock requires Teacher/Admin level permission.</p>
                                </div>
                                <button 
                                  onClick={() => {
                                    alert(`This Sutra belongs to Level ${sutra.level}. Ask your Pathshala administrator or teacher to unlock it, or click the lock button in the top right header to simulate Admin Permission!`);
                                  }}
                                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-full text-xs font-medium transition-all cursor-pointer shadow-xs"
                                >
                                  Request unlock
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 8. SUTRA DETAILS - REDESIGNED SPOTIFY-STYLE LYRICS VIEW */}
                {activeScreen === 'SutraDetails' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-white flex flex-col z-20 pb-[64px]"
                  >
                    {/* Top sticky header bar */}
                    <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 bg-white shrink-0 min-h-[52px]">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { 
                            navigateBack(); 
                            setIsPlayingAudio(false); 
                          }} 
                          className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                          <ChevronLeft className="w-4.5 h-4.5 text-slate-600" />
                        </button>
                        <h4 className="font-bold text-sm text-slate-800 tracking-tight truncate max-w-[150px]">{selectedSutra.name}</h4>
                      </div>
                      
                      {/* Interactive On-Screen Language Switcher */}
                      <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-full border border-slate-100">
                        {['English', 'Hindi', 'Gujarati'].map((lang) => {
                          const isSel = sutraLanguage === lang;
                          return (
                            <button
                              key={lang}
                              onClick={() => setSutraLanguage(lang)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                                isSel 
                                  ? 'bg-[#163E2B] text-white shadow-xs' 
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              {lang === 'English' ? 'EN' : lang === 'Hindi' ? 'हिन्दी' : 'ગુજ'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scrollable Complete Lyrics Text */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 select-text scroll-smooth no-scrollbar">
                      <div className="text-xs text-slate-400 font-semibold mb-1 text-center">
                        Tap any verse to practice or listen from that section.
                      </div>

                      <div className="space-y-6 max-w-2xl mx-auto">
                        {selectedSutra.prakrit.map((prak, idx) => {
                          const activeVerseIndex = Math.floor((audioProgress / 100) * selectedSutra.prakrit.length) % selectedSutra.prakrit.length;
                          const isActive = idx === activeVerseIndex;
                          
                          // Determine translation text based on the selected language
                          let translatedText = selectedSutra.english[idx] || "";
                          if (sutraLanguage === 'Hindi') {
                            translatedText = selectedSutra.hindi[idx] || selectedSutra.english[idx];
                          } else if (sutraLanguage === 'Gujarati') {
                            translatedText = selectedSutra.gujarati[idx] || selectedSutra.english[idx];
                          }

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                const newProgress = (idx / selectedSutra.prakrit.length) * 100 + 1;
                                setAudioProgress(newProgress);
                              }}
                              className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer text-center ${
                                isActive 
                                  ? 'bg-emerald-50 border-l-4 border-[#163E2B] text-[#0F2D1F] rounded-l-none' 
                                  : 'border border-transparent hover:bg-slate-50/50 opacity-50 hover:opacity-90'
                              }`}
                            >
                              {/* Original Prakrit Pronunciation */}
                              <p className={`font-sans leading-relaxed transition-all duration-300 ${
                                isActive 
                                  ? 'text-[#163E2B] text-xl font-bold scale-[1.01]' 
                                  : 'text-slate-700 text-lg font-semibold'
                              }`}>
                                {prak}
                              </p>
                              
                              {/* Selected Language Translation Text */}
                              <p className={`mt-3 font-sans leading-relaxed transition-all duration-300 ${
                                isActive 
                                  ? 'text-[#163E2B]/80 text-sm font-medium' 
                                  : 'text-slate-400 text-xs font-normal'
                              }`}>
                                {translatedText}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Philosophical meaning card */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mt-8 mb-4 space-y-2 max-w-2xl mx-auto">
                        <h5 className="text-xs font-semibold text-[#163E2B] uppercase tracking-wider">Philosophical essence</h5>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {selectedSutra.meaning}
                        </p>
                      </div>

                      {/* Pathshala Logo at the bottom of every Sutra page */}
                      <div className="flex flex-col items-center justify-center pt-8 pb-10 border-t border-slate-100 mt-8 space-y-1.5">
                        <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-xs">
                          <Sparkles className="w-5 h-5 text-[#163E2B]" />
                        </div>
                        <span className="font-sans font-medium text-sm text-slate-800">Gyan Vatika</span>
                        <span className="text-xs text-slate-400">Purity • Wisdom • Compassion</span>
                      </div>
                    </div>

                    {/* Premium Sticky Audio Player at the bottom of the screen */}
                    <UnifiedAudioPlayer
                      title={selectedSutra.name}
                      subtitle="Sacred guidance by Pujya Samanji"
                      duration={selectedSutra.audioDuration}
                      isPlaying={isPlayingAudio}
                      onPlayPause={() => setIsPlayingAudio(!isPlayingAudio)}
                      progress={audioProgress}
                      onProgressChange={setAudioProgress}
                      speed={sutraSpeed}
                      onSpeedChange={setSutraSpeed}
                      isFavorite={favoriteSutras.includes(selectedSutra.id)}
                      onFavoriteToggle={toggleSutraFav}
                      isDownloaded={downloadedSutraAudios.includes(selectedSutra.id)}
                      onDownloadToggle={toggleSutraDown}
                      onPrevious={handlePreviousSutra}
                      onNext={handleNextSutra}
                      onShare={() => handleShareAudio(selectedSutra.name)}
                      isCompact={true}
                    />
                  </motion.div>
                )}

                {/* 9. AUDIO + LYRICS SCREEN */}
                {activeScreen === 'AudioLyrics' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-white flex flex-col justify-between pb-[64px] z-20"
                  >
                    {/* Top sticky header */}
                    <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 bg-white shrink-0 min-h-[52px]">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigateBack()} 
                          className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                          <ChevronLeft className="w-4.5 h-4.5 text-slate-600" />
                        </button>
                        <h4 className="font-bold text-sm text-slate-800 tracking-tight truncate max-w-[200px]">{selectedStavan.title}</h4>
                      </div>
                    </div>

                    {/* scrollable lyrics content panel */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-center select-text scroll-smooth no-scrollbar max-w-2xl mx-auto w-full">
                      <div className="text-xs text-slate-400 font-semibold mb-4 text-center">Lyrics & sacred verses</div>
                      
                      <div className="space-y-6">
                        {selectedStavan.lyrics.map((verse, idx) => {
                          const activeVerseIndex = Math.floor((audioProgress / 100) * selectedStavan.lyrics.length) % selectedStavan.lyrics.length;
                          const isActive = idx === activeVerseIndex;
                          return (
                            <p 
                              key={idx} 
                              className={`transition-all duration-300 leading-relaxed font-sans cursor-pointer ${
                                isActive 
                                  ? 'text-xl text-[#163E2B] font-bold py-4 px-6 bg-emerald-50 border-l-4 border-[#163E2B] rounded-r-2xl scale-[1.01]' 
                                  : 'text-lg text-slate-700 font-semibold py-2 opacity-50 hover:opacity-90 hover:text-slate-800'
                              }`}
                              onClick={() => {
                                const newProgress = (idx / selectedStavan.lyrics.length) * 100 + 1;
                                setAudioProgress(newProgress);
                              }}
                            >
                              {verse}
                            </p>
                          );
                        })}
                      </div>

                      {/* Gyan Vatika logo footer at bottom of the scroll view */}
                      <div className="flex flex-col items-center justify-center pt-8 pb-10 border-t border-slate-100 mt-8 space-y-1.5">
                        <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-xs">
                          <Sparkles className="w-5 h-5 text-[#163E2B]" />
                        </div>
                        <span className="font-sans font-medium text-sm text-slate-800">Gyan Vatika</span>
                        <span className="text-xs text-slate-400">Purity • Wisdom • Compassion</span>
                      </div>
                    </div>

                    {/* Sticky bottom audio player similar to Spotify lyrics */}
                    <UnifiedAudioPlayer
                      title={selectedStavan.title}
                      subtitle={selectedStavan.singer}
                      duration={selectedStavan.duration}
                      isPlaying={isPlayingAudio}
                      onPlayPause={() => setIsPlayingAudio(!isPlayingAudio)}
                      progress={audioProgress}
                      onProgressChange={setAudioProgress}
                      speed={sutraSpeed}
                      onSpeedChange={setSutraSpeed}
                      isFavorite={favoriteStavans.includes(selectedStavan.title)}
                      onFavoriteToggle={toggleStavanFav}
                      isDownloaded={downloadedStavans.includes(selectedStavan.title)}
                      onDownloadToggle={toggleStavanDown}
                      onPrevious={handlePreviousStavan}
                      onNext={handleNextStavan}
                      onShare={() => handleShareAudio(selectedStavan.title)}
                      isCompact={true}
                    />
                  </motion.div>
                )}

                 {/* 10. STAVAN & STUTI LISTING */}
                {activeScreen === 'StavanList' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="bg-white min-h-full p-6 sm:p-8 space-y-6 max-h-full overflow-y-auto no-scrollbar"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigateBack()} 
                        className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <div>
                        <p className="text-xs text-slate-400">Devotional paras</p>
                        <h3 className="text-xl font-semibold text-slate-900 tracking-tight">Stavan & Stuti</h3>
                      </div>
                    </div>

                    {/* Search Bar - Google Search Style */}
                    <div className="relative max-w-xl">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Search stavan or stuti name..."
                        value={stavanSearchQuery}
                        onChange={(e) => setStavanSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-full text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm hover:shadow transition-shadow duration-200"
                      />
                      {stavanSearchQuery && (
                        <button 
                          onClick={() => setStavanSearchQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Browsing Modes - Notion Segment Controller */}
                    <div className="bg-slate-100 p-1 rounded-full grid grid-cols-3 gap-1 max-w-xl">
                      {[
                        { id: 'all', label: 'All Stavans' },
                        { id: 'alphabetical', label: 'Alphabetical' },
                        { id: 'bhagwan', label: 'Bhagwan' }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setStavanBrowseMode(mode.id);
                            // reset sub-filters
                            setStavanLetterFilter('All');
                            setStavanBhagwanFilter('All');
                          }}
                          className={`py-1.5 rounded-full text-xs font-medium text-center transition-all cursor-pointer ${
                            stavanBrowseMode === mode.id
                              ? 'bg-white text-slate-900 shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>

                    {/* Sub-Filters: Alphabetical list - Spotify Pill Style */}
                    {stavanBrowseMode === 'alphabetical' && (
                      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
                        {['All', 'A', 'B', 'I', 'L', 'M', 'N', 'P'].map((letter) => (
                          <button
                            key={letter}
                            onClick={() => setStavanLetterFilter(letter)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                              stavanLetterFilter === letter
                                ? 'bg-[#163E2B] text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Sub-Filters: Bhagwan list - Spotify Pill Style */}
                    {stavanBrowseMode === 'bhagwan' && (
                      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
                        {['All', 'Bhagwan Mahavir', 'Bhagwan Parshwanath', 'Bhagwan Adinath', 'Bhagwan Neminath', 'Other Tirthankars'].map((group) => (
                          <button
                            key={group}
                            onClick={() => setStavanBhagwanFilter(group)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                              stavanBhagwanFilter === group
                                ? 'bg-[#163E2B] text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                          >
                            {group === 'All' ? 'All groups' : group.replace('Bhagwan ', '')}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Filtered list computation */}
                    <div className="space-y-4 max-w-xl pt-1">
                      {(() => {
                        let list = STAVANS_LIST;

                        // 1. Search Query
                        if (stavanSearchQuery.trim()) {
                          const q = stavanSearchQuery.toLowerCase();
                          list = list.filter(item => 
                            item.title.toLowerCase().includes(q) ||
                            item.singer.toLowerCase().includes(q) ||
                            (item.bhagwan && item.bhagwan.toLowerCase().includes(q))
                          );
                        }

                        // 2. Alphabetical browse mode filter
                        if (stavanBrowseMode === 'alphabetical' && stavanLetterFilter !== 'All') {
                          list = list.filter(item => item.title.toUpperCase().startsWith(stavanLetterFilter));
                        }

                        // 3. Bhagwan browse mode filter
                        if (stavanBrowseMode === 'bhagwan' && stavanBhagwanFilter !== 'All') {
                          list = list.filter(item => item.bhagwan === stavanBhagwanFilter);
                        }

                        // If grouping is set to "All" under Bhagwan browse mode, show them grouped under headings!
                        const isGroupedView = stavanBrowseMode === 'bhagwan' && stavanBhagwanFilter === 'All';

                        if (isGroupedView) {
                          const groups = ["Bhagwan Mahavir", "Bhagwan Parshwanath", "Bhagwan Adinath", "Bhagwan Neminath", "Other Tirthankars"];
                          return (
                            <div className="space-y-6">
                              {groups.map((group) => {
                                const groupItems = list.filter(item => item.bhagwan === group);
                                if (groupItems.length === 0) return null;
                                return (
                                  <div key={group} className="space-y-3">
                                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-2">
                                      <h4 className="text-sm font-semibold text-slate-800 tracking-tight">
                                        {group}
                                      </h4>
                                      <span className="text-xs text-slate-400">({groupItems.length})</span>
                                    </div>
                                    <div className="space-y-3">
                                      {groupItems.map((item) => {
                                        const isDownloaded = downloadedStavans.includes(item.title);
                                        return (
                                          <div 
                                            key={item.title}
                                            onClick={() => {
                                              setSelectedStavan(item);
                                              setActiveScreen('StavanDetails');
                                            }}
                                            className="bg-white hover:bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs"
                                          >
                                            <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 text-[#163E2B] flex items-center justify-center shrink-0">
                                                <Volume2 className="w-5 h-5" />
                                              </div>
                                              <div>
                                                <h5 className="font-semibold text-sm text-slate-800">{item.title}</h5>
                                                <p className="text-xs text-slate-400">By {item.singer}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              {item.youtubeUrl && (
                                                <span className="px-2 py-0.5 bg-emerald-50 text-[#163E2B] font-medium text-[10px] rounded-full" title="YouTube video available">YouTube</span>
                                              )}
                                              <span className="text-xs text-slate-400">{item.duration}</span>
                                              <button
                                                onClick={(e) => toggleStavanDownItem(item.title, e)}
                                                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                                              >
                                                <Download className={`w-4 h-4 ${isDownloaded ? 'text-[#163E2B]' : 'text-slate-300 hover:text-slate-500'}`} />
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }

                        if (list.length === 0) {
                          return (
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center text-slate-400 text-sm">
                              No matching Stavans or Stutis found. Try adjusting filters or search query!
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-3">
                            {/* Show Weekly Highlight only in 'all' view when no search or filter is set */}
                            {stavanBrowseMode === 'all' && !stavanSearchQuery && (
                              <div className="bg-slate-50 border border-slate-100 border-l-4 border-l-[#163E2B] rounded-2xl p-5 shadow-xs flex items-center justify-between mb-2">
                                <div>
                                  <span className="text-xs font-semibold text-[#163E2B] block">Weekly highlight</span>
                                  <h4 className="font-semibold text-base text-slate-900 mt-1">{STAVANS_LIST[4].title}</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">By {STAVANS_LIST[4].singer}</p>
                                </div>
                                <button 
                                  onClick={() => {
                                    setSelectedStavan(STAVANS_LIST[4]);
                                    setActiveScreen('StavanDetails');
                                  }}
                                  className="w-10 h-10 rounded-full bg-[#163E2B] hover:bg-[#0F2D1F] text-white flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                                >
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                </button>
                              </div>
                            )}

                            {list.map((item) => {
                              const isDownloaded = downloadedStavans.includes(item.title);
                              return (
                                <div 
                                  key={item.title}
                                  onClick={() => {
                                    setSelectedStavan(item);
                                    setActiveScreen('StavanDetails');
                                  }}
                                  className="bg-white hover:bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 text-[#163E2B] flex items-center justify-center shrink-0">
                                      <Volume2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-sm text-slate-800">{item.title}</h5>
                                      <div className="flex items-center gap-2 mt-1">
                                        <p className="text-xs text-slate-400">By {item.singer}</p>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{item.bhagwan.replace('Bhagwan ', '')}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {item.youtubeUrl && (
                                      <span className="px-2 py-0.5 bg-emerald-50 text-[#163E2B] font-medium text-[10px] rounded-full" title="YouTube video available">YouTube</span>
                                    )}
                                    <span className="text-xs text-slate-400">{item.duration}</span>
                                    <button
                                      onClick={(e) => toggleStavanDownItem(item.title, e)}
                                      className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                      <Download className={`w-4 h-4 ${isDownloaded ? 'text-[#163E2B]' : 'text-slate-300 hover:text-slate-500'}`} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}

                {/* 11. STAVAN DETAILS */}
                {activeScreen === 'StavanDetails' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="bg-white min-h-full p-6 sm:p-8 space-y-6 max-h-full overflow-y-auto no-scrollbar"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigateBack()} 
                        className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <div>
                        <p className="text-xs text-slate-400">Devotional details</p>
                        <h3 className="text-xl font-semibold text-slate-900 tracking-tight">{selectedStavan.title}</h3>
                      </div>
                    </div>

                    {/* Rich spiritual graphic/album art representation */}
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl aspect-square w-full relative flex flex-col justify-end p-6 text-slate-800 shadow-sm overflow-hidden">
                      {/* Stylized subtle icon */}
                      <div className="absolute top-6 left-6 w-11 h-11 bg-white text-[#163E2B] rounded-full flex items-center justify-center border border-slate-100 shadow-xs">
                        <Volume2 className="w-5 h-5" />
                      </div>

                      <div className="z-10 space-y-1">
                        <span className="text-[10px] font-semibold text-[#163E2B] tracking-wider uppercase">Sacred harmony series</span>
                        <h4 className="text-lg font-semibold text-slate-950 leading-tight">{selectedStavan.title}</h4>
                        <p className="text-xs text-slate-500">By {selectedStavan.singer}</p>
                      </div>
                    </div>

                    {/* Mini lyric cards */}
                    <div className="space-y-3">
                      <span className="text-xs font-semibold text-slate-500 tracking-tight block">Meaning & translation</span>
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center space-y-3">
                        {selectedStavan.lyrics.map((ly, index) => (
                          <p key={index} className="text-sm font-medium text-slate-700 leading-relaxed">
                            {ly}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Bottom controls */}
                    <div className="flex justify-between items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#163E2B] font-semibold block tracking-wider">Audio controller</span>
                        <span className="text-xs text-slate-500">{selectedStavan.duration} duration</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        {selectedStavan.youtubeUrl && (
                          <a 
                            href={selectedStavan.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] text-xs font-semibold rounded-full cursor-pointer transition-colors"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                          </a>
                        )}
                        <button 
                          onClick={() => {
                            setAudioTarget(selectedStavan.title);
                            setAudioSubtitle(selectedStavan.singer);
                            setIsPlayingAudio(true);
                            setActiveScreen('AudioLyrics');
                          }}
                          className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white text-xs font-semibold rounded-full cursor-pointer shadow-sm transition-colors"
                        >
                          Show full lyrics
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}


                {/* DAILY NIYAM SCREEN */}
                {activeScreen === 'Niyam' && (() => {
                  const currentDay = niyamDays.find(d => d.date === selectedNiyamDate) || niyamDays[0];
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-6 space-y-6 max-w-2xl mx-auto bg-slate-50 min-h-screen pb-24"
                    >
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => navigateBack()}
                          className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shadow-sm cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <div>
                          <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono block">Daily Track</span>
                          <h3 className="text-sm font-black text-[#0f172a]">Daily Spiritual Niyams</h3>
                        </div>
                      </div>

                      <div className="bg-white border border-emerald-200 rounded-[24px] p-5 shadow-sm space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#163E2B] shrink-0">
                            <Star className="w-6 h-6 fill-[#C5A059]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900">Spiritual Commitments</h4>
                            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                              Log your daily niyams here. Today's entries remain editable until the day ends. You can review up to 3 days of past submissions.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Date Selector */}
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {niyamDays.map((day) => {
                          const isDayLocked = getIsNiyamDateLocked(day.date, day.submitted);
                          const status = getNiyamDayStatus(day);
                          return (
                            <button
                              key={day.date}
                              onClick={() => setSelectedNiyamDate(day.date)}
                              className={`px-4 py-2.5 rounded-[16px] text-[10px] font-bold whitespace-nowrap transition-all border shadow-xs flex-col flex gap-1 ${
                                selectedNiyamDate === day.date
                                  ? 'bg-[#163E2B] text-white border-[#0F2D1F]'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <span>{day.label}</span>
                              <div className="flex items-center gap-1 opacity-80 text-[8px] font-mono">
                                {status === 'Open' ? (
                                  <>
                                    <Unlock className="w-3 h-3" />
                                    <span>Open</span>
                                  </>
                                ) : status === 'Submitted' ? (
                                  <>
                                    <Lock className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-600">Submitted</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3 h-3 text-slate-400" />
                                    <span className="text-slate-400">Locked</span>
                                  </>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Current Day Stats */}
                      <div className="flex items-center justify-between px-2">
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{currentDay.label}</h4>
                          <span className="text-[10px] font-medium text-slate-500">{new Date(currentDay.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            {getNiyamDayStatus(currentDay) === 'Locked' ? (
                              <>
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Locked
                                </span>
                              </>
                            ) : getNiyamDayStatus(currentDay) === 'Submitted' ? (
                              <>
                                <Lock className="w-3 h-3 text-emerald-600" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                  Submitted / Locked
                                </span>
                              </>
                            ) : (
                              <>
                                <Unlock className="w-3 h-3 text-amber-600" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                                  Open
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-[11px] font-bold text-slate-900">
                            Earned: <span className="text-[#163E2B]">{currentDay.pointsEarned} pts</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {currentDay.niyams.map((niyam) => {
                          const canEdit = !getIsNiyamDateLocked(currentDay.date, currentDay.submitted);
                          return (
                            <div 
                              key={niyam.id} 
                              onClick={() => {
                                if (canEdit) {
                                  handleToggleNiyam(currentDay.date, niyam.id);
                                }
                              }}
                              className={`p-4 rounded-[20px] border transition-all flex items-center justify-between ${
                                canEdit ? 'cursor-pointer active:scale-97' : 'cursor-default opacity-80'
                              } ${
                                niyam.done 
                                  ? 'bg-emerald-50 border-emerald-200 shadow-inner' 
                                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  niyam.done 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'border-slate-300 bg-slate-50'
                                }`}>
                                  {niyam.done && <Check className="w-4 h-4" />}
                                </div>
                                <div>
                                  <h5 className={`text-xs font-bold transition-colors ${niyam.done ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800'}`}>
                                    {niyam.title}
                                  </h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                      {niyam.category}
                                    </span>
                                    <span className="text-[9px] font-bold text-amber-600 flex items-center gap-0.5">
                                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                      +{niyam.points} pts
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {!getIsNiyamDateLocked(currentDay.date, currentDay.submitted) ? (
                        <div className="pt-4 space-y-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                /* In this prototype, toggling already saves state. We just show a visual cue if needed */
                                console.log("Draft Saved!");
                              }}
                              className="w-full py-3.5 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                              Save Draft
                            </button>
                            <button
                              onClick={() => handleSubmitNiyamDay(currentDay.date)}
                              className="w-full py-3.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#163E2B]/20 active:scale-95 transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              {currentDay.label === 'Today' 
                                ? "Submit Today's Niyam" 
                                : currentDay.label === 'Yesterday' 
                                  ? "Submit Yesterday's Niyam" 
                                  : "Submit Niyam"
                              }
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4">
                          {currentDay.submitted ? (
                            <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-3 rounded-full border border-emerald-100">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-bold">Submitted Successfully / Permanently Locked</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2 text-slate-500 bg-slate-100 py-3 rounded-full border border-slate-200">
                              <Lock className="w-4 h-4" />
                              <span className="text-xs font-bold">Submission Window Expired / Locked</span>
                            </div>
                          )}
                        </div>
                      )}

                    </motion.div>
                  );
                })()}
                 {/* 12. BONUS EVENT SCREEN */}
                 {activeScreen === 'BonusEvent' && activeBonusEvent && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     className="p-6 space-y-6 max-w-2xl mx-auto"
                   >
                     {/* Sub-header Navigation with Back Button */}
                     <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                       <div className="flex items-center gap-3">
                         <button 
                           onClick={() => {
                             setBonusConfirmation(false);
                             setActiveScreen('Home');
                           }} 
                           className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all active:scale-95 shadow-xs"
                         >
                           <ChevronLeft className="w-5 h-5 text-slate-700" />
                         </button>
                         <div>
                           <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest font-mono block">Special Activities</span>
                           <h3 className="text-sm font-black text-[#0f172a]">{activeBonusEvent.title}</h3>
                         </div>
                       </div>
                     </div>

                     {bonusConfirmation ? (
                       <div className="bg-white border border-indigo-200 rounded-[24px] p-8 text-center space-y-4 shadow-sm">
                         <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-indigo-100">
                           <CheckCircle className="w-8 h-8" />
                         </div>
                         <div>
                           <h3 className="text-lg font-black text-[#0f172a]">Activities Submitted!</h3>
                           <p className="text-xs text-slate-500 mt-1">Your teacher will review your submission and award bonus points soon.</p>
                         </div>
                         <button 
                           onClick={() => {
                             setBonusConfirmation(false);
                             setActiveScreen('Home');
                           }}
                           className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full shadow-md cursor-pointer transition-all active:scale-98"
                         >
                           Back to Home
                         </button>
                       </div>
                     ) : (
                       <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-5">
                         <div className="flex justify-between items-center pb-3 border-b border-cream-100">
                           <div>
                             <h4 className="text-sm font-extrabold text-slate-900">Select Completed Activities</h4>
                             <p className="text-[10px] text-slate-500">Only check the activities you have sincerely completed.</p>
                           </div>
                           
                           {(() => {
                             const sub = bonusSubmissions[activeBonusEvent.id];
                             if (!sub || sub.status === 'Draft') return null;
                             
                             let statusStyle = "";
                             if (sub.status === 'Pending Review') statusStyle = "bg-amber-100 text-amber-800";
                             if (sub.status === 'Approved') statusStyle = "bg-emerald-100 text-emerald-800";
                             if (sub.status === 'Rework Required') statusStyle = "bg-orange-100 text-orange-800";
                             if (sub.status === 'Rejected') statusStyle = "bg-emerald-100 text-[#163E2B]";
                             
                             return (
                               <span className={`px-2 py-1 rounded-md text-[9px] font-bold font-mono ${statusStyle}`}>
                                 {sub.status}
                               </span>
                             );
                           })()}
                         </div>
                         
                         {(() => {
                           const sub = bonusSubmissions[activeBonusEvent.id];
                           if (sub && (sub.status === 'Rework Required' || sub.status === 'Rejected') && sub.teacherRemarks) {
                             return (
                               <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
                                 <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                 <div>
                                   <p className="text-[10px] font-bold text-[#163E2B]">Teacher Remarks ({sub.status})</p>
                                   <p className="text-[10px] text-[#1C4D36] mt-0.5">{sub.teacherRemarks}</p>
                                 </div>
                               </div>
                             );
                           }
                           return null;
                         })()}

                         {/* Checklist */}
                         <div className="space-y-2.5">
                           {activeBonusEvent.activities.map((activity) => {
                             const isChecked = draftBonusActivities.includes(activity.id);
                             const sub = bonusSubmissions[activeBonusEvent.id];
                             const isReadOnly = sub && (sub.status === 'Pending Review' || sub.status === 'Approved');
                             
                             return (
                               <div 
                                 key={activity.id}
                                 onClick={() => {
                                   if (isReadOnly) return;
                                   
                                   setDraftBonusActivities(prev => {
                                     if (prev.includes(activity.id)) {
                                       return prev.filter(id => id !== activity.id);
                                     } else {
                                       return [...prev, activity.id];
                                     }
                                   });
                                 }}
                                 className={`p-3 border rounded-xl flex items-center justify-between transition-all ${
                                   isReadOnly ? 'cursor-not-allowed opacity-80' : 'cursor-pointer active:scale-98'
                                 } ${
                                   isChecked 
                                     ? 'border-indigo-200 bg-indigo-50 shadow-xs' 
                                     : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200'
                                 }`}
                               >
                                 <div className="flex items-center gap-3">
                                   <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                                     isChecked 
                                       ? 'bg-indigo-600 text-white' 
                                       : 'bg-white border-2 border-slate-300'
                                   }`}>
                                     {isChecked && <Check className="w-3.5 h-3.5" />}
                                   </div>
                                   <div>
                                     <h5 className={`text-xs font-bold ${isChecked ? 'text-indigo-900' : 'text-slate-700'}`}>
                                       {activity.title}
                                     </h5>
                                   </div>
                                 </div>
                                 <div className="text-[10px] font-bold font-mono px-2 py-1 bg-white rounded shadow-sm text-slate-500">
                                   +{activity.points} pts
                                 </div>
                               </div>
                             );
                           })}
                         </div>

                         {/* Submit Button */}
                         {(!bonusSubmissions[activeBonusEvent.id] || 
                           ['Draft', 'Rework Required', 'Rejected'].includes(bonusSubmissions[activeBonusEvent.id].status)) && (
                           <div className="pt-2 animate-in fade-in">
                             <button
                               onClick={() => {
                                 if (draftBonusActivities.length === 0) {
                                   alert("Please select at least one activity to submit.");
                                   return;
                                 }
                                 
                                 // Save submission
                                 setBonusSubmissions(prev => ({
                                   ...prev,
                                   [activeBonusEvent.id]: {
                                     status: 'Pending Review',
                                     selectedActivities: draftBonusActivities,
                                   }
                                 }));
                                 
                                 setBonusConfirmation(true);
                               }}
                               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-1.5"
                             >
                               <Send className="w-4 h-4" />
                               <span>Submit to Teacher for Review</span>
                             </button>
                           </div>
                         )}
                       </div>
                     )}
                   </motion.div>
                 )}

                {/* 13. GAMES HOME */}
                {activeScreen === 'GamesHome' && (() => {
                  const studentLevelNum = student.level.includes('Level 1') ? 1 : student.level.includes('Level 2') ? 2 : 3;
                  const availableQuizzesCount = allQuizzes.filter(q => q.level === studentLevelNum).length;
                  const quizzesCompletedCount = student.quizHistory?.length || 0;
                  const averageQuizScore = quizzesCompletedCount > 0
                    ? Math.round(student.quizHistory.reduce((acc, curr) => acc + curr.percentage, 0) / quizzesCompletedCount)
                    : 0;

                  // Last attempted quiz
                  const lastQuizHistory = student.quizHistory && student.quizHistory.length > 0 ? student.quizHistory[0] : null;
                  const lastQuizObj = lastQuizHistory ? allQuizzes.find(q => q.id === lastQuizHistory.quizId) : null;

                  // Daily Practice featured quiz
                  const dailyPracticeQuiz = allQuizzes.find(q => q.level === studentLevelNum) || allQuizzes[0];

                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-5 space-y-5 pb-24"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <div>
                            <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">LEARNING MODULE</span>
                            <h3 className="text-base font-black text-[#0f172a]">Learning Games</h3>
                          </div>
                        </div>
                      </div>

                      {/* Welcome Card */}
                      <div className="bg-gradient-to-br from-[#163E2B] via-emerald-800 to-amber-500 rounded-[24px] p-5 text-white shadow-md relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4 translate-x-4">
                          <Gamepad2 className="w-40 h-40" />
                        </div>
                        <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-wider font-mono">WELCOME BACK</span>
                        <h4 className="text-lg font-black leading-tight mt-0.5">Learning Games</h4>
                        <p className="text-[11px] text-emerald-100 mt-1 leading-relaxed">
                          Practice what you've learned through quizzes prepared by your Pathshala.
                        </p>

                        <div className="grid grid-cols-4 gap-2 pt-4 mt-2 border-t border-emerald-500/30 text-center">
                          <div>
                            <span className="block text-[8px] font-bold text-emerald-200 uppercase tracking-wider font-mono">My Level</span>
                            <span className="block text-[10px] font-black mt-0.5 text-white">Lvl {studentLevelNum}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-emerald-200 uppercase tracking-wider font-mono">Available</span>
                            <span className="block text-[10px] font-black mt-0.5 text-white">{availableQuizzesCount} Qs</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-emerald-200 uppercase tracking-wider font-mono">Completed</span>
                            <span className="block text-[10px] font-black mt-0.5 text-white">{quizzesCompletedCount}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-emerald-200 uppercase tracking-wider font-mono">Avg Score</span>
                            <span className="block text-[10px] font-black mt-0.5 text-white">{averageQuizScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Quick Actions</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => handleStartAIQuiz(dailyPracticeQuiz)}
                            className="w-full p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl flex items-center justify-between shadow-2xs text-left cursor-pointer transition-all active:scale-98"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                                <Play className="w-4 h-4 fill-[#163E2B]" />
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-slate-900">Start Learning</h5>
                                <p className="text-[9.5px] text-slate-400 mt-0.5">Jump straight into active learning assessments</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>

                          {lastQuizObj && (
                            <button
                              onClick={() => handleStartAIQuiz(lastQuizObj)}
                              className="w-full p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl flex items-center justify-between shadow-2xs text-left cursor-pointer transition-all active:scale-98"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                  <RefreshCw className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-xs text-slate-900">Continue Last Quiz</h5>
                                  <p className="text-[9.5px] text-slate-400 mt-0.5">Retake: {lastQuizHistory.quizTitle}</p>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </button>
                          )}

                          <button
                            onClick={() => setActiveScreen('ProfileReportCard')}
                            className="w-full p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl flex items-center justify-between shadow-2xs text-left cursor-pointer transition-all active:scale-98"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Award className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-slate-900">View Previous Results</h5>
                                <p className="text-[9.5px] text-slate-400 mt-0.5">Check completed questions and report cards</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Categories</h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {[
                            {
                              title: "Sutra Quiz",
                              icon: BookOpen,
                              desc: "Quizzes on Navkar Mantra, prayers, and Sutras.",
                              category: "Sutra",
                              count: allQuizzes.filter(q => q.level === studentLevelNum && (q.type === 'Sutra' || q.type === 'Gatha')).length
                            },
                            {
                              title: "Stavan & Stuti Quiz",
                              icon: Music,
                              desc: "Test your memory on devotional hymns and Stavans.",
                              category: "Stavan",
                              count: allQuizzes.filter(q => q.level === studentLevelNum && (q.type === 'Stavan' || q.type === 'Stuti')).length
                            },
                            {
                              title: "Gatha Quiz",
                              icon: FileText,
                              desc: "Exams on spiritual verses, meanings, and recitation.",
                              category: "Sutra",
                              count: allQuizzes.filter(q => q.level === studentLevelNum && q.type === 'Gatha').length
                            },
                            {
                              title: "Jain Stories Quiz",
                              icon: Sparkles,
                              desc: "Ethics, stories of Tirthankaras, and moral tales.",
                              category: "Stories",
                              count: allQuizzes.filter(q => q.level === studentLevelNum && (q.type === 'Jain Stories' || q.type === 'Bhagwan Stories')).length
                            },
                            {
                              title: "Mixed Revision Quiz",
                              icon: Award,
                              desc: "Comprehensive revision of all Pathshala modules.",
                              category: "All",
                              count: allQuizzes.filter(q => q.level === studentLevelNum).length
                            }
                          ].map((catItem, idx) => {
                            const IconCmp = catItem.icon;
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  setQuizFilterCategory(catItem.category);
                                  setActiveScreen('GamesQuizHub');
                                }}
                                className="bg-white border border-slate-200 hover:border-emerald-200 rounded-[22px] p-4 flex items-center gap-3.5 shadow-2xs cursor-pointer transition-all active:scale-98"
                              >
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                                  <IconCmp className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-extrabold text-xs text-slate-900 truncate">{catItem.title}</h5>
                                    <span className="text-[9px] font-bold font-mono text-[#163E2B] bg-emerald-50 border border-emerald-100/60 px-2 py-0.5 rounded-md">
                                      {catItem.count} {catItem.count === 1 ? 'Quiz' : 'Quizzes'}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{catItem.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Daily Practice Card */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Daily Practice</h4>
                        <div className="bg-gradient-to-r from-cream-100 to-amber-50/40 border border-cream-200 rounded-[24px] p-4.5 space-y-3.5 shadow-2xs">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold font-mono text-[8px] rounded uppercase border border-amber-200">Featured Today</span>
                              <h5 className="font-extrabold text-xs text-slate-900 leading-tight pt-1">{dailyPracticeQuiz.title}</h5>
                            </div>
                            <div className="w-9 h-9 bg-amber-100/50 rounded-lg flex items-center justify-center text-amber-600">
                              <Trophy className="w-5 h-5" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 border-t border-cream-200/50 pt-2.5 text-[10px] text-slate-500">
                            <div>
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Assigned Source</span>
                              <span className="text-slate-700 font-bold truncate block">{dailyPracticeQuiz.relatedContentName}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Difficulty</span>
                              <span className="text-slate-700 font-bold block">{dailyPracticeQuiz.difficulty}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartAIQuiz(dailyPracticeQuiz)}
                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] rounded-xl cursor-pointer transition-all text-center"
                          >
                            Practice Today
                          </button>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      {lastQuizHistory && lastQuizObj && (
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Recent Activity</h4>
                          <div className="bg-white border border-slate-200 rounded-[22px] p-4 flex flex-col gap-3 shadow-2xs">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 font-mono block">{lastQuizHistory.completedAt}</span>
                                <h5 className="font-extrabold text-xs text-slate-900 leading-tight">{lastQuizHistory.quizTitle}</h5>
                              </div>
                              <div className="bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl text-center">
                                <span className="block text-[8px] font-bold text-emerald-600 uppercase tracking-wider font-mono">Score</span>
                                <span className="font-black text-xs text-emerald-800 font-mono">{lastQuizHistory.score}/{lastQuizHistory.totalQuestions}</span>
                              </div>
                            </div>

                            <div className="flex gap-2 border-t border-slate-100 pt-2.5">
                              <button
                                onClick={() => handleViewPastResult(lastQuizObj, lastQuizHistory)}
                                className="flex-1 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[10px] rounded-lg cursor-pointer transition-all text-center"
                              >
                                View Result
                              </button>
                              <button
                                onClick={() => handleStartAIQuiz(lastQuizObj)}
                                className="flex-1 py-1.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 text-[#163E2B] font-bold text-[10px] rounded-lg cursor-pointer transition-all text-center"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Prominent Browse Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setQuizFilterCategory('All');
                            setActiveScreen('GamesQuizHub');
                          }}
                          className="w-full py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-xs rounded-2xl shadow-md cursor-pointer text-center flex items-center justify-center gap-2 active:scale-98 transition-all"
                        >
                          <span>Browse All Quizzes</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* 13b. GAMES & QUIZ HUB (Existing) */}
                {activeScreen === 'GamesQuizHub' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-5 pb-24"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setActiveScreen('GamesHome')} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div>
                          <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono font-black">LEARNING MODULE</span>
                          <h3 className="text-base font-black text-[#0f172a]">Games & Quiz Hub</h3>
                        </div>
                      </div>
                    </div>

                    {/* STUDENT BROWSER MODE */}
                    <div className="space-y-5">
                        {/* Profile Grade Display */}
                        <div className="flex justify-between items-center bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2.5 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-slate-700">
                            <GraduationCap className="w-4 h-4 text-[#163E2B]" />
                            <span>My Grade: {student.level}</span>
                          </div>
                          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full uppercase">
                            Lang: {selectedLanguage}
                          </div>
                        </div>

                        {/* 1. CONTINUE LEARNING (Scores and Completion History) */}
                        {student.quizHistory && student.quizHistory.length > 0 && (
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Continue Learning</h4>
                              <span className="text-[10px] text-slate-400 font-mono">Saved to Profile</span>
                            </div>

                            <div className="space-y-2.5">
                              {student.quizHistory.map((hist) => {
                                // Find associated quiz object to start it
                                const quizObj = allQuizzes.find(q => q.id === hist.quizId);
                                if (!quizObj) return null;

                                return (
                                  <div key={hist.quizId} className="bg-white border border-slate-200/60 rounded-2xl p-4 flex justify-between items-center shadow-2xs gap-3">
                                    <div className="space-y-1.5 flex-1">
                                      <div className="flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold font-mono text-[8px] rounded uppercase border border-emerald-100">COMPLETED</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{hist.completedAt}</span>
                                      </div>
                                      <h5 className="font-extrabold text-xs text-slate-900 leading-tight">{hist.quizTitle}</h5>
                                      
                                      {/* Performance Bar */}
                                      <div className="flex items-center gap-2">
                                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                          <div 
                                            className={`h-full rounded-full ${hist.percentage >= 80 ? 'bg-emerald-500' : hist.percentage >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${hist.percentage}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-bold font-mono">
                                          {hist.score}/{hist.totalQuestions} ({hist.percentage}%)
                                        </span>
                                      </div>
                                    </div>

                                    <button 
                                      onClick={() => handleStartAIQuiz(quizObj)}
                                      className="py-1.5 px-3 bg-emerald-50 border border-emerald-100 hover:border-emerald-200 text-[#163E2B] font-bold text-[10px] rounded-xl cursor-pointer transition-all active:scale-95 shrink-0"
                                    >
                                      Retake
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 2. RECOMMENDED FOR YOU (Handpicked Level-Specific) */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Recommended for You</h4>
                          
                          <div className="grid grid-cols-1 gap-3">
                            {allQuizzes
                              .filter(q => q.level === (student.level.includes('Level 1') ? 1 : student.level.includes('Level 2') ? 2 : 3))
                              .slice(0, 2)
                              .map((quiz) => (
                                <div key={quiz.id} className="bg-gradient-to-r from-emerald-50/50 to-slate-50/50 border border-emerald-100/60 rounded-[22px] p-4 flex flex-col justify-between shadow-2xs gap-3">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                      <div className="flex gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-emerald-100/60 text-[#163E2B] font-bold font-mono text-[8px] rounded uppercase border border-emerald-100">{quiz.type}</span>
                                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 font-bold font-mono text-[8px] rounded border border-slate-200">Level {quiz.level}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-[9px] text-slate-500 font-medium">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{quiz.estimatedTime}</span>
                                      </div>
                                    </div>
                                    <h5 className="font-extrabold text-xs text-slate-950 pt-1">{quiz.title}</h5>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-1 pb-1">
                                      <div>
                                        <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Related Content</span>
                                        <span className="text-slate-700 font-bold truncate block">{quiz.relatedContentName}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Questions</span>
                                        <span className="text-slate-700 font-bold block">{quiz.questions.length} Qs</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center pt-2 border-t border-emerald-100/20">
                                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${
                                      quiz.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                                      quiz.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                      'bg-emerald-50 text-[#163E2B]'
                                    }`}>{quiz.difficulty.toUpperCase()}</span>
                                    <button 
                                      onClick={() => handleStartAIQuiz(quiz)}
                                      className="py-1.5 px-3.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-[10px] rounded-xl cursor-pointer transition-all active:scale-95 shadow-xs"
                                    >
                                      Start Quiz
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* 3. BY CATEGORY TABS & ALL QUIZZES */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Browse academic Quizzes</h4>
                            <span className="text-[10px] text-slate-400 font-mono">{
                              allQuizzes.filter(q => q.level === (student.level.includes('Level 1') ? 1 : student.level.includes('Level 2') ? 2 : 3)).length
                            } available</span>
                          </div>

                          {/* Category Pills */}
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {['All', 'Sutra', 'Stavan', 'Stories'].map((cat) => (
                              <button 
                                key={cat}
                                onClick={() => setQuizFilterCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold border transition-all shrink-0 cursor-pointer ${
                                  quizFilterCategory === cat 
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                  }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Quizzes Grid */}
                          <div className="space-y-3">
                            {allQuizzes
                              .filter(q => {
                                // 1. Must match student Pathshala Level
                                const sLvl = student.level.includes('Level 1') ? 1 : student.level.includes('Level 2') ? 2 : 3;
                                if (q.level !== sLvl) return false;

                                // 2. Must match category tab filter
                                if (quizFilterCategory === 'All') return true;
                                if (quizFilterCategory === 'Sutra') return q.type === 'Sutra' || q.type === 'Gatha';
                                if (quizFilterCategory === 'Stavan') return q.type === 'Stavan' || q.type === 'Stuti';
                                if (quizFilterCategory === 'Stories') return q.type === 'Jain Stories' || q.type === 'Bhagwan Stories';
                                return true;
                              })
                              .map((quiz) => (
                                <div key={quiz.id} className="bg-white border border-slate-200/60 rounded-2xl p-4 space-y-3 shadow-2xs">
                                  <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 font-bold font-mono text-[8px] rounded border border-slate-200 uppercase">{quiz.type}</span>
                                        <span className="px-1.5 py-0.5 bg-emerald-50 text-[#163E2B] font-bold font-mono text-[8px] rounded border border-emerald-100 uppercase">Level {quiz.level}</span>
                                      </div>
                                      <h5 className="font-extrabold text-xs text-slate-900 leading-snug pt-0.5">{quiz.title}</h5>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[10px] text-slate-400 font-mono block">{quiz.publishedAt}</span>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-2.5 text-[9.5px] text-slate-500 font-medium">
                                    <div>
                                      <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Content Source</span>
                                      <span className="text-slate-800 font-bold truncate block">{quiz.relatedContentName}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Questions</span>
                                      <span className="text-slate-800 font-bold block">{quiz.questions.length} Qs</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">EST. Time</span>
                                      <span className="text-slate-800 font-bold block">{quiz.estimatedTime}</span>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
                                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${
                                      quiz.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                                      quiz.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
                                      'bg-emerald-50 text-[#163E2B]'
                                    }`}>{quiz.difficulty.toUpperCase()}</span>
                                    
                                    <button 
                                      onClick={() => handleStartAIQuiz(quiz)}
                                      className="py-1.5 px-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-[10px] rounded-xl cursor-pointer transition-all active:scale-95 shadow-xs"
                                    >
                                      Start Assessment
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* 4. BY PATHSHALA LEVEL (Unlocked for past levels review) */}
                        <div className="space-y-2.5">
                          <div>
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Review Past Levels</h4>
                            <p className="text-[10px] text-slate-400">Brush up on fundamental prayers and values</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {/* Level 1 Card */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between h-[100px] shadow-2xs">
                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[8px] font-bold text-slate-500 uppercase font-mono bg-slate-200 px-1.5 py-0.5 rounded">LEVEL 1</span>
                                  <span className="text-[8px] font-extrabold text-emerald-600 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">REVIEW OK</span>
                                </div>
                                <h6 className="font-extrabold text-[10.5px] text-slate-800 mt-1.5 leading-tight">Bal Shravak Prayers</h6>
                              </div>
                              <span className="text-[9px] font-medium text-slate-500 font-mono">2 Quizzes Available</span>
                            </div>

                            {/* Level 2 Card */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between h-[100px] shadow-2xs">
                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[8px] font-bold text-slate-500 uppercase font-mono bg-slate-200 px-1.5 py-0.5 rounded">LEVEL 2</span>
                                  <span className="text-[8px] font-extrabold text-emerald-600 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">REVIEW OK</span>
                                </div>
                                <h6 className="font-extrabold text-[10.5px] text-slate-800 mt-1.5 leading-tight">Shravak Junior Prayers</h6>
                              </div>
                              <span className="text-[9px] font-medium text-slate-500 font-mono">2 Quizzes Available</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  </motion.div>
                )}

                {/* 14. QUIZ SCREEN */}
                {activeScreen === 'Quiz' && activeQuiz && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button onClick={handleExitAIQuiz} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">ACTIVE EVALUATION</span>
                          <h3 className="text-xs font-black text-[#0f172a] truncate max-w-[200px]">{activeQuiz.title}</h3>
                        </div>
                      </div>
                      {!quizShowInstructions && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold font-mono text-[10px] rounded-md border border-slate-200">
                          Q: {currentQuizIndex + 1} / {activeQuiz.questions.length}
                        </span>
                      )}
                    </div>

                    {quizShowInstructions ? (
                      /* QUIZ INSTRUCTIONS VIEW */
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        {/* Info Card */}
                        <div className="bg-white border border-slate-200/60 rounded-[24px] p-5 space-y-4 shadow-sm">
                          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-[#163E2B]">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">QUIZ INSTRUCTIONS</span>
                            <h4 className="text-base font-black text-slate-900 leading-tight">{activeQuiz.title}</h4>
                            <p className="text-[11px] text-slate-500">Please read the guidelines before beginning the assessment.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Related Content</span>
                              <span className="text-xs text-slate-850 font-extrabold truncate block">{activeQuiz.relatedContentName}</span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Total Questions</span>
                              <span className="text-xs text-slate-850 font-extrabold block">{activeQuiz.questions.length} Questions</span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Estimated Time</span>
                              <span className="text-xs text-slate-850 font-extrabold block">{activeQuiz.estimatedTime}</span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Difficulty</span>
                              <span className={`text-xs font-extrabold block ${
                                activeQuiz.difficulty === 'Beginner' ? 'text-emerald-600' :
                                activeQuiz.difficulty === 'Intermediate' ? 'text-amber-600' : 'text-[#163E2B]'
                              }`}>{activeQuiz.difficulty}</span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Pathshala Level</span>
                              <span className="text-xs text-slate-850 font-extrabold block">Level {activeQuiz.level}</span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[8px] font-bold uppercase tracking-wider font-mono">Rewards</span>
                              <span className="text-xs text-[#163E2B] font-extrabold block">+25 pts / Correct</span>
                            </div>
                          </div>
                        </div>

                        {/* Guidelines List */}
                        <div className="bg-slate-50/80 border border-slate-200/50 rounded-[22px] p-4.5 space-y-3">
                          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">How to Play</h5>
                          <ul className="space-y-2.5 text-[11px] text-slate-600 font-medium">
                            <li className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#163E2B] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                              <p className="leading-normal">Read each theological statement or question carefully.</p>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#163E2B] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                              <p className="leading-normal">The quiz contains Multiple Choice, True/False, or Fill-in-the-blanks format.</p>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#163E2B] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                              <p className="leading-normal">You can navigate between questions with <b>Previous</b> and <b>Next</b> buttons. Your answers will be saved.</p>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#163E2B] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                              <p className="leading-normal">Submit when complete. Earn 25 points per correct answer added to your overall profile score!</p>
                            </li>
                          </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={handleExitAIQuiz}
                            className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer shadow-xs text-center hover:bg-slate-50 active:scale-98 transition-all"
                          >
                            Cancel
                          </button>
                          
                          <button
                            onClick={() => setQuizShowInstructions(false)}
                            className="flex-1 py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-md text-center active:scale-98 transition-all"
                          >
                            Start Attempt
                          </button>
                        </div>
                      </motion.div>
                    ) : !quizAnswersSubmitted ? (
                      /* ACTIVE PLAY STATE */
                      <div className="space-y-4">
                        {/* Question Box */}
                        <div className="bg-white border border-slate-200/60 rounded-[22px] p-5 shadow-sm space-y-2">
                          <span className="text-[8px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Theological Statement</span>
                          <h4 className="font-bold text-[13.5px] text-slate-900 leading-relaxed">
                            {activeQuiz.questions[currentQuizIndex].question}
                          </h4>
                        </div>

                        {/* Interactive Input based on Question Type */}
                        <div className="space-y-3 pt-1">
                          {/* MCQ or True/False Option Lists */}
                          {(activeQuiz.questions[currentQuizIndex].type === 'mcq' || activeQuiz.questions[currentQuizIndex].type === 'boolean') && (
                            <div className="space-y-2.5">
                              {activeQuiz.questions[currentQuizIndex].options.map((option, idx) => {
                                const isSelected = quizAnswers[currentQuizIndex] === idx;

                                return (
                                  <div
                                    key={idx}
                                    onClick={() => handleSelectAIAnswer(idx)}
                                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex justify-between items-center text-xs font-bold ${
                                      isSelected
                                        ? 'bg-emerald-50 border-[#163E2B] text-[#0F2D1F] shadow-2xs'
                                        : 'bg-white border-slate-200/60 hover:border-slate-300 text-slate-700'
                                    }`}
                                  >
                                    <span>{option}</span>
                                    {isSelected && (
                                      <div className="w-5 h-5 rounded-full bg-[#163E2B] flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Fill-in-the-blank text field with beautiful click word bank */}
                          {activeQuiz.questions[currentQuizIndex].type === 'fill' && (
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">Your Written Answer</label>
                                <input
                                  type="text"
                                  value={String(quizAnswers[currentQuizIndex] || "")}
                                  onChange={(e) => handleSelectAIAnswer(e.target.value)}
                                  placeholder="Type your answer here or tap from word bank..."
                                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                              </div>

                              {/* Clickable Word Bank */}
                              <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-2">
                                <span className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest font-mono block">Kid-Friendly Word Bank</span>
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {activeQuiz.questions[currentQuizIndex].options.map((option, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleSelectAIAnswer(option)}
                                      className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
                                        String(quizAnswers[currentQuizIndex] || "").toLowerCase() === option.toLowerCase()
                                          ? 'bg-[#163E2B] border-[#163E2B] text-white'
                                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Prev & Next / Submit Action Row */}
                        <div className="flex gap-3 pt-3 border-t border-slate-100">
                          {/* Previous Button */}
                          <button
                            onClick={handlePrevAIQuestion}
                            disabled={currentQuizIndex === 0}
                            className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 disabled:opacity-40 font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                          >
                            Previous
                          </button>

                          {/* Next / Submit Button */}
                          {currentQuizIndex < activeQuiz.questions.length - 1 ? (
                            <button
                              onClick={handleNextAIQuestion}
                              disabled={quizAnswers[currentQuizIndex] === null || String(quizAnswers[currentQuizIndex]).trim() === ""}
                              className="flex-1 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] disabled:bg-slate-300 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                            >
                              Next Question
                            </button>
                          ) : (
                            <button
                              onClick={handleSubmitAIQuiz}
                              disabled={quizAnswers[currentQuizIndex] === null || String(quizAnswers[currentQuizIndex]).trim() === ""}
                              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-950 disabled:bg-slate-300 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow"
                            >
                              Submit Quiz
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* POST-COMPLETION RESULTS VIEW (Academic Layout) */
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="space-y-5 py-2"
                      >
                        {/* Summary Block */}
                        <div className="bg-white border border-slate-200/60 rounded-[24px] p-5 text-center space-y-3.5 shadow-sm">
                          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-[#163E2B] mx-auto">
                            <Award className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">EVALUATION COMPLETED</span>
                            <h4 className="text-base font-black text-slate-900">Quiz Performance Report</h4>
                            <p className="text-[10.5px] text-slate-500 mt-1 leading-normal">Your theological and philosophical comprehension score is computed below.</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 py-1 max-w-[320px] mx-auto text-center">
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block">Correct</span>
                              <span className="text-sm font-extrabold text-emerald-600 font-mono">{quizScore}</span>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block">Incorrect</span>
                              <span className="text-sm font-extrabold text-emerald-500 font-mono">{activeQuiz.questions.length - quizScore}</span>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block">Percentage</span>
                              <span className="text-sm font-extrabold text-slate-700 font-mono">{Math.round((quizScore / activeQuiz.questions.length) * 100)}%</span>
                            </div>
                          </div>

                          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 max-w-[320px] mx-auto text-[11px] flex justify-between items-center">
                            <span className="font-extrabold text-[#163E2B] block">Rewards Unlocked:</span>
                            <span className="text-[#163E2B] font-mono font-black">+{quizScore * 25} Points Added</span>
                          </div>
                        </div>

                        {/* Review Answers (Scrollable block) */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Review Answers</h4>

                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            {activeQuiz.questions.map((q, idx) => {
                              const sAns = quizAnswers[idx];
                              let isCorrect = false;
                              let displayAnswerStr = "";
                              let displayCorrectStr = "";

                              if (q.type === 'mcq' || q.type === 'boolean') {
                                isCorrect = sAns === q.correctAnswer;
                                displayAnswerStr = sAns !== null ? q.options[Number(sAns)] : "Not Answered";
                                displayCorrectStr = q.options[Number(q.correctAnswer)];
                              } else {
                                isCorrect = typeof sAns === 'string' && sAns.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
                                displayAnswerStr = typeof sAns === 'string' ? sAns : "Not Answered";
                                displayCorrectStr = String(q.correctAnswer);
                              }

                              return (
                                <div key={idx} className="bg-white border border-slate-200/60 rounded-xl p-3.5 space-y-2 shadow-2xs">
                                  <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-[8.5px] font-bold text-slate-400 uppercase font-mono">QUESTION {idx + 1}</span>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase font-mono ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-50 text-[#163E2B]'}`}>
                                      {isCorrect ? "Correct" : "Incorrect"}
                                    </span>
                                  </div>

                                  <h5 className="font-bold text-xs text-slate-900 leading-normal">{q.question}</h5>
                                  
                                  <div className="space-y-1 text-[10.5px] font-medium leading-normal">
                                    <p className="text-slate-500">
                                      Your Answer: <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-[#163E2B] font-bold'}>{displayAnswerStr}</span>
                                    </p>
                                    {!isCorrect && (
                                      <p className="text-slate-500">
                                        Correct Answer: <span className="text-emerald-700 font-bold">{displayCorrectStr}</span>
                                      </p>
                                    )}
                                  </div>

                                  {/* Explanation block */}
                                  <div className="bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-[10px] text-slate-500 leading-normal">
                                    <span className="font-bold text-slate-700 block">Theological Background:</span>
                                    {q.explanation}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={handleRetakeAIQuiz}
                            className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer shadow-xs text-center hover:bg-slate-50"
                          >
                            Retake Quiz
                          </button>
                          
                          <button 
                            onClick={handleExitAIQuiz}
                            className="flex-1 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-xs text-center"
                          >
                            Back to Quiz Hub
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* 15. PROFILE - STUDENT OVERVIEW SCREEN */}
                {activeScreen === 'Profile' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-5"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Student Space</span>
                        <h3 className="text-base font-black text-[#0f172a]">My Pathshala Profile</h3>
                      </div>
                      <button onClick={() => setActiveScreen('Home')} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all active:scale-95">
                        <X className="w-4.5 h-4.5 text-navy-950" />
                      </button>
                    </div>

                    {/* Guruji Simulation Mode Toggle */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-[20px] p-4 flex justify-between items-center text-xs shadow-xs">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-amber-600" />
                          Guruji Approval Simulator
                        </span>
                        <p className="text-[10px] text-amber-800 leading-tight">
                          Toggle Guruji's verification to simulate approval.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsGurujiApproved(!isGurujiApproved)}
                        className={`px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                          isGurujiApproved 
                            ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700' 
                            : 'bg-amber-500 text-white shadow-sm hover:bg-amber-600'
                        }`}
                      >
                        {isGurujiApproved ? 'Approved View' : 'Pending View'}
                      </button>
                    </div>

                    {/* Student Overview Card */}
                    <div className="bg-white border border-cream-300 rounded-[24px] p-5 shadow-xs space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <InitialBadge name={student.name} className="w-16 h-16 text-lg" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-base text-navy-950 leading-none">{student.name}</h4>
                          <span className="font-medium text-[#163E2B] text-xs block">{student.level}</span>
                          <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider">BATCH: {student.batch} • {student.teacher}</span>
                          
                          <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Current Syllabus Progress:</span>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-slate-800">
                                {(() => {
                                  const lvl = student.level ? student.level.toLowerCase() : '';
                                  let key = "Level 3: Pratikraman & Advanced Vows";
                                  if (lvl.includes('level 1') || lvl.includes('bal shala')) key = "Level 1: Basic Sutras & Stories";
                                  else if (lvl.includes('level 2') || lvl.includes('kumar shala')) key = "Level 2: Jain Geography & Symbols";
                                  const syllabus = syllabusDataState[key] || syllabusDataState["Level 3: Pratikraman & Advanced Vows"];
                                  let comp = 0, tot = 0;
                                  syllabus.chapters.forEach(ch => ch.topics.forEach(t => { tot++; if (t.status === 'Approved') comp++; }));
                                  const pct = tot > 0 ? Math.round((comp / tot) * 100) : 0;
                                  return `${comp} / ${tot} Gathas (${pct}%)`;
                                })()}
                              </span>
                            </div>
                            
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-2">Promotion Status:</span>
                            <div className="flex items-center gap-2">
                              {(!student.promotionStatus || student.promotionStatus === 'Learning') && (
                                <>
                                  <span className="text-sm">🟢</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800">Learning</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Currently completing the syllabus.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Revision Pending' && (
                                <>
                                  <span className="text-sm">🟡</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-orange-800">Revision Stage</span>
                                    <span className="text-[9px] text-slate-500 font-medium">All Gathas approved. Revising with teacher.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Awaiting Promotion' && (
                                <>
                                  <span className="text-sm">🟠</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-amber-800">Awaiting Promotion</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Teacher recommended. Waiting for Admin.</span>
                                  </div>
                                </>
                              )}
                              {student.promotionStatus === 'Promoted' && (
                                <>
                                  <span className="text-sm">🔵</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-emerald-800">Promoted</span>
                                    <span className="text-[9px] text-slate-500 font-medium">Promoted to the next level.</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {student.completedLevels && student.completedLevels.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[8.5px] font-bold text-slate-400 uppercase block tracking-wider mb-1">Completed Levels</span>
                          <div className="flex flex-wrap gap-1.5">
                            {student.completedLevels.map((lvl, idx) => (
                              <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-md text-[9px] font-semibold">
                                ✓ {lvl}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Brief Overview Metrics block */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 gap-3">
                        <div className="bg-white border border-cream-100 p-3 rounded-xl">
                          <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block">Monthly Gathas</span>
                          {isGurujiApproved ? (
                            <span className="text-xs font-extrabold text-navy-955 block mt-1">12 Completed</span>
                          ) : (
                            <span className="text-[9.5px] font-bold text-amber-600 block mt-1">Awaiting Approval</span>
                          )}
                        </div>
                        <div className="bg-white border border-cream-100 p-3 rounded-xl">
                          <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block">Overall Score</span>
                          {isGurujiApproved ? (
                            <span className="text-xs font-extrabold text-[#163E2B] block mt-1 font-mono">{overallPerformanceScore} Points</span>
                          ) : (
                            <span className="text-[9.5px] font-bold text-amber-600 block mt-1">Awaiting Approval</span>
                          )}
                        </div>
                        <div className="bg-white border border-cream-100 p-3 rounded-xl col-span-2">
                          <span className="text-[8px] font-bold text-slate-400 uppercase font-mono block mb-1">Monthly Attendance Summary</span>
                          <div className="flex justify-between text-[11px] font-semibold text-[#0f172a]">
                            <span>Present: {monthlyPresentCount} Days</span>
                            <span className="text-slate-400">|</span>
                            <span>Absent: {monthlyPresentCount === 18 ? 2 : 3} Days</span>
                            <span className="text-slate-400">|</span>
                            <span>Leave: 1 Day</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons for the 5 sub-sections */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Profile Sections</span>

                      {/* 1. Attendance Screen Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileAttendance')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Attendance Tracker</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Present: 18 Days | Absent: 2 Days | Holiday: 4 Days</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 2. Learning Progress Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileReportCard')}
                        className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#163E2B] flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-[#163E2B]">Learning Progress</h4>
                            <p className="text-[10px] text-[#163E2B] font-medium">Gathas Recited: 36 | Academic Standing & Report Card</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#163E2B]" />
                      </button>

                      {/* 3. Guruji Approval Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileGurujiApproval')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Guruji Approval Status</h4>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {isGurujiApproved ? 'Verified & Approved' : 'Awaiting Review'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 4. Bonus Points Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileBonusPoints')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Bonus Points</h4>
                            <p className="text-[10px] text-slate-500 font-medium">+250 Points from Religious Events</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 5. Change Batch Button */}
                      <button 
                        onClick={() => setActiveScreen('ProfileBatchChange')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Users className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Change Batch</h4>
                            <p className="text-[10px] text-slate-500 font-medium">View and switch class timings</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                      {/* 6. Offline Downloads Button */}
                      <button 
                        onClick={() => setActiveScreen('Downloads')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Download className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Offline Downloads</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Access saved Sutras & Stavans offline</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 7. Application Settings Button */}
                      <button 
                        onClick={() => setActiveScreen('Settings')}
                        className="w-full p-4 bg-white hover:bg-cream-50 border border-cream-300 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Settings className="w-4 h-4 text-[#163E2B]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0f172a]">Application Settings</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Manage language preference & configurations</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* Management Section */}
                      <div className="pt-3 space-y-2">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Management</span>
                        
                        <button 
                          onClick={() => setActiveScreen('AdminPanel')}
                          className="w-full p-4 bg-[#fff8f6] hover:bg-[#ffede8] border border-emerald-200/90 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all active:scale-99 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#163E2B] text-white flex items-center justify-center shadow-xs">
                              <Shield className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#0F2D1F]">Admin Portal</h4>
                              <p className="text-[10px] text-[#163E2B] font-medium">Access executive management dashboard & office tools</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#163E2B]" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PROFILE SUB-SCREEN 2: ATTENDANCE SCREEN */}
                {activeScreen === 'ProfileAttendance' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all active:scale-95">
                        <ChevronLeft className="w-5 h-5 text-navy-950" />
                      </button>
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Student Space</span>
                        <h3 className="text-base font-black text-[#0f172a]">Attendance History</h3>
                      </div>
                    </div>

                    {/* Stats Summary Panel */}
                    <div className="bg-white border border-slate-200 rounded-[24px] p-4.5 space-y-3 shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">June 2026 Attendance Metrics</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-3.5 rounded-xl space-y-0.5 border border-slate-100">
                          <span className="text-[8.5px] font-bold text-slate-400 uppercase block font-mono">Monthly Record</span>
                          <span className="text-xs font-extrabold text-slate-800 block">Present: 18 Days</span>
                          <span className="text-[9.5px] text-[#163E2B] font-bold block">Absent: 2 Days</span>
                          <span className="text-[9.5px] text-amber-700 font-bold block">Holiday: 4 Days</span>
                          <span className="text-[9.5px] text-slate-500 font-bold block">Leave: 1 Day</span>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl space-y-0.5 border border-slate-100">
                          <span className="text-[8.5px] font-bold text-slate-400 uppercase block font-mono">Overall Cumulative</span>
                          <span className="text-xs font-extrabold text-slate-800 block">Present: {overallPresentCount} Days</span>
                          <span className="text-[9.5px] text-[#163E2B] font-bold block">Absent: {overallPresentCount === 54 ? 6 : 7} Days</span>
                          <span className="text-[9.5px] text-amber-700 font-bold block">Holiday: 12 Days</span>
                          <span className="text-[9.5px] text-slate-500 font-bold block">Leave: 3 Days</span>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Grid Calendar (June 2026) */}
                    <div className="bg-white border border-cream-300 rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-cream-100">
                        <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-wider font-mono">June 2026 Daily Log</span>
                        <span className="text-[9.5px] font-bold text-slate-400">30 Class Tracking Days</span>
                      </div>

                      {/* Day of week headers */}
                      <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-black text-slate-400 uppercase font-mono">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                      </div>

                      {/* Calendar days mapping */}
                      <div className="grid grid-cols-7 gap-1.5">
                        {attendanceDays.map((d) => {
                          let styleClasses = "";
                          if (d.status === 'P') styleClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
                          else if (d.status === 'A') styleClasses = "bg-emerald-50 text-[#163E2B] border-emerald-200";
                          else if (d.status === 'H') styleClasses = "bg-slate-50 text-slate-800 border-slate-200";
                          else if (d.status === 'O') styleClasses = "bg-amber-50 text-amber-800 border-amber-200";
                          else styleClasses = "bg-slate-100 text-slate-700 border-slate-200";
                          return (
                            <div
                              key={d.day}
                              className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-0.5 text-center transition-all ${styleClasses}`}
                            >
                              <span className="text-[9.5px] font-black font-mono leading-none">{d.day}</span>
                              <span className="text-[7.5px] font-bold block leading-none mt-0.5">{d.status}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-5 gap-1 pt-2 border-t border-cream-100 text-[8.5px] font-bold uppercase font-mono text-slate-500 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-[7px] font-black">P</span>
                          <span>Present</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 text-[#163E2B] border border-emerald-200 flex items-center justify-center text-[7px] font-black">A</span>
                          <span>Absent</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center text-[7px] font-black">H</span>
                          <span>Holiday</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center text-[7px] font-black">O</span>
                          <span>Optional</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center text-[7px] font-black">L</span>
                          <span>Leave</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PROFILE SUB-SCREEN 4: GURUJI APPROVAL SCREEN */}
                {activeScreen === 'ProfileGurujiApproval' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all active:scale-95">
                        <ChevronLeft className="w-5 h-5 text-navy-950" />
                      </button>
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Academic Portal</span>
                        <h3 className="text-base font-black text-[#0f172a]">Instructor Review</h3>
                      </div>
                    </div>

                    {/* Verification Status Card */}
                    <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Evaluation Status</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          isGurujiApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {isGurujiApproved ? 'Fully Verified & Signed' : 'Under Review'}
                        </span>
                      </div>

                      {/* Progress Evaluation Details */}
                      <div className="space-y-4 pt-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Sutra & Gatha Recitation</span>
                            <p className="text-sm font-bold text-slate-950">
                              {isGurujiApproved ? '12 Gathas (Chapter 4 Recitation)' : 'Chapter 4 Recitation Exam'}
                            </p>
                            <p className="text-[11px] text-slate-500">Oral pronunciation check and voice submission evaluation</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isGurujiApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {isGurujiApproved ? 'Approved' : 'Awaiting Audit'}
                          </span>
                        </div>

                        <hr className="border-slate-100" />

                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Academic Study Merits</span>
                            <p className="text-sm font-bold text-slate-950">
                              {isGurujiApproved ? `${overallPerformanceScore} Merits Verified` : `${overallPerformanceScore} Study Points`}
                            </p>
                            <p className="text-[11px] text-slate-500 font-sans">Cumulative academic points and daily attendance validation</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isGurujiApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {isGurujiApproved ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Official Details & Remarks */}
                    <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Auditor Registry</span>
                        <h4 className="text-sm font-bold text-slate-800">Guruji Audit Information</h4>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <span className="text-slate-550 font-medium">Official Evaluator</span>
                          <span className="font-bold text-slate-900">Pujya Samanji Pragya ji</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <span className="text-slate-550 font-medium">Last Evaluation Date</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {isGurujiApproved ? 'June 28, 2026' : 'Pending Final Audit'}
                          </span>
                        </div>
                        <div className="space-y-2 pt-1">
                          <span className="text-slate-550 font-medium block">Auditor Feedback & Guidance</span>
                          <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-100 leading-relaxed font-serif">
                            {isGurujiApproved 
                              ? '"Excellent pronunciation and grasp of sutra rhythm. Pratikraman memorization and daily niyam tracking verified. Keep progressing Aarav! You are progressing beautifully on your path of spiritual learning."'
                              : '"Submitted. Awaiting review. Guruji will provide feedback on your Chapter 4 recitation and daily logs shortly. Keep up the sincere daily studies."'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PROFILE SUB-SCREEN 5: BONUS POINTS SCREEN */}
                {activeScreen === 'ProfileBonusPoints' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-5"
                  >
                    {selectedBonusPoint ? (
                      /* Sub-Screen: Bonus Point Details */
                      <div className="space-y-5">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedBonusPoint(null)} 
                            className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all active:scale-95"
                          >
                            <ChevronLeft className="w-5 h-5 text-navy-950" />
                          </button>
                          <div>
                            <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Bonus Details</span>
                            <h3 className="text-base font-black text-[#0f172a]">Spiritual Achievement Record</h3>
                          </div>
                        </div>

                        {/* Detailed Record Card */}
                        <div className="bg-white border-2 border-cream-350 rounded-[24px] p-6 shadow-xs space-y-5">
                          <div>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#163E2B] text-[10px] font-black uppercase tracking-wider font-mono rounded-full border border-emerald-200/50">
                              {selectedBonusPoint.category}
                            </span>
                            <h4 className="text-lg font-black text-navy-950 mt-2.5 leading-tight">
                              {selectedBonusPoint.eventName}
                            </h4>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <span className="text-[8px] font-bold text-slate-450 uppercase font-mono block">Verification Date</span>
                              <span className="text-xs font-black text-slate-800 block mt-1 font-mono">
                                {new Date(selectedBonusPoint.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <span className="text-[8px] font-bold text-slate-450 uppercase font-mono block">Spiritual Merit Points</span>
                              <span className="text-xs font-black text-[#163E2B] block mt-1 font-mono">
                                +{selectedBonusPoint.pointsAwarded} Points
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[9.5px] font-bold text-slate-450 uppercase tracking-wider block font-mono">Official Explanation / Reason:</span>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed font-medium">
                              {selectedBonusPoint.description || 'No additional details provided. Verified by Pathshala administration.'}
                            </div>
                          </div>

                          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <p className="text-[10px] text-emerald-850 font-bold">
                              Verified as an official educational achievement. Already calculated in your overall student performance standings.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedBonusPoint(null)}
                          className="w-full py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-full shadow-md cursor-pointer transition-all text-center"
                        >
                          Return to Bonus Points Ledger
                        </button>
                      </div>
                    ) : (
                      /* Main Screen: Bonus Points List */
                      <div className="space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all active:scale-95">
                              <ChevronLeft className="w-5 h-5 text-navy-950" />
                            </button>
                            <div>
                              <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Student Space</span>
                              <h3 className="text-base font-black text-[#0f172a]">Bonus Spiritual Points</h3>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowAddBonusModal(!showAddBonusModal)}
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#163E2B] font-extrabold text-[10.5px] rounded-full flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                          >
                            <span>{showAddBonusModal ? 'View Ledger' : 'Record Activity'}</span>
                          </button>
                        </div>

                        {/* Bonus Explanation Card */}
                        <div className="bg-amber-50/70 border border-amber-200/60 rounded-[24px] p-5 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4.5 h-4.5 text-amber-600" />
                            <span className="text-[10px] font-extrabold text-amber-950 uppercase tracking-wider font-mono">Spiritual Extras Summary</span>
                          </div>
                          <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                            These points are awarded for participation in special holy functions, voluntary vows, and spiritual events. Once logged, they are automatically computed inside the student's overall performance standings.
                          </p>
                          <div className="bg-white/80 border border-amber-200 p-3.5 rounded-xl mt-1 flex justify-between items-center">
                            <div>
                              <span className="text-[8.5px] font-bold text-slate-400 uppercase font-mono block">Cumulative Extra Earned</span>
                              <span className="text-base font-black text-[#163E2B] block font-mono mt-0.5">+{totalBonusPoints} Points Extra</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[8.5px] font-bold text-slate-400 uppercase font-mono block">Overall Performance Standing</span>
                              <span className="text-[11px] font-black text-emerald-800 uppercase block mt-0.5">{overallPerformanceScore} / 900</span>
                            </div>
                          </div>
                        </div>

                        {/* Form: Record New Bonus Point Achievement */}
                        {showAddBonusModal && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-cream-50 border-2 border-cream-250 rounded-[24px] p-5 space-y-4"
                          >
                            <div>
                              <h4 className="text-xs font-black text-navy-950 uppercase tracking-wider font-mono">Record Special Religious Activity</h4>
                              <p className="text-[10px] text-slate-500 font-medium">Add verified participation points to the academic register.</p>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="block text-[9.5px] font-black uppercase tracking-wider font-mono text-slate-600 mb-1">Event Name / Activity</label>
                                <input
                                  type="text"
                                  placeholder="e.g., Gyan Panchami Devotional Class"
                                  value={newBonusEventName}
                                  onChange={(e) => setNewBonusEventName(e.target.value)}
                                  className="w-full p-2.5 bg-white border border-cream-300 rounded-xl text-xs font-bold text-[#0f172a] focus:ring-1 focus:ring-emerald-600 focus:outline-hidden"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[9.5px] font-black uppercase tracking-wider font-mono text-slate-600 mb-1">Category Type</label>
                                  <select
                                    value={newBonusCategory}
                                    onChange={(e) => setNewBonusCategory(e.target.value)}
                                    className="w-full p-2.5 bg-white border border-cream-300 rounded-xl text-xs font-bold text-[#0f172a] focus:ring-1 focus:ring-emerald-600 focus:outline-hidden"
                                  >
                                    <option value="Paryushan">Paryushan</option>
                                    <option value="Oli Ji">Oli Ji</option>
                                    <option value="Gyan Panchami">Gyan Panchami</option>
                                    <option value="Maun Gyaras">Maun Gyaras</option>
                                    <option value="Major Religious Events">Major Religious Events</option>
                                    <option value="Sunday Classes">Sunday Classes</option>
                                    <option value="Activities">Activities</option>
                                    <option value="Extra Classes">Extra Classes</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[9.5px] font-black uppercase tracking-wider font-mono text-slate-600 mb-1">Points Awarded</label>
                                  <input
                                    type="number"
                                    min="10"
                                    max="200"
                                    value={newBonusPoints}
                                    onChange={(e) => setNewBonusPoints(parseInt(e.target.value) || 0)}
                                    className="w-full p-2.5 bg-white border border-cream-300 rounded-xl text-xs font-bold text-[#0f172a] focus:ring-1 focus:ring-emerald-600 focus:outline-hidden font-mono"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                  <label className="block text-[9.5px] font-black uppercase tracking-wider font-mono text-slate-600 mb-1">Activity Date</label>
                                  <input
                                    type="date"
                                    value={newBonusDate}
                                    onChange={(e) => setNewBonusDate(e.target.value)}
                                    className="w-full p-2.5 bg-white border border-cream-300 rounded-xl text-xs font-bold text-[#0f172a] focus:ring-1 focus:ring-emerald-600 focus:outline-hidden font-mono"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[9.5px] font-black uppercase tracking-wider font-mono text-slate-600 mb-1">Short Description / Reason (Optional)</label>
                                <textarea
                                  placeholder="Describe the child's dedication or activity detail."
                                  rows={2}
                                  value={newBonusDescription}
                                  onChange={(e) => setNewBonusDescription(e.target.value)}
                                  className="w-full p-2.5 bg-white border border-cream-300 rounded-xl text-xs font-semibold text-[#0f172a] focus:ring-1 focus:ring-emerald-600 focus:outline-hidden resize-none"
                                />
                              </div>

                              <div className="flex gap-2.5 pt-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!newBonusEventName.trim()) {
                                      alert("Please enter an activity/event name.");
                                      return;
                                    }
                                    const newRecord = {
                                      id: String(Date.now()),
                                      category: newBonusCategory,
                                      eventName: newBonusEventName.trim(),
                                      date: newBonusDate,
                                      pointsAwarded: newBonusPoints,
                                      description: newBonusDescription.trim() || undefined
                                    };
                                    setBonusPointsRecords(prev => [newRecord, ...prev]);
                                    
                                    // Reset fields
                                    setNewBonusEventName('');
                                    setNewBonusDescription('');
                                    setShowAddBonusModal(false);
                                    
                                    // Toast or simple educational notification
                                    setNotifications(prev => [
                                      {
                                        id: Date.now(),
                                        title: `New spiritual achievement added: ${newRecord.eventName} (+${newRecord.pointsAwarded} Points)`,
                                        time: "Just now",
                                        unread: true
                                      },
                                      ...prev
                                    ]);
                                  }}
                                  className="flex-1 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-xs rounded-full shadow-sm cursor-pointer transition-all"
                                >
                                  Submit to Academic Register
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowAddBonusModal(false)}
                                  className="px-4 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full cursor-pointer transition-all"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Detailed Bonus Points Ledger Table */}
                        <div className="bg-white border border-slate-200 rounded-[24px] p-4.5 shadow-sm space-y-3.5">
                          <span className="text-[9.5px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Event Attendance Ledger</span>
                          
                          <div className="space-y-3">
                            {bonusPointsRecords.map((item) => (
                              <div 
                                key={item.id} 
                                onClick={() => setSelectedBonusPoint(item)}
                                className="p-4 border-2 border-slate-100 hover:border-emerald-200 bg-slate-50/50 rounded-xl space-y-1.5 transition-all duration-200 cursor-pointer active:scale-99 hover:shadow-xs"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[8.5px] font-black uppercase tracking-wider font-mono rounded">
                                      {item.category}
                                    </span>
                                    <h4 className="text-xs font-extrabold text-slate-800 mt-1 leading-tight">
                                      {item.eventName}
                                    </h4>
                                  </div>
                                  <span className="px-2.5 py-0.5 bg-emerald-50 text-[#163E2B] text-[10px] font-black font-mono rounded-full shrink-0">
                                    +{item.pointsAwarded} Points
                                  </span>
                                </div>

                                {item.description && (
                                  <p className="text-[10px] text-slate-500 line-clamp-1 leading-relaxed font-medium">
                                    {item.description}
                                  </p>
                                )}

                                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono pt-1 border-t border-dashed border-slate-200">
                                  <span>STATUS: Verified Record</span>
                                  <span>
                                    {new Date(item.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 16. Learning Progress Screen */}
                {activeScreen === 'ProfileReportCard' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white text-slate-900 min-h-screen font-sans max-w-xl mx-auto py-6 px-4 space-y-6"
                  >
                    {/* Action Bar */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 print:hidden">
                      <button 
                        onClick={() => navigateBack()} 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Profile</span>
                      </button>
                      <button 
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>
                    </div>

                    {/* Print Header */}
                    <div className="hidden print:block text-center pb-6 border-b border-slate-200">
                      <h1 className="text-xl font-bold tracking-tight">Learning Progress Report</h1>
                      <p className="text-xs text-slate-500 mt-0.5">Official Student Record • Gyan Vatika</p>
                    </div>

                    {/* Student Profile (Stacked layout) */}
                    <div className="space-y-3 pb-5 border-b border-slate-100">
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{student.name}</h1>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                            {student.level}
                          </span>
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                            {student.batch || "Saturdays, 05:30 PM"}
                          </span>
                        </div>
                        <div className="pt-1">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isGurujiApproved 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${isGurujiApproved ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {isGurujiApproved ? "Guruji Approved" : "Awaiting Approval"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Learning Overview (2x2 equal grid) */}
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-800">Learning Overview</h2>
                        <p className="text-xs text-slate-500">Key educational and recitation metrics</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Card 1: Attendance Score */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-start gap-2 h-full justify-between shadow-xs">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">
                              {student.attendanceScore}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Attendance Score</p>
                          </div>
                        </div>

                        {/* Card 2: Gatha Score */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-start gap-2 h-full justify-between shadow-xs">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">
                              {student.gathaScore}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Gatha Score</p>
                          </div>
                        </div>

                        {/* Card 3: Bonus Points */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-start gap-2 h-full justify-between shadow-xs">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <Award className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight font-mono">
                              {totalBonusPoints}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Bonus Points</p>
                          </div>
                        </div>

                        {/* Card 4: Overall Score */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-start gap-2 h-full justify-between shadow-xs">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                            <Trophy className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight font-mono">
                              {overallPerformanceScore}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Overall Score</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Summary (2x2 grid) */}
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-800">Attendance Summary</h2>
                        <p className="text-xs text-slate-500">Active classroom attendance statistics</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col gap-1 shadow-xs">
                          <span className="text-[10px] text-slate-500 font-medium">Present Days</span>
                          <span className="text-lg font-extrabold text-emerald-600 font-mono">{monthlyPresentCount}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col gap-1 shadow-xs">
                          <span className="text-[10px] text-slate-500 font-medium">Absent Days</span>
                          <span className="text-lg font-extrabold text-emerald-500 font-mono">{monthlyPresentCount === 18 ? 2 : 3}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col gap-1 shadow-xs">
                          <span className="text-[10px] text-slate-500 font-medium">Leave Days</span>
                          <span className="text-lg font-extrabold text-slate-600 font-mono">1</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col gap-1 shadow-xs">
                          <span className="text-[10px] text-slate-500 font-medium">Holiday Days</span>
                          <span className="text-lg font-extrabold text-amber-600 font-mono">4</span>
                        </div>
                      </div>
                    </div>

                    {/* Academic Performance (Normal horizontal cards) */}
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-800">Academic Performance</h2>
                        <p className="text-xs text-slate-500">Continuous evaluations and classroom indicator</p>
                      </div>

                      <div className="space-y-3">
                        {/* Monthly Performance Card */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-slate-700">Monthly Performance</span>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-mono">
                              {Math.round((monthlyPresentCount / 20) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${(monthlyPresentCount / 20) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Overall Performance Card */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-slate-700">Overall Performance</span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
                              {student.attendance}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                        </div>

                        {/* Merit Rating Card (with clean Badge) */}
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <p className="text-[9px] text-slate-400 font-medium">Academic Merit Rating</p>
                            <h3 className="text-xs font-bold text-slate-800 leading-tight">
                              {overallPerformanceScore >= 751 ? "Outstanding Academic Honors" : "Satisfactory Performance"}
                            </h3>
                          </div>
                          <span className="text-[10px] font-bold text-white bg-slate-900 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 font-mono">
                            {overallPerformanceScore >= 751 ? "Excellent" : "Good"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Guruji Review */}
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-800">Guruji Review</h2>
                        <p className="text-xs text-slate-500">Instructor evaluation and feedback</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="grid grid-cols-2 gap-3 border-b border-slate-200/60 pb-3">
                          <div>
                            <p className="text-[10px] text-slate-500">Review Status</p>
                            <h4 className="text-xs font-semibold text-slate-800 mt-0.5">
                              {isGurujiApproved ? "Verified & Signed" : "Under Review"}
                            </h4>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500">Approval Date</p>
                            <h4 className="text-xs font-semibold text-slate-800 mt-0.5">
                              {isGurujiApproved ? "June 30, 2026" : "Awaiting Review"}
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500">Latest Remarks</p>
                          <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-100">
                            {isGurujiApproved 
                              ? '"Excellent pronunciation and grasp of sutra rhythm. Pratikraman memorization and daily niyam tracking verified. Keep progressing Aarav! You are progressing beautifully on your path of spiritual learning."'
                              : '"Outstanding commitment to your daily rituals and sutra studies. We are deeply proud of your continuous spiritual development and positive classroom participation. Awaiting oral examination video verification to update additional recitation ratings."'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bonus Credits */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <h2 className="text-base font-bold text-slate-800">Bonus Credits</h2>
                          <p className="text-xs text-slate-500">Merits from spiritual events</p>
                        </div>
                        <button
                          onClick={() => setActiveScreen('ProfileBonusPoints')}
                          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer print:hidden"
                        >
                          Adjust Ledger
                        </button>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex justify-between items-center bg-white border border-slate-100 p-3 rounded-xl">
                          <div>
                            <h4 className="text-xs font-semibold text-slate-800">Bonus Credits Earned</h4>
                            <p className="text-[9px] text-slate-400 mt-0.5">Included in overall score</p>
                          </div>
                          <span className="text-sm font-bold text-indigo-600">+{totalBonusPoints} pts</span>
                        </div>

                        <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-xl overflow-hidden">
                          {bonusPointsRecords.map(record => (
                            <div key={record.id} className="p-3 flex justify-between items-center gap-3 hover:bg-slate-50/50 transition-colors">
                              <div className="min-w-0 flex-1">
                                <h5 className="text-xs font-semibold text-slate-800 truncate">{record.eventName}</h5>
                                <div className="flex items-center gap-1.5 text-[9px] text-slate-400 mt-0.5">
                                  <span>{record.category}</span>
                                  <span>•</span>
                                  <span>{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                                +{record.pointsAwarded}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
                        <p className="text-xs text-slate-500">Timeline of student learning events</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-xs">
                        <div className="space-y-4 relative before:absolute before:inset-0 before:left-2 before:h-full before:w-0.5 before:bg-slate-200">
                          {/* Event 1 */}
                          <div className="relative flex items-start pl-6 gap-3">
                            <div className="absolute left-0.5 top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-white" />
                            <div>
                              <h4 className="text-xs font-semibold text-slate-800">Gatha Approved</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {isGurujiApproved 
                                  ? "Chapter 4: Advanced Recitations & Homework verified by Pujya Samanji"
                                  : "Chapter 3: Jiva-Ajiva Tatva & Cosmology completed"
                                }
                              </p>
                            </div>
                          </div>

                          {/* Event 2 */}
                          <div className="relative flex items-start pl-6 gap-3">
                            <div className="absolute left-0.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                            <div>
                              <h4 className="text-xs font-semibold text-slate-800">Live Class Attended</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">Attended Level 3 Live Class - Pratikraman Sutras (Part 1)</p>
                            </div>
                          </div>

                          {/* Event 3 */}
                          <div className="relative flex items-start pl-6 gap-3">
                            <div className="absolute left-0.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white" />
                            <div>
                              <h4 className="text-xs font-semibold text-slate-800">Daily Niyam Submitted</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">Completed and submitted all 5 daily rituals on June 30, 2026</p>
                            </div>
                          </div>

                          {/* Event 4 */}
                          <div className="relative flex items-start pl-6 gap-3">
                            <div className="absolute left-0.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white" />
                            <div>
                              <h4 className="text-xs font-semibold text-slate-800">Bonus Credits Added</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">Received +50 points for extra-curricular Swadhyay attendance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Statement */}
                    <div className="text-center text-[10px] text-slate-400 pt-6 border-t border-slate-100 font-sans">
                      Generated via Gyan Vatika Academic Portal. This is an official digital student record.
                    </div>
                  </motion.div>
                )}

                {/* 16.5 PROFILE - BATCH CHANGE */}
                {activeScreen === 'ProfileBatchChange' && (() => {
                  const availableBatches = [
                    { id: 'batch_1', name: 'Batch A - Weekend', teacher: 'Rajvi Shah', days: 'Saturdays', time: '05:30 PM' },
                    { id: 'batch_2', name: 'Batch B - Weekend', teacher: 'Krupa Shah', days: 'Sundays', time: '10:00 AM' },
                    { id: 'batch_3', name: 'Batch C - Weekday', teacher: 'Sneha Doshi', days: 'Tuesdays', time: '06:00 PM' },
                    { id: 'batch_4', name: 'Batch D - Weekday', teacher: 'Amit Jain', days: 'Thursdays', time: '07:30 PM' },
                  ];

                  const currentMonth = new Date().toISOString().slice(0, 7);
                  
                  // Limit logic resets if we are in a new month
                  let changesLeft = student.batchChangesRemaining ?? 5;
                  let lastMonth = student.lastBatchChangeMonth || currentMonth;
                  if (lastMonth !== currentMonth) {
                     changesLeft = 5;
                  }

                  const noChangesLeft = changesLeft <= 0;

                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-5 space-y-6 pb-24 max-w-2xl mx-auto"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setActiveScreen('Profile')} 
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <div>
                          <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Batch Management</span>
                          <h3 className="text-lg font-black text-slate-900">Change Batch</h3>
                        </div>
                      </div>

                      {/* Current Batch Info */}
                      <div className="bg-white border-2 border-emerald-100 rounded-[20px] p-5 shadow-xs">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Current Assignment</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Level</span>
                            <span className="text-sm font-black text-slate-800">{student.level}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Teacher</span>
                            <span className="text-sm font-black text-slate-800">{student.teacher}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Batch</span>
                            <span className="text-sm font-black text-[#163E2B]">{student.batch}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Class Timing</span>
                            <span className="text-sm font-black text-slate-800">{student.classTiming}</span>
                          </div>
                        </div>
                      </div>

                      {/* Remaining Changes Indicator */}
                      <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-xs font-bold text-slate-700">Batch Changes Remaining:</span>
                        </div>
                        <span className={`text-lg font-black ${noChangesLeft ? 'text-emerald-600' : 'text-emerald-600'} font-mono`}>
                          {changesLeft} / 5
                        </span>
                      </div>
                      
                      {noChangesLeft && (
                        <div className="bg-emerald-50 text-[#163E2B] p-3 rounded-xl text-xs font-bold flex items-start gap-2 border border-emerald-200">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          You have reached the monthly batch change limit.
                        </div>
                      )}

                      {/* Available Batches */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Batches ({student.level})</h4>
                        
                        <div className="space-y-3">
                          {availableBatches.filter(b => b.name !== student.batch).map(batch => (
                            <div key={batch.id} className="bg-white border border-slate-200 rounded-[20px] p-4 flex items-center justify-between shadow-xs">
                              <div className="space-y-1 text-left">
                                <h5 className="font-black text-sm text-slate-800">{batch.name}</h5>
                                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2">
                                  <span>{batch.teacher}</span>
                                  <span>•</span>
                                  <span>{batch.days}, {batch.time}</span>
                                </div>
                              </div>
                              
                              <button
                                disabled={noChangesLeft}
                                onClick={() => {
                                  if (noChangesLeft) return;
                                  
                                  setStudent(prev => ({
                                    ...prev,
                                    batch: batch.name,
                                    teacher: batch.teacher,
                                    classTiming: `${batch.days}, ${batch.time}`,
                                    batchChangesRemaining: changesLeft - 1,
                                    lastBatchChangeMonth: currentMonth
                                  }));
                                  
                                  alert(`Successfully changed batch to ${batch.name}!`);
                                  setActiveScreen('Profile');
                                }}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                                  noChangesLeft 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-[#163E2B] text-white hover:bg-[#0F2D1F] active:scale-95 shadow-md shadow-[#163E2B]/20 cursor-pointer'
                                }`}
                              >
                                Select
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* 17. DOWNLOADS */}
                {activeScreen === 'Downloads' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="max-w-2xl mx-auto px-6 py-8 space-y-8"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => navigateBack()} 
                        className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100 cursor-pointer"
                        aria-label="Back to Home"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Downloads</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Files available offline for study and chant listening</p>
                      </div>
                    </div>

                    {/* Offline Status Alert */}
                    <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                        <DownloadCloud className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-slate-800">Offline Mode Active</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          All downloaded files are saved locally on your device. You can view scriptures and play chanted audio tracks anytime without internet access.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Section 1: Study Materials */}
                      {downloads.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-400 tracking-wide uppercase px-1">Study Guides & Slides</h4>
                          <div className="space-y-3">
                            {downloads.map((file) => (
                              <div 
                                key={file.id} 
                                className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between shadow-xs hover:border-slate-200 transition-all duration-200"
                              >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                    file.type === 'pdf' ? 'bg-emerald-50 text-emerald-500' : 'bg-emerald-50 text-[#163E2B]'
                                  }`}>
                                    {file.type === 'pdf' ? <FileText className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-semibold text-sm text-slate-800 truncate pr-2">{file.name}</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[11px] text-slate-400 font-medium">{file.size}</span>
                                      <span className="text-[11px] text-slate-300">•</span>
                                      <span className="text-[11px] text-[#163E2B] font-semibold flex items-center gap-1 bg-emerald-50/50 px-1.5 py-0.5 rounded-md">
                                        <CheckCircle className="w-3 h-3" /> Available offline
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setDownloads(downloads.filter(d => d.id !== file.id));
                                      alert(`${file.name} deleted from local offline storage to free space.`);
                                    }}
                                    className="w-9 h-9 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Delete file"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 2: Dynamic Sutra Texts */}
                      {downloadedSutras.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-400 tracking-wide uppercase px-1">Sutra Text Materials</h4>
                          <div className="space-y-3">
                            {sutrasList.filter(s => downloadedSutras.includes(s.id)).map(sutra => (
                              <div 
                                key={`text-${sutra.id}`} 
                                className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between shadow-xs hover:border-slate-200 transition-all duration-200"
                              >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-semibold text-sm text-slate-800 truncate pr-2">{sutra.name} (Text)</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[11px] text-slate-400 font-medium">Level {sutra.level} • {sutra.prakrit.length} Verses</span>
                                      <span className="text-[11px] text-slate-300">•</span>
                                      <span className="text-[11px] text-[#163E2B] font-semibold flex items-center gap-1 bg-emerald-50/50 px-1.5 py-0.5 rounded-md">
                                        <CheckCircle className="w-3 h-3" /> Available offline
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setSelectedSutra(sutra);
                                      setSutraLanguage(selectedLanguage);
                                      setActiveScreen('SutraDetails');
                                    }}
                                    className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] rounded-full text-xs font-semibold transition-colors cursor-pointer"
                                  >
                                    View
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setDownloadedSutras(prev => prev.filter(id => id !== sutra.id));
                                      alert(`${sutra.name} Text removed from offline storage.`);
                                    }}
                                    className="w-9 h-9 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Delete file"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 3: Dynamic Sutra Audio */}
                      {downloadedSutraAudios.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-400 tracking-wide uppercase px-1">Sutra Audio Chants</h4>
                          <div className="space-y-3">
                            {sutrasList.filter(s => downloadedSutraAudios.includes(s.id)).map(sutra => (
                              <div 
                                key={`audio-${sutra.id}`} 
                                className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between shadow-xs hover:border-slate-200 transition-all duration-200"
                              >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                                    <Volume2 className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-semibold text-sm text-slate-800 truncate pr-2">{sutra.name} (Audio)</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[11px] text-slate-400 font-medium">Level {sutra.level} • {sutra.audioDuration} mins</span>
                                      <span className="text-[11px] text-slate-300">•</span>
                                      <span className="text-[11px] text-[#163E2B] font-semibold flex items-center gap-1 bg-emerald-50/50 px-1.5 py-0.5 rounded-md">
                                        <CheckCircle className="w-3 h-3" /> Available offline
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setSelectedSutra(sutra);
                                      setSutraLanguage(selectedLanguage);
                                      setActiveScreen('SutraDetails');
                                      setIsPlayingAudio(true);
                                    }}
                                    className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] rounded-full text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Play className="w-3 h-3 fill-current" /> Play
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setDownloadedSutraAudios(prev => prev.filter(id => id !== sutra.id));
                                      alert(`${sutra.name} Audio chant removed from offline storage.`);
                                    }}
                                    className="w-9 h-9 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Delete file"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 4: Dynamic Stavan Audio */}
                      {downloadedStavans.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-400 tracking-wide uppercase px-1">Stavan Devotional Music</h4>
                          <div className="space-y-3">
                            {STAVANS_LIST.filter(s => downloadedStavans.includes(s.title)).map(stavan => (
                              <div 
                                key={`stavan-${stavan.title}`} 
                                className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between shadow-xs hover:border-slate-200 transition-all duration-200"
                              >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#163E2B] flex items-center justify-center shrink-0">
                                    <Music className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-semibold text-sm text-slate-800 truncate pr-2">{stavan.title}</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[11px] text-slate-400 font-medium">{stavan.singer} • {stavan.duration}</span>
                                      <span className="text-[11px] text-slate-300">•</span>
                                      <span className="text-[11px] text-[#163E2B] font-semibold flex items-center gap-1 bg-emerald-50/50 px-1.5 py-0.5 rounded-md">
                                        <CheckCircle className="w-3 h-3" /> Available offline
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button 
                                    onClick={() => {
                                      setSelectedStavan(stavan);
                                      setActiveScreen('StavanDetails');
                                      setIsPlayingAudio(true);
                                    }}
                                    className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] rounded-full text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Play className="w-3 h-3 fill-current" /> Play
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setDownloadedStavans(prev => prev.filter(t => t !== stavan.title));
                                      alert(`"${stavan.title}" removed from offline storage.`);
                                    }}
                                    className="w-9 h-9 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Delete file"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* If no downloads at all */}
                      {downloads.length === 0 && downloadedSutras.length === 0 && downloadedSutraAudios.length === 0 && downloadedStavans.length === 0 && (
                        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center text-slate-400 text-sm shadow-xs">
                          <DownloadCloud className="w-8 h-8 text-slate-300 mx-auto mb-2.5" />
                          <p className="font-medium text-slate-500">No items downloaded for offline access</p>
                          <p className="text-xs text-slate-400 mt-1">Explore Sutras or Stavans to download them here.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 18. NOTIFICATIONS */}
                {activeScreen === 'Notifications' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-base font-black text-[#0f172a]">Announcements</h3>
                      </div>
                      <span className="text-[9px] font-mono text-[#163E2B] font-bold">Clear All</span>
                    </div>

                    <div className="space-y-3 pt-1">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-3.5 rounded-2xl border flex gap-3 ${
                            notif.unread ? 'bg-emerald-50/50 border-[#163E2B]' : 'bg-white border-cream-300'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${notif.unread ? 'bg-[#163E2B]' : 'bg-slate-300'}`} />
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-xs text-navy-950 leading-normal">{notif.title}</h4>
                            <span className="text-[9px] font-mono text-slate-400 block">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 19. SETTINGS */}
                {activeScreen === 'Settings' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">PORTAL SETUP</span>
                        <h3 className="text-base font-black text-[#0f172a]">Settings</h3>
                      </div>
                    </div>

                    <div className="bg-white border border-cream-300 rounded-[22px] p-4.5 space-y-3.5 shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block font-mono">Application Preferences</span>

                      <div className="flex justify-between items-center text-xs font-bold text-[#0f172a] border-b border-cream-100 pb-3">
                        <div className="flex flex-col">
                          <span>Email Notifications</span>
                          <span className="text-[10px] text-slate-400 font-normal">Weekly academic reports & updates</span>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded text-[#163E2B] w-4 h-4 cursor-pointer" />
                      </div>

                      <div className="flex justify-between items-center text-xs font-bold text-[#0f172a] border-b border-cream-100 pb-3">
                        <div className="flex flex-col">
                          <span>Daily Study Reminders</span>
                          <span className="text-[10px] text-slate-400 font-normal">Push alerts to log daily spiritual niyams</span>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded text-[#163E2B] w-4 h-4 cursor-pointer" />
                      </div>

                      <div className="space-y-2.5 pb-1">
                        <div className="flex justify-between items-center text-xs font-bold text-[#0f172a]">
                          <span>Language Medium</span>
                          <span className="text-[#163E2B] text-[10px] font-bold font-mono uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">{selectedLanguage}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                          {[
                            { id: 'English', label: 'English' },
                            { id: 'Hindi', label: 'हिन्दी' },
                            { id: 'Gujarati', label: 'ગુજરાતી' }
                          ].map((lang) => {
                            const isSelected = selectedLanguage === lang.id;
                            return (
                              <button
                                key={lang.id}
                                onClick={() => setSelectedLanguage(lang.id)}
                                className={`py-1.5 text-center text-[10.5px] font-bold rounded-lg transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#163E2B] text-white shadow-xs'
                                    : 'text-slate-600 hover:text-[#0f172a] hover:bg-white/50'
                                }`}
                              >
                                {lang.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Support card */}
                    <div className="bg-cream-50 border border-cream-300 rounded-[22px] p-4 text-xs space-y-1">
                      <span className="font-extrabold text-navy-950">Technical Helpdesk</span>
                      <p className="text-slate-500">Contact our administrator at pathshala@example.com for parents' onboarding queries.</p>
                    </div>

                    <button 
                      onClick={() => {
                        alert("Safely logged out from the Gyan Vatika platform.");
                        setActiveScreen('Splash');
                      }}
                      className="w-full py-3.5 bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-200/50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out from Shala</span>
                    </button>
                  </motion.div>
                )}

                {/* 20. SEARCH */}
                {activeScreen === 'Search' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-5 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigateBack()} className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <span className="text-[9px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">GLOBAL DISCOVERY</span>
                        <h3 className="text-base font-black text-[#0f172a]">Search Directory</h3>
                      </div>
                    </div>

                    <div className="relative">
                      <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Navkar, Lesson 3, Stavan..." 
                        className="w-full bg-white border border-cream-300 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#163E2B] font-bold transition-all shadow-sm"
                      />
                    </div>

                    {/* Popular search terms */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Popular Search Terms</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Navkar Mantra', 'Sutra', 'Chauvihar vow', 'Tirthankaras', 'Bhaktamar', 'Level 3 Quiz'].map((term) => (
                          <span 
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-white border border-cream-300 hover:border-cream-400 rounded-full text-xs font-bold text-slate-700 cursor-pointer transition-all shadow-xs"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results representation */}
                    <div className="pt-2">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2.5">Filtered Results</h4>
                      <div className="space-y-2">
                        {searchQuery ? (
                          <div className="bg-white border border-cream-300 rounded-xl p-3 flex items-center justify-between">
                            <div>
                              <h5 className="font-extrabold text-xs text-[#0f172a]">Matching Result for "{searchQuery}"</h5>
                              <p className="text-[10px] text-slate-400">Section: Level 3 Curriculum Resource</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-400 text-xs">
                            Start typing above to search the school database.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 21. FORGOT PASSWORD SCREEN */}
                {activeScreen === 'ForgotPassword' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="p-6 space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setActiveScreen('Login')} 
                        className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center cursor-pointer hover:bg-cream-300 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-navy-950" />
                      </button>
                      <h3 className="text-base font-black text-[#0f172a]">Reset Credentials</h3>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#163E2B] tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 inline-block">
                        {forgotPasswordUserType === 'student' ? 'Student Recovery' : 'Teacher Recovery'}
                      </span>
                      <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
                        {forgotPasswordUserType === 'student' ? 'Retrieve Student Login ID' : 'Reset Teacher Password'}
                      </h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {forgotPasswordUserType === 'student' 
                          ? "Enter your parents' registered mobile number or email address. We'll send your recovery instructions and Student ID."
                          : "Provide your registered school email address. We'll transmit a secure reset link to regain access."}
                      </p>
                    </div>

                    {!forgotPasswordSent ? (
                      <div className="space-y-4">
                        {forgotPasswordUserType === 'student' ? (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] font-bold text-[#8C8375] uppercase tracking-wider mb-1.5 block">Parents' Mobile Number</label>
                              <div className="relative">
                                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">+91</span>
                                <input 
                                  type="tel"
                                  value={forgotPasswordPhone}
                                  onChange={(e) => setForgotPasswordPhone(e.target.value)}
                                  placeholder="98765 43210" 
                                  className="w-full bg-white border border-[#E5E0D8] rounded-full pl-14 pr-5 py-3.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs"
                                />
                              </div>
                            </div>
                            <div className="text-center text-[#8C8375] text-[11px] font-bold tracking-wider my-2">- OR -</div>
                            <div>
                              <label className="text-[10px] font-bold text-[#8C8375] uppercase tracking-wider mb-1.5 block">Parents' Email Address</label>
                              <input 
                                type="email"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                placeholder="parent@example.com" 
                                className="w-full bg-white border border-[#E5E0D8] rounded-full px-5 py-3.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className="text-[10px] font-bold text-[#8C8375] uppercase tracking-wider mb-1.5 block">Teacher Email Address</label>
                            <input 
                              type="email"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              placeholder="teacher@example.com" 
                              className="w-full bg-white border border-[#E5E0D8] rounded-full px-5 py-3.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#163E2B] transition-all shadow-xs"
                            />
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (forgotPasswordUserType === 'student' && !forgotPasswordPhone && !forgotPasswordEmail) {
                              alert("Please fill in at least one field (Phone or Email) to proceed.");
                              return;
                            }
                            if (forgotPasswordUserType === 'teacher' && !forgotPasswordEmail) {
                              alert("Please enter your registered teacher email.");
                              return;
                            }
                            setForgotPasswordSent(true);
                          }}
                          className="w-full py-4 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-black text-sm rounded-full shadow-lg shadow-[#163E2B]/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                        >
                          <span>Transmit Recovery Details</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50/50 border border-emerald-200 rounded-[24px] p-5 text-center space-y-4"
                      >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-650">
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-emerald-900">Recovery Instructions Sent!</h4>
                          <p className="text-[11px] text-emerald-800 leading-relaxed">
                            {forgotPasswordUserType === 'student'
                              ? `We have dispatched recovery details and Student ID codes to your parent's registered contact info: ${forgotPasswordPhone || forgotPasswordEmail || '9876543210'}.`
                              : `A secure verification password reset link has been dispatched to your official teacher inbox: ${forgotPasswordEmail}.`}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveScreen('Login')}
                          className="px-5 py-2.5 bg-white border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-xl hover:bg-emerald-50 cursor-pointer transition-all active:scale-95 shadow-xs"
                        >
                          Return to Secure Login
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* 23. ADMIN PANEL - PROMOTION & MANAGEMENT */}
                {activeScreen === 'AdminPanel' && (() => {
                  const handleApprovePromotion = () => {
                    const currentLvl = student.level;
                    const completed = student.completedLevels ? [...student.completedLevels] : [];
                    if (!completed.includes(currentLvl)) {
                      completed.push(currentLvl);
                    }
                    
                    let nextLevel = "Level 3: Pratikraman & Advanced Vows"; // Default
                    if (currentLvl.includes("Level 1")) {
                      nextLevel = "Level 2: Jain Geography & Symbols";
                    } else if (currentLvl.includes("Level 2")) {
                      nextLevel = "Level 3: Pratikraman & Advanced Vows";
                    } else if (currentLvl.includes("Level 3")) {
                      nextLevel = "Level 4: Advanced Studies"; // Theoretical next level
                    }

                    setStudent(prev => ({
                      ...prev,
                      completedLevels: completed,
                      level: nextLevel,
                      promotionStatus: 'Learning'
                    }));
                    
                    alert(`Promotion Approved! ${student.name} is now enrolled in ${nextLevel}.`);
                  };

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-slate-50 min-h-full p-5 sm:p-6 space-y-5 pb-24"
                    >
                      <div className="flex items-center justify-between bg-white border border-slate-200/60 p-4 rounded-2xl shadow-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigateBack()}
                            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                          </button>
                          <div>
                            <span className="text-[10px] font-bold text-[#163E2B] uppercase tracking-widest font-mono">Administration</span>
                            <h3 className="text-base font-black text-slate-900 leading-none mt-0.5">Admin Panel</h3>
                          </div>
                        </div>
                        <Shield className="w-6 h-6 text-slate-300" />
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Promotion Requests</h4>
                        
                        {student.promotionStatus === 'Awaiting Promotion' ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-[9px] font-bold rounded uppercase tracking-wider">New Request</span>
                                <h5 className="text-sm font-extrabold text-blue-950 mt-1.5">{student.name}</h5>
                                <p className="text-[10px] text-blue-800 mt-0.5">Recommended for promotion from {student.level}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={handleApprovePromotion}
                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
                              >
                                Approve Promotion
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
                            <span className="text-[11px] text-slate-400 font-medium">No pending promotion requests.</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Student Records (Read Only)</h4>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between">
                           <div>
                             <h5 className="text-xs font-bold text-slate-700">{student.name}</h5>
                             <p className="text-[10px] text-slate-500 mt-0.5">Current: {student.level}</p>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase">{student.promotionStatus}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* 22. TEACHER DASHBOARD - HOME */}
                {activeScreen === 'TeacherDashboard' && (() => {
                  const teacherName = currentLoggedInTeacher?.name || "Teacher";
                  const levels = currentLoggedInTeacher?.level?.join(', ') || "All Levels";
                  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full bg-slate-50 overflow-y-auto pb-24"
                    >
                      {/* HEADER */}
                      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-200">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome, {teacherName}</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Assigned: {levels}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-3 font-mono uppercase tracking-wider">{todayDate}</p>
                      </div>

                      <div className="p-6 space-y-8">
                        
                        {/* TODAY'S SUMMARY */}
                        <div>
                          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Today's Summary</h2>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                              <div className="text-2xl font-black text-slate-800">3</div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">Classes Today</div>
                            </div>
                            <button onClick={() => setActiveScreen('TeacherGathaApprovals')} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-left hover:border-slate-300 transition-colors active:scale-95 cursor-pointer">
                              <div className="text-2xl font-black text-amber-600">12</div>
                              <div className="text-[10px] font-bold text-amber-700 uppercase mt-1">Pending Approvals</div>
                            </button>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                              <div className="text-2xl font-black text-slate-800">45</div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">My Students</div>
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                              <div className="text-2xl font-black text-emerald-600">2</div>
                              <div className="text-[10px] font-bold text-[#1C4D36] uppercase mt-1">Attendance Pending</div>
                            </div>
                          </div>
                        </div>

                        {/* TODAY'S CLASSES */}
                        <div>
                          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Today's Classes</h2>
                          <div className="space-y-3">
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm border-l-4 border-l-emerald-500">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">Level 1</span>
                                  <h3 className="text-sm font-bold text-slate-800 mt-1.5">Batch A - Morning</h3>
                                  <p className="text-xs text-slate-500 mt-1">09:00 AM • 15 Students</p>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Completed</span>
                              </div>
                              <button onClick={() => { setTeacherSelectedLiveClass({ id: 'c1', name: 'Sutra Pronunciation', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '09:00 AM', duration: '60 min', students: 15, status: 'Completed', subject: 'Navkar Mantra' }); setActiveScreen('TeacherLiveClassDetails'); }} className="w-full mt-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer active:scale-95">
                                View Details
                              </button>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm border-l-4 border-l-blue-500">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">Level 2</span>
                                  <h3 className="text-sm font-bold text-slate-800 mt-1.5">Batch B - Afternoon</h3>
                                  <p className="text-xs text-slate-500 mt-1">04:00 PM • 20 Students</p>
                                </div>
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Upcoming</span>
                              </div>
                              <button onClick={() => { setTeacherSelectedLiveClass({ id: 'c2', name: 'Jain Principles', level: 'Level 2: Jain Geography & Symbols', batch: 'Batch B - Afternoon', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '04:00 PM', duration: '60 min', students: 20, status: 'Upcoming', subject: 'Ahinsa Paramo Dharma' }); setActiveScreen('TeacherLiveClassDetails'); }} className="w-full mt-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* PENDING TASKS */}
                        <div>
                          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Pending Tasks</h2>
                          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-slate-100">
                            <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">Pending Gatha Approvals</h4>
                                <p className="text-xs text-slate-500 mt-0.5">12 submissions waiting</p>
                              </div>
                              <button onClick={() => setActiveScreen('TeacherGathaApprovals')} className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 cursor-pointer">View</button>
                            </div>
                            <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">Attendance Yet to be Marked</h4>
                                <p className="text-xs text-slate-500 mt-0.5">2 classes pending</p>
                              </div>
                              <button className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200">View</button>
                            </div>
                            <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">Upcoming Class</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Batch B starts in 30 mins</p>
                              </div>
                              <button className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200">View</button>
                            </div>
                          </div>
                        </div>

                        {/* QUICK ACTIONS */}
                        <div>
                          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: 'Live Classes', icon: Video, id: 'TeacherLiveClasses' },
                              { label: 'Students', icon: Users, id: 'TeacherStudents' },
                              { label: 'Gatha Approvals', icon: CheckCircle2, id: 'TeacherGathaApprovals' },
                              { label: 'Attendance', icon: FileText, id: 'TeacherAttendance' },
                              { label: 'Reports', icon: TrendingUp, id: 'TeacherReports' }
                            ].map((action, i) => (
                              <button key={i} onClick={() => action.id && setActiveScreen(action.id)} className={`flex items-center gap-3 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm hover:border-slate-300 transition-colors cursor-pointer active:scale-95 ${i === 4 ? 'col-span-2' : ''}`}>
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                  <action.icon className="w-4 h-4 text-slate-700" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">{action.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* RECENT ACTIVITY */}
                        <div>
                          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Recent Activity</h2>
                          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-5">
                            <div className="flex gap-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-slate-700">Dhairya Kothari submitted <strong>Navkar Mantra</strong></p>
                                <p className="text-xs text-slate-400 mt-1">10 mins ago</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-slate-700">Attendance marked for <strong>Level 2 - Batch B</strong></p>
                                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-slate-700">New student <strong>Aanya Shah</strong> assigned to your batch</p>
                                <p className="text-xs text-slate-400 mt-1">Yesterday</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* SIGN OUT */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setCurrentLoggedInTeacher(null);
                              localStorage.removeItem('shalaSession');
                              setActiveScreen('Login');
                            }}
                            className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <LogOut className="w-4 h-4 text-slate-500" />
                            <span>Sign Out & Return to Login</span>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  );
                })()}

              </div>
              {/* CONSISTENT BOTTOM NAVIGATION - Active on appropriate screens */}
              {['Home', 'Syllabus', 'LiveClassList', 'LiveClassDetails', 'SutraList', 'SutraDetails', 'AudioLyrics', 'StavanList', 'StavanDetails', 'Niyam', 'BonusEvent', 'GamesHome', 'GamesQuizHub', 'Quiz', 'Profile', 'ProfileReportCard', 'ProfileBatchChange', 'Downloads', 'Notifications', 'Settings', 'Search'].includes(activeScreen) && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100/80 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-8px_30px_rgba(66,50,30,0.06)] shrink-0">
                  {[
                    { id: 'Home', icon: LayoutDashboard, label: 'Home' },
                    { id: 'LiveClassList', icon: Video, label: 'Live' },
                    { id: 'Niyam', icon: Star, label: 'Niyam' },
                    { id: 'Syllabus', icon: BookMarked, label: 'Syllabus' },
                  ].map((nav) => {
                    const isCurrent = activeScreen === nav.id || 
                                     (nav.id === 'SutraList' && ['SutraDetails', 'StavanList', 'StavanDetails', 'AudioLyrics'].includes(activeScreen)) || 
                                     (nav.id === 'LiveClassList' && activeScreen === 'LiveClassDetails') ||
                                     (nav.id === 'GamesHome' && ['GamesHome', 'GamesQuizHub', 'Quiz'].includes(activeScreen)) ||
                                     (nav.id === 'Profile' && ['ProfileReportCard', 'ProfileAttendance', 'ProfileGurujiApproval', 'ProfileBonusPoints', 'Downloads', 'Settings'].includes(activeScreen));
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setActiveScreen(nav.id)}
                        className="flex flex-col items-center gap-1 cursor-pointer py-1 px-2.5 rounded-2xl active:scale-95 transition-all text-center shrink-0 min-w-[55px]"
                      >
                        <nav.icon className={`w-5 h-5 transition-all duration-300 ${isCurrent ? 'text-[#163E2B] scale-110 drop-shadow-[0_2px_4px_rgba(131,16,40,0.15)]' : 'text-slate-400 hover:text-slate-600'}`} />
                        <span className={`text-[9px] font-bold tracking-wider uppercase ${isCurrent ? 'text-[#163E2B] font-extrabold' : 'text-slate-400 font-semibold'}`}>
                          {nav.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TEACHER BOTTOM NAVIGATION */}
              {['TeacherDashboard', 'TeacherLiveClasses', 'TeacherLiveClassDetails', 'TeacherStudents', 'TeacherStudentProfile', 'TeacherGathaApprovals', 'TeacherGathaSubmissionDetails', 'TeacherAttendance', 'TeacherAttendanceDetails', 'TeacherReports', 'TeacherReportsDetails', 'TeacherProfile'].includes(activeScreen) && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100/80 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-8px_30px_rgba(66,50,30,0.06)] shrink-0">
                  {[
                    { id: 'TeacherDashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'TeacherLiveClasses', icon: Video, label: 'Live Classes' },
                    { id: 'TeacherStudents', icon: Users, label: 'Students' },
                    { id: 'TeacherProfile', icon: User, label: 'Profile' },
                  ].map((nav) => {
                    const isCurrent = activeScreen === nav.id || 
                                      (nav.id === 'TeacherLiveClasses' && activeScreen === 'TeacherLiveClassDetails') ||
                                      (nav.id === 'TeacherStudents' && activeScreen === 'TeacherStudentProfile') ||
                                      (nav.id === 'TeacherDashboard' && ['TeacherGathaApprovals', 'TeacherGathaSubmissionDetails', 'TeacherAttendance', 'TeacherAttendanceDetails', 'TeacherReports', 'TeacherReportsDetails'].includes(activeScreen));
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setActiveScreen(nav.id)}
                        className="flex flex-col items-center gap-1 cursor-pointer py-1 px-2.5 rounded-2xl active:scale-95 transition-all text-center shrink-0 min-w-[55px]"
                      >
                        <nav.icon className={`w-5 h-5 transition-all duration-300 ${isCurrent ? 'text-[#163E2B] scale-110 drop-shadow-[0_2px_4px_rgba(131,16,40,0.15)]' : 'text-slate-400 hover:text-slate-600'}`} />
                        <span className={`text-[9px] font-bold tracking-wider uppercase ${isCurrent ? 'text-[#163E2B] font-extrabold' : 'text-slate-400 font-semibold'}`}>
                          {nav.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
