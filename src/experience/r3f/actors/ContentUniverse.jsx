import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export function ContentUniverse() {
  const groupRef = useRef()
  const meshRef = useRef()
  
  const COUNT = 50

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Pre-calculate positions and rotations
  const frames = useMemo(() => {
    return Array.from({ length: COUNT }).map(() => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        -50 + (Math.random() * 40)
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ],
      scale: 0.5 + Math.random() * 1.5
    }))
  }, [])

  useEffect(() => {
    if (!meshRef.current) return
    frames.forEach((frame, i) => {
      dummy.position.set(...frame.position)
      dummy.rotation.set(...frame.rotation)
      const s = frame.scale
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Monochrome — white at varying opacity (0.15 to 0.55)
      // No rainbow. Subtle depth variation only.
      const brightness = 0.15 + (i / COUNT) * 0.40
      const color = new THREE.Color(brightness, brightness, brightness)
      meshRef.current.setColorAt(i, color)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [dummy, frames])

  useGSAP(() => {
    if (!groupRef.current) return

    gsap.set(groupRef.current.position, { z: -100 })
    gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 })

    // Scene 07: Stories Become Impact (Universe flies towards camera)
    gsap.to(groupRef.current.scale, {
      x: 1, y: 1, z: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'top center', scrub: true }
    })
    
    gsap.to(groupRef.current.position, {
      z: 10, // Fly past the camera
      ease: 'none',
      scrollTrigger: { trigger: '.scene-07', start: 'top bottom', end: 'bottom top', scrub: true }
    })
    
    // Scene 08: The Infinite Frame (Collapse into black hole effect)
    gsap.to(groupRef.current.scale, {
      x: 0, y: 0, z: 0,
      ease: 'power4.in',
      scrollTrigger: { trigger: '.scene-08', start: 'top bottom', end: 'center center', scrub: true }
    })

  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.001
      groupRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <planeGeometry args={[1.5, 1]} />
        <meshBasicMaterial side={THREE.DoubleSide} transparent={true} opacity={0.8} depthWrite={false} alphaTest={0.01} />
      </instancedMesh>
    </group>
  )
}
