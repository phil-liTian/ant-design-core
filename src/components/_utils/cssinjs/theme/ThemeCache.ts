export default class ThemeCache {
  cache: Map<any, any>
  constructor() {
    this.cache = new Map()
  }

  public set(derivativeOptions, value) {
    this.cache.set(derivativeOptions, value)
  }

  public get(derivativeOptions) {
    return this.cache.get(derivativeOptions)
  }
}
