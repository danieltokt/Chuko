export default function GameBackground({ variant = "menu" }: { variant?: "menu" | "game" }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5DADE2" />
          <stop offset="40%" stopColor="#85C1E9" />
          <stop offset="70%" stopColor="#AED6F1" />
          <stop offset="100%" stopColor="#D5F4E6" />
        </linearGradient>

        {/* Mountain gradients */}
        <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E8E8E8" />
          <stop offset="50%" stopColor="#8B9DC3" />
          <stop offset="100%" stopColor="#6B7AA1" />
        </linearGradient>
        <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#D0D0D0" />
          <stop offset="50%" stopColor="#7B8BA8" />
          <stop offset="100%" stopColor="#5A6A88" />
        </linearGradient>
        <linearGradient id="mountain3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8C6D0" />
          <stop offset="50%" stopColor="#8FA5B5" />
          <stop offset="100%" stopColor="#6A8090" />
        </linearGradient>

        {/* Grass gradients */}
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8BC34A" />
          <stop offset="50%" stopColor="#689F38" />
          <stop offset="100%" stopColor="#558B2F" />
        </linearGradient>

        <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9CCC65" />
          <stop offset="100%" stopColor="#7CB342" />
        </linearGradient>

        <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="100%" stopColor="#558B2F" />
        </linearGradient>

        {/* Yurt gradients */}
        <linearGradient id="yurtWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8DCC8" />
          <stop offset="30%" stopColor="#FFF8E7" />
          <stop offset="70%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#D4C4A8" />
        </linearGradient>

        <radialGradient id="yurtRoof" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="50%" stopColor="#C9956C" />
          <stop offset="100%" stopColor="#A67B5B" />
        </radialGradient>

        <linearGradient id="yurtDoor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        {/* Rock gradient */}
        <linearGradient id="rockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B8B8B" />
          <stop offset="50%" stopColor="#6B6B6B" />
          <stop offset="100%" stopColor="#505050" />
        </linearGradient>

        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="50%" stopColor="#FFF176" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFEB3B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#skyGradient)" />

      {/* Sun */}
      <circle cx="1600" cy="150" r="200" fill="url(#sunGlow)" />
      <circle cx="1600" cy="150" r="60" fill="#FFF9C4" />

      {/* Clouds - fluffy and realistic */}
      <g className="clouds">
        {/* Cloud 1 - large left */}
        <g transform="translate(150, 100)">
          <ellipse cx="0" cy="0" rx="80" ry="35" fill="white" opacity="0.95" />
          <ellipse cx="60" cy="-10" rx="70" ry="40" fill="white" opacity="0.95" />
          <ellipse cx="120" cy="0" rx="60" ry="30" fill="white" opacity="0.95" />
          <ellipse cx="50" cy="15" rx="50" ry="25" fill="white" opacity="0.9" />
        </g>

        {/* Cloud 2 - medium center-left */}
        <g transform="translate(500, 60)">
          <ellipse cx="0" cy="0" rx="60" ry="28" fill="white" opacity="0.9" />
          <ellipse cx="50" cy="-8" rx="55" ry="32" fill="white" opacity="0.9" />
          <ellipse cx="100" cy="0" rx="50" ry="25" fill="white" opacity="0.9" />
          <ellipse cx="45" cy="12" rx="40" ry="20" fill="white" opacity="0.85" />
        </g>

        {/* Cloud 3 - large center */}
        <g transform="translate(900, 90)">
          <ellipse cx="0" cy="0" rx="90" ry="40" fill="white" opacity="0.92" />
          <ellipse cx="70" cy="-15" rx="80" ry="45" fill="white" opacity="0.92" />
          <ellipse cx="150" cy="-5" rx="70" ry="35" fill="white" opacity="0.92" />
          <ellipse cx="60" cy="18" rx="55" ry="28" fill="white" opacity="0.88" />
        </g>

        {/* Cloud 4 - right side */}
        <g transform="translate(1400, 130)">
          <ellipse cx="0" cy="0" rx="70" ry="32" fill="white" opacity="0.85" />
          <ellipse cx="55" cy="-10" rx="60" ry="35" fill="white" opacity="0.85" />
          <ellipse cx="110" cy="0" rx="55" ry="28" fill="white" opacity="0.85" />
          <ellipse cx="50" cy="14" rx="45" ry="22" fill="white" opacity="0.8" />
        </g>

        {/* Small clouds */}
        <ellipse cx="350" cy="180" rx="40" ry="18" fill="white" opacity="0.7" />
        <ellipse cx="1700" cy="200" rx="50" ry="22" fill="white" opacity="0.7" />
      </g>

      {/* Far mountains - misty */}
      <path
        d="M-100 550 L100 320 L250 420 L400 280 L550 380 L700 250 L900 400 L1050 300 L1200 380 L1400 220 L1550 350 L1750 280 L1920 380 L2020 550 Z"
        fill="url(#mountain3)"
        opacity="0.4"
      />

      {/* Middle mountains - left peak with snow */}
      <path
        d="M-50 620 L180 300 L280 380 L380 320 L500 450 L650 620 Z"
        fill="url(#mountain2)"
      />
      <path
        d="M180 300 L220 340 L200 360 L170 350 L140 380 L160 340 Z"
        fill="white"
        opacity="0.95"
      />

      {/* Middle mountains - center tall peak */}
      <path
        d="M450 620 L700 200 L800 300 L900 240 L1000 350 L1100 620 Z"
        fill="url(#mountain1)"
      />
      <path
        d="M700 200 L760 270 L740 300 L700 280 L660 310 L680 260 Z"
        fill="white"
        opacity="0.98"
      />

      {/* Middle mountains - right peak */}
      <path
        d="M950 620 L1200 320 L1320 400 L1450 280 L1550 380 L1700 350 L1800 620 Z"
        fill="url(#mountain2)"
      />
      <path
        d="M1200 320 L1250 370 L1230 395 L1190 375 L1160 410 L1180 360 Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M1450 280 L1490 330 L1470 355 L1440 340 L1410 370 L1430 320 Z"
        fill="white"
        opacity="0.9"
      />

      {/* Valley river hint */}
      <path
        d="M350 580 Q550 540 750 560 Q950 580 1150 550 Q1350 520 1550 560"
        stroke="#7EC8E3"
        strokeWidth="20"
        fill="none"
        opacity="0.25"
      />

      {/* Rolling hills - back layer */}
      <ellipse cx="200" cy="720" rx="350" ry="140" fill="url(#hillGradient1)" />
      <ellipse cx="650" cy="700" rx="400" ry="160" fill="#8BC34A" />
      <ellipse cx="1100" cy="710" rx="380" ry="150" fill="url(#hillGradient1)" />
      <ellipse cx="1550" cy="720" rx="400" ry="145" fill="#8BC34A" />

      {/* Rolling hills - front layer */}
      <ellipse cx="100" cy="850" rx="300" ry="180" fill="url(#hillGradient2)" />
      <ellipse cx="500" cy="880" rx="380" ry="200" fill="#689F38" />
      <ellipse cx="950" cy="860" rx="400" ry="190" fill="url(#hillGradient2)" />
      <ellipse cx="1400" cy="870" rx="380" ry="195" fill="#689F38" />
      <ellipse cx="1800" cy="880" rx="300" ry="180" fill="url(#hillGradient2)" />

      {/* Ground base */}
      <rect x="0" y="900" width="1920" height="180" fill="url(#grassGradient)" />

      {variant === "menu" && (
        <>
          {/* Small yurt - far left background */}
          <g transform="translate(550, 620) scale(0.4)">
            {/* Base shadow */}
            <ellipse cx="0" cy="130" rx="110" ry="30" fill="rgba(0,0,0,0.2)" />
            
            {/* Yurt wall */}
            <path d="M-100 130 L-100 40 Q-50 15 0 0 Q50 15 100 40 L100 130 Z" fill="url(#yurtWall)" />
            <path d="M-100 130 L-100 40 Q-50 15 0 0 Q50 15 100 40 L100 130 Z" stroke="#B8A082" strokeWidth="2" fill="none" />
            
            {/* Decorative band */}
            <rect x="-95" y="25" width="190" height="20" fill="#B22222" opacity="0.8" rx="2" />
            <path d="M-85 30 L-65 40 L-45 30 L-25 40 L-5 30 L15 40 L35 30 L55 40 L75 30 L95 40" stroke="#FFD700" strokeWidth="2" fill="none" />
            
            {/* Lattice pattern */}
            <g stroke="rgba(139, 115, 85, 0.4)" strokeWidth="1">
              <path d="M-80 50 L-60 120" />
              <path d="M-60 50 L-80 120" />
              <path d="M-50 50 L-30 120" />
              <path d="M-30 50 L-50 120" />
              <path d="M30 50 L50 120" />
              <path d="M50 50 L30 120" />
              <path d="M60 50 L80 120" />
              <path d="M80 50 L60 120" />
            </g>
            
            {/* Roof */}
            <path d="M-100 40 Q-100 -30 0 -60 Q100 -30 100 40 Q50 25 0 0 Q-50 25 -100 40 Z" fill="url(#yurtRoof)" />
            <path d="M-100 40 Q-100 -30 0 -60 Q100 -30 100 40" stroke="#8B6914" strokeWidth="2" fill="none" />
            
            {/* Tunduk (crown) */}
            <ellipse cx="0" cy="-55" rx="30" ry="12" fill="#CD853F" />
            <ellipse cx="0" cy="-55" rx="30" ry="12" stroke="#8B4513" strokeWidth="2" fill="none" />
            
            {/* Door */}
            <rect x="-18" y="60" width="36" height="70" fill="url(#yurtDoor)" rx="5" />
            <rect x="-20" y="58" width="40" height="72" stroke="#CD853F" strokeWidth="3" fill="none" rx="6" />
          </g>

          {/* Main large yurt - right side */}
          <g transform="translate(1420, 540) scale(0.85)">
            {/* Base shadow */}
            <ellipse cx="0" cy="165" rx="160" ry="45" fill="rgba(0,0,0,0.25)" />
            
            {/* Yurt wall - cream/white felt */}
            <path d="M-140 160 L-140 55 Q-70 20 0 0 Q70 20 140 55 L140 160 Z" fill="url(#yurtWall)" />
            <path d="M-140 160 L-140 55 Q-70 20 0 0 Q70 20 140 55 L140 160 Z" stroke="#B8A082" strokeWidth="3" fill="none" />
            
            {/* Red decorative band with Kyrgyz pattern */}
            <rect x="-135" y="35" width="270" height="28" fill="#B22222" rx="3" />
            {/* Pattern - traditional Kyrgyz ornament */}
            <g stroke="#FFD700" strokeWidth="2.5" fill="none">
              <path d="M-125 42 L-100 58 L-75 42 L-50 58 L-25 42 L0 58 L25 42 L50 58 L75 42 L100 58 L125 42" />
              {/* Small diamonds */}
              <path d="M-112 50 L-106 55 L-112 60 L-118 55 Z" fill="#FFD700" />
              <path d="M-62 50 L-56 55 L-62 60 L-68 55 Z" fill="#FFD700" />
              <path d="M-12 50 L-6 55 L-12 60 L-18 55 Z" fill="#FFD700" />
              <path d="M38 50 L44 55 L38 60 L32 55 Z" fill="#FFD700" />
              <path d="M88 50 L94 55 L88 60 L82 55 Z" fill="#FFD700" />
            </g>
            
            {/* Lattice pattern (kerege) on walls */}
            <g stroke="rgba(139, 115, 85, 0.35)" strokeWidth="1.5">
              <path d="M-120 70 L-95 150" />
              <path d="M-95 70 L-120 150" />
              <path d="M-85 70 L-60 150" />
              <path d="M-60 70 L-85 150" />
              <path d="M-50 70 L-25 150" />
              <path d="M-25 70 L-50 150" />
              <path d="M60 70 L85 150" />
              <path d="M85 70 L60 150" />
              <path d="M95 70 L120 150" />
              <path d="M120 70 L95 150" />
            </g>
            
            {/* Roof dome */}
            <path d="M-140 55 Q-140 -35 0 -80 Q140 -35 140 55 Q70 35 0 0 Q-70 35 -140 55 Z" fill="url(#yurtRoof)" />
            <path d="M-140 55 Q-140 -35 0 -80 Q140 -35 140 55" stroke="#8B6914" strokeWidth="3" fill="none" />
            
            {/* Roof poles hint */}
            <g stroke="rgba(139, 90, 43, 0.3)" strokeWidth="1">
              <path d="M0 -75 L0 -5" />
              <path d="M-40 -65 L-30 -10" />
              <path d="M40 -65 L30 -10" />
              <path d="M-70 -50 L-55 -5" />
              <path d="M70 -50 L55 -5" />
            </g>
            
            {/* Tunduk (crown/smoke hole) - detailed */}
            <ellipse cx="0" cy="-75" rx="45" ry="18" fill="#CD853F" />
            <ellipse cx="0" cy="-75" rx="45" ry="18" stroke="#8B4513" strokeWidth="2.5" fill="none" />
            <ellipse cx="0" cy="-75" rx="30" ry="12" fill="#A0522D" />
            {/* Tunduk cross pattern */}
            <g stroke="#8B4513" strokeWidth="1.5">
              <line x1="0" y1="-85" x2="0" y2="-65" />
              <line x1="-35" y1="-75" x2="35" y2="-75" />
              <line x1="-25" y1="-83" x2="25" y2="-67" />
              <line x1="25" y1="-83" x2="-25" y2="-67" />
            </g>
            
            {/* Door with frame */}
            <rect x="-28" y="75" width="56" height="85" fill="url(#yurtDoor)" rx="8" />
            <rect x="-32" y="72" width="64" height="88" stroke="#CD853F" strokeWidth="4" fill="none" rx="10" />
            {/* Door inner frame */}
            <rect x="-24" y="80" width="48" height="75" stroke="#8B4513" strokeWidth="2" fill="none" rx="5" />
            {/* Door decoration */}
            <circle cx="18" cy="118" r="4" fill="#CD853F" />
          </g>

          {/* Medium yurt - behind main one */}
          <g transform="translate(1150, 590) scale(0.5)">
            <ellipse cx="0" cy="130" rx="100" ry="28" fill="rgba(0,0,0,0.2)" />
            <path d="M-90 125 L-90 45 Q-45 18 0 3 Q45 18 90 45 L90 125 Z" fill="url(#yurtWall)" />
            <rect x="-85" y="30" width="170" height="18" fill="#B22222" opacity="0.75" rx="2" />
            <path d="M-75 35 L-55 43 L-35 35 L-15 43 L5 35 L25 43 L45 35 L65 43 L85 35" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M-90 45 Q-90 -25 0 -55 Q90 -25 90 45 Q45 30 0 3 Q-45 30 -90 45 Z" fill="url(#yurtRoof)" />
            <ellipse cx="0" cy="-50" rx="25" ry="10" fill="#CD853F" />
            <ellipse cx="0" cy="-50" rx="25" ry="10" stroke="#8B4513" strokeWidth="2" fill="none" />
            <rect x="-15" y="60" width="30" height="65" fill="url(#yurtDoor)" rx="4" />
          </g>
        </>
      )}

      {/* Foreground rocks - detailed */}
      <g className="rocks">
        {/* Left rock group */}
        <ellipse cx="60" cy="960" rx="55" ry="35" fill="url(#rockGradient)" />
        <ellipse cx="120" cy="975" rx="45" ry="28" fill="#5A5A5A" />
        <ellipse cx="40" cy="985" rx="35" ry="22" fill="#7A7A7A" />
        <ellipse cx="95" cy="950" rx="30" ry="20" fill="#6B6B6B" />
        
        {/* Rock highlights */}
        <ellipse cx="50" cy="950" rx="15" ry="8" fill="rgba(255,255,255,0.15)" />
        <ellipse cx="110" cy="965" rx="12" ry="6" fill="rgba(255,255,255,0.1)" />

        {/* Second rock group */}
        <ellipse cx="220" cy="965" rx="50" ry="32" fill="url(#rockGradient)" />
        <ellipse cx="280" cy="980" rx="40" ry="25" fill="#5E5E5E" />
        <ellipse cx="200" cy="990" rx="30" ry="18" fill="#7A7A7A" />

        {variant === "menu" && (
          <>
            {/* Right side rocks */}
            <ellipse cx="1720" cy="960" rx="55" ry="35" fill="url(#rockGradient)" />
            <ellipse cx="1780" cy="975" rx="45" ry="30" fill="#585858" />
            <ellipse cx="1680" cy="980" rx="40" ry="25" fill="#7A7A7A" />
            <ellipse cx="1750" cy="945" rx="28" ry="18" fill="#6B6B6B" />
          </>
        )}
      </g>

      {/* Grass tufts - detailed */}
      <g className="grass-details" fill="#33691E">
        <path d="M80 920 Q85 895 90 920 Q95 885 100 920 Q105 900 110 920 Q115 890 120 920" />
        <path d="M180 925 Q185 900 190 925 Q195 890 200 925 Q205 905 210 925" />
        <path d="M300 918 Q305 893 310 918 Q315 885 320 918 Q325 898 330 918" />
        <path d="M450 922 Q455 897 460 922 Q465 887 470 922 Q475 902 480 922" />
        <path d="M600 920 Q605 895 610 920 Q615 885 620 920" />
        <path d="M750 925 Q755 900 760 925 Q765 890 770 925 Q775 905 780 925" />
        <path d="M950 918 Q955 893 960 918 Q965 885 970 918" />
        <path d="M1100 922 Q1105 897 1110 922 Q1115 887 1120 922 Q1125 902 1130 922" />
        <path d="M1300 920 Q1305 895 1310 920 Q1315 885 1320 920 Q1325 900 1330 920" />
        <path d="M1500 925 Q1505 900 1510 925 Q1515 890 1520 925" />
        <path d="M1700 918 Q1705 893 1710 918 Q1715 885 1720 918 Q1725 898 1730 918" />
        <path d="M1850 922 Q1855 897 1860 922 Q1865 887 1870 922" />
      </g>

      {/* Small flowers/details */}
      {variant === "menu" && (
        <g className="flowers">
          <circle cx="400" cy="915" r="3" fill="#FFEB3B" />
          <circle cx="405" cy="918" r="2" fill="#FFF176" />
          <circle cx="700" cy="920" r="3" fill="#FF7043" />
          <circle cx="1200" cy="912" r="3" fill="#FFEB3B" />
          <circle cx="1205" cy="916" r="2" fill="#FFF176" />
          <circle cx="1600" cy="918" r="3" fill="#FF7043" />
        </g>
      )}
    </svg>
  )
}
