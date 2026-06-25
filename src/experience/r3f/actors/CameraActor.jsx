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
  const burstDir = useRef(new THREE.Vector3())
  const modernBreath = useRef({ intensity: 0 })
  const mouseTarget = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    if (scene) {
      scene.traverse(child => {
        if (child.isMesh) {
          child.frustumCulled = false // F9.5: Prevent meshes from disappearing when parent group moves/scales
          if (child.material) {
            if (child.material.transparent) {
              child.material.depthWrite = false
              child.renderOrder = 1 // Draw after particles (0) and atmosphere (-1)
            } else {
              child.material.depthWrite = true
              child.renderOrder = 1
            }
          }
        }
      })
    }
  }, [scene])

  useFrame((state) => {
    if (!groupRef.current) return

    if (id === 'ancient') {
      // Y-axis breathing: reads from originalY.current which GSAP tweens independently
      // Removed rotation.y += 0.0005 — conflicts with GSAP scrub on same property
      groupRef.current.position.y = originalY.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
    } else if (id === 'vintage') {
      // Character 02: reacts to mouse — applied to inner scene, not group (GSAP controls group)
      mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, (state.mouse.x * Math.PI) / 10, 0.05)
      mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, (state.mouse.y * Math.PI) / 10, 0.05)
      
      scene.rotation.x = -mouseTarget.current.y
      scene.rotation.y = mouseTarget.current.x
    } else if (id === 'modern') {
      // Character 03: Mouse parallax (3% influence) and conditional cinematic breathing
      mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, state.mouse.x * 0.03, 0.05)
      mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, state.mouse.y * 0.03, 0.05)

      const time = state.clock.elapsedTime
      const intensity = modernBreath.current.intensity

      // Base micro-rotation (breathing) scaled by intensity
      const breathX = Math.sin(time * 0.4) * 0.02 * intensity
      const breathY = Math.cos(time * 0.3) * 0.02 * intensity
      const breathZ = Math.sin(time * 0.5) * 0.01 * intensity

      scene.rotation.x = breathX - mouseTarget.current.y
      scene.rotation.y = breathY + mouseTarget.current.x
      scene.rotation.z = breathZ

      // Tiny positional drift
      scene.position.y = Math.sin(time * 0.6) * 0.05 * intensity
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
      // Scene 02: Emerges from depth on the left side
      // Initial Y set via originalY.current so useFrame breathing stays in sync
      originalY.current = -2
      gsap.set(groupRef.current.position, { x: -3, y: -2, z: -5 })
      gsap.set(groupRef.current.scale, { x: 0.6, y: 0.6, z: 0.6 })
      
      // X and Z scrubbed — Y is controlled via originalY.current tween (avoids useFrame conflict)
      gsap.to(groupRef.current.position, {
        x: -1.5, z: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom bottom', scrub: true }
      })
      // Tween originalY.current so the breathing sine-wave centres at the correct height
      gsap.to(originalY, {
        current: -0.5,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Scene 02: Ancient camera — 90° turn
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: '.scene-02', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Scene 03: Optical Dissolve — scale AND z-recession together
      gsap.to(groupRef.current.scale, {
        x: 0.001, y: 0.001, z: 0.001,
        ease: 'power2.in',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'center center', scrub: true }
      })
      // Z-recession: camera drifts into darkness as it fades — not just scales away
      // Used fromTo to prevent reading initial state at page load which was -5
      gsap.fromTo(groupRef.current.position, 
        { z: 1 },
        {
          z: -5,
          ease: 'power2.in',
          scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
    } 
    else if (id === 'vintage') {
      gsap.set(groupRef.current.scale, { x: 0.001, y: 0.001, z: 0.001 })
      // Enter from right — closer than before (x:5 was fully off-screen; x:2.5 is visible)
      gsap.set(groupRef.current.position, { x: 2.5, y: 0, z: -1 })
      
      // Gather meshes for explosion
      const meshes = []
      scene.traverse(child => { if (child.isMesh) meshes.push(child) })
      
      // Scene 03: Vintage camera enters — settles RIGHT OF CENTER (not dead-center)
      // Creates a hero dwell on right side, 'Practice.' breathes on left side.
      // Then Scene 04 pulls it left — a deliberate cross-frame sweep.
      gsap.to(groupRef.current.scale, {
        x: 1.8, y: 1.8, z: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'center center', scrub: true }
      })
      gsap.to(groupRef.current.position, {
        x: 1.5, y: 0, z: 0,  // Right-of-center hero position — was x:0 (dead center)
        ease: 'power1.out',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'top top', scrub: true }
      })
      
      // Scene 04: Frame Factory — cross-frame sweep from right (x:1.5) to left (x:-2)
      gsap.fromTo(groupRef.current.position, 
        { x: 1.5, y: 0, z: 0 },
        {
          x: -2,      // was -1 — stronger left composition, clearer separation from text
          y: 0,
          z: -1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.scale, 
        { x: 1.8, y: 1.8, z: 1.8 },
        {
          x: 1.5, y: 1.5, z: 1.5, // Scale down to make room for the explosion
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
        }
      )
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 1.5, // F8: 270 sweep, removed x rotation to prevent gimbal lock
        ease: 'none',
        scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      meshes.forEach(mesh => {
        if (!mesh.userData.origPos) mesh.userData.origPos = mesh.position.clone()
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(3.0) // Increase explosion radius
        
        // Exploded view
        gsap.fromTo(mesh.position, 
          { x: mesh.userData.origPos.x, y: mesh.userData.origPos.y, z: mesh.userData.origPos.z },
          {
            x: mesh.userData.origPos.x + dir.x,
            y: mesh.userData.origPos.y + dir.y,
            z: mesh.userData.origPos.z + dir.z,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.scene-04', start: 'top bottom', end: 'bottom bottom', scrub: true }
          }
        )
      })

      // Scene 05: Kinetic Burst — one-shot, no reverse
      // Using 'play none none none' to prevent reverse-animation artifact when back-scrolling from Scene 06
      const burstTl = gsap.timeline({
        scrollTrigger: { 
          trigger: '.scene-05', 
          start: 'top center', 
          toggleActions: 'play none none none'  // One-shot — no reverse across scene boundary
        }
      })
      
      meshes.forEach(mesh => {
        const burstDir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(15)
        
        // Burst FROM current exploded position (not origPos) — guarantees outward motion
        // Using function-based targets: evaluated at burst trigger time, not mount time
        burstTl.to(mesh.position, {
          x: () => mesh.position.x + burstDir.x,
          y: () => mesh.position.y + burstDir.y,
          z: () => mesh.position.z + burstDir.z,
          duration: 0.2,
          ease: 'power4.out'
        }, 0)
        
        // Slow motion drift — continues in the same direction
        burstTl.to(mesh.position, {
          x: () => mesh.position.x + burstDir.x * 1.5,
          y: () => mesh.position.y + burstDir.y * 1.5,
          z: () => mesh.position.z + burstDir.z * 1.5,
          duration: 8,
          ease: 'power1.out'
        }, 0.2)
      })

      // Fade out for Scene 06
      gsap.fromTo(groupRef.current.scale, 
        { x: 1.5, y: 1.5, z: 1.5 },
        {
          x: 0.001, y: 0.001, z: 0.001, // F2: Avoid scale 0
          ease: 'power2.in',
          scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
    } 
    else if (id === 'modern') {
      gsap.set(groupRef.current.scale, { x: 0.001, y: 0.001, z: 0.001 })
      
      // Scene 06: Swooping entrance arc and extended dwell
      // Start deep and low
      gsap.set(groupRef.current.position, { x: 0, y: -4, z: -3 })
      gsap.set(groupRef.current.rotation, { y: Math.PI / 4 })

      // Entrance arc (Scale + Pos + Rot)
      gsap.fromTo(groupRef.current.position, 
        { x: 0, y: -4, z: -3 },
        {
          x: 3, y: 0, z: 2.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.scale, 
        { x: 0.001, y: 0.001, z: 0.001 },
        {
          x: 3.5, y: 3.5, z: 3.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.rotation, 
        { y: Math.PI / 4 },
        {
          y: -Math.PI / 6,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'bottom bottom', scrub: true }
        }
      )

      // Dwell phase: push in slightly while fading in breathing
      gsap.fromTo(modernBreath.current,
        { intensity: 0 },
        {
          intensity: 1,
          ease: 'power1.inOut',
          scrollTrigger: { trigger: '.scene-06', start: 'center center', end: 'bottom bottom', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.position, 
        { x: 3, y: 0, z: 2.5 },
        {
          x: 2.5, y: 0, z: 3.2, // slow push in and drift
          ease: 'none',
          scrollTrigger: { trigger: '.scene-06', start: 'center center', end: 'bottom bottom', scrub: true }
        }
      )

      // Scene 07: Orbital sweep left (fade out breathing)
      gsap.fromTo(modernBreath.current,
        { intensity: 1 },
        {
          intensity: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.position, 
        { x: 2.5, y: 0, z: 3.2 },
        {
          x: -3.8, y: 0.5, z: 2, // Sweep to left, slight rise, pull back slightly
          ease: 'sine.inOut',
          scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.rotation, 
        { y: -Math.PI / 6 },
        {
          y: -Math.PI / 2.5, // Look back toward center
          ease: 'sine.inOut',
          scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'center center', scrub: true }
        }
      )
      
      // Scene 08: Infinite Frame (scales up massively)
      // Very subtle roll and pitch to avoid spinning sensation
      gsap.fromTo(groupRef.current.scale, 
        { x: 3.5, y: 3.5, z: 3.5 },
        {
          x: 30, y: 30, z: 30, 
          ease: 'power4.in',
          scrollTrigger: { trigger: '.scene-08', start: 'top center', end: 'bottom bottom', scrub: true }
        }
      )
      gsap.fromTo(groupRef.current.rotation, 
        { x: 0, y: -Math.PI / 2.5, z: 0 },
        {
          x: -0.05, // barely perceptible pitch
          y: -Math.PI / 2.8, 
          z: -0.05, // barely perceptible roll
          ease: 'power2.in',
          scrollTrigger: { trigger: '.scene-08', start: 'top center', end: 'bottom bottom', scrub: true }
        }
      )
    }
  }, { dependencies: [id] })

  return (
    <group ref={groupRef} frustumCulled={false}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/1.glb')
useGLTF.preload('/2.glb')
useGLTF.preload('/3.glb')
