"use client"

import { useEffect, useRef } from "react"
import { loadSettings } from "./settings-page"

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)

  const applySettings = () => {
    const settings = loadSettings()
    if (!audioRef.current) return
    if (settings.music) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Автозапуск при первом касании/клике пользователя
    const tryStart = () => {
      if (startedRef.current) return
      startedRef.current = true
      applySettings()
      window.removeEventListener("click", tryStart)
      window.removeEventListener("touchstart", tryStart)
      window.removeEventListener("keydown", tryStart)
    }

    window.addEventListener("click", tryStart)
    window.addEventListener("touchstart", tryStart)
    window.addEventListener("keydown", tryStart)

    const handleSettingsChange = () => applySettings()
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "chuko-settings") applySettings()
    }

    window.addEventListener("chuko-settings-changed", handleSettingsChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      audioRef.current?.pause()
      window.removeEventListener("click", tryStart)
      window.removeEventListener("touchstart", tryStart)
      window.removeEventListener("keydown", tryStart)
      window.removeEventListener("chuko-settings-changed", handleSettingsChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return null
}