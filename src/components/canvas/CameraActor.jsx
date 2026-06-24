import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function CameraActor({ id, url, chapter, ...props }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()

  useGSAP(() => {
    if (!groupRef.current) return

    // Setup initial states based on which camera this is
    if (id === 'camera-1') {
      gsap.set(groupRef.current.position, { y: -2, z: -5 })
      gsap.set(groupRef.current.scale, { x: 1, y: 1, z: 1 })
      
      gsap.to(groupRef.current.position, {
        y: 0, z: 0,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Fade out when entering chapter 2
      gsap.to(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        ease: 'power2.in',
        scrollTrigger: { trigger: '.chapter-2', start: 'top bottom', end: 'top center', scrub: true }
      })
    } else if (id === 'camera-2') {
      gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 })
      gsap.set(groupRef.current.position, { x: 5, y: 0, z: -2 })
      
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'top center', scrub: true }
      })
      gsap.to(groupRef.current.position, {
        x: -2, y: 0, z: 2,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(groupRef.current.rotation, {
        x: Math.PI, z: Math.PI / 4,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Fade out when entering chapter 3
      gsap.to(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        ease: 'power2.in',
        scrollTrigger: { trigger: '.chapter-3', start: 'top bottom', end: 'top center', scrub: true }
      })
    } else if (id === 'camera-3') {
      gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 })
      gsap.set(groupRef.current.position, { y: -5, z: -10 })
      
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'top center', scrub: true }
      })
      gsap.to(groupRef.current.position, {
        y: 0, z: 3,
        ease: 'power2.out',
        scrollTrigger: { trigger: chapter, start: 'top center', end: 'bottom bottom', scrub: true }
      })
      gsap.to(groupRef.current.rotation, {
        y: -Math.PI / 2,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    }
  }, { dependencies: [id, chapter] })

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/1.glb')
useGLTF.preload('/2.glb')
useGLTF.preload('/3.glb')
