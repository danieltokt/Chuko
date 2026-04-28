"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, RotateCcw, Trophy, Users } from "lucide-react"
import GameBackground from "./game-background"

interface MultiplayPageProps { onBack: () => void }

type Phase = "setup" | "playing" | "result"

interface PlayerState {
  name: string
  score: number
  shots: number
  targetsHit: number
}

// Simple number-based mini-game: aim at a moving target with timing
export default function MultiplayPage({ onBack }: MultiplayPageProps) {
  const [phase, setPhase] = useState<Phase>("setup")
  const [p1Name, setP1Name] = useState("Игрок 1")
  const [p2Name, setP2Name] = useState("Игрок 2")
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [round, setRound] = useState(1)
  const [maxRounds] = useState(3)
  const [players, setPlayers] = useState<PlayerState[]>([])
  const [targetX, setTargetX] = useState(50)
  const [targetDir, setTargetDir] = useState(1)
  const [power, setPower] = useState(0)
  const [powerDir, setPowerDir] = useState(1)
  const [lastHit, setLastHit] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [countingDown, setCountingDown] = useState(false)
  const [message, setMessage] = useState("")
  const animRef = useRef<number>()
  const lastTimeRef = useRef(0)
  const ff = "'Fredoka', sans-serif"

  const btnGold = {
    background: 'linear-gradient(to bottom,#FFD700,#FFA500)',
    color: '#5D4037', border: '3px solid #B8700A',
    boxShadow: '0 4px 0 #B8700A', fontFamily: ff,
  }

  // Animate target & power bar
  useEffect(() => {
    if (phase !== "playing" || countingDown) return
    let tX = targetX, tD = targetDir, pw = power, pd = powerDir
    let last = 0

    const loop = (ts: number) => {
      if (!last) last = ts
      const dt = Math.min((ts - last) / 16, 3)
      last = ts

      tX += tD * 0.8 * dt
      if (tX > 85) { tX = 85; tD = -1 }
      if (tX < 5) { tX = 5; tD = 1 }

      pw += pd * 2 * dt
      if (pw > 100) { pw = 100; pd = -1 }
      if (pw < 0) { pw = 0; pd = 1 }

      setTargetX(tX)
      setPower(pw)
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [phase, countingDown, currentPlayer])

  const startGame = () => {
    const p: PlayerState[] = [
      { name: p1Name || "Игрок 1", score: 0, shots: 0, targetsHit: 0 },
      { name: p2Name || "Игрок 2", score: 0, shots: 0, targetsHit: 0 },
    ]
    setPlayers(p)
    setCurrentPlayer(0)
    setRound(1)
    setPhase("playing")
    startCountdown()
  }

  const startCountdown = () => {
    setCountingDown(true)
    setCountdown(3)
    let c = 3
    const iv = setInterval(() => {
      c--
      if (c <= 0) { clearInterval(iv); setCountingDown(false); setMessage("") }
      else setCountdown(c)
    }, 1000)
  }

  const handleShoot = () => {
    if (countingDown) return
    if (animRef.current) cancelAnimationFrame(animRef.current)

    // Score based on power and target position (center = 50%)
    const centerDist = Math.abs(targetX - 50) / 50  // 0=center, 1=edge
    const accuracy = 1 - centerDist
    const powerBonus = power / 100
    const pts = Math.round(accuracy * 70 + powerBonus * 30)

    setLastHit(pts)
    setMessage(pts >= 80 ? "🎯 ОТЛИЧНО!" : pts >= 50 ? "👍 ХОРОШО!" : "💨 Мимо!")

    setPlayers(prev => {
      const next = [...prev]
      next[currentPlayer] = {
        ...next[currentPlayer],
        score: next[currentPlayer].score + pts,
        shots: next[currentPlayer].shots + 1,
        targetsHit: next[currentPlayer].targetsHit + (pts >= 30 ? 1 : 0),
      }
      return next
    })

    setTimeout(() => {
      setLastHit(null)
      setMessage("")
      // Switch player or round
      if (currentPlayer === 0) {
        setCurrentPlayer(1)
        startCountdown()
      } else {
        if (round >= maxRounds) {
          setPhase("result")
        } else {
          setRound(r => r + 1)
          setCurrentPlayer(0)
          startCountdown()
        }
      }
    }, 1200)
  }

  const winnerIdx = players.length > 0
    ? players[0].score >= players[1].score ? 0 : 1
    : 0
  const isTie = players.length > 0 && players[0].score === players[1].score

  const card = { background: 'linear-gradient(to bottom,#FFF8DC,#F5DEB3)', boxShadow: '0 6px 0 #C9A86C', border: '3px solid #C9A86C' }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="game" />
      <div className="absolute inset-0 flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
            <ArrowLeft className="w-6 h-6 text-amber-900" />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2"
            style={{ fontFamily: ff, color: '#FFF8DC', textShadow: '2px 2px 0 #8B0000, 0 4px 0 #5C0000' }}>
            <Users className="w-7 h-7" /> МУЛЬТИПЛЕЕР
          </h1>
          {phase === "playing" && (
            <button onClick={() => { setPhase("setup"); if (animRef.current) cancelAnimationFrame(animRef.current) }}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
              <RotateCcw className="w-5 h-5 text-amber-900" />
            </button>
          )}
          {phase !== "playing" && <div className="w-12" />}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6">
          {/* SETUP */}
          {phase === "setup" && (
            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-2xl p-6" style={card}>
                <h2 className="text-xl font-bold text-center mb-5" style={{ fontFamily: ff, color: '#6D4C41' }}>
                  👥 Локальный матч
                </h2>
                <p className="text-sm text-amber-700 text-center mb-5" style={{ fontFamily: ff }}>
                  По очереди бросайте Чуко! {maxRounds} раундов — у кого больше очков, тот победил.
                </p>
                {[
                  { label: "🔴 Игрок 1", val: p1Name, set: setP1Name },
                  { label: "🔵 Игрок 2", val: p2Name, set: setP2Name },
                ].map(({ label, val, set }) => (
                  <div key={label} className="mb-3">
                    <label className="text-sm font-bold text-amber-800 mb-1 block" style={{ fontFamily: ff }}>{label}</label>
                    <input value={val} onChange={e => set(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'rgba(255,248,220,0.9)', border: '2px solid #C4A574', color: '#5D4037', fontFamily: ff }} />
                  </div>
                ))}
                <button onClick={startGame} className="w-full py-3 rounded-xl text-xl font-bold mt-2 hover:scale-105 active:scale-95 transition-transform" style={btnGold}>
                  ИГРАТЬ!
                </button>
              </div>
              <div className="rounded-2xl p-4" style={card}>
                <h3 className="font-bold text-amber-800 mb-2" style={{ fontFamily: ff }}>📖 Как играть:</h3>
                <ul className="text-sm text-amber-700 space-y-1" style={{ fontFamily: ff }}>
                  <li>🎯 Нажмите <strong>БРОСИТЬ</strong> в нужный момент</li>
                  <li>⚡ Сила броска зависит от полоски мощности</li>
                  <li>🏹 Точность — попади в центр мишени</li>
                  <li>🏆 Победитель — у кого больше очков!</li>
                </ul>
              </div>
            </div>
          )}

          {/* PLAYING */}
          {phase === "playing" && players.length === 2 && (
            <div className="w-full max-w-md space-y-4">
              {/* Scores */}
              <div className="grid grid-cols-2 gap-3">
                {players.map((p, i) => (
                  <div key={i} className="rounded-2xl p-3 text-center transition-all"
                    style={{ ...card, opacity: currentPlayer === i ? 1 : 0.6,
                      boxShadow: currentPlayer === i ? '0 6px 0 #B8700A, 0 0 0 3px #FFD700' : '0 4px 0 #C9A86C' }}>
                    <div className="text-xs font-bold mb-1" style={{ fontFamily: ff, color: i === 0 ? '#DC2626' : '#2563EB' }}>
                      {i === 0 ? '🔴' : '🔵'} {p.name}
                    </div>
                    <div className="text-3xl font-bold" style={{ fontFamily: ff, color: '#6D4C41' }}>{p.score}</div>
                    <div className="text-xs text-amber-600" style={{ fontFamily: ff }}>Раунд {round}/{maxRounds}</div>
                  </div>
                ))}
              </div>

              {/* Game area */}
              <div className="rounded-2xl p-5" style={card}>
                <div className="text-center font-bold text-amber-800 mb-3" style={{ fontFamily: ff }}>
                  {countingDown ? `⏳ Готовится ${players[currentPlayer].name}... ${countdown}` :
                    `🎯 Ход: ${players[currentPlayer].name}`}
                </div>

                {/* Target track */}
                <div className="relative h-16 rounded-xl mb-3 overflow-hidden"
                  style={{ background: 'linear-gradient(to right,#87CEEB,#4FC3F7,#87CEEB)', border: '3px solid #5DADE2' }}>
                  {/* Target zones */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 rounded-lg"
                    style={{ background: 'rgba(255,215,0,0.4)' }} />
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 rounded-lg"
                    style={{ background: 'rgba(255,100,0,0.5)' }} />
                  {/* Moving target */}
                  <div className="absolute top-1/2 -translate-y-1/2 transition-none text-2xl"
                    style={{ left: `${targetX}%`, transform: `translateX(-50%) translateY(-50%)` }}>
                    🦴
                  </div>
                  {lastHit !== null && (
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold animate-bounce"
                      style={{ fontFamily: ff, color: '#8B0000' }}>+{lastHit}</div>
                  )}
                </div>

                {/* Power bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-amber-700 mb-1" style={{ fontFamily: ff }}>
                    <span>⚡ Мощность</span><span>{Math.round(power)}%</span>
                  </div>
                  <div className="h-5 rounded-full overflow-hidden" style={{ background: '#E8D5A3', border: '2px solid #C4A574' }}>
                    <div className="h-full rounded-full transition-none"
                      style={{ width: `${power}%`,
                        background: `linear-gradient(to right, #4CAF50 0%, #FFC107 50%, #F44336 100%)` }} />
                  </div>
                </div>

                {message && (
                  <div className="text-center text-2xl font-bold mb-3 animate-bounce" style={{ fontFamily: ff }}>{message}</div>
                )}

                <button onClick={handleShoot} disabled={countingDown}
                  className="w-full py-4 rounded-xl text-2xl font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ ...btnGold, fontSize: '1.5rem' }}>
                  🏹 БРОСИТЬ!
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {phase === "result" && players.length === 2 && (
            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-2xl p-6 text-center" style={card}>
                <div className="text-5xl mb-3">{isTie ? "🤝" : "🏆"}</div>
                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: ff, color: '#6D4C41' }}>
                  {isTie ? "Ничья!" : `${players[winnerIdx].name} победил!`}
                </h2>

                <div className="space-y-3 mt-4">
                  {[...players]
                    .map((p, i) => ({ ...p, idx: i }))
                    .sort((a, b) => b.score - a.score)
                    .map((p, rank) => (
                      <div key={p.idx} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: rank === 0 && !isTie ? 'rgba(255,215,0,0.3)' : 'rgba(255,248,220,0.5)', border: '2px solid #C4A574' }}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{rank === 0 ? (isTie ? "🤝" : "🥇") : "🥈"}</span>
                          <div>
                            <div className="font-bold text-amber-900" style={{ fontFamily: ff }}>{p.name}</div>
                            <div className="text-xs text-amber-600" style={{ fontFamily: ff }}>
                              Попаданий: {p.targetsHit}/{p.shots}
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ fontFamily: ff, color: '#8B6914' }}>{p.score}</div>
                      </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-5">
                  <button onClick={startGame} className="flex-1 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform" style={btnGold}>
                    Снова!
                  </button>
                  <button onClick={() => setPhase("setup")}
                    className="flex-1 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform"
                    style={{ background: 'linear-gradient(to bottom,#64B5F6,#1E88E5)', color: 'white', border: '3px solid #1565C0', boxShadow: '0 4px 0 #1565C0', fontFamily: ff }}>
                    Меню
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
