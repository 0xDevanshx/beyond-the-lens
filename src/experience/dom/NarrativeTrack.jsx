import React from 'react'
import { Scene01 } from '../scenes/01_Observer'
import { Scene02 } from '../scenes/02_FirstLens'
import { Scene03 } from '../scenes/03_Practice'
import { Scene04 } from '../scenes/04_FrameFactory'
import { Scene05 } from '../scenes/05_Voice'
import { Scene06 } from '../scenes/06_ModernVision'
import { Scene07 } from '../scenes/07_Impact'
import { Scene08 } from '../scenes/08_InfiniteFrame'

export function NarrativeTrack() {
  return (
    <div className="narrative-track" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
      <Scene01 />
      <Scene02 />
      <Scene03 />
      <Scene04 />
      <Scene05 />
      <Scene06 />
      <Scene07 />
      <Scene08 />
    </div>
  )
}
