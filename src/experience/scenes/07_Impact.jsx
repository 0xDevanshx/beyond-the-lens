import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene07() {
  return (
    <section className="scene scene-07">
      <div className="scene-content right">
        <KineticText tag="h1" scrollTriggerTarget=".scene-07">Stories Become Impact</KineticText>
        <KineticText tag="p" scrollTriggerTarget=".scene-07" delay={0.2}>Stories influence people.</KineticText>
      </div>
    </section>
  )
}
