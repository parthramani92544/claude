import React, { useState } from 'react';
import { Database, Plus, Edit2, Trash2, X, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { MasterEntry, AdminRole } from '../types';

interface MastersManagementProps {
  masters: MasterEntry[];
  currentRole: AdminRole;
  onAddMaster: (master: MasterEntry) => void;
  onUpdateMaster?: (master: MasterEntry) => void;
  onDeleteMaster?: (id: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const MastersManagement: React.FC<MastersManagementProps> = ({
  masters,
  currentRole,
  onAddMaster,
  onUpdateMaster,
  onDeleteMaster,
  addToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaster, setEditingMaster] = useState<MasterEntry | null>(null);

  const [formData, setFormData] = useState({
    category: 'Sects' as MasterEntry['category'],
    value: '',
    code: '',
    sortOrder: 1,
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const categories = ['Sects', 'Cities', 'Venues', 'Qualifications', 'Relationships', 'Documents'];

  const filteredMasters = masters.filter((m) => {
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch =
      m.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.code && m.code.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingMaster(null);
    setFormData({
      category: 'Sects',
      value: '',
      code: `MST-${Date.now().toString().slice(-4)}`,
      sortOrder: masters.length + 1,
      description: '',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MasterEntry) => {
    setEditingMaster(item);
    setFormData({
      category: item.category,
      value: item.value,
      code: item.code || item.id,
      sortOrder: item.sortOrder || 1,
      description: item.description || '',
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value.trim()) {
      addToast('error', 'Required Field', 'Item value / display name is required.');
      return;
    }

    if (editingMaster) {
      if (onUpdateMaster) {
        onUpdateMaster({ ...editingMaster, ...formData });
      }
      addToast('success', 'Master Updated', `Updated ${formData.value}`);
    } else {
      const newItem: MasterEntry = {
        id: `MST-${Date.now()}`,
        ...formData,
      };
      onAddMaster(newItem);
      addToast('success', 'Lookup Added', `Added ${formData.value} to ${formData.category}`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="border-l-4 border-[#163E2B] pl-3.5">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Masters & Lookups Configurator</h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Lookup Value</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#163E2B] text-white'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }`}
          >
            All Masters ({masters.length})
          </button>
          {categories.map((cat) => {
            const count = masters.filter((m) => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#163E2B] text-white'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lookup items..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-stone-400 focus:outline-none focus:border-[#163E2B]"
          />
        </div>
      </div>

      {/* Master Data Table */}
      <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            <tr>
              <th className="py-3.5 px-4">CATEGORY</th>
              <th className="py-3.5 px-4">CODE</th>
              <th className="py-3.5 px-4">DISPLAY NAME / VALUE</th>
              <th className="py-3.5 px-4">DESCRIPTION</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-medium text-slate-700">
            {filteredMasters.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-stone-100 text-slate-700 border border-stone-200 font-mono">
                    {item.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{item.code || item.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{item.value}</td>
                <td className="py-3.5 px-4 text-slate-500">{item.description || 'System master item'}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-slate-500 border border-stone-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {onDeleteMaster && (
                      <button
                        onClick={() => {
                          if (confirm('Delete master entry?')) {
                            onDeleteMaster(item.id);
                            addToast('info', 'Deleted', 'Lookup item removed.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingMaster ? 'Edit Lookup Item' : 'Add Master Lookup Value'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Master Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Display Value / Name</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g. Shvetambar Murtipujak or Borivali West"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#163E2B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Item Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#163E2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#163E2B]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#163E2B]"
                  placeholder="Optional details..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {editingMaster ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
