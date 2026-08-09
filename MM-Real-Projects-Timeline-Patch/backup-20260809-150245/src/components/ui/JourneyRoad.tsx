import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'

export const ROAD_PATH = [
  'M 100 0',
  'C 100 28 40 38 40 70',
  'C 40 118 160 148 160 190',
  'C 160 234 40 272 40 305',
  'C 40 367 160 400 160 435',
  'C 160 486 40 516 40 550',
  'C 40 607 160 642 160 675',
  'C 160 727 40 764 40 795',
  'C 40 850 160 882 160 915',
  'C 160 952 100 970 100 1000',
].join(' ')

export const MILESTONE_COORDS = [
  { x: 40, y: 70 },
  { x: 160, y: 190 },
  { x: 40, y: 305 },
  { x: 160, y: 435 },
  { x: 40, y: 550 },
  { x: 160, y: 675 },
  { x: 40, y: 795 },
  { x: 160, y: 915 },
]

export const MILESTONE_PROGRESS = [
  0.08, 0.20, 0.31, 0.42, 0.53, 0.64, 0.75, 0.86,
]

interface JourneyRoadProps {
  progress: MotionValue<number>
  className?: string
}

export function JourneyRoad({ progress, className }: JourneyRoadProps) {
  const measureRef = useRef<SVGPathElement>(null)
  const [head, setHead] = useState({ x: 100, y: 0 })

  const dashOffset = useTransform(progress, [0, 1], [1, 0])
  const lightOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  useMotionValueEvent(progress, 'change', (v) => {
    if (measureRef.current) {
      try {
        const len = measureRef.current.getTotalLength()
        const pt = measureRef.current.getPointAtLength(v * len)
        setHead({ x: pt.x, y: pt.y })
      } catch {
        /* empty */
      }
    }
  })

  return (
    <svg
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="roadShadow"
          x="-30%"
          y="-10%"
          width="160%"
          height="120%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#0F172A"
            floodOpacity="0.10"
          />
        </filter>

        <filter id="lightGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="activeRoadGrad"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#419DF0" />
          <stop offset="35%" stopColor="#388FE8" />
          <stop offset="70%" stopColor="#2387E4" />
          <stop offset="100%" stopColor="#0E5FA8" />
        </linearGradient>

        <radialGradient
          id="travelGlow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#419DF0" stopOpacity="0.50" />
          <stop offset="30%" stopColor="#419DF0" stopOpacity="0.20" />
          <stop offset="60%" stopColor="#419DF0" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#419DF0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={ROAD_PATH}
        fill="none"
        stroke="rgba(15,23,42,0.04)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#roadShadow)"
        transform="translate(0, 4)"
      />

      <path
        d={ROAD_PATH}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <motion.path
        d={ROAD_PATH}
        fill="none"
        stroke="url(#activeRoadGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: '1',
          strokeDashoffset: dashOffset,
        }}
      />

      <motion.circle
        cx={head.x}
        cy={head.y}
        r="22"
        fill="url(#travelGlow)"
        style={{ opacity: lightOpacity }}
      />

      <motion.circle
        cx={head.x}
        cy={head.y}
        r="5"
        fill="#FFFFFF"
        filter="url(#lightGlow)"
        style={{ opacity: lightOpacity }}
      />

      <motion.circle
        cx={head.x}
        cy={head.y}
        r="3"
        fill="#419DF0"
        style={{ opacity: lightOpacity }}
      />

      <path ref={measureRef} d={ROAD_PATH} fill="none" stroke="none" />
    </svg>
  )
}
