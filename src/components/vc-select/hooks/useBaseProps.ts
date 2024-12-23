import { inject, provide, type InjectionKey } from 'vue'
import type { BaseSelectProps } from '../BaseSelect'
interface BaseSelectContextProps extends BaseSelectProps {
  multiple: boolean
  toggleOpen: (open?: boolean) => void
}

const BaseSelectContextKey: InjectionKey<BaseSelectContextProps> = Symbol('BaseSelectContextKey')

export function useProvideBaseSelectProps(props: BaseSelectContextProps) {
  return provide(BaseSelectContextKey, props)
}

export function useBaseProps() {
  return inject(BaseSelectContextKey, {} as BaseSelectContextProps)
}
