import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene04() {
  return (
    <section className="scene scene-04" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '42vw', paddingRight: '5vw' }}>
        <div className="scene-number">
          [04] — Deconstruction
        </div>
        <KineticText tag="h2" scrollTriggerTarget=".scene-04">
          The Frame<br />Factory
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-04" delay={0.4}>
          Every piece matters.<br />Every failure is data.
        </KineticText>
      </div>
    </section>
  )
}
