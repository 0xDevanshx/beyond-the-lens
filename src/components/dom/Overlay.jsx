import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Overlay() {
  const containerRef = useRef()

  useGSAP(() => {
    // We need to wait for SplitType, so we'll do a simple split text manually
    // or use CSS clip-path for now to avoid extra dependencies.
    // Let's use a simple opacity/y transform stagger for letters.
    
    const chapters = document.querySelectorAll('.chapter')
    
    chapters.forEach((chapter, i) => {
      const heading = chapter.querySelector('h1')
      const text = chapter.querySelector('p')
      const bgColor = chapter.dataset.bg
      const fgColor = chapter.dataset.fg
      
      // Color transition
      gsap.set([heading, text], { willChange: 'transform, opacity' })
      
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to(document.documentElement, { '--sc-bg': bgColor, '--sc-fg': fgColor, duration: 1, ease: 'power2.inOut' }),
        onEnterBack: () => gsap.to(document.documentElement, { '--sc-bg': bgColor, '--sc-fg': fgColor, duration: 1, ease: 'power2.inOut' }),
      })

      // Text Entrance
      gsap.fromTo(heading, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 70%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
      
      gsap.fromTo(text, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          delay: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 70%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    })
  }, { dependencies: [] })

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', zIndex: 10 }}>
      {/* Chapter 1: Curiosity */}
      <section className="chapter chapter-1" data-bg="oklch(95% 0.02 80)" data-fg="oklch(85% 0.05 70)">
        <div className="content">
          <h1>Curiosity</h1>
          <p>Before we could speak, we sought to capture the light.</p>
        </div>
      </section>

      {/* Chapter 2: Experimentation */}
      <section className="chapter chapter-2" data-bg="oklch(55% 0.12 40)" data-fg="oklch(65% 0.15 45)">
        <div className="content">
          <h1>Experimentation</h1>
          <p>The courage to fracture reality and assemble it anew.</p>
        </div>
      </section>

      {/* Chapter 3: Mastery */}
      <section className="chapter chapter-3" data-bg="oklch(25% 0.01 250)" data-fg="oklch(75% 0.14 75)">
        <div className="content">
          <h1>Mastery</h1>
          <p>When the tool disappears, only the story remains.</p>
        </div>
      </section>
    </div>
  )
}
