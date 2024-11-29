// @ts-ignore
import { PresetColors } from '../theme/interface'
import type { PresetColorKey } from '../theme/internal'

export const PresetStatusColorTypes = [
  'success',
  'error',
  'default',
  'warning',
  'processing',
] as const

export type PresetColorType = PresetColorKey

export type PresetStatusColorType = (typeof PresetStatusColorTypes)[number]

export function isPresetColor(color: any): boolean {
  // @ts-ignore
  return PresetColors.includes(color as any)
}

export function isPresetStatusColor(color: any): boolean {
  return PresetStatusColorTypes.includes(color as PresetStatusColorType)
}
