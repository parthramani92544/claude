import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Plus,
  Download,
  Eye,
  X,
  Users,
} from 'lucide-react';
import { AttendanceSessionLog, AdminStudent, AdminRole } from '../types';

interface AttendanceTrackingProps {
  logs: AttendanceSessionLog[];
  students: AdminStudent[];
  currentRole: AdminRole;
  onAddAttendanceLog: (log: AttendanceSessionLog) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const AttendanceTracking: React.FC<AttendanceTrackingProps> = ({
  logs,
  students,
  currentRole,
  onAddAttendanceLog,
  addToast,
}) => {
  const [selectedLog, setSelectedLog] = useState<AttendanceSessionLog | null>(null);
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);

  const isAuditor = currentRole === 'Auditor';

  // New session marking form state
  const [sessionDate, setSessionDate] = useState('2026-07-23');
  const [selectedLevel, setSelectedLevel] = useState('Level 1 - Prarambhik');
  const [selectedBatch, setSelectedBatch] = useState('Batch A - Weekend Morning');

  // Student Attendance toggle Map
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({});

  const levelStudents = students.filter((s) => s.level === selectedLevel && s.batch === selectedBatch);

  const openNewAttendanceModal = () => {
    if (isAuditor) {
      addToast('warning', 'Access Restricted', 'View-Only Auditors cannot log attendance.');
      return;
    }
    // Initialize all as present by default
    const initialMap: Record<string, boolean> = {};
    levelStudents.forEach((s) => {
      initialMap[s.id] = true;
    });
    setAttendanceMap(initialMap);
    setIsMarkModalOpen(true);
  };

  const toggleStudentAttendance = (stuId: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [stuId]: !prev[stuId],
    }));
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const records = levelStudents.map((s) => ({
      studentId: s.id,
      studentName: `${s.firstName} ${s.surname}`,
      status: (attendanceMap[s.id] ? 'Present' : 'Absent') as 'Present' | 'Absent' | 'Late',
    }));

    const presentCount = records.filter((r) => r.status === 'Present').length;
    const totalEnrolled = records.length;
    const attendanceRate = totalEnrolled > 0 ? Math.round((presentCount / totalEnrolled) * 100) : 100;

    const newLog: AttendanceSessionLog = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      sessionDate,
      level: selectedLevel,
      batch: selectedBatch,
      classId: 'CLS-REG',
      totalEnrolled,
      presentCount,
      absentCount: totalEnrolled - presentCount,
      attendanceRate,
      status: 'Completed',
      records,
    };

    onAddAttendanceLog(newLog);
    addToast('success', 'Attendance Saved', `Logged attendance session for ${selectedLevel} (${presentCount}/${totalEnrolled} present)`);
    setIsMarkModalOpen(false);
  };

  const handleExportCSV = () => {
    const csvHeader = 'Session ID,Date,Level,Batch,Enrolled,Present,Absent,Rate %\n';
    const csvRows = logs
      .map((l) => `${l.id},${l.sessionDate},"${l.level}","${l.batch}",${l.totalEnrolled},${l.presentCount},${l.absentCount},${l.attendanceRate}%`)
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pathshala_Attendance_Summary_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addToast('info', 'CSV Download Initiated', `Exported ${logs.length} session attendance records.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Log & Audit Console</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#163E2B]" />
            <span>Export CSV Report</span>
          </button>
          {!isAuditor && (
            <button
              onClick={openNewAttendanceModal}
              className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Mark Session Attendance</span>
            </button>
          )}
        </div>
      </div>

      {/* Session Logs History Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Log ID</th>
                <th className="py-2.5 px-4 font-bold">Session Date</th>
                <th className="py-2.5 px-4 font-bold">Level & Batch Slot</th>
                <th className="py-2.5 px-4 text-center font-bold">Enrolled</th>
                <th className="py-2.5 px-4 text-center font-bold">Present / Absent</th>
                <th className="py-2.5 px-4 text-center font-bold">Attendance %</th>
                <th className="py-2.5 px-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#163E2B]">{log.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-900">{log.sessionDate}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{log.level}</div>
                    <div className="text-[10px] text-slate-500">{log.batch}</div>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">{log.totalEnrolled}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    <span className="text-emerald-700">{log.presentCount} P</span> /{' '}
                    <span className="text-rose-700">{log.absentCount} A</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`font-mono font-bold px-2.5 py-0.5 rounded text-[11px] ${
                        log.attendanceRate >= 85
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-amber-700 bg-amber-50 border border-amber-200'
                      }`}
                    >
                      {log.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-md cursor-pointer flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Roster</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roster Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Attendance Log Roster: {selectedLog.id}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedLog.level} • {selectedLog.sessionDate}</p>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 text-xs">
              {selectedLog.records.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="font-bold text-slate-900">{rec.studentName}</div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      rec.status === 'Present'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark New Session Modal */}
      {isMarkModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Mark Session Attendance Roster</h3>
              <button onClick={() => setIsMarkModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Session Date</label>
                  <input
                    type="date"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Academic Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Level 1 - Prarambhik">Level 1 - Prarambhik</option>
                    <option value="Level 2 - Madhyamik">Level 2 - Madhyamik</option>
                    <option value="Level 3 - Shravak Junior">Level 3 - Shravak Junior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Batch Slot</label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Batch A - Weekend Morning">Batch A - Weekend Morning</option>
                    <option value="Batch B - Weekend Evening">Batch B - Weekend Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">
                  Student Present Checklist ({levelStudents.length} Students)
                </label>
                <div className="space-y-2 max-h-[250px] overflow-y-auto bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {levelStudents.map((s) => {
                    const isPresent = attendanceMap[s.id] !== false;
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleStudentAttendance(s.id)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                          isPresent ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}
                      >
                        <div className="font-bold">{s.firstName} {s.surname}</div>
                        <span className="text-[10px] font-mono font-bold uppercase">{isPresent ? 'Present ✓' : 'Absent ✗'}</span>
                      </div>
                    );
                  })}
                  {levelStudents.length === 0 && (
                    <p className="text-center text-slate-500 py-4 font-mono">No enrolled students found for this level & batch slot.</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMarkModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Attendance Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
