import type { ColorMapToken } from './color'
import type { FontMapToken } from './font'
import type { SizeMapToken, HeightMapToken } from './size'
import type { StyleMapToken } from './style'

export interface MapToken
  extends ColorMapToken,
    FontMapToken,
    SizeMapToken,
    HeightMapToken,
    StyleMapToken {}
