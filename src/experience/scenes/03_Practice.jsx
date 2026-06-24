import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene03() {
  return (
    <section className="scene scene-03" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="scene-content center" style={{ marginTop: '-20vh', zIndex: 10 }}>
        <KineticText tag="h2" scrollTriggerTarget=".scene-03" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Curiosity Becomes Practice
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-03" delay={0.4} style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 300, opacity: 0.7, letterSpacing: '0.1em' }}>
          Learning through thousands of moments.
        </KineticText>
      </div>
    </section>
  )
}
