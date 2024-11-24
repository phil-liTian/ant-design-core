import type { SeedToken } from '../../interface'
import type { SizeMapToken } from '../../interface/maps/size'

export function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeStep, sizeUnit } = token
  return {
    sizeXXS: sizeUnit * (sizeStep - 3),
    sizeXS: sizeUnit * (sizeStep - 2),
    sizeSM: sizeUnit * (sizeStep - 1),
    size: sizeUnit * sizeStep,
    sizeMD: sizeUnit * (sizeStep + 1),
    sizeLG: sizeUnit * (sizeStep + 2),
    sizeXL: sizeUnit * (sizeStep + 4),
    sizeXXL: sizeUnit * (sizeStep + 8),
  }
}
