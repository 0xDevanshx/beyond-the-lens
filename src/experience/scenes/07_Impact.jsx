import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene07() {
  return (
    <section className="scene scene-07" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '40vw', paddingRight: '5vw' }}>
        <KineticText tag="h1" scrollTriggerTarget=".scene-07" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1 }}>Stories Become Impact</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-07" delay={0.2} style={{ marginTop: '1.5rem', fontSize: '1.5rem', opacity: 0.8 }}>Stories influence people.</KineticText>
      </div>
    </section>
  )
}
