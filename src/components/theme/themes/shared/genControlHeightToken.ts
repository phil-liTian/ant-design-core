import type { SeedToken } from '../../interface'
import type { HeightMapToken } from '../../interface/maps/size'

export function genControlHeightToken(seed: SeedToken): HeightMapToken {
  const { controlHeight } = seed

  return {
    controlHeightXS: controlHeight * 0.5,
    controlHeightSM: controlHeight * 0.75,
    controlHeightLG: controlHeight * 1.25,
  }
}
