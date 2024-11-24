import type { ColorMapToken, ColorNeutralMapToken } from './color'
import type { FontMapToken } from './font'
import type { SizeMapToken, HeightMapToken } from './size'
import type { StyleMapToken } from './style'
import type { SeedToken } from '../index'

export interface CommonMapToken extends StyleMapToken {
  // motion
  motionDurationFast: string
  motionDurationMid: string
  motionDurationSlow: string
}

export interface MapToken
  extends ColorMapToken,
    SeedToken,
    FontMapToken,
    SizeMapToken,
    HeightMapToken,
    StyleMapToken,
    CommonMapToken {}

export type { ColorNeutralMapToken }
