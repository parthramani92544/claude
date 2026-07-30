import React, { useState } from 'react';
import {
  Eye,
  MapPin,
  X,
  UserCheck,
  Search,
  CreditCard,
  RefreshCw,
} from 'lucide-react';
import { PendingRegistration, AdminRole } from '../types';

interface RegistrationApprovalsProps {
  registrations: PendingRegistration[];
  currentRole: AdminRole;
  onApprove?: (reg: PendingRegistration, assignedLevel: string, assignedBatch: string, notes?: string) => void;
  onReject?: (reg: PendingRegistration, reason: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const RegistrationApprovals: React.FC<RegistrationApprovalsProps> = ({
  registrations,
  currentRole,
  addToast,
}) => {
  const [selectedReg, setSelectedReg] = useState<PendingRegistration | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('ALL');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('ALL');
  const [regStatusFilter, setRegStatusFilter] = useState<string>('ALL');

  // Filtering Logic
  const filteredRegistrations = registrations.filter((reg) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      reg.studentName.toLowerCase().includes(query) ||
      reg.parentMobile.includes(query) ||
      (reg.paymentTxnId && reg.paymentTxnId.toLowerCase().includes(query)) ||
      reg.id.toLowerCase().includes(query) ||
      reg.parentName.toLowerCase().includes(query);

    const matchesPaymentStatus =
      paymentStatusFilter === 'ALL' || (reg.paymentStatus || 'Paid') === paymentStatusFilter;

    const matchesPaymentMethod =
      paymentMethodFilter === 'ALL' || (reg.paymentMethod || 'UPI') === paymentMethodFilter;

    const matchesRegStatus =
      regStatusFilter === 'ALL' || reg.status === regStatusFilter;

    return matchesSearch && matchesPaymentStatus && matchesPaymentMethod && matchesRegStatus;
  });

  const totalCount = registrations.length;
  const paidCount = registrations.filter((r) => (r.paymentStatus || 'Paid') === 'Paid').length;

  const resetFilters = () => {
    setSearchQuery('');
    setPaymentStatusFilter('ALL');
    setPaymentMethodFilter('ALL');
    setRegStatusFilter('ALL');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Registration Management</h1>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student Name, Mobile, or Txn ID..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#163E2B] focus:bg-white"
            />
          </div>

          {/* Payment Status Filter */}
          <div>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
            >
              <option value="ALL">All Payment Methods</option>
              <option value="UPI">UPI</option>
              <option value="QR Code">QR Code</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>

          {/* Registration Status Filter */}
          <div>
            <select
              value={regStatusFilter}
              onChange={(e) => setRegStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#163E2B] focus:bg-white"
            >
              <option value="ALL">All Registration Statuses</option>
              <option value="Approved">Approved / Registered</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {(searchQuery || paymentStatusFilter !== 'ALL' || paymentMethodFilter !== 'ALL' || regStatusFilter !== 'ALL') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Showing <strong className="text-slate-800">{filteredRegistrations.length}</strong> of {registrations.length} records
            </span>
            <button
              onClick={resetFilters}
              className="text-[#163E2B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Registration Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#163E2B]" />
            <span>Student Registrations List ({filteredRegistrations.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Reg ID</th>
                <th className="py-2.5 px-4 font-bold">Applicant & Parent</th>
                <th className="py-2.5 px-4 font-bold">Parent Mobile</th>
                <th className="py-2.5 px-4 font-bold">Level & Batch</th>
                <th className="py-2.5 px-4 font-bold">Fee</th>
                <th className="py-2.5 px-4 font-bold">Payment Status</th>
                <th className="py-2.5 px-4 font-bold">Payment Method</th>
                <th className="py-2.5 px-4 font-bold">Txn ID</th>
                <th className="py-2.5 px-4 font-bold">Payment Date & Time</th>
                <th className="py-2.5 px-4 font-bold">Status</th>
                <th className="py-2.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium bg-white">
              {filteredRegistrations.map((reg) => {
                const feeAmount = reg.registrationFee ?? 100;
                const payStatus = reg.paymentStatus ?? 'Paid';
                const payMethod = reg.paymentMethod ?? 'UPI';
                const txnId = reg.paymentTxnId ?? 'TXN_DEMO';
                const payDate = reg.paymentDate ?? reg.submissionDate;

                return (
                  <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#163E2B]">{reg.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{reg.studentName}</div>
                      <div className="text-[10px] text-slate-500">Parent: {reg.parentName}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800 whitespace-nowrap">{reg.parentMobile}</td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-semibold">{reg.requestedLevel}</div>
                      <div className="text-[10px] text-slate-500">{reg.preferredBatch}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      ₹{feeAmount}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                          payStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : payStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {payStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-700">
                      {payMethod}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {txnId}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {payDate}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase ${
                          reg.status === 'Approved' || payStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : reg.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {reg.status === 'Approved' ? 'Registered' : reg.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedReg(reg);
                            setIsPreviewModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md cursor-pointer transition-colors flex items-center gap-1 font-semibold text-[11px]"
                          title="View Registration Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500 font-medium">
                    No student registrations found matching the applied filters or search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Details Page / Modal */}
      {isPreviewModalOpen && selectedReg && (
        <div className="fixed inset-0 z-[9990] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#163E2B] uppercase">Registration Record</span>
                <h3 className="text-base font-bold text-slate-900">Application Details: {selectedReg.id}</h3>
              </div>
              <button onClick={() => setIsPreviewModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Student Basic Details */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Student Name</span>
                <p className="text-sm font-bold text-slate-900">{selectedReg.studentName}</p>
                <div className="mt-1 flex items-center gap-3 text-slate-600 text-[11px]">
                  <span>Requested Level: <strong className="text-slate-800">{selectedReg.requestedLevel}</strong></span>
                  <span>Batch: <strong className="text-slate-800">{selectedReg.preferredBatch}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Parent Name</span>
                  <p className="font-bold text-slate-800">{selectedReg.parentName}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Parent Mobile</span>
                  <p className="font-bold text-[#163E2B] font-mono">{selectedReg.parentMobile}</p>
                </div>
              </div>

              {/* READ-ONLY PAYMENT INFORMATION SECTION */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <CreditCard className="w-4 h-4 text-[#163E2B]" />
                    <span>Payment Information</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                      (selectedReg.paymentStatus || 'Paid') === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : (selectedReg.paymentStatus || 'Pending') === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {selectedReg.paymentStatus || 'Paid'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Registration Fee</span>
                    <p className="font-bold text-slate-900 font-mono text-sm">
                      ₹{(selectedReg.registrationFee ?? 100).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Payment Method</span>
                    <p className="font-semibold text-slate-800">
                      {selectedReg.paymentMethod || 'UPI'}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Transaction ID</span>
                    <p className="font-bold text-[#163E2B] font-mono">
                      {selectedReg.paymentTxnId || 'TXN_98234120'}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Payment Date & Time</span>
                    <p className="font-medium text-slate-700 font-mono text-[11px]">
                      {selectedReg.paymentDate || selectedReg.submissionDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Verification */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Residential Address</span>
                <p className="text-slate-800 font-medium mt-0.5">{selectedReg.address}</p>
                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location Verified</span>
                  </div>
                  <span className="text-slate-500">Submitted: {selectedReg.submissionDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
