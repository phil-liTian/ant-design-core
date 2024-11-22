import type { AliasToken } from './alias'
import type { ComponentTokenMap } from './components'

export type { ComponentTokenMap } from './components'

export type { PresetColorKey, PresetColorsType, ColorPalettes, PresetColors } from './presetColors'

export type { SeedToken } from './seeds'

export type GlobalToken = AliasToken & ComponentTokenMap
