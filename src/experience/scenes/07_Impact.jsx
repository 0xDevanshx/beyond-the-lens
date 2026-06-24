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
      </div>
    </section>
  )
}
