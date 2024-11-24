import type { SeedToken } from '../../interface'
import type { CommonMapToken } from '../../interface/maps'
import { genRadius } from './genRadius'

export default function genCommonMapToken(seed: SeedToken): CommonMapToken {
  const { motionBase, motionUnit, lineWidth, borderRadius } = seed

  return {
    motionDurationFast: `${motionBase + motionUnit * 3}s`,
    motionDurationMid: `${motionBase + motionUnit * 2}s`,
    motionDurationSlow: `${motionBase + motionUnit}s`,

    lineWidthBold: lineWidth + 1,

    ...genRadius(borderRadius),
  }
}
