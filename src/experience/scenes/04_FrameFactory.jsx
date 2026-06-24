import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene04() {
  return (
    <section className="scene scene-04" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '40vw', paddingRight: '5vw' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1rem', opacity: 0.5 }}>
          [04] Deconstruction
        </div>
        <KineticText tag="h2" scrollTriggerTarget=".scene-04" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1 }}>
          The Frame Factory
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-04" delay={0.3} style={{ marginTop: '1.5rem', opacity: 0.8 }}>
          Experimentation creates skill. Every piece matters in the pursuit of the perfect shot.
        </KineticText>
      </div>
    </section>
  )
}
