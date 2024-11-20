import { computed } from 'vue'
import { useCacheToken } from '../_utils/cssinjs/hooks/useCacheToken'
import defaultSeedToken from '../theme/themes/seed'

export function useToken() {
  // const cacheToken = useCacheToken(
  //   '',
  //   computed(() => [defaultSeedToken]),
  // )
  return ['', computed(() => defaultSeedToken)]
}
