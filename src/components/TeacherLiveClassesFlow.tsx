import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Video, Users, Play, CheckCircle2, AlertCircle } from 'lucide-react';

interface TeacherLiveClassesFlowProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  teacherSelectedLiveClass: any;
  setTeacherSelectedLiveClass: (cls: any) => void;
  currentLoggedInTeacher: any;
}

export function TeacherLiveClassesFlow({
  activeScreen,
  setActiveScreen,
  teacherSelectedLiveClass,
  setTeacherSelectedLiveClass,
  currentLoggedInTeacher
}: TeacherLiveClassesFlowProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'previous'>('today');
  const [showEndClassModal, setShowEndClassModal] = useState(false);
  const [classStatus, setClassStatus] = useState<'scheduled' | 'in-progress' | 'ended'>('scheduled');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<'total' | 'present' | 'absent'>('total');

  React.useEffect(() => {
    if (teacherSelectedLiveClass) {
      setClassStatus(teacherSelectedLiveClass.status === 'Completed' ? 'ended' : 'scheduled');
    }
  }, [teacherSelectedLiveClass]);

  const teacherClasses = {
    today: [
      { id: 'c1', name: 'Sutra Pronunciation', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '09:00 AM', duration: '60 min', students: 15, status: 'Completed', subject: 'Navkar Mantra' },
      { id: 'c2', name: 'Jain Principles', level: 'Level 2: Jain Geography & Symbols', batch: 'Batch B - Afternoon', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date().toLocaleDateString(), time: '04:00 PM', duration: '60 min', students: 20, status: 'Upcoming', subject: 'Ahinsa Paramo Dharma' }
    ],
    upcoming: [
      { id: 'c3', name: 'Advanced Vows', level: 'Level 3: Pratikraman & Advanced Vows', batch: 'Batch A - Evening', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date(Date.now() + 86400000).toLocaleDateString(), time: '05:00 PM', duration: '60 min', students: 12, status: 'Scheduled', subject: 'Mahavratas' }
    ],
    previous: [
      { id: 'c4', name: 'Basic Stories', level: 'Level 1: Basic Sutras & Stories', batch: 'Batch A - Morning', teacher: currentLoggedInTeacher?.name || 'Teacher', date: new Date(Date.now() - 86400000).toLocaleDateString(), time: '09:00 AM', duration: '60 min', students: 15, status: 'Completed', subject: 'Story of Mahavir Swami' }
    ]
  };

  const currentClasses = teacherClasses[activeTab];

  if (activeScreen === 'TeacherLiveClassDetails' && teacherSelectedLiveClass) {
    const mockStudents = Array.from({ length: teacherSelectedLiveClass.students }, (_, i) => ({
      id: i,
      name: `Student ${i + 1}`,
      initials: `S${i + 1}`,
      attendance: i % 5 === 0 ? 'Absent' : 'Present',
      gathaStatus: classStatus === 'ended' ? (i % 3 === 0 ? 'Pending' : 'Submitted') : 'Not Started'
    }));

    const presentCount = mockStudents.filter(s => s.attendance === 'Present').length;
    const absentCount = mockStudents.filter(s => s.attendance === 'Absent').length;

    const filteredStudents = mockStudents.filter(s => {
      if (selectedStudentFilter === 'present') return s.attendance === 'Present';
      if (selectedStudentFilter === 'absent') return s.attendance === 'Absent';
      return true;
    });

    const handleEndClass = () => {
      setClassStatus('ended');
      setShowEndClassModal(true);
    };

    const handleCloseModal = () => {
      setShowEndClassModal(false);
      setActiveScreen('TeacherLiveClasses');
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24 relative"
      >
        <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-200 sticky top-0 z-20">
          <button 
            onClick={() => { 
              setActiveScreen('TeacherLiveClasses'); 
              setTeacherSelectedLiveClass(null); 
            }} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Live Class Details</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">{teacherSelectedLiveClass.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{teacherSelectedLiveClass.level}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Batch Name</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.batch}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teacher</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.teacher}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.time}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.duration || '60 mins'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.students}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-500" />
              Meeting Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform</p>
                <p className="text-xs font-medium text-slate-700 mt-1 flex items-center gap-1">Zoom</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meeting ID</p>
                <p className="text-xs font-mono text-slate-700 mt-1">892 4531 8890</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meeting Link</p>
                <p className="text-xs text-blue-600 font-mono mt-1 break-all">https://zoom.us/j/89245318890?pwd=abc</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Time</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{teacherSelectedLiveClass.date} • {teacherSelectedLiveClass.time}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              {classStatus === 'scheduled' && (
                <button onClick={() => setClassStatus('in-progress')} className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                  <Play className="w-3.5 h-3.5" />
                  Start Class
                </button>
              )}
              
              {classStatus === 'in-progress' && (
                <>
                  <button className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                    Join Meeting
                  </button>
                  <button onClick={handleEndClass} className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition-colors cursor-pointer active:scale-95">
                    End Class
                  </button>
                </>
              )}

              {classStatus === 'ended' && (
                <button disabled className="w-full py-2.5 bg-slate-100 text-slate-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Class Ended
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-emerald-500" />
              Attendance & Student Filter
            </h3>
            <p className="text-xs text-slate-500 mb-4">Click any card below to filter the student list below:</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedStudentFilter('total')}
                className={`p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  selectedStudentFilter === 'total'
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</p>
                <p className="text-lg font-black text-slate-800 mt-0.5">{teacherSelectedLiveClass.students}</p>
                <p className="text-[9px] font-bold text-blue-600 mt-1 uppercase tracking-wider">All Students</p>
              </button>

              <button
                onClick={() => setSelectedStudentFilter('present')}
                className={`p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  selectedStudentFilter === 'present'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Present</p>
                <p className="text-lg font-black text-emerald-700 mt-0.5">{presentCount}</p>
                <p className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-wider">Present Only</p>
              </button>

              <button
                onClick={() => setSelectedStudentFilter('absent')}
                className={`p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  selectedStudentFilter === 'absent'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Absent</p>
                <p className="text-lg font-black text-rose-700 mt-0.5">{absentCount}</p>
                <p className="text-[9px] font-bold text-rose-600 mt-1 uppercase tracking-wider">Absent Only</p>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                {selectedStudentFilter === 'total' && `Total Students (${filteredStudents.length})`}
                {selectedStudentFilter === 'present' && `Present Students (${filteredStudents.length})`}
                {selectedStudentFilter === 'absent' && `Absent Students (${filteredStudents.length})`}
              </h3>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider border ${
                selectedStudentFilter === 'present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                selectedStudentFilter === 'absent' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                Showing: {selectedStudentFilter}
              </span>
            </div>
            
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">
                No {selectedStudentFilter} students found for this class.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                        {student.initials}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block">{student.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: STU-{100 + student.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          student.attendance === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {student.attendance}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          student.gathaStatus === 'Submitted' ? 'bg-blue-50 text-blue-600' :
                          student.gathaStatus === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {student.gathaStatus === 'Not Started' ? 'Gatha Pending' : student.gathaStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-800">Gatha Submissions</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">Once this class ends, students will be able to submit the assigned Gathas from their syllabus. Submitted Gathas will appear in the Teacher Approval Queue.</p>
            </div>
          </div>
        </div>

        {showEndClassModal && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-5 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Class Completed Successfully</h3>
                <p className="text-sm text-slate-600 mt-2">Students can now submit today's assigned Gathas for teacher review.</p>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <button 
                  onClick={handleCloseModal}
                  className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                >
                  Return to Live Classes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  }

  if (activeScreen === 'TeacherLiveClasses') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full bg-slate-50 overflow-y-auto pb-24"
      >
        <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveScreen('TeacherDashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95">
              <ArrowRight className="w-5 h-5 text-slate-700 rotate-180" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Live Classes</h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'today' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'upcoming' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-colors \${activeTab === 'previous' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Previous
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {currentClasses.length === 0 ? (
            <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Video className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">No classes found</p>
              <p className="text-xs text-slate-400 mt-1">There are no {activeTab} classes.</p>
            </div>
          ) : (
            currentClasses.map((cls) => (
              <div
                key={cls.id}
                onClick={() => {
                  setTeacherSelectedLiveClass(cls);
                  setActiveScreen('TeacherLiveClassDetails');
                }}
                className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{cls.level.split(':')[0]}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    cls.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    cls.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {cls.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{cls.name}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">{cls.batch}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Time</p>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">{cls.time}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Students</p>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">{cls.students} Enrolled</p>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setTeacherSelectedLiveClass(cls);
                    setActiveScreen('TeacherLiveClassDetails');
                  }}
                  className="w-full mt-4 py-2.5 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white border border-blue-200 font-bold text-xs rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  Manage Class Details
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
