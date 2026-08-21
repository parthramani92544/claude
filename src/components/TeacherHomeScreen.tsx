import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Phone, 
  Bell, 
  ChevronRight, 
  X, 
  GraduationCap, 
  Users, 
  Tv, 
  FileText, 
  Volume2, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Award, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  BookOpen, 
  HelpCircle, 
  Video, 
  AlertCircle, 
  UserCheck, 
  CheckSquare, 
  Layers, 
  ExternalLink,
  MessageCircle,
  Play,
  FileCheck
} from 'lucide-react';
import { PathshalaLogo } from './PathshalaLogo';

interface TeacherHomeScreenProps {
  currentLoggedInTeacher: any;
  setActiveScreen: (screen: string) => void;
  setTeacherSelectedLiveClass?: (liveClass: any) => void;
  setTeacherSelectedStudent?: (student: any) => void;
  unreadNotificationsCount?: number;
}

export const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({
  currentLoggedInTeacher,
  setActiveScreen,
  setTeacherSelectedLiveClass,
  setTeacherSelectedStudent,
  unreadNotificationsCount = 3
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [activeClassSlide, setActiveClassSlide] = useState(0);

  const teacherName = currentLoggedInTeacher?.name || "Rupal Shah (Guruji)";
  const assignedLevels = currentLoggedInTeacher?.level?.join(', ') || "Level 1 • Level 2";

  // Classes schedule
  const classesList = [
    {
      id: 'c1',
      name: 'Sutra Pronunciation & Recitation',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      teacher: teacherName,
      time: '09:00 AM – 10:00 AM',
      studentsCount: '15 Students',
      status: 'ONGOING',
      isLive: true,
      subject: 'Navkar Mantra & Mangal Path',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
      attendanceMarked: false
    },
    {
      id: 'c2',
      name: 'Jain Principles & Geography',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      teacher: teacherName,
      time: '04:00 PM – 05:00 PM',
      studentsCount: '20 Students',
      status: 'UPCOMING',
      isLive: false,
      subject: 'Ahinsa Paramo Dharma & 24 Tirthankaras',
      meetUrl: 'https://meet.google.com/klm-nopq-rst',
      attendanceMarked: false
    },
    {
      id: 'c3',
      name: 'Pratikraman Deep Dive',
      level: 'Level 3: Pratikraman & Advanced Vows',
      batch: 'Batch C - Evening',
      teacher: teacherName,
      time: '06:30 PM – 07:30 PM',
      studentsCount: '18 Students',
      status: 'SCHEDULED',
      isLive: false,
      subject: 'Iryavahiya Sutra Arth & Gatha',
      meetUrl: 'https://meet.google.com/uvw-xyz1-234',
      attendanceMarked: false
    }
  ];

  // Recent Submissions data
  const recentSubmissions = [
    {
      id: 'SUB001',
      name: 'Aarav Shah',
      initial: 'A',
      avatarBg: 'bg-[#1C4D36]',
      level: 'Level 1',
      levelBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
      topic: 'Navkar Mantra (Gatha 1...',
      time: '15m ago',
      btnText: 'Verify'
    },
    {
      id: 'SUB002',
      name: 'Priyal Jain',
      initial: 'P',
      avatarBg: 'bg-[#DE7834]',
      level: 'Level 2',
      levelBg: 'bg-orange-50 text-orange-800 border-orange-200/60',
      topic: 'Iryavahiya Sutra Recitation...',
      time: '1h ago',
      btnText: 'Verify'
    },
    {
      id: 'SUB003',
      name: 'Veer Doshi',
      initial: 'V',
      avatarBg: 'bg-[#8F65B8]',
      level: 'Level 1',
      levelBg: 'bg-purple-50 text-purple-800 border-purple-200/60',
      topic: 'Uvasaggaharam Stotra ...',
      time: '2h ago',
      btnText: 'Verify'
    }
  ];

  return (
    <div className="min-h-full flex flex-col bg-[#FDFBF7] text-slate-800 relative select-none font-sans">
      
      {/* 1. TOP HEADER BAR */}
      <header className="bg-white px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        {/* Left: Hamburger Menu Icon */}
        <button 
          id="teacher-menu-btn"
          onClick={() => setIsDrawerOpen(true)}
          className="w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-[#1C4D36] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Open Teacher Navigation Menu"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: Pathshala circular emblem + Title */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => setActiveScreen('TeacherDashboard')}
        >
          <PathshalaLogo className="w-8.5 h-8.5 shrink-0" />
          <h1 className="text-xl font-bold text-[#1C4D36] tracking-tight font-serif leading-tight">
            E-Pathshala
          </h1>
        </div>

        {/* Right: Circular Phone button & Circular Bell button with Badge */}
        <div className="flex items-center gap-2">
          {/* Phone Helpline */}
          <button 
            id="teacher-phone-btn"
            onClick={() => setShowHelplineModal(true)}
            className="w-9.5 h-9.5 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-[#1C4D36] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Helpline & Coordinator Support"
          >
            <Phone className="w-4 h-4 text-[#1C4D36] stroke-[2]" />
          </button>

          {/* Notification Bell */}
          <button 
            id="teacher-notifications-btn"
            onClick={() => setActiveScreen('Notifications')}
            className="w-9.5 h-9.5 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-[#1C4D36] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer relative shadow-xs"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-[#1C4D36] stroke-[2]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#1C4D36] text-white text-[9.5px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="flex-1 px-4 py-3.5 space-y-4 pb-24 max-w-xl mx-auto w-full">
        
        {/* GREETING & SUNRISE ARTWORK BANNER */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <span>Good Morning, Guruji</span>
              <span className="text-base">👋</span>
            </p>
            <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight mt-0.5">
              Welcome back!
            </h2>
          </div>

          {/* Subtle Sunrise & Hills Decorative Vector Illustration */}
          <div className="w-24 h-16 relative overflow-hidden shrink-0 pointer-events-none select-none">
            <svg viewBox="0 0 100 65" className="w-full h-full">
              <defs>
                <linearGradient id="teacherSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FBD38D" />
                  <stop offset="100%" stopColor="#F6AD55" />
                </linearGradient>
                <linearGradient id="teacherHillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2F0D9" />
                  <stop offset="100%" stopColor="#C5E0B4" />
                </linearGradient>
                <linearGradient id="teacherHillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C5E0B4" />
                  <stop offset="100%" stopColor="#A9D18E" />
                </linearGradient>
              </defs>
              {/* Sun */}
              <circle cx="58" cy="30" r="16" fill="url(#teacherSunGrad)" opacity="0.85" />
              {/* Birds */}
              <path d="M 68 18 Q 71 14 74 18 Q 77 14 80 18" fill="none" stroke="#718096" strokeWidth="1" />
              <path d="M 78 22 Q 80 19 82 22 Q 84 19 86 22" fill="none" stroke="#718096" strokeWidth="0.8" />
              {/* Soft Hills */}
              <path d="M 20 65 Q 45 35 70 65 Z" fill="url(#teacherHillGrad1)" opacity="0.9" />
              <path d="M 40 65 Q 65 38 95 65 Z" fill="url(#teacherHillGrad2)" opacity="0.8" />
              <path d="M 0 65 Q 30 42 60 65 Z" fill="#D9EAD3" opacity="0.95" />
              {/* Small plant / leaf on hill */}
              <path d="M 85 55 C 83 48 88 45 92 48 C 94 53 89 57 85 55 Z" fill="#2E7D32" opacity="0.85" />
              <path d="M 88 50 C 93 46 96 50 94 54" fill="none" stroke="#2E7D32" strokeWidth="1" />
              <path d="M 40 56 C 38 52 42 50 45 52 C 46 55 43 57 40 56 Z" fill="#43A047" opacity="0.75" />
            </svg>
          </div>
        </div>

        {/* 4 TOP ACTION CARDS IN A 2x2 GRID (2 CARDS IN FIRST LINE, 2 CARDS IN SECOND LINE) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">

          {/* CARD 1: TODAY'S CLASSES (Light Pastel Green) */}
          <div 
            id="teacher-menu-today-classes"
            onClick={() => setActiveScreen('TeacherLiveClasses')}
            className="bg-gradient-to-b from-[#EBF7EE] to-[#E2F2E6] hover:from-[#E2F2E6] hover:to-[#D5EBDC] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(28,77,54,0.04)] border border-[#D5EBDC] cursor-pointer active:scale-95 transition-all min-h-[110px] group"
          >
            {/* Top 3D Embossed Green Book & Calendar Icon */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/85 shadow-xs flex items-center justify-center relative">
                {/* 3D Open Book */}
                <div className="w-6 h-5 bg-gradient-to-r from-[#1C4D36] to-[#2E7D32] rounded-xs shadow-xs flex items-center justify-center text-white relative">
                  <div className="w-0.5 h-3.5 bg-white/40 rounded-full" />
                </div>
                {/* Mini Calendar Pin */}
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#1C4D36] rounded-xs border border-white flex items-center justify-center text-white">
                  <Calendar className="w-2 h-2 text-white" />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1C4D36] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Bottom Label */}
            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Today's Classes
              </h3>
              <p className="text-xs font-bold text-slate-500 font-mono mt-0.5">
                3
              </p>
            </div>
          </div>

          {/* CARD 2: PENDING APPROVALS (Light Pastel Peach/Yellow) */}
          <div 
            id="teacher-menu-pending-approvals"
            onClick={() => setActiveScreen('TeacherGathaApprovals')}
            className="bg-gradient-to-b from-[#FFF6E9] to-[#FDF0DB] hover:from-[#FDF0DB] hover:to-[#FBE8CA] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(217,119,6,0.04)] border border-[#FBE8CA] cursor-pointer active:scale-95 transition-all min-h-[110px] group"
          >
            {/* Top 3D Embossed Yellow Clipboard */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/85 shadow-xs flex items-center justify-center relative">
                <div className="w-5.5 h-6 bg-gradient-to-b from-[#EAA036] to-[#D97706] rounded-sm shadow-xs p-1 flex flex-col justify-between border-t-2 border-[#B45309]">
                  <div className="space-y-0.5">
                    <div className="w-3.5 h-0.5 bg-white rounded-full" />
                    <div className="w-3 h-0.5 bg-white/80 rounded-full" />
                    <div className="w-3.5 h-0.5 bg-white/80 rounded-full" />
                  </div>
                  <div className="w-2 h-0.5 bg-amber-200 rounded-full" />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Bottom Label */}
            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Pending Approvals
              </h3>
              <p className="text-xs font-bold text-slate-500 font-mono mt-0.5">
                12
              </p>
            </div>
          </div>

          {/* CARD 3: MY STUDENTS (Light Pastel Purple/Lavender) */}
          <div 
            id="teacher-menu-my-students"
            onClick={() => setActiveScreen('TeacherStudents')}
            className="bg-gradient-to-b from-[#F4EEFB] to-[#ECE2F7] hover:from-[#ECE2F7] hover:to-[#E2D4F2] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(139,92,246,0.04)] border border-[#E2D4F2] cursor-pointer active:scale-95 transition-all min-h-[110px] group"
          >
            {/* Top 3D Embossed Purple Users / Scholars Icon */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/85 shadow-xs flex items-center justify-center relative">
                <div className="w-6 h-5 flex items-center justify-center relative">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] shadow-xs flex items-center justify-center text-white text-[8px] font-bold z-10">
                    <Users className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#A855F7] absolute -left-1 opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#C084FC] absolute -right-1 opacity-80" />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Bottom Label */}
            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                My Students
              </h3>
              <p className="text-xs font-bold text-slate-500 font-mono mt-0.5">
                45
              </p>
            </div>
          </div>

          {/* CARD 4: ATTENDANCE SUMMARY (Light Pastel Soft Blue) */}
          <div 
            id="teacher-menu-attendance-summary"
            onClick={() => setActiveScreen('TeacherAttendance')}
            className="bg-gradient-to-b from-[#EDF5FD] to-[#E3EFFB] hover:from-[#E3EFFB] hover:to-[#D4E6F7] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(37,99,235,0.04)] border border-[#D4E6F7] cursor-pointer active:scale-95 transition-all min-h-[110px] group"
          >
            {/* Top 3D Embossed Blue Bar Chart */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/85 shadow-xs flex items-center justify-center relative">
                <div className="flex items-end gap-0.5 h-4.5">
                  <div className="w-1.5 h-2.5 bg-gradient-to-t from-[#2563EB] to-[#60A5FA] rounded-xs" />
                  <div className="w-1.5 h-4 bg-gradient-to-t from-[#1D4ED8] to-[#3B82F6] rounded-xs" />
                  <div className="w-1.5 h-3 bg-gradient-to-t from-[#2563EB] to-[#60A5FA] rounded-xs" />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Bottom Label */}
            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Attendance Summary
              </h3>
              <p className="text-xs font-bold text-slate-500 font-mono mt-0.5">
                2
              </p>
            </div>
          </div>

        </div>

        {/* SECTION: TODAY'S CLASSES */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-[#1C4D36]" />
              <h3 className="text-sm font-bold text-slate-900">
                Today's Classes
              </h3>
            </div>
            <button 
              onClick={() => setActiveScreen('TeacherLiveClasses')}
              className="text-xs font-bold text-[#1C4D36] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Today's Class Card matching screenshot */}
          <div 
            onClick={() => {
              if (setTeacherSelectedLiveClass) setTeacherSelectedLiveClass(classesList[activeClassSlide]);
              setActiveScreen('TeacherLiveClassDetails');
            }}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer hover:border-emerald-200 transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* LIVE badge */}
                <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#1C4D36] text-[11px] font-extrabold rounded-lg uppercase tracking-wider font-mono">
                  LIVE
                </span>
                {/* Class Title */}
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {classesList[activeClassSlide]?.name || 'Sutra Pronunciation & Recitation'}
                </h4>
              </div>

              {/* Status pill on right */}
              <span className="px-2.5 py-0.5 bg-[#EDF7ED] text-[#2E7D32] border border-[#C8E6C9] rounded-md text-[10px] font-bold tracking-wider shrink-0 uppercase">
                {classesList[activeClassSlide]?.status || 'ONGOING'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium pl-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {classesList[activeClassSlide]?.time || '09:00 AM – 10:00 AM'}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {classesList[activeClassSlide]?.studentsCount || '15 Students'}
              </span>
            </div>

            {/* Pagination dots below */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {classesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveClassSlide(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeClassSlide === idx 
                      ? 'bg-[#1C4D36] w-4' 
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: RECENT SUBMISSIONS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-[#1C4D36]" />
              <h3 className="text-sm font-bold text-slate-900">
                Recent Submissions
              </h3>
            </div>
            <button 
              onClick={() => setActiveScreen('TeacherGathaApprovals')}
              className="text-xs font-bold text-[#1C4D36] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Submissions list */}
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] divide-y divide-slate-100">
            {recentSubmissions.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveScreen('TeacherGathaApprovals')}
                className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-slate-50/80 rounded-xl transition-colors cursor-pointer"
              >
                {/* Left: Avatar + Name + Level + Topic */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                    {item.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border font-mono ${item.levelBg}`}>
                        {item.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.topic}
                    </p>
                  </div>
                </div>

                {/* Right: Time & subtle Chevron */}
                <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                  <span className="text-[11px] font-medium font-mono">
                    {item.time}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: SPIRITUAL QUOTE CARD WITH BOTANICAL LEAF ARTWORK */}
        <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xs">
          {/* Subtle Botanical Leaf Artwork on Bottom Right */}
          <div className="absolute -right-2 -bottom-4 w-28 h-28 opacity-35 pointer-events-none select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#1C4D36]" fill="none" stroke="currentColor">
              {/* Branch Stem */}
              <path d="M 90 90 Q 50 60 20 20" strokeWidth="1.2" />
              {/* Leaves */}
              <path d="M 60 67 C 65 58 75 60 72 70 C 68 76 58 74 60 67 Z" fill="currentColor" opacity="0.15" strokeWidth="0.8" />
              <path d="M 45 52 C 40 43 50 40 55 48 C 57 55 48 57 45 52 Z" fill="currentColor" opacity="0.15" strokeWidth="0.8" />
              <path d="M 32 38 C 38 28 48 30 45 40 C 40 46 30 44 32 38 Z" fill="currentColor" opacity="0.15" strokeWidth="0.8" />
              <path d="M 22 22 C 16 12 28 10 32 18 C 34 25 24 27 22 22 Z" fill="currentColor" opacity="0.15" strokeWidth="0.8" />
              <path d="M 75 80 C 82 72 90 78 86 86 C 80 92 72 88 75 80 Z" fill="currentColor" opacity="0.15" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="flex items-start gap-3.5 relative z-10">
            {/* Golden Quote Symbol in Circle */}
            <div className="w-9 h-9 rounded-full bg-white/90 shadow-xs flex items-center justify-center shrink-0 text-[#C4883A] font-serif text-xl font-bold leading-none">
              “
            </div>

            <div className="space-y-1.5 pr-6">
              <p className="text-xs sm:text-[13px] text-[#332B22] font-medium leading-relaxed font-serif italic">
                "Imparting knowledge with patience, compassion, and purity of intent is the highest form of spiritual service."
              </p>
              <p className="text-[10.5px] font-bold text-[#1C4D36] font-mono">
                — Acharya Bhagwant Jinadattasuri
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SLIDE-OVER NAVIGATION DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed top-0 bottom-0 left-0 w-[82%] max-w-[320px] bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="bg-gradient-to-br from-[#1C4D36] to-[#0D281C] text-white p-5 space-y-3 relative">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#1C4D36] flex items-center justify-center font-black text-base font-mono shadow-md border-2 border-amber-300">
                    {teacherName.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || "TS"}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">{teacherName}</h3>
                    <p className="text-[11px] text-[#F3EAD3] font-medium">{assignedLevels}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold text-amber-200">
                      ID: TEACH-2026-08
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Items List */}
              <div className="flex-1 p-4 space-y-1 divide-y divide-slate-100">
                <div className="space-y-1 pb-3">
                  {[
                    { id: 'TeacherDashboard', label: 'Teacher Dashboard', icon: GraduationCap },
                    { id: 'TeacherLiveClasses', label: 'Live Classes Schedule', icon: Tv, badge: '3' },
                    { id: 'TeacherGathaApprovals', label: 'Gatha Approvals Queue', icon: Award, badge: '12', badgeColor: 'bg-amber-100 text-amber-800' },
                    { id: 'TeacherAttendance', label: 'Class Attendance Register', icon: CheckSquare, badge: '2', badgeColor: 'bg-rose-100 text-rose-800' },
                    { id: 'TeacherSubmittedReview', label: 'Submitted Reviews', icon: FileCheck, badge: '6', badgeColor: 'bg-emerald-100 text-emerald-800' },
                    { id: 'TeacherStudents', label: 'My Students & Class Roster', icon: Users },
                    { id: 'TeacherReports', label: 'Academic Reports & Marks', icon: FileText },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setActiveScreen(item.id);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-[#1C4D36] font-semibold text-xs transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <item.icon className="w-4.5 h-4.5 text-[#1C4D36]" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full font-mono ${item.badgeColor || 'bg-blue-100 text-blue-800'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-3 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider px-3.5 block mb-1">
                    ACCOUNT & TOOLS
                  </span>
                  {[
                    { id: 'TeacherProfile', label: 'Faculty Profile & Schedule', icon: UserCheck },
                    { id: 'AdminPanel', label: 'Admin Portal & Approvals', icon: ShieldCheck },
                    { id: 'Downloads', label: 'Course Notes & Downloads', icon: BookOpen },
                    { id: 'Settings', label: 'App Settings & Preferences', icon: ShieldCheck },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setActiveScreen(item.id);
                      }}
                      className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-medium text-xs transition-colors cursor-pointer text-left"
                    >
                      <item.icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Khartargach Teacher v3.2</span>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setActiveScreen('Login');
                  }}
                  className="text-[#1C4D36] font-bold hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MODAL: HELPLINE & COORDINATOR SUPPORT */}
      <AnimatePresence>
        {showHelplineModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-emerald-900/20"
            >
              <div className="bg-gradient-to-r from-[#1C4D36] to-[#0D281C] text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold text-sm text-white">Faculty Support & Helpdesk</h3>
                </div>
                <button 
                  onClick={() => setShowHelplineModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-3.5 text-xs">
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-1">
                  <span className="text-[9.5px] font-bold text-[#1C4D36] uppercase tracking-wider block">PATHSHALA HEAD COORDINATOR</span>
                  <p className="font-black text-slate-800 text-sm">+91 88500 91468</p>
                  <p className="text-[11px] text-slate-500">Contact for curriculum changes, batch reallocations & urgent queries.</p>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-2xl space-y-1">
                  <span className="text-[9.5px] font-bold text-amber-800 uppercase tracking-wider block">TECHNICAL & ZOOM SUPPORT</span>
                  <p className="font-black text-slate-800 text-sm">+91 91599 41468</p>
                  <p className="text-[11px] text-slate-500">Google Meet links, audio upload issues & live stream assistance.</p>
                </div>

                <button 
                  onClick={() => setShowHelplineModal(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
