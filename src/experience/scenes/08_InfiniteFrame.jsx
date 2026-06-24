import React, { useRef } from 'react'
import { KineticText } from '../dom/typography/KineticText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Scene08() {
  const shutterRef = useRef()

  useGSAP(() => {
    // Mechanical shutter closing effect to black
    gsap.fromTo(shutterRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      {
        clipPath: 'circle(150% at 50% 50%)',
        ease: 'power3.in',
        scrollTrigger: { trigger: '.scene-08', start: 'top top', end: 'bottom bottom', scrub: true }
      }
    )
  })

  return (
    <section className="scene scene-08">
      {/* The shutter overlay that closes over the 3D scene */}
      <div 
        ref={shutterRef}
        style={{
          position: 'absolute', // Absolute to the scene since scene is fixed/pinned
          top: 0, left: '-100vw', width: '300vw', height: '300vh',
          transform: 'translate(-50vw, -50vh)',
          backgroundColor: '#050505',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div className="scene-content center">
        <KineticText tag="h1" scrollTriggerTarget=".scene-08">The Infinite Frame</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-08" delay={0.2}>Moments fade. Stories stay.</KineticText>
      </div>
    </section>
  )
}
