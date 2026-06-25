import React from 'react'
import { Canvas } from '@react-three/fiber'
import { AmbientAtmosphere } from './shaders/AmbientAtmosphere'
import { AmbientParticles } from './shaders/AmbientParticles'
import { CameraActor } from './actors/CameraActor'
import { ContentUniverse } from './actors/ContentUniverse'
import { StoryCamera } from './actors/StoryCamera'
import { LightingRig } from './effects/LightingRig'
import { Environment } from '@react-three/drei'

// Check if WebGL is available and working
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

// Error boundary to catch WebGL crashes without blacking out page
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { crashed: false }
  }
  static getDerivedStateFromError() { return { crashed: true } }
  componentDidCatch(e) { console.warn('[StoryCanvas] WebGL error caught by boundary:', e.message) }
  render() {
    if (this.state.crashed) return null // Silently hide — DOM layer still shows
    return this.props.children
  }
}

export function StoryCanvas() {
  if (!isWebGLAvailable()) {
    console.warn('[StoryCanvas] WebGL unavailable — 3D canvas skipped')
    return null
  }

  return (
    <CanvasErrorBoundary>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} role="img" aria-label="Interactive 3D evolution of the camera lens">
        <Canvas
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1.0 : Math.min(window.devicePixelRatio, 1.5)}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        >
          <StoryCamera />
          <LightingRig />
          
          <AmbientAtmosphere />
          <AmbientParticles />
          <Environment preset="studio" />
          
          {/* Load models */}
          <CameraActor id="ancient" url="/1.glb" />
          <CameraActor id="vintage" url="/2.glb" />
          <CameraActor id="modern" url="/3.glb" />
          
          <ContentUniverse />
          
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}

