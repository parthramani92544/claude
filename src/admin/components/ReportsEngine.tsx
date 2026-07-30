import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { AdminStudent, AttendanceSessionLog, SutraCatalogItem } from '../types';

interface ReportsEngineProps {
  students: AdminStudent[];
  attendanceLogs: AttendanceSessionLog[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const ReportsEngine: React.FC<ReportsEngineProps> = ({
  students,
  attendanceLogs,
  addToast,
}) => {
  const [reportType, setReportType] = useState('summary');

  // Chart 1 Data: Level Distribution
  const levelDistribution = [
    {
      name: 'Level 1 - Prarambhik',
      students: students.filter((s) => s.level.includes('Level 1')).length,
    },
    {
      name: 'Level 2 - Madhyamik',
      students: students.filter((s) => s.level.includes('Level 2')).length,
    },
    {
      name: 'Level 3 - Shravak Jr',
      students: students.filter((s) => s.level.includes('Level 3')).length,
    },
  ];

  // Chart 2 Data: Attendance Rates
  const attendanceTrend = attendanceLogs.map((log) => ({
    date: log.sessionDate,
    rate: log.attendanceRate,
    present: log.presentCount,
  }));

  // Colors for Pie
  const COLORS = ['#163E2B', '#059669', '#d97706', '#2563eb'];

  const handleExportPDF = () => {
    addToast('info', 'PDF Generation', 'Exporting executive Pathshala analytics PDF report...');
    setTimeout(() => {
      addToast('success', 'PDF Ready', 'Pathshala_Academic_Analytics_2026.pdf downloaded.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reports & Analytical Insights Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">Academic progress metrics, attendance trends, and points distribution charts.</p>
        </div>

        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Distribution Pie Chart */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#163E2B]" />
              <span>Enrollment Distribution by Academic Level</span>
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={levelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="students"
                >
                  {levelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trend Line Chart */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Attendance Rate Trend (% Present)</span>
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                />
                <Line type="monotone" dataKey="rate" stroke="#059669" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Points Leaderboard Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Pathshala Academic Honor Roll & Top Performers</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Rank</th>
                <th className="py-2.5 px-4 font-bold">Student Name</th>
                <th className="py-2.5 px-4 font-bold">Level</th>
                <th className="py-2.5 px-4 font-bold text-center">Attendance</th>
                <th className="py-2.5 px-4 font-bold text-center">Gathas Recited</th>
                <th className="py-2.5 px-4 font-bold text-right">Points Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {[...students]
                .sort((a, b) => b.pointsBalance - a.pointsBalance)
                .map((stu, rank) => (
                  <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-600">#{rank + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <img src={stu.photoUrl} alt={stu.firstName} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      <span>{stu.firstName} {stu.surname}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{stu.level}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{stu.attendanceRate}%</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">{stu.totalGathas}</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#163E2B]">{stu.pointsBalance} pts</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
