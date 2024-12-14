// useMemo用于缓存一个函数的执行结果。它接收一个函数（通常是一个计算量较大或者比较复杂的函数）和一个依赖项数组作为参数。只有当依赖项数组中的值发生变化时，useMemo才会重新执行传入的函数，并返回新的结果；如果依赖项没有变化，就直接返回之前缓存的结果。

import { ref, watch, type Ref, type WatchSource } from 'vue'

function useMemo<T>(
  getValue: () => T,
  condition: (WatchSource<unknown> | object)[],
  shouldUpdate?: (prev: any[], next: any[]) => boolean,
) {
  const cacheRef: Ref<T> = ref(getValue() as any)

  watch(condition, (next, prev) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, prev)) {
        cacheRef.value = getValue()
      } else {
        cacheRef.value = getValue()
      }
    }
  })

  return cacheRef
}

export default useMemo
