import { computed, defineComponent, ref, Transition, type CSSProperties } from 'vue'
import Button from '../button'
import { dialogPropTypes } from './IDialogPropTypes'

export default defineComponent({
  name: 'DialogContent',
  props: {
    ...dialogPropTypes(),
  },

  setup(props, { slots }) {
    const contentStyleRef = computed(() => {
      const { width, height } = props
      const contentStyle: CSSProperties = {}
      if (width !== undefined) {
        contentStyle.width = typeof width === 'number' ? `${width}px` : width
      }
      return contentStyle
    })

    return () => {
      const { prefixCls, footer = slots.footer?.(), title = slots.title?.() } = props

      let headerNode: any
      if (title) {
        headerNode = (
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-title`}>{title}</div>
          </div>
        )
      }

      let footerNode: any
      if (footer) {
        footerNode = <div class={`${prefixCls}-footer`}>{footer}</div>
      }

      const transformOrigin = ref<string>()

      const content = (
        <div class={`${prefixCls}-content`}>
          {headerNode}
          <div class={`${prefixCls}-body`}>
            {/* 暴露给用户使用的默认插槽 */}
            {slots.default?.()}
          </div>
          {footerNode}
        </div>
      )

      return (
        <Transition>
          <div class={prefixCls} style={contentStyleRef.value}>
            {content}
          </div>
        </Transition>
      )
    }
  },
})
