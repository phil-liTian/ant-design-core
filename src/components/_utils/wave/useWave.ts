import { getCurrentInstance, onBeforeUnmount, type Ref, type ComputedRef } from 'vue'
import { findDOMNode } from '../props-util'
import showWaveEffect from './WaveEffect'

export default function useWave(className: Ref<string>, wave?: ComputedRef<{ disabled: boolean }>) {
  const instance = getCurrentInstance()
  let stopWave: () => void
  const showWave = () => {
    const node = findDOMNode(instance)
    stopWave?.()
    if (wave?.value?.disabled || !node) {
      return
    }
    stopWave = showWaveEffect(node, className.value)
  }

  onBeforeUnmount(() => {
    stopWave?.()
  })

  return showWave
}
