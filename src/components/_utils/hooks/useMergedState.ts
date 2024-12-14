import { ref, type Ref } from 'vue'

export default function useMergedState<T, R = Ref<T>>(defaultStateValue): [R, (value: T) => void] {
  const mergedValue = ref(defaultStateValue) as Ref<T>

  function triggerChange(value) {
    mergedValue.value = value
  }

  return [mergedValue as unknown as R, triggerChange]
}
