import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Locomotion({ children, preloaderDone }) {
  const lenisRef = useRef()

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    window.lenis = lenis
    
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    
    return () => { 
      gsap.ticker.remove(lenis?.raf) 
      delete window.lenis
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
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
  }, [preloaderDone])

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
