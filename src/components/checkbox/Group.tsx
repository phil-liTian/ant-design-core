import { computed, defineComponent, provide, watch, ref, type ComputedRef } from 'vue'
import { CheckboxGroupContextKey, checkboxGroupProps, type CheckOptionType } from './interface'
import Checkbox from './Checkbox'
import useConfigInject from '../config-provider/hooks/useConfigInject'

export default defineComponent({
  name: 'PCheckboxGroup',
  props: checkboxGroupProps(),
  setup(props, { slots, attrs, emit }) {
    const mergedValue = ref(props.defaultValue ?? (props.value || []))

    watch(
      () => props.value,
      () => {
        mergedValue.value = props.value || []
      },
    )

    const options: any = computed(() => {
      return props.options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            label: option,
            value: option,
          }
        }

        return option
      })
    })
    const { prefixCls } = useConfigInject('checkbox', props)
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`)

    const toggleOption = (option: CheckOptionType) => {
      const optionIndex = mergedValue.value.indexOf(option.value)
      const value = [...mergedValue.value]

      if (optionIndex === -1) {
        value.push(option.value)
      } else {
        value.splice(optionIndex, 1)
      }

      emit('update:value', value)
      emit('change', value)
    }

    provide(CheckboxGroupContextKey, {
      name: computed(() => props.name!),
      disabled: computed(() => props.disabled),
      toggleOption,
      mergedValue,
    })

    return () => {
      let children: any = null
      if (options.value?.length > 0) {
        children = options.value.map((option) => {
          return (
            <Checkbox
              prefixCls={prefixCls.value}
              value={option.value}
              checked={mergedValue.value.indexOf(option.value) !== -1}
              onChange={option.onChange}
            >
              {/* 支持label为vnode */}
              {slots.label ? slots.label(option) : option.label}
            </Checkbox>
          )
        })
      }

      return <div class={[groupPrefixCls.value, attrs.class]}>{children || slots.default?.()}</div>
    }
  },
})
