import React from 'react'
import { Canvas } from '@react-three/fiber'
import { AmbientAtmosphere } from './shaders/AmbientAtmosphere'
import { AmbientParticles } from './shaders/AmbientParticles'
import { CameraActor } from './actors/CameraActor'
import { ContentUniverse } from './actors/ContentUniverse'
import { StoryCamera } from './actors/StoryCamera'
import { LightingRig } from './effects/LightingRig'
import { Environment } from '@react-three/drei'

export function StoryCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 1.5)}
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
  )
}
