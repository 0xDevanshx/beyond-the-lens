export const CONFIG = {
  colors: {
    c1_bg: 'oklch(95% 0.02 80)',   // Ivory (hidden behind canvas)
    c1_fg: 'oklch(92% 0.03 60)',   // Warm near-white
    c2_bg: 'oklch(55% 0.12 40)',   // Copper (hidden behind canvas)
    c2_fg: 'oklch(90% 0.04 60)',   // Still warm white — canvas is dark, text must read
    c3_bg: 'oklch(25% 0.01 250)',  // Graphite (hidden behind canvas)
    c3_fg: 'oklch(88% 0.06 75)',   // Warm gold-white
    c4_bg: 'oklch(10% 0.02 260)',  // Deep Space (hidden behind canvas)
    c4_fg: 'oklch(92% 0.04 260)'   // Cool starlight-white
  },
  scroll: {
    totalHeight: 1000, // 1000vh
    scenes: {
      s1: [0, 125],
      s2: [125, 250],
      s3: [250, 400],
      s4: [400, 525],
      s5: [525, 675],
      s6: [675, 800],
      s7: [800, 925],
      s8: [925, 1000]
    }
  }
}
