import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { BackgroundShader } from './BackgroundShader'
import { CameraActor } from './CameraActor'

export function StoryCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* We use transparent background instead of color to see if HTML color is visible */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        <BackgroundShader />
        
        {/* Load models. The animation logic is now inside CameraActor */}
        <CameraActor id="camera-1" url="/1.glb" chapter=".chapter-1" />
        <CameraActor id="camera-2" url="/2.glb" chapter=".chapter-2" />
        <CameraActor id="camera-3" url="/3.glb" chapter=".chapter-3" />
      </Canvas>
    </div>
  )
}
