import { defineComponent } from 'vue'
import { checkboxProps } from './interface'
import VcCheckbox from '../vc-checkbox/Checkbox'
import useStyle from './style'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import classNames from '../_utils/classNames'
import { flattenChildren } from '../_utils/props-util'

export default defineComponent({
  name: 'PCheckbox',
  props: checkboxProps(),
  setup(props, { emit, slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('checkbox', props)
    const [wrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value
    const { indeterminate } = props
    const { class: calssName } = attrs

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
        <label class={classString}>
          <VcCheckbox /> {children.length ? <span>{children}</span> : null}
        </label>,
      )
    }
  },
})
