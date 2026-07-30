import React from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  username: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, username, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-800/60 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Confirm Logout</h3>
            <p className="text-xs text-slate-400 mt-0.5">End active administrative session</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          Are you sure you want to log out, <strong className="text-white">{username}</strong>? Unsaved form drafts will be discarded.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-950/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Confirm Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
