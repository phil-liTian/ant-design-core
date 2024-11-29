import type { Ref } from 'vue'

export interface RadioGroupContext {
  value: Ref<any>
  onChange: (e: any) => void
  optionType: Ref<RadioGroupOptionType>
}

export interface RadioOptionTypeContextProps {}

export type RadioGroupOptionType = 'default' | 'button'
