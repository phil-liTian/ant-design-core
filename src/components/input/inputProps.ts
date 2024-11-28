import type { ExtractPropTypes } from 'vue'
import { inputProps as vcInputProps } from '../vc-input/inputProps'

export const inputProps = () => {
  return vcInputProps()
}

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>

export default inputProps
