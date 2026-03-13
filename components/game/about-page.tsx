"use client"

import { ArrowLeft } from "lucide-react"
import GameBackground from "./game-background"

interface AboutPageProps {
  onBack: () => void
}

function ChukoBird({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52">
      <defs>
        <linearGradient id={`aboutChukoGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}BB`} />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="32" rx="16" ry="18" fill={`url(#aboutChukoGrad-${color})`} />
      <circle cx="20" cy="14" r="12" fill={`url(#aboutChukoGrad-${color})`} />
      <ellipse cx="15" cy="12" rx="4" ry="5" fill="white" />
      <ellipse cx="25" cy="12" rx="4" ry="5" fill="white" />
      <circle cx="16" cy="13" r="2" fill="#222" />
      <circle cx="26" cy="13" r="2" fill="#222" />
      <path d="M10 8 L19 10" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 8 L21 10" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="14" cy="28" rx="5" ry="8" fill="white" opacity="0.2" />
    </svg>
  )
}

function TargetChuko({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
      <defs>
        <linearGradient id="aboutTargetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFAF0" />
          <stop offset="50%" stopColor="#F5F5DC" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="28" rx="14" ry="18" fill="url(#aboutTargetGrad)" stroke="#C4A574" strokeWidth="2" />
      <circle cx="12" cy="12" r="8" fill="url(#aboutTargetGrad)" stroke="#C4A574" strokeWidth="2" />
      <circle cx="28" cy="12" r="8" fill="url(#aboutTargetGrad)" stroke="#C4A574" strokeWidth="2" />
      <circle cx="12" cy="44" r="8" fill="url(#aboutTargetGrad)" stroke="#C4A574" strokeWidth="2" />
      <circle cx="28" cy="44" r="8" fill="url(#aboutTargetGrad)" stroke="#C4A574" strokeWidth="2" />
      <circle cx="15" cy="25" r="2" fill="#5D4037" />
      <circle cx="25" cy="25" r="2" fill="#5D4037" />
      <ellipse cx="14" cy="20" rx="3" ry="5" fill="white" opacity="0.4" />
    </svg>
  )
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="game" />
      
      <div className="absolute inset-0 flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full flex items-center justify-center transform hover:scale-110 active:scale-95 transition-transform"
            style={{
              background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
              boxShadow: '0 4px 0 #B8700A, 0 6px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
              border: '3px solid #B8700A'
            }}
          >
            <ArrowLeft className="w-6 h-6 text-amber-900" />
          </button>
          
          <h1 
            className="text-3xl md:text-5xl font-bold"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              color: '#FFF8DC',
              textShadow: '-2px -2px 0 #8B0000, 2px -2px 0 #8B0000, -2px 2px 0 #8B0000, 2px 2px 0 #8B0000, 0 4px 0 #5C0000'
            }}
          >
            ABOUT CHUKO
          </h1>
          
          <div className="w-12 h-12" />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-4 overflow-auto">
          <div 
            className="max-w-2xl p-6 md:p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(to bottom, #FFF8DC, #F5DEB3)',
              boxShadow: '0 8px 0 #C9A86C, 0 12px 30px rgba(0,0,0,0.3)',
              border: '4px solid #C9A86C'
            }}
          >
            <h2 
              className="text-xl md:text-2xl font-bold text-center mb-4"
              style={{ fontFamily: "'Fredoka', sans-serif", color: '#6D4C41' }}
            >
              Traditional Kyrgyz Game
            </h2>

            <div className="space-y-3 text-base" style={{ color: '#5D4E37', lineHeight: '1.6' }}>
              <p>
                <strong>Chuko</strong> is a traditional Kyrgyz game played for centuries in the mountains 
                and valleys of Kyrgyzstan. Players throw small wooden or bone figurines to knock down targets.
              </p>

              <p>
                This digital version brings the spirit of Chuko to the modern era, combining traditional 
                Kyrgyz culture with physics-based gameplay inspired by Angry Birds.
              </p>

              <div 
                className="p-4 rounded-xl"
                style={{ background: 'rgba(139, 69, 19, 0.1)', border: '2px dashed #D2B48C' }}
              >
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Fredoka', sans-serif", color: '#6D4C41' }}>
                  How to Play:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Drag the colorful Chuko back on the slingshot</li>
                  <li>Aim at the wooden structures</li>
                  <li>Release to launch!</li>
                  <li>Knock down all white bone-shaped targets to win</li>
                  <li>Use fewer Chukos to earn more stars!</li>
                </ul>
              </div>
            </div>

            {/* Stars explanation */}
            <div className="mt-4 p-3 rounded-xl bg-amber-100/50 border border-amber-300">
              <h3 className="font-bold text-center mb-2" style={{ fontFamily: "'Fredoka', sans-serif", color: '#6D4C41' }}>
                Star Rating
              </h3>
              <div className="flex justify-center gap-6 text-sm text-amber-800">
                <span>1 star - Complete</span>
                <span>2 stars - Good</span>
                <span>3 stars - Perfect!</span>
              </div>
            </div>

            {/* Cultural note */}
            <div className="mt-4 text-center">
              <p className="text-sm italic text-amber-700">
                Celebrating Kyrgyz culture through gaming
              </p>
              <p className="font-semibold mt-1" style={{ fontFamily: "'Fredoka', sans-serif", color: '#6D4C41' }}>
                Kyrgyzstan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}