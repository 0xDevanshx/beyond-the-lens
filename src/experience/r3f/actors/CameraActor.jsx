import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { CONFIG } from '../../config'

gsap.registerPlugin(ScrollTrigger)

export function CameraActor({ id, url }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const originalY = useRef(0)
  const mouseTarget = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    // Preload the specific model immediately
    useGLTF.preload(url)
  }, [url])

  useFrame((state) => {
    if (!groupRef.current) return

    if (id === 'ancient') {
      // Character 01: Slow Y-axis breathing sine wave
      groupRef.current.position.y = originalY.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.rotation.y += 0.0005 // almost imperceptible rotation
    } else if (id === 'vintage') {
      // Character 02: Active, orbits slightly, reacts to mouse
      mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, (state.mouse.x * Math.PI) / 10, 0.05)
      mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, (state.mouse.y * Math.PI) / 10, 0.05)
      
      // We apply the tracking to rotation, but don't overwrite the GSAP rotation completely
      // GSAP controls group rotation, so we apply mouse tracking to the scene object inside the group
      scene.rotation.x = -mouseTarget.current.y
      scene.rotation.y = mouseTarget.current.x
    }
  })

  useGSAP(() => {
    if (!groupRef.current) return

    // Convert scroll heights to viewport percentages for GSAP ScrollTrigger start/end
    // total scroll is CONFIG.scroll.totalHeight vh
    
    // We'll set up absolute triggers based on viewport heights
    // For example, 100vh = window.innerHeight pixels
    // Since GSAP triggers are relative to the trigger element, we can use the main wrapper
    // or just absolute scroll positions if we use end: "+=1000" etc.
    
    // For simplicity, since NarrativeTrack creates .scene elements, 
    // we can use `.scene-0X` as triggers.
    
    if (id === 'ancient') {
      // Scene 02: Emerges from fog on the left side
      gsap.set(groupRef.current.position, { x: -3, y: -2, z: -5 })
      gsap.set(groupRef.current.scale, { x: 0.6, y: 0.6, z: 0.6 })
      
      gsap.to(groupRef.current.position, {
        x: -1.5, y: -0.5, z: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Scene 02: Ancient camera — 90° turn, not full 360° (felt mechanical)
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Scene 03: Optical Dissolve fade out
      gsap.to(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        ease: 'power2.in',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'center center', scrub: true }
      })
    } 
    else if (id === 'vintage') {
      gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 })
      gsap.set(groupRef.current.position, { x: 5, y: 0, z: -2 })
      
      // Gather meshes for explosion
      const meshes = []
      scene.traverse(child => { if (child.isMesh) meshes.push(child) })
      
      // Scene 03: Vintage camera fades in — scale 1.8x gives 'Practice.' room to breathe
      gsap.to(groupRef.current.scale, {
        x: 1.8, y: 1.8, z: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'center center', scrub: true }
      })
      gsap.to(groupRef.current.position, {
        x: 0, y: 0, z: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      // Scene 04: Frame Factory Orbit + Exploded View
      gsap.to(groupRef.current.position, {
        x: -1,
        y: 0,
        z: -1,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(groupRef.current.scale, {
        x: 1.5, y: 1.5, z: 1.5, // Scale down to make room for the explosion
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        x: Math.PI / 4,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      meshes.forEach(mesh => {
        if (!mesh.userData.origPos) mesh.userData.origPos = mesh.position.clone()
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(3.0) // Increase explosion radius
        
        // Exploded view
        gsap.to(mesh.position, {
          x: mesh.userData.origPos.x + dir.x,
          y: mesh.userData.origPos.y + dir.y,
          z: mesh.userData.origPos.z + dir.z,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.scene-04', start: 'top center', end: 'bottom top', scrub: true }
        })
      })

      // Scene 05: Time-Remapped Kinetic Burst
      const burstTl = gsap.timeline({
        scrollTrigger: { 
          trigger: '.scene-05', 
          start: 'top center', 
          toggleActions: 'play none none reverse' 
        }
      })
      
      meshes.forEach(mesh => {
        const burstDir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(15)
        
        // Sudden burst
        burstTl.to(mesh.position, {
          x: mesh.position.x + burstDir.x,
          y: mesh.position.y + burstDir.y,
          z: mesh.position.z + burstDir.z,
          duration: 0.2,
          ease: 'power4.out'
        }, 0)
        
        // Slow motion drift
        burstTl.to(mesh.position, {
          x: mesh.position.x + burstDir.x * 1.5,
          y: mesh.position.y + burstDir.y * 1.5,
          z: mesh.position.z + burstDir.z * 1.5,
          duration: 10,
          ease: 'none'
        }, 0.2)
      })

      // Fade out for Scene 06
      gsap.to(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        ease: 'power2.in',
        scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
      })
    } 
    else if (id === 'modern') {
      gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 })
      // Clean vertical entrance — no z-fight from diagonal rise
      gsap.set(groupRef.current.position, { y: -3, z: 0 })
      
      // Scene 06: Modern Vision
      gsap.to(groupRef.current.scale, {
        x: 3, y: 3, z: 3,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
      })
      gsap.to(groupRef.current.position, {
        x: 3, y: 0, z: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.to(groupRef.current.rotation, {
        y: -Math.PI / 4,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      // Scene 07: Move to left to clear space for text
      gsap.to(groupRef.current.position, {
        x: -4,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'center center', scrub: true }
      })
      // Scene 08: Infinite Frame (scales up massively)
      gsap.to(groupRef.current.scale, {
        x: 100, y: 100, z: 100,
        ease: 'power4.in',
        scrollTrigger: { trigger: '.scene-08', start: 'top center', end: 'bottom bottom', scrub: true }
      })
    }
  }, { dependencies: [id] })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/1.glb')
useGLTF.preload('/2.glb')
useGLTF.preload('/3.glb')
