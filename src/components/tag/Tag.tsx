import { computed, defineComponent, shallowRef, type CSSProperties } from 'vue'
import { tagProps } from './interface'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import Wave from '../_utils/wave'
import useStyle from './style'
import { CloseOutlined } from '@ant-design/icons-vue'
import classNames from '../_utils/classNames'
import { isPresetColor, isPresetStatusColor } from '../_utils/colors'

export default defineComponent({
  name: 'PTag',
  props: tagProps(),
  emits: ['close', 'update:value', 'click'],
  setup(props, { slots, attrs, emit }) {
    const { prefixCls } = useConfigInject('tag', props)
    const [WrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value

    const visible = shallowRef(true)
    const handleCloseClick = (e) => {
      e.stopPropagation()
      emit('update:value', false)
      emit('close', e)
    }

    const isInternalColor = computed(() => {
      return isPresetColor(props.color) || isPresetStatusColor(props.color)
    })

    return () => {
      const { icon = slots.icon?.(), closable, closeIcon = slots.closeIcon?.(), color } = props
      const isNeewWave = props.onClick !== undefined
      const children = slots.default?.()

      const handleClick = (e) => {
        emit('click', e)
      }

      const tagClassName = classNames(prefixClsValue, {
        [`${prefixClsValue}-${props.color}}`]: isInternalColor.value,
        [`${prefixClsValue}-has-color`]: props.color && isInternalColor.value,
        [`${prefixClsValue}-hidden`]: !visible.value,
        [`${prefixClsValue}-borderless`]: !props.bordered,
      })

      const tagStyle = {
        backgroundColor: color && !isInternalColor.value ? color : undefined,
      } as CSSProperties

      const renderCloseIcon = closable ? (
        closeIcon ? (
          <span class={`${prefixClsValue}-close-icon`} onClick={handleCloseClick}>
            {closeIcon}
          </span>
        ) : (
          <CloseOutlined class={`${prefixClsValue}-close-icon`} onClick={handleCloseClick} />
        )
      ) : null

      const kids = icon ? (
        <>
          {icon} <span>{children}</span>
        </>
      ) : (
        children
      )

      const tagNode = (
        <span
          onClick={handleClick}
          class={[tagClassName, attrs.class]}
          style={[tagStyle, attrs.style as CSSProperties]}
        >
          {kids}
          {renderCloseIcon}
        </span>
      )

      return WrapSSR(isNeewWave ? <Wave>{tagNode}</Wave> : tagNode)
    }
  },
})
