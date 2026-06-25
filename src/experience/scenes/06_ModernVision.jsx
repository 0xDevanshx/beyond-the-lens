import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene06() {
  return (
    <section className="scene scene-06" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '10vw' }}>
      <div className="scene-content scene-06-content">
        {/* Split-weight contrast: light line / italic bold line */}
        <KineticText tag="h1" scrollTriggerTarget=".scene-06">
          The analog eye.<br /><em>The digital mind.</em>
        </KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-06" delay={0.5}>
          Mastery lives at the intersection.
        </KineticText>
      </div>
    </section>
  )
}
