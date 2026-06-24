import React, { useRef } from 'react'
import { KineticText } from '../dom/typography/KineticText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Scene08() {
  const shutterRef = useRef()
  const contentRef = useRef()

  useGSAP(() => {
    // Mechanical shutter: circle iris opens (reveals the world)
    gsap.fromTo(shutterRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      {
        clipPath: 'circle(150% at 50% 50%)',
        ease: 'power3.in',
        scrollTrigger: { trigger: '.scene-08', start: 'top top', end: '60% bottom', scrub: true }
      }
    )

    // Text dissolves as camera consumes viewport — triggers in the second half of scene scroll
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      ease: 'power2.in',
      scrollTrigger: { trigger: '.scene-08', start: 'center top', end: 'bottom center', scrub: true }
    })
  })

  return (
    <section
      className="scene scene-08"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
    >
      {/* Shutter overlay that closes over the 3D scene */}
      <div
        ref={shutterRef}
        style={{
          position: 'absolute',
          top: 0, left: '-100vw', width: '300vw', height: '300vh',
          transform: 'translate(-50vw, -50vh)',
          backgroundColor: '#050505',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* Content that dissolves into the camera zoom */}
      <div ref={contentRef} className="scene-content center">
        <KineticText tag="h1" scrollTriggerTarget=".scene-08">
          The Infinite<br />Frame
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-08" delay={0.3}>
          Moments fade. Stories stay.
        </KineticText>
      </div>
    </section>
  )
}
