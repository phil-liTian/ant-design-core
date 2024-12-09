import { defineComponent, getCurrentInstance, onMounted, reactive, type PropType } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { fineDOMNode } from '../_utils/props-util'

interface ResizeObserverState {
  height: number
  width: number
  offsetHeight: number
  offsetWidth: number
}

export default defineComponent({
  name: 'ResizeObserver',
  props: {
    onResize: Function as PropType<(size: ResizeObserverState, element: HTMLElement) => void>,
  },
  setup(props, { slots }) {
    const state = reactive<ResizeObserverState>({
      height: 0,
      width: 0,
      offsetHeight: 0,
      offsetWidth: 0,
    })
    let resizeObserver: ResizeObserver | null = null
    const onResize: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
      const { onResize } = props
      const target = entries[0].target as HTMLElement
      const { width, height } = target.getBoundingClientRect()
      const { offsetHeight, offsetWidth } = target
      const fixedWidth = Math.floor(width)
      const fixedHeight = Math.floor(height)

      if (onResize) {
        onResize(
          {
            width: fixedWidth,
            height: fixedHeight,
            offsetWidth,
            offsetHeight,
          },
          target,
        )
      }
    }

    const instance = getCurrentInstance()
    const registerObserver = () => {
      const element = fineDOMNode(instance)
      if (!resizeObserver && element) {
        resizeObserver = new ResizeObserver(onResize)
        resizeObserver.observe(element)
      }
    }

    onMounted(() => {
      registerObserver()
    })

    return () => slots.default?.()[0]
  },
})
