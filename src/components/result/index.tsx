import { computed, defineComponent, type ExtractPropTypes } from 'vue'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  WarningFilled,
} from '@ant-design/icons-vue'
import PropTypes from '../_utils/vue-types'
import { withInstall } from '../_utils/type'
import classNames from '../_utils/classNames'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import NoFound from './noFound'
import Unauthorized from './unAuthorized'
import ServerError from './serverError'

export const IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
}

export const ExceptionMap = {
  '404': NoFound,
  '500': ServerError,
  '403': Unauthorized,
}

export type ExceptionStatusType = 403 | 404 | 500 | '403' | '404' | '500'
const ExceptionStatus = Object.keys(ExceptionMap)

const resultProps = () => ({
  prefixCls: String,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  status: PropTypes.oneOf(['success', 'error', 'info', 'warning', 'validating']),
  icon: PropTypes.any,
  extra: PropTypes.any,
})

export type ResultProps = Partial<ExtractPropTypes<ReturnType<typeof resultProps>>>
const renderIcon = (prefixCls: string, { status, icon }) => {
  if (ExceptionStatus.includes(status)) {
    const SVGComponet = ExceptionMap[status]
    return (
      <div class={`${prefixCls}-icon ${prefixCls}-image`}>
        <SVGComponet />
      </div>
    )
  }
  const IconComponent = IconMap[status]
  const IconNode = icon || <IconComponent />
  return <div class={`${prefixCls}-icon`}>{IconNode}</div>
}

const Result = defineComponent({
  name: 'PResult',
  props: resultProps(),
  setup(props, { slots, emit }) {
    const { prefixCls } = useConfigInject('result', props)
    const [WrapSSR] = useStyle(prefixCls)

    const className = computed(() => {
      return classNames(prefixCls.value, `${prefixCls.value}-${props.status}`, {})
    })
    return () => {
      const {
        title = slots.title?.(),
        subTitle = slots.subTitle?.(),
        icon,
        status,
        extra = slots.extra?.(),
      } = props
      const pre = prefixCls.value
      return WrapSSR(
        <div class={[className.value]}>
          {renderIcon(pre, { status, icon })}
          <div class={`${pre}-title`}>{title}</div>
          {subTitle && <div class={`${pre}-subtitle`}>{subTitle}</div>}
          {extra && <div class={`${pre}-extra`}>{extra}</div>}
          {slots.default && <div class={`${pre}-content`}>{slots.default?.()}</div>}
        </div>,
      )
    }
  },
})

export default withInstall(Result)
