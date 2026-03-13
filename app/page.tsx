"use client"

import { useState, useEffect } from "react"
import MainMenu from "@/components/game/main-menu"
import LevelSelect from "@/components/game/level-select"
import GameCanvas from "@/components/game/game-canvas"
import AboutPage from "@/components/game/about-page"

export type GameScreen = "menu" | "levels" | "game" | "about"

export interface LevelProgress {
  unlocked: boolean
  stars: number
}

export default function Home() {
  const [screen, setScreen] = useState<GameScreen>("menu")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [progress, setProgress] = useState<LevelProgress[]>([])

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

  const handleLevelComplete = (level: number, stars: number) => {
    const newProgress = [...progress]
    if (stars > newProgress[level - 1].stars) {
      newProgress[level - 1].stars = stars
    }
    if (level < newProgress.length) {
      newProgress[level].unlocked = true
    }
    setProgress(newProgress)
    localStorage.setItem("chuko-progress", JSON.stringify(newProgress))
    setScreen("levels")
  }

  const startLevel = (level: number) => {
    setCurrentLevel(level)
    setScreen("game")
  }

  if (progress.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <main className="w-screen h-screen overflow-hidden">
      {screen === "menu" && (
        <MainMenu 
          onPlay={() => setScreen("levels")} 
          onAbout={() => setScreen("about")}
        />
      )}
      {screen === "levels" && (
        <LevelSelect 
          progress={progress}
          onBack={() => setScreen("menu")}
          onSelectLevel={startLevel}
        />
      )}
      {screen === "game" && (
        <GameCanvas 
          level={currentLevel}
          onBack={() => setScreen("levels")}
          onComplete={(stars) => handleLevelComplete(currentLevel, stars)}
        />
      )}
      {screen === "about" && (
        <AboutPage onBack={() => setScreen("menu")} />
      )}
    </main>
  )
}
