import { computed, inject, provide, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { Gap } from './Row'

export interface RowContext {
  gutter: ComputedRef<[Gap, Gap]>
  wrap: ComputedRef<boolean>
  supportFlexGap: Ref<boolean>
}

export const RowContextKey: InjectionKey<RowContext> = Symbol('RowContextKey')

export const useProvideRow = (context: RowContext) => {
  provide(RowContextKey, context)
}

export const useInjectRow = () => {
  return inject(RowContextKey, {
    gutter: computed(() => undefined as any),
    wrap: computed(() => false),
    supportFlexGap: computed(() => false),
  })
}

export default useProvideRow
