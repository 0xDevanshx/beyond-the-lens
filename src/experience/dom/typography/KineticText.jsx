import React, { useRef, useEffect } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EASINGS } from '../../motion/easings'

gsap.registerPlugin(ScrollTrigger)

export function KineticText({ children, tag = 'div', className = '', delay = 0, stagger = 0.02, scrollTriggerTarget }) {
  const textRef = useRef()
  const Tag = tag

  useEffect(() => {
    if (!textRef.current) return

    // Initialize SplitType
    const split = new SplitType(textRef.current, { types: 'lines,words,chars' })
    
    // Set initial state (out of focus)
    gsap.set(split.chars, { 
      opacity: 0, 
      filter: 'blur(8px)', 
      scale: 1.1,
      transformOrigin: 'center center',
      willChange: 'transform, opacity, filter'
    })

    const anim = gsap.to(split.chars, {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.4,
      stagger: stagger,
      ease: EASINGS.cinematicSmooth,
      delay: delay,
      scrollTrigger: scrollTriggerTarget ? {
        trigger: scrollTriggerTarget,
        start: 'top 75%',
        toggleActions: 'play none none none'  // Stay visible on reverse scroll
      } : undefined
    })

    return () => {
      anim.kill()
      split.revert()
    }
  }, [delay, stagger, scrollTriggerTarget])

  return (
    <Tag ref={textRef} className={className} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
      {children}
    </Tag>
  )
}
