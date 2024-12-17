import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  render,
  shallowRef,
  toRaw,
  watch,
  watchEffect,
  type Component,
  type CSSProperties,
  type Prop,
  type PropType,
  type Ref,
} from 'vue'
import PropTypes from '../_utils/vue-types'
import { BooleanType } from '../_utils/type'
import classNames from '../_utils/classNames'
import type { RenderFunc } from './interface'
import Filler from './Filler'
import Item from './Item'
import ScrollBar from './ScrollBar'
import useFrameWheel from './hooks/useFrameWheel'

interface ListState {
  scrollTop: number
  scrollMoving: boolean
}
function renderChildren<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
  renderFunc: RenderFunc<T>,
) {
  return list.slice(startIndex, endIndex + 1).map((item, index) => {
    const eleIndex = startIndex + index
    const node = renderFunc(item, eleIndex, {})

    return <Item>{node}</Item>
  })
}

const List = defineComponent({
  name: 'List',
  inheritAttrs: false,
  props: {
    prefixCls: String,
    fullHeight: BooleanType(false),
    height: Number,
    itemHeight: Number,
    data: PropTypes.array,
    virtual: BooleanType(true),
    component: {
      type: [String, Object] as PropType<string | Component>,
    },
  },
  setup(props, { slots }) {
    const { data, virtual, height, itemHeight } = props
    const offsetHeight = ref(0)
    const fillerInnerRef = shallowRef<HTMLDivElement>()
    const componentRef = shallowRef<HTMLElement>()
    const useVirtual = computed(() => {
      return !!(virtual !== false && height && itemHeight)
    })
    const state = reactive<ListState>({
      scrollTop: 0,
      scrollMoving: false,
    })

    const mergedData: Ref<any> = shallowRef([])
    const calRes = reactive<{
      start?: number
      end?: number
      offset?: number
      scrollHeight?: number
    }>({
      start: 0,
      end: 0,
      offset: 0,
      scrollHeight: 0,
    })

    const componentStyle = computed(() => {
      let cs: CSSProperties = {}
      if (height) {
        cs = {
          [props.fullHeight ? 'height' : 'maxHeight']: `${height}px`,
        }

        if (useVirtual.value) {
          cs.overflowY = 'hidden'
        }
      }

      return cs
    })

    // ================================= range =================================
    const maxScrollHeight = computed(() => calRes.scrollHeight! - props.height!)
    const isScrollAtTop = computed(() => state.scrollTop <= 0)
    const isScrollAtBottom = computed(() => state.scrollTop >= maxScrollHeight.value)
    // 确保scrollTop在0 到 maxScrollHeight之间
    const keepInRange = (newScrollTop: number) => {
      let newTop = newScrollTop
      if (!Number.isNaN(maxScrollHeight.value)) {
        newTop = Math.min(newTop, maxScrollHeight.value)
      }
      newTop = Math.max(newTop, 0)
      return newTop
    }

    const [onRawWheel] = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, (offsetY) => {
      // 滚动
      syncScrollTop((top) => {
        return top + offsetY
      })
    })

    // ================================== onScroll ==================================
    function syncScrollTop(newTop: number | ((prevTop: number) => number)) {
      let value: number
      if (typeof newTop === 'function') {
        value = newTop(state.scrollTop)
      } else {
        value = newTop
      }

      const alignedTop = keepInRange(value)
      if (componentRef.value) {
        componentRef.value.scrollTop = alignedTop
      }
      state.scrollTop = alignedTop
    }

    const onFallbackScroll = (e) => {
      // offsetHeight.value =
    }

    const removeEventListener = () => {
      componentRef.value?.removeEventListener('wheel', onRawWheel)
    }

    watch(
      [mergedData, useVirtual],
      () => {
        if (!useVirtual.value) {
          // 非虚拟列表 一次渲染所有dom
          Object.assign(calRes, {
            start: 0,
            end: mergedData.value.length - 1,
            scrollHeight: undefined,
            offset: undefined,
          })
        }
      },
      { immediate: true },
    )

    watch(
      () => data,
      () => {
        mergedData.value = toRaw(data).slice()
      },
      { immediate: true },
    )

    watch(
      [() => props.height, offsetHeight, () => state.scrollTop],
      () => {
        const { itemHeight, height } = props
        const dataLen = mergedData.value.length
        const scrollTop = state.scrollTop
        let itemTop = 0
        let startIndex: number | undefined
        let endIndex: number | undefined
        let startOffset: number | undefined

        const scrollTopHeight = scrollTop + height!
        for (let i = 0; i < dataLen; i++) {
          const item = data[i]
          let cacheHeight = 0
          cacheHeight += itemHeight!
          const currentItemBottom = itemTop + cacheHeight

          // 初次渲染
          if (startIndex === undefined && currentItemBottom >= scrollTop) {
            startIndex = i
            startOffset = itemTop
          }

          if (endIndex === undefined && currentItemBottom > scrollTopHeight) {
            endIndex = i
          }

          itemTop = currentItemBottom
        }

        // data高度还不足以滚动, 则展示所有
        if (endIndex === undefined) {
          endIndex = dataLen - 1
        }

        endIndex = Math.min(endIndex! + 1, dataLen)

        Object.assign(calRes, {
          scrollHeight: itemTop,
          end: endIndex,
          start: startIndex,
          offset: startOffset,
        })
      },
      { immediate: true },
    )

    watchEffect(() => {
      nextTick(() => {
        if (componentRef.value) {
          removeEventListener()
          componentRef.value.addEventListener('wheel', onRawWheel)
        }
      })
    })

    onMounted(() => {
      nextTick(() => {
        // console.log('fillerInnerRef.value', fillerInnerRef.value?.offsetHeight)
      })
    })

    onBeforeUnmount(() => {
      removeEventListener()
    })

    onUpdated(() => {
      nextTick(() => {
        // console.log('fillerInnerRef.value', fillerInnerRef.value?.offsetHeight)
      })
    })

    return {
      mergedData,
      calRes,
      state,
      useVirtual,
      componentStyle,
      fillerInnerRef,
      componentRef,

      // events
      onFallbackScroll,
    }
  },

  render() {
    const {
      data,
      prefixCls = 'rc-virtutal-list',
      component: Component = 'div',
      children = this.$slots.default,
    } = { ...this.$props, ...this.$attrs } as any
    const { mergedData, calRes, componentStyle, height, useVirtual, onFallbackScroll } = this

    const { scrollTop } = this.state
    const { start, end, scrollHeight, offset } = calRes

    // 初版逻辑
    // return data.map((item, index) => {
    //   return slots.default?.(item, index)
    // })
    const mergedClassName = classNames(prefixCls)
    console.log('scrollTop', scrollTop)

    return (
      <div style={{ position: 'relative' }} class={mergedClassName}>
        <Component
          ref="componentRef"
          onScroll={onFallbackScroll}
          class={`${prefixCls}-holder`}
          style={componentStyle}
        >
          <Filler
            ref="fillerInnerRef"
            height={scrollHeight}
            prefixCls={prefixCls}
            offset={offset}
            v-slots={{ default: () => renderChildren(mergedData, start!, end!, children) }}
          />
        </Component>

        {useVirtual && (
          <ScrollBar
            prefixCls={prefixCls}
            key={scrollTop}
            height={height}
            scrollHeight={scrollHeight}
            scrollTop={scrollTop}
          />
        )}
      </div>
    )
  },
})

export default List
