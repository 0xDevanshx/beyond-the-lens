import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene02() {
  return (
    <section className="scene scene-02" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: '18vh' }}>
      {/* Discovery copy — increased size so it reads at distance */}
      <div className="scene-02-content">
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
