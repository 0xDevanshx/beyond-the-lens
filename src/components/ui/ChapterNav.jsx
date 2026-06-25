import React, { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

const CHAPTERS = [
  { label: 'Observer', scene: '.scene-01' },
  { label: 'First Lens', scene: '.scene-02' },
  { label: 'Practice', scene: '.scene-03' },
  { label: 'Frame Factory', scene: '.scene-04' },
  { label: 'Finding A Voice', scene: '.scene-05' },
  { label: 'Modern Vision', scene: '.scene-06' },
  { label: 'Impact', scene: '.scene-07' },
  { label: 'Infinite Frame', scene: '.scene-08' },
]

export function ChapterNav() {
  const [active, setActive] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    const observers = []
    const sections = CHAPTERS.map((c, i) => ({ el: document.querySelector(c.scene), index: i }))
      .filter(s => s.el !== null)

    // Use IntersectionObserver for accurate detection of which section is in view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex(s => s.el === entry.target)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      {
        rootMargin: '-40% 0px -40% 0px', // activate when section center is roughly in view
        threshold: 0,
      }
    )

    sections.forEach(s => io.observe(s.el))
    observers.push(io)

    // Fallback: always activate last chapter at bottom of page
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (atBottom) setActive(CHAPTERS.length - 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (index) => {
    const el = document.querySelector(CHAPTERS[index].scene)
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
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
