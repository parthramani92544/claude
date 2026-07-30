import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  History,
  Settings,
  Plus,
  UserPlus,
  Edit2,
  Lock,
  X,
  Save,
} from 'lucide-react';
import { AdminUser, AuditLogEntry, SystemSettings, AdminRole } from '../types';

interface SystemAdminProps {
  adminUsers: AdminUser[];
  auditLogs: AuditLogEntry[];
  settings: SystemSettings;
  currentRole: AdminRole;
  onAddAdminUser: (u: AdminUser) => void;
  onUpdateAdminUser: (u: AdminUser) => void;
  onUpdateSettings: (s: SystemSettings) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const SystemAdmin: React.FC<SystemAdminProps> = ({
  adminUsers,
  auditLogs,
  settings,
  currentRole,
  onAddAdminUser,
  onUpdateAdminUser,
  onUpdateSettings,
  addToast,
}) => {
  const [subTab, setSubTab] = useState<'users' | 'audit' | 'settings'>('users');
  const [auditSearch, setAuditSearch] = useState('');

  const isSuperAdmin = currentRole === 'SuperAdmin';
  const isAuditor = currentRole === 'Auditor';

  // User Modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState({
    username: '',
    name: '',
    email: '',
    role: 'Admin' as AdminRole,
    status: 'Active' as 'Active' | 'Inactive',
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.actorName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.module.toLowerCase().includes(auditSearch.toLowerCase())
  );

  const openAddUser = () => {
    if (!isSuperAdmin) {
      addToast('error', 'Permission Denied', 'Only SuperAdmins / Trustees can manage user accounts.');
      return;
    }
    setEditingUser(null);
    setUserForm({
      username: '',
      name: '',
      email: '',
      role: 'Admin',
      status: 'Active',
    });
    setIsUserModalOpen(true);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    if (editingUser) {
      onUpdateAdminUser({
        ...editingUser,
        ...userForm,
      });
      addToast('success', 'User Updated', `Updated credentials for ${userForm.name}`);
    } else {
      const newUser: AdminUser = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        ...userForm,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        lastLogin: 'Never',
      };
      onAddAdminUser(newUser);
      addToast('success', 'User Created', `Created ${newUser.role} user ${newUser.username}`);
    }
    setIsUserModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      addToast('error', 'Permission Denied', 'Only SuperAdmins can update global system settings.');
      return;
    }
    onUpdateSettings(settingsForm);
    addToast('success', 'System Settings Saved', 'Global Pathshala configurations updated successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Admin, Security & Audit Logs</h1>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setSubTab('users')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'users' ? 'bg-[#163E2B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Users & Roles ({adminUsers.length})</span>
          </button>
          <button
            onClick={() => setSubTab('audit')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'audit' ? 'bg-[#163E2B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Logs ({auditLogs.length})</span>
          </button>
          <button
            onClick={() => setSubTab('settings')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'settings' ? 'bg-[#163E2B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>System Settings</span>
          </button>
        </div>
      </div>

      {/* Users & Roles View */}
      {subTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900">Portal Admin Users & Role Permissions</h2>
            {isSuperAdmin && (
              <button
                onClick={openAddUser}
                className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Admin User</span>
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-bold">User</th>
                  <th className="py-2.5 px-4 font-bold">Username & Email</th>
                  <th className="py-2.5 px-4 font-bold">Assigned Role</th>
                  <th className="py-2.5 px-4 font-mono font-bold">Last Login</th>
                  <th className="py-2.5 px-4 font-bold">Status</th>
                  <th className="py-2.5 px-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium bg-white">
                {adminUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[10px] font-mono text-[#163E2B]">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800 font-semibold">{u.username}</div>
                      <div className="text-[10px] text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 text-[#163E2B] border border-amber-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{u.lastLogin}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          u.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isSuperAdmin && (
                        <button
                          onClick={() => {
                            setEditingUser(u);
                            setUserForm({
                              username: u.username,
                              name: u.name,
                              email: u.email,
                              role: u.role,
                              status: u.status,
                            });
                            setIsUserModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Logs View */}
      {subTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs flex items-center justify-between">
            <input
              type="text"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Filter audit logs by actor or action..."
              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white w-72"
            />
            <span className="text-xs text-slate-500 font-mono">Showing {filteredLogs.length} audit events</span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Log ID & Time</th>
                  <th className="py-2.5 px-4 font-bold">Actor</th>
                  <th className="py-2.5 px-4 font-bold">Action & Module</th>
                  <th className="py-2.5 px-4 font-bold">Event Details</th>
                  <th className="py-2.5 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium bg-white">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <div className="font-bold text-[#163E2B]">{log.id}</div>
                      <div className="text-[10px] text-slate-500">{log.timestamp}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {log.actorName} <span className="text-slate-500 font-normal">({log.actorRole})</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">
                      <div>{log.action}</div>
                      <div className="text-[10px] text-slate-500">{log.module}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed max-w-md">{log.details}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings View */}
      {subTab === 'settings' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs max-w-2xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Global Portal Configurations</h2>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Pathshala Name</label>
              <input
                type="text"
                required
                value={settingsForm.pathshalaName}
                onChange={(e) => setSettingsForm({ ...settingsForm, pathshalaName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Academic Year</label>
                <input
                  type="text"
                  required
                  value={settingsForm.academicYear}
                  onChange={(e) => setSettingsForm({ ...settingsForm, academicYear: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Daily Niyam Cutoff</label>
                <input
                  type="time"
                  required
                  value={settingsForm.dailyNiyamCutoffTime}
                  onChange={(e) => setSettingsForm({ ...settingsForm, dailyNiyamCutoffTime: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={settingsForm.contactPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  value={settingsForm.contactEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>
            </div>

            {isSuperAdmin && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Global Settings</span>
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingUser ? `Edit User: ${editingUser.username}` : 'Create Portal Admin User'}
              </h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="Ketanbhai Mehta"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  placeholder="ketan.mehta"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="ketan@jainpathshala.org"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Assigned Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                >
                  <option value="SuperAdmin">SuperAdmin / Trustee</option>
                  <option value="Admin">Admin / Office Staff</option>
                  <option value="Guruji">Guruji / Teacher</option>
                  <option value="Auditor">View-Only Auditor</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
