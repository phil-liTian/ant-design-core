import { provide, inject, type InjectionKey } from 'vue'
import type { RadioGroupContext, RadioOptionTypeContextProps } from './interface'

// ===================RadioGroup=========================
const RadioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContextKey')

export const useProvideRadioGroup = (props: RadioGroupContext) => {
  provide(RadioGroupContextKey, props)
}

export const useInjectRadioGroup = () => {
  return inject(RadioGroupContextKey, null)
}

// ===================ButtonGroup=========================
const radioOptionTypeContextKey: InjectionKey<RadioOptionTypeContextProps> = Symbol(
  'radioOptionTypeContextKey',
)
export const useProvideRadioOptionTypeContext = (props: RadioOptionTypeContextProps) => {
  provide(radioOptionTypeContextKey, props)
}

export const useInjectRadioOptionTypeContext = () => {
  return inject(radioOptionTypeContextKey, undefined)
}
