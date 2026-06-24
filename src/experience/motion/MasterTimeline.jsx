import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { CONFIG } from '../config'

gsap.registerPlugin(ScrollTrigger)

export function MasterTimeline({ children }) {
  const containerRef = useRef()

  useGSAP(() => {
    // This is where we orchestrate the MASTER timeline for the 1000vh scroll
    // The specific DOM animations will be handled via class selectors 
    // and the 3D model animations will be synced via shared progress state or scrollTriggers inside the Canvas.
    
    const scenes = document.querySelectorAll('.scene')
    
    const colorMap = [
      { bg: CONFIG.colors.c1_bg, fg: CONFIG.colors.c1_fg }, // Scene 1
      { bg: CONFIG.colors.c1_bg, fg: CONFIG.colors.c1_fg }, // Scene 2
      { bg: CONFIG.colors.c2_bg, fg: CONFIG.colors.c2_fg }, // Scene 3
      { bg: CONFIG.colors.c2_bg, fg: CONFIG.colors.c2_fg }, // Scene 4
      { bg: CONFIG.colors.c3_bg, fg: CONFIG.colors.c3_fg }, // Scene 5
      { bg: CONFIG.colors.c3_bg, fg: CONFIG.colors.c3_fg }, // Scene 6
      { bg: CONFIG.colors.c4_bg, fg: CONFIG.colors.c4_fg }, // Scene 7
      { bg: CONFIG.colors.c4_bg, fg: CONFIG.colors.c4_fg }  // Scene 8
    ]

    scenes.forEach((scene, i) => {
      if (i >= colorMap.length) return
      
      const { bg, fg } = colorMap[i]

      ScrollTrigger.create({
        trigger: scene,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to(document.documentElement, { '--sc-bg': bg, '--sc-fg': fg, duration: 1.8, ease: 'power3.inOut' }),
        onEnterBack: () => gsap.to(document.documentElement, { '--sc-bg': bg, '--sc-fg': fg, duration: 1.8, ease: 'power3.inOut' })
      })
      // Pinning logic for specific scenes
      if (scene.classList.contains('scene-03') || 
          scene.classList.contains('scene-05') || 
          scene.classList.contains('scene-08')) {
        ScrollTrigger.create({
          trigger: scene,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false // Don't add extra space since we use absolute positioning
        })
      }
    })

  })

  return (
    <div ref={containerRef} className="master-timeline">
      {children}
    </div>
  )
}
