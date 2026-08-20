import React from 'react';

interface LevelArtworkProps {
  type: 'bal_shala' | 'kumar_shala' | 'yuva_shala' | 'praudh_shala' | 'tatva_jnana';
  className?: string;
  levelNumber?: string;
}

export const LevelArtwork: React.FC<LevelArtworkProps> = ({
  type,
  className = "w-full h-44",
  levelNumber = "Level 1"
}) => {
  switch (type) {
    case 'bal_shala':
      return (
        <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#F59E0B] flex items-center justify-center ${className}`}>
          {/* Subtle geometric sun rays backdrop */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B45309_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-200/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-amber-400/30 blur-xl pointer-events-none" />

          {/* Illustrated Scene for Level 1 */}
          <svg className="w-full h-full max-h-40 relative z-10 drop-shadow-md" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft Sunrise Arc */}
            <circle cx="200" cy="180" r="110" fill="url(#sunGrad)" opacity="0.35" />
            <circle cx="200" cy="180" r="80" fill="url(#sunGrad2)" opacity="0.45" />

            {/* Temple Shikhar Silhouettes in background */}
            <path d="M70 180 L85 105 L100 180 Z" fill="#D97706" opacity="0.25" />
            <path d="M92 105 L92 90 L95 90 L92 82 L90 90 L92 90 Z" fill="#B45309" opacity="0.4" />
            <path d="M300 180 L315 115 L330 180 Z" fill="#D97706" opacity="0.25" />

            {/* Central Big Open Book */}
            <g transform="translate(140, 65)">
              {/* Book Spine Shadow */}
              <ellipse cx="60" cy="85" rx="55" ry="8" fill="#78350F" opacity="0.25" />
              {/* Left Open Page */}
              <path d="M60 75 C35 72 15 65 5 70 C5 40 10 20 60 25 Z" fill="#FFFDF8" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Right Open Page */}
              <path d="M60 75 C85 72 105 65 115 70 C115 40 110 20 60 25 Z" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Book Spine */}
              <path d="M60 25 L60 76" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
              
              {/* Sacred Symbols on Pages */}
              {/* Left Page: Navkar Mala beads */}
              <circle cx="30" cy="40" r="2.5" fill="#DC2626" />
              <circle cx="40" cy="40" r="2.5" fill="#EA580C" />
              <circle cx="30" cy="50" r="2.5" fill="#D97706" />
              <circle cx="40" cy="50" r="2.5" fill="#16A34A" />
              <line x1="20" y1="58" x2="48" y2="58" stroke="#D97706" strokeWidth="1" strokeDasharray="2 2" />

              {/* Right Page: Little Swastik & Lines */}
              <path d="M85 38 L95 38 M90 33 L90 43 M85 33 L85 38 M95 38 L95 43 M90 33 L95 33 M90 43 L85 43" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="75" y1="50" x2="100" y2="50" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="75" y1="56" x2="95" y2="56" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Sacred Golden Dhvaja (Flag) on Left */}
            <g transform="translate(60, 45)">
              <line x1="15" y1="95" x2="15" y2="10" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="15" cy="8" r="3.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
              {/* Waving Saffron Flag with Sun */}
              <path d="M15 15 Q35 10 50 20 Q35 30 15 28 Z" fill="#DC2626" />
              <circle cx="28" cy="21" r="3" fill="#FDE68A" />
            </g>

            {/* Little Kalash with Coconut on Right */}
            <g transform="translate(290, 75)">
              <ellipse cx="25" cy="45" rx="16" ry="6" fill="#78350F" opacity="0.2" />
              {/* Kalash Pot */}
              <path d="M15 35 Q10 42 25 45 Q40 42 35 35 Q38 25 30 22 L20 22 Q12 25 15 35 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              {/* Mango Leaves */}
              <path d="M18 22 Q12 12 14 6 Q20 14 20 22 Z" fill="#16A34A" />
              <path d="M32 22 Q38 12 36 6 Q30 14 30 22 Z" fill="#16A34A" />
              {/* Coconut */}
              <circle cx="25" cy="18" r="6.5" fill="#92400E" />
              <path d="M25 12 L25 16" stroke="#D97706" strokeWidth="1" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="sunGrad" x1="200" y1="70" x2="200" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFBEB" />
                <stop offset="1" stopColor="#FBBF24" />
              </linearGradient>
              <linearGradient id="sunGrad2" x1="200" y1="100" x2="200" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Level Overlay Badge */}
          <div className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-md text-amber-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{levelNumber}</span>
          </div>
        </div>
      );

    case 'kumar_shala':
      return (
        <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#DBEAFE] via-[#93C5FD] to-[#2563EB] flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-blue-200/50 blur-2xl pointer-events-none" />

          {/* Illustrated Scene for Level 2 (Teen Lok & Ahimsa Hand) */}
          <svg className="w-full h-full max-h-40 relative z-10 drop-shadow-md" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cosmic Aura Circle */}
            <circle cx="200" cy="90" r="70" fill="#60A5FA" opacity="0.3" />
            <circle cx="200" cy="90" r="55" fill="#93C5FD" opacity="0.4" />

            {/* Teen Lok (Three Worlds) Cosmic Outline Silhouette */}
            <path d="M120 160 L140 100 L110 35 L170 35 L140 100 L160 160 Z" fill="#1E3A8A" opacity="0.2" stroke="#1D4ED8" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M280 160 L260 100 L290 35 L230 35 L260 100 L240 160 Z" fill="#1E3A8A" opacity="0.2" stroke="#1D4ED8" strokeWidth="1" strokeDasharray="3 2" />

            {/* Central Sacred Jain Emblem / Ahimsa Hand */}
            <g transform="translate(165, 30)">
              {/* Golden Hand Aura */}
              <rect x="0" y="10" width="70" height="95" rx="35" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
              {/* Ahimsa Wheel in Palm */}
              <circle cx="35" cy="65" r="16" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
              <circle cx="35" cy="65" r="4" fill="#2563EB" />
              {/* Spokes of 24 Tirthankara Wheel */}
              <line x1="35" y1="49" x2="35" y2="81" stroke="#1D4ED8" strokeWidth="1" />
              <line x1="19" y1="65" x2="51" y2="65" stroke="#1D4ED8" strokeWidth="1" />
              <line x1="24" y1="54" x2="46" y2="76" stroke="#1D4ED8" strokeWidth="1" />
              <line x1="24" y1="76" x2="46" y2="54" stroke="#1D4ED8" strokeWidth="1" />

              {/* Swastik & Ratnatraya (Three Dots) on Top */}
              <circle cx="23" cy="26" r="2.5" fill="#DC2626" />
              <circle cx="35" cy="23" r="2.5" fill="#DC2626" />
              <circle cx="47" cy="26" r="2.5" fill="#DC2626" />

              {/* Crescent Moon (Siddha Shila) */}
              <path d="M23 15 Q35 22 47 15 Q35 18 23 15 Z" fill="#2563EB" />
              <circle cx="35" cy="13" r="1.5" fill="#F59E0B" />
            </g>

            {/* Left: Panchrangi 5-Color Striped Flag */}
            <g transform="translate(45, 55)">
              <line x1="10" y1="90" x2="10" y2="10" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="10" cy="8" r="3" fill="#F59E0B" />
              {/* 5 Colored horizontal ribbons */}
              <rect x="10" y="12" width="35" height="5" fill="#DC2626" />
              <rect x="10" y="17" width="35" height="5" fill="#FFFFFF" />
              <rect x="10" y="22" width="35" height="5" fill="#F59E0B" />
              <rect x="10" y="27" width="35" height="5" fill="#2563EB" />
              <rect x="10" y="32" width="35" height="5" fill="#0F172A" />
            </g>

            {/* Right: Golden Sacred Scripture Scroll */}
            <g transform="translate(305, 60)">
              <ellipse cx="25" cy="65" rx="20" ry="6" fill="#1E3A8A" opacity="0.2" />
              <rect x="10" y="20" width="30" height="42" rx="4" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
              <line x1="16" y1="28" x2="34" y2="28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="35" x2="34" y2="35" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="42" x2="34" y2="42" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="49" x2="28" y2="49" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="25" cy="55" r="3" fill="#DC2626" />
            </g>
          </svg>

          <div className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur-md text-blue-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{levelNumber}</span>
          </div>
        </div>
      );

    case 'yuva_shala':
      return (
        <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#D1FAE5] via-[#6EE7B7] to-[#059669] flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#065F46_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-emerald-200/60 blur-2xl pointer-events-none" />

          {/* Illustrated Scene for Level 3 (Samayik, Katasana, Charavalo & Pothi) */}
          <svg className="w-full h-full max-h-40 relative z-10 drop-shadow-md" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Glowing Lotus Meditation Aura */}
            <circle cx="200" cy="85" r="65" fill="#A7F3D0" opacity="0.4" />
            <circle cx="200" cy="85" r="48" fill="#ECFDF5" opacity="0.6" />

            {/* Meditating Figure in White Samayik Robes */}
            <g transform="translate(160, 30)">
              {/* Katasana (Sitting Mat) */}
              <ellipse cx="40" cy="115" rx="55" ry="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
              
              {/* Head & Radiant Tilak Aura */}
              <circle cx="40" cy="35" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
              {/* Muhapatti (White mouth cloth) */}
              <rect x="30" y="38" width="20" height="8" rx="2" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
              <line x1="26" y1="40" x2="30" y2="42" stroke="#059669" strokeWidth="0.8" />
              <line x1="50" y1="42" x2="54" y2="40" stroke="#059669" strokeWidth="0.8" />

              {/* White Draped Body / Shvetambara Dress */}
              <path d="M22 60 Q40 50 58 60 L70 105 Q40 115 10 105 Z" fill="#FFFFFF" stroke="#047857" strokeWidth="1.5" />
              
              {/* Folded Hands with Charavalo in Front */}
              <ellipse cx="40" cy="75" rx="14" ry="7" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
              {/* Charavalo (Soft wool broom handle & white threads) */}
              <line x1="52" y1="65" x2="70" y2="45" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="72" cy="42" rx="7" ry="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            </g>

            {/* Left: Pratikraman Pothi on Sthapnacharyaji Stand */}
            <g transform="translate(60, 60)">
              {/* Wooden Wooden X-Stand */}
              <line x1="15" y1="85" x2="45" y2="45" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="85" x2="15" y2="45" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sacred Pothi / Book open on top */}
              <path d="M12 45 L30 40 L48 45 L30 50 Z" fill="#FFFDF8" stroke="#D97706" strokeWidth="1.5" />
              <path d="M20 38 L25 30 L30 38" stroke="#DC2626" strokeWidth="1" />
            </g>

            {/* Right: Golden Blooming Lotus */}
            <g transform="translate(300, 75)">
              <ellipse cx="25" cy="50" rx="18" ry="6" fill="#064E3B" opacity="0.25" />
              {/* Lotus Petals */}
              <path d="M25 45 C15 35 10 20 25 12 C40 20 35 35 25 45 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
              <path d="M15 42 C6 35 4 22 15 18 C22 25 22 35 15 42 Z" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
              <path d="M35 42 C44 35 46 22 35 18 C28 25 28 35 35 42 Z" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
            </g>
          </svg>

          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{levelNumber}</span>
          </div>
        </div>
      );

    case 'praudh_shala':
      return (
        <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#FFE4E6] via-[#FDA4AF] to-[#E11D48] flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#9F1239_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-rose-200/60 blur-2xl pointer-events-none" />

          {/* Illustrated Scene for Level 4 (Nav Tattva Wheel & Karma Doctrine) */}
          <svg className="w-full h-full max-h-40 relative z-10 drop-shadow-md" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grand Mandala Wheel Aura */}
            <circle cx="200" cy="90" r="70" fill="#FECDD3" opacity="0.4" />
            <circle cx="200" cy="90" r="50" fill="#FFFFFF" opacity="0.6" stroke="#BE123C" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* 9 Tattva Petal Ring */}
            <g transform="translate(200, 90)">
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
                <circle
                  key={i}
                  cx={Math.cos((deg * Math.PI) / 180) * 36}
                  cy={Math.sin((deg * Math.PI) / 180) * 36}
                  r="5"
                  fill="#BE123C"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              ))}
              <circle cx="0" cy="0" r="14" fill="#9F1239" />
              <circle cx="0" cy="0" r="8" fill="#FDE047" />
            </g>

            {/* Left: Ancient Palm Leaf Agam Manuscript */}
            <g transform="translate(50, 65)">
              <rect x="0" y="20" width="60" height="15" rx="3" fill="#FFFDF8" stroke="#9F1239" strokeWidth="1.5" />
              <rect x="5" y="32" width="60" height="15" rx="3" fill="#FEF3C7" stroke="#9F1239" strokeWidth="1.5" />
              <circle cx="35" cy="27" r="2.5" fill="#E11D48" />
              <circle cx="40" cy="39" r="2.5" fill="#E11D48" />
              <line x1="8" y1="27" x2="28" y2="27" stroke="#9F1239" strokeWidth="1" />
              <line x1="42" y1="27" x2="54" y2="27" stroke="#9F1239" strokeWidth="1" />
            </g>

            {/* Right: Golden Balance Scale (Karmic Equilibrium & Nirjara) */}
            <g transform="translate(300, 60)">
              <line x1="25" y1="15" x2="25" y2="70" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="25" x2="45" y2="25" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
              {/* Left Pan */}
              <line x1="8" y1="25" x2="3" y2="45" stroke="#881337" strokeWidth="1" />
              <line x1="8" y1="25" x2="13" y2="45" stroke="#881337" strokeWidth="1" />
              <path d="M0 45 Q8 52 16 45 Z" fill="#FDE047" stroke="#881337" strokeWidth="1" />
              {/* Right Pan */}
              <line x1="42" y1="25" x2="37" y2="45" stroke="#881337" strokeWidth="1" />
              <line x1="42" y1="25" x2="47" y2="45" stroke="#881337" strokeWidth="1" />
              <path d="M34 45 Q42 52 50 45 Z" fill="#FDE047" stroke="#881337" strokeWidth="1" />
            </g>
          </svg>

          <div className="absolute top-3 left-3 bg-rose-950/80 backdrop-blur-md text-rose-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-rose-400/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>{levelNumber}</span>
          </div>
        </div>
      );

    case 'tatva_jnana':
    default:
      return (
        <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#EDE9FE] via-[#C4B5FD] to-[#7C3AED] flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#5B21B6_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-purple-200/60 blur-2xl pointer-events-none" />

          {/* Illustrated Scene for Level 5 (Siddha Shila at Cosmic Apex & Pure Soul) */}
          <svg className="w-full h-full max-h-40 relative z-10 drop-shadow-md" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Supreme Radiant Cosmic Halo */}
            <circle cx="200" cy="95" r="75" fill="#DDD6FE" opacity="0.4" />
            <circle cx="200" cy="95" r="55" fill="#FFFFFF" opacity="0.7" />

            {/* Siddha Shila Crescent at Top */}
            <g transform="translate(140, 20)">
              {/* Crescent Bowl */}
              <path d="M10 35 Q60 55 110 35 Q60 42 10 35 Z" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="1.5" />
              {/* Radiant Siddha Pure Soul Silhouettes */}
              <circle cx="60" cy="22" r="7" fill="#FDE047" stroke="#7C3AED" strokeWidth="1" />
              <path d="M50 32 Q60 27 70 32 Z" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="1" />
              {/* Beams of Infinite Bliss & Omniscience */}
              <line x1="60" y1="5" x2="60" y2="12" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="10" x2="52" y2="16" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="75" y1="10" x2="68" y2="16" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Sacred 14 Gunasthana Stepping Pathway */}
            <g transform="translate(150, 75)">
              <rect x="15" y="55" width="70" height="7" rx="3" fill="#6D28D9" opacity="0.9" />
              <rect x="22" y="44" width="56" height="7" rx="3" fill="#7C3AED" opacity="0.9" />
              <rect x="30" y="33" width="40" height="7" rx="3" fill="#8B5CF6" opacity="0.9" />
              <rect x="38" y="22" width="24" height="7" rx="3" fill="#A78BFA" opacity="0.9" />
              <circle cx="50" cy="14" r="3.5" fill="#FDE047" />
            </g>

            {/* Left: Tattvartha Sutra Grantha Scroll */}
            <g transform="translate(45, 65)">
              <rect x="5" y="15" width="45" height="50" rx="4" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="1.5" />
              <line x1="12" y1="25" x2="38" y2="25" stroke="#7C3AED" strokeWidth="1.5" />
              <line x1="12" y1="32" x2="42" y2="32" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="12" y1="39" x2="42" y2="39" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="12" y1="46" x2="35" y2="46" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx="27" cy="55" r="3" fill="#7C3AED" />
            </g>

            {/* Right: Blooming Sahasrara Lotus */}
            <g transform="translate(305, 65)">
              <ellipse cx="25" cy="50" rx="18" ry="6" fill="#4C1D95" opacity="0.25" />
              <path d="M25 45 C15 32 12 18 25 10 C38 18 35 32 25 45 Z" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1" />
              <path d="M14 42 C6 33 5 20 16 16 C23 23 23 34 14 42 Z" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1" />
              <path d="M36 42 C44 33 45 20 34 16 C27 23 27 34 36 42 Z" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1" />
              <circle cx="25" cy="24" r="3.5" fill="#FDE047" />
            </g>
          </svg>

          <div className="absolute top-3 left-3 bg-purple-950/80 backdrop-blur-md text-purple-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-purple-400/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>{levelNumber}</span>
          </div>
        </div>
      );
  }
};
