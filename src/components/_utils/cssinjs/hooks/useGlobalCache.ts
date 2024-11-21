import { shallowRef, watch } from 'vue'
import { useStyleInject } from '../StyleContext'

export function useGlobalCache(prefix, keyPath, cacheFn) {
  const styleContext = useStyleInject()
  const fullPathStr = shallowRef('1231')
  let res = shallowRef()
  watch(
    () => fullPathStr.value,
    () => {
      styleContext.value.cache.update(fullPathStr, cacheFn)

      res.value = styleContext.value.cache.get(fullPathStr)
    },
    { immediate: true },
  )

  return res
}
