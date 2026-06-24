import { CustomEase } from 'gsap/CustomEase'
import gsap from 'gsap'

gsap.registerPlugin(CustomEase)

export const EASINGS = {
  cinematicSilk: CustomEase.create('cinematicSilk', '0.45, 0.05, 0.55, 0.95'),
  cinematicSmooth: CustomEase.create('cinematicSmooth', '0.25, 0.1, 0.25, 1'),
  cinematicFlow: CustomEase.create('cinematicFlow', '0.33, 0, 0.2, 1'),
  cinematicLinear: CustomEase.create('cinematicLinear', '0.4, 0, 0.6, 1'),
  burst: 'back.out(1.7)'
}
