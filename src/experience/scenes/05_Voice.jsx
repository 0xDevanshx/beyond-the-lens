import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene05() {
  return (
    <section className="scene scene-05" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Maximum typographic impact — no subtitle. The particles ARE the voice finding itself. */}
      <div className="scene-content center">
        <KineticText tag="h1" scrollTriggerTarget=".scene-05">
          Finding<br />A Voice
        </KineticText>
      </div>
    </section>
  )
}
