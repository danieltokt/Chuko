"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Matter from "matter-js"
import { ArrowLeft, RotateCcw, Play, Star } from "lucide-react"
import { useLang } from "./lang-context"

interface GameCanvasProps {
  level: number
  onBack: () => void
  onComplete: (stars: number, score: number) => void
}

const CHUKO_TEAM = [
  { body: '#D2691E', face: '#8B4513', outfit: '#FF6B6B', name: 'Altyn' },
  { body: '#FFB6C1', face: '#DDA0DD', outfit: '#FF69B4', name: 'Gulzat' },
  { body: '#4169E1', face: '#1E3A8A', outfit: '#6366F1', name: 'Azamat' },
  { body: '#228B22', face: '#006400', outfit: '#22C55E', name: 'Ermek' },
]

const LEVELS = [
  {
    targets: 1, chukos: 3,
    blocks: [
      { x: 550, y: 430, w: 20, h: 100, type: 'wood' as const },
      { x: 650, y: 430, w: 20, h: 100, type: 'wood' as const },
      { x: 600, y: 365, w: 120, h: 20, type: 'wood' as const },
      { x: 600, y: 325, w: 40, h: 50, type: 'target' as const },
    ]
  },
  {
    targets: 2, chukos: 4,
    blocks: [
      { x: 500, y: 440, w: 20, h: 80, type: 'wood' as const },
      { x: 600, y: 440, w: 20, h: 80, type: 'wood' as const },
      { x: 700, y: 440, w: 20, h: 80, type: 'wood' as const },
      { x: 550, y: 385, w: 120, h: 20, type: 'wood' as const },
      { x: 650, y: 385, w: 120, h: 20, type: 'wood' as const },
      { x: 550, y: 345, w: 35, h: 45, type: 'target' as const },
      { x: 650, y: 345, w: 35, h: 45, type: 'target' as const },
    ]
  },
  {
    targets: 2, chukos: 4,
    blocks: [
      { x: 520, y: 460, w: 30, h: 50, type: 'stone' as const },
      { x: 680, y: 460, w: 30, h: 50, type: 'stone' as const },
      { x: 600, y: 420, w: 200, h: 20, type: 'stone' as const },
      { x: 550, y: 380, w: 20, h: 60, type: 'wood' as const },
      { x: 650, y: 380, w: 20, h: 60, type: 'wood' as const },
      { x: 600, y: 335, w: 120, h: 20, type: 'wood' as const },
      { x: 565, y: 295, w: 35, h: 45, type: 'target' as const },
      { x: 635, y: 295, w: 35, h: 45, type: 'target' as const },
    ]
  },
  {
    targets: 3, chukos: 5,
    blocks: [
      { x: 600, y: 460, w: 120, h: 30, type: 'stone' as const },
      { x: 560, y: 410, w: 20, h: 70, type: 'wood' as const },
      { x: 640, y: 410, w: 20, h: 70, type: 'wood' as const },
      { x: 600, y: 360, w: 100, h: 20, type: 'wood' as const },
      { x: 600, y: 320, w: 35, h: 45, type: 'target' as const },
      { x: 480, y: 455, w: 35, h: 45, type: 'target' as const },
      { x: 720, y: 455, w: 35, h: 45, type: 'target' as const },
    ]
  },
  {
    targets: 3, chukos: 5,
    blocks: [
      { x: 500, y: 460, w: 25, h: 50, type: 'stone' as const },
      { x: 600, y: 460, w: 25, h: 50, type: 'stone' as const },
      { x: 700, y: 460, w: 25, h: 50, type: 'stone' as const },
      { x: 550, y: 415, w: 130, h: 20, type: 'wood' as const },
      { x: 650, y: 415, w: 130, h: 20, type: 'wood' as const },
      { x: 540, y: 375, w: 35, h: 45, type: 'target' as const },
      { x: 660, y: 375, w: 35, h: 45, type: 'target' as const },
      { x: 600, y: 380, w: 20, h: 60, type: 'wood' as const },
      { x: 600, y: 325, w: 35, h: 45, type: 'target' as const },
    ]
  },
  {
    targets: 4, chukos: 6,
    blocks: [
      { x: 520, y: 460, w: 20, h: 50, type: 'stone' as const },
      { x: 600, y: 460, w: 20, h: 50, type: 'stone' as const },
      { x: 680, y: 460, w: 20, h: 50, type: 'stone' as const },
      { x: 560, y: 415, w: 110, h: 20, type: 'wood' as const },
      { x: 640, y: 415, w: 110, h: 20, type: 'wood' as const },
      { x: 530, y: 375, w: 35, h: 45, type: 'target' as const },
      { x: 600, y: 375, w: 35, h: 45, type: 'target' as const },
      { x: 670, y: 375, w: 35, h: 45, type: 'target' as const },
      { x: 600, y: 320, w: 35, h: 45, type: 'target' as const },
    ]
  },
]

export default function GameCanvas({ level, onBack, onComplete }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const currentBirdRef = useRef<Matter.Body | null>(null)
  const birdsUsedRef = useRef(0)
  const targetsRef = useRef<Matter.Body[]>([])
  const animationFrameRef = useRef<number>(0)
  const isDraggingRef = useRef(false)
  const birdPosRef = useRef({ x: 0, y: 0 })

  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)
  const [birdsLeft, setBirdsLeft] = useState(0)
  const [gameState, setGameState] = useState<'ready' | 'aiming' | 'flying' | 'won' | 'lost'>('ready')
  const gameStateRef = useRef<'ready' | 'aiming' | 'flying' | 'won' | 'lost'>('ready')
  const [showResult, setShowResult] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  const { t } = useLang()

  const slingshotPosRef = useRef({ x: 150, y: 480 })
  const slingshotPos = slingshotPosRef.current
  const levelConfig = LEVELS[Math.min(level - 1, LEVELS.length - 1)]
  const levelConfigRef = useRef(levelConfig)
  levelConfigRef.current = levelConfig
  const maxPullDistance = 120

  const calculateStars = useCallback((remaining: number, total: number) => {
    const ratio = remaining / total
    if (ratio >= 0.6) return 3
    if (ratio >= 0.3) return 2
    return 1
  }, [])

  const drawChukoProjectile = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    teamIndex: number,
    angle: number = 0
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)

    const team = CHUKO_TEAM[teamIndex % CHUKO_TEAM.length]

    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.beginPath()
    ctx.ellipse(3, size * 0.8, size * 0.6, size * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
    bodyGradient.addColorStop(0, '#FFF8E7')
    bodyGradient.addColorStop(0.7, '#F5DEB3')
    bodyGradient.addColorStop(1, '#DEB887')

    ctx.fillStyle = bodyGradient
    ctx.beginPath()
    ctx.moveTo(-size * 0.6, -size * 0.3)
    ctx.quadraticCurveTo(-size * 0.8, -size * 0.8, -size * 0.4, -size * 0.9)
    ctx.quadraticCurveTo(0, -size * 1.1, size * 0.4, -size * 0.9)
    ctx.quadraticCurveTo(size * 0.8, -size * 0.8, size * 0.6, -size * 0.3)
    ctx.quadraticCurveTo(size * 0.7, size * 0.2, size * 0.5, size * 0.6)
    ctx.quadraticCurveTo(size * 0.3, size * 0.9, 0, size * 0.8)
    ctx.quadraticCurveTo(-size * 0.3, size * 0.9, -size * 0.5, size * 0.6)
    ctx.quadraticCurveTo(-size * 0.7, size * 0.2, -size * 0.6, -size * 0.3)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#C4A574'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = team.outfit
    ctx.beginPath()
    ctx.ellipse(0, size * 0.2, size * 0.5, size * 0.15, 0, 0, Math.PI)
    ctx.fill()

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.ellipse(-size * 0.25, -size * 0.3, size * 0.18, size * 0.22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(size * 0.25, -size * 0.3, size * 0.18, size * 0.22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#8B7355'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.ellipse(-size * 0.25, -size * 0.3, size * 0.18, size * 0.22, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(size * 0.25, -size * 0.3, size * 0.18, size * 0.22, 0, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = '#2D2D2D'
    ctx.beginPath()
    ctx.arc(-size * 0.22, -size * 0.28, size * 0.08, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(size * 0.28, -size * 0.28, size * 0.08, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(-size * 0.25, -size * 0.32, size * 0.03, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(size * 0.25, -size * 0.32, size * 0.03, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = team.face
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(-size * 0.4, -size * 0.55)
    ctx.lineTo(-size * 0.1, -size * 0.5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(size * 0.4, -size * 0.55)
    ctx.lineTo(size * 0.1, -size * 0.5)
    ctx.stroke()

    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, -size * 0.05, size * 0.15, 0.2, Math.PI - 0.2)
    ctx.stroke()

    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.beginPath()
    ctx.ellipse(-size * 0.2, -size * 0.6, size * 0.12, size * 0.18, -0.3, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }, [])

  const drawTargetChuko = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    angle: number = 0
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)

    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.beginPath()
    ctx.ellipse(2, size * 0.9, size * 0.5, size * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()

    const bodyGradient = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size * 1.2)
    bodyGradient.addColorStop(0, '#FFFEF5')
    bodyGradient.addColorStop(0.5, '#F8F4E8')
    bodyGradient.addColorStop(1, '#E8DCC8')

    ctx.fillStyle = bodyGradient
    ctx.beginPath()
    ctx.moveTo(-size * 0.5, -size * 0.4)
    ctx.quadraticCurveTo(-size * 0.7, -size * 0.9, -size * 0.3, -size)
    ctx.quadraticCurveTo(0, -size * 1.1, size * 0.3, -size)
    ctx.quadraticCurveTo(size * 0.7, -size * 0.9, size * 0.5, -size * 0.4)
    ctx.quadraticCurveTo(size * 0.6, 0, size * 0.5, size * 0.4)
    ctx.quadraticCurveTo(size * 0.7, size * 0.8, size * 0.3, size * 0.9)
    ctx.quadraticCurveTo(0, size, -size * 0.3, size * 0.9)
    ctx.quadraticCurveTo(-size * 0.7, size * 0.8, -size * 0.5, size * 0.4)
    ctx.quadraticCurveTo(-size * 0.6, 0, -size * 0.5, -size * 0.4)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#C9B896'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.strokeStyle = 'rgba(200, 180, 150, 0.3)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-size * 0.2, -size * 0.6)
    ctx.quadraticCurveTo(-size * 0.1, 0, -size * 0.15, size * 0.5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(size * 0.15, -size * 0.5)
    ctx.quadraticCurveTo(size * 0.1, 0, size * 0.2, size * 0.6)
    ctx.stroke()

    ctx.fillStyle = '#5D4E37'
    ctx.beginPath()
    ctx.arc(-size * 0.2, -size * 0.15, size * 0.08, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(size * 0.2, -size * 0.15, size * 0.08, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.beginPath()
    ctx.ellipse(-size * 0.15, -size * 0.55, size * 0.1, size * 0.15, -0.3, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }, [])

  const drawTrajectory = useCallback((
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    velocityX: number,
    velocityY: number
  ) => {
    const steps = 60
    const framesPerStep = 3
    let vx = velocityX
    let vy = velocityY
    let x = startX
    let y = startY

    for (let i = 0; i < steps; i++) {
      for (let f = 0; f < framesPerStep; f++) {
        vy += 0.0167
        vx *= (1 - 0.01)
        vy *= (1 - 0.01)
        x += vx
        y += vy
      }

      if (x > ctx.canvas.width || y > ctx.canvas.height || x < 0) break

      const alpha = 1 - (i / steps) * 0.85
      const dotSize = Math.max(5 - (i / steps) * 3, 1.5)

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, dotSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const drawSlingshot = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, groundY: number) => {
    const baseY = groundY - 10
    const height = 100
    const forkY = baseY - height

    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.beginPath()
    ctx.ellipse(x, baseY + 5, 25, 8, 0, 0, Math.PI * 2)
    ctx.fill()

    const woodGradient = ctx.createLinearGradient(x - 20, 0, x + 20, 0)
    woodGradient.addColorStop(0, '#5D4037')
    woodGradient.addColorStop(0.3, '#8D6E63')
    woodGradient.addColorStop(0.7, '#8D6E63')
    woodGradient.addColorStop(1, '#5D4037')

    ctx.fillStyle = woodGradient
    ctx.beginPath()
    ctx.moveTo(x - 10, baseY)
    ctx.lineTo(x - 8, forkY + 40)
    ctx.lineTo(x + 8, forkY + 40)
    ctx.lineTo(x + 10, baseY)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = '#3E2723'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = woodGradient
    ctx.beginPath()
    ctx.moveTo(x - 8, forkY + 45)
    ctx.lineTo(x - 25, forkY)
    ctx.lineTo(x - 30, forkY - 10)
    ctx.lineTo(x - 20, forkY - 10)
    ctx.lineTo(x - 15, forkY + 5)
    ctx.lineTo(x - 5, forkY + 45)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + 8, forkY + 45)
    ctx.lineTo(x + 25, forkY)
    ctx.lineTo(x + 30, forkY - 10)
    ctx.lineTo(x + 20, forkY - 10)
    ctx.lineTo(x + 15, forkY + 5)
    ctx.lineTo(x + 5, forkY + 45)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.strokeStyle = 'rgba(62, 39, 35, 0.4)'
    ctx.lineWidth = 1
    for (let i = -6; i <= 6; i += 4) {
      ctx.beginPath()
      ctx.moveTo(x + i, baseY - 5)
      ctx.lineTo(x + i * 0.8, forkY + 45)
      ctx.stroke()
    }

    ctx.fillStyle = '#4E342E'
    ctx.beginPath()
    ctx.arc(x - 25, forkY - 5, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x + 25, forkY - 5, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = '#A0522D'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(x - 25, forkY - 5, 9, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x + 25, forkY - 5, 9, 0, Math.PI * 2)
    ctx.stroke()

    return { leftFork: { x: x - 25, y: forkY - 5 }, rightFork: { x: x + 25, y: forkY - 5 } }
  }, [])

  const drawCloud = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.beginPath()
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
    ctx.arc(x + size * 0.35, y - size * 0.15, size * 0.4, 0, Math.PI * 2)
    ctx.arc(x + size * 0.7, y, size * 0.45, 0, Math.PI * 2)
    ctx.arc(x + size * 0.35, y + size * 0.15, size * 0.35, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  const drawYurt = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)

    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.beginPath()
    ctx.ellipse(0, 85, 90, 20, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#5D4037'
    ctx.beginPath()
    ctx.ellipse(0, 80, 85, 25, 0, 0, Math.PI * 2)
    ctx.fill()

    const wallGradient = ctx.createLinearGradient(-80, 0, 80, 0)
    wallGradient.addColorStop(0, '#E8DCC8')
    wallGradient.addColorStop(0.3, '#FFF8E7')
    wallGradient.addColorStop(0.7, '#FFF8E7')
    wallGradient.addColorStop(1, '#D4C4A8')
    ctx.fillStyle = wallGradient
    ctx.beginPath()
    ctx.moveTo(-80, 80)
    ctx.lineTo(-80, 20)
    ctx.quadraticCurveTo(-80, 0, 0, -20)
    ctx.quadraticCurveTo(80, 0, 80, 20)
    ctx.lineTo(80, 80)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = '#B8A082'
    ctx.lineWidth = 2
    ctx.stroke()

    const roofGradient = ctx.createRadialGradient(0, -40, 0, 0, -20, 100)
    roofGradient.addColorStop(0, '#D4A574')
    roofGradient.addColorStop(0.5, '#C9956C')
    roofGradient.addColorStop(1, '#A67B5B')
    ctx.fillStyle = roofGradient
    ctx.beginPath()
    ctx.moveTo(-80, 20)
    ctx.quadraticCurveTo(-80, -40, 0, -70)
    ctx.quadraticCurveTo(80, -40, 80, 20)
    ctx.quadraticCurveTo(40, 5, 0, -20)
    ctx.quadraticCurveTo(-40, 5, -80, 20)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = '#8B6914'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = '#CD853F'
    ctx.beginPath()
    ctx.ellipse(0, -65, 25, 12, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.strokeStyle = '#A0522D'
    ctx.lineWidth = 1.5
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * 8, -65 + Math.sin(angle) * 4)
      ctx.lineTo(Math.cos(angle) * 20, -65 + Math.sin(angle) * 9)
      ctx.stroke()
    }

    ctx.fillStyle = '#B22222'
    ctx.fillRect(-78, 5, 156, 18)

    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    for (let i = -70; i < 70; i += 25) {
      ctx.beginPath()
      ctx.moveTo(i, 8)
      ctx.lineTo(i + 12, 18)
      ctx.lineTo(i + 24, 8)
      ctx.stroke()
    }

    ctx.fillStyle = '#4A3728'
    ctx.beginPath()
    ctx.roundRect(-20, 30, 40, 50, [8, 8, 0, 0])
    ctx.fill()
    ctx.strokeStyle = '#2D1F15'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.strokeStyle = '#CD853F'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.roundRect(-22, 28, 44, 52, [10, 10, 0, 0])
    ctx.stroke()

    ctx.strokeStyle = 'rgba(139, 115, 85, 0.4)'
    ctx.lineWidth = 1
    for (let i = -70; i < 70; i += 15) {
      ctx.beginPath()
      ctx.moveTo(i, 25)
      ctx.lineTo(i + 10, 75)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(i + 10, 25)
      ctx.lineTo(i, 75)
      ctx.stroke()
    }

    ctx.restore()
  }, [])

  const initGame = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current)
    }
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false)
      Matter.Engine.clear(engineRef.current)
    }

    const canvas = canvasRef.current
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    canvas.width = width
    canvas.height = height

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1 } })
    engineRef.current = engine

    const ground = Matter.Bodies.rectangle(width / 2, height - 45, width + 100, 60, {
      isStatic: true,
      label: 'ground',
      friction: 0.9,
    })

    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, label: 'wall' })
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, label: 'wall' })

    Matter.World.add(engine.world, [ground, leftWall, rightWall])

    const baseGroundY = height - 75
    const offsetY = baseGroundY - 500

    targetsRef.current = []
    scoreRef.current = 0
    setScore(0)

    levelConfigRef.current.blocks.forEach(block => {
      const adjustedY = block.y + offsetY

      let body: Matter.Body

      if (block.type === 'target') {
        body = Matter.Bodies.rectangle(block.x, adjustedY, block.w, block.h, {
          label: 'target',
          isStatic: false,
          density: 0.003,
          friction: 0.8,
          restitution: 0.2,
          frictionAir: 0.02,
        })
        targetsRef.current.push(body)
      } else {
        const isStone = block.type === 'stone'
        body = Matter.Bodies.rectangle(block.x, adjustedY, block.w, block.h, {
          label: block.type,
          isStatic: false,
          density: isStone ? 0.008 : 0.004,
          friction: 0.8,
          restitution: isStone ? 0.15 : 0.35,
          frictionAir: 0.005,
        })
      }

      Matter.World.add(engine.world, body)
    })

    const birdRestY = height - 180
    birdsUsedRef.current = 0
    const bird = createBird(engine, 0, true, slingshotPos.x, birdRestY)
    currentBirdRef.current = bird
    birdPosRef.current = { x: slingshotPos.x, y: birdRestY }

    setBirdsLeft(levelConfigRef.current.chukos)
    gameStateRef.current = 'ready'
    setGameState('ready')
    setShowResult(false)
    isDraggingRef.current = false

    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const labels = [pair.bodyA.label, pair.bodyB.label]

        if (labels.includes('bird') && labels.includes('target')) {
          const target = pair.bodyA.label === 'target' ? pair.bodyA : pair.bodyB

          setTimeout(() => {
            if (targetsRef.current.includes(target)) {
              Matter.World.remove(engine.world, target)
              targetsRef.current = targetsRef.current.filter(t => t !== target)
              setScore(prev => {
                scoreRef.current = prev + 1000
                return prev + 1000
              })

              if (targetsRef.current.length === 0) {
                const remaining = levelConfigRef.current.chukos - birdsUsedRef.current
                const stars = calculateStars(remaining, levelConfigRef.current.chukos)
                setEarnedStars(stars)
                gameStateRef.current = 'won'
                setGameState('won')
                setShowResult(true)
              }
            }
          }, 50)
        }

        if (labels.includes('bird') && (labels.includes('wood') || labels.includes('stone'))) {
          const block = pair.bodyA.label !== 'bird' ? pair.bodyA : pair.bodyB
          const bird = pair.bodyA.label === 'bird' ? pair.bodyA : pair.bodyB
          const velocity = bird.velocity
          const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)

          if (speed > 7 && block.label === 'wood') {
            setTimeout(() => {
              Matter.World.remove(engine.world, block)
              setScore(prev => {
                scoreRef.current = prev + 50
                return prev + 50
              })
            }, 100)
          } else if (speed > 12 && block.label === 'stone') {
            setTimeout(() => {
              Matter.World.remove(engine.world, block)
              setScore(prev => {
                scoreRef.current = prev + 100
                return prev + 100
              })
            }, 100)
          }
        }
      })
    })

    const runner = Matter.Runner.create()
    runnerRef.current = runner
    Matter.Runner.run(runner, engine)

    const render = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
      skyGradient.addColorStop(0, '#87CEEB')
      skyGradient.addColorStop(0.5, '#B0E0E6')
      skyGradient.addColorStop(0.8, '#98D1A8')
      skyGradient.addColorStop(1, '#7CB342')
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, width, height)

      drawCloud(ctx, 100, 50, 70)
      drawCloud(ctx, 300, 35, 55)
      drawCloud(ctx, 550, 60, 80)
      drawCloud(ctx, width - 200, 45, 65)
      drawCloud(ctx, width - 400, 70, 50)

      ctx.fillStyle = '#8FAAAA'
      ctx.beginPath()
      ctx.moveTo(0, height - 200)
      ctx.lineTo(200, height - 350)
      ctx.lineTo(400, height - 250)
      ctx.lineTo(600, height - 400)
      ctx.lineTo(800, height - 280)
      ctx.lineTo(1000, height - 380)
      ctx.lineTo(width, height - 300)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(180, height - 330)
      ctx.lineTo(200, height - 350)
      ctx.lineTo(220, height - 330)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(580, height - 380)
      ctx.lineTo(600, height - 400)
      ctx.lineTo(620, height - 380)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(980, height - 360)
      ctx.lineTo(1000, height - 380)
      ctx.lineTo(1020, height - 360)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#6B8E7B'
      ctx.beginPath()
      ctx.moveTo(0, height - 150)
      ctx.quadraticCurveTo(150, height - 250, 300, height - 180)
      ctx.quadraticCurveTo(450, height - 120, 600, height - 160)
      ctx.quadraticCurveTo(750, height - 200, 900, height - 140)
      ctx.quadraticCurveTo(1050, height - 80, width, height - 120)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      drawYurt(ctx, width - 180, height - 180, 0.6)
      drawYurt(ctx, width - 350, height - 150, 0.4)

      ctx.fillStyle = '#7CB342'
      ctx.fillRect(0, height - 75, width, 25)

      ctx.fillStyle = '#8BC34A'
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, height - 70)
        ctx.quadraticCurveTo(i + 5, height - 85, i + 10, height - 70)
        ctx.quadraticCurveTo(i + 15, height - 80, i + 20, height - 70)
        ctx.fill()
      }

      ctx.fillStyle = '#8B7355'
      ctx.fillRect(0, height - 50, width, 60)

      ctx.fillStyle = '#9A8265'
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath()
        ctx.arc(i + 20, height - 30, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      const slX = slingshotPos.x
      const groundY = height - 70
      const forkY = groundY - 110
      const birdRestY = height - 180

      if (currentBirdRef.current && (isDraggingRef.current || gameStateRef.current === 'aiming')) {
        ctx.strokeStyle = '#5D4037'
        ctx.lineWidth = 10
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(slX - 25, forkY - 5)
        ctx.lineTo(birdPosRef.current.x, birdPosRef.current.y)
        ctx.stroke()

        ctx.strokeStyle = '#8B4513'
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(slX - 25, forkY - 5)
        ctx.lineTo(birdPosRef.current.x, birdPosRef.current.y)
        ctx.stroke()
      }

      const bodies = Matter.Composite.allBodies(engine.world)
      bodies.forEach(body => {
        if (body.label === 'ground' || body.label === 'wall') return

        const pos = body.position
        const angle = body.angle

        if (body.label === 'bird') {
          if (!isDraggingRef.current || body !== currentBirdRef.current) {
            const colorIndex = (body as Matter.Body & { colorIndex?: number }).colorIndex || 0
            drawChukoProjectile(ctx, pos.x, pos.y, 22, colorIndex, angle)
          }
        } else if (body.label === 'target') {
          drawTargetChuko(ctx, pos.x, pos.y, 22, angle)
        } else if (body.label === 'wood') {
          ctx.save()
          ctx.translate(pos.x, pos.y)
          ctx.rotate(angle)
          const vertices = body.vertices
          const w = Math.abs(vertices[1].x - vertices[0].x)
          const h = Math.abs(vertices[2].y - vertices[0].y)

          const woodGradient = ctx.createLinearGradient(-w / 2, 0, w / 2, 0)
          woodGradient.addColorStop(0, '#DEB887')
          woodGradient.addColorStop(0.5, '#D2B48C')
          woodGradient.addColorStop(1, '#C4A574')
          ctx.fillStyle = woodGradient
          ctx.fillRect(-w / 2, -h / 2, w, h)

          ctx.strokeStyle = '#B8956C'
          ctx.lineWidth = 1
          const grainSpacing = Math.min(w, h) > 30 ? 8 : 5
          for (let i = -w / 2 + grainSpacing; i < w / 2; i += grainSpacing) {
            ctx.beginPath()
            ctx.moveTo(i, -h / 2)
            ctx.lineTo(i, h / 2)
            ctx.stroke()
          }

          ctx.strokeStyle = '#8B7355'
          ctx.lineWidth = 2
          ctx.strokeRect(-w / 2, -h / 2, w, h)
          ctx.restore()
        } else if (body.label === 'stone') {
          ctx.save()
          ctx.translate(pos.x, pos.y)
          ctx.rotate(angle)
          const vertices = body.vertices
          const w = Math.abs(vertices[1].x - vertices[0].x)
          const h = Math.abs(vertices[2].y - vertices[0].y)

          const stoneGradient = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2)
          stoneGradient.addColorStop(0, '#A0A0A0')
          stoneGradient.addColorStop(0.5, '#808080')
          stoneGradient.addColorStop(1, '#606060')
          ctx.fillStyle = stoneGradient
          ctx.fillRect(-w / 2, -h / 2, w, h)

          ctx.strokeStyle = '#404040'
          ctx.lineWidth = 2
          ctx.strokeRect(-w / 2, -h / 2, w, h)
          ctx.restore()
        }
      })

      drawSlingshot(ctx, slX, slingshotPos.y, groundY)

      if (currentBirdRef.current && (isDraggingRef.current || gameStateRef.current === 'aiming')) {
        const bx = birdPosRef.current.x
        const by = birdPosRef.current.y

        const dx = slX - bx
        const dy = birdRestY - by
        const pullDist = Math.sqrt(dx * dx + dy * dy)
        const power = (pullDist / maxPullDistance) * 0.28
        drawTrajectory(ctx, bx, by, dx * power, dy * power)

        const colorIndex = birdsUsedRef.current % CHUKO_TEAM.length
        drawChukoProjectile(ctx, bx, by, 22, colorIndex)

        ctx.strokeStyle = '#5D4037'
        ctx.lineWidth = 10
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(slX + 25, forkY - 5)
        ctx.lineTo(bx, by)
        ctx.stroke()

        ctx.strokeStyle = '#8B4513'
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(slX + 25, forkY - 5)
        ctx.lineTo(bx, by)
        ctx.stroke()
      } else if (currentBirdRef.current && gameStateRef.current === 'ready') {
        const colorIndex = birdsUsedRef.current % CHUKO_TEAM.length
        drawChukoProjectile(ctx, slX, birdRestY, 22, colorIndex)
      }

      const waitingBirds = levelConfigRef.current.chukos - birdsUsedRef.current - 1
      for (let i = 0; i < waitingBirds && i < 4; i++) {
        const colorIdx = (birdsUsedRef.current + 1 + i) % CHUKO_TEAM.length
        drawChukoProjectile(ctx, 40 + i * 45, groundY - 20, 16, colorIdx)
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      if ('touches' in e && e.touches.length > 0) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        }
      } else if ('changedTouches' in e && e.changedTouches.length > 0) {
        return {
          x: (e.changedTouches[0].clientX - rect.left) * scaleX,
          y: (e.changedTouches[0].clientY - rect.top) * scaleY
        }
      } else if ('clientX' in e) {
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        }
      }
      return { x: 0, y: 0 }
    }

    const onStart = (e: MouseEvent | TouchEvent) => {
      if (gameStateRef.current === 'flying' || gameStateRef.current === 'won' || gameStateRef.current === 'lost') return
      if (!currentBirdRef.current) return

      e.preventDefault()
      const pos = getPos(e)

      const birdRestYLocal = height - 180

      const birdPos = gameStateRef.current === 'ready'
        ? { x: slingshotPos.x, y: birdRestYLocal }
        : birdPosRef.current

      const dist = Math.sqrt((pos.x - birdPos.x) ** 2 + (pos.y - birdPos.y) ** 2)

      if (dist < 80) {
        isDraggingRef.current = true
        birdPosRef.current = { x: pos.x, y: pos.y }
        gameStateRef.current = 'aiming'
        setGameState('aiming')
      }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()

      const pos = getPos(e)
      const birdRestYLocal = height - 180

      const dx = pos.x - slingshotPos.x
      const dy = pos.y - birdRestYLocal
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > maxPullDistance) {
        const angle = Math.atan2(dy, dx)
        birdPosRef.current = {
          x: slingshotPos.x + Math.cos(angle) * maxPullDistance,
          y: birdRestYLocal + Math.sin(angle) * maxPullDistance
        }
      } else {
        birdPosRef.current = { x: pos.x, y: pos.y }
      }
    }

    const onEnd = () => {
      if (!isDraggingRef.current || !currentBirdRef.current || !engineRef.current) return
      isDraggingRef.current = false

      const birdRestYLocal = height - 70 - 110

      const bx = birdPosRef.current.x
      const by = birdPosRef.current.y
      const dx = slingshotPos.x - bx
      const dy = birdRestYLocal - by

      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 20) {
        birdPosRef.current = { x: slingshotPos.x, y: birdRestYLocal }
        gameStateRef.current = 'ready'
        setGameState('ready')
        return
      }

      const oldBird = currentBirdRef.current
      Matter.World.remove(engineRef.current.world, oldBird)

      const colorIndex = birdsUsedRef.current % CHUKO_TEAM.length
      const launchBird = Matter.Bodies.circle(bx, by, 20, {
        label: 'bird',
        isStatic: false,
        density: 0.005,
        friction: 0.6,
        restitution: 0.35,
        frictionAir: 0.01,
      }) as Matter.Body & { colorIndex?: number }
      launchBird.colorIndex = colorIndex
      Matter.World.add(engineRef.current.world, launchBird)
      currentBirdRef.current = launchBird

      const power = (dist / maxPullDistance) * 0.28
      Matter.Body.setVelocity(launchBird, { x: dx * power, y: dy * power })

      birdsUsedRef.current++
      setBirdsLeft(levelConfigRef.current.chukos - birdsUsedRef.current)
      gameStateRef.current = 'flying'
      setGameState('flying')

      setTimeout(() => checkBirdStopped(), 2000)
    }

    const checkBirdStopped = () => {
      const checkInterval = setInterval(() => {
        if (!currentBirdRef.current || !engineRef.current) {
          clearInterval(checkInterval)
          return
        }

        if (targetsRef.current.length === 0) {
          clearInterval(checkInterval)
          return
        }

        const vel = currentBirdRef.current.velocity
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2)
        const pos = currentBirdRef.current.position

        if (speed < 0.3 || pos.x > width + 50 || pos.y > height + 50) {
          clearInterval(checkInterval)

          if (targetsRef.current.length === 0) {
            const remaining = levelConfigRef.current.chukos - birdsUsedRef.current
            const stars = calculateStars(remaining, levelConfigRef.current.chukos)
            setEarnedStars(stars)
            gameStateRef.current = 'won'
            setGameState('won')
            setShowResult(true)
            return
          }

          if (birdsUsedRef.current >= levelConfigRef.current.chukos) {
            gameStateRef.current = 'lost'
            setGameState('lost')
            setShowResult(true)
            return
          }

          const birdRestYSpawn = height - 180
          const newBird = createBird(engineRef.current, birdsUsedRef.current, true, slingshotPos.x, birdRestYSpawn)
          currentBirdRef.current = newBird
          birdPosRef.current = { x: slingshotPos.x, y: birdRestYSpawn }
          gameStateRef.current = 'ready'
          setGameState('ready')
        }
      }, 150)
    }

    canvas.addEventListener('mousedown', onStart)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
    canvas.addEventListener('touchstart', onStart, { passive: false })
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)

    return () => {
      canvas.removeEventListener('mousedown', onStart)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      canvas.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [level, calculateStars, drawChukoProjectile, drawTargetChuko, drawSlingshot, drawCloud, drawYurt, drawTrajectory])

  const createBird = (engine: Matter.Engine, index: number, isStatic: boolean = false, posX?: number, posY?: number) => {
    const x = posX ?? slingshotPos.x
    const y = posY ?? slingshotPos.y - 100
    const bird = Matter.Bodies.circle(x, y, 20, {
      label: 'bird',
      isStatic: isStatic,
      density: 0.005,
      friction: 0.6,
      restitution: 0.35,
      frictionAir: 0.01
    }) as Matter.Body & { colorIndex?: number }
    bird.colorIndex = index
    Matter.World.add(engine.world, bird)
    return bird
  }

  useEffect(() => {
    const cleanup = initGame()
    return () => {
      cleanup?.()
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
    }
  }, [initGame])

  const resetGame = () => {
    initGame()
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: 'none' }} />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="w-14 h-14 rounded-full flex items-center justify-center transform hover:scale-110 active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
            boxShadow: '0 4px 0 #B8700A, 0 6px 10px rgba(0,0,0,0.3)',
            border: '3px solid #B8700A'
          }}
        >
          <ArrowLeft className="w-7 h-7 text-amber-900" />
        </button>

        <div
          className="px-8 py-3 rounded-2xl"
          style={{
            background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
            boxShadow: '0 4px 0 #B8700A',
            border: '3px solid #B8700A'
          }}
        >
          <span className="text-3xl font-bold text-amber-100" style={{ fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {score}
          </span>
        </div>

        <button
          onClick={resetGame}
          className="w-14 h-14 rounded-full flex items-center justify-center transform hover:scale-110 active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
            boxShadow: '0 4px 0 #B8700A, 0 6px 10px rgba(0,0,0,0.3)',
            border: '3px solid #B8700A'
          }}
        >
          <RotateCcw className="w-7 h-7 text-amber-900" />
        </button>
      </div>

      <div
        className="absolute bottom-4 right-4 px-5 py-3 rounded-xl z-10"
        style={{ background: 'rgba(93, 64, 55, 0.9)', border: '3px solid #3E2723' }}
      >
        <span className="text-2xl font-bold text-amber-100" style={{ fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif" }}>
          {t.level} {level}
        </span>
      </div>

      <div
        className="absolute bottom-4 left-4 px-5 py-3 rounded-xl z-10"
        style={{ background: 'rgba(93, 64, 55, 0.9)', border: '3px solid #3E2723' }}
      >
        <span className="text-2xl font-bold text-amber-100" style={{ fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif" }}>
          x{birdsLeft}
        </span>
      </div>

      {gameState === 'ready' && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-center">
          <div className="bg-black/60 px-6 py-3 rounded-xl backdrop-blur-sm">
            <p className="text-white text-lg font-medium" style={{ fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif" }}>
              {t.dragHint}
            </p>
          </div>
        </div>
      )}

      {showResult && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
          <div
            className="p-10 rounded-3xl text-center max-w-md mx-4 animate-in zoom-in-95 duration-300"
            style={{
              background: 'linear-gradient(to bottom, #FFF8DC, #DEB887)',
              boxShadow: '0 8px 0 #8B7355, 0 15px 40px rgba(0,0,0,0.5)',
              border: '5px solid #8B7355'
            }}
          >
            <h2
              className="text-5xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif",
                color: gameState === 'won' ? '#27AE60' : '#C0392B',
                textShadow: '3px 3px 6px rgba(0,0,0,0.2)'
              }}
            >
              {gameState === 'won' ? t.victory : t.tryAgain}
            </h2>

            {gameState === 'won' && (
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3].map(i => (
                  <Star
                    key={i}
                    className="w-16 h-16 transition-all duration-300"
                    style={{
                      transform: i <= earnedStars ? 'scale(1.1)' : 'scale(1)',
                      filter: i <= earnedStars ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                    }}
                    fill={i <= earnedStars ? '#FFD700' : 'transparent'}
                    stroke={i <= earnedStars ? '#B8860B' : '#B8860B'}
                    strokeWidth={2}
                  />
                ))}
              </div>
            )}

            <p className="text-3xl mb-8" style={{ fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif", color: '#5D4037' }}>
              {t.score}: {score}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 transform hover:scale-105 active:scale-95 transition-transform"
                style={{
                  fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif",
                  background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
                  color: '#5D4037',
                  boxShadow: '0 4px 0 #B8700A',
                  border: '3px solid #B8700A'
                }}
              >
                <RotateCcw className="w-6 h-6" /> {t.retry}
              </button>

              {gameState === 'won' && (
                <button
                  onClick={() => onComplete(earnedStars, scoreRef.current)}
                  className="px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 transform hover:scale-105 active:scale-95 transition-transform"
                  style={{
                    fontFamily: "var(--font-fredoka), 'Fredoka', sans-serif",
                    background: 'linear-gradient(to bottom, #2ECC71, #27AE60)',
                    color: 'white',
                    boxShadow: '0 4px 0 #1E8449',
                    border: '3px solid #1E8449'
                  }}
                >
                  <Play className="w-6 h-6" /> {t.continue}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}