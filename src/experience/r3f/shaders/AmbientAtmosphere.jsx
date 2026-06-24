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
  uniform float uHue;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // HSL to RGB — for hue-driven color tinting
  vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if (h < 60.0)      rgb = vec3(c, x, 0.0);
    else if (h < 120.0) rgb = vec3(x, c, 0.0);
    else if (h < 180.0) rgb = vec3(0.0, c, x);
    else if (h < 240.0) rgb = vec3(0.0, x, c);
    else if (h < 300.0) rgb = vec3(x, 0.0, c);
    else               rgb = vec3(c, 0.0, x);
    return rgb + m;
  }
  
  void main() {
    vec2 st = vUv;
    st.y -= uVelocity * 0.1;
    
    vec2 q = vec2(0.);
    q.x = noise(st + uTime * 0.1);
    q.y = noise(st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = noise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = noise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);
    
    float f = noise(st + r);
    
    // Base color tinted by uHue (HSL: visible saturation, dark but readable)
    vec3 tint = hsl2rgb(uHue, 0.40, 0.09 + f * 0.05);
    
    float mouseDist = distance(st, uMouse);
    float interaction = smoothstep(0.5, 0.0, mouseDist) * 0.04;
    
    vec3 finalColor = tint + interaction + uScroll * 0.01;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function AmbientAtmosphere() {
  const materialRef = useRef()
  const { size, viewport } = useThree()
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const scroll = useRef(0)
  // Hue shifts: 0=warm amber (40°), 0.65=cold steel (220°), 1=void (250°)
  const targetHue = useRef(40)
  const currentHue = useRef(40)

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
      mat.uniforms.uMouse.value.lerp(mouse.current, 0.05)
      
      const currentScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const velocity = currentScroll - scroll.current
      scroll.current = currentScroll
      
      mat.uniforms.uScroll.value += (scroll.current - mat.uniforms.uScroll.value) * 0.05
      mat.uniforms.uVelocity.value += (velocity * 100.0 - mat.uniforms.uVelocity.value) * 0.1

      // Hue interpolation: warm (40) → cold (220) at Scene 06 (scroll ~0.65)
      if (currentScroll < 0.62) {
        targetHue.current = 40  // warm amber-dark
      } else if (currentScroll < 0.92) {
        // Lerp 40→220 across Scenes 06-07
        const t = (currentScroll - 0.62) / 0.30
        targetHue.current = 40 + t * 180
      } else {
        targetHue.current = 250  // cold void for Scene 08
      }
      currentHue.current += (targetHue.current - currentHue.current) * 0.04
      mat.uniforms.uHue.value = currentHue.current
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
          uHue: { value: 40 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}
