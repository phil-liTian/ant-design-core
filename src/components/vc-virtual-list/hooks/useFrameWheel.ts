import { wrapperRaf } from '@/components/_utils/raf'
import type { Ref } from 'vue'
import useOriginScroll from './useOriginScroll'
/**
 *
 * @param inVirtual 是否启用虚拟列表
 * @param isScrollAtTop 是否到达顶部
 * @param isScrollAtBottom 是否到达底部
 * @param onWheelDelta 滚动函数
 * @returns
 */
export default function useFrameWheel(
  inVirtual: Ref<Boolean>,
  isScrollAtTop: Ref<Boolean>,
  isScrollAtBottom: Ref<Boolean>,
  onWheelDelta: (offset: number) => void,
): [(e: WheelEvent) => void] {
  let nextFrame: number
  let offsetRef = 0
  function onWheel(e: WheelEvent) {
    // 不是虚拟列表
    if (!inVirtual.value) return
    const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom)

    // 防止整个页面有滚动的时候, 滚动list的时候触发整个page的滚动
    e.preventDefault()

    wrapperRaf.cancel(nextFrame)
    const { deltaY } = e

    // 如果到达边界 则不再触发滚动事件
    if (originScroll(deltaY)) return

    offsetRef += deltaY

    nextFrame = wrapperRaf(() => {
      onWheelDelta(offsetRef)
      offsetRef = 0
    })
  }

  return [onWheel]
}
