import React, { useRef } from 'react'
import { KineticText } from '../dom/typography/KineticText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Scene08() {
  const contentRef = useRef()
  const identityRef = useRef()

  useGSAP(() => {
    // Text dissolves as camera consumes viewport — triggers in the second half of scene scroll
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      ease: 'power2.in',
      scrollTrigger: { trigger: '.scene-08', start: 'center top', end: 'bottom center', scrub: true }
    })

    // Identity + CTA fades IN as headline fades out — the payoff
    gsap.fromTo(identityRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scene-08',
          start: '60% top',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  return (
    <section
      className="scene scene-08"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
    >
      {/* Main headline — dissolves into the 100x camera zoom */}
      <div ref={contentRef} className="scene-content center">
        <KineticText tag="h1" scrollTriggerTarget=".scene-08">
          The Infinite<br />Frame
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-08" delay={0.3}>
          Moments fade. Stories stay.
        </KineticText>
      </div>

      {/* Identity reveal + CTA — fades in as headline dissolves */}
      <div
        ref={identityRef}
        className="scene-08-identity"
        style={{ opacity: 0, pointerEvents: 'all' }}
      >
        <p className="identity-name">Visual Storyteller</p>
        <p className="identity-tagline">Available for creative collaboration</p>
        <a
          href="mailto:hello@visualstoryteller.com"
          className="identity-cta"
          aria-label="Send an email"
        >
          Let's create together →
        </a>
      </div>
    </section>
  )
}
