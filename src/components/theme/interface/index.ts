import type { AliasToken } from './alias'
import type { ComponentTokenMap } from './components'

export type { ComponentTokenMap } from './components'

export type { PresetColorKey, PresetColorsType, ColorPalettes, PresetColors } from './presetColors'

export type { SeedToken } from './seeds'

export type GlobalToken = AliasToken & ComponentTokenMap

export type { ColorNeutralMapToken } from './maps'

export type OverrideToken = {
  [key in keyof ComponentTokenMap]?: Partial<ComponentTokenMap[key]> & Partial<AliasToken>
}
