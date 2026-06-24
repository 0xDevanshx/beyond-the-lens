import React, { useState } from 'react'
import { Locomotion } from './motion/Locomotion'
import { MasterTimeline } from './motion/MasterTimeline'
import { StoryCanvas } from './r3f/StoryCanvas'
import { NarrativeTrack } from './dom/NarrativeTrack'
import { CONFIG } from './config'
import { ChapterNav } from '../components/ui/ChapterNav'
import { Preloader } from '../components/ui/Preloader'
import './dom/styles/global.css'

export function Experience() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {/* Preloader — dismisses with upward wipe */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      <Locomotion>
        <MasterTimeline>
          <div style={{ height: `${CONFIG.scroll.totalHeight}vh`, position: 'relative' }}>
            {/* Chapter dot navigation — fixed left side */}
            <ChapterNav />

            {/* 3D WEBGL LAYER (Fixed behind DOM) */}
            <StoryCanvas />

            {/* DOM LAYER (Scrollable) */}
            <NarrativeTrack />
          </div>
        </MasterTimeline>
      </Locomotion>
    </>
  )
}
