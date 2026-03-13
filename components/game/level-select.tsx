"use client"

import { ArrowLeft, Star, Lock } from "lucide-react"
import GameBackground from "./game-background"
import { LevelProgress } from "@/app/page"

interface LevelSelectProps {
  progress: LevelProgress[]
  onSelectLevel: (level: number) => void
  onBack: () => void
}

export default function LevelSelect({ progress, onSelectLevel, onBack }: LevelSelectProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="game" />
      
      {/* Content */}
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
            SELECT LEVEL
          </h1>
          
          <div className="w-12 h-12" />
        </div>

        {/* Level Grid */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {progress.map((level, index) => (
              <button
                key={index}
                onClick={() => level.unlocked && onSelectLevel(index + 1)}
                disabled={!level.unlocked}
                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center transform transition-all duration-200 ${
                  level.unlocked ? 'hover:scale-110 active:scale-95' : 'opacity-70 cursor-not-allowed'
                }`}
                style={{
                  background: level.unlocked 
                    ? 'linear-gradient(to bottom, #FFD700 0%, #FFA500 50%, #E8912A 100%)' 
                    : 'linear-gradient(to bottom, #A9A9A9, #707070)',
                  boxShadow: level.unlocked
                    ? '0 6px 0 #B8700A, 0 8px 15px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)'
                    : '0 6px 0 #505050, 0 8px 15px rgba(0,0,0,0.3)',
                  border: level.unlocked ? '4px solid #B8700A' : '4px solid #505050'
                }}
              >
                {level.unlocked ? (
                  <>
                    <span 
                      className="text-3xl md:text-4xl font-bold"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        color: '#FFF8DC',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {index + 1}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill={star <= level.stars ? '#FFD700' : 'transparent'}
                          stroke={star <= level.stars ? '#B8700A' : '#B8700A'}
                          strokeWidth={2}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <Lock className="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

function ChukoBird({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52">
      <defs>
        <linearGradient id={`chukoGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}BB`} />
        </linearGradient>
        <filter id="chukoShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Body */}
      <ellipse cx="20" cy="32" rx="16" ry="18" fill={`url(#chukoGrad-${color})`} filter="url(#chukoShadow)" />
      {/* Head */}
      <circle cx="20" cy="14" r="12" fill={`url(#chukoGrad-${color})`} />
      {/* Eyes */}
      <ellipse cx="15" cy="12" rx="4" ry="5" fill="white" />
      <ellipse cx="25" cy="12" rx="4" ry="5" fill="white" />
      <circle cx="16" cy="13" r="2" fill="#222" />
      <circle cx="26" cy="13" r="2" fill="#222" />
      {/* Eyebrows (angry look) */}
      <path d="M10 8 L19 10" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 8 L21 10" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {/* Highlight */}
      <ellipse cx="14" cy="28" rx="5" ry="8" fill="white" opacity="0.2" />
    </svg>
  )
}