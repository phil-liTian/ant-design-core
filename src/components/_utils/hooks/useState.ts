import { ref, type Ref } from 'vue'
// useState是一个用于在函数组件中添加状态（state）的 Hook。它允许函数组件像类组件一样拥有和管理自己的内部状态，使得组件能够根据状态的变化重新渲染
export const useState = <T, R = Ref<T>>(defaultStateValue?: T): [R, (value: T) => void] => {
  const initValue: T =
    typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue

  const innerValue = ref(initValue) as Ref<T>

  function triggerChange(value: T) {
    innerValue.value = value
  }

  return [innerValue as unknown as R, triggerChange]
}
