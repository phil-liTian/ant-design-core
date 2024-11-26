import { computed, defineComponent, provide } from 'vue'
import { CheckboxGroupContextKey, checkboxGroupProps } from './interface'
import Checkbox from './Checkbox'

export default defineComponent({
  name: 'PCheckboxGroup',
  props: checkboxGroupProps(),
  setup(props, { slots, attrs }) {
    const options = computed(() => [])

    provide(CheckboxGroupContextKey, {
      name: computed(() => props.name!),
      disabled: computed(() => props.disabled),
    })

    return () => {
      let children: any = null
      if (options.value?.length > 0) {
        children = options.value.map((option) => <Checkbox></Checkbox>)
      }

      return <div class={attrs}>{children || slots.default?.()}</div>
    }
  },
})
