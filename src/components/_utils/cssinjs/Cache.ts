class Entity {
  cache = new Map()
  constructor() {}

  update(key, valueFn: () => {}) {
    const path = '1213'
    const nextValue = valueFn()
    this.cache.set(key, nextValue)
  }

  get(key) {
    return this.cache.get(key)
  }
}

export default Entity
