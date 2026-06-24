import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function ApertureCursor() {
  const outerRef = useRef()
  const dotRef = useRef()
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    // Lagged outer ring
    const tick = () => {
      const p = pos.current
      p.cx += (p.x - p.cx) * 0.12
      p.cy += (p.y - p.cy) * 0.12
      if (outerRef.current) {
        gsap.set(outerRef.current, { x: p.cx, y: p.cy })
      }
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: p.x, y: p.y })
      }
    }

    const onEnter = () => outerRef.current?.classList.add('is-hovering')
    const onLeave = () => outerRef.current?.classList.remove('is-hovering')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
