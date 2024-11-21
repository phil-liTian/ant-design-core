import { computed } from 'vue'
import { useGlobalCache } from './useGlobalCache'

export function useCacheToken(theme, tokens) {
  const mergenToken = computed(() => Object.assign({}, ...tokens.value))

  const cachedToken = useGlobalCache('token', '', () => {
    return [mergenToken.value]
  })

  return cachedToken
}
