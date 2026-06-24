import React, { useRef, useEffect } from 'react'
import { KineticText } from '../dom/typography/KineticText'
import gsap from 'gsap'

export function Scene01() {
  const headlineRef = useRef()

  useEffect(() => {
    if (!headlineRef.current) return
    // Variable font weight: 200 → 700 on entrance
    gsap.fromTo(
      headlineRef.current,
      { fontVariationSettings: '"wght" 200', opacity: 0 },
      {
        fontVariationSettings: '"wght" 700',
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
        delay: 0.2
      }
    )
  }, [])

  return (
    <section className="scene scene-01" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="scene-content center" style={{ marginTop: '-5vh' }}>
        <h1
          ref={headlineRef}
          style={{ fontFamily: 'Playfair Display, serif', opacity: 0 }}
          aria-label="The Observer"
        >
          The<br />Observer
        </h1>
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-01"
          delay={0.8}
          style={{ marginTop: '3rem', fontSize: 'clamp(0.8rem, 1vw, 1rem)', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5 }}
        >
          Every story begins with a moment.
        </KineticText>
      </div>

      {/* Animated floating arrow — replaces generic scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-indicator__arrow">↓</span>
      </div>
    </section>
  )
}
