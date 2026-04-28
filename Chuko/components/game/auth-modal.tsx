  "use client"

  import { useState } from "react"
  import { useAuth } from "./auth-context"
  import { X, User, Mail, Lock } from "lucide-react"

  interface AuthModalProps {
    onClose: () => void
    initialMode?: "login" | "register"
  }

  export default function AuthModal({ onClose, initialMode = "login" }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "register">(initialMode)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login, register } = useAuth()

    const btnGold = {
      background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
      color: '#5D4037', border: '3px solid #B8700A',
      boxShadow: '0 4px 0 #B8700A',
      fontFamily: "'Fredoka', sans-serif",
    }

    const inputStyle = {
      background: 'rgba(255,248,220,0.9)',
      border: '2px solid #C4A574', color: '#5D4037',
      fontFamily: "'Fredoka', sans-serif",
    }

    const handleSubmit = () => {
      setError("")
      const result = mode === "login"
        ? login(username, password)
        : register(username, email, password)
      if (!result.success) setError(result.error || "Ошибка")
      else onClose()
    }

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-sm rounded-3xl p-6 relative"
          style={{ background: 'linear-gradient(to bottom, #FFF8DC, #F5DEB3)', boxShadow: '0 8px 0 #C9A86C', border: '4px solid #C9A86C' }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-200">
            <X className="w-5 h-5 text-amber-800" />
          </button>
          <h2 className="text-3xl font-bold text-center mb-5" style={{ fontFamily: "'Fredoka', sans-serif", color: '#6D4C41' }}>
            {mode === "login" ? "Войти" : "Регистрация"}
          </h2>
          <div className="flex rounded-xl overflow-hidden mb-4 border-2 border-amber-400">
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError("") }}
                className="flex-1 py-2 text-sm font-bold transition-all"
                style={{ fontFamily: "'Fredoka', sans-serif",
                  background: mode === m ? 'linear-gradient(to bottom, #FFD700, #FFA500)' : 'transparent',
                  color: mode === m ? '#5D4037' : '#A0785A' }}>
                {m === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
              <input type="text" placeholder="Имя пользователя" value={username}
                onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            {mode === "register" && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
                <input type="email" placeholder="Email" value={email}
                  onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
              </div>
            )}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
              <input type="password" placeholder="Пароль" value={password}
                onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            {error && <div className="text-red-600 text-sm text-center bg-red-50 rounded-xl p-2">{error}</div>}
            <button onClick={handleSubmit} className="w-full py-3 rounded-xl text-lg font-bold transform hover:scale-105 active:scale-95 transition-transform" style={btnGold}>
              {mode === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </div>
        </div>
      </div>
    )
  }
