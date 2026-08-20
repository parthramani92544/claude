import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  BookOpen,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  RotateCcw,
  List,
  Layers,
  UserPlus,
  Plus,
  Minus,
} from 'lucide-react';
import { AdminStudent, AdminTeacher, AcademicLevel } from '../types';

type StudentProgressStatus = 'Registration' | 'Level Assigned' | 'Learning in Progress' | 'Teacher Review' | 'Final Revision' | 'Approved' | 'Promoted';

interface StudentProgressProps {
  students: AdminStudent[];
  teachers: AdminTeacher[];
  levels: AcademicLevel[];
}

export const StudentProgress: React.FC<StudentProgressProps> = ({
  students,
  teachers,
  levels,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [teacherFilter, setTeacherFilter] = useState('ALL');
  const [parentFilter, setParentFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'students' | 'parents'>('students');

  const [selectedStudent, setSelectedStudent] = useState<AdminStudent | null>(null);

  // Group all students by parentMobile for Parent-Child verification
  const parentGroups = useMemo(() => {
    const groupsMap: Record<
      string,
      {
        parentMobile: string;
        familyName: string;
        email: string;
        address: string;
        children: AdminStudent[];
      }
    > = {};

    students.forEach((s) => {
      const key = s.parentMobile;
      if (!groupsMap[key]) {
        groupsMap[key] = {
          parentMobile: s.parentMobile,
          familyName: `${s.surname} Family`,
          email: s.email,
          address: s.address,
          children: [],
        };
      }
      groupsMap[key].children.push(s);
    });

    return Object.values(groupsMap);
  }, [students]);

  // Track expanded parent dropdown cards in parent-child view
  const [expandedParents, setExpandedParents] = useState<string[]>(
    parentGroups.map((pg) => pg.parentMobile)
  );

  const toggleParentExpand = (parentMobile: string) => {
    setExpandedParents((prev) =>
      prev.includes(parentMobile) ? prev.filter((p) => p !== parentMobile) : [...prev, parentMobile]
    );
  };

  // Track expanded rows in Monitored Students table
  const [expandedRowMobiles, setExpandedRowMobiles] = useState<string[]>([]);

  const toggleRowExpand = (parentMobile: string) => {
    setExpandedRowMobiles((prev) =>
      prev.includes(parentMobile) ? prev.filter((m) => m !== parentMobile) : [...prev, parentMobile]
    );
  };

  // Helper map to assign mock rich progress details consistently based on student ID
  const getStudentProgressData = (student: AdminStudent) => {
    // Determine assigned teacher
    const teacherForLevel = teachers.find((t) => t.assignedLevels.some((l) => student.level.includes(l))) || teachers[0];
    const assignedTeacherName = teacherForLevel ? teacherForLevel.name : 'Rajvi Ben Shah';

    // Map level to assigned topics
    const levelObj = levels.find((l) => student.level.includes(l.name) || l.name.includes(student.level.split(' - ')[0])) || levels[0];
    const levelSyllabus = levelObj?.syllabus || [
      { id: '1', levelId: '1', chapterName: 'Navkar Mantra - Part 1', learningType: 'Sutra', displayOrder: 1, status: 'Active' },
      { id: '2', levelId: '1', chapterName: 'Chattari Mangalam - Recitation', learningType: 'Sutra', displayOrder: 2, status: 'Active' },
      { id: '3', levelId: '1', chapterName: 'Story of King Kumarapala', learningType: 'Story', displayOrder: 3, status: 'Active' },
      { id: '4', levelId: '1', chapterName: 'Ichhami Khamasamano', learningType: 'Sutra', displayOrder: 4, status: 'Active' },
    ];

    // Total topics
    const totalTopicsCount = levelSyllabus.length > 0 ? levelSyllabus.length : 12;

    // Derived completed topics based on student totalGathas or index
    let completedRatio = 0.5;
    if (student.attendanceRate > 90) completedRatio = 0.8;
    else if (student.attendanceRate > 80) completedRatio = 0.65;
    else if (student.attendanceRate > 70) completedRatio = 0.45;
    else completedRatio = 0.3;

    const completedTopicsCount = Math.min(totalTopicsCount, Math.max(1, Math.round(totalTopicsCount * completedRatio)));
    const pendingTopicsCount = Math.max(0, totalTopicsCount - completedTopicsCount);
    const progressPct = Math.round((completedTopicsCount / totalTopicsCount) * 100);

    const completedTopics = levelSyllabus.slice(0, completedTopicsCount);
    const pendingTopics = levelSyllabus.slice(completedTopicsCount);

    // Derived Status for Monitoring
    let currentStatus: 'Registration' | 'Level Assigned' | 'Learning in Progress' | 'Teacher Review' | 'Final Revision' | 'Approved' | 'Promoted' = 'Learning in Progress';
    let teacherReviewStatus = 'Pending Guruji Review';
    let finalRevisionStatus = 'Not Required Yet';
    let promotionStatus = 'In Progress';
    let currentSubmissionStatus = `Submitted Chapter ${completedTopicsCount} Gatha`;

    if (progressPct >= 90) {
      currentStatus = 'Approved';
      teacherReviewStatus = 'Approved by Guruji';
      finalRevisionStatus = 'Completed';
      promotionStatus = 'Eligible for Next Level';
      currentSubmissionStatus = 'All Level Requirements Met';
    } else if (progressPct >= 75) {
      currentStatus = 'Teacher Review';
      teacherReviewStatus = 'Under Evaluation';
      finalRevisionStatus = 'Pending Final Oral Test';
      promotionStatus = 'Pending Final Assessment';
      currentSubmissionStatus = `Chapter ${completedTopicsCount} Audio Under Review`;
    } else if (progressPct >= 50) {
      currentStatus = 'Learning in Progress';
      teacherReviewStatus = 'Periodic Checks OK';
      finalRevisionStatus = 'In Progress';
      promotionStatus = 'In Progress';
      currentSubmissionStatus = `Chapter ${completedTopicsCount} Homework Verified`;
    } else if (progressPct >= 20) {
      currentStatus = 'Level Assigned';
      teacherReviewStatus = 'Initial Orientation Done';
      finalRevisionStatus = 'Not Started';
      promotionStatus = 'In Progress';
      currentSubmissionStatus = 'Basic Sutra Practice';
    }

    const lastActivity = student.registrationDate ? `${student.registrationDate} 10:30 AM` : '2026-07-23 09:15 AM';

    return {
      assignedTeacherName,
      totalTopicsCount,
      completedTopicsCount,
      pendingTopicsCount,
      progressPct,
      completedTopics,
      pendingTopics,
      currentStatus: currentStatus as StudentProgressStatus,
      teacherReviewStatus,
      finalRevisionStatus,
      promotionStatus,
      currentSubmissionStatus,
      lastActivity,
    };
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const progress = getStudentProgressData(st);
      const fullName = `${st.firstName} ${st.surname}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        st.mobile.includes(searchQuery) ||
        st.parentMobile.includes(searchQuery) ||
        st.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        progress.assignedTeacherName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = levelFilter === 'ALL' || st.level.includes(levelFilter);
      const matchesStatus = statusFilter === 'ALL' || progress.currentStatus === statusFilter;
      const matchesTeacher = teacherFilter === 'ALL' || progress.assignedTeacherName.includes(teacherFilter);
      const matchesParent = parentFilter === 'ALL' || st.parentMobile === parentFilter;

      return matchesSearch && matchesLevel && matchesStatus && matchesTeacher && matchesParent;
    });
  }, [students, searchQuery, levelFilter, statusFilter, teacherFilter, parentFilter]);

  // Filtered Parent Groups for Parent-Child View
  const filteredParentGroups = useMemo(() => {
    return parentGroups.filter((pg) => {
      const matchesParentFilter = parentFilter === 'ALL' || pg.parentMobile === parentFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        pg.familyName.toLowerCase().includes(q) ||
        pg.parentMobile.includes(q) ||
        pg.email.toLowerCase().includes(q) ||
        pg.children.some((c) => {
          const fullName = `${c.firstName} ${c.surname}`.toLowerCase();
          return (
            fullName.includes(q) ||
            c.mobile.includes(q) ||
            c.id.toLowerCase().includes(q) ||
            c.level.toLowerCase().includes(q)
          );
        });

      return matchesParentFilter && matchesSearch;
    });
  }, [parentGroups, parentFilter, searchQuery]);

  // Overall Statistics for KPI Row
  const stats = useMemo(() => {
    let learning = 0;
    let review = 0;
    let approved = 0;

    students.forEach((s) => {
      const data = getStudentProgressData(s);
      if (data.currentStatus === 'Approved' || data.currentStatus === 'Promoted') approved++;
      else if (data.currentStatus === 'Teacher Review' || data.currentStatus === 'Final Revision') review++;
      else learning++;
    });

    return {
      total: students.length,
      learning,
      review,
      approved,
      parentsCount: parentGroups.length,
    };
  }, [students, parentGroups]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Promoted':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Teacher Review':
      case 'Final Revision':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Learning in Progress':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Level Assigned':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Registration':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Progress Monitoring</h1>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Total Students</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{stats.total}</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-700">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase">Learning Active</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{stats.learning}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-amber-600 uppercase">Under Review</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{stats.review}</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase">Approved / Promoted</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{stats.approved}</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters Controls */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Large Friendly Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name, mobile, teacher..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#163E2B] focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Selectors */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filters:</span>
            </div>

            {/* Parent / Family Dropdown Filter */}
            <select
              value={parentFilter}
              onChange={(e) => {
                const val = e.target.value;
                setParentFilter(val);
                if (val !== 'ALL') {
                  setViewMode('parents');
                  if (!expandedParents.includes(val)) {
                    setExpandedParents((prev) => [...prev, val]);
                  }
                }
              }}
              className="bg-emerald-50/80 border border-emerald-200 text-xs font-bold rounded-xl px-3 py-2 text-[#163E2B] focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer shrink-0"
            >
              <option value="ALL">👨‍👩‍👧‍👦 All Parents / Families ({parentGroups.length})</option>
              {parentGroups.map((pg) => (
                <option key={pg.parentMobile} value={pg.parentMobile}>
                  {pg.familyName} ({pg.parentMobile}) — {pg.children.length} {pg.children.length === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer shrink-0"
            >
              <option value="ALL">All Levels</option>
              {levels.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer shrink-0"
            >
              <option value="ALL">All Statuses</option>
              <option value="Learning in Progress">Learning in Progress</option>
              <option value="Teacher Review">Teacher Review</option>
              <option value="Approved">Approved</option>
              <option value="Promoted">Promoted</option>
              <option value="Level Assigned">Level Assigned</option>
            </select>

            {/* Teacher Filter */}
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white cursor-pointer shrink-0"
            >
              <option value="ALL">All Teachers</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>

            {(searchQuery || levelFilter !== 'ALL' || statusFilter !== 'ALL' || teacherFilter !== 'ALL' || parentFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('ALL');
                  setStatusFilter('ALL');
                  setTeacherFilter('ALL');
                  setParentFilter('ALL');
                }}
                className="px-3 py-2 text-xs font-semibold text-[#163E2B] hover:bg-[#163E2B]/10 rounded-xl cursor-pointer transition-colors shrink-0 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Toggle Bar (Monitored Students List vs Parent & Children View) */}
      <div className="flex items-center justify-between bg-stone-100/70 p-1.5 rounded-2xl border border-stone-200/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'students'
                ? 'bg-[#163E2B] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Monitored Students List ({filteredStudents.length})</span>
          </button>

          <button
            onClick={() => setViewMode('parents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'parents'
                ? 'bg-[#163E2B] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-500" />
            <span>Parent & Children Dropdown View ({filteredParentGroups.length} Families)</span>
          </button>
        </div>

        {parentFilter !== 'ALL' && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-[#163E2B]">
            <span>Filtered Parent: {parentFilter}</span>
            <button
              onClick={() => setParentFilter('ALL')}
              className="hover:text-red-700 cursor-pointer ml-1"
              title="Clear parent filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* PARENT & REGISTERED CHILDREN DROPDOWN VIEW */}
      {viewMode === 'parents' ? (
        <div className="space-y-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#163E2B]" />
                <span>Parent - Child Registration Verification</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect registered children grouped under each parent account to verify family registrations and level placement.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Families Listed</span>
              <span className="text-sm font-extrabold text-[#163E2B]">{filteredParentGroups.length} Parent Accounts</span>
            </div>
          </div>

          {filteredParentGroups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-2">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No parent records found</p>
              <p className="text-xs text-slate-500">Try clearing the search or parent dropdown filters above.</p>
            </div>
          ) : (
            filteredParentGroups.map((pg) => {
              const isExpanded = expandedParents.includes(pg.parentMobile);

              return (
                <div
                  key={pg.parentMobile}
                  className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
                >
                  {/* Parent Header Row / Card */}
                  <div
                    onClick={() => toggleParentExpand(pg.parentMobile)}
                    className="p-4 bg-stone-50 hover:bg-stone-100/80 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200/80 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#163E2B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {pg.familyName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{pg.familyName}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {pg.children.length} Registered {pg.children.length === 1 ? 'Child' : 'Children'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1 font-mono">
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <Phone className="w-3.5 h-3.5 text-[#163E2B]" />
                            {pg.parentMobile}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {pg.email}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 truncate max-w-xs">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {pg.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Parent Identity Verified</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleParentExpand(pg.parentMobile);
                        }}
                        className={`p-2 rounded-xl cursor-pointer transition-all flex items-center justify-center font-bold text-xs ${
                          isExpanded
                            ? 'bg-[#163E2B] text-white shadow-xs'
                            : 'bg-emerald-50 text-[#163E2B] border border-emerald-300 hover:bg-emerald-100'
                        }`}
                        title={isExpanded ? 'Collapse children list' : 'Expand children list'}
                      >
                        {isExpanded ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Registered Children Table */}
                  {isExpanded && (
                    <div className="p-4 bg-white space-y-3">
                      <div className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <GraduationCap className="w-3.5 h-3.5 text-[#163E2B]" />
                        <span>Registered Children under {pg.familyName} ({pg.children.length})</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead className="bg-stone-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
                            <tr>
                              <th className="py-2.5 px-3 font-bold">Child / Student</th>
                              <th className="py-2.5 px-3 font-bold">Child Mobile</th>
                              <th className="py-2.5 px-3 font-bold">Level & Batch</th>
                              <th className="py-2.5 px-3 font-bold">Syllabus Progress</th>
                              <th className="py-2.5 px-3 font-bold">Parent Verification</th>
                              <th className="py-2.5 px-3 font-bold">Status</th>
                              <th className="py-2.5 px-3 font-bold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 font-medium text-slate-800">
                            {pg.children.map((child) => {
                              const progress = getStudentProgressData(child);

                              return (
                                <tr key={child.id} className="hover:bg-stone-50/80 transition-colors">
                                  {/* Student Name */}
                                  <td className="py-3 px-3">
                                    <div className="flex items-center gap-2.5">
                                      <img
                                        src={child.photoUrl}
                                        alt={child.firstName}
                                        className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                                      />
                                      <div>
                                        <div className="font-bold text-slate-900 text-xs">
                                          {child.firstName} {child.surname}
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-500">{child.id}</span>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Child Mobile */}
                                  <td className="py-3 px-3 font-mono text-slate-700 text-xs">
                                    {child.mobile}
                                  </td>

                                  {/* Level & Batch */}
                                  <td className="py-3 px-3">
                                    <div className="font-bold text-slate-900 text-xs">{child.level}</div>
                                    <span className="text-[10px] text-slate-500 block">{child.batch}</span>
                                  </td>

                                  {/* Progress */}
                                  <td className="py-3 px-3 min-w-[140px]">
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-[10px] font-mono">
                                        <span>{progress.completedTopicsCount}/{progress.totalTopicsCount} Topics</span>
                                        <span className="font-bold text-[#163E2B]">{progress.progressPct}%</span>
                                      </div>
                                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                        <div
                                          className="bg-[#163E2B] h-full rounded-full"
                                          style={{ width: `${progress.progressPct}%` }}
                                        />
                                      </div>
                                    </div>
                                  </td>

                                  {/* Verification Details */}
                                  <td className="py-3 px-3">
                                    <div className="space-y-0.5 text-[10px]">
                                      <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                                        ✓ Mobile Matched
                                      </span>
                                      <span className="text-slate-500 block font-mono">Fee Status: Paid</span>
                                    </div>
                                  </td>

                                  {/* Status */}
                                  <td className="py-3 px-3">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border inline-flex items-center gap-1 ${getStatusBadgeStyle(
                                        progress.currentStatus
                                      )}`}
                                    >
                                      {progress.currentStatus}
                                    </span>
                                  </td>

                                  {/* Actions */}
                                  <td className="py-3 px-3 text-right">
                                    <button
                                      onClick={() => setSelectedStudent(child)}
                                      className="px-3 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl cursor-pointer inline-flex items-center gap-1 transition-all shadow-2xs"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View Details</span>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* MAIN MONITORED STUDENTS TABLE (FLAT LIST VIEW) */
        <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
              Monitored Students ({filteredStudents.length})
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Showing overall syllabus progress and teacher review states
            </span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-16 bg-stone-50/30 space-y-3">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No student records found</p>
              <p className="text-xs text-slate-500">Try adjusting your search or category filters above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-3 text-center w-12 font-bold">Expand</th>
                    <th className="py-3 px-4 font-bold">Student Name</th>
                    <th className="py-3 px-4 font-bold">Mobile Number</th>
                    <th className="py-3 px-4 font-bold">Assigned Teacher</th>
                    <th className="py-3 px-4 font-bold">Current Level</th>
                    <th className="py-3 px-4 font-bold">Syllabus Progress</th>
                    <th className="py-3 px-4 font-bold">Current Status</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
                  {filteredStudents.map((st) => {
                    const progress = getStudentProgressData(st);
                    const siblings = students.filter((s) => s.parentMobile === st.parentMobile);
                    const isRowExpanded = expandedRowMobiles.includes(st.parentMobile);

                    return (
                      <React.Fragment key={st.id}>
                        <tr className={`transition-colors ${isRowExpanded ? 'bg-emerald-50/50' : 'hover:bg-stone-50/80'}`}>
                          {/* Plus / Minus Expand Column */}
                          <td className="py-3.5 px-3 text-center">
                            <button
                              onClick={() => toggleRowExpand(st.parentMobile)}
                              className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                                isRowExpanded
                                  ? 'bg-[#163E2B] text-white shadow-xs'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] border border-emerald-300'
                              }`}
                              title={isRowExpanded ? 'Collapse children list' : 'Expand list of registered children under this family'}
                            >
                              {isRowExpanded ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-[#163E2B]" />}
                            </button>
                          </td>

                          {/* Student Name */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={st.photoUrl}
                                alt={`${st.firstName} ${st.surname}`}
                                className="w-9 h-9 rounded-full object-cover border border-stone-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900 text-xs">
                                  {st.firstName} {st.surname}
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{st.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Mobile Number & Parent Verification link with Plus button */}
                          <td className="py-3.5 px-4 font-mono text-slate-700">
                            <div className="text-xs font-semibold">{st.mobile}</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-slate-500">Parent: {st.parentMobile}</span>
                              <button
                                onClick={() => toggleRowExpand(st.parentMobile)}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono border flex items-center gap-1 cursor-pointer transition-all ${
                                  isRowExpanded
                                    ? 'bg-[#163E2B] text-white border-[#163E2B] shadow-2xs'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-[#163E2B] border-emerald-300'
                                }`}
                                title="Click to toggle accordion list of children"
                              >
                                {isRowExpanded ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-[#163E2B]" />}
                                <span>{siblings.length} {siblings.length === 1 ? 'Child' : 'Children'}</span>
                              </button>
                            </div>
                          </td>

                          {/* Assigned Teacher */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800 flex items-center gap-1.5">
                              <UserCheck className="w-3.5 h-3.5 text-[#163E2B]" />
                              <span>{progress.assignedTeacherName}</span>
                            </div>
                          </td>

                          {/* Current Level */}
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-100 text-slate-800 border border-stone-200 inline-block">
                              {st.level}
                            </span>
                          </td>

                          {/* Current Syllabus Progress */}
                          <td className="py-3.5 px-4 min-w-[160px]">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-mono">
                                <span className="font-bold text-slate-800">
                                  {progress.completedTopicsCount}/{progress.totalTopicsCount} Topics
                                </span>
                                <span className="font-extrabold text-[#163E2B]">{progress.progressPct}%</span>
                              </div>
                              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#163E2B] h-full rounded-full transition-all"
                                  style={{ width: `${progress.progressPct}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Current Status */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border inline-flex items-center gap-1 ${getStatusBadgeStyle(
                                progress.currentStatus
                              )}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {progress.currentStatus}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedStudent(st)}
                              className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>

                        {/* ACCORDION ROW FOR REGISTERED CHILDREN */}
                        {isRowExpanded && (
                          <tr className="bg-emerald-50/60 border-b-2 border-emerald-200">
                            <td colSpan={8} className="p-4">
                              <div className="bg-white border border-emerald-300 rounded-2xl p-4 shadow-sm space-y-3">
                                {/* Accordion Title & Close */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-[#163E2B] text-white flex items-center justify-center font-bold text-xs">
                                      <Users className="w-3.5 h-3.5" />
                                    </div>
                                    <h4 className="font-bold text-xs text-slate-900">
                                      Registered Children under Parent ({st.parentMobile}) — {st.surname} Family
                                    </h4>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      {siblings.length} {siblings.length === 1 ? 'Child Enrolled' : 'Children Enrolled'}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => toggleRowExpand(st.parentMobile)}
                                    className="text-[11px] font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 self-end sm:self-auto cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                    <span>Close Accordion</span>
                                  </button>
                                </div>

                                {/* List of Children Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {siblings.map((child) => {
                                    const childProgress = getStudentProgressData(child);
                                    const isCurrentRowStudent = child.id === st.id;

                                    return (
                                      <div
                                        key={child.id}
                                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                                          isCurrentRowStudent
                                            ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-400/40'
                                            : 'bg-stone-50/80 border-stone-200 hover:bg-stone-100/80'
                                        }`}
                                      >
                                        <div>
                                          <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2.5">
                                              <img
                                                src={child.photoUrl}
                                                alt={child.firstName}
                                                className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                                              />
                                              <div>
                                                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                                  <span>{child.firstName} {child.surname}</span>
                                                  {isCurrentRowStudent && (
                                                    <span className="px-1.5 py-0.2 bg-[#163E2B] text-white rounded text-[9px] font-extrabold font-mono">
                                                      Selected Row
                                                    </span>
                                                  )}
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-500">{child.id}</span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="space-y-1.5 text-[11px] mt-2">
                                            <div className="flex justify-between text-slate-600">
                                              <span className="text-slate-500 font-mono">Level & Batch:</span>
                                              <span className="font-bold text-slate-800 text-right">{child.level}</span>
                                            </div>

                                            <div className="flex justify-between text-slate-600">
                                              <span className="text-slate-500 font-mono">Child Mobile:</span>
                                              <span className="font-mono text-slate-800 font-bold">{child.mobile}</span>
                                            </div>

                                            <div className="space-y-1 pt-1">
                                              <div className="flex justify-between text-[10px] font-mono">
                                                <span className="text-slate-500">Syllabus Progress</span>
                                                <span className="font-extrabold text-[#163E2B]">{childProgress.progressPct}%</span>
                                              </div>
                                              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                  className="bg-[#163E2B] h-full rounded-full"
                                                  style={{ width: `${childProgress.progressPct}%` }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between gap-2">
                                          <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getStatusBadgeStyle(
                                              childProgress.currentStatus
                                            )}`}
                                          >
                                            {childProgress.currentStatus}
                                          </span>

                                          <button
                                            onClick={() => setSelectedStudent(child)}
                                            className="px-2.5 py-1 bg-[#163E2B] hover:bg-[#0F2D1F] text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1 transition-all"
                                          >
                                            <Eye className="w-3 h-3" />
                                            <span>View Profile</span>
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* READ-ONLY STUDENT PROGRESS DETAILS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          {(() => {
            const data = getStudentProgressData(selectedStudent);

            return (
              <div className="bg-white border border-stone-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 text-slate-800 my-8 max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedStudent.photoUrl}
                      alt={selectedStudent.firstName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#163E2B] shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          {selectedStudent.firstName} {selectedStudent.surname}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#163E2B]/10 text-[#163E2B] border border-[#163E2B]/20">
                          {selectedStudent.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {selectedStudent.level} • {selectedStudent.batch}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 text-slate-400 hover:text-slate-800 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Read-Only Monitoring Banner */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#163E2B]" />
                    <span>
                      <strong>Monitoring View:</strong> Student review and promotion decisions are managed by Guruji <strong>{data.assignedTeacherName}</strong>.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Last Synced: Today</span>
                </div>

                {/* 1. STUDENT & ACADEMIC INFORMATION SECTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Student Information */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
                    <h3 className="text-xs font-bold text-[#163E2B] uppercase tracking-wider block">
                      Student Information
                    </h3>
                    <div className="text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Gender:</span>
                        <strong className="text-slate-900">{selectedStudent.gender}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>DOB:</span>
                        <strong className="text-slate-900 font-mono">{selectedStudent.dob}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Student Mobile:</span>
                        <strong className="text-slate-900 font-mono">{selectedStudent.mobile}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Parent Mobile:</span>
                        <strong className="text-slate-900 font-mono">{selectedStudent.parentMobile}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Email:</span>
                        <strong className="text-slate-900 text-[11px] truncate">{selectedStudent.email}</strong>
                      </div>
                      <div className="text-slate-600 pt-1 border-t border-stone-200 text-[11px]">
                        <span>Address:</span>
                        <p className="text-slate-900 font-medium line-clamp-2">{selectedStudent.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
                    <h3 className="text-xs font-bold text-[#163E2B] uppercase tracking-wider block">
                      Academic Information
                    </h3>
                    <div className="text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Current Level:</span>
                        <strong className="text-slate-900">{selectedStudent.level}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Batch Slot:</span>
                        <strong className="text-slate-900">{selectedStudent.batch}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Registration Date:</span>
                        <strong className="text-slate-900 font-mono">{selectedStudent.registrationDate}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-stone-200">
                        <span>Attendance Rate:</span>
                        <strong className="text-emerald-700 font-mono font-bold">{selectedStudent.attendanceRate}%</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Account Status:</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {selectedStudent.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Teacher */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
                    <h3 className="text-xs font-bold text-[#163E2B] uppercase tracking-wider block">
                      Assigned Teacher
                    </h3>
                    <div className="text-xs space-y-2">
                      <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#163E2B]/10 text-[#163E2B] flex items-center justify-center font-bold text-xs">
                          {data.assignedTeacherName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{data.assignedTeacherName}</div>
                          <span className="text-[10px] text-slate-500 block">Pathshala Senior Guruji</span>
                        </div>
                      </div>
                      <div className="text-slate-600 text-[11px] leading-relaxed">
                        Responsible for evaluating student recitations, oral tests, and issuing level promotions.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. PROGRESS SECTION */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xs font-bold text-[#163E2B] uppercase tracking-wider">Progress Overview</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Syllabus topics completed out of assigned level curriculum</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Completion Rate</span>
                        <span className="text-lg font-bold text-[#163E2B]">{data.progressPct}%</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-[#163E2B] flex items-center justify-center font-bold text-xs text-[#163E2B]">
                        {data.completedTopicsCount}/{data.totalTopicsCount}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#163E2B] h-full rounded-full transition-all"
                      style={{ width: `${data.progressPct}%` }}
                    />
                  </div>

                  {/* Completed vs Pending Topics Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Completed Topics */}
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Completed Topics ({data.completedTopics.length})</span>
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          VERIFIED
                        </span>
                      </div>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {data.completedTopics.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">No completed topics yet.</span>
                        ) : (
                          data.completedTopics.map((topic, i) => (
                            <div key={topic.id || i} className="flex items-center justify-between text-xs py-1 border-b border-stone-50">
                              <span className="font-semibold text-slate-800">{i + 1}. {topic.chapterName}</span>
                              <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Passed</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Pending Topics */}
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span>Pending Topics ({data.pendingTopics.length})</span>
                        </span>
                        <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                          IN PROGRESS
                        </span>
                      </div>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {data.pendingTopics.length === 0 ? (
                          <span className="text-xs text-emerald-700 font-bold">All level topics completed! 🎉</span>
                        ) : (
                          data.pendingTopics.map((topic, i) => (
                            <div key={topic.id || i} className="flex items-center justify-between text-xs py-1 border-b border-stone-50">
                              <span className="font-medium text-slate-600">{data.completedTopics.length + i + 1}. {topic.chapterName}</span>
                              <span className="text-[10px] font-mono text-slate-400">Upcoming</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Status Matrix */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Current Submission</span>
                    <span className="font-bold text-slate-900 block mt-1">{data.currentSubmissionStatus}</span>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Teacher Review Status</span>
                    <span className="font-bold text-amber-800 block mt-1">{data.teacherReviewStatus}</span>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Final Revision Status</span>
                    <span className="font-bold text-slate-900 block mt-1">{data.finalRevisionStatus}</span>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Promotion Status</span>
                    <span className="font-bold text-emerald-700 block mt-1">{data.promotionStatus}</span>
                  </div>
                </div>

                {/* 4. Clean Learning Journey Timeline */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Learning Journey Timeline</h3>

                  <div className="relative">
                    {/* Horizontal Step Flow */}
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-center">
                      {[
                        { label: 'Registration', done: true, current: false },
                        { label: 'Level Assigned', done: true, current: false },
                        { label: 'Learning in Progress', done: true, current: data.currentStatus === 'Learning in Progress' },
                        { label: 'Teacher Review', done: data.progressPct >= 75, current: data.currentStatus === 'Teacher Review' },
                        { label: 'Final Revision', done: data.progressPct >= 85, current: data.currentStatus === 'Final Revision' },
                        { label: 'Approved', done: data.progressPct >= 95, current: data.currentStatus === 'Approved' },
                        { label: 'Promoted', done: data.progressPct >= 100, current: data.currentStatus === 'Promoted' },
                      ].map((step, idx) => (
                        <div
                          key={step.label}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-between space-y-2 transition-all ${
                            step.done
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : step.current
                              ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-200'
                              : 'bg-stone-50 border-stone-200 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                            Step {idx + 1}
                          </div>

                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.done
                                ? 'bg-emerald-600 text-white'
                                : step.current
                                ? 'bg-amber-500 text-white'
                                : 'bg-stone-200 text-slate-500'
                            }`}
                          >
                            {step.done ? '✓' : idx + 1}
                          </div>

                          <div className="text-[11px] font-bold leading-tight">{step.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
