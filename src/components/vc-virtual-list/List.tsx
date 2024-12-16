import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  ref,
  render,
  shallowRef,
  toRaw,
  watch,
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
    const useVirtual = computed(() => {
      return !!(virtual !== false && height && itemHeight)
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

    const onFallbackScroll = (e) => {
      console.log('e', e)
    }

    watch(
      [mergedData, useVirtual],
      () => {
        // if (!useVirtual.value) {
        Object.assign(calRes, {
          start: 0,
          end: mergedData.value.length - 1,
          scrollHeight: undefined,
          offset: undefined,
        })
        // }
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
      [() => props.height, offsetHeight],
      () => {
        const { itemHeight } = props
        const dataLen = mergedData.value.length
        let itemTop = 0
        let startIndex: number | undefined
        let endIndex: number | undefined
        for (let i = 0; i < dataLen; i++) {
          const item = data[i]
          let cacheHeight = 0
          cacheHeight += itemHeight!
          const currentItemBottom = itemTop + cacheHeight

          itemTop = currentItemBottom
        }

        Object.assign(calRes, {
          scrollHeight: itemTop,
          // start: startIndex
        })
      },
      { immediate: true },
    )

    onMounted(() => {
      nextTick(() => {
        console.log('fillerInnerRef.value', fillerInnerRef.value?.offsetHeight)
      })
    })

    onUpdated(() => {
      nextTick(() => {
        console.log('fillerInnerRef.value', fillerInnerRef.value?.offsetHeight)
      })
    })

    return {
      mergedData,
      calRes,
      useVirtual,
      componentStyle,
      fillerInnerRef,

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

    const { start, end, scrollHeight } = calRes

    // 初版逻辑
    // return data.map((item, index) => {
    //   return slots.default?.(item, index)
    // })
    const mergedClassName = classNames(prefixCls)

    return (
      <div style={{ position: 'relative' }} class={mergedClassName}>
        <Component onScroll={onFallbackScroll} class={`${prefixCls}-holder`} style={componentStyle}>
          <Filler
            ref="fillerInnerRef"
            height={scrollHeight}
            prefixCls={prefixCls}
            v-slots={{ default: () => renderChildren(mergedData, start!, end!, children) }}
          />
        </Component>
        {useVirtual && <ScrollBar />}
      </div>
    )
  },
})

export default List
