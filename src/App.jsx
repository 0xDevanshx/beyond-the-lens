import React from 'react'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { StoryCanvas } from './components/canvas/StoryCanvas'
import { Overlay } from './components/dom/Overlay'

function App() {
  return (
    <SmoothScroll>
      <main style={{ position: 'relative', width: '100%' }}>
        <StoryCanvas />
        <Overlay />
      </main>
    </SmoothScroll>
  )
}

export default App
