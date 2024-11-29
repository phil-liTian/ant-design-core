import { defineComponent } from 'vue'
import { checkboxTagProps } from './interface'
import classNames from '../_utils/classNames'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'

export default defineComponent({
  name: 'PCheckboxTag',
  props: checkboxTagProps(),
  emits: ['update:checked', 'click'],
  setup(props, { slots, attrs, emit }) {
    const { prefixCls } = useConfigInject('tag', props)
    const [WarpSSR] = useStyle(prefixCls)
    const prefixClsVal = prefixCls.value
    const handleClick = (e) => {
      const { checked } = props
      emit('update:checked', !checked)
      emit('click', e)
    }
    return () => {
      const cls = classNames(prefixClsVal, {
        [`${prefixClsVal}-checkable`]: true,
        [`${prefixClsVal}-checkable-checked`]: props.checked,
      })
      return WarpSSR(
        <span class={[cls, attrs.class]} onClick={handleClick}>
          {slots.default?.()}
        </span>,
      )
    }
  },
})
