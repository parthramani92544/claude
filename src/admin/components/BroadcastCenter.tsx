import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Smartphone,
  Bell,
  Plus,
  CheckCircle2,
  X,
  Users,
} from 'lucide-react';
import { BroadcastMessage, AdminRole } from '../types';

interface BroadcastCenterProps {
  broadcasts: BroadcastMessage[];
  currentRole: AdminRole;
  onSendBroadcast: (msg: BroadcastMessage) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const BroadcastCenter: React.FC<BroadcastCenterProps> = ({
  broadcasts,
  currentRole,
  onSendBroadcast,
  addToast,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuditor = currentRole === 'Auditor';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Class Announcement',
    targetAudience: 'All Parents & Students',
    channels: ['In-App', 'WhatsApp'],
    messageBody: '',
  });

  const handleToggleChannel = (ch: string) => {
    if (formData.channels.includes(ch)) {
      setFormData({
        ...formData,
        channels: formData.channels.filter((c) => c !== ch),
      });
    } else {
      setFormData({
        ...formData,
        channels: [...formData.channels, ch],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const newBroadcast: BroadcastMessage = {
      id: `BRD-${Math.floor(300 + Math.random() * 700)}`,
      ...formData,
      dispatchedTime: new Date().toLocaleString(),
      deliveryStatus: 'Delivered (145/145)',
    };

    onSendBroadcast(newBroadcast);
    addToast('success', 'Broadcast Dispatched', `Sent broadcast message via ${formData.channels.join(', ')}`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Broadcast Communication Center</h1>
        </div>

        {!isAuditor && (
          <button
            onClick={() => {
              setFormData({
                title: '',
                category: 'Class Announcement',
                targetAudience: 'All Parents & Students',
                channels: ['In-App', 'WhatsApp'],
                messageBody: '',
              });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Broadcast Notice</span>
          </button>
        )}
      </div>

      {/* Broadcast History Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Broadcast Announcements History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Broadcast ID</th>
                <th className="py-2.5 px-4 font-bold">Notice Title & Category</th>
                <th className="py-2.5 px-4 font-bold">Target Audience</th>
                <th className="py-2.5 px-4 font-bold">Channels</th>
                <th className="py-2.5 px-4 font-mono font-bold">Dispatched Time</th>
                <th className="py-2.5 px-4 font-bold">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {broadcasts.map((brd) => (
                <tr key={brd.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#163E2B]">{brd.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{brd.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{brd.category}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1 italic">"{brd.messageBody}"</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{brd.targetAudience}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {brd.channels.map((ch, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-[#163E2B] text-[10px] font-mono border border-amber-200 font-bold">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{brd.dispatchedTime}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {brd.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Dispatch Multi-Channel Broadcast</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Special Paryushan Meeting Announcement"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Notice Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="Class Announcement">Class Announcement</option>
                    <option value="Niyam Reminder">Niyam Reminder</option>
                    <option value="Urgent Circular">Urgent Circular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                  >
                    <option value="All Parents & Students">All Parents & Students</option>
                    <option value="Level 1 Students">Level 1 Students</option>
                    <option value="Level 2 Students">Level 2 Students</option>
                    <option value="Level 3 Students">Level 3 Students</option>
                    <option value="Teachers Only">Teachers Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1.5">
                  Delivery Channels
                </label>
                <div className="flex gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {['In-App', 'WhatsApp', 'SMS'].map((ch) => (
                    <label key={ch} className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                      <input
                        type="checkbox"
                        checked={formData.channels.includes(ch)}
                        onChange={() => handleToggleChannel(ch)}
                        className="rounded border-slate-300 text-[#163E2B] focus:ring-[#163E2B]"
                      />
                      <span>{ch}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Message Body</label>
                <textarea
                  rows={4}
                  required
                  value={formData.messageBody}
                  onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                  placeholder="Type announcement message text..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-[#163E2B] focus:bg-white"
                />
              </div>

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
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
