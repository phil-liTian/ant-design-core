import { useGlobalCache } from './useGlobalCache'

export function useCacheToken(theme, tokens) {
  const cacheToken = useGlobalCache()
  return cacheToken
}
