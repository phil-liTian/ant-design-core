import type { AlignType } from '@/components/vc-align/interface'
import type { BuiltinPlacements } from '../interface'

export function genAlignFromPlacement(
  builtinPlacements: BuiltinPlacements,
  placementStr: string,
  align: AlignType,
) {
  const baseAlign = builtinPlacements[placementStr]
  return {
    ...baseAlign,
    ...align,
  }
}
