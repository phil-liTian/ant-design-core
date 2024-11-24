import {
  computed,
  defineComponent,
  shallowRef,
  Transition,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'
import { BooleanType, FunctionType, tuple, withInstall } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style/index'
import classNames from '../_utils/classNames'
import { getTransitionProps } from '../_utils/transition'

const AlertTypes = tuple('success', 'info', 'warning', 'error')

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
}

const iconMapOutlined = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
}

export const alertProps = () => ({
  type: PropTypes.oneOf(AlertTypes),

  // 是否可关闭
  closable: BooleanType(undefined),
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
  setup(props, { slots, attrs, emit, expose }) {
    let {
      showIcon,
      closeText,
      action,
      closable,
      banner,
      closeIcon: customCloseIcon = slots.closeIcon?.(),
    } = props
    const closed = shallowRef(false)
    const closing = shallowRef(false)
    showIcon = banner && showIcon === undefined ? true : showIcon
    const mergedType = computed(() => {
      if (props.type !== undefined) {
        return props.type
      }

      return banner ? 'warning' : 'info'
    })
    const { prefixCls, direction } = useConfigInject('alert', props)
    const [wrapSSR] = useStyle(prefixCls)
    const message = props.message ?? slots.message?.()
    const description = props.description ?? slots.description?.()

    const prefixClsValue = prefixCls.value

    const alertCls = classNames(prefixClsValue, {
      [`${prefixClsValue}-${mergedType.value}`]: true,
      [`${prefixClsValue}-closing`]: closing.value,
      [`${prefixClsValue}-with-description`]: !!description,
      [`${prefixClsValue}-banner`]: !!banner,
      [`${prefixClsValue}-no-icon`]: !showIcon,
      [`${prefixClsValue}-closable`]: closable,
      [`${prefixClsValue}-rtl`]: direction.value === 'rtl',
    })

    const handleClose = (e: MouseEvent) => {
      e.preventDefault()

      closing.value = true
      emit('close', e)
    }

    const animationEnd = () => {
      closed.value = true
      closing.value = false
      props.afterClose?.()
    }

    expose({ animationEnd })
    const closeIcon = closable ? (
      <button onClick={handleClose} class={`${prefixClsValue}-close-icon`}>
        {closeText ? (
          <span class={`${prefixClsValue}-close-text`}>{closeText}</span>
        ) : (
          customCloseIcon || <CloseOutlined />
        )}
      </button>
    ) : null

    const IconNode = (description ? iconMapOutlined : iconMapFilled)[mergedType.value]

    const transitionProps = getTransitionProps(`${prefixClsValue}-motion`, {
      appear: false,
      css: true,
      // @ts-ignore
      onBeforeLeave: (node: HTMLDivElement) => {
        node.style.maxHeight = `${node.offsetHeight}px`
      },
      // @ts-ignore
      onLeave: (node: HTMLDivElement) => {
        node.style.maxHeight = '0px'
      },
      onAfterLeave: animationEnd,
    })

    return () => {
      return wrapSSR(
        closed.value ? null : (
          <Transition name="fade" {...transitionProps}>
            <div
              role="alert"
              {...attrs}
              class={[alertCls]}
              style={[attrs.style as CSSProperties]}
              v-show={!closing.value}
            >
              {showIcon ? <IconNode class={`${prefixClsValue}-icon`} /> : null}
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
