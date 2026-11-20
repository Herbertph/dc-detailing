import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { clampPercent } from '../lib/slider'

interface Props {
  title: string
  before: string
  after: string
}

const STEP = 5

export function BeforeAfterSlider({ title, before, after }: Props) {
  const [value, setValue] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const moveTo = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    setValue(clampPercent(Math.round(((clientX - rect.left) / rect.width) * 100)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX)
  }
  const stopDragging = () => {
    dragging.current = false
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const next = { ArrowLeft: value - STEP, ArrowDown: value - STEP, ArrowRight: value + STEP, ArrowUp: value + STEP, Home: 0, End: 100 }[
      e.key
    ]
    if (next === undefined) return
    e.preventDefault()
    setValue(clampPercent(next))
  }

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-md bg-brand-bg"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <img src={after} alt={`After: ${title}`} width={800} height={600} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={`Before: ${title}`}
        width={800}
        height={600}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      />
      <span className="absolute left-3 top-3 rounded bg-black/75 px-2 py-1 text-xs font-bold tracking-wider text-white">BEFORE</span>
      <span className="absolute right-3 top-3 rounded bg-brand-primary px-2 py-1 text-xs font-bold tracking-wider text-white">AFTER</span>
      <div aria-hidden="true" className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${value}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Before and after comparison: ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}% before`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-brand-primary text-white shadow-lg"
        style={{ left: `${value}%` }}
      >
        <span aria-hidden="true" className="text-sm font-bold">
          ⇆
        </span>
      </div>
    </div>
  )
}
