import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    
    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    
    // Use GSAP's ticker to drive Lenis for a single animation loop
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
