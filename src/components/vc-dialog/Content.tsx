import { computed, defineComponent, nextTick, ref, Transition, type CSSProperties } from 'vue'
import Button from '../button'
import { dialogPropTypes } from './IDialogPropTypes'
import { offset } from './util'
import { getTransitionProps } from '../_utils/transition'

export default defineComponent({
  name: 'DialogContent',
  inheritAttrs: false,
  props: {
    ...dialogPropTypes(),
    motionName: String,
  },

  setup(props, { slots, attrs }) {
    const transformOrigin = ref<string>()
    const dialogRef = ref<HTMLDivElement>()

    const contentStyleRef = computed(() => {
      const { width, height } = props
      const contentStyle: CSSProperties = {}
      if (width !== undefined) {
        contentStyle.width = typeof width === 'number' ? `${width}px` : width
      }

      if (transformOrigin.value) {
        contentStyle.transformOrigin = transformOrigin.value
      }

      return contentStyle
    })

    const onPrepare = () => {
      nextTick(() => {
        if (dialogRef.value) {
          const { left, top } = offset(dialogRef.value)
          transformOrigin.value = props.mousePosition
            ? `${props.mousePosition.x - left}px ${props.mousePosition.y - top}px`
            : ''
        }
      })
    }

    return () => {
      const {
        prefixCls,
        footer = slots.footer?.(),
        title = slots.title?.(),
        bodyStyle,
        closeIcon = slots.closeIcon?.(),
        closable,
        onClose,
        visible,
        motionName,
      } = props

      // header
      let headerNode: any
      if (title) {
        headerNode = (
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-title`}>{title}</div>
          </div>
        )
      }

      // close
      let closeNode: any
      if (closable) {
        closeNode = (
          <Button
            onClick={onClose}
            class={`${prefixCls}-close`}
            icon={closeIcon}
            type="text"
            size="small"
          >
            {closeIcon || <span class={`${prefixCls}-close-x`} />}
          </Button>
        )
      }

      // footer
      let footerNode: any
      if (footer) {
        footerNode = <div class={`${prefixCls}-footer`}>{footer}</div>
      }

      const content = (
        <div class={`${prefixCls}-content`} style={bodyStyle}>
          {closeNode}
          {headerNode}
          <div class={`${prefixCls}-body`}>
            {/* 暴露给用户使用的默认插槽 */}
            {slots.default?.()}
          </div>
          {footerNode}
        </div>
      )

      const onVisibleChanged = (visible: boolean) => {
        console.log('onVisibleChanged', visible)
      }
      const transitionProps = getTransitionProps(motionName!)

      return (
        <Transition
          {...transitionProps}
          onBeforeEnter={onPrepare}
          onAfterEnter={() => onVisibleChanged(true)}
          onAfterLeave={() => onVisibleChanged(false)}
        >
          {visible ? (
            <div
              v-show={visible}
              ref={dialogRef}
              class={[prefixCls, attrs.class]}
              style={contentStyleRef.value}
            >
              {content}
            </div>
          ) : null}
        </Transition>
      )
    }
  },
})
