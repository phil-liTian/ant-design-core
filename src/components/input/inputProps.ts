import type { ExtractPropTypes, PropType } from 'vue'
import { inputProps as vcInputProps } from '../vc-input/inputProps'
import omit from '../_utils/omit'

export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

export const inputProps = () => {
  return vcInputProps()
}

export const textareaProps = () => {
  return {
    ...omit(inputProps(), ['addonAfter', 'addonBefore', 'prefix', 'suffix']),
    autoSize: {
      type: [Boolean, Object] as PropType<boolean | AutoSizeType>,
    },
  }
}

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>

export default inputProps
