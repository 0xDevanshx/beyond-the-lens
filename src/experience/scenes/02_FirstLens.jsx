import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene02() {
  return (
    <section className="scene scene-02" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '40vw', paddingRight: '5vw' }}>
        <KineticText tag="h2" scrollTriggerTarget=".scene-02" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1 }}>
          The First Lens
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-02" delay={0.3} style={{ marginTop: '1.5rem', opacity: 0.8 }}>
          The desire to capture, preserved in mechanical perfection.
        </KineticText>
      </div>
    </section>
  )
}
