import React, { useState, useMemo } from 'react';
import {
  Award,
  Plus,
  PlusCircle,
  Calendar,
  X,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Gift,
  Layers,
  Clock,
  Sparkles,
  Users,
  Tag,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { BonusEventItem, PointsLedgerTransaction, AdminStudent, AdminRole } from '../types';

export const EVENT_TYPES = [
  'Paryushan',
  'Mahavir Jayanti',
  'Special Pathshala Event',
  'Sunday Class Bonus',
  'Competition Participation',
  'Attendance Campaign',
  'Custom Events',
] as const;

export const PATHSHALA_LEVELS = [
  'Level 1 - Prarambhik',
  'Level 2 - Madhyamik',
  'Level 3 - Shravak Junior',
  'All Levels',
];

interface BonusPointsProps {
  bonusEvents?: BonusEventItem[];
  events?: BonusEventItem[];
  transactions: PointsLedgerTransaction[];
  students: AdminStudent[];
  currentRole: AdminRole;
  onAddBonusEvent?: (evt: BonusEventItem) => void;
  onAddEvent?: (evt: BonusEventItem) => void;
  onUpdateBonusEvent?: (evt: BonusEventItem) => void;
  onUpdateEvent?: (evt: BonusEventItem) => void;
  onDeleteBonusEvent?: (id: string) => void;
  onDeleteEvent?: (id: string) => void;
  onAdjustPoints: (
    studentId: string,
    points: number,
    reason: string,
    type: 'Credit' | 'Debit',
    actorName: string
  ) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const BonusPoints: React.FC<BonusPointsProps> = ({
  bonusEvents,
  events,
  transactions,
  students,
  currentRole,
  onAddBonusEvent,
  onAddEvent,
  onUpdateBonusEvent,
  onUpdateEvent,
  onDeleteBonusEvent,
  onDeleteEvent,
  onAdjustPoints,
  addToast,
}) => {
  const isAuditor = currentRole === 'Auditor';

  // Consolidate events list
  const activeEventsList = useMemo(() => {
    return bonusEvents || events || [];
  }, [bonusEvents, events]);

  // Tab State: 'events' | 'ledger'
  const [activeTab, setActiveTab] = useState<'events' | 'ledger'>('events');

  // Search & Filter state for Ledger
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerEventFilter, setLedgerEventFilter] = useState('ALL');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState('ALL');

  // Search state for Events
  const [eventSearch, setEventSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('ALL');
  const [eventStatusFilter, setEventStatusFilter] = useState('ALL');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BonusEventItem | null>(null);
  const [viewingEvent, setViewingEvent] = useState<BonusEventItem | null>(null);

  // Award Points Modal
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [awardEventTitle, setAwardEventTitle] = useState('');
  const [awardPoints, setAwardPoints] = useState(50);
  const [awardReason, setAwardReason] = useState('Bonus Points Awarded');
  const [awardType, setAwardType] = useState<'Credit' | 'Debit'>('Credit');

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    eventType: 'Paryushan',
    description: '',
    pointsValue: 50,
    eligibleLevels: ['Level 1 - Prarambhik', 'Level 2 - Madhyamik', 'Level 3 - Shravak Junior'],
    applicableStudents: 'All Enrolled Students',
    startDate: '2026-08-01',
    endDate: '2026-08-10',
    status: 'Active' as 'Active' | 'Inactive',
  });

  // Event Handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const newEvt: BonusEventItem = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      title: eventForm.title,
      eventType: eventForm.eventType,
      description: eventForm.description,
      pointsValue: Number(eventForm.pointsValue) || 0,
      eligibleLevels: eventForm.eligibleLevels.length > 0 ? eventForm.eligibleLevels : ['All Levels'],
      applicableStudents: eventForm.applicableStudents || 'All Students',
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      eventDate: eventForm.endDate,
      status: eventForm.status,
    };

    if (onAddEvent) onAddEvent(newEvt);
    else if (onAddBonusEvent) onAddBonusEvent(newEvt);

    addToast('success', 'Event Created', `Bonus Event "${newEvt.title}" created successfully.`);
    setIsCreateModalOpen(false);
    resetEventForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || isAuditor) return;

    const updatedEvt: BonusEventItem = {
      ...editingEvent,
      title: eventForm.title,
      eventType: eventForm.eventType,
      description: eventForm.description,
      pointsValue: Number(eventForm.pointsValue) || 0,
      eligibleLevels: eventForm.eligibleLevels.length > 0 ? eventForm.eligibleLevels : ['All Levels'],
      applicableStudents: eventForm.applicableStudents || 'All Students',
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      eventDate: eventForm.endDate,
      status: eventForm.status,
    };

    if (onUpdateEvent) onUpdateEvent(updatedEvt);
    else if (onUpdateBonusEvent) onUpdateBonusEvent(updatedEvt);

    addToast('success', 'Event Updated', `Updated details for "${updatedEvt.title}".`);
    setEditingEvent(null);
    resetEventForm();
  };

  const handleToggleStatus = (evt: BonusEventItem) => {
    if (isAuditor) return;
    const nextStatus = evt.status === 'Active' ? 'Inactive' : 'Active';
    const updatedEvt: BonusEventItem = { ...evt, status: nextStatus };

    if (onUpdateEvent) onUpdateEvent(updatedEvt);
    else if (onUpdateBonusEvent) onUpdateBonusEvent(updatedEvt);

    addToast('info', 'Status Changed', `Event "${evt.title}" is now ${nextStatus}.`);
  };

  const handleDelete = (evt: BonusEventItem) => {
    if (isAuditor) return;
    if (onDeleteEvent) onDeleteEvent(evt.id);
    else if (onDeleteBonusEvent) onDeleteBonusEvent(evt.id);

    addToast('warning', 'Event Removed', `Deleted bonus event "${evt.title}".`);
  };

  const openEditModal = (evt: BonusEventItem) => {
    setEditingEvent(evt);
    setEventForm({
      title: evt.title,
      eventType: evt.eventType || 'Paryushan',
      description: evt.description,
      pointsValue: evt.pointsValue,
      eligibleLevels: evt.eligibleLevels || ['All Levels'],
      applicableStudents: evt.applicableStudents || 'All Enrolled Students',
      startDate: evt.startDate || evt.eventDate || '2026-08-01',
      endDate: evt.endDate || evt.eventDate || '2026-08-10',
      status: evt.status || 'Active',
    });
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      eventType: 'Paryushan',
      description: '',
      pointsValue: 50,
      eligibleLevels: ['Level 1 - Prarambhik', 'Level 2 - Madhyamik', 'Level 3 - Shravak Junior'],
      applicableStudents: 'All Enrolled Students',
      startDate: '2026-08-01',
      endDate: '2026-08-10',
      status: 'Active',
    });
  };

  // Award Points Submit
  const handleAwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditor) return;

    const matchedStu = students.find((s) => s.id === selectedStudentId);
    if (!matchedStu) return;

    const pointsNum = awardType === 'Credit' ? Math.abs(awardPoints) : -Math.abs(awardPoints);
    const fullReason = awardEventTitle ? `[${awardEventTitle}] ${awardReason}` : awardReason;

    onAdjustPoints(selectedStudentId, pointsNum, fullReason, awardType, 'Admin Office');
    addToast(
      'success',
      'Points Awarded',
      `Awarded ${pointsNum > 0 ? '+' : ''}${pointsNum} pts to ${matchedStu.firstName} ${matchedStu.surname}`
    );
    setIsAwardModalOpen(false);
  };

  // Level Checkbox Toggle
  const handleLevelToggle = (lvl: string) => {
    if (eventForm.eligibleLevels.includes(lvl)) {
      setEventForm({
        ...eventForm,
        eligibleLevels: eventForm.eligibleLevels.filter((l) => l !== lvl),
      });
    } else {
      setEventForm({
        ...eventForm,
        eligibleLevels: [...eventForm.eligibleLevels, lvl],
      });
    }
  };

  // Export CSV for Ledger
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      addToast('info', 'No Data', 'No ledger transactions available to export.');
      return;
    }

    const headers = ['Transaction ID', 'Awarded Date', 'Student Name', 'Reason / Event', 'Type', 'Points Awarded', 'Awarded By'];
    const rows = filteredTransactions.map((tx) => [
      `"${tx.id}"`,
      `"${tx.timestamp}"`,
      `"${tx.studentName}"`,
      `"${tx.reason.replace(/"/g, '""')}"`,
      `"${tx.type}"`,
      `"${tx.points > 0 ? '+' : ''}${tx.points}"`,
      `"${tx.adjustedBy}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `points_ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'Ledger Exported', 'Downloaded points ledger CSV report.');
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return activeEventsList.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
        evt.description.toLowerCase().includes(eventSearch.toLowerCase()) ||
        (evt.eventType && evt.eventType.toLowerCase().includes(eventSearch.toLowerCase()));

      const matchesType = eventTypeFilter === 'ALL' || evt.eventType === eventTypeFilter;
      const matchesStatus = eventStatusFilter === 'ALL' || (evt.status || 'Active') === eventStatusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [activeEventsList, eventSearch, eventTypeFilter, eventStatusFilter]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.studentName.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
        tx.reason.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
        tx.adjustedBy.toLowerCase().includes(ledgerSearch.toLowerCase());

      const matchesEvent = ledgerEventFilter === 'ALL' || tx.reason.includes(ledgerEventFilter);
      const matchesType = ledgerTypeFilter === 'ALL' || tx.type === ledgerTypeFilter;

      return matchesSearch && matchesEvent && matchesType;
    });
  }, [transactions, ledgerSearch, ledgerEventFilter, ledgerTypeFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bonus Events & Points Ledger</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isAuditor && (
            <>
              <button
                onClick={() => {
                  setSelectedStudentId(students[0]?.id || '');
                  setAwardEventTitle('');
                  setIsAwardModalOpen(true);
                }}
                className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Award Points</span>
              </button>
              <button
                onClick={() => {
                  resetEventForm();
                  setIsCreateModalOpen(true);
                }}
                className="px-4 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Bonus Event</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="bg-white border border-stone-200/90 p-2 rounded-2xl shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'events'
              ? 'bg-[#163E2B] text-white shadow-xs'
              : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Bonus Events Catalog</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 text-white">
            {activeEventsList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'ledger'
              ? 'bg-[#163E2B] text-white shadow-xs'
              : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Points Audit Ledger</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 text-white">
            {transactions.length}
          </span>
        </button>
      </div>

      {/* TAB 1: BONUS EVENTS CATALOG */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-stone-200/90 p-4 rounded-2xl shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full lg:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search events by title or description..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Event Types</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={eventStatusFilter}
                onChange={(e) => setEventStatusFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {(eventSearch || eventTypeFilter !== 'ALL' || eventStatusFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setEventSearch('');
                    setEventTypeFilter('ALL');
                    setEventStatusFilter('ALL');
                  }}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#163E2B] hover:bg-[#163E2B]/10 rounded-xl cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-stone-200/90 rounded-2xl p-12 text-center space-y-2">
              <Gift className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No Bonus Events Found</p>
              <p className="text-xs text-slate-500">Create a new bonus event or adjust your search filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((evt) => {
                const isActive = (evt.status || 'Active') === 'Active';

                return (
                  <div
                    key={evt.id}
                    className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#163E2B]/10 text-[#163E2B] border border-[#163E2B]/20">
                          {evt.eventType || 'Special Event'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                              isActive
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-stone-100 text-slate-600 border-stone-200'
                            }`}
                          >
                            {evt.status || 'Active'}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-mono font-extrabold text-xs">
                            +{evt.pointsValue} Pts
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{evt.title}</h3>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="font-semibold">Applicable Levels:</span>
                          <span className="font-bold text-slate-900 truncate max-w-[150px]">
                            {evt.eligibleLevels ? evt.eligibleLevels.join(', ') : 'All Levels'}
                          </span>
                        </div>

                        {evt.applicableStudents && (
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="font-semibold">Students:</span>
                            <span className="font-bold text-slate-900">{evt.applicableStudents}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="font-semibold">Event Dates:</span>
                          <span className="font-mono text-slate-800">
                            {evt.startDate || evt.eventDate || 'N/A'} to {evt.endDate || evt.eventDate || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1">
                        {/* View */}
                        <button
                          onClick={() => setViewingEvent(evt)}
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                          title="View Event Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        {!isAuditor && (
                          <button
                            onClick={() => openEditModal(evt)}
                            className="p-1.5 bg-stone-100 hover:bg-stone-200 text-[#163E2B] rounded-lg cursor-pointer transition-colors"
                            title="Edit Event"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Toggle Active/Inactive */}
                        {!isAuditor && (
                          <button
                            onClick={() => handleToggleStatus(evt)}
                            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-stone-100 hover:bg-stone-200 text-slate-600'
                            }`}
                            title={isActive ? 'Deactivate Event' : 'Activate Event'}
                          >
                            {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          </button>
                        )}

                        {/* Delete */}
                        {!isAuditor && (
                          <button
                            onClick={() => handleDelete(evt)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg cursor-pointer transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Quick Award Points */}
                      {!isAuditor && (
                        <button
                          onClick={() => {
                            setSelectedStudentId(students[0]?.id || '');
                            setAwardEventTitle(evt.title);
                            setAwardPoints(evt.pointsValue);
                            setAwardReason(`Bonus awarded for ${evt.title}`);
                            setIsAwardModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-[11px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                        >
                          <Gift className="w-3 h-3" />
                          <span>Award</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: POINTS AUDIT LEDGER */}
      {activeTab === 'ledger' && (
        <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden space-y-3">
          {/* Filter Header */}
          <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full lg:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={ledgerSearch}
                onChange={(e) => setLedgerSearch(e.target.value)}
                placeholder="Search by student, event, or awarder..."
                className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#163E2B] font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <select
                value={ledgerTypeFilter}
                onChange={(e) => setLedgerTypeFilter(e.target.value)}
                className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#163E2B]"
              >
                <option value="ALL">All Types</option>
                <option value="Credit">Credit (+ Points)</option>
                <option value="Debit">Debit (- Points)</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs rounded-xl border border-stone-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-16 space-y-2 bg-stone-50/50">
              <Award className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No Ledger Transactions Found</p>
              <p className="text-xs text-slate-500">No matching student transactions recorded in this log.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-stone-100/80 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Txn ID & Date</th>
                    <th className="py-3 px-4 font-bold">Student Name</th>
                    <th className="py-3 px-4 font-bold">Event / Reason</th>
                    <th className="py-3 px-4 font-bold text-center">Type</th>
                    <th className="py-3 px-4 font-bold text-center">Bonus Points</th>
                    <th className="py-3 px-4 font-bold">Awarded By</th>
                    <th className="py-3 px-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-slate-800 bg-white">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-[#163E2B]">{tx.id}</div>
                        <span className="text-[10px] text-slate-500">{tx.timestamp}</span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">{tx.studentName}</td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-semibold">{tx.reason}</div>
                        {tx.eventName && (
                          <span className="text-[10px] text-slate-500 font-mono">Event: {tx.eventName}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            tx.type === 'Credit'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-900">
                        {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600">{tx.adjustedBy}</td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {tx.status || 'Awarded'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT EVENT MODAL */}
      {(isCreateModalOpen || editingEvent) && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingEvent ? 'Edit Bonus Event' : 'Create Special Bonus Event'}
              </h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingEvent(null);
                }}
                className="text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingEvent ? handleEditSubmit : handleCreateSubmit} className="space-y-3.5 text-xs">
              {/* Event Name */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Event Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g., Paryushan Mahaparva Special Bonus"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              {/* Event Type & Points Value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Event Type</label>
                  <select
                    value={eventForm.eventType}
                    onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Bonus Points <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={eventForm.pointsValue}
                    onChange={(e) => setEventForm({ ...eventForm, pointsValue: parseInt(e.target.value) || 0 })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#163E2B]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Details of activities required to earn this bonus..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              {/* Applicable Levels */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Applicable Pathshala Levels</label>
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {PATHSHALA_LEVELS.map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={eventForm.eligibleLevels.includes(lvl)}
                        onChange={() => handleLevelToggle(lvl)}
                        className="rounded border-stone-300 text-[#163E2B] focus:ring-[#163E2B]"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Applicable Students */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Applicable Students (Optional)</label>
                <input
                  type="text"
                  value={eventForm.applicableStudents}
                  onChange={(e) => setEventForm({ ...eventForm, applicableStudents: e.target.value })}
                  placeholder="e.g., All Enrolled Students or Senior Batch"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={eventForm.startDate}
                    onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={eventForm.endDate}
                    onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Status</label>
                <select
                  value={eventForm.status}
                  onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163E2B] hover:bg-[#0F2D1F] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {editingEvent ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW EVENT DETAILS MODAL */}
      {viewingEvent && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#163E2B] bg-[#163E2B]/10 px-2.5 py-0.5 rounded-full uppercase">
                  {viewingEvent.eventType || 'Bonus Event'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{viewingEvent.title}</h3>
              </div>
              <button onClick={() => setViewingEvent(null)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-slate-500 text-[10px] block">Description:</span>
                <p className="text-slate-900 font-medium leading-relaxed">{viewingEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-slate-500 block text-[10px]">Bonus Points:</span>
                  <strong className="text-amber-900 font-extrabold text-sm">+{viewingEvent.pointsValue} Pts</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Status:</span>
                  <strong className="text-slate-900 font-bold">{viewingEvent.status || 'Active'}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Start Date:</span>
                  <strong className="text-slate-900 font-mono">{viewingEvent.startDate || viewingEvent.eventDate || 'N/A'}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">End Date:</span>
                  <strong className="text-slate-900 font-mono">{viewingEvent.endDate || viewingEvent.eventDate || 'N/A'}</strong>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-slate-500 text-[10px] block">Applicable Levels:</span>
                <strong className="text-slate-900 block">{viewingEvent.eligibleLevels?.join(', ') || 'All Levels'}</strong>
              </div>

              {viewingEvent.applicableStudents && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-slate-500 text-[10px] block">Applicable Students:</span>
                  <strong className="text-slate-900 block">{viewingEvent.applicableStudents}</strong>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setViewingEvent(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AWARD POINTS MODAL */}
      {isAwardModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-slate-900">Award Bonus Points to Student</h3>
              <button onClick={() => setIsAwardModalOpen(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAwardSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.surname} ({s.id}) - Balance: {s.pointsBalance} pts
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Associated Event (Optional)</label>
                <select
                  value={awardEventTitle}
                  onChange={(e) => {
                    setAwardEventTitle(e.target.value);
                    const matchedEvt = activeEventsList.find((ev) => ev.title === e.target.value);
                    if (matchedEvt) {
                      setAwardPoints(matchedEvt.pointsValue);
                      setAwardReason(`Bonus awarded for ${matchedEvt.title}`);
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                >
                  <option value="">Custom Adjustment (No Specific Event)</option>
                  {activeEventsList.map((ev) => (
                    <option key={ev.id} value={ev.title}>
                      {ev.title} (+{ev.pointsValue} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Type</label>
                  <select
                    value={awardType}
                    onChange={(e) => setAwardType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                  >
                    <option value="Credit">Credit (+ Bonus)</option>
                    <option value="Debit">Debit (- Deduction)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Bonus Points</label>
                  <input
                    type="number"
                    required
                    value={awardPoints}
                    onChange={(e) => setAwardPoints(parseInt(e.target.value) || 0)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#163E2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Reason / Particulars</label>
                <textarea
                  rows={2}
                  required
                  value={awardReason}
                  onChange={(e) => setAwardReason(e.target.value)}
                  placeholder="e.g. Winner in Paryushan Essay Contest"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-[#163E2B]"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAwardModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-xl hover:bg-stone-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm Award
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
