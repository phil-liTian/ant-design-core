import { provide, inject, reactive, watchEffect } from 'vue'

function createContext<T extends Record<string, any>>(defaultValue?: T) {
  const contextKey = Symbol('contextKey')
  function useProvide(props: T, newProps?: T) {
    const mergedProps = reactive<T>({} as T)
    provide(contextKey, mergedProps)

    watchEffect(() => {
      Object.assign(mergedProps, props, newProps)
    })

    return mergedProps
  }

  function useInject() {
    return inject(contextKey, defaultValue as T) || ({} as T)
  }

  return {
    useInject,
    useProvide,
  }
}

export default createContext
