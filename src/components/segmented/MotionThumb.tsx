import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onUnmounted,
  ref,
  Transition,
  watch,
  type Ref,
  type ShallowRef,
  type TransitionProps,
} from 'vue'
import PropTypes from '../_utils/vue-types'
import { addClass, removeClass } from '../vc-util/Dom/class.js'
import type { SegmentedValue } from './segmented'
import { anyType, StringType } from '../_utils/type'

type ThumbRect = {
  left: number
  right: number
  width: number
} | null

const calcThumbStyle = (targetElement: HTMLElement): ThumbRect => {
  return targetElement
    ? {
        left: targetElement.offsetLeft,
        right: targetElement.clientWidth - targetElement.offsetLeft,
        width: targetElement.clientWidth,
      }
    : null
}

const toPX = (val?: number) => (typeof val === 'undefined' ? undefined : `${val}px`)

export default defineComponent({
  props: {
    value: anyType<SegmentedValue>(),
    getValueIndex: anyType<(value: SegmentedValue) => number>(),
    prefixCls: PropTypes.string,
    containerRef: anyType<ShallowRef<any>>(),
    direction: StringType<'ltr' | 'rtl'>('ltr'),
    motionName: String,
  },
  setup(props) {
    const findValueElement = (value: SegmentedValue) => {
      const index = props.getValueIndex(value)

      const ele = props.containerRef.value.querySelectorAll(`.${props.prefixCls}-item`)[index]

      return (ele?.offsetParent && ele) as HTMLElement
    }

    const prevStyle = ref<ThumbRect>()
    const nextStyle = ref<ThumbRect>()

    const thumbStart = computed(() => {
      return props.direction === 'rtl'
        ? toPX(-(prevStyle.value?.right as Number))
        : toPX(prevStyle.value?.left)
    })

    const thumbActive = computed(() => {
      return props.direction === 'rtl'
        ? toPX(-(nextStyle.value?.right as Number))
        : toPX(nextStyle.value?.left)
    })

    watch(
      () => props.value,
      (value, preValue) => {
        const prev = findValueElement(preValue)
        const next = findValueElement(value)

        const calcPrevStyle = calcThumbStyle(prev)

        const calcNextStyle = calcThumbStyle(next)

        prevStyle.value = calcPrevStyle
        nextStyle.value = calcNextStyle
      },
      { flush: 'post' },
    )

    let timerid: any
    // motion
    const onAppearStart: TransitionProps['onBeforeEnter'] = (el: any) => {
      nextTick(() => {
        if (el) {
          el.style.transform = `translateX(var(--thumb-start-left))`
          el.style.width = `var(--thumb-start-width)`
        }
      })
    }
    const onAppearActive: TransitionProps['onEnter'] = (el: any) => {
      timerid = setTimeout(() => {
        if (el) {
          addClass(el, `${props.motionName}-appear-active`)
          el.style.transform = `translateX(var(--thumb-active-left))`
          el.style.width = `var(--thumb-active-width)`
        }
      })
    }
    const onAppearEnd: TransitionProps['onAfterLeave'] = (el: any) => {
      nextTick(() => {
        prevStyle.value = null
        nextStyle.value = null
        if (el) {
          el.style.transform = null
          el.style.width = null
          // 移除的时候 一定要移除这个class 否则transform、width变化会有非期待的动画效果
          removeClass(el, `${props.motionName}-appear-active`)
        }
      })
    }

    onBeforeUnmount(() => {
      clearTimeout(timerid)
    })

    const mergedStyle = computed(() => {
      return {
        '--thumb-start-left': thumbStart.value,
        '--thumb-start-width': toPX(prevStyle.value?.width),
        '--thumb-active-left': thumbActive.value,
        '--thumb-active-width': toPX(nextStyle.value?.width),
      }
    })

    return () => {
      const motionProps = {
        class: `${props.prefixCls}-thumb`,
        style: mergedStyle.value,
      }

      return (
        <Transition
          appear
          onBeforeEnter={onAppearStart}
          onEnter={onAppearActive}
          onAfterEnter={onAppearEnd}
        >
          {!prevStyle.value || !nextStyle.value ? null : <div {...motionProps}></div>}
        </Transition>
      )
    }
  },
})
