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

  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4
  }

  return {
    borderRadius: radiusBase,
    borderRadiusLG: radiusLG,
    borderRadiusSM: radiusSM,
    borderRadiusXS: radiusXS,
    borderRadiusOuter: radiusOuter,
  }
}
