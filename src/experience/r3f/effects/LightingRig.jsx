import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function LightingRig() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()

  useGSAP(() => {
    // Initial Setup
    gsap.set(ambientRef.current, { intensity: 0.2 })
    gsap.set(directionalRef.current, { intensity: 0 })
    gsap.set(pointRef.current, { intensity: 2, distance: 10 })
    gsap.set(pointRef.current.position, { x: -5, y: 5, z: 2 })

    // Scene 01/02: Warm sweep
    gsap.to(pointRef.current.position, {
      x: 5,
      ease: 'none',
      scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom top', scrub: true }
    })

    // Scene 03/04: Cooler fill lights / increased contrast
    gsap.to(ambientRef.current, {
      intensity: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'center center', scrub: true }
    })
    
    // Scene 05: Breakthrough Flash
    const flashTl = gsap.timeline({
      scrollTrigger: { trigger: '.scene-05', start: 'top center', toggleActions: 'play none none reverse' }
    })
    flashTl.to(directionalRef.current, { intensity: 10, duration: 0.1, ease: 'power4.out' })
           .to(directionalRef.current, { intensity: 2, duration: 1, ease: 'power2.inOut' })

    // Scene 06: Studio lighting
    gsap.to(directionalRef.current.position, {
      x: 5, y: 5, z: 5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
    })

    // Scene 08: Fade to black
    gsap.to([ambientRef.current, directionalRef.current, pointRef.current], {
      intensity: 0,
      ease: 'power4.in',
      scrollTrigger: { trigger: '.scene-08', start: 'top center', end: 'bottom bottom', scrub: true }
    })

  })

  return (
    <group>
      <ambientLight ref={ambientRef} color="#ffffff" />
      <directionalLight ref={directionalRef} color="#ffffff" position={[0, 10, 0]} />
      <pointLight ref={pointRef} color="#ffb07a" />
    </group>
  )
}
