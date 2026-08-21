import React from 'react';

interface PathshalaLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
  subtextClassName?: string;
}

export const PathshalaLogo: React.FC<PathshalaLogoProps> = ({
  className = "w-10 h-10",
  size,
  showText = false,
  textClassName = "text-base font-black text-[#163E2B] tracking-tight font-serif",
  subtextClassName = "text-[10px] font-bold text-[#C5A059] tracking-wider uppercase"
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${showText ? '' : ''}`}>
      <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={style}>
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Circular Gradient (Gold to Deep Green) */}
            <linearGradient id="logoRingGrad" x1="50" y1="50" x2="450" y2="450" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C5A059" />
              <stop offset="45%" stopColor="#8A6D2C" />
              <stop offset="70%" stopColor="#2D5A27" />
              <stop offset="100%" stopColor="#163E2B" />
            </linearGradient>

            {/* Gold Metallic Foil Gradient */}
            <linearGradient id="logoGoldGrad" x1="150" y1="100" x2="350" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EAD292" />
              <stop offset="35%" stopColor="#C5A059" />
              <stop offset="70%" stopColor="#A47E28" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>

            {/* Tree Leaf Green Gradient */}
            <linearGradient id="logoLeafGrad" x1="200" y1="120" x2="300" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4A7C3B" />
              <stop offset="50%" stopColor="#2E632D" />
              <stop offset="100%" stopColor="#163E2B" />
            </linearGradient>

            {/* Dark Book Base Gradient */}
            <linearGradient id="logoBookGrad" x1="250" y1="280" x2="250" y2="360" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C4B33" />
              <stop offset="100%" stopColor="#0F2B1D" />
            </linearGradient>

            {/* Subtle Drop Shadow */}
            <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 1. Outer Circular Ring Frame */}
          <circle
            cx="250"
            cy="250"
            r="228"
            stroke="url(#logoRingGrad)"
            strokeWidth="8.5"
            fill="#FFFFFF"
          />

          {/* 2. Golden Concentric Orbital Knowledge & Digital Circuitry Arcs */}
          {/* Outer Arc Left & Right */}
          <path
            d="M 135 220 A 155 155 0 0 1 365 220"
            stroke="url(#logoGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Middle Arc */}
          <path
            d="M 160 250 A 130 130 0 0 1 340 250"
            stroke="url(#logoGoldGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Top Arc Connectors */}
          <path
            d="M 185 140 A 110 110 0 0 1 315 140"
            stroke="url(#logoGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Circuitry Connectors & Node Dots */}
          {/* Top Center Node */}
          <line x1="250" y1="85" x2="250" y2="135" stroke="url(#logoGoldGrad)" strokeWidth="3" />
          <circle cx="250" cy="85" r="7.5" fill="url(#logoGoldGrad)" />
          <circle cx="250" cy="135" r="5" fill="#FFFFFF" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />

          {/* Upper Left Nodes */}
          <line x1="180" y1="120" x2="165" y2="145" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="180" cy="120" r="6" fill="url(#logoGoldGrad)" />
          <circle cx="140" cy="155" r="7.5" fill="url(#logoGoldGrad)" />
          <circle cx="128" cy="225" r="8" fill="#163E2B" stroke="url(#logoGoldGrad)" strokeWidth="2" />
          <line x1="165" y1="180" x2="185" y2="185" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="165" cy="180" r="5" fill="url(#logoGoldGrad)" />
          <line x1="188" y1="265" x2="198" y2="280" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="170" cy="290" r="7" fill="#163E2B" />

          {/* Upper Right Nodes */}
          <line x1="320" y1="120" x2="335" y2="145" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="320" cy="120" r="6" fill="url(#logoGoldGrad)" />
          <circle cx="360" cy="155" r="7.5" fill="url(#logoGoldGrad)" />
          <circle cx="372" cy="225" r="8" fill="#163E2B" stroke="url(#logoGoldGrad)" strokeWidth="2" />
          <line x1="335" y1="180" x2="315" y2="185" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="335" cy="180" r="5" fill="url(#logoGoldGrad)" />
          <line x1="312" y1="265" x2="302" y2="280" stroke="url(#logoGoldGrad)" strokeWidth="2.5" />
          <circle cx="330" cy="290" r="7" fill="#163E2B" />

          {/* 3. Open Book Base (Agam Grantha) */}
          <g filter="url(#logoShadow)">
            {/* Open Book Pages Left */}
            <path
              d="M 250 350 C 205 348 160 338 125 344 C 145 325 195 310 248 318 Z"
              fill="url(#logoBookGrad)"
            />
            <path
              d="M 248 318 C 195 310 155 320 135 328 C 160 310 210 298 248 304 Z"
              fill="#FFFFFF"
              stroke="#163E2B"
              strokeWidth="3.5"
            />
            {/* Open Book Pages Right */}
            <path
              d="M 250 350 C 295 348 340 338 375 344 C 355 325 305 310 252 318 Z"
              fill="url(#logoBookGrad)"
            />
            <path
              d="M 252 318 C 305 310 345 320 365 328 C 340 310 290 298 252 304 Z"
              fill="#FFFFFF"
              stroke="#163E2B"
              strokeWidth="3.5"
            />
            {/* Center Book Spine Under Nib */}
            <path
              d="M 235 352 C 245 358 255 358 265 352 L 250 338 Z"
              fill="#163E2B"
            />
          </g>

          {/* 4. Center Trunk: Fountain Pen Nib in Antique Gold */}
          <g id="pen-nib">
            {/* Golden Nib Body */}
            <path
              d="M 250 240 L 268 288 C 265 312 258 335 250 348 C 242 335 235 312 232 288 Z"
              fill="url(#logoGoldGrad)"
              stroke="#8A6D2C"
              strokeWidth="1.5"
            />
            {/* Nib Slit Line & Breather Hole */}
            <line x1="250" y1="240" x2="250" y2="292" stroke="#163E2B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="250" cy="292" r="3.5" fill="#163E2B" />
          </g>

          {/* 5. Tree of Knowledge Trunk & Graceful Curving Branches */}
          <g id="tree-branches" fill="none" stroke="url(#logoLeafGrad)" strokeLinecap="round">
            {/* Left Main Trunk Branch */}
            <path
              d="M 235 345 C 220 305 210 260 220 220 C 225 200 215 175 190 170"
              strokeWidth="8"
            />
            <path
              d="M 220 220 C 195 215 175 225 160 238"
              strokeWidth="5"
            />
            <path
              d="M 228 190 C 220 165 225 145 225 130"
              strokeWidth="4.5"
            />

            {/* Right Main Trunk Branch */}
            <path
              d="M 265 345 C 280 305 290 260 280 220 C 275 200 285 175 310 170"
              strokeWidth="8"
            />
            <path
              d="M 280 220 C 305 215 325 225 340 238"
              strokeWidth="5"
            />
            <path
              d="M 272 190 C 280 165 275 145 275 130"
              strokeWidth="4.5"
            />

            {/* Center Top Branch */}
            <path
              d="M 250 240 C 248 195 245 160 250 135"
              strokeWidth="6"
            />
          </g>

          {/* 6. Lush Foliage Leaves */}
          <g id="tree-leaves" fill="url(#logoLeafGrad)">
            {/* Center Top Leaves */}
            <path d="M 250 132 C 240 150 240 170 250 180 C 260 170 260 150 250 132 Z" />
            <path d="M 230 135 C 215 145 210 165 225 178 C 235 165 238 145 230 135 Z" />
            <path d="M 270 135 C 285 145 290 165 275 178 C 265 165 262 145 270 135 Z" />

            {/* Upper Left Leaves */}
            <path d="M 190 148 C 172 155 165 172 178 188 C 190 175 195 160 190 148 Z" />
            <path d="M 168 190 C 150 200 145 218 160 230 C 172 218 175 202 168 190 Z" />
            <path d="M 188 230 C 170 242 170 258 190 262 C 200 248 200 238 188 230 Z" />

            {/* Upper Right Leaves */}
            <path d="M 310 148 C 328 155 335 172 322 188 C 310 175 305 160 310 148 Z" />
            <path d="M 332 190 C 350 200 355 218 340 230 C 328 218 325 202 332 190 Z" />
            <path d="M 312 230 C 330 242 330 258 310 262 C 300 248 300 238 312 230 Z" />

            {/* Inner Middle Canopy Leaves */}
            <path d="M 215 175 C 200 188 200 205 218 212 C 228 200 225 185 215 175 Z" />
            <path d="M 285 175 C 300 188 300 205 282 212 C 272 200 275 185 285 175 Z" />
          </g>

          {/* 7. Bottom Elegant Gold Divider & 3 Leaves Motif */}
          <g id="bottom-motif">
            {/* Symmetrical Gold Divider Line */}
            <line x1="155" y1="368" x2="238" y2="368" stroke="url(#logoGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="250" cy="368" r="6" fill="url(#logoGoldGrad)" />
            <line x1="262" y1="368" x2="345" y2="368" stroke="url(#logoGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />

            {/* 3 Green Petal Leaves Below Divider */}
            {/* Center Leaf */}
            <path
              d="M 250 380 C 242 395 242 410 250 422 C 258 410 258 395 250 380 Z"
              fill="url(#logoLeafGrad)"
            />
            {/* Left Leaf */}
            <path
              d="M 235 385 C 218 382 205 392 212 402 C 225 405 235 398 235 385 Z"
              fill="url(#logoLeafGrad)"
            />
            {/* Right Leaf */}
            <path
              d="M 265 385 C 282 382 295 392 288 402 C 275 405 265 398 265 385 Z"
              fill="url(#logoLeafGrad)"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={textClassName}>Khartargach E-Pathshala</span>
          <span className={subtextClassName}>Shraman Sahitya Vidyapeeth</span>
        </div>
      )}
    </div>
  );
};
