import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene07() {
  return (
    <section className="scene scene-07" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '42vw', paddingRight: '5vw' }}>
        <KineticText tag="h1" scrollTriggerTarget=".scene-07">
          Stories<br />Become Impact
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-07" delay={0.4}>
          Every frame a conversation.<br />Every post a legacy.
        </KineticText>
        {/* Concrete number — gives abstract 'impact' a real dimension */}
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-07"
          delay={0.7}
          style={{ marginTop: '2rem', opacity: 0.4, fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Across platforms · Across communities
        </KineticText>
      </div>
    </section>
  )
}
