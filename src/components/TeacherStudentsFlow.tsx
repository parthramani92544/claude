import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, Filter, Phone, Star, TrendingUp, CheckCircle2, User, ChevronRight } from 'lucide-react';

interface TeacherStudentsFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currentLoggedInTeacher: any;
}

export function TeacherStudentsFlow({
  activeScreen,
  setActiveScreen,
  currentLoggedInTeacher
}: TeacherStudentsFlowProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Diverse mock database of students mapped to specific teachers
  const mockStudents = [
    {
      id: 'STU001',
      name: 'Aarav Shah',
      initials: 'AS',
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
  // Teachers must NEVER see students belonging to another teacher.
  const teacherStudents = mockStudents.filter(student => student.teacher === teacherName);

  const filteredStudents = teacherStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || student.level === filterLevel;
    const matchesBatch = filterBatch === 'All' || student.batch === filterBatch;
    
    return matchesSearch && matchesLevel && matchesBatch;
  });

  // STUDENT PROFILE SCREEN
  if (activeScreen === 'TeacherStudentProfile' && selectedStudent) {
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
              setSelectedStudent(null); 
            }} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Student Profile</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Student Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full mx-auto flex items-center justify-center text-2xl font-black mb-3 border-4 border-white shadow-sm">
              {selectedStudent.initials}
            </div>
            <h2 className="text-xl font-black text-slate-900">{selectedStudent.name}</h2>
            <p className="text-xs font-mono text-slate-500 mt-1">Student ID: {selectedStudent.id}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                {selectedStudent.academicStatus}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                {selectedStudent.status}
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
                <p className="text-sm font-semibold text-slate-700 mt-1">{selectedStudent.level}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Batch</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{selectedStudent.batch}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Teacher</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{selectedStudent.teacher}</p>
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
                <p className="text-sm font-semibold text-slate-700 mt-1">{selectedStudent.parentName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent Mobile Number</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{selectedStudent.contactNumber}</p>
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
                <p className="text-lg font-black text-slate-800">{selectedStudent.attendancePercentage}</p>
              </div>

              {/* 2. Gatha Progress Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 text-indigo-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gatha Progress</p>
                <p className="text-lg font-black text-slate-800">{selectedStudent.gathaProgress}</p>
              </div>
              
              {/* 3. Bonus Points Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bonus Points</p>
                <p className="text-lg font-black text-slate-800">{selectedStudent.bonusPoints} pts</p>
              </div>

              {/* 4. Academic Progress Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-500">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Progress</p>
                <p className="text-sm font-black text-slate-800 truncate px-1 mt-1">{selectedStudent.academicStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // STUDENTS LIST SCREEN
  if (activeScreen === 'TeacherStudents') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 text-slate-800"
      >
        {/* Header with Search and Filters */}
        <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveScreen('TeacherDashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer">
              <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">My Students</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-900 text-sm font-medium rounded-xl py-3 pl-11 pr-4 border-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
            />
          </div>

          {/* Filters: Level & Batch */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Filters</span>
            </div>
            
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level === 'All' ? 'All Levels' : level.split(':')[0]}</option>
              ))}
            </select>

            <select 
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="shrink-0 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch === 'All' ? 'All Batches' : batch}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List of Assigned Students */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Assigned Students</h2>
            <span className="text-xs font-bold text-slate-500">{filteredStudents.length} Found</span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <User className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">No students found</p>
              <p className="text-xs text-slate-400 mt-1">No matches found for your search or filters.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                
                {/* Photo/Initials + Name + ID + Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                      {student.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 leading-tight">{student.name}</h3>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">ID: {student.id}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                    student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    student.status === 'Revision Stage' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}>
                    {student.status}
                  </span>
                </div>
                
                {/* Details Section */}
                <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">Assigned Level:</span>
                    <span className="font-medium text-slate-700">{student.level}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">Assigned Batch:</span>
                    <span className="font-medium text-slate-700">{student.batch}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">Parent Name:</span>
                    <span className="font-medium text-slate-700">{student.parentName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">Parent Mobile Number:</span>
                    <span className="font-medium text-slate-700">{student.contactNumber}</span>
                  </div>
                </div>

                {/* Academic Quick Summary */}
                <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Attendance %</p>
                    <p className="text-xs font-black text-slate-700 mt-0.5">{student.attendancePercentage}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Gathas Completed</p>
                    <p className="text-xs font-black text-slate-700 mt-0.5">{student.gathaProgress}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Pending Gathas</p>
                    <p className="text-xs font-black text-slate-700 mt-0.5">{student.pendingGathas?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Current Status</p>
                    <p className="text-xs font-black text-slate-700 mt-0.5">{student.status}</p>
                  </div>
                </div>

                {/* Actions (View Profile ONLY) */}
                <button 
                  onClick={() => {
                    setSelectedStudent(student);
                    setActiveScreen('TeacherStudentProfile');
                  }}
                  className="w-full py-2.5 bg-white text-slate-700 border border-slate-200 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  View Profile
                  <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    );
  }

  return null;
}
