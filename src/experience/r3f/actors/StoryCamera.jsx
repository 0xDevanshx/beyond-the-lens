import React, { useRef, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function StoryCamera() {
  const cameraRef = useRef()
  const { set, viewport } = useThree()
  
  // Responsive multiplier: push camera further back on portrait screens
  const m = viewport.aspect < 1 ? 1.8 : 1

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current })
    }
  }, [set])

  useGSAP(() => {
    if (!cameraRef.current) return

    // Setup initial camera state
    gsap.set(cameraRef.current.position, { x: 0, y: 0, z: 8 * m })

    // Scene 02: Macro push-in on Ancient Camera
    gsap.fromTo(cameraRef.current.position, 
      { z: 8 * m },
      {
        z: 3 * m,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'center center', scrub: 1 }
      }
    )

    // Scene 04: Orbit around Vintage Camera
    gsap.fromTo(cameraRef.current.position, 
      { x: 0, z: 3 * m }, // start from Scene 02 end state
      {
        x: 5 * m, z: 5 * m,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
      }
    )

    // Scene 05: Gentle drift back toward frontal as burst fires
    // Camera should not remain parked at the Scene 04 orbit position through all 150vh
    gsap.fromTo(cameraRef.current.position, 
      { x: 5 * m, z: 5 * m }, // start from Scene 04 end state
      {
        x: 1 * m, z: 6 * m,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: '.scene-05', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
      }
    )

    // Scene 06: Push slightly IN for Modern Camera Hero Shot (not a retreat)
    gsap.fromTo(cameraRef.current.position, 
      { x: 1 * m, z: 6 * m }, // start from Scene 05 end state
      {
        x: 0, z: 4 * m,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: 1 }
      }
    )
    
    // Scene 07: Parallax dive happens by moving ContentUniverse, not camera.
    // So camera stays relatively stable here to avoid double-motion sickness.

  }, { dependencies: [m] })

  return (
    <PerspectiveCamera makeDefault ref={cameraRef} fov={45} near={0.5} far={500} />
  )
}
