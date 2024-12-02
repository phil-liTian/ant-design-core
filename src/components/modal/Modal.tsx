import { defineComponent, type PropType } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { BooleanType, ObjectType, StringType, type VueNode } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import addEventListener from '../vc-util/Dom/addEventListener'
import Dialog from '../vc-dialog'
import initDefaultProps from '../_utils/props-util'
import Button, { type ButtonProps } from '../button'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import { convertLegacyProps, type LegacyButtonType } from '../button/buttonTypes'

type MousePosition = { x: number; y: number } | null
let mousePosition: MousePosition = null

const getClickPosition = (e: MouseEvent) => {
  mousePosition = { x: e.pageX, y: e.pageY }
}

addEventListener(document.documentElement, 'click', getClickPosition)

// modal的属性
export const modalProps = () => ({
  prefixCls: String,
  visible: BooleanType(undefined),
  open: BooleanType(undefined),
  mask: BooleanType(undefined),

  // header
  // 可string| VNode | function()
  title: PropTypes.any,
  closable: BooleanType(undefined),
  closeIcon: PropTypes.any,

  // footer
  footer: PropTypes.any,
  okText: PropTypes.any,
  cancelText: PropTypes.any,
  okType: StringType<LegacyButtonType>('primary'),
  okButtonProps: ObjectType<ButtonProps>(),
  cancelButtonProps: ObjectType<ButtonProps>(),

  // content
  width: [String, Number],
  content: PropTypes.any,
})

export interface ModalFuncProps {
  // wrapper
  prefixCls?: string
  type: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm'
  width?: string | number
  open?: boolean

  // body
  content: any

  // header
  title?: any
  closable?: boolean
  icon?: (() => VueNode) | VueNode
  closeIcon?: (() => VueNode) | VueNode

  // footer
  footer: any
  okType: LegacyButtonType
  okButtonProps: ButtonProps
  okText?: string
  cancelButtonProps: ButtonProps
  okCancel?: boolean
  cancelText?: string

  // event
  afterClose?: () => void
  onClose?: (e: any) => void
}

export default defineComponent({
  name: 'PModal',
  props: initDefaultProps(modalProps(), {
    width: 520,
  }),
  emits: ['update:open', 'cancel'],
  setup(props, { slots, emit, attrs }) {
    const { okButtonProps } = props
    const { prefixCls } = useConfigInject('modal', props)
    const [WrapSSR] = useStyle(prefixCls)
    const prefixClsVal = prefixCls.value

    const handleCancel = (e) => {
      emit('update:open', false)
      emit('cancel', e)
    }

    const renderFooter = () => {
      const {
        okText = slots.okText?.(),
        cancelText = slots.cancelText?.(),
        okType,
        cancelButtonProps,
      } = props

      // TODO: 国际化, 多语言配置
      return (
        <>
          <Button onClick={handleCancel} {...cancelButtonProps}>
            {cancelText || '取消'}
          </Button>
          <Button {...convertLegacyProps(okType)} {...okButtonProps}>
            {okText || '确认'}
          </Button>
        </>
      )
    }

    return () => {
      const { visible, open, closeIcon = slots.closeIcon?.(), ...restProps } = props

      return WrapSSR(
        <Dialog
          {...restProps}
          visible={open}
          class={[attrs.class]}
          onClose={handleCancel}
          prefixCls={prefixClsVal}
          mousePosition={mousePosition!}
          v-slots={{
            ...slots,
            footer: slots.footer || renderFooter,
            closeIcon: () => {
              return (
                <span class={`${prefixClsVal}-close-x`}>
                  {closeIcon || <CloseOutlined class={`${prefixClsVal}-close-icon`} />}
                </span>
              )
            },
          }}
        />,
      )
    }
  },
})
