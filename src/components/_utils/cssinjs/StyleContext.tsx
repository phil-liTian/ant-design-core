import { inject, shallowRef } from 'vue'
import Entity from './Cache'

const StyleContextKey = Symbol('StyleContextKey')

const getCache = () => {
  return new Entity()
}

export const useStyleInject = () => {
  const cache = getCache()

  return inject(StyleContextKey, shallowRef({ cache }))
}
