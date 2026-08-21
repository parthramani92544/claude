import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  BookOpen,
  Video,
  CalendarCheck,
  Award,
  Music,
  FileAudio,
  Gamepad2,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Send,
  BarChart3,
  Palette,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
  Search,
  Globe,
  Settings,
  Sparkles,
  Layers,
  Database,
  Building2,
} from 'lucide-react';

import {
  AdminRole,
  AdminTab,
  ToastMessage,
  PeopleSubTab,
  AcademicSubTab,
  ClassesSubTab,
  ContentSubTab,
  ActivitiesSubTab,
  AdministrationSubTab,
} from './types';
import { initialAdminState } from './data';

import { ToastContainer } from './components/ToastContainer';
import { LogoutModal } from './components/LogoutModal';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { StudentManagement } from './components/StudentManagement';
import { RegistrationApprovals } from './components/RegistrationApprovals';
import { TeachersManagement } from './components/TeachersManagement';
import { AcademicStructure } from './components/AcademicStructure';
import { StudentProgress } from './components/StudentProgress';
import { LevelSyllabusManagement } from './components/LevelSyllabusManagement';
import { SyllabusManagementView } from './components/SyllabusManagementView';
import { LiveClasses } from './components/LiveClasses';
import { AttendanceTracking } from './components/AttendanceTracking';
import { SutrasGathas } from './components/SutrasGathas';
import { StavanLibrary } from './components/StavanLibrary';
import { AudioLibrary } from './components/AudioLibrary';
import { GamesConsole } from './components/GamesConsole';
import { NiyamTracking } from './components/NiyamTracking';
import { BonusPoints } from './components/BonusPoints';
import { SystemAdmin } from './components/SystemAdmin';
import { BroadcastCenter } from './components/BroadcastCenter';
import { ReportsEngine } from './components/ReportsEngine';
import { DesignSystem } from './components/DesignSystem';
import { MastersManagement } from './components/MastersManagement';
import { GlobalShowcase } from './components/GlobalShowcase';
import { UnifiedLearningContent } from './components/UnifiedLearningContent';

interface AdminPortalProps {
  onReturnToLauncher?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onReturnToLauncher }) => {
  // Global Admin State
  const [adminState, setAdminState] = useState(initialAdminState);
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [currentRole, setCurrentRole] = useState<AdminRole>('SuperAdmin');

  // Sub-tab selection state for containers
  const [peopleSubTab, setPeopleSubTab] = useState<PeopleSubTab>('students');
  const [classesSubTab, setClassesSubTab] = useState<ClassesSubTab>('live_classes');
  const [academicSubTab, setAcademicSubTab] = useState<AcademicSubTab>('levels');
  const [activitiesSubTab, setActivitiesSubTab] = useState<ActivitiesSubTab>('niyam');
  const [contentSubTab, setContentSubTab] = useState<ContentSubTab>('sutras');
  const [administrationSubTab, setAdministrationSubTab] = useState<AdministrationSubTab>('users');

  // Sidebar mobile toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Logout modal state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `TST-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [newToast, ...prev]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State Mutators for Modules
  const handleApproveRegistration = (reg: typeof adminState.registrations[0], assignedLevel: string, assignedBatch: string) => {
    setAdminState((prev) => {
      const updatedRegs = prev.registrations.map((r) =>
        r.id === reg.id ? { ...r, status: 'Approved' as const } : r
      );

      const newStudent = {
        id: `STU-${Math.floor(100 + Math.random() * 900)}`,
        grNo: `JEP-${Math.floor(202600 + Math.random() * 90)}`,
        firstName: reg.firstName,
        surname: reg.surname,
        guardianName: reg.guardianName,
        phone: reg.phone,
        email: reg.email,
        dob: reg.dob,
        level: assignedLevel,
        batch: assignedBatch,
        pointsBalance: 50,
        totalGathas: 0,
        attendanceRate: 100,
        status: 'Active' as const,
        photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
      };

      const newAudit = {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actorName: 'Admin Office',
        actorRole: currentRole,
        action: 'APPROVED_REGISTRATION',
        module: 'Registrations',
        details: `Approved student ${reg.firstName} ${reg.surname} into ${assignedLevel}`,
        status: 'Success' as const,
      };

      return {
        ...prev,
        registrations: updatedRegs,
        students: [newStudent, ...prev.students],
        auditLogs: [newAudit, ...prev.auditLogs],
      };
    });
  };

  const handleRejectRegistration = (reg: typeof adminState.registrations[0], reason: string) => {
    setAdminState((prev) => ({
      ...prev,
      registrations: prev.registrations.map((r) =>
        r.id === reg.id ? { ...r, status: 'Rejected' as const, rejectionReason: reason } : r
      ),
    }));
  };

  const handleAddStudent = (stu: typeof adminState.students[0]) => {
    setAdminState((prev) => ({
      ...prev,
      students: [stu, ...prev.students],
    }));
  };

  const handleUpdateStudent = (stu: typeof adminState.students[0]) => {
    setAdminState((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === stu.id ? stu : s)),
    }));
  };

  const handleDeleteStudent = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
    }));
  };

  const handleAddTeacher = (tch: typeof adminState.teachers[0]) => {
    setAdminState((prev) => ({
      ...prev,
      teachers: [tch, ...prev.teachers],
    }));
  };

  const handleUpdateTeacher = (tch: typeof adminState.teachers[0]) => {
    setAdminState((prev) => ({
      ...prev,
      teachers: prev.teachers.map((t) => (t.id === tch.id ? tch : t)),
    }));
  };

  const handleDeleteTeacher = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((t) => t.id !== id),
    }));
  };

  const handleAddLevel = (lvl: typeof adminState.academicLevels[0]) => {
    setAdminState((prev) => ({
      ...prev,
      academicLevels: [...prev.academicLevels, lvl],
    }));
  };

  const handleUpdateLevel = (lvl: typeof adminState.academicLevels[0]) => {
    setAdminState((prev) => ({
      ...prev,
      academicLevels: prev.academicLevels.map((l) => (l.id === lvl.id ? lvl : l)),
    }));
  };

  const handleAddBatch = (bat: typeof adminState.batches[0]) => {
    setAdminState((prev) => ({
      ...prev,
      batches: [...prev.batches, bat],
    }));
  };

  const handleUpdateBatch = (bat: typeof adminState.batches[0]) => {
    setAdminState((prev) => ({
      ...prev,
      batches: prev.batches.map((b) => (b.id === bat.id ? bat : b)),
    }));
  };

  const handleAddMaster = (mst: typeof adminState.masterEntries[0]) => {
    setAdminState((prev) => ({
      ...prev,
      masterEntries: [...prev.masterEntries, mst],
    }));
  };

  const handleAddClass = (cls: typeof adminState.liveClasses[0]) => {
    setAdminState((prev) => ({
      ...prev,
      liveClasses: [cls, ...prev.liveClasses],
    }));
  };

  const handleUpdateClass = (cls: typeof adminState.liveClasses[0]) => {
    setAdminState((prev) => ({
      ...prev,
      liveClasses: prev.liveClasses.map((c) => (c.id === cls.id ? cls : c)),
    }));
  };

  const handleDeleteClass = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      liveClasses: prev.liveClasses.filter((c) => c.id !== id),
    }));
  };

  const handleAddAttendanceLog = (log: typeof adminState.attendanceLogs[0]) => {
    setAdminState((prev) => ({
      ...prev,
      attendanceLogs: [log, ...prev.attendanceLogs],
    }));
  };

  const handleAddSutra = (sut: typeof adminState.sutras[0]) => {
    setAdminState((prev) => ({
      ...prev,
      sutras: [...prev.sutras, sut],
    }));
  };

  const handleUpdateSutra = (sut: typeof adminState.sutras[0]) => {
    setAdminState((prev) => ({
      ...prev,
      sutras: prev.sutras.map((s) => (s.id === sut.id ? sut : s)),
    }));
  };

  const handleApproveGathaSubmission = (sub: typeof adminState.gathaSubmissions[0], points: number, notes: string) => {
    setAdminState((prev) => ({
      ...prev,
      gathaSubmissions: prev.gathaSubmissions.map((s) =>
        s.id === sub.id ? { ...s, status: 'Approved', pointsAwarded: points, feedbackNotes: notes } : s
      ),
    }));
  };

  const handleRejectGathaSubmission = (sub: typeof adminState.gathaSubmissions[0], notes: string) => {
    setAdminState((prev) => ({
      ...prev,
      gathaSubmissions: prev.gathaSubmissions.map((s) =>
        s.id === sub.id ? { ...s, status: 'Rejected', feedbackNotes: notes } : s
      ),
    }));
  };

  const handleAddStavan = (stavan: typeof adminState.stavans[0]) => {
    setAdminState((prev) => ({
      ...prev,
      stavans: [stavan, ...prev.stavans],
    }));
  };

  const handleUpdateStavan = (stavan: typeof adminState.stavans[0]) => {
    setAdminState((prev) => ({
      ...prev,
      stavans: prev.stavans.map((s) => (s.id === stavan.id ? stavan : s)),
    }));
  };

  const handleDeleteStavan = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      stavans: prev.stavans.filter((s) => s.id !== id),
    }));
  };

  const handleAddAudioAsset = (asset: typeof adminState.audioAssets[0]) => {
    setAdminState((prev) => ({
      ...prev,
      audioAssets: [asset, ...prev.audioAssets],
    }));
  };

  const handleDeleteAudioAsset = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      audioAssets: prev.audioAssets.filter((a) => a.id !== id),
    }));
  };

  const handleAddQuizGame = (game: typeof adminState.quizGames[0]) => {
    setAdminState((prev) => ({
      ...prev,
      quizGames: [game, ...prev.quizGames],
    }));
  };

  const handleDeleteQuizGame = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      quizGames: prev.quizGames.filter((g) => g.id !== id),
    }));
  };

  const handleApproveNiyam = (sub: typeof adminState.niyamSubmissions[0]) => {
    setAdminState((prev) => ({
      ...prev,
      niyamSubmissions: prev.niyamSubmissions.map((s) => (s.id === sub.id ? { ...s, status: 'Approved' } : s)),
    }));
  };

  const handleRejectNiyam = (sub: typeof adminState.niyamSubmissions[0]) => {
    setAdminState((prev) => ({
      ...prev,
      niyamSubmissions: prev.niyamSubmissions.map((s) => (s.id === sub.id ? { ...s, status: 'Rejected' } : s)),
    }));
  };

  const handleAddNiyamRule = (rule: typeof adminState.niyamRules[0]) => {
    setAdminState((prev) => ({
      ...prev,
      niyamRules: [...prev.niyamRules, rule],
    }));
  };

  const handleAddBonusEvent = (evt: typeof adminState.bonusEvents[0]) => {
    setAdminState((prev) => ({
      ...prev,
      bonusEvents: [evt, ...prev.bonusEvents],
    }));
  };

  const handleUpdateBonusEvent = (evt: typeof adminState.bonusEvents[0]) => {
    setAdminState((prev) => ({
      ...prev,
      bonusEvents: prev.bonusEvents.map((e) => (e.id === evt.id ? evt : e)),
    }));
  };

  const handleDeleteBonusEvent = (id: string) => {
    setAdminState((prev) => ({
      ...prev,
      bonusEvents: prev.bonusEvents.filter((e) => e.id !== id),
    }));
  };

  const handleAdjustPointsLedger = (
    studentId: string,
    points: number,
    reason: string,
    type: 'Credit' | 'Debit',
    actorName: string
  ) => {
    setAdminState((prev) => {
      const student = prev.students.find((s) => s.id === studentId);
      const studentName = student ? `${student.firstName} ${student.surname}` : 'Student';

      const updatedStudents = prev.students.map((s) =>
        s.id === studentId ? { ...s, pointsBalance: Math.max(0, s.pointsBalance + points) } : s
      );

      const newTx = {
        id: `TX-${Date.now()}`,
        studentId,
        studentName,
        points,
        type,
        reason,
        timestamp: new Date().toLocaleString(),
        adjustedBy: actorName,
      };

      return {
        ...prev,
        students: updatedStudents,
        pointsTransactions: [newTx, ...prev.pointsTransactions],
      };
    });
  };

  const handleAddAdminUser = (u: typeof adminState.adminUsers[0]) => {
    setAdminState((prev) => ({
      ...prev,
      adminUsers: [u, ...prev.adminUsers],
    }));
  };

  const handleUpdateAdminUser = (u: typeof adminState.adminUsers[0]) => {
    setAdminState((prev) => ({
      ...prev,
      adminUsers: prev.adminUsers.map((user) => (user.id === u.id ? u : user)),
    }));
  };

  const handleUpdateSettings = (s: typeof adminState.settings) => {
    setAdminState((prev) => ({
      ...prev,
      settings: s,
    }));
  };

  const handleSendBroadcast = (msg: typeof adminState.broadcasts[0]) => {
    setAdminState((prev) => ({
      ...prev,
      broadcasts: [msg, ...prev.broadcasts],
    }));
  };

  const pendingApprovalsCount = adminState.registrations?.filter((r) => r.status === 'Pending').length || 0;
  const pendingGathasCount = adminState.gathaSubmissions?.filter((s) => s.status === 'Pending').length || 0;

  // Navigation Structure matching specification exactly:
  const navSections = [
    {
      category: 'CORE OPERATIONS',
      items: [
        { id: 'overview' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'people' as AdminTab, label: 'People Directory', icon: Users, badge: pendingApprovalsCount },
        { id: 'classes' as AdminTab, label: 'Classes & Attendance', icon: Video },
      ],
    },
    {
      category: 'ACADEMIC MANAGEMENT',
      items: [
        { id: 'student_progress' as AdminTab, label: 'Student Progress', icon: GraduationCap },
        { id: 'level_syllabus' as AdminTab, label: 'Level management', icon: Layers },
        { id: 'academic' as AdminTab, label: 'Batch and syllabus management', icon: Users },
        { id: 'activities' as AdminTab, label: 'Activities & Niyams', icon: CheckCircle2 },
      ],
    },
    {
      category: 'LEARNING CONTENT',
      items: [
        { id: 'content' as AdminTab, label: 'Learning Content', icon: BookOpen, badge: pendingGathasCount },
      ],
    },
    {
      category: 'ADMINISTRATION',
      items: [
        { id: 'administration' as AdminTab, label: 'Administration', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-slate-900 flex font-sans antialiased selection:bg-[#163E2B] selection:text-white">
      {/* Toast Notifications Overlay */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onConfirm={() => {
            setIsLogoutModalOpen(false);
            if (onReturnToLauncher) onReturnToLauncher();
          }}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      )}

      {/* Jain E-Pathshala Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[9900] w-64 bg-white border-r border-stone-200/90 flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-dashed border-emerald-300 flex items-center justify-center text-[#163E2B] shadow-xs font-black text-xs font-mono">
              LOGO
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight leading-none">Gyan Vatika</h2>
              <span className="text-[9px] font-mono font-extrabold text-[#163E2B] uppercase tracking-widest block mt-0.5">
                CONSOLE
              </span>
            </div>
          </div>

          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categorized Nav Links */}
        <nav className="p-3 space-y-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-stone-200">
          {navSections.map((group) => (
            <div key={group.category} className="space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono px-3 block mb-1">
                {group.category}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentTab === item.id ||
                  (item.id === 'overview' && currentTab === 'dashboard') ||
                  (item.id === 'people' && ['students', 'approvals', 'teachers'].includes(currentTab)) ||
                  (item.id === 'classes' && ['live_classes', 'attendance'].includes(currentTab)) ||
                  (item.id === 'academic' && ['levels', 'batches', 'masters'].includes(currentTab)) ||
                  (item.id === 'activities' && ['niyam', 'bonus'].includes(currentTab)) ||
                  (item.id === 'content' && ['sutras', 'stavans', 'audio', 'games'].includes(currentTab)) ||
                  (item.id === 'administration' && ['system_admin', 'broadcast', 'showcase', 'design_system'].includes(currentTab));

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#163E2B] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-black ${
                            isActive ? 'bg-white text-[#163E2B]' : 'bg-emerald-100 text-[#163E2B]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile Footer Tile */}
        <div className="p-3.5 border-t border-stone-200/80 bg-stone-50/60 m-3 rounded-2xl border flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#163E2B] text-white font-black text-xs flex items-center justify-center shrink-0 border border-emerald-900">
              AD
            </div>
            <div className="truncate">
              <div className="text-xs font-black text-slate-900 truncate">Hemal Bhai</div>
              <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Trustee Admin
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            title="Sign Out"
            className="p-1.5 hover:bg-stone-200 text-slate-500 hover:text-slate-800 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#F8F6F2]/90 backdrop-blur-md border-b border-stone-200/80 px-6 flex items-center justify-between sticky top-0 z-[900]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-white border border-stone-200 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="text-stone-400">PATHSHALA CONSOLE</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="text-[#163E2B] font-extrabold uppercase tracking-wider">
                {currentTab === 'overview' || currentTab === 'dashboard'
                  ? 'Dashboard'
                  : currentTab === 'people'
                  ? 'People Directory'
                  : currentTab === 'classes'
                  ? 'Classes & Attendance'
                  : currentTab === 'level_syllabus'
                  ? 'Level Management'
                  : currentTab === 'academic'
                  ? 'Batch & Syllabus Management'
                  : currentTab === 'activities'
                  ? 'Activities & Niyams'
                  : currentTab === 'content'
                  ? 'Learning Content'
                  : currentTab === 'reports'
                  ? 'Analytical Reports'
                  : currentTab === 'administration'
                  ? 'System Administration'
                  : currentTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Centered Command Search Input */}
          <div className="relative flex-1 max-w-md mx-6 hidden md:block">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search students, classes, sutras, logs..."
              className="w-full bg-white border border-stone-200/90 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-stone-400 focus:outline-none focus:border-[#163E2B] shadow-xs"
            />
          </div>

          {/* Header Action Utilities */}
          <div className="flex items-center gap-2.5">
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-xs focus:outline-none focus:border-[#163E2B]"
            >
              <option value="SuperAdmin">Super Admin</option>
              <option value="Trustee">Trustee Admin</option>
              <option value="Admin">Pathshala Admin</option>
              <option value="Guruji">Guruji / Teacher</option>
              <option value="Auditor">Auditor</option>
            </select>

            <button className="relative p-2 rounded-xl border border-stone-200/90 bg-white hover:bg-stone-50 text-slate-600 cursor-pointer shadow-xs">
              <Bell className="w-4 h-4" />
              {pendingApprovalsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-1.5 right-1.5" />
              )}
            </button>

            {onReturnToLauncher && (
              <button
                onClick={onReturnToLauncher}
                className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer hidden sm:block"
              >
                ← Student App
              </button>
            )}
          </div>
        </header>

        {/* Workspace Content Renderer */}
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {/* 1. OVERVIEW */}
          {(currentTab === 'overview' || currentTab === 'dashboard') && (
            <ExecutiveDashboard
              students={adminState.students || []}
              registrations={adminState.registrations || []}
              classes={adminState.liveClasses || []}
              gathaSubmissions={adminState.gathaSubmissions || []}
              auditLogs={adminState.auditLogs || []}
              currentRole={currentRole}
              onNavigateTab={(tab, subTab) => {
                if (tab === 'people' || ['students', 'approvals', 'teachers'].includes(tab)) {
                  setCurrentTab('people');
                  if (subTab) setPeopleSubTab(subTab as PeopleSubTab);
                  else if (tab === 'approvals') setPeopleSubTab('approvals');
                  else if (tab === 'teachers') setPeopleSubTab('teachers');
                  else setPeopleSubTab('students');
                } else if (tab === 'classes' || ['live_classes', 'attendance'].includes(tab)) {
                  setCurrentTab('classes');
                  if (subTab) setClassesSubTab(subTab as ClassesSubTab);
                  else if (tab === 'attendance') setClassesSubTab('attendance');
                  else setClassesSubTab('live_classes');
                } else if (tab === 'academic' || ['levels', 'batches', 'masters'].includes(tab)) {
                  setCurrentTab('academic');
                  if (subTab) setAcademicSubTab(subTab as AcademicSubTab);
                  else setAcademicSubTab('levels');
                } else if (tab === 'activities' || ['niyam', 'bonus'].includes(tab)) {
                  setCurrentTab('activities');
                  if (subTab) setActivitiesSubTab(subTab as ActivitiesSubTab);
                  else setActivitiesSubTab('niyam');
                } else if (tab === 'content' || ['sutras', 'stavans', 'audio', 'games'].includes(tab)) {
                  setCurrentTab('content');
                  if (subTab) setContentSubTab(subTab as ContentSubTab);
                  else setContentSubTab('sutras');
                } else if (tab === 'reports') {
                  setCurrentTab('reports');
                } else if (tab === 'administration' || ['system_admin', 'broadcast'].includes(tab)) {
                  setCurrentTab('administration');
                  if (subTab) setAdministrationSubTab(subTab as AdministrationSubTab);
                  else if (tab === 'broadcast') setAdministrationSubTab('broadcast');
                  else setAdministrationSubTab('users');
                } else {
                  setCurrentTab(tab as AdminTab);
                }
              }}
              addToast={addToast}
            />
          )}

          {/* 2. PEOPLE DIRECTORY */}
          {(currentTab === 'people' || ['students', 'approvals', 'teachers'].includes(currentTab)) && (
            <div className="space-y-6">
              {/* Sub-tab Pill Switcher */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setPeopleSubTab('students')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    peopleSubTab === 'students'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Directory ({adminState.students?.length || 0})</span>
                </button>

                <button
                  onClick={() => setPeopleSubTab('approvals')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    peopleSubTab === 'approvals'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Student Registrations</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#163E2B]/10 text-[#163E2B] font-extrabold">
                    {adminState.registrations?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setPeopleSubTab('teachers')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    peopleSubTab === 'teachers'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Faculty & Gurujis ({adminState.teachers?.length || 0})</span>
                </button>
              </div>

              {peopleSubTab === 'students' && (
                <StudentManagement
                  students={adminState.students || []}
                  currentRole={currentRole}
                  onAddStudent={handleAddStudent}
                  onUpdateStudent={handleUpdateStudent}
                  onDeleteStudent={handleDeleteStudent}
                  addToast={addToast}
                />
              )}

              {peopleSubTab === 'approvals' && (
                <RegistrationApprovals
                  registrations={adminState.registrations || []}
                  currentRole={currentRole}
                  addToast={addToast}
                />
              )}

              {peopleSubTab === 'teachers' && (
                <TeachersManagement
                  teachers={adminState.teachers || []}
                  levels={adminState.academicLevels || []}
                  batches={adminState.batches || []}
                  currentRole={currentRole}
                  onAddTeacher={handleAddTeacher}
                  onUpdateTeacher={handleUpdateTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  addToast={addToast}
                />
              )}
            </div>
          )}

          {/* 3. CLASSES & ATTENDANCE */}
          {(currentTab === 'classes' || ['live_classes', 'attendance'].includes(currentTab)) && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setClassesSubTab('live_classes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    classesSubTab === 'live_classes'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Virtual Live Classes ({adminState.liveClasses?.length || 0})</span>
                </button>

                <button
                  onClick={() => setClassesSubTab('attendance')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    classesSubTab === 'attendance'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Attendance Audit & Marking</span>
                </button>
              </div>

              {classesSubTab === 'live_classes' && (
                <LiveClasses
                  classes={adminState.liveClasses || []}
                  levels={adminState.academicLevels || []}
                  teachers={adminState.teachers || []}
                  currentRole={currentRole}
                  onAddClass={handleAddClass}
                  onUpdateClass={handleUpdateClass}
                  onDeleteClass={handleDeleteClass}
                  addToast={addToast}
                />
              )}

              {classesSubTab === 'attendance' && (
                <AttendanceTracking
                  logs={adminState.attendanceLogs || []}
                  students={adminState.students || []}
                  batches={adminState.batches || []}
                  currentRole={currentRole}
                  onAddLog={handleAddAttendanceLog}
                  addToast={addToast}
                />
              )}
            </div>
          )}

          {/* STUDENT PROGRESS MODULE */}
          {currentTab === 'student_progress' && (
            <StudentProgress
              students={adminState.students || []}
              teachers={adminState.teachers || []}
              levels={adminState.academicLevels || []}
            />
          )}

          {/* LEVEL & SYLLABUS MANAGEMENT MODULE */}
          {currentTab === 'level_syllabus' && (
            <LevelSyllabusManagement
              levels={adminState.academicLevels || []}
              batches={adminState.batches || []}
              currentRole={currentRole}
              onAddLevel={handleAddLevel}
              onUpdateLevel={handleUpdateLevel}
              addToast={addToast}
            />
          )}

          {/* BATCHES & ACADEMIC STRUCTURE */}
          {currentTab === 'academic' && (
            <>
              <AcademicStructure
                levels={adminState.academicLevels || []}
                batches={adminState.batches || []}
                masters={adminState.masterEntries || []}
                currentRole={currentRole}
                onAddLevel={handleAddLevel}
                onUpdateLevel={handleUpdateLevel}
                onAddBatch={handleAddBatch}
                onUpdateBatch={handleUpdateBatch}
                onAddMaster={handleAddMaster}
                addToast={addToast}
              />

              {/* Syllabus item management. This tab is labelled "Batch and syllabus
                  management" but only rendered the batch half; the syllabus-item CRUD
                  (add / edit / delete, audio + PDF upload) lives in this view. */}
              <SyllabusManagementView
                levels={adminState.academicLevels || []}
                batches={adminState.batches || []}
                currentRole={currentRole}
                onUpdateLevel={handleUpdateLevel}
                addToast={addToast}
              />
            </>
          )}

          {/* 5. ACTIVITIES & NIYAMS */}
          {(currentTab === 'activities' || ['niyam', 'bonus'].includes(currentTab)) && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActivitiesSubTab('niyam')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activitiesSubTab === 'niyam'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Daily Niyam Tracking</span>
                </button>

                <button
                  onClick={() => setActivitiesSubTab('bonus')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activitiesSubTab === 'bonus'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>Bonus Events & Points Ledger</span>
                </button>
              </div>

              {activitiesSubTab === 'niyam' && (
                <NiyamTracking
                  rules={adminState.niyamRules || []}
                  submissions={adminState.niyamSubmissions || []}
                  currentRole={currentRole}
                  onApproveSub={handleApproveNiyam}
                  onRejectSub={handleRejectNiyam}
                  onAddRule={handleAddNiyamRule}
                  addToast={addToast}
                />
              )}

              {activitiesSubTab === 'bonus' && (
                <BonusPoints
                  events={adminState.bonusEvents || []}
                  transactions={adminState.pointsTransactions || []}
                  students={adminState.students || []}
                  currentRole={currentRole}
                  onAddEvent={handleAddBonusEvent}
                  onUpdateEvent={handleUpdateBonusEvent}
                  onDeleteEvent={handleDeleteBonusEvent}
                  onAdjustPoints={handleAdjustPointsLedger}
                  addToast={addToast}
                />
              )}
            </div>
          )}

          {/* 6. UNIFIED LEARNING CONTENT MODULE */}
          {(currentTab === 'content' || ['sutras', 'stavans', 'audio', 'games'].includes(currentTab)) && (
            <UnifiedLearningContent
              sutras={adminState.sutras || []}
              submissions={adminState.gathaSubmissions || []}
              stavans={adminState.stavans || []}
              audioAssets={adminState.audioAssets || []}
              games={adminState.quizGames || []}
              levels={adminState.academicLevels || []}
              currentRole={currentRole}
              onAddSutra={handleAddSutra}
              onUpdateSutra={handleUpdateSutra}
              onApproveSubmission={handleApproveGathaSubmission}
              onRejectSubmission={handleRejectGathaSubmission}
              onAddStavan={handleAddStavan}
              onUpdateStavan={handleUpdateStavan}
              onDeleteStavan={handleDeleteStavan}
              onAddAudio={handleAddAudioAsset}
              onUpdateAudio={handleAddAudioAsset}
              onDeleteAudio={handleDeleteAudioAsset}
              onAddGame={handleAddQuizGame}
              onUpdateGame={handleAddQuizGame}
              onDeleteGame={handleDeleteQuizGame}
              addToast={addToast}
            />
          )}

          {/* 7. ANALYTICAL REPORTS (Hidden for now) */}

          {/* 8. ADMINISTRATION */}
          {(currentTab === 'administration' ||
            ['system_admin', 'broadcast', 'showcase', 'design_system'].includes(currentTab)) && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setAdministrationSubTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'users'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Users</span>
                </button>

                <button
                  onClick={() => setAdministrationSubTab('audit_logs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'audit_logs'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Audit Logs</span>
                </button>

                <button
                  onClick={() => setAdministrationSubTab('broadcast')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'broadcast'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Notices</span>
                </button>

                <button
                  onClick={() => setAdministrationSubTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'settings'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>System Settings</span>
                </button>

                <button
                  onClick={() => setAdministrationSubTab('showcase')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'showcase'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>App Showcase Simulator</span>
                </button>

                <button
                  onClick={() => setAdministrationSubTab('design_system')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    administrationSubTab === 'design_system'
                      ? 'bg-[#163E2B] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Design System</span>
                </button>
              </div>

              {(administrationSubTab === 'users' ||
                administrationSubTab === 'audit_logs' ||
                administrationSubTab === 'settings') && (
                <SystemAdmin
                  adminUsers={adminState.adminUsers || []}
                  auditLogs={adminState.auditLogs || []}
                  settings={adminState.settings}
                  currentRole={currentRole}
                  onAddAdminUser={handleAddAdminUser}
                  onUpdateAdminUser={handleUpdateAdminUser}
                  onUpdateSettings={handleUpdateSettings}
                  addToast={addToast}
                />
              )}

              {administrationSubTab === 'broadcast' && (
                <BroadcastCenter
                  broadcasts={adminState.broadcasts || []}
                  levels={adminState.academicLevels || []}
                  currentRole={currentRole}
                  onSendBroadcast={handleSendBroadcast}
                  addToast={addToast}
                />
              )}

              {administrationSubTab === 'showcase' && (
                <GlobalShowcase
                  sutras={adminState.sutras || []}
                  quotes={adminState.quotes || []}
                  classes={adminState.liveClasses || []}
                  addToast={addToast}
                />
              )}

              {administrationSubTab === 'design_system' && <DesignSystem addToast={addToast} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
