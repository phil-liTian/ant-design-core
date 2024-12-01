import { defineComponent } from 'vue'
import { BooleanType, ObjectType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import Dialog from '../vc-dialog'
import initDefaultProps from '../_utils/props-util'
import Button, { type ButtonProps } from '../button'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import { convertLegacyProps, type LegacyButtonType } from '../button/buttonTypes'

export const modalProps = () => ({
  visible: BooleanType(undefined),
  open: BooleanType(undefined),
  mask: BooleanType(undefined),

  // header
  // 可string| VNode | function()
  title: PropTypes.any,
  closable: BooleanType(undefined),

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

export default defineComponent({
  name: 'PModal',
  props: initDefaultProps(modalProps(), {
    width: 520,
  }),
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const { okButtonProps } = props
    const { prefixCls } = useConfigInject('modal', props)
    const [WrapSSR] = useStyle(prefixCls)
    const prefixClsVal = prefixCls.value

    const handleCancel = () => {
      emit('update:open', false)
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
      const { visible, open, ...restProps } = props

      return WrapSSR(
        <Dialog
          {...restProps}
          visible={open}
          prefixCls={prefixClsVal}
          v-slots={{ ...slots, footer: slots.footer || renderFooter }}
        />,
      )
    }
  },
})
