import { isRef, reactive } from 'vue'

export function toReactive<T extends object>(objectRef: T): T {
  console.log('objectRef', objectRef)

  if (!isRef(objectRef)) return reactive(objectRef) as T

  const proxy = new Proxy(
    {},
    {
      get(target, key, receiver) {
        return Reflect.get(objectRef, key, receiver)
      },
    },
  )

  return reactive(proxy) as T
}
