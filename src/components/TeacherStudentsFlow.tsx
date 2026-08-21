import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, Filter, Phone, Star, TrendingUp, CheckCircle2, User, ChevronRight } from 'lucide-react';

interface TeacherStudentsFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
  teacherSelectedStudent?: any;
  setTeacherSelectedStudent?: (student: any) => void;
}

export function TeacherStudentsFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher,
  teacherSelectedStudent,
  setTeacherSelectedStudent
}: TeacherStudentsFlowProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  
  const [localSelectedStudent, setLocalSelectedStudent] = useState<any>(null);

  // Diverse mock database of students mapped to specific teachers
  const mockStudents = [
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
  ];

  const levels = ['All', 'Level 1: Basic Sutras & Stories', 'Level 2: Jain Geography & Symbols'];
  const batches = ['All', 'Batch A - Morning', 'Batch B - Afternoon'];

  // Current logged in teacher identity
  const teacherName = currentLoggedInTeacher?.name || "Samani Pragya ji";

  // Teachers should ONLY be able to view students assigned to their own batches / themselves.
  const teacherStudents = mockStudents.filter(student => student.teacher === teacherName);

  const filteredStudents = teacherStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || student.level === filterLevel;
    const matchesBatch = filterBatch === 'All' || student.batch === filterBatch;
    
    return matchesSearch && matchesLevel && matchesBatch;
  });

  const activeStudent = teacherSelectedStudent || localSelectedStudent || teacherStudents[0];

  const handleSelectStudent = (student: any) => {
    if (setTeacherSelectedStudent) {
      setTeacherSelectedStudent(student);
    }
    setLocalSelectedStudent(student);
    setActiveScreen('TeacherStudentProfile');
  };

  // STUDENT PROFILE SCREEN
  if (activeScreen === 'TeacherStudentProfile' && activeStudent) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 relative text-slate-800"
      >
        {/* Sticky Header */}
        <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">
          <button 
            onClick={() => { 
              setActiveScreen('TeacherStudents'); 
            }} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Student Profile Details</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Student Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-md overflow-hidden bg-emerald-100 flex items-center justify-center">
              {activeStudent.photoUrl ? (
                <img 
                  src={activeStudent.photoUrl} 
                  alt={activeStudent.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-emerald-800">{activeStudent.initials}</span>
              )}
            </div>
            <h2 className="text-xl font-black text-slate-900">{activeStudent.name}</h2>
            <p className="text-xs font-mono text-slate-500 mt-1">Student ID: {activeStudent.id}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                {activeStudent.academicStatus}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                {activeStudent.status}
              </span>
            </div>
          </div>

          {/* Academic Assignment Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-blue-500" />
              Academic Assignment
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Level</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{activeStudent.level}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Batch</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{activeStudent.batch}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Teacher</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{activeStudent.teacher}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Phone className="w-4 h-4 text-emerald-500" />
              Parent/Guardian Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent Name</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{activeStudent.parentName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent Mobile Number</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{activeStudent.contactNumber}</p>
              </div>
            </div>
          </div>

          {/* Four Required Summary Cards */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 ml-1">Performance Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* 1. Attendance Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attendance</p>
                <p className="text-lg font-black text-slate-800">{activeStudent.attendancePercentage}</p>
              </div>

              {/* 2. Gatha Progress Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gatha Progress</p>
                <p className="text-lg font-black text-slate-800">{activeStudent.gathaProgress}</p>
              </div>
              
              {/* 3. Bonus Points Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bonus Points</p>
                <p className="text-lg font-black text-slate-800">{activeStudent.bonusPoints} pts</p>
              </div>

              {/* 4. Academic Progress Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-500">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Progress</p>
                <p className="text-sm font-black text-slate-800 truncate px-1 mt-1">{activeStudent.academicStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // STUDENTS LIST SCREEN (Bottom Bar "Students" Screen)
  if (activeScreen === 'TeacherStudents') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
      >
        {/* Header with Search and Filters */}
        <div className="bg-white px-5 pt-6 pb-4 border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveScreen('TeacherDashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer">
              <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">My Students</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-900 text-sm font-medium rounded-xl py-3 pl-11 pr-4 border-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* List View of Assigned Students */}
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-end mb-1">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Assigned Student Roster</h2>
            <span className="text-xs font-bold text-slate-500">{filteredStudents.length} Students</span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <User className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">No students found</p>
              <p className="text-xs text-slate-400 mt-1">No matches found for your search or filters.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div 
                key={student.id} 
                onClick={() => handleSelectStudent(student)}
                className="bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md rounded-2xl p-4 shadow-sm transition-all cursor-pointer group flex items-center justify-between gap-3"
              >
                {/* Photo & Name */}
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
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                      {student.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                      {student.level.split(':')[0]} • {student.batch}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-mono text-slate-400 font-bold">ID: {student.id}</span>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
                        {student.attendancePercentage} Att.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider hidden sm:inline-block ${
                    student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    student.status === 'Revision Stage' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}>
                    {student.status}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center text-slate-400 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    );
  }

  return null;
}
