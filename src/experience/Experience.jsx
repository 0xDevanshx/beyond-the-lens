import React from 'react'
import { Locomotion } from './motion/Locomotion'
import { MasterTimeline } from './motion/MasterTimeline'
import { StoryCanvas } from './r3f/StoryCanvas'
import { NarrativeTrack } from './dom/NarrativeTrack'
import { CONFIG } from './config'
import './dom/styles/global.css'

export function Experience() {
  return (
    <Locomotion>
      <MasterTimeline>
        <div style={{ height: `${CONFIG.scroll.totalHeight}vh`, position: 'relative' }}>
          {/* 3D WEBGL LAYER (Fixed behind DOM) */}
          <StoryCanvas />

          {/* DOM LAYER (Scrollable) */}
          <NarrativeTrack />
        </div>
      </MasterTimeline>
    </Locomotion>
  )
}
