"use client"

import { useState, useEffect } from "react"
import MainMenu from "@/components/game/main-menu"
import LevelSelect from "@/components/game/level-select"
import GameCanvas from "@/components/game/game-canvas"
import AboutPage from "@/components/game/about-page"
import SettingsPage from "@/components/game/settings-page"
import LeaderboardPage from "@/components/game/leaderboard-page"
import MultiplayPage from "@/components/game/multiplay-page"
import MusicPlayer from "@/components/game/music-player"
import { AuthProvider, useAuth } from "@/components/game/auth-context"
import { LangProvider } from "@/components/game/lang-context"

export type GameScreen = "menu" | "levels" | "game" | "about" | "settings" | "leaderboard" | "multiplay"

export interface LevelProgress {
  unlocked: boolean
  stars: number
}

function GameApp() {
  const [screen, setScreen] = useState<GameScreen>("menu")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [progress, setProgress] = useState<LevelProgress[]>([])
  const { updateHighScore } = useAuth()

  useEffect(() => {
    const saved = localStorage.getItem("chuko-progress")
    if (saved) {
      setProgress(JSON.parse(saved))
    } else {
      const initial: LevelProgress[] = Array.from({ length: 15 }, (_, i) => ({
        unlocked: i === 0,
        stars: 0
      }))
      setProgress(initial)
      localStorage.setItem("chuko-progress", JSON.stringify(initial))
    }
  }, [])

  const handleLevelComplete = (level: number, stars: number, score: number) => {
    const newProgress = [...progress]
    if (stars > newProgress[level - 1].stars) {
      newProgress[level - 1].stars = stars
    }
    if (level < newProgress.length) {
      newProgress[level].unlocked = true
    }
    setProgress(newProgress)
    localStorage.setItem("chuko-progress", JSON.stringify(newProgress))
    updateHighScore(score)
    setScreen("levels")
  }

  const startLevel = (level: number) => {
    setCurrentLevel(level)
    setScreen("game")
  }

  if (progress.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
        <div className="text-white text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>Loading...</div>
      </div>
    )
  }

  return (
    <main className="w-screen h-screen overflow-hidden">
      {screen === "menu" && (
        <MainMenu
          onPlay={() => setScreen("levels")}
          onAbout={() => setScreen("about")}
          onSettings={() => setScreen("settings")}
          onLeaderboard={() => setScreen("leaderboard")}
          onMultiplay={() => setScreen("multiplay")}
        />
      )}
      {screen === "levels" && (
        <LevelSelect progress={progress} onBack={() => setScreen("menu")} onSelectLevel={startLevel} />
      )}
      {screen === "game" && (
        <GameCanvas
          level={currentLevel}
          onBack={() => setScreen("levels")}
          onComplete={(stars, score) => handleLevelComplete(currentLevel, stars, score ?? 0)}
        />
      )}
      {screen === "about" && <AboutPage onBack={() => setScreen("menu")} />}
      {screen === "settings" && <SettingsPage onBack={() => setScreen("menu")} />}
      {screen === "leaderboard" && <LeaderboardPage onBack={() => setScreen("menu")} />}
      {screen === "multiplay" && <MultiplayPage onBack={() => setScreen("menu")} />}
    </main>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <LangProvider>
        <MusicPlayer />
        <GameApp />
      </LangProvider>
    </AuthProvider>
  )
}