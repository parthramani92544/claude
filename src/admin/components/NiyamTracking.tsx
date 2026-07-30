import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Plus,
  Edit2,
  Trash2,
  X,
  Award,
  Clock,
  Check,
} from 'lucide-react';
import { NiyamSubmission, NiyamRule, AdminRole } from '../types';

interface NiyamTrackingProps {
  submissions: NiyamSubmission[];
  rules: NiyamRule[];
  currentRole: AdminRole;
  onApproveNiyam: (sub: NiyamSubmission) => void;
  onRejectNiyam: (sub: NiyamSubmission) => void;
  onAddRule: (rule: NiyamRule) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const NiyamTracking: React.FC<NiyamTrackingProps> = ({
  submissions,
  rules,
  currentRole,
  onApproveNiyam,
  onRejectNiyam,
  onAddRule,
  addToast,
}) => {
  const [subTab, setSubTab] = useState<'submissions' | 'rules'>('submissions');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuditor = currentRole === 'Auditor';

  const [ruleForm, setRuleForm] = useState({
    title: '',
    level: 'All Levels',
    defaultPoints: 10,
    autoApprove: true,
    description: '',
  });

  const handleApprove = (sub: NiyamSubmission) => {
    if (isAuditor) return;
    onApproveNiyam(sub);
    addToast('success', 'Niyam Verified', `Approved ${sub.studentName}'s Niyam submission (+${sub.pointsEarned} pts)`);
  };

  const handleReject = (sub: NiyamSubmission) => {
    if (isAuditor) return;
    onRejectNiyam(sub);
    addToast('info', 'Niyam Rejected', `Rejected submission for ${sub.studentName}`);
  };

  const handleRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const newRule: NiyamRule = {
      id: `RUL-${rules.length + 1}`,
      ...ruleForm,
    };
    onAddRule(newRule);
    addToast('success', 'Niyam Rule Created', `Created ${newRule.title} rule.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Daily Niyam Vows & Discipline Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">Audit daily student spiritual vows and configure auto-approval cutoffs.</p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setSubTab('submissions')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'submissions' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check-in Queue ({submissions.filter((s) => s.status.includes('Pending')).length})</span>
          </button>
          <button
            onClick={() => setSubTab('rules')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'rules' ? 'bg-white text-[#163E2B] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Niyam Rules Config ({rules.length})</span>
          </button>
        </div>
      </div>

      {/* Submissions Queue View */}
      {subTab === 'submissions' && (
        <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900">Daily Niyam Check-ins Log</h3>
            <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono font-bold">⏰ Daily Cutoff: 07:30 PM (Sunset)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Log ID</th>
                  <th className="py-2.5 px-4 font-bold">Student Name & Level</th>
                  <th className="py-2.5 px-4 font-bold">Date</th>
                  <th className="py-2.5 px-4 font-bold">Completed Niyams / Vows</th>
                  <th className="py-2.5 px-4 text-center font-bold">Points Earned</th>
                  <th className="py-2.5 px-4 font-bold">Status</th>
                  <th className="py-2.5 px-4 text-right font-bold">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium bg-white">
                {submissions.map((sub) => {
                  const isPending = sub.status.includes('Pending');

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#163E2B]">{sub.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{sub.studentName}</div>
                        <div className="text-[10px] text-slate-500">{sub.level}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{sub.submissionDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {sub.completedNiyams.map((n, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200 font-semibold">
                              {n}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-amber-700">
                        +{sub.pointsEarned} pts
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            sub.status === 'Auto-Approved' || sub.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isPending
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isPending && !isAuditor ? (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleApprove(sub)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] rounded cursor-pointer transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(sub)}
                              className="px-2.5 py-1 bg-white text-rose-700 border border-slate-200 hover:bg-rose-50 font-semibold text-[10px] rounded cursor-pointer transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">Verified</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Niyam Rules View */}
      {subTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900">Daily Niyam Rules & Points Mapping</h2>
            {!isAuditor && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Niyam Rule</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#163E2B]">{rule.id} • {rule.level}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-mono font-bold border border-amber-200">
                    +{rule.defaultPoints} Points
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{rule.title}</h3>
                <p className="text-xs text-slate-600 font-normal">{rule.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Verification:</span>
                  <span className={`font-bold ${rule.autoApprove ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {rule.autoApprove ? 'Auto-Approve ✓' : 'Manual Review 🔍'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Rule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Create Daily Niyam Rule</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRuleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Rule Title / Vow</label>
                <input
                  type="text"
                  required
                  value={ruleForm.title}
                  onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                  placeholder="e.g., Temple Darshan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Target Level</label>
                  <select
                    value={ruleForm.level}
                    onChange={(e) => setRuleForm({ ...ruleForm, level: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Level 1 & Level 2">Level 1 & 2</option>
                    <option value="Level 3 Only">Level 3 Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Points Value</label>
                  <input
                    type="number"
                    required
                    value={ruleForm.defaultPoints}
                    onChange={(e) => setRuleForm({ ...ruleForm, defaultPoints: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Description</label>
                <textarea
                  rows={2}
                  value={ruleForm.description}
                  onChange={(e) => setRuleForm({ ...ruleForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-700 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={ruleForm.autoApprove}
                  onChange={(e) => setRuleForm({ ...ruleForm, autoApprove: e.target.checked })}
                  className="rounded bg-slate-50 border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                />
                <span>Auto-Approve check-ins for this rule</span>
              </label>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Niyam Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
