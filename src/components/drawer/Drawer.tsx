import { computed, defineComponent, type CSSProperties } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { drawProps } from './index'
import VcDrawer from '../vc-drawer'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import { getPropsSlot } from '../_utils/props-util'
import classNames from '../_utils/classNames'
import { getTransitionName, getTransitionProps } from '../_utils/transition'
import type { IPlacement } from '../vc-drawer/src/IDrawerPropTypes'
import isNumeric from '../_utils/isNumberic'

const drawer = defineComponent({
  name: 'pDrawer',
  inheritAttrs: false,
  props: drawProps(),
  emits: ['close', 'update:open', 'afterOpenChange'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useConfigInject('drawer', props)
    const [WrapSSR] = useStyle(prefixCls)

    const close = (e) => {
      emit('close', e)
      emit('update:open', false)
    }

    const afterVisibleChange = (open: boolean) => {
      emit('afterOpenChange', open)
    }

    // closeIcon
    const renderCloseIcon = (prefixCls: string) => {
      const { closable } = props
      const $closeIcon = getPropsSlot(slots, props, 'closeIcon')
      return (
        closable && (
          <button onClick={close} class={classNames(`${prefixCls}-close`)}>
            {$closeIcon || <CloseOutlined />}
          </button>
        )
      )
    }

    // header
    const renderHeader = (prefixCls: string) => {
      const {} = props
      const title = getPropsSlot(slots, props, 'title')
      const extra = getPropsSlot(slots, props, 'extra')

      return (
        <div class={classNames(`${prefixCls}-header`)}>
          <div class={`${prefixCls}-header-title`}>
            {renderCloseIcon(prefixCls)}
            {title && <div class={`${prefixCls}-title`}>{title}</div>}
          </div>
          {extra && <div class={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      )
    }

    // footer
    const renderFooter = (prefixCls: string) => {
      const footer = getPropsSlot(slots, props, 'footer')
      if (!footer) return null
      return <div class={classNames(`${prefixCls}-footer`)}>{footer}</div>
    }

    // body
    const renderBody = (prefixCls: string) => {
      const { bodyStyle } = props
      return (
        <div class={classNames(`${prefixCls}-wrapper-body`)}>
          {renderHeader(prefixCls)}
          <div class={`${prefixCls}-body`} style={bodyStyle}>
            {slots.default?.()}
          </div>
          {renderFooter(prefixCls)}
        </div>
      )
    }
    // =============== size ===============
    const mergedWidth = computed(() => ((props.width ?? props.size === 'large') ? 736 : 378))
    const mergedHeigth = computed(() => ((props.height ?? props.size === 'large') ? 736 : 378))
    const offsetStyle = computed(() => {
      const { placement } = props
      let val: CSSProperties = {}

      if (placement === 'left' || placement === 'right') {
        val.width = isNumeric(mergedWidth.value) ? `${mergedWidth.value}px` : mergedWidth.value
      } else {
        val.height = isNumeric(mergedHeigth.value) ? `${mergedHeigth.value}px` : mergedHeigth.value
      }

      return val
    })

    const wrapperStyle = computed(() => {
      const { contentWrapperStyle, zIndex } = props
      const val = offsetStyle.value
      return {
        zIndex,
        ...val,
        ...contentWrapperStyle,
      }
    })

    // =============== motion ===============
    const maskMotion = computed(() => {
      return getTransitionProps(getTransitionName(prefixCls.value, 'mask-motion'))
    })

    const panelMotion = (placement: IPlacement) => {
      return getTransitionProps(getTransitionName(prefixCls.value, `panel-motion-${placement}`))
    }

    const getContainer = computed(() => {
      return () => document.body
    })

    return () => {
      const { width, height, ...rest } = props
      // motion

      const vcDrawerProps: any = {
        ...rest,
        maskMotion: maskMotion.value,
        afterVisibleChange,
        prefixCls: prefixCls.value,
        onClose: close,
      }

      return WrapSSR(
        <VcDrawer
          {...vcDrawerProps}
          contentWrapperStyle={wrapperStyle.value}
          motion={panelMotion}
          getContainer={getContainer.value}
          v-slots={{
            handle: props.handle ? () => props.handle : slots.handle,
            default: () => renderBody(prefixCls.value),
          }}
        />,
      )
    }
  },
})

export default drawer
