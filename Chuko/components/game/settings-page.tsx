"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, User, LogOut, Volume2, Bell, Globe, Shield, Trash2, Save } from "lucide-react"
import GameBackground from "./game-background"
import { useAuth } from "./auth-context"
import AuthModal from "./auth-modal"
import { useLang, Lang } from "./lang-context"

interface SettingsPageProps { onBack: () => void }

export interface GameSettings {
  sound: boolean; music: boolean; notifications: boolean; language: string
}

export function loadSettings(): GameSettings {
  try {
    const s = localStorage.getItem("chuko-settings")
    if (s) return JSON.parse(s)
  } catch {}
  return { sound: true, music: true, notifications: false, language: "English" }
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const { user, logout } = useAuth()
  const { t } = useLang()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [settings, setSettings] = useState<GameSettings>(loadSettings())
  const [saved, setSaved] = useState(false)
  const [showDel, setShowDel] = useState(false)

  useEffect(() => { setSettings(loadSettings()) }, [])

  const handleSave = () => {
    localStorage.setItem("chuko-settings", JSON.stringify(settings))
    window.dispatchEvent(new CustomEvent("chuko-settings-changed"))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLanguageChange = (lang: Lang) => {
    const newSettings = { ...settings, language: lang }
    setSettings(newSettings)
    localStorage.setItem("chuko-settings", JSON.stringify(newSettings))
    window.dispatchEvent(new CustomEvent("chuko-settings-changed"))
  }

  const card = { background: 'linear-gradient(to bottom,#FFF8DC,#F5DEB3)', boxShadow: '0 4px 0 #C9A86C', border: '3px solid #C9A86C' }
  const ff = "'Fredoka', sans-serif"

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className="w-12 h-6 rounded-full relative transition-all flex-shrink-0"
      style={{ background: value ? '#FFA500' : '#C4A574' }}>
      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm"
        style={{ left: value ? '26px' : '2px' }} />
    </button>
  )

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground variant="game" />
      <div className="absolute inset-0 flex flex-col z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', boxShadow: '0 4px 0 #B8700A', border: '3px solid #B8700A' }}>
            <ArrowLeft className="w-6 h-6 text-amber-900" />
          </button>
          <h1 className="text-3xl font-bold" style={{ fontFamily: ff, color: '#FFF8DC', textShadow: '2px 2px 0 #8B0000, 0 4px 0 #5C0000' }}>
            {t.settingsTitle}
          </h1>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            style={{ fontFamily: ff,
              background: saved ? 'linear-gradient(to bottom,#4CAF50,#388E3C)' : 'linear-gradient(to bottom,#FFD700,#FFA500)',
              color: saved ? 'white' : '#5D4037',
              border: `2px solid ${saved ? '#2E7D32' : '#B8700A'}`,
              boxShadow: `0 3px 0 ${saved ? '#2E7D32' : '#B8700A'}` }}>
            <Save className="w-4 h-4" /> {saved ? t.saved : t.save}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">

          {/* Account */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: ff, color: '#6D4C41' }}>
              <User className="w-5 h-5" /> {t.account}
            </h2>
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-100/60">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', fontFamily: ff }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-amber-900" style={{ fontFamily: ff }}>{user.username}</div>
                    <div className="text-xs text-amber-700">{user.email}</div>
                    <div className="text-xs text-amber-600">🏆 {t.record}: {user.highScore}</div>
                  </div>
                </div>
                <button onClick={logout} className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  style={{ background: '#E53935', color: 'white', border: '2px solid #C62828', fontFamily: ff }}>
                  <LogOut className="w-4 h-4" /> {t.logout}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-amber-700" style={{ fontFamily: ff }}>{t.loginPrompt}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setAuthMode("login"); setShowAuth(true) }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', border: '2px solid #B8700A', boxShadow: '0 3px 0 #B8700A', fontFamily: ff }}>
                    {t.login}
                  </button>
                  <button onClick={() => { setAuthMode("register"); setShowAuth(true) }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(to bottom,#4CAF50,#388E3C)', color: 'white', border: '2px solid #2E7D32', boxShadow: '0 3px 0 #2E7D32', fontFamily: ff }}>
                    {t.register}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sound */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: ff, color: '#6D4C41' }}>
              <Volume2 className="w-5 h-5" /> {t.sound}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-amber-900" style={{ fontFamily: ff }}>{t.soundFx}</div>
                  <div className="text-xs text-amber-600">{t.soundFxSub}</div>
                </div>
                <Toggle value={settings.sound} onChange={() => setSettings(s => ({ ...s, sound: !s.sound }))} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-amber-900" style={{ fontFamily: ff }}>{t.music}</div>
                  <div className="text-xs text-amber-600">{t.musicSub}</div>
                </div>
                <Toggle value={settings.music} onChange={() => setSettings(s => ({ ...s, music: !s.music }))} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: ff, color: '#6D4C41' }}>
              <Bell className="w-5 h-5" /> {t.notifications}
            </h2>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-amber-900" style={{ fontFamily: ff }}>{t.push}</div>
                <div className="text-xs text-amber-600">{t.pushSub}</div>
              </div>
              <Toggle value={settings.notifications} onChange={() => setSettings(s => ({ ...s, notifications: !s.notifications }))} />
            </div>
          </div>

          {/* Language */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: ff, color: '#6D4C41' }}>
              <Globe className="w-5 h-5" /> {t.language}
            </h2>
            <div className="space-y-2">
              {([
                { code: "English", label: "🇬🇧 English" },
                { code: "Русский", label: "🇷🇺 Русский" },
                { code: "Кыргызча", label: "🇰🇬 Кыргызча" },
              ] as { code: Lang; label: string }[]).map(l => (
                <button key={l.code} onClick={() => handleLanguageChange(l.code)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-left transition-all"
                  style={{ fontFamily: ff,
                    background: settings.language === l.code ? 'linear-gradient(to bottom,#FFD700,#FFA500)' : 'rgba(255,248,220,0.6)',
                    color: settings.language === l.code ? '#5D4037' : '#A0785A',
                    border: `2px solid ${settings.language === l.code ? '#B8700A' : '#D4B896'}`,
                    boxShadow: settings.language === l.code ? '0 3px 0 #B8700A' : 'none' }}>
                  {l.label} {settings.language === l.code && '✓'}
                </button>
              ))}
              <p className="text-xs text-amber-600 text-center pt-1 italic" style={{ fontFamily: ff }}>
                {t.langNote}
              </p>
            </div>
          </div>

          {/* Data */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: ff, color: '#6D4C41' }}>
              <Shield className="w-5 h-5" /> {t.data}
            </h2>
            {!showDel ? (
              <button onClick={() => setShowDel(true)}
                className="w-full py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                style={{ background: '#FEE2E2', color: '#DC2626', border: '2px solid #FCA5A5', fontFamily: ff }}>
                <Trash2 className="w-4 h-4" /> {t.reset}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-red-600 text-center font-bold" style={{ fontFamily: ff }}>{t.resetConfirm}</p>
                <div className="flex gap-2">
                  <button onClick={() => { localStorage.removeItem("chuko-progress"); setShowDel(false) }}
                    className="flex-1 py-2 rounded-xl text-sm font-bold" style={{ background: '#DC2626', color: 'white', fontFamily: ff }}>{t.yes}</button>
                  <button onClick={() => setShowDel(false)}
                    className="flex-1 py-2 rounded-xl text-sm font-bold" style={{ background: '#6B7280', color: 'white', fontFamily: ff }}>{t.cancel}</button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-amber-100/60 pb-2" style={{ fontFamily: ff }}>{t.version}</div>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode={authMode} />}
    </div>
  )
}