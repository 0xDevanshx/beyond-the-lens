import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene01() {
  return (
    <section className="scene scene-01" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="scene-content center" style={{ marginTop: '-5vh' }}>
        {/* KineticText blur-in at 12vw — proven, beautiful, consistent with system */}
        <KineticText
          tag="h1"
          scrollTriggerTarget=".scene-01"
          stagger={0.03}
        >
          The<br />Observer
        </KineticText>
        <KineticText
          tag="p"
          scrollTriggerTarget=".scene-01"
          delay={0.8}
          style={{
            marginTop: '3rem',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            opacity: 0.5
          }}
        >
          Every story begins with a moment.
        </KineticText>
      </div>

      {/* Animated floating arrow */}
      <div className="scroll-indicator">
        <span className="scroll-indicator__arrow">↓</span>
      </div>
    </section>
  )
}
