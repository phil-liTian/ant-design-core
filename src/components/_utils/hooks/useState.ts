import { ref, type Ref } from 'vue'

export const useState = <T, R = Ref<T>>(defaultStateValue?: T): [R, (value: T) => void] => {
  const initValue: T =
    typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue

  const innerValue = ref(initValue) as Ref<T>

  function triggerChange(value: T) {
    innerValue.value = value
  }

  return [innerValue as unknown as R, triggerChange]
}
