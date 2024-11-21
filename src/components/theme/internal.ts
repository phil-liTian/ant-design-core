import { computed, type ComputedRef } from 'vue'
import { useCacheToken } from '../_utils/cssinjs/hooks/useCacheToken'
import defaultSeedToken from '../theme/themes/seed'

export function useToken(): [any, ComputedRef<any>] {
  const cacheToken = useCacheToken(
    '',
    computed(() => [defaultSeedToken]),
  )

  return ['', computed(() => cacheToken.value[0])]
}
