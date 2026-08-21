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
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface TeacherProfileFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
  setCurrentLoggedInTeacher?: (teacher: any) => void;
  teacherSelectedStudent?: any;
  setTeacherSelectedStudent?: (student: any) => void;
}

export function TeacherProfileFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher,
  setCurrentLoggedInTeacher,
  teacherSelectedStudent,
  setTeacherSelectedStudent
}: TeacherProfileFlowProps) {
  // Navigation view state inside profile flow
  const [view, setView] = useState<'main' | 'editProfile' | 'academicAssignment' | 'accountSettings' | 'preferences'>('main');

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

  // Assigned students database with student profile images and names
  const assignedStudentsList = [
    {
      id: 'STU001',
      name: 'Aarav Shah',
      initials: 'AS',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      parentName: 'Rahul Shah',
      contactNumber: '+1 (555) 123-4567',
      gathaProgress: '8/10',
      attendancePercentage: '92%',
      status: 'Active',
      academicStatus: 'Excellent',
      bonusPoints: 120,
      teacher: "Samani Pragya ji",
      pendingGathas: [
        { id: 'g1', name: 'Navkar Mantra', submittedOn: '2023-10-25' },
        { id: 'g2', name: 'Chattari Mangalam', submittedOn: '2023-10-26' }
      ]
    },
    {
      id: 'STU002',
      name: 'Diya Patel',
      initials: 'DP',
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      parentName: 'Sneha Patel',
      contactNumber: '+1 (555) 987-6543',
      gathaProgress: '5/10',
      attendancePercentage: '85%',
      status: 'Active',
      academicStatus: 'Good',
      bonusPoints: 85,
      teacher: "Samani Pragya ji",
      pendingGathas: [
        { id: 'g3', name: 'Logassa', submittedOn: '2023-10-24' }
      ]
    },
    {
      id: 'STU003',
      name: 'Rohan Jain',
      initials: 'RJ',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      parentName: 'Vikram Jain',
      contactNumber: '+1 (555) 246-8135',
      gathaProgress: '12/15',
      attendancePercentage: '98%',
      status: 'Revision Stage',
      academicStatus: 'Outstanding',
      bonusPoints: 210,
      teacher: "Samani Pragya ji",
      pendingGathas: []
    },
    {
      id: 'STU004',
      name: 'Kavya Doshi',
      initials: 'KD',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      level: 'Level 2: Jain Geography & Symbols',
      batch: 'Batch B - Afternoon',
      parentName: 'Priya Doshi',
      contactNumber: '+1 (555) 369-2580',
      gathaProgress: '10/10',
      attendancePercentage: '100%',
      status: 'Awaiting Promotion',
      academicStatus: 'Exceptional',
      bonusPoints: 320,
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      pendingGathas: []
    },
    {
      id: 'STU005',
      name: 'Siddharth Mehta',
      initials: 'SM',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      level: 'Level 1: Basic Sutras & Stories',
      batch: 'Batch A - Morning',
      parentName: 'Anil Mehta',
      contactNumber: '+1 (555) 741-8520',
      gathaProgress: '7/10',
      attendancePercentage: '90%',
      status: 'Active',
      academicStatus: 'Excellent',
      bonusPoints: 110,
      teacher: "Pujya Samanji Dr. Shrutpragya ji",
      pendingGathas: []
    }
  ].filter(s => s.teacher === (currentLoggedInTeacher?.name || "Samani Pragya ji"));

  // Modals inside details pages
  const [activeModal, setActiveModal] = useState<'none' | 'changePassword' | 'help' | 'about' | 'privacy'>('none');
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

  // Forms States
  const [editForm, setEditForm] = useState({ ...profileData });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('shalaLanguage');
    if (savedLang === 'Hindi' || savedLang === 'Gujarati' || savedLang === 'English') {
      setLanguage(savedLang);
    }
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
    setView('main');
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
    alert("Password successfully updated!");
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveModal('none');
  };

  const handleLogoutAction = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem('shalaSession');
    window.location.reload();
  };

  const handleStudentClick = (student: any) => {
    if (setTeacherSelectedStudent) {
      setTeacherSelectedStudent(student);
    }
    setActiveScreen('TeacherStudentProfile');
  };

  // 1. EDIT PROFILE DETAILS SCREEN
  if (view === 'editProfile') {
    return (
      <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
        <div className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3 border-b bg-white border-slate-200">
          <button 
            onClick={() => setView('main')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Edit Profile Details</h2>
            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Teacher Account Settings</p>
          </div>
        </div>

        <div className="p-5">
          <form onSubmit={handleEditSubmit} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Mobile Number</label>
                <input 
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Academic Qualification</label>
                <input 
                  type="text"
                  value={editForm.qualification}
                  onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Teaching Experience</label>
                <input 
                  type="text"
                  value={editForm.experience}
                  onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Registered Address</label>
                <textarea 
                  value={editForm.address}
                  rows={3}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 resize-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-xs">
              <button 
                type="button" 
                onClick={() => setView('main')} 
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. ACADEMIC ASSIGNMENT DETAILS SCREEN
  if (view === 'academicAssignment') {
    return (
      <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
        <div className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3 border-b bg-white border-slate-200">
          <button 
            onClick={() => setView('main')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Academic Assignment</h2>
            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Batches, Levels & Student List</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Summary Cards */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Teacher Summary</h3>
            
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl border text-center bg-emerald-50/50 border-emerald-100">
                <Users className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Total Assigned Students</span>
                <span className="text-lg font-black text-emerald-900">{assignedStudentsList.length} Students</span>
              </div>
              <div className="p-3.5 rounded-2xl border text-center bg-blue-50/50 border-blue-100">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-700" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Weekly Classes</span>
                <span className="text-lg font-black text-blue-900">{profileData.weeklyClasses} Sessions</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Assigned Levels</span>
                <div className="flex flex-wrap gap-2">
                  {profileData.assignedLevels.map((lvl, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-slate-100 text-slate-700 border-slate-200">
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Assigned Batches</span>
                <div className="flex flex-wrap gap-2">
                  {profileData.assignedBatches.map((b, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-slate-100 text-slate-700 border-slate-200">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Students List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Assigned Student Roster</h3>
              <span className="text-xs font-bold text-slate-500">{assignedStudentsList.length} Enrolled</span>
            </div>

            <div className="space-y-2.5">
              {assignedStudentsList.map((student) => (
                <div 
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                  className="bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md rounded-2xl p-4 shadow-sm transition-all cursor-pointer group flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-emerald-100 shadow-xs bg-emerald-50 flex items-center justify-center">
                      {student.photoUrl ? (
                        <img 
                          src={student.photoUrl} 
                          alt={student.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <span className="text-sm font-black text-emerald-800">{student.initials}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {student.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                        {student.level.split(':')[0]} • {student.batch}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 font-bold block mt-0.5">
                        ID: {student.id}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      View
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. ACCOUNT SETTINGS DETAILS SCREEN
  if (view === 'accountSettings') {
    return (
      <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
        <div className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3 border-b bg-white border-slate-200">
          <button 
            onClick={() => setView('main')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Account Settings</h2>
            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Security & Options</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {/* Change Password */}
            <button 
              onClick={() => {
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setActiveModal('changePassword');
              }}
              className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-900">Change Account Password</span>
                  <span className="text-[10px] text-slate-400 block">Update and verify secure credentials</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* Help & Support */}
            <button 
              onClick={() => setActiveModal('help')}
              className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700">
                  <HelpCircle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-900">Help & Support Desk</span>
                  <span className="text-[10px] text-slate-400 block">Teacher manual, FAQs & contact support</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* About Application */}
            <button 
              onClick={() => setActiveModal('about')}
              className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700">
                  <Info className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-900">About Application</span>
                  <span className="text-[10px] text-slate-400 block">Version details, release notes & framework</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            {/* Privacy Policy */}
            <button 
              onClick={() => setActiveModal('privacy')}
              className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50 text-left transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-900">Privacy Policy</span>
                  <span className="text-[10px] text-slate-400 block">Gyan Vatika privacy policy rules</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-black py-3.5 rounded-xl transition-all shadow-xs flex justify-center items-center gap-2 cursor-pointer active:scale-98"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Account
            </button>
          </div>
        </div>

        {/* MODALS OVERLAY FOR ACCOUNT SETTINGS */}
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
                {/* CHANGE PASSWORD */}
                {activeModal === 'changePassword' && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-black text-slate-900">Change Account Password</h3>
                      <button type="button" onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Current Password</label>
                        <input 
                          type="password"
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">New Password</label>
                        <input 
                          type="password"
                          required
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                          placeholder="Minimum 6 characters"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-500 block mb-1 uppercase tracking-wide">Confirm New Password</label>
                        <input 
                          type="password"
                          required
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
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

                {/* HELP & SUPPORT */}
                {activeModal === 'help' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-black text-slate-900">Help & Support Desk</h3>
                      <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-3.5 text-xs max-h-[50vh] overflow-y-auto pr-1">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900">Q: How do students submit Gatha recitations?</span>
                        <p className="text-slate-500">A: Students submit audio recitations through their mobile app. These show up on your teacher dashboard instantly under Gatha Approvals.</p>
                      </div>
                      <div className="space-y-1 border-t border-slate-100 pt-3">
                        <span className="font-black text-emerald-800">Contact Support Center</span>
                        <p className="text-slate-500">For issues or inquiries, write to us at:</p>
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
                      <h3 className="text-base font-black text-slate-900">About Application</h3>
                      <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="text-center py-3 space-y-2">
                      <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-lg mx-auto shadow-inner">
                        JS
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-900">Pathshala Academic ERP</h4>
                        <p className="text-[10px] font-bold text-slate-400">VERSION 2.4.0 (STABLE RELEASE)</p>
                      </div>
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
                      <h3 className="text-base font-black text-slate-900">Privacy Policy</h3>
                      <button onClick={() => setActiveModal('none')} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-500 space-y-2">
                      <p className="font-bold text-slate-800">Academic Data Integrity</p>
                      <p>Pathshala Academic ERP maintains student attendance and Gatha progress scores solely to evaluate learning progress.</p>
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
                  <h3 className="text-base font-black text-slate-900">Sign Out Confirmation</h3>
                  <p className="text-xs text-slate-400">Are you sure you want to sign out? You will return to the login screen.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl cursor-pointer text-slate-700"
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

  // 4. PREFERENCES DETAILS SCREEN
  if (view === 'preferences') {
    return (
      <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
        <div className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3 border-b bg-white border-slate-200">
          <button 
            onClick={() => setView('main')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Preferences</h2>
            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Language & Notifications</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Language Selection */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-700">
                <Languages className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-slate-900">App Display Language</span>
                <span className="text-[10px] text-slate-400 block">Select active interface translation</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {(['English', 'Hindi', 'Gujarati'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`py-2 text-xs font-black rounded-xl border text-center transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-emerald-50 text-[#163E2B] border-emerald-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 text-blue-700">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-slate-900">Notification Alerts</span>
                <span className="text-[10px] text-slate-400 block">Configure class reminders & submission alerts</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 divide-y divide-slate-100">
              {[
                { key: 'liveClassReminders', label: 'Live Class Reminders', desc: 'Alerts before scheduled live sessions' },
                { key: 'gathaSubmissions', label: 'Gatha Submissions', desc: 'Alert when a student submits a new Gatha' },
                { key: 'pendingApprovals', label: 'Pending Approvals', desc: 'Reminders for pending student approvals' },
                { key: 'studentPromotions', label: 'Student Promotions', desc: 'Updates when students complete syllabus' },
                { key: 'announcements', label: 'Announcements', desc: 'General institution circulars & notices' }
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between text-xs pt-3 cursor-pointer select-none">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={(notificationPrefs as any)[item.key]}
                    onChange={(e) => {
                      setNotificationPrefs(prev => ({
                        ...prev,
                        [item.key]: e.target.checked
                      }));
                    }}
                    className="rounded text-[#163E2B] focus:ring-emerald-500 w-4.5 h-4.5 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0. MAIN LIST VIEW SCREEN (Teacher Profile)
  return (
    <div className="h-full bg-slate-50 text-slate-800 overflow-y-auto pb-24">
      {/* HEADER BAR */}
      <div className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between border-b bg-white border-slate-200">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Teacher Profile</h2>
          <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Account Settings & Roster</p>
        </div>
        <span className="text-[9px] font-black px-2 py-1 rounded border uppercase bg-slate-100 text-slate-600 border-slate-200">
          ID: {profileData.id}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* TEACHER IDENTITY CARD */}
        <div className="border rounded-3xl p-5 shadow-sm space-y-3 bg-white border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#163E2B] font-extrabold text-xl flex items-center justify-center shadow-inner shrink-0">
              {profileData.name.split(' ').map(n => n[0]).join('').substring(0, 3)}
            </div>
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-base font-black text-slate-900 truncate">{profileData.name}</h3>
              <p className="text-xs font-semibold text-slate-400">Guru / Instructor</p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profileData.email}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profileData.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LIST VIEW NAVIGATION OPTIONS */}
        <div className="border rounded-3xl overflow-hidden shadow-sm bg-white border-slate-200 divide-y divide-slate-100">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Navigation Menu</h3>
          </div>

          {/* 1. Edit Profile */}
          <button 
            onClick={() => setView('editProfile')}
            className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50/80 text-left transition-colors cursor-pointer border-none bg-transparent group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0 group-hover:scale-105 transition-transform">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold block text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Edit Profile
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Update personal details, contact info & address
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-700 transition-colors shrink-0" />
          </button>

          {/* 2. Academic Assignment */}
          <button 
            onClick={() => setView('academicAssignment')}
            className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50/80 text-left transition-colors cursor-pointer border-none bg-transparent group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-800 border border-blue-100 shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold block text-slate-900 group-hover:text-blue-800 transition-colors">
                  Academic Assignment
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Assigned levels, batches & student roster
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-700 transition-colors shrink-0" />
          </button>

          {/* 3. Account Settings */}
          <button 
            onClick={() => setView('accountSettings')}
            className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50/80 text-left transition-colors cursor-pointer border-none bg-transparent group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-800 border border-indigo-100 shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold block text-slate-900 group-hover:text-indigo-800 transition-colors">
                  Account Settings
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Security, password, support & app info
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-700 transition-colors shrink-0" />
          </button>

          {/* 4. Preferences */}
          <button 
            onClick={() => setView('preferences')}
            className="p-4.5 flex items-center justify-between w-full hover:bg-slate-50/80 text-left transition-colors cursor-pointer border-none bg-transparent group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-800 border border-amber-100 shrink-0 group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold block text-slate-900 group-hover:text-amber-800 transition-colors">
                  Preferences
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  App language, notification alerts & reminders
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-700 transition-colors shrink-0" />
          </button>
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
              <h3 className="text-base font-black text-slate-900">Sign Out Confirmation</h3>
              <p className="text-xs text-slate-400">Are you sure you want to sign out? You will return to the login screen.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl cursor-pointer text-slate-700"
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
    </div>
  );
}
