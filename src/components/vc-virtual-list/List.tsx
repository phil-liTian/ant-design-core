import {
  computed,
  defineComponent,
  reactive,
  render,
  shallowRef,
  toRaw,
  watch,
  type Component,
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
    height: Number,
    itemHeight: Number,
    data: PropTypes.array,
    virtual: BooleanType(false),
    component: {
      type: [String, Object] as PropType<string | Component>,
    },
  },
  setup(props, { slots }) {
    const { data, virtual, height, itemHeight } = props
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

    watch(
      () => [useVirtual.value],
      () => {
        if (!useVirtual.value) {
          Object.assign(calRes, {
            start: 0,
            end: mergedData.value.length - 1,
            scrollHeight: 0,
            offset: undefined,
          })
        }
      },
    )

    watch(
      () => data,
      () => {
        mergedData.value = toRaw(data).slice()
      },
    )

    return {
      mergedData,
      calRes,
      useVirtual,
    }
  },

  render() {
    const {
      useVirtual,
      data,
      prefixCls = 'rc-virtutal-list',
      component: Component = 'div',
      children = this.$slots.default,
    } = { ...this.$props, ...this.$attrs } as any
    const { mergedData, calRes } = this
    const { start, end } = calRes
    // 初版逻辑
    // return data.map((item, index) => {
    //   return slots.default?.(item, index)
    // })
    const mergedClassName = classNames(prefixCls)

    return (
      <div style={{ position: 'relative' }} class={mergedClassName}>
        <Component class={`${prefixCls}-holder`}>
          <Filler
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
