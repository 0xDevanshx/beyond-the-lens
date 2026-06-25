import React, { useState, useEffect, useRef } from 'react'
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
  const [domReady, setDomReady] = useState(false)
  const progressRef = useRef()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    
    const timer = setTimeout(() => setDomReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      progressRef.current.style.height = `${Math.min(pct, 100)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Preloader — dismisses with upward wipe */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Scroll progress — 2px right edge bar */}
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <Locomotion preloaderDone={preloaderDone}>
        <MasterTimeline>
          <div style={{ height: `${CONFIG.scroll.totalHeight}vh`, position: 'relative' }}>
            {/* Chapter dot navigation — fixed left side */}
            <ChapterNav />

            {/* 3D WEBGL LAYER (Fixed behind DOM) */}
            {domReady && <StoryCanvas />}

            {/* DOM LAYER (Scrollable) */}
            <NarrativeTrack />
          </div>
        </MasterTimeline>
      </Locomotion>
    </>
  )
}
