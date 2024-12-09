import type { ExtractPropTypes } from 'vue'
import { inputProps as vcInputProps } from '../vc-input/inputProps'
import omit from '../_utils/omit'

export const inputProps = () => {
  return vcInputProps()
}

export const textareaProps = () => {
  return {
    ...omit(inputProps(), ['addonAfter', 'addonBefore', 'prefix', 'suffix']),
    autoSize: [Boolean, Object],
  }
}

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>

export default inputProps
