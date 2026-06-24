import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene02() {
  return (
    <section className="scene scene-02" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: '18vh' }}>
      {/* Discovery copy — bottom-left anchored, intimate scale */}
      <div style={{ position: 'absolute', bottom: '15vh', left: '10vw', maxWidth: '45vw' }}>
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-02"
          delay={0.2}
          className="scene-discovery-copy"
        >
          Before the lens — wonder.
        </KineticText>
      </div>
    </section>
  )
}
