import React from 'react';

export const PathshalaLogo = ({ className = "w-full h-full", showText = false }: { className?: string; showText?: boolean }) => (
  <div className={`flex flex-col items-center justify-center text-center rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#163E2B] font-bold p-1.5 select-none ${className}`}>
    <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase opacity-80">Logo Placeholder</span>
    {showText && <span className="text-xs sm:text-sm font-extrabold text-[#163E2B] mt-0.5">Gyan Vatika</span>}
  </div>
);
