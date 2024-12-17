import { computed, defineComponent } from 'vue'
import classNames from '../_utils/classNames'

const MINSIZE = 20
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ScrollBar',
  inheritAttrs: false,
  props: {
    prefixCls: String,
    scrollTop: Number,
    height: Number,
    scrollHeight: Number,
  },
  setup(props) {
    const { scrollTop, height, scrollHeight } = props
    // ============================== calculate ==============================
    const spinHeight = computed(() => {
      let baseHeight = (height! / scrollHeight!) * 100
      baseHeight = Math.max(baseHeight, MINSIZE)
      baseHeight = Math.min(baseHeight, height! / 2)
      return Math.floor(baseHeight)
    })

    // 可滚动的高度
    const enableScrollHeight = computed(() => {
      return scrollHeight! - height! || 0
    })

    const enableHeightRange = computed(() => {
      return height! - spinHeight.value || 0
    })

    const top = computed(() => {
      if (scrollTop === 0 || enableScrollHeight.value === 0) {
        return 0
      }
      const ptg = scrollTop! / enableScrollHeight.value

      return `${ptg * enableHeightRange.value}px`
    })

    const showScroll = computed(() => {
      return scrollHeight! > height!
    })

    return () => {
      const { prefixCls } = props

      return (
        <div
          class={classNames(`${prefixCls}-scrollbar`, {
            [`${prefixCls}-scrollbar-show`]: showScroll.value,
          })}
          style={{
            width: '8px',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            display: showScroll.value ? undefined : 'none',
          }}
        >
          <div
            class={`${prefixCls}-scrollbar-thumb`}
            style={{
              position: 'absolute',
              width: '100%',
              height: `${spinHeight.value}px`,
              top: top.value,
              left: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '99px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          ></div>
        </div>
      )
    }
  },
  // render() {
  //   const { prefixCls } = this.$props
  //   const { spinHeight, enableScrollHeight, top } = this
  // },
})
