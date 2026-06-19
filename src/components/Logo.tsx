import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export default function Logo({ className = "", size = "100%" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Soft sky-blue gradient for top portion */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4fc3f7" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>

        {/* Dynamic bright sunset orange gradient for bottom curve */}
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Deep navy blue shadow gradient for the base */}
        <linearGradient id="navyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a122c" />
        </linearGradient>

        {/* Globe Circular Clipping Mask */}
        <clipPath id="globeClip">
          <circle cx="216" cy="256" r="170" />
        </clipPath>
      </defs>

      {/* Main Globe Group (Clipped to a circle) */}
      <g clipPath="url(#globeClip)">
        {/* UPPER PORTION: Sky Blue & Clouds */}
        <rect x="30" y="70" width="372" height="220" fill="url(#skyGradient)" />
        
        {/* Cloud details cutting into the sky blue */}
        <path
          d="M 120 180 Q 180 150 240 180 T 360 170 Q 380 200 350 230 H 70 Q 70 210 120 180 Z"
          fill="#e0f2fe"
          opacity="0.8"
        />
        <path
          d="M 216 220 Q 280 190 340 220 T 400 230 L 400 270 L 100 270 Q 150 240 216 220 Z"
          fill="#ffffff"
        />

        {/* BOTTOM PORTION: Sunset Orange Ring */}
        <ellipse cx="216" cy="350" rx="170" ry="110" fill="url(#orangeGradient)" />

        {/* DEEPER PORTION: Midnight Navy Base Crescent */}
        <ellipse cx="216" cy="385" rx="160" ry="70" fill="url(#navyGradient)" />
      </g>

      {/* SWOOSH TRAIL: Arching from left to right, splitting the globe and connecting to the plane */}
      {/* Starting thin on left, getting thick in center and connecting to the right-wing jet */}
      <path
        d="M 60 250 Q 140 370 360 250"
        fill="none"
        stroke="#1e293b"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 52 244 Q 130 360 364 246"
        fill="none"
        stroke="#1e1b4b"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 50 242 Q 130 365 368 250"
        fill="none"
        stroke="#2e3856"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* JET PLAN SILHOUETTE (Deep navy/black body, angled upward and to the right) */}
      {/* Positioned nicely around (395, 203) with precise wings, tail, engine shapes */}
      <g transform="translate(355, 125) rotate(42)">
        {/* Airplane Path */}
        <path
          d="M 70 0 
             C 75 -2, 90 -4, 105 -2 
             C 112 -1, 118 1, 122 4 
             L 125 5
             L 121 7
             C 114 9, 108 10, 95 10
             C 85 10, 75 8, 70 6
             L 50 25
             L 42 25
             L 54 6
             L 28 6
             L 18 14
             L 12 14
             L 18 5
             L 12 -4
             L 18 -4
             L 28 2
             L 54 2
             L 42 -17
             L 50 -17
             Z"
          fill="#111827"
        />
        {/* Soft highlight/accent on the plane top */}
        <path
          d="M 72 1 C 85 -1, 100 0, 115 3 L 118 4 C 110 5, 95 4, 72 3 Z"
          fill="#38bdf8"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}
