import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  void main() {
    vec2 st = vUv;
    
    // Domain warping
    vec2 q = vec2(0.);
    q.x = noise(st + uTime * 0.1);
    q.y = noise(st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = noise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = noise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);
    
    float f = noise(st + r);
    
    // Mix colors based on scroll and warp
    vec3 color1 = vec3(0.05, 0.05, 0.05);
    vec3 color2 = vec3(0.1, 0.1, 0.12);
    
    // Slight mouse interaction
    float mouseDist = distance(st, uMouse);
    float interaction = smoothstep(0.5, 0.0, mouseDist) * 0.5;
    
    vec3 finalColor = mix(color1, color2, f + interaction + uScroll * 0.1);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function BackgroundShader() {
  const materialRef = useRef()
  const { size, viewport } = useThree()
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const scroll = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight)
    }
    const handleScroll = () => {
      scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      const mat = materialRef.current
      mat.uniforms.uTime.value = state.clock.elapsedTime
      
      // Lerp mouse and scroll for smoothness
      mat.uniforms.uMouse.value.lerp(mouse.current, 0.05)
      mat.uniforms.uScroll.value += (scroll.current - mat.uniforms.uScroll.value) * 0.05
    }
  })

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(size.width, size.height) }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}
