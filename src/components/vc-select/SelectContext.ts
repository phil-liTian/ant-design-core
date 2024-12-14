import type { BaseOptionType } from 'ant-design-vue/es/select'
import { inject, provide, type InjectionKey } from 'vue'
import type { FlattenOptionData } from './interface'
import type { OnInternalSelect } from './Select'

export interface SelectContextProps {
  options: BaseOptionType[]
  flattenOptions: FlattenOptionData<BaseOptionType>[]
  onSelect: OnInternalSelect
}

const SelectContextKey: InjectionKey<SelectContextProps> = Symbol('SelectContextKey')

export function useProvideSelectProps(props: SelectContextProps) {
  return provide(SelectContextKey, props)
}

export function useSelectProps() {
  return inject(SelectContextKey, {} as SelectContextProps)
}
