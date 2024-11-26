import { defineComponent, type ExtractPropTypes } from 'vue'
import { useProvideRadioGroup } from './context'
import { ArrayType } from '../_utils/type'
import Radio from '.'

export const radioGroupProps = () => ({
  options: ArrayType<string | number>(),
})

export type RadioGroupProps = Partial<ExtractPropTypes<ReturnType<typeof radioGroupProps>>>

export default defineComponent({
  name: 'PRadioGroup',
  props: radioGroupProps(),
  setup(props) {
    const { options } = props
    useProvideRadioGroup({})

    return () => {
      let children: any = null
      if (options.length) {
        children = options.map((option) => <Radio></Radio>)
      }
      return <div>{children}</div>
    }
  },
})
