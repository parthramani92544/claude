import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Phone, 
  Bell, 
  ChevronRight, 
  X, 
  BookOpen, 
  GraduationCap, 
  Tv, 
  FileText, 
  Volume2, 
  Star, 
  Sparkles, 
  Calendar, 
  Award, 
  ShoppingBag,
  ShieldCheck, 
  HelpCircle,
  Clock,
  User,
  Users
} from 'lucide-react';
import { Student, JainQuote } from '../types';
import { PathshalaLogo } from './PathshalaLogo';

interface KhartargachHomeScreenProps {
  student: Student;
  setActiveScreen: (screen: string) => void;
  activeBonusEvent?: any;
  currentQuote?: JainQuote;
  unreadNotificationsCount?: number;
  niyamDays?: any[];
}

const getInitials = (name: string): string => {
  if (!name) return "AS";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const KhartargachHomeScreen: React.FC<KhartargachHomeScreenProps> = ({
  student,
  setActiveScreen,
  activeBonusEvent,
  currentQuote,
  unreadNotificationsCount = 5,
  niyamDays
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);

  const studentInitials = getInitials(student?.name || "Aarav Shah");
  const studentName = student?.name || "Aarav Shah";
  const studentLevel = student?.level || "Level 1: Basic Sutras & Stories";
  const attendanceVal = student?.attendance ? `${student.attendance}%` : "91%";
  const gathasVal = student?.gathasCount ? `${student.gathasCount} /` : "36 /";
  const pointsVal = student?.gathaScore ? `${student.gathaScore} pts` : "pts";

  return (
    <div className="min-h-full flex flex-col bg-[#FAF8F5] text-slate-800 relative select-none font-sans">
      
      {/* 1. TOP HEADER BAR */}
      <header className="bg-white px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        {/* Left: Hamburger Menu Icon */}
        <div className="flex items-center gap-2">
          <button 
            id="student-home-menu-btn"
            onClick={() => setIsDrawerOpen(true)}
            className="w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-[#163E2B] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 stroke-[2.4]" />
          </button>

          {/* Logo & Title */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActiveScreen('Home')}
          >
            <div className="w-10 h-10 rounded-full border border-emerald-900/20 bg-white p-0.5 shadow-2xs flex items-center justify-center shrink-0">
              <PathshalaLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-[#163E2B] tracking-tight font-sans">
                Khartargach E-
              </span>
              <span className="text-base font-extrabold text-[#163E2B] tracking-tight font-sans">
                Pathshala
              </span>
            </div>
          </div>
        </div>

        {/* Right: Circular Phone button & Circular Bell button with Badge */}
        <div className="flex items-center gap-2.5">
          {/* Phone Helpline button */}
          <button 
            id="student-home-phone-btn"
            onClick={() => setShowHelplineModal(true)}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#163E2B] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
            title="Helpline & Support"
          >
            <Phone className="w-4.5 h-4.5 text-[#163E2B] stroke-[2]" />
          </button>

          {/* Notification Bell with '5' badge */}
          <button 
            id="student-home-bell-btn"
            onClick={() => setActiveScreen('Notifications')}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#163E2B] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer relative shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#163E2B] stroke-[2]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#163E2B] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT BODY */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-20 max-w-xl mx-auto w-full">
        
        {/* 2.1 DAILY NIYAM ACTIVITY BANNER */}
        <div 
          id="student-banner-niyam"
          onClick={() => setActiveScreen('Niyam')}
          className="bg-[#163E2B] rounded-2xl sm:rounded-[22px] px-4 py-3.5 flex items-center justify-between text-white shadow-[0_4px_16px_rgba(22,62,43,0.18)] cursor-pointer hover:bg-[#113323] active:scale-[0.99] transition-all"
        >
          {/* Left: Star Icon inside circle + Text */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/25 bg-white/10 flex items-center justify-center shrink-0">
              <Star className="w-4.5 h-4.5 text-[#E6D4AA] fill-[#E6D4AA]/20 stroke-[1.8]" />
            </div>
            <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-wide">
              Daily Niyam Activity
            </h3>
          </div>

          {/* Right: OPEN Badge + Chevron Button */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.8 bg-white/15 border border-white/25 text-white text-[10px] font-extrabold rounded-md uppercase tracking-wider font-mono">
              OPEN
            </span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/90">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* 2.2 4 FEATURE CARDS (3 IN ROW 1, 1 IN ROW 2) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5 pt-1">
          
          {/* CARD 1: My Courses */}
          <div 
            id="student-card-my-courses"
            onClick={() => setActiveScreen('MyCourses')}
            className="bg-white rounded-2xl sm:rounded-[20px] p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all aspect-square min-h-[112px] group"
          >
            {/* 3D Stack of Books Icon */}
            <div className="w-12 h-12 flex items-center justify-center mb-1.5 relative">
              <svg viewBox="0 0 64 64" className="w-11 h-11 drop-shadow-xs" fill="none">
                {/* Bottom Book (Deep Green) */}
                <path d="M 12 40 L 48 40 C 52 40 54 42 54 44 L 54 47 C 54 49 52 51 48 51 L 12 51 C 8 51 8 40 12 40 Z" fill="#163E2B" />
                <path d="M 14 43 L 50 43 L 50 48 L 14 48 Z" fill="#F3EFE6" />
                <path d="M 8 41 C 8 40 10 40 12 40 L 14 40 L 14 51 L 12 51 C 10 51 8 51 8 41 Z" fill="#0E291D" />
                
                {/* Middle Book (Emerald Green) */}
                <path d="M 14 30 L 50 30 C 53 30 55 32 55 34 L 55 37 C 55 39 53 41 50 41 L 14 41 C 10 41 10 30 14 30 Z" fill="#2D5A38" />
                <path d="M 16 33 L 51 33 L 51 38 L 16 38 Z" fill="#FAF8F5" />
                <path d="M 10 31 C 10 30 12 30 14 30 L 16 30 L 16 41 L 14 41 C 12 41 10 41 10 31 Z" fill="#1C482C" />

                {/* Top Book (Dark Forest Green with Gold Emblem & Yellow Bookmark) */}
                <path d="M 16 18 L 48 18 C 51 18 53 20 53 22 L 53 30 C 53 32 51 33 48 33 L 16 33 C 12 33 12 18 16 18 Z" fill="#163E2B" />
                <path d="M 18 21 L 49 21 L 49 29 L 18 29 Z" fill="#F3EFE6" />
                <path d="M 12 19 C 12 18 14 18 16 18 L 18 18 L 18 33 L 16 33 C 14 33 12 33 12 19 Z" fill="#0F2D1F" />
                
                {/* Golden Spine Accent & Center Crest */}
                <line x1="20" y1="21" x2="20" y2="30" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="32" cy="22" r="2" fill="#C5A059" />

                {/* Golden Ribbon Bookmark dangling */}
                <path d="M 46 16 L 46 27 L 49 24 L 52 27 L 52 16 Z" fill="#E6D4AA" stroke="#C5A059" strokeWidth="0.8" />
              </svg>
            </div>
            
            {/* Label */}
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#163E2B]">
                My
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#163E2B]">
                Courses
              </span>
            </div>
          </div>

          {/* CARD 2: Courses */}
          <div 
            id="student-card-courses"
            onClick={() => setActiveScreen('Courses')}
            className="bg-white rounded-2xl sm:rounded-[20px] p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all aspect-square min-h-[112px] group"
          >
            {/* Open Book with Red Bookmark Ribbon Icon */}
            <div className="w-12 h-12 flex items-center justify-center mb-1.5 relative">
              <svg viewBox="0 0 64 64" className="w-11 h-11 drop-shadow-xs" fill="none">
                {/* Book Base Stand / Spine */}
                <path d="M 32 46 L 32 50 L 16 48 L 16 45 Z" fill="#163E2B" opacity="0.8" />
                <path d="M 32 46 L 32 50 L 48 48 L 48 45 Z" fill="#163E2B" opacity="0.8" />
                <rect x="14" y="47" width="36" height="3" rx="1.5" fill="#163E2B" />

                {/* Left Page Group */}
                <path d="M 32 44 C 24 43 18 41 14 43 L 14 24 C 18 22 24 24 32 26 Z" fill="#FAF8F5" stroke="#4D4438" strokeWidth="1.2" />
                {/* Left Page Text Lines */}
                <line x1="18" y1="28" x2="28" y2="30" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="32" x2="28" y2="34" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="36" x2="26" y2="38" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />

                {/* Right Page Group */}
                <path d="M 32 44 C 40 43 46 41 50 43 L 50 24 C 46 22 40 24 32 26 Z" fill="#FAF8F5" stroke="#4D4438" strokeWidth="1.2" />
                {/* Right Page Text Lines */}
                <line x1="36" y1="30" x2="46" y2="28" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="36" y1="34" x2="46" y2="32" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="36" y1="38" x2="44" y2="36" stroke="#B2A692" strokeWidth="1.5" strokeLinecap="round" />

                {/* Center Book Fold */}
                <line x1="32" y1="26" x2="32" y2="45" stroke="#8C806D" strokeWidth="1.5" strokeLinecap="round" />

                {/* Red Bookmark Ribbon in Center */}
                <path d="M 30 18 L 34 18 L 34 38 L 32 35 L 30 38 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Label */}
            <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#163E2B] mt-1">
              Courses
            </span>
          </div>

          {/* CARD 3: Quiz */}
          <div 
            id="student-card-quiz"
            onClick={() => setActiveScreen('GamesQuizHub')}
            className="bg-white rounded-2xl sm:rounded-[20px] p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-purple-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all aspect-square min-h-[112px] group"
          >
            {/* Purple Quiz Bubble with ? & Gold Sparkle Stars */}
            <div className="w-12 h-12 flex items-center justify-center mb-1.5 relative">
              <svg viewBox="0 0 64 64" className="w-11 h-11 drop-shadow-xs" fill="none">
                <defs>
                  {/* Purple Gradient for Quiz Bubble */}
                  <linearGradient id="quizPurpleGrad" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#906FC7" />
                    <stop offset="100%" stopColor="#6C49A8" />
                  </linearGradient>
                  {/* Gold Sparkle Gradient */}
                  <linearGradient id="sparkleGrad" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>

                {/* Main Purple Bubble */}
                <circle cx="32" cy="32" r="16" fill="url(#quizPurpleGrad)" />
                {/* Bubble highlight reflex */}
                <path d="M 23 23 C 27 19 35 19 39 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                {/* White Question Mark */}
                <text 
                  x="32" 
                  y="38" 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize="17" 
                  fontWeight="900" 
                  fontFamily="system-ui, sans-serif"
                >
                  ?
                </text>

                {/* Golden Sparkle Star (Top Right) */}
                <path d="M 46 16 L 47.5 19.5 L 51 21 L 47.5 22.5 L 46 26 L 44.5 22.5 L 41 21 L 44.5 19.5 Z" fill="url(#sparkleGrad)" />
                <circle cx="49" cy="15" r="1" fill="#FDE68A" />

                {/* Golden Sparkle Star (Bottom Left) */}
                <path d="M 18 38 L 19 40.5 L 21.5 41.5 L 19 42.5 L 18 45 L 17 42.5 L 14.5 41.5 L 17 40.5 Z" fill="url(#sparkleGrad)" />
              </svg>
            </div>
            
            {/* Label */}
            <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-purple-900 mt-1">
              Quiz
            </span>
          </div>

          {/* CARD 4: Online classes (Row 2, Column 1) */}
          <div 
            id="student-card-online-classes"
            onClick={() => setActiveScreen('LiveClassList')}
            className="bg-white rounded-2xl sm:rounded-[20px] p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all aspect-square min-h-[112px] group"
          >
            {/* Multi-Color Video Camera Icon (Google Meet Style) */}
            <div className="w-12 h-12 flex items-center justify-center mb-1.5 relative">
              <svg viewBox="0 0 64 64" className="w-11 h-11 drop-shadow-xs" fill="none">
                {/* Blue Top Band */}
                <path d="M 18 24 C 18 22 19.5 20.5 21.5 20.5 L 36.5 20.5 C 38.5 20.5 40 22 40 24 L 40 26 L 18 26 Z" fill="#2563EB" />
                
                {/* Yellow Middle-Top Band */}
                <rect x="18" y="26" width="22" height="6" fill="#F59E0B" />

                {/* Green Main Camera Body */}
                <path d="M 18 32 L 40 32 L 40 40 C 40 42 38.5 43.5 36.5 43.5 L 21.5 43.5 C 19.5 43.5 18 42 18 40 Z" fill="#10B981" />

                {/* Red Camera Lens Connector Side Cone */}
                <path d="M 40 27 L 48 21 C 49.5 20 51 21 51 23 L 51 41 C 51 43 49.5 44 48 43 L 40 37 Z" fill="#EF4444" />
                
                {/* Inner Lens Glass Highlight */}
                <path d="M 44 29 L 48 26 L 48 38 L 44 35 Z" fill="#DC2626" />
              </svg>
            </div>
            
            {/* Label */}
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#163E2B]">
                Online
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#163E2B]">
                classes
              </span>
            </div>
          </div>

        </div>

        {/* 2.3 STUDENT PROFILE CARD */}
        <div 
          id="student-profile-summary-card"
          className="bg-white rounded-2xl sm:rounded-[22px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4"
        >
          {/* Top Row: Avatar + Student Info + "Profile >" Button */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Circular Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#163E2B] text-white flex items-center justify-center font-extrabold text-sm sm:text-base font-mono tracking-wider shrink-0 shadow-xs">
                {studentInitials}
              </div>

              {/* Names & Level */}
              <div className="min-w-0">
                <span className="text-[9.5px] font-bold text-[#9C8E7D] uppercase tracking-wider block font-mono">
                  STUDENT PROFILE
                </span>
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 leading-snug truncate">
                  {studentName}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {studentLevel}
                </p>
              </div>
            </div>

            {/* Right: Profile Button */}
            <button 
              id="student-view-profile-btn"
              onClick={() => setActiveScreen('Profile')}
              className="px-3 py-1.5 bg-[#F0F7F2] hover:bg-[#E2F2E6] text-[#163E2B] text-xs font-extrabold rounded-full border border-emerald-100 flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 transition-all shadow-2xs"
            >
              <span>Profile</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Bottom Row: 3 Metric Boxes (Attendance, Gathas, Points) */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            
            {/* 1. Attendance */}
            <div 
              onClick={() => setActiveScreen('ProfileAttendance')}
              className="bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] border border-slate-150/80 rounded-2xl p-2.5 sm:p-3 text-center cursor-pointer transition-colors"
            >
              <span className="text-[9px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                ATTENDANCE
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 block mt-0.5">
                {attendanceVal}
              </span>
            </div>

            {/* 2. Gathas */}
            <div 
              onClick={() => setActiveScreen('SutraList')}
              className="bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] border border-slate-150/80 rounded-2xl p-2.5 sm:p-3 text-center cursor-pointer transition-colors"
            >
              <span className="text-[9px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                GATHAS
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 block mt-0.5">
                {gathasVal}
              </span>
            </div>

            {/* 3. Points */}
            <div 
              onClick={() => setActiveScreen('ProfileBonusPoints')}
              className="bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] border border-slate-150/80 rounded-2xl p-2.5 sm:p-3 text-center cursor-pointer transition-colors"
            >
              <span className="text-[9px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                POINTS
              </span>
              <span className="text-sm sm:text-base font-black text-[#163E2B] block mt-0.5">
                {pointsVal}
              </span>
            </div>

          </div>
        </div>

        {/* 2.4 INSPIRATIONAL DAILY JAIN THOUGHT / SUTRA CARD */}
        <div className="bg-[#FAF6ED] border border-[#EADBBD] rounded-2xl p-3.5 sm:p-4 relative overflow-hidden shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/90 shadow-2xs flex items-center justify-center shrink-0 text-[#C4883A] font-serif text-lg font-bold">
              “
            </div>
            <div className="space-y-1 pr-2">
              <p className="text-xs text-[#332B22] font-medium leading-relaxed font-serif italic">
                "{currentQuote?.text || "Purity of mind, truthfulness in conduct, and dedication to knowledge are the three pillars of true wisdom."}"
              </p>
              <p className="text-[10px] font-bold text-[#163E2B] font-mono">
                — {currentQuote?.author || "Acharya Bhagwant Jinadattasuri"}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. NAVIGATION DRAWER (Slide over from left) */}
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
              <div className="bg-gradient-to-br from-[#163E2B] to-[#0D281C] text-white p-5 space-y-3 relative">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#163E2B] flex items-center justify-center font-black text-base font-mono shadow-md">
                    {studentInitials}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">{studentName}</h3>
                    <p className="text-[11px] text-[#F3EAD3] font-medium">{studentLevel}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold text-amber-200">
                      Roll: {student?.rollNo || "KEP-2026-042"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Items List */}
              <div className="flex-1 p-4 space-y-1 divide-y divide-slate-100">
                <div className="space-y-1 pb-3">
                  {[
                    { id: 'Home', label: 'Home Dashboard', icon: GraduationCap },
                    { id: 'MyCourses', label: 'My Courses (Enrolled)', icon: BookOpen },
                    { id: 'Courses', label: 'All Courses & Curriculum', icon: BookOpen },
                    { id: 'LiveClassList', label: 'Online Live Classes', icon: Tv },
                    { id: 'Niyam', label: 'Daily Niyam Activity', icon: Star },
                    { id: 'SutraList', label: 'Sutras & Gathas Recital', icon: FileText },
                    { id: 'StavanList', label: 'Stavan & Devotional Prayers', icon: Volume2 },
                    { id: 'GamesQuizHub', label: 'Quiz & Knowledge Games', icon: HelpCircle },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setActiveScreen(item.id);
                      }}
                      className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-[#163E2B] font-semibold text-xs transition-colors cursor-pointer text-left"
                    >
                      <item.icon className="w-4.5 h-4.5 text-[#163E2B]" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider px-3.5 block mb-1">
                    ACADEMICS & SETTINGS
                  </span>
                  {[
                    { id: 'ProfileReportCard', label: 'Academic Report Card', icon: Award },
                    { id: 'ProfileAttendance', label: 'Attendance Records', icon: Calendar },
                    { id: 'ProfileBonusPoints', label: 'Bonus Points History', icon: Sparkles },
                    { id: 'Downloads', label: 'Offline Material & PDFs', icon: ShoppingBag },
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
                <span>Khartargach E-Pathshala</span>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setActiveScreen('Login');
                  }}
                  className="text-[#163E2B] font-bold hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MODAL: HELPLINE & CONTACT SUPPORT */}
      <AnimatePresence>
        {showHelplineModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-emerald-900/20"
            >
              <div className="bg-gradient-to-r from-[#163E2B] to-[#0D281C] text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold text-sm text-white">Khartargach Pathshala Helpline</h3>
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
                  <span className="text-[9.5px] font-bold text-[#163E2B] uppercase tracking-wider block">OFFICE DESK (09:00 AM - 07:00 PM)</span>
                  <p className="font-black text-slate-800 text-sm">+91 88500 91468</p>
                  <p className="text-[11px] text-slate-500">Contact for admissions, curriculum & batch schedules.</p>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-2xl space-y-1">
                  <span className="text-[9.5px] font-bold text-amber-800 uppercase tracking-wider block">WHATSAPP HELPDESK</span>
                  <p className="font-black text-slate-800 text-sm">+91 91599 41468</p>
                  <p className="text-[11px] text-slate-500">Instant query resolution and PDF syllabus support.</p>
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
