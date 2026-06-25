import React, { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Locomotion({ children }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    
    return () => { 
      gsap.ticker.remove(lenis?.raf) 
    }
  }, [lenis])

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
