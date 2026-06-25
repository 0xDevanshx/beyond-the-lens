import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

export function Preloader({ onComplete }) {
  const ref = useRef()
  const { progress } = useProgress()
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (progress === 100 && !hasTriggered) {
      // Add a slight safety delay (0.8s) so the user sees the 100% state briefly
      const timer = setTimeout(() => {
        setHasTriggered(true)
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [progress, hasTriggered, onComplete])

  return (
    <div ref={ref} className="preloader" role="status" aria-live="polite" aria-label="Loading experience">
      <div className="preloader__aperture" />
      <div className="preloader__bar" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'white', transition: 'width 0.3s ease' }} />
      </div>
      <p className="preloader__label">Loading the story</p>
    </div>
  )
}
