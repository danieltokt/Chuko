"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { loadSettings } from "./settings-page"

export const TRANSLATIONS = {
  "English": {
    // Menu
    play: "PLAY",
    multiplay: "MULTIPLAY",
    about: "ABOUT",
    // Level Select
    selectLevel: "SELECT LEVEL",
    // Leaderboard
    leaderboardTitle: "LEADERBOARD",
    yourRecord: "YOUR BEST",
    rank: "Rank #",
    inWorld: "in the world",
    top10: "🏆 Top 10 Players",
    noPlayers: "No players yet!",
    noPlayersSub: "Register and play first!",
    registerBtn: "Register",
    registerPrompt: "Register to get on the leaderboard!",
    createAccount: "Create Account",
    youSuffix: " (You)",
    // Settings
    settingsTitle: "SETTINGS",
    account: "Account",
    login: "Login",
    register: "Register",
    logout: "Log out",
    record: "Best score",
    loginPrompt: "Log in to save your scores!",
    sound: "Sound",
    soundFx: "Sound effects",
    soundFxSub: "Launch and hit sounds",
    music: "Music",
    musicSub: "Add /public/music.mp3 for music",
    notifications: "Notifications",
    push: "Push notifications",
    pushSub: "New levels and updates",
    language: "Language",
    langNote: "⚠️ Language applies immediately",
    data: "Data",
    reset: "Reset progress",
    resetConfirm: "Are you sure? This cannot be undone!",
    yes: "Yes",
    cancel: "Cancel",
    save: "Save",
    saved: "Saved!",
    version: "Chuko Classic v1.0.0",
    // Game
    dragHint: "Drag the Chuko back and release to launch!",
    victory: "VICTORY!",
    tryAgain: "TRY AGAIN",
    score: "Score",
    retry: "Retry",
    continue: "Continue",
    level: "Level",
  },
  "Русский": {
    play: "ИГРАТЬ",
    multiplay: "МУЛЬТИПЛЕЕР",
    about: "О ИГРЕ",
    selectLevel: "ВЫБОР УРОВНЯ",
    leaderboardTitle: "ТАБЛИЦА ЛИДЕРОВ",
    yourRecord: "ВАШ РЕКОРД",
    rank: "Место #",
    inWorld: "в мире",
    top10: "🏆 Топ 10 игроков",
    noPlayers: "Пока нет игроков!",
    noPlayersSub: "Зарегистрируйся и играй первым!",
    registerBtn: "Зарегистрироваться",
    registerPrompt: "Зарегистрируйся чтобы попасть в топ!",
    createAccount: "Создать аккаунт",
    youSuffix: " (Вы)",
    settingsTitle: "НАСТРОЙКИ",
    account: "Аккаунт",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    record: "Рекорд",
    loginPrompt: "Войдите чтобы сохранять очки!",
    sound: "Звук",
    soundFx: "Звуковые эффекты",
    soundFxSub: "Звуки запуска и удара",
    music: "Музыка",
    musicSub: "Добавь /public/music.mp3 для музыки",
    notifications: "Уведомления",
    push: "Push-уведомления",
    pushSub: "Новые уровни и обновления",
    language: "Язык",
    langNote: "⚠️ Язык применяется сразу",
    data: "Данные",
    reset: "Сбросить прогресс",
    resetConfirm: "Уверены? Это нельзя отменить!",
    yes: "Да",
    cancel: "Отмена",
    save: "Сохранить",
    saved: "Сохранено!",
    version: "Chuko Classic v1.0.0",
    dragHint: "Потяни чуко назад и отпусти!",
    victory: "ПОБЕДА!",
    tryAgain: "ЕЩЁ РАЗ",
    score: "Счёт",
    retry: "Заново",
    continue: "Продолжить",
    level: "Уровень",
  },
  "Кыргызча": {
    play: "ОЙНОО",
    multiplay: "МУЛЬТИПЛЕЕР",
    about: "ОЮН ЖӨНҮНДӨ",
    selectLevel: "ДЕҢГЭЭЛ ТАНДОО",
    leaderboardTitle: "ЛИДЕРЛЕР ТАБЕЛИ",
    yourRecord: "СИЗДИН РЕКОРД",
    rank: "Орун #",
    inWorld: "дүйнөдө",
    top10: "🏆 Топ 10 оюнчу",
    noPlayers: "Азырынча оюнчу жок!",
    noPlayersSub: "Катталып биринчи ойно!",
    registerBtn: "Катталуу",
    registerPrompt: "Топко кирүү үчүн катталыңыз!",
    createAccount: "Аккаунт түзүү",
    youSuffix: " (Сиз)",
    settingsTitle: "ЖӨНДӨӨЛӨР",
    account: "Аккаунт",
    login: "Кирүү",
    register: "Катталуу",
    logout: "Чыгуу",
    record: "Рекорд",
    loginPrompt: "Упайларды сактоо үчүн кириңиз!",
    sound: "Үн",
    soundFx: "Үн эффекттери",
    soundFxSub: "Ыргытуу жана уруу үндөрү",
    music: "Музыка",
    musicSub: "Музыка үчүн /public/music.mp3 кош",
    notifications: "Билдирмелер",
    push: "Push-билдирмелер",
    pushSub: "Жаңы деңгээлдер жана жаңыртуулар",
    language: "Тил",
    langNote: "⚠️ Тил дароо колдонулат",
    data: "Маалымат",
    reset: "Прогрессти баштан баштоо",
    resetConfirm: "Ишенесизби? Муну жокко чыгаруу мүмкүн эмес!",
    yes: "Ооба",
    cancel: "Жокко чыгаруу",
    save: "Сактоо",
    saved: "Сакталды!",
    version: "Chuko Classic v1.0.0",
    dragHint: "Чукону тартып коё бер!",
    victory: "ЖЕҢИШ!",
    tryAgain: "КАЙРА АРАКЕТ",
    score: "Упай",
    retry: "Кайра",
    continue: "Улантуу",
    level: "Деңгээл",
  },
}

export type Lang = keyof typeof TRANSLATIONS
export type T = typeof TRANSLATIONS["English"]

interface LangContextType {
  lang: Lang
  t: T
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("English")

  useEffect(() => {
    try {
      const s = localStorage.getItem("chuko-settings")
      if (s) {
        const parsed = JSON.parse(s)
        if (parsed.language && TRANSLATIONS[parsed.language as Lang]) {
          setLangState(parsed.language as Lang)
        }
      }
    } catch {}

    const handler = () => {
      try {
        const s = localStorage.getItem("chuko-settings")
        if (s) {
          const parsed = JSON.parse(s)
          if (parsed.language && TRANSLATIONS[parsed.language as Lang]) {
            setLangState(parsed.language as Lang)
          }
        }
      } catch {}
    }
    window.addEventListener("chuko-settings-changed", handler)
    return () => window.removeEventListener("chuko-settings-changed", handler)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
  }

  return (
    <LangContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be inside LangProvider")
  return ctx
}