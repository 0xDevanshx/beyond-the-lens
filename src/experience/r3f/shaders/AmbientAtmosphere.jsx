import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

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
  uniform float uVelocity;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  void main() {
    vec2 st = vUv;
    
    // Stretch coordinates based on scroll velocity (simulated motion blur)
    st.y -= uVelocity * 0.1;
    
    vec2 q = vec2(0.);
    q.x = noise(st + uTime * 0.1);
    q.y = noise(st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = noise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = noise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);
    
    float f = noise(st + r);
    
    vec3 color1 = vec3(0.05, 0.05, 0.05);
    vec3 color2 = vec3(0.12, 0.1, 0.08); // Warm undertone
    
    float mouseDist = distance(st, uMouse);
    float interaction = smoothstep(0.5, 0.0, mouseDist) * 0.5;
    
    vec3 finalColor = mix(color1, color2, f + interaction + uScroll * 0.1);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function AmbientAtmosphere() {
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
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      const mat = materialRef.current
      mat.uniforms.uTime.value = state.clock.elapsedTime
      mat.uniforms.uMouse.value.lerp(mouse.current, 0.05)
      
      const currentScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const velocity = currentScroll - scroll.current
      scroll.current = currentScroll
      
      mat.uniforms.uScroll.value += (scroll.current - mat.uniforms.uScroll.value) * 0.05
      // Smooth velocity
      mat.uniforms.uVelocity.value += (velocity * 100.0 - mat.uniforms.uVelocity.value) * 0.1
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
          uVelocity: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}
