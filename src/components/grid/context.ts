import { inject, provide, type ComputedRef, type InjectionKey, type Ref } from 'vue'

export interface RowContext {
  gutter: ComputedRef<[number, number]>
  wrap: ComputedRef<boolean>
  supportFlexGap: Ref<boolean>
}

export const RowContextKey: InjectionKey<RowContext> = Symbol('RowContextKey')

export const useProvideRow = (context: RowContext) => {
  provide(RowContextKey, context)
}

export const useInjectRow = () => {
  return inject(RowContextKey, undefined)
}

export default useProvideRow
