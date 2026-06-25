import React, { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Locomotion({ children, preloaderDone }) {
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

  useEffect(() => {
    if (!lenis) return
    
    if (!preloaderDone) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    } else {
      lenis.start()
      // Use requestAnimationFrame to ensure the DOM layout is settled
      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
        ScrollTrigger.refresh()
      })
    }
  }, [lenis, preloaderDone])

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
