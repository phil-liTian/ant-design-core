import { getCurrentInstance, onBeforeUnmount, type Ref } from 'vue'
import { fineDOMNode } from '../props-util'
import showWaveEffect from './WaveEffect'

export default function useWave(className: Ref<string>) {
  const instance = getCurrentInstance()
  let stopWave: () => void
  const showWave = () => {
    const node = fineDOMNode(instance)
    stopWave?.()
    stopWave = showWaveEffect(node, className.value)
    console.log('showWave')
  }

  onBeforeUnmount(() => {
    stopWave?.()
  })

  return showWave
}
