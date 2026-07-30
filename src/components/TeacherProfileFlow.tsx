import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Shield, 
  Lock, 
  Bell, 
  Languages, 
  HelpCircle, 
  Info, 
  ChevronRight, 
  LogOut, 
  Edit3, 
  Check, 
  X, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  AlertCircle
} from 'lucide-react';

interface TeacherProfileFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
  setCurrentLoggedInTeacher?: (teacher: any) => void;
}

export function TeacherProfileFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher,
  setCurrentLoggedInTeacher
}: TeacherProfileFlowProps) {
  // Determine who is logged in and set up default details
  const isPragya = currentLoggedInTeacher?.name === "Samani Pragya ji" || !currentLoggedInTeacher;
  
  const [profileData, setProfileData] = useState({
    id: isPragya ? "T1" : "T2",
    name: currentLoggedInTeacher?.name || "Samani Pragya ji",
    phone: isPragya ? "+91 98234 56789" : "+91 91234 56780",
    email: currentLoggedInTeacher?.email || (isPragya ? "teacher@example.com" : "shrutpragya@example.com"),
    qualification: isPragya ? "M.A. & Ph.D. in Jainology & Prakrit Literature" : "Ph.D. in Yoga, Meditation & Indology",
    experience: isPragya ? "15 Years teaching moral science and Agam sutras" : "22 Years in Spiritual & Mindful Counseling",
    address: isPragya ? "Jain Vishva Bharati Sansthan, Ladnun, Rajasthan" : "Peace of Mind Foundation, Rajkot, Gujarat",
    assignedLevels: isPragya ? ["Level 1: Basic Sutras & Stories", "Level 2: Jain Geography & Symbols"] : ["Level 2: Jain Geography & Symbols", "Level 3: Pratikraman & Advanced Vows"],
    assignedBatches: isPragya ? ["Batch A - Morning", "Batch B - Afternoon"] : ["Batch B - Afternoon", "Batch C - Evening"],
    totalStudents: isPragya ? 35 : 24,
    weeklyClasses: isPragya ? 6 : 4
  });

  // Settings Sub-pages / Dialogs State
  const [activeModal, setActiveModal] = useState<'none' | 'editProfile' | 'changePassword' | 'help' | 'about' | 'privacy'>('none');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Preference States
  const [notificationPrefs, setNotificationPrefs] = useState({
    liveClassReminders: true,
    gathaSubmissions: true,
    pendingApprovals: true,
    studentPromotions: true,
    announcements: false
  });

  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Gujarati'>('English');

  // Forms Draft States
  const [editForm, setEditForm] = useState({ ...profileData });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load language settings from local storage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('shalaLanguage');
    if (savedLang === 'Hindi' || savedLang === 'Gujarati' || savedLang === 'English') {
      setLanguage(savedLang);
    }
    // Explicitly reset or ensure body does not have 'dark' class
    document.documentElement.classList.remove('dark');
  }, []);

  const handleLanguageChange = (lang: 'English' | 'Hindi' | 'Gujarati') => {
    setLanguage(lang);
    localStorage.setItem('shalaLanguage', lang);
    alert(`Language switched to ${lang}. Preferences saved!`);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.phone.trim() || !editForm.email.trim()) {
      alert("Name, phone and email cannot be blank.");
      return;
    }
    setProfileData(editForm);
    if (setCurrentLoggedInTeacher) {
      setCurrentLoggedInTeacher({
        ...currentLoggedInTeacher,
        name: editForm.name,
        email: editForm.email
      });
    }
    setActiveModal('none');
    alert("Profile information successfully updated!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    // Simulate successful password change
    alert("Password successfully updated!");
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveModal('none');
  };

  // Simulated Logout Action
  const handleLogoutAction = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem('shalaSession');
    window.location.reload();
  };

  return (
    <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
      
      {/* HEADER BAR */}
      <div className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between border-b bg-white border-slate-200">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Teacher Profile</h2>
          <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Account Settings</p>
        </div>
        <span className="text-[9px] font-black px-2 py-1 rounded border uppercase bg-slate-100 text-slate-600 border-slate-200">
          ID: {profileData.id}
        </span>
      </div>

      <div className="p-5 space-y-5">

        {/* 1. TEACHER INFORMATION BRIEF CARD */}
        <div className="border rounded-3xl p-5 shadow-sm space-y-4 bg-white border-slate-200">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#163E2B] font-extrabold text-xl flex items-center justify-center shadow-inner shrink-0">
              {profileData.name.split(' ').map(n => n[0]).join('').substring(0, 3)}
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900">{profileData.name}</h3>
              <p className="text-xs font-semibold text-slate-400">Guru / Instructor</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profileData.email}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profileData.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Expanded Details list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3.5 border-t border-slate-100 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Qualification</span>
              <p className="font-semibold text-slate-700">{profileData.qualification}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Experience</span>
              <p className="font-semibold text-slate-700">{profileData.experience}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Registered Address</span>
              <p className="font-semibold text-slate-700">{profileData.address}</p>
            </div>
          </div>

          {/* Quick Edit Profile Action */}
          <div className="pt-2 flex justify-end">
            <button 
              onClick={() => {
                setEditForm({ ...profileData });
                setActiveModal('editProfile');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3 h-3 text-slate-500" />
              Edit Profile Info
            </button>
          </div>
        </div>

        {/* 2. ACADEMIC ASSIGNMENT CARD (Read-only) */}
        <div className="border rounded-3xl p-5 shadow-sm space-y-4.5 bg-white border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Academic Assignment</h3>
          
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3 rounded-xl border text-center bg-slate-50 border-slate-100">
              <Users className="w-4 h-4 mx-auto mb-1 text-blue-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Total Students</span>
              <span className="text-base font-black text-slate-800">{profileData.totalStudents} Active</span>
            </div>
            <div className="p-3 rounded-xl border text-center bg-slate-50 border-slate-100">
              <Calendar className="w-4 h-4 mx-auto mb-1 text-indigo-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Weekly Classes</span>
              <span className="text-base font-black text-slate-800">{profileData.weeklyClasses} Sessions</span>
            </div>
          </div>

          <div className="space-y-3 pt-1.5">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">My Assigned Levels</span>
              <div className="flex flex-wrap gap-1.5">
                {profileData.assignedLevels.map((lvl, i) => (
                  <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg border bg-slate-100/70 text-slate-700 border-slate-200">
                    {lvl}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">My Assigned Batches</span>
              <div className="flex flex-wrap gap-1.5">
                {profileData.assignedBatches.map((b, i) => (
                  <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg border bg-slate-100/70 text-slate-700 border-slate-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACCOUNT SETTINGS SECTIONS */}
        <div className="border rounded-3xl overflow-hidden shadow-sm bg-white border-slate-200">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Account Settings & Preferences</h3>
          </div>

          <div className="divide-y divide-slate-100">

            {/* Language Selection Setting */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">App Language</span>
                  <span className="text-[10px] text-slate-400 block">Select active language translation</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['English', 'Hindi', 'Gujarati'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`py-1.5 text-[10px] font-black rounded-lg border text-center transition-colors cursor-pointer ${
                      language === lang
                        ? 'bg-emerald-50 text-[#163E2B] border-emerald-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Preferences Sub-block */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Notification Preferences</span>
                  <span className="text-[10px] text-slate-400 block">Configure critical reminders alerts</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { key: 'liveClassReminders', label: 'Live Class Reminders' },
                  { key: 'gathaSubmissions', label: 'Gatha Submissions' },
                  { key: 'pendingApprovals', label: 'Pending Approvals' },
                  { key: 'studentPromotions', label: 'Student Promotions' },
                  { key: 'announcements', label: 'Announcements' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between text-xs py-1 cursor-pointer select-none">
                    <span className="font-semibold text-slate-500">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={(notificationPrefs as any)[item.key]}
                      onChange={(e) => {
                        setNotificationPrefs(prev => ({
                          ...prev,
                          [item.key]: e.target.checked
                        }));
                      }}
                      className="rounded text-[#163E2B] focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Action Item Change Password */}
            <button 
              onClick={() => {
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setActiveModal('changePassword');
              }}
              className="p-4 flex items-center justify-between w-full hover:bg-slate-50/50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Change Account Password</span>
                  <span className="text-[10px] text-slate-400 block">Update and verify secure credentials</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* Help & Support Desk */}
            <button 
              onClick={() => setActiveModal('help')}
              className="p-4 flex items-center justify-between w-full hover:bg-slate-50/50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Help & Support Desk</span>
                  <span className="text-[10px] text-slate-400 block">FAQs, teacher manual & contact form</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* About Application */}
            <button 
              onClick={() => setActiveModal('about')}
              className="p-4 flex items-center justify-between w-full hover:bg-slate-50/50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">About Application</span>
                  <span className="text-[10px] text-slate-400 block">Version details, release notes & framework</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* Privacy Policy */}
            <button 
              onClick={() => setActiveModal('privacy')}
              className="p-4 flex items-center justify-between w-full hover:bg-slate-50/50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Privacy Policy</span>
                  <span className="text-[10px] text-slate-400 block">Gyan Vatika academic policy logs</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

          </div>
        </div>

        {/* LOGOUT BUTTON ACTION */}
        <div className="pt-2">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full bg-[#163E2B]/10 text-[#163E2B] border border-emerald-200 hover:bg-[#163E2B]/20 font-black py-3.5 rounded-xl transition-all shadow-xs flex justify-center items-center gap-2 cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Profile
          </button>
        </div>

      </div>

      {/* ----------------- MODALS & DIALOG OVERLAYS ----------------- */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-5 z-55"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="rounded-3xl p-5 w-full max-w-md border shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto bg-white border-slate-200"
            >
              
              {/* EDIT PROFILE MODAL */}
              {activeModal === 'editProfile' && (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black">Edit Profile Information</h3>
                    <button type="button" onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Full Name</label>
                      <input 
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Mobile Number</label>
                      <input 
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Email Address</label>
                      <input 
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Academic Qualification</label>
                      <input 
                        type="text"
                        value={editForm.qualification}
                        onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Teaching Experience</label>
                      <input 
                        type="text"
                        value={editForm.experience}
                        onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Registered Address</label>
                      <textarea 
                        value={editForm.address}
                        rows={2}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 text-xs">
                    <button type="button" onClick={() => setActiveModal('none')} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs">Save Updates</button>
                  </div>
                </form>
              )}

              {/* CHANGE PASSWORD MODAL */}
              {activeModal === 'changePassword' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black">Change Account Password</h3>
                    <button type="button" onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Current Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">New Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                        placeholder="Minimum 6 characters"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-400 block mb-1 uppercase tracking-wide">Confirm New Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 text-xs">
                    <button type="button" onClick={() => setActiveModal('none')} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs">Verify & Update</button>
                  </div>
                </form>
              )}

              {/* HELP & SUPPORT DESK */}
              {activeModal === 'help' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black">Help & Support Desk</h3>
                    <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="space-y-3.5 text-xs max-h-[50vh] overflow-y-auto pr-1">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900">Q: How do students submit Gatha recitations?</span>
                      <p className="text-slate-500">A: Students use their recording panel inside the mobile workspace to submit audio recite files. These show up on your dashboard instantly under Pending Approvals.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900">Q: Is Sunday Attendance mandatory?</span>
                      <p className="text-slate-500">A: No. Sunday sessions are optional moral reinforcement classes. Absent students do not receive penalty marks, only present students receive bonus points.</p>
                    </div>
                    <div className="space-y-1 border-t border-slate-100 pt-3">
                      <span className="font-black text-rose-700">Contact Support Center</span>
                      <p className="text-slate-500">If you experience technical issues or synchronization problems, write to us at:</p>
                      <p className="font-mono font-bold text-slate-700">support@pathshalaportal.edu</p>
                    </div>
                  </div>
                  
                  <button onClick={() => setActiveModal('none')} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                    Close Help Desk
                  </button>
                </div>
              )}

              {/* ABOUT APPLICATION */}
              {activeModal === 'about' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black">About Application</h3>
                    <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="text-center py-3 space-y-2">
                    <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center justify-center font-black text-lg mx-auto shadow-inner">
                      JS
                    </div>
                    <div>
                      <h4 className="font-black text-sm">Pathshala Academic ERP</h4>
                      <p className="text-[10px] font-bold text-slate-400">VERSION 2.4.0 (STABLE RELEASE)</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl text-xs space-y-1.5 text-slate-500">
                    <p>Designed for moral values, Sutras recitation, and Gatha validation for young spiritual learners.</p>
                    <p>Powered by modern full-stack web runtime utilizing secure local client persistence mechanisms.</p>
                  </div>
                  
                  <button onClick={() => setActiveModal('none')} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                    Close About
                  </button>
                </div>
              )}

              {/* PRIVACY POLICY */}
              {activeModal === 'privacy' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-black">Privacy Policy</h3>
                    <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-500 space-y-2 max-h-[45vh] overflow-y-auto leading-relaxed">
                    <p className="font-bold text-slate-800">1. Academic Data Integrity</p>
                    <p>Pathshala Academic ERP maintains student attendance logs, Sutras progress scores, and moral certificates solely to evaluate moral progression. No personal information is monetized or shared.</p>
                    <p className="font-bold text-slate-800">2. Teacher-Student Privacy</p>
                    <p>Teachers can only view, monitor, and correct information belonging to students in their own batches. Under no circumstances can a teacher access grades or logs belonging to other classrooms.</p>
                  </div>
                  
                  <button onClick={() => setActiveModal('none')} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                    Close Policy
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}

        {/* LOGOUT CONFIRMATION DIALOG */}
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-5 z-55"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="rounded-3xl p-5 w-full max-w-sm border shadow-2xl space-y-4 bg-white border-slate-200"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <AlertCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-base font-black">Sign Out Confirmation</h3>
                <p className="text-xs text-slate-400">Are you sure you want to logout? You will need to verify credentials to re-enter the teacher panel.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogoutAction}
                  className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
