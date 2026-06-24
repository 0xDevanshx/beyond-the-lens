import React, { useState } from 'react'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { StoryCanvas } from './components/canvas/StoryCanvas'
import { Overlay } from './components/dom/Overlay'
import { ApertureCursor } from './components/ui/ApertureCursor'
import { ChapterNav } from './components/ui/ChapterNav'
import { Preloader } from './components/ui/Preloader'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Preloader dismisses with upward wipe after models load */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Custom aperture cursor */}
      <ApertureCursor />

      <SmoothScroll>
        {/* Chapter dot navigation — fixed left side */}
        <ChapterNav />

        <main style={{ position: 'relative', width: '100%' }}>
          <StoryCanvas />
          <Overlay />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App
