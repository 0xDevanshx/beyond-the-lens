import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene05() {
  return (
    <section className="scene scene-05">
      <div className="scene-content center">
        <KineticText tag="h1" scrollTriggerTarget=".scene-05">Finding A Voice</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-05" delay={0.2}>A creator finds their identity.</KineticText>
      </div>
    </section>
  )
}
