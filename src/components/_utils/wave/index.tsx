import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, watch } from 'vue'
import { fineDOMNode } from '../props-util'
import useConfigInject from '@/components/config-provider/hooks/useConfigInject'
import useWave from './useWave'
import classNames from '../classNames'

export default defineComponent({
  name: 'Wave',
  props: {
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    const { prefixCls, wave = () => {} } = useConfigInject('wave', props)
    let onClick: (e: MouseEvent) => void
    const showWave = useWave(
      computed(() => classNames(prefixCls.value)),
      wave,
    )
    onMounted(() => {
      watch(
        () => props.disabled,
        () => {
          nextTick(() => {
            const node: HTMLElement = fineDOMNode(instance)

            onClick = (e: MouseEvent) => {
              showWave()
            }

            node.addEventListener('click', onClick)
          })
        },
        {
          immediate: true,
          flush: 'post',
        },
      )
    })

    return () => {
      const children = slots.default?.()[0]
      return children
    }
  },
})
