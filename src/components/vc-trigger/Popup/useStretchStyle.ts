import { computed, shallowRef, type ComputedRef, type CSSProperties, type Ref } from 'vue'
import type { StretchType } from '../interface'

// 处理自动拉伸的宽高
export function useStretchStyle(
  stretch?: Ref<StretchType>,
): [ComputedRef<CSSProperties>, (element: HTMLElement) => void] {
  const targetSize = shallowRef({ width: 0, height: 0 })
  function measureStretch(element: HTMLElement) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
  }

  const style = computed(() => {
    let sizeStyle: CSSProperties = {}
    if (stretch?.value) {
      const { width, height } = targetSize.value
      if (width) {
        if (stretch?.value.indexOf('width') !== -1) {
          sizeStyle.width = `${width}px`
        } else if (stretch?.value.indexOf('minWidth') !== -1) {
          sizeStyle.minWidth = `${width}px`
        }
      }

      if (height) {
        if (stretch?.value.indexOf('height') !== -1) {
          sizeStyle.height = `${height}px`
        } else if (stretch?.value.indexOf('minHeight') !== -1) {
          sizeStyle.minHeight = `${height}px`
        }
      }
    }
    return sizeStyle
  })
  return [style, measureStretch]
}
