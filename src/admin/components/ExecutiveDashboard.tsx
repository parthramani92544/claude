import React from 'react';
import {
  Users,
  Video,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  UserPlus,
  Calendar,
  Send,
  PlusCircle,
  Play,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  AdminStudent,
  PendingRegistration,
  ScheduledClass,
  GathaSubmission,
  AuditLogEntry,
  AdminRole,
} from '../types';

interface ExecutiveDashboardProps {
  students: AdminStudent[];
  registrations: PendingRegistration[];
  classes: ScheduledClass[];
  gathaSubmissions: GathaSubmission[];
  auditLogs: AuditLogEntry[];
  currentRole: AdminRole;
  onNavigateTab: (tab: string, subTab?: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

const dailyScheduleAndAttendanceData = [
  { day: 'Mon', scheduledClasses: 4, attendedStudents: 48 },
  { day: 'Tue', scheduledClasses: 3, attendedStudents: 36 },
  { day: 'Wed', scheduledClasses: 5, attendedStudents: 58 },
  { day: 'Thu', scheduledClasses: 4, attendedStudents: 45 },
  { day: 'Fri', scheduledClasses: 2, attendedStudents: 24 },
  { day: 'Sat', scheduledClasses: 6, attendedStudents: 72 },
  { day: 'Sun', scheduledClasses: 8, attendedStudents: 92 },
];

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  students,
  registrations,
  classes,
  gathaSubmissions,
  auditLogs,
  currentRole,
  onNavigateTab,
  addToast,
}) => {
  const pendingRegistrationsCount = registrations.filter((r) => r.status === 'Pending').length;
  const pendingGathasCount = gathaSubmissions.filter((g) => g.status === 'Pending').length;
  const activeStudentsCount = students.filter((s) => s.status === 'Active').length;
  const todayClasses = classes.filter((c) => c.dateTime.includes('2026-07-23') || c.status === 'LIVE NOW');
  const totalPointsAwarded = students.reduce((acc, curr) => acc + curr.pointsBalance, 0);

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header Bar */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time Pathshala operations, class schedules, and student participation metrics
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#163E2B] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Role: {currentRole}</span>
        </div>
      </div>

      {/* Enterprise KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            title: 'Active Students',
            value: activeStudentsCount,
            subText: '100% Enrolled',
            icon: Users,
            badgeBg: 'bg-rose-50',
            iconColor: 'text-[#163E2B]',
            tab: 'people',
            subTab: 'students',
          },
          {
            title: "Today's Live Classes",
            value: todayClasses.length,
            subText: '1 Live Session',
            icon: Video,
            badgeBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            tab: 'classes',
            subTab: 'live_classes',
          },
          {
            title: 'Student Registrations',
            value: registrations.length,
            subText: 'Payment Registered',
            icon: UserCheck,
            badgeBg: 'bg-[#163E2B]/10',
            iconColor: 'text-[#163E2B]',
            tab: 'people',
            subTab: 'approvals',
          },
          {
            title: 'Pending Gathas',
            value: pendingGathasCount,
            subText: 'Submissions Queue',
            icon: CheckCircle2,
            badgeBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            tab: 'content',
            subTab: 'sutras',
          },
          {
            title: 'Avg. Attendance',
            value: '91.2%',
            subText: '+2.4% vs last week',
            icon: TrendingUp,
            badgeBg: 'bg-sky-50',
            iconColor: 'text-sky-600',
            tab: 'classes',
            subTab: 'attendance',
          },
          {
            title: 'Points Balance',
            value: totalPointsAwarded,
            subText: 'Total Distributed',
            icon: Award,
            badgeBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            tab: 'activities',
            subTab: 'bonus',
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(kpi.tab, kpi.subTab)}
              className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs hover:border-[#163E2B]/40 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">{kpi.title}</span>
                <div className={`w-8 h-8 rounded-lg ${kpi.badgeBg} flex items-center justify-center ${kpi.iconColor} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{kpi.subText}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Scheduled Classes & Attended Students Chart */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#163E2B]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daily Scheduled Classes & Attended Students</h3>
              <p className="text-[11px] text-slate-500 font-medium">Comparison of scheduled class volume vs. actual student attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/70">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#163E2B] inline-block" />
              <span>Scheduled Classes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
              <span>Attended Students</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dailyScheduleAndAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#CBD5E1' }} />
              <YAxis yAxisId="left" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#CBD5E1' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#CBD5E1' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="scheduledClasses" name="Scheduled Classes" fill="#163E2B" radius={[4, 4, 0, 0]} barSize={28} />
              <Line yAxisId="right" type="monotone" dataKey="attendedStudents" name="Attended Students" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1' }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: Live Classes Monitor & Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes Monitor */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">Today's Live Classes & Schedule Monitor</h3>
            </div>
            <button
              onClick={() => onNavigateTab('classes', 'live_classes')}
              className="text-xs text-[#163E2B] hover:text-[#0F2D1F] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200/80 rounded-lg">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5 font-bold">Class Title</th>
                  <th className="py-2.5 px-3.5 font-bold">Level / Batch</th>
                  <th className="py-2.5 px-3.5 font-bold">Faculty</th>
                  <th className="py-2.5 px-3.5 font-bold">Timing</th>
                  <th className="py-2.5 px-3.5 font-bold">Status</th>
                  <th className="py-2.5 px-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium bg-white">
                {todayClasses.map((cls) => {
                  const isLive = cls.status === 'LIVE NOW';
                  return (
                    <tr key={cls.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-[#163E2B] shrink-0" />
                        <span>{cls.title}</span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-600 text-[11px]">
                        <div className="font-medium text-slate-800">{cls.level}</div>
                        <div className="text-[10px] text-slate-500">{cls.batch}</div>
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-slate-800">{cls.teacherName}</td>
                      <td className="py-3 px-3.5 text-slate-600 font-mono text-[11px]">
                        {cls.dateTime.split(' ')[1]} {cls.dateTime.split(' ')[2]}
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase inline-flex items-center gap-1.5 ${
                            isLive
                              ? 'bg-rose-50 text-[#163E2B] border border-rose-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />}
                          <span>{cls.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <a
                          href={cls.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => addToast('info', 'Class Launcher', `Joining video session for ${cls.title}`)}
                          className="px-3 py-1 bg-[#163E2B] hover:bg-[#0F2D1F] text-white text-[11px] font-semibold rounded-md transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{isLive ? 'Join Live' : 'Start Session'}</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: System Audit & Quick Actions */}
        <div className="space-y-6">
          {/* System Activity & Audit Stream */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">System Activity & Audit</h3>
              </div>
              <button
                onClick={() => onNavigateTab('administration', 'audit_logs')}
                className="text-xs text-[#163E2B] hover:text-[#0F2D1F] font-semibold cursor-pointer"
              >
                All Logs
              </button>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
              {auditLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-[#163E2B]">{log.actorName} ({log.actorRole})</span>
                    <span className="text-slate-400">{log.timestamp.split(' ')[1]} {log.timestamp.split(' ')[2]}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800">{log.details}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-mono">
                    <span>Module: {log.module}</span>
                    <span className="text-emerald-600 font-bold">● {log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Right: Quick actions Section */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Zap className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Quick actions</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Fast Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigateTab('people', 'students')}
                className="p-3 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex flex-col items-start gap-1.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span>+ Enroll Student</span>
              </button>

              <button
                onClick={() => onNavigateTab('classes', 'live_classes')}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl transition-all border border-slate-200/90 flex flex-col items-start gap-1.5 cursor-pointer group shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100/70 flex items-center justify-center text-[#163E2B] group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Schedule Class</span>
              </button>

              <button
                onClick={() => onNavigateTab('administration', 'broadcast')}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl transition-all border border-slate-200/90 flex flex-col items-start gap-1.5 cursor-pointer group shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100/70 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                </div>
                <span>Broadcast Notice</span>
              </button>

              <button
                onClick={() => onNavigateTab('activities', 'bonus')}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl transition-all border border-slate-200/90 flex flex-col items-start gap-1.5 cursor-pointer group shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100/70 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <span>Award Bonus</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


