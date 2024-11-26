import { computed, defineComponent, inject, type CSSProperties } from 'vue'
import { CheckboxGroupContextKey, checkboxProps, type CheckboxProps } from './interface'
import VcCheckbox from '../vc-checkbox/Checkbox'
import useStyle from './style'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import classNames from '../_utils/classNames'
import { flattenChildren } from '../_utils/props-util'

export default defineComponent({
  name: 'PCheckbox',
  props: checkboxProps(),
  setup(props, { emit, slots, attrs }) {
    const { prefixCls, direction, disabled } = useConfigInject('checkbox', props)
    const [wrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value
    const { class: calssName, style, ...restAttrs } = attrs
    const { indeterminate, ...restProps } = props
    const checkboxGroup = inject(CheckboxGroupContextKey)

    const mergedDisabled = computed(() => {
      return checkboxGroup?.disabled.value || props.disabled
    })

    const handleChange = (event) => {
      const targetChecked = event.target.checked
      emit('update:checked', targetChecked)
      emit('change', event)
    }

    const checkboxProps: CheckboxProps = {
      prefixCls: prefixCls.value,
      disabled: mergedDisabled.value,
    }

    if (checkboxGroup) {
      // 被group包裹
    } else {
      checkboxProps.onChange = handleChange
    }

    const classString = classNames(
      {
        [`${prefixClsValue}-wrapper`]: true,
        [`${prefixClsValue}-rtl`]: direction.value === 'rtl',
        [`${prefixClsValue}-wrapper-checked`]: props.checked,
      },
      calssName,
    )

    return () => {
      const children = flattenChildren(slots.default?.() as any)
      return wrapSSR(
        <label class={classString} style={style as CSSProperties}>
          <VcCheckbox {...checkboxProps} /> {children.length ? <span>{children}</span> : null}
        </label>,
      )
    }
  },
})
