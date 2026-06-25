import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene04() {
  return (
    <section className="scene scene-04" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right scene-04-content">
        <div className="scene-number">
          [04] — Deconstruction
        </div>
        <KineticText tag="h2" scrollTriggerTarget=".scene-04">
          The Frame<br />Factory
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-04" delay={0.4}>
          Every piece matters.<br />Every failure is data.
        </KineticText>
        {/* Credential — anchors the deconstruction to a real person */}
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-04"
          delay={0.7}
          style={{ marginTop: '2.5rem', opacity: 0.4, fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          5 years · 10,000+ frames · still learning
        </KineticText>
      </div>
    </section>
  )
}
