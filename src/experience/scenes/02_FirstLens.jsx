import React from 'react'
import { KineticText } from '../dom/typography/KineticText'

export function Scene02() {
  return (
    <section className="scene scene-02" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div className="scene-content right" style={{ width: '40vw', paddingRight: '5vw' }}>
        <KineticText tag="h2" scrollTriggerTarget=".scene-02" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)