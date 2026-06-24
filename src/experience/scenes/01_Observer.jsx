import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene01() {
  return (
    <section className="scene scene-01" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="scene-content center" style={{ marginTop: '-10vh' }}>
        <KineticText tag="h1" scrollTriggerTarget=".scene-01" style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
          The<br/>Observer
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-01" delay={0.4} style={{ marginTop: '2rem', fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.7 }}>
          Every story begins with a moment.
        </KineticText>
      </div>
      
      {/* Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll to explore</div>
        <div style={{ width: '1px', height: '50px', backgroundColor: 'currentColor' }}></div>
      </div>
    </section>
  )
}
