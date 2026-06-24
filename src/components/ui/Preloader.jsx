import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Preloader({ onComplete }) {
  const ref = useRef()

  useEffect(() => {
    // Dismiss after 2.2s with upward wipe
    const timer = setTimeout(() => {
      gsap.to(ref.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          if (onComplete) onComplete()
        }
      })
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__aperture" />
      <div className="preloader__bar" />
      <p className="preloader__label">Loading the story</p>
    </div>
  )
}
