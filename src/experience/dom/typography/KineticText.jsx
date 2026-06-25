import React, { useRef } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { EASINGS } from '../../motion/easings'

gsap.registerPlugin(ScrollTrigger)

export function KineticText({ children, tag = 'div', className = '', delay = 0, stagger = 0.02, scrollTriggerTarget, ...props }) {
  const textRef = useRef()
  const Tag = tag

  const [domReady, setDomReady] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setDomReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    if (!domReady || !textRef.current) return

    // Initialize SplitType
    const split = new SplitType(textRef.current, { types: 'lines,words,chars' })
    
    // Using fromTo guarantees deterministic start state and single ownership
    // Using 'play reverse play reverse' restores the cinematic feel on scroll up/down
    // willChange optimizes performance during the blur
    gsap.fromTo(split.chars, 
      { 
        opacity: 0, 
        filter: 'blur(8px)', 
        scale: 1.1,
        transformOrigin: 'center center'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.4,
        stagger: stagger,
        ease: EASINGS.cinematicSmooth,
        delay: delay,
        willChange: 'transform, opacity, filter',
        scrollTrigger: scrollTriggerTarget ? {
          trigger: scrollTriggerTarget,
          start: 'top 85%', // slightly lower so it's visible while animating
          toggleActions: 'play reverse play reverse'
        } : undefined,
        onComplete: () => {
          // Remove will-change after animation to free up GPU memory and prevent lag
          gsap.set(split.chars, { clearProps: 'willChange' })
        }
      }
    )

    return () => {
      split.revert()
    }
  }, { dependencies: [delay, stagger, scrollTriggerTarget, domReady], scope: textRef })

  // Removed clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' to prevent the blur effect from being visually clipped at the edges
  return (
    <Tag ref={textRef} className={className} {...props}>
      {children}
    </Tag>
  )
}
