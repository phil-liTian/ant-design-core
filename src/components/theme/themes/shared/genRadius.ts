import type { MapToken } from '../../interface/maps'

export const genRadius = (
  radiusBase: number,
): Pick<
  MapToken,
  'borderRadius' | 'borderRadiusLG' | 'borderRadiusSM' | 'borderRadiusXS' | 'borderRadiusOuter'
> => {
  let radiusLG = radiusBase
  let radiusSM = radiusBase
  let radiusXS = radiusBase
  let radiusOuter = radiusBase

  return {
    borderRadius: radiusBase,
    borderRadiusLG: radiusLG,
    borderRadiusSM: radiusSM,
    borderRadiusXS: radiusXS,
    borderRadiusOuter: radiusOuter,
  }
}
