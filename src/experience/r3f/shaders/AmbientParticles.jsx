import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import * as THREE from 'three'

export function AmbientParticles() {
  const meshRef = useRef()
  const COUNT = 300

  // We store extra data in a Float32Array to manage particle velocities and states
  const particleData = useMemo(() => {
    const data = new Float32Array(COUNT * 4) // x, y, z velocities, and a 'state' flag
    for (let i = 0; i < COUNT; i++) {
      data[i * 4] = (Math.random() - 0.5) * 0.02
      data[i * 4 + 1] = (Math.random() - 0.5) * 0.02
      data[i * 4 + 2] = (Math.random() - 0.5) * 0.02
      data[i * 4 + 3] = 0 // state: 0=drift, 1=frozen, 2=blackhole
    }
    return data
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const params = useRef({ speed: 1, burstScale: 0 })

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      // Uniform small scale — spheres don’t need random sizing
      dummy.scale.setScalar(0.03 + Math.random() * 0.03)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [dummy])

  useGSAP(() => {
    // Scene 05: Burst — delayed 0.5s so headline is read before particles fire
    gsap.to(params.current, {
      burstScale: 10,
      duration: 0.2,
      ease: 'power4.out',
      delay: 0.5,
      scrollTrigger: { trigger: '.scene-05', start: 'top center', toggleActions: 'play none none none' }
    })
    gsap.to(params.current, {
      burstScale: 1,
      duration: 5,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: { trigger: '.scene-05', start: 'top center', toggleActions: 'play none none none' }
    })

    // Scene 06: Freeze
    gsap.to(params.current, {
      speed: 0,
      scrollTrigger: { trigger: '.scene-06', start: 'top bottom', end: 'center center', scrub: true }
    })

    // Scene 08: Black Hole (sucked backward)
    gsap.to(params.current, {
      speed: -50,
      scrollTrigger: { trigger: '.scene-08', start: 'top center', end: 'bottom bottom', scrub: true }
    })
  })

  useFrame(() => {
    if (!meshRef.current) return
    const s = params.current.speed
    const b = params.current.burstScale > 1 ? params.current.burstScale : 1
    
    const instanceArray = meshRef.current.instanceMatrix.array

    for (let i = 0; i < COUNT; i++) {
      const offset = i * 16
      
      let x = instanceArray[offset + 12] + particleData[i * 4] * s * b
      let y = instanceArray[offset + 13] + particleData[i * 4 + 1] * s * b
      let z = instanceArray[offset + 14] + particleData[i * 4 + 2] * s * b

      // Wrap around
      if (x > 10) x = -10
      if (x < -10) x = 10
      if (y > 10) y = -10
      if (y < -10) y = 10
      if (z > 10) z = -10
      if (z < -10) z = 10

      instanceArray[offset + 12] = x
      instanceArray[offset + 13] = y
      instanceArray[offset + 14] = z
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]} renderOrder={0}>
      {/* Sphere geometry — no visible square edges at close range */}
      <sphereGeometry args={[0.03, 5, 5]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} depthWrite={false} />
    </instancedMesh>
  )
}
