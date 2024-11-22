import type { SeedToken } from '@/components/theme/interface'
import { isArray } from '../../util'

export default class Theme {
  derivatives: any[]
  constructor(derivatives) {
    this.derivatives = isArray(derivatives) ? derivatives : [derivatives]
  }

  getDerivativeToken(token: SeedToken) {
    return this.derivatives.reduce((result, derivative) => {
      return derivative(token, result)
    }, undefined)
  }
}
