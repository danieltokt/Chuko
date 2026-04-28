"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  username: string
  email: string
  highScore: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => { success: boolean; error?: string }
  register: (username: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  updateHighScore: (score: number) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getUsers(): Record<string, { password: string; user: User }> {
  try {
    const saved = localStorage.getItem("chuko-users")
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function setUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem("chuko-users", JSON.stringify(users))
}

function updateLeaderboardEntry(u: User) {
  try {
    const saved = localStorage.getItem("chuko-leaderboard")
    const lb: User[] = saved ? JSON.parse(saved) : []
    const idx = lb.findIndex(p => p.username.toLowerCase() === u.username.toLowerCase())
    if (idx >= 0) lb[idx] = u
    else lb.push(u)
    lb.sort((a, b) => b.highScore - a.highScore)
    localStorage.setItem("chuko-leaderboard", JSON.stringify(lb))
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chuko-current-user")
      if (saved) setUser(JSON.parse(saved))
    } catch {}
  }, [])

  const register = (username: string, email: string, password: string) => {
    if (!username.trim() || !email.trim() || !password.trim())
      return { success: false, error: "Заполните все поля" }
    if (username.length < 3)
      return { success: false, error: "Имя минимум 3 символа" }
    if (password.length < 6)
      return { success: false, error: "Пароль минимум 6 символов" }
    if (!email.includes("@"))
      return { success: false, error: "Неверный email" }

    const users = getUsers()
    if (users[username.toLowerCase()])
      return { success: false, error: "Имя уже занято" }

    const newUser: User = { username, email, highScore: 0, createdAt: new Date().toISOString() }
    users[username.toLowerCase()] = { password, user: newUser }
    setUsers(users)
    updateLeaderboardEntry(newUser)
    setUser(newUser)
    localStorage.setItem("chuko-current-user", JSON.stringify(newUser))
    return { success: true }
  }

  const login = (username: string, password: string) => {
    if (!username.trim() || !password.trim())
      return { success: false, error: "Заполните все поля" }
    const users = getUsers()
    const entry = users[username.toLowerCase()]
    if (!entry) return { success: false, error: "Пользователь не найден" }
    if (entry.password !== password) return { success: false, error: "Неверный пароль" }
    setUser(entry.user)
    localStorage.setItem("chuko-current-user", JSON.stringify(entry.user))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("chuko-current-user")
  }

  const updateHighScore = (score: number) => {
    if (!user || score <= user.highScore) return
    const updated = { ...user, highScore: score }
    setUser(updated)
    localStorage.setItem("chuko-current-user", JSON.stringify(updated))
    const users = getUsers()
    if (users[user.username.toLowerCase()]) {
      users[user.username.toLowerCase()].user = updated
      setUsers(users)
    }
    updateLeaderboardEntry(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateHighScore }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be inside AuthProvider")
  return ctx
}
