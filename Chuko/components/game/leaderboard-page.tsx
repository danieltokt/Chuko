"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Crown, Medal } from "lucide-react"
import GameBackground from "./game-background"
import { useAuth, User } from "./auth-context"
import AuthModal from "./auth-modal"
import { useLang } from "./lang-context"

interface LeaderboardPageProps { onBack: () => void }

export default function LeaderboardPage({ onBack }: LeaderboardPageProps) {
  const { user } = useAuth()
  const { t } = useLang()
  const [leaderboard, setLeaderboard] = useState<User[]>([])
  const [showAuth, setShowAuth] = useState(false)
  const ff = "'Fredoka', sans-serif"

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chuko-leaderboard")
      if (saved) {
        const all: User[] = JSON.parse(saved)
        all.sort((a, b) => b.highScore - a.highScore)
        setLeaderboard(all.slice(0, 10))
      }
    } catch {}
  }, [])

  const userRank = (() => {
    if (!user) return null
    try {
      const saved = localStorage.getItem("chuko-leaderboard")
      if (!saved) return null
      const all: User[] = JSON.parse(saved)
      all.sort((a, b) => b.highScore - a.highScore)
      const idx = all.findIndex(p => p.username.toLowerCase() === user.username.toLowerCase())
      return idx >= 0 ? idx + 1 : null
    } catch { return null }
  })()

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />
    return <span className="text-amber-800 font-bold text-sm" style={{ fontFamily: ff }}>#{rank}</span>
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="game" />
      <div className="absolute inset-0 flex flex-col z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
            <ArrowLeft className="w-6 h-6 text-amber-900" />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2"
            style={{ fontFamily: ff, color: '#FFF8DC', textShadow: '2px 2px 0 #8B0000, 0 4px 0 #5C0000' }}>
            <Trophy className="w-7 h-7 text-yellow-300" /> {t.leaderboardTitle}
          </h1>
          <div className="w-12" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
          {user && (
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,215,0,0.2)', border: '3px solid #FFD700', boxShadow: '0 4px 0 #B8700A' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-200 mb-1" style={{ fontFamily: ff }}>{t.yourRecord}</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: ff }}>{user.highScore.toLocaleString()}</div>
                  {userRank && <div className="text-xs text-amber-200" style={{ fontFamily: ff }}>{t.rank}{userRank} {t.inWorld}</div>}
                </div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', fontFamily: ff }}>
                  {user.username[0].toUpperCase()}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(to bottom,#FFF8DC,#F5DEB3)', boxShadow: '0 6px 0 #C9A86C', border: '3px solid #C9A86C' }}>
            <div className="p-4 text-center text-lg font-bold" style={{ fontFamily: ff, color: '#6D4C41', background: 'rgba(255,200,0,0.15)', borderBottom: '2px solid #C9A86C' }}>
              {t.top10}
            </div>
            {leaderboard.length === 0 ? (
              <div className="p-8 text-center">
                <Trophy className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                <p className="font-bold text-amber-700" style={{ fontFamily: ff }}>{t.noPlayers}</p>
                <p className="text-sm text-amber-600 mt-1" style={{ fontFamily: ff }}>{t.noPlayersSub}</p>
                <button onClick={() => setShowAuth(true)}
                  className="mt-4 px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', border: '2px solid #B8700A', fontFamily: ff }}>
                  {t.registerBtn}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-amber-200">
                {leaderboard.map((p, i) => {
                  const rank = i + 1
                  const isMe = user?.username.toLowerCase() === p.username.toLowerCase()
                  return (
                    <div key={p.username} className="flex items-center gap-3 px-4 py-3"
                      style={{ background: isMe ? 'rgba(255,215,0,0.2)' : rank <= 3 ? 'rgba(255,215,0,0.08)' : 'transparent' }}>
                      <div className="w-8 flex items-center justify-center">{getRankIcon(rank)}</div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ background: isMe ? 'linear-gradient(to bottom,#FFD700,#FFA500)' : 'linear-gradient(to bottom,#C9A86C,#A07850)', color: '#FFF8DC', fontFamily: ff }}>
                        {p.username[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate" style={{ fontFamily: ff, color: isMe ? '#B8700A' : '#6D4C41' }}>
                          {p.username}{isMe && t.youSuffix}
                        </div>
                      </div>
                      <div className="font-bold text-lg flex-shrink-0" style={{ fontFamily: ff, color: '#8B6914' }}>
                        {p.highScore.toLocaleString()}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {!user && (
            <div className="text-center">
              <p className="text-amber-100 text-sm mb-2" style={{ fontFamily: ff }}>{t.registerPrompt}</p>
              <button onClick={() => setShowAuth(true)} className="px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', border: '2px solid #B8700A', boxShadow: '0 3px 0 #B8700A', fontFamily: ff }}>
                {t.createAccount}
              </button>
            </div>
          )}
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode="register" />}
    </div>
  )
}