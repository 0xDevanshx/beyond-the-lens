import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene04() {
  return (
    <section className="scene scene-04">
      <div className="scene-content right">
        <KineticText tag="h1" scrollTriggerTarget=".scene-04">The Frame Factory</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-04" delay={0.2}>Experimentation creates skill.</KineticText>
      </div>
    </section>
  )
}
