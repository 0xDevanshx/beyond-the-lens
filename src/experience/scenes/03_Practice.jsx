import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene03() {
  return (
    <section className="scene scene-03">
      <div className="scene-content">
        <KineticText tag="h1" scrollTriggerTarget=".scene-03">Curiosity Becomes Practice</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-03" delay={0.2}>Learning through thousands of moments.</KineticText>
      </div>
    </section>
  )
}
