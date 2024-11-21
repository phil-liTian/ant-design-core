import { defineComponent, shallowRef, Transition, type ExtractPropTypes } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { BooleanType, FunctionType, tuple, withInstall } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style/index'
import classNames from '../_utils/classNames'
import { getTransitionProps } from '../_utils/transition'

const AlertTypes = tuple('success', 'info', 'warning', 'error')

export const alertProps = () => ({
  type: PropTypes.oneOf(AlertTypes),

  // 是否可关闭
  closeable: BooleanType(undefined),
  closeText: PropTypes.any,
  message: PropTypes.any,
  description: PropTypes.any,
  showIcon: BooleanType(undefined),
  prefixCls: PropTypes.string,
  action: PropTypes.any,

  banner: BooleanType(undefined),
  icon: PropTypes.any,
  closeIcon: PropTypes.any,

  afterClose: FunctionType(),
})

export type AlertProps = Partial<ExtractPropTypes<ReturnType<typeof alertProps>>>

const Alert = defineComponent({
  name: 'PAlert',
  props: alertProps(),
  setup(props, { slots, attrs, emit }) {
    const { showIcon, action } = props
    const closed = shallowRef(false)
    const closing = shallowRef(false)
    const { prefixCls } = useConfigInject('alert', props)
    const [wrapSSR] = useStyle(prefixCls)
    const message = props.message ?? slots.message?.()
    const description = props.description ?? slots.description?.()

    const prefixClsValue = prefixCls.value

    const alertCls = classNames(prefixClsValue, {})

    const closeIcon = <CloseOutlined />

    const transitionProps = getTransitionProps(prefixClsValue, {
      appear: true,
      onAfterLeave: () => {},
    })
    return () => {
      return wrapSSR(
        closed.value ? null : (
          <Transition {...transitionProps}>
            <div role="alert" class={[alertCls]} v-show={!closing.value}>
              {showIcon ? '' : null}
              <div class={`${prefixClsValue}-content`}>
                {message ? <div class={`${prefixClsValue}-message`}>{message}</div> : null}
                {description ? (
                  <div class={`${prefixClsValue}-description`}>{description}</div>
                ) : null}
              </div>
              {action ? <div class={`${prefixClsValue}-action`}>{action}</div> : null}
              {closeIcon}
            </div>
          </Transition>
        ),
      )
    }
  },
})

export default withInstall(Alert)
