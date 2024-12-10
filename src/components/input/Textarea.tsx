import { computed, defineComponent, getCurrentInstance, shallowRef, watch, watchEffect } from 'vue'
import ResizableTextarea from './ResizableTextArea'
import ClearableLabeledInput from './ClearableLabeledInput'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { textareaProps } from './inputProps'
import classNames from '../_utils/classNames'
import omit from '../_utils/omit'
import { emit } from 'process'
import { fixControlledValue } from '../vc-input/utils/commonUtil'

export default defineComponent({
  name: 'PTextarea',
  props: textareaProps(),
  setup(props, { attrs, emit }) {
    const { prefixCls } = useConfigInject('input', props)
    const mergedValue = shallowRef<string>('')
    const stateValue = shallowRef(props.value ?? props.defaultValue)

    const showCount = computed(() => props.showCount || false)
    const hasMaxLength = computed(() => Number(props.maxlength) > 0)

    const triggerChange = (e) => {
      emit('update:value', e.target.value)
    }
    const setValue = (value) => {
      stateValue.value = value
    }

    const handleChange = (e) => {
      let triggerValue = e.target.value
      console.log('triggerValue', triggerValue)

      triggerChange(e)
      setValue(triggerValue)
    }

    const renderTextArea = () => {
      const resizeProps = {
        ...omit(props, ['allowClear']),
        ...attrs,
        prefixCls: prefixCls.value,
        onChange: handleChange,
        onInput: handleChange,
      }

      return <ResizableTextarea {...resizeProps} />
    }
    const instance = getCurrentInstance()

    watch(
      () => props.value,
      (val) => {
        if ('value' in (instance?.vnode.props || {})) {
          stateValue.value = val
        }
      },
    )

    watchEffect(() => {
      let val = fixControlledValue(stateValue.value!)
      mergedValue.value = val
    })

    return () => {
      const { maxlength } = props
      const inputProps = {
        prefixCls: prefixCls.value,
        inputType: 'text',
      }
      console.log('mergedValue.value', mergedValue.value)

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
