import { defineComponent, ref } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import Input from './Input'
import inputProps, { type InputProps } from './inputProps'
import { BooleanType, StringType } from '../_utils/type'
import { cloneElement } from '../_utils/vnode'
import { isValidElement } from '../_utils/props-util'

const defaultIconRender = (visible: boolean) => {
  return visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
}

const ActionMap = {
  click: 'onClick',
  hover: 'onMouseover',
}

export default defineComponent({
  name: 'PInputPassword',
  inheritAttrs: false,
  props: {
    ...inputProps(),
    visible: BooleanType(false),
    visibilityToggle: BooleanType(true),
    iconRender: Function,
    action: StringType<'click' | 'hover'>('click'),
  },
  setup(props, { slots, emit }) {
    const { visibilityToggle, prefixCls } = props
    const visible = ref(false)
    const onVisibleChange = () => {
      console.log('onVisibleChange')

      visible.value = !visible.value
      emit('update:visible', visible.value)
    }

    const getIcon = (prefixCls: string) => {
      const { action, iconRender = slots.iconRender || defaultIconRender } = props
      const icon = iconRender(visible.value)
      const iconTrigger = ActionMap[action]
      const iconProps = {
        // 定义点击或者hover的时候切换visible
        [iconTrigger]: onVisibleChange,
        class: `${prefixCls}-icon`,
      }

      return cloneElement(isValidElement(icon) ? icon : <span>{icon}</span>, iconProps)
    }

    const renderPassword = () => {
      const { ...restProps } = props
      const suffixIcon = visibilityToggle && getIcon(prefixCls)
      const omittedProps = {
        ...restProps,
        type: visible.value ? 'text' : 'password',
        suffix: suffixIcon,
      } as InputProps

      return <Input {...omittedProps} />
    }

    return () => renderPassword()
  },
})
