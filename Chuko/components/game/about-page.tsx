"use client"

import { ArrowLeft, ExternalLink, Youtube, Play } from "lucide-react"
import GameBackground from "./game-background"

interface AboutPageProps { onBack: () => void }

export default function AboutPage({ onBack }: AboutPageProps) {
  const ff = "'Fredoka', sans-serif"
  const card = { background: 'linear-gradient(to bottom,#FFF8DC,#F5DEB3)', boxShadow: '0 6px 0 #C9A86C', border: '3px solid #C9A86C' }

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
            О ИГРЕ
          </h1>
          <div className="w-12" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
          {/* What is Chuko */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>🎯 Что такое Чүкө?</h2>
            <p className="text-sm leading-relaxed text-amber-900 mb-3" style={{ fontFamily: ff }}>
              <strong>Чүкө</strong> — одна из самых любимых традиционных игр Кыргызстана, в которую играли веками в горных долинах и степях. Игроки бросают маленькие косточки (бараньи или козьи суставные кости), чтобы сбить цели — это проверка мастерства, прицела и стратегии.
            </p>
            <p className="text-sm leading-relaxed text-amber-900" style={{ fontFamily: ff }}>
              Эта цифровая версия переносит дух Чүкө в современную эпоху. Вместо настоящих костей вы запускаете из рогатки красочных персонажей Чүкө!
            </p>
            <div className="flex justify-around mt-4 p-3 rounded-xl bg-amber-100/40 text-4xl">
              <span>🦴</span><span>🏹</span><span>🏔️</span><span>🏠</span>
            </div>
          </div>

          {/* Rules */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>📖 Правила игры</h2>
            <div className="space-y-3">
              {[
                { n: "1", icon: "👆", title: "Прицелься", text: "Нажмите и потяните персонажа Чүкө назад на рогатке. Линия траектории покажет куда он полетит." },
                { n: "2", icon: "💪", title: "Натяни", text: "Тяни дальше для большей мощи! Белые косточки-мишени — твоя цель. Целься внимательно." },
                { n: "3", icon: "🚀", title: "Бросай", text: "Отпусти палец чтобы выстрелить! Чүкө летит и врезается в конструкции." },
                { n: "4", icon: "💥", title: "Разрушай", text: "Сбей все белые мишени чтобы выиграть уровень. Деревянные блоки ломаются легче, чем каменные." },
                { n: "5", icon: "⭐", title: "Звёзды", text: "Заработай 3 звезды, используя как можно меньше Чүкө. Меньше бросков = больше звёзд!" },
              ].map(s => (
                <div key={s.n} className="flex gap-3 p-3 rounded-xl bg-amber-100/40">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ fontFamily: ff }}>{s.n}</div>
                  <div>
                    <div className="font-bold text-sm text-amber-900" style={{ fontFamily: ff }}>{s.icon} {s.title}</div>
                    <div className="text-xs text-amber-700 mt-0.5" style={{ fontFamily: ff }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stars */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>⭐ Система звёзд</h2>
            <div className="space-y-2">
              {[
                { s: "⭐⭐⭐", t: "3 звезды — Идеально!", d: "Осталось 60%+ Чүкө после победы" },
                { s: "⭐⭐", t: "2 звезды — Хорошо!", d: "Осталось 30–60% Чүкө" },
                { s: "⭐", t: "1 звезда — Пройдено", d: "Все мишени сбиты" },
              ].map(r => (
                <div key={r.t} className="flex items-center gap-3 p-2 rounded-xl bg-amber-100/40">
                  <span className="text-xl">{r.s}</span>
                  <div>
                    <div className="text-sm font-bold text-amber-800" style={{ fontFamily: ff }}>{r.t}</div>
                    <div className="text-xs text-amber-700" style={{ fontFamily: ff }}>{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block types */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>🧱 Типы блоков</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { e: "🟫", n: "Дерево", d: "Легко ломается" },
                { e: "🪨", n: "Камень", d: "Очень прочный" },
                { e: "🦴", n: "Мишень", d: "Обязательно сбить!" },
              ].map(b => (
                <div key={b.n} className="p-3 rounded-xl bg-amber-100/40 text-center">
                  <div className="text-2xl mb-1">{b.e}</div>
                  <div className="text-xs font-bold text-amber-900" style={{ fontFamily: ff }}>{b.n}</div>
                  <div className="text-xs text-amber-700" style={{ fontFamily: ff }}>{b.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Culture */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>🇰🇬 Кыргызская культура</h2>
            <p className="text-sm leading-relaxed text-amber-900 mb-3" style={{ fontFamily: ff }}>
              Чүкө — часть богатого наследия кыргызских кочевых традиций. Наряду с Кок-Бору и Ордо, эта игра отражает изобретательность и жизнерадостность кыргызского народа на протяжении веков.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="h-20 rounded-xl flex items-center justify-center text-5xl"
                style={{ background: 'linear-gradient(135deg,#87CEEB,#7CB342)' }}>⛰️</div>
              <div className="h-20 rounded-xl flex items-center justify-center text-5xl"
                style={{ background: 'linear-gradient(135deg,#DEB887,#8B6914)' }}>🏠</div>
            </div>
            <p className="text-xs text-amber-700 italic text-center" style={{ fontFamily: ff }}>
              Традиционно играют в долинах гор Тянь-Шань
            </p>
          </div>

          {/* Links */}
          <div className="rounded-2xl p-5" style={card}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: ff, color: '#6D4C41' }}>🔗 Узнать больше</h2>
            <div className="space-y-2">
              <a href="https://en.wikipedia.org/wiki/Chuko_(game)" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom,#FFD700,#FFA500)', color: '#5D4037', border: '2px solid #B8700A', boxShadow: '0 3px 0 #B8700A', fontFamily: ff }}>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-bold">Wikipedia: Чүкө (на английском)</span>
              </a>
              <a href="https://www.youtube.com/results?search_query=%D1%87%D2%AF%D0%BA%D3%A9+%D0%BE%D0%B9%D1%83%D0%BD" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom,#FF4444,#CC0000)', color: 'white', border: '2px solid #990000', boxShadow: '0 3px 0 #990000', fontFamily: ff }}>
                <Youtube className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-bold">YouTube: Чүкө оюну видео</span>
              </a>
              <a href="https://www.youtube.com/results?search_query=chuko+kyrgyz+traditional+game" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom,#9C27B0,#6A1B9A)', color: 'white', border: '2px solid #4A148C', boxShadow: '0 3px 0 #4A148C', fontFamily: ff }}>
                <Play className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-bold">YouTube: Chuko Game (English)</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-4 text-center" style={card}>
            <p className="text-sm text-amber-700 italic" style={{ fontFamily: ff }}>Создано с ❤️ в честь культуры Кыргызстана</p>
            <p className="font-bold mt-1 text-amber-800" style={{ fontFamily: ff }}>🇰🇬 Chuko Classic v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
