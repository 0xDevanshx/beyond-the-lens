import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene03() {
  return (
    <section className="scene scene-03" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
      {/* Single word — extreme scale, declarative */}
      <div style={{ position: 'relative', zIndex: 10, paddingLeft: '5vw' }}>
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-03"
          className="practice-word"
          delay={0.1}
        >
          Practice.
        </KineticText>
      </div>
    </section>
  )
}
