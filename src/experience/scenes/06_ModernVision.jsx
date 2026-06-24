import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene06() {
  return (
    <section className="scene scene-06" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '10vw' }}>
      <div className="scene-content" style={{ width: '40vw' }}>
        <KineticText tag="h1" scrollTriggerTarget=".scene-06" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1 }}>Modern Vision</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-06" delay={0.2} style={{ marginTop: '1.5rem', fontSize: '1.5rem', opacity: 0.8 }}>Mastery is earned.</KineticText>
      </div>
    </section>
  )
}
