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
        ease: 'power1.inOut',
        scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Z-recession: camera drifts into darkness as it fades — not just scales away
      // Used fromTo to prevent reading initial state at page load which was -5
      gsap.fromTo(groupRef.current.position, 
        { z: 1 },
        {
          z: -5,
          ease: 'power1.inOut',
          scrollTrigger: { trigger: '.scene-03', start: 'top bottom', end: 'bottom top', scrub: true }
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

      // Fade out for Scene 06 (Early exit to create breathing room)
      gsap.fromTo(groupRef.current.scale, 
        { x: 1.5, y: 1.5, z: 1.5 },
        {
          x: 0.001, y: 0.001, z: 0.001, 
          ease: 'power2.in',
          scrollTrigger: { trigger: '.scene-05', start: '40% top', end: '80% top', scrub: true }
        }
      )
    } 
    else if (id === 'modern') {
      // Start completely off-screen to the right
      gsap.set(groupRef.current.position, { x: 15, y: 0, z: -3 })
      gsap.set(groupRef.current.rotation, { x: Math.PI / 4, y: Math.PI, z: 0 })
      gsap.set(groupRef.current.scale, { x: 3, y: 3, z: 3 })
      
      // Master rollercoaster timeline covering Scene 06 and Scene 07
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scene-06',
          start: 'top bottom', // Start entering when Scene 06 appears
          endTrigger: '.scene-08',
          end: 'top top', // Finish completely exiting by the time Scene 08 hits top
          scrub: true
        }
      })

      // 1. Entrance: Swoop in from far right to center-right
      // Reduced travel distance to slow down visual speed
      tl.to(groupRef.current.position, {
        x: 2, y: -0.5, z: 0,
        ease: 'power2.out',
        duration: 2
      })
      .to(groupRef.current.rotation, {
        x: 0, y: Math.PI / 2, z: Math.PI / 6,
        ease: 'power2.out',
        duration: 2
      }, '<')
      .to(groupRef.current.scale, {
        x: 4, y: 4, z: 4, // slight zoom in
        ease: 'power1.inOut',
        duration: 2
      }, '<')

      // 2. Loop Up-Left
      .to(groupRef.current.position, {
        x: -1.5, y: 2, z: -1.5,
        ease: 'sine.inOut',
        duration: 1.5
      })
      .to(groupRef.current.rotation, {
        x: -Math.PI / 4, y: 0, z: Math.PI / 2,
        ease: 'none',
        duration: 1.5
      }, '<')
      .to(groupRef.current.scale, {
        x: 2.5, y: 2.5, z: 2.5, // push back (zoom out)
        ease: 'sine.inOut',
        duration: 1.5
      }, '<')

      // 3. Loop Down-Right (The apex of the loop)
      .to(groupRef.current.position, {
        x: 0.8, y: -1.5, z: 3,
        ease: 'sine.inOut',
        duration: 2
      })
      .to(groupRef.current.rotation, {
        x: Math.PI / 6, y: -Math.PI / 2, z: Math.PI,
        ease: 'none',
        duration: 2
      }, '<')
      .to(groupRef.current.scale, {
        x: 5, y: 5, z: 5, // massive push in (zoom in)
        ease: 'sine.inOut',
        duration: 2
      }, '<')

      // 4. Loop Up-Left (Crossing through center)
      .to(groupRef.current.position, {
        x: -2, y: 0.8, z: 0.5,
        ease: 'sine.inOut',
        duration: 1.5
      })
      .to(groupRef.current.rotation, {
        x: 0, y: -Math.PI, z: Math.PI * 1.5,
        ease: 'none',
        duration: 1.5
      }, '<')
      .to(groupRef.current.scale, {
        x: 3, y: 3, z: 3,
        ease: 'sine.inOut',
        duration: 1.5
      }, '<')

      // 5. Final Exit: Swoosh out of frame to the left and freeze
      .to(groupRef.current.position, {
        x: -15, y: -2.5, z: -3,
        ease: 'power2.in',
        duration: 2
      })
      .to(groupRef.current.rotation, {
        x: -Math.PI / 4, y: -Math.PI * 2, z: Math.PI * 2,
        ease: 'power2.in',
        duration: 2
      }, '<')

      // The camera is now off-screen at x: -15. 
      // It will remain frozen there during Scene 08 (Infinite Frame).
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
