import React, { useRef, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function StoryCamera() {
  const cameraRef = useRef()
  const { set } = useThree()

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current })
    }
  }, [set])

  useGSAP(() => {
    if (!cameraRef.current) return

    // Setup initial camera state
    gsap.set(cameraRef.current.position, { x: 0, y: 0, z: 8 })

    // Scene 02: Macro push-in on Ancient Camera
    gsap.to(cameraRef.current.position, {
      z: 3,
      ease: 'power1.inOut',
      scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'center center', scrub: true }
    })

    // Scene 04: Orbit around Vintage Camera
    gsap.to(cameraRef.current.position, {
      x: 5, z: 5,
      ease: 'sine.inOut',
      scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
    })

    // Scene 06: Pull-out for Modern Camera Hero Shot
    gsap.to(cameraRef.current.position, {
      x: 0, z: 12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
    })
    
    // Scene 07: Parallax dive happens by moving ContentUniverse, not camera.
    // So camera stays relatively stable here to avoid double-motion sickness.

  })

  return (
    <PerspectiveCamera makeDefault ref={cameraRef} fov={45} near={0.1} far={1000} />
  )
}
