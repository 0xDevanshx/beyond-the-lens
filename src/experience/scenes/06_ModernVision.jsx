import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene06() {
  return (
    <section className="scene scene-06">
      <div className="scene-content">
        <KineticText tag="h1" scrollTriggerTarget=".scene-06">Modern Vision</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-06" delay={0.2}>Mastery is earned.</KineticText>
      </div>
    </section>
  )
}
