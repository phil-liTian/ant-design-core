import { computed, defineComponent, shallowRef } from 'vue'
import ResizableTextarea from './ResizableTextArea'
import ClearableLabeledInput from './ClearableLabeledInput'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { textareaProps } from './inputProps'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'PTextarea',
  props: textareaProps(),
  setup(props, { attrs }) {
    const { prefixCls } = useConfigInject('input', props)
    const mergedValue = shallowRef('')

    const showCount = computed(() => props.showCount || false)
    const hasMaxLength = computed(() => Number(props.maxlength) > 0)

    const renderTextArea = () => {
      const resizeProps = {
        prefixCls: prefixCls.value,
        ...attrs,
      }
      return <ResizableTextarea {...resizeProps} />
    }

    return () => {
      const { maxlength } = props
      const inputProps = {
        prefixCls: prefixCls.value,
        inputType: 'text',
      }
      let textareaNode = (
        // @ts-ignore
        <ClearableLabeledInput
          {...inputProps}
          value={mergedValue.value}
          v-slots={{ element: renderTextArea }}
        />
      )

      if (showCount.value) {
        let dataCount = ''
        const valueLength = [...mergedValue.value].length
        if (typeof showCount.value === 'object') {
          dataCount = showCount.value.formatter({
            value: mergedValue.value,
            valueLength,
            maxlength,
          })
        } else {
          dataCount = `${valueLength}${hasMaxLength.value ? ` / ${maxlength}` : ''}`
        }

        // 如何实现计数？？
        textareaNode = (
          <div
            class={classNames(`${prefixCls.value}-textarea`, {
              [`${prefixCls.value}-textarea-show-count`]: showCount.value,
            })}
            data-count={typeof dataCount !== 'object' ? dataCount : undefined}
          >
            {textareaNode}
          </div>
        )
      }

      return textareaNode
    }
  },
})
