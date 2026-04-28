"use client"

import GameBackground from "./game-background"
import { Settings, Trophy, User } from "lucide-react"
import { useAuth } from "./auth-context"
import { useLang } from "./lang-context"

interface MainMenuProps {
  onPlay: () => void
  onAbout: () => void
  onSettings: () => void
  onLeaderboard: () => void
  onMultiplay: () => void
}

export default function MainMenu({ onPlay, onAbout, onSettings, onLeaderboard, onMultiplay }: MainMenuProps) {
  const { user } = useAuth()
  const { t } = useLang()
  const ff = "'Fredoka', sans-serif"

  const btnGold = {
    fontFamily: ff,
    background: 'linear-gradient(to bottom, #FFD700 0%, #FFA500 50%, #E8912A 100%)',
    color: '#FFF8DC',
    textShadow: '1px 1px 2px rgba(92, 64, 51, 0.5)',
    boxShadow: '0 4px 0 #B8700A, 0 6px 12px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
    border: '3px solid #B8700A'
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="menu" />
      <div className="absolute inset-0 flex flex-col items-center justify-between py-8 z-10">
        {user && (
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: 'rgba(93,64,55,0.85)', border: '2px solid #FFD700' }}>
            <User className="w-4 h-4 text-amber-300" />
            <span className="text-amber-200 text-sm font-bold" style={{ fontFamily: ff }}>{user.username}</span>
          </div>
        )}

        <div className="flex flex-col items-center mt-4">
          <svg viewBox="0 0 400 100" className="w-72 md:w-96 h-auto drop-shadow-2xl">
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFF8DC" />
                <stop offset="100%" stopColor="#F5DEB3" />
              </linearGradient>
              <filter id="titleShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="2" floodColor="#5D4037" floodOpacity="0.9" />
              </filter>
            </defs>
            <text x="200" y="75" textAnchor="middle" fill="url(#titleGrad)" stroke="#8B0000" strokeWidth="10"
              fontFamily="'Fredoka', Arial, sans-serif" fontSize="85" fontWeight="700" filter="url(#titleShadow)">
              CHUKO
            </text>
            <text x="200" y="75" textAnchor="middle" fill="url(#titleGrad)"
              fontFamily="'Fredoka', Arial, sans-serif" fontSize="85" fontWeight="700">
              CHUKO
            </text>
          </svg>
          <svg viewBox="0 0 200 40" className="w-36 md:w-44 h-auto -mt-1">
            <defs>
              <linearGradient id="classicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#5DADE2" />
              </linearGradient>
            </defs>
            <text x="100" y="28" textAnchor="middle" fill="url(#classicGrad)" stroke="#2E6B8A" strokeWidth="4"
              fontFamily="'Fredoka', Arial, sans-serif" fontSize="30" fontWeight="600">CLASSIC</text>
            <text x="100" y="28" textAnchor="middle" fill="url(#classicGrad)"
              fontFamily="'Fredoka', Arial, sans-serif" fontSize="30" fontWeight="600">CLASSIC</text>
          </svg>
        </div>

        <div className="flex flex-col items-center gap-4 mb-12">
          <button onClick={onPlay}
            className="px-16 py-4 rounded-2xl text-3xl md:text-4xl font-bold tracking-wide transform hover:scale-105 active:scale-95 transition-transform"
            style={{ ...btnGold, boxShadow: '0 6px 0 #B8700A, 0 8px 20px rgba(0,0,0,0.4), inset 0 3px 0 rgba(255,255,255,0.4)', border: '4px solid #B8700A' }}>
            {t.play}
          </button>
          <div className="flex gap-4">
            <button onClick={onMultiplay}
              className="px-6 py-3 rounded-xl text-lg font-semibold transform hover:scale-105 active:scale-95 transition-transform"
              style={btnGold}>
              {t.multiplay}
            </button>
            <button onClick={onAbout}
              className="px-8 py-3 rounded-xl text-lg font-semibold transform hover:scale-105 active:scale-95 transition-transform"
              style={btnGold}>
              {t.about}
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6">
          <button onClick={onSettings}
            className="w-14 h-14 rounded-full flex items-center justify-center transform hover:scale-110 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
            <Settings className="w-7 h-7 text-amber-900" />
          </button>
        </div>

        <div className="absolute bottom-6 right-6">
          <button onClick={onLeaderboard}
            className="w-14 h-14 rounded-full flex items-center justify-center transform hover:scale-110 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
            <Trophy className="w-7 h-7 text-amber-900" />
          </button>
        </div>
      </div>
    </div>
  )
}