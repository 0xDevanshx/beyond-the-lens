import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLenis } from 'lenis/react'

const CHAPTERS = [
  { label: 'Observer', scene: '.scene-01', top: 0 },
  { label: 'First Lens', scene: '.scene-02', top: 125 },
  { label: 'Practice', scene: '.scene-03', top: 250 },
  { label: 'Frame Factory', scene: '.scene-04', top: 400 },
  { label: 'Finding A Voice', scene: '.scene-05', top: 525 },
  { label: 'Modern Vision', scene: '.scene-06', top: 675 },
  { label: 'Impact', scene: '.scene-07', top: 800 },
  { label: 'Infinite Frame', scene: '.scene-08', top: 925 },
]

export function ChapterNav() {
  const [active, setActive] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      const scrollVh = (window.scrollY / window.innerHeight) * 100
      let current = 0
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (scrollVh >= CHAPTERS[i].top - 20) current = i
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (index) => {
    const target = CHAPTERS[index].top
    const px = (target / 100) * window.innerHeight
    if (lenis) {
      lenis.scrollTo(px, { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: px, behavior: 'smooth' })
    }
  }

  return (
    <nav className="chapter-nav" aria-label="Chapter navigation">
      {CHAPTERS.map((chapter, i) => (
        <button
          key={chapter.label}
          className={`chapter-nav__dot ${i === active ? 'active' : ''}`}
          data-label={chapter.label}
          onClick={() => scrollTo(i)}
          aria-label={`Go to ${chapter.label}`}
          style={{ cursor: 'pointer', pointerEvents: 'all' }}
        />
      ))}
    </nav>
  )
}
