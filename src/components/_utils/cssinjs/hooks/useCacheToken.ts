import { computed } from 'vue'
import { useGlobalCache } from './useGlobalCache'

function getComputedToken(originToken, theme) {
  const derivativeToken = theme.getDerivativeToken(originToken)

  const mergedDerivativeToken = {
    ...derivativeToken,
    ...originToken,
  }

  return mergedDerivativeToken
}

export function useCacheToken(theme, tokens) {
  const mergenToken = computed(() => Object.assign({}, ...tokens.value))

  // 这里会执行derivatives, 真正执行生成衍生token的逻辑
  const mergedDerivativeToken = getComputedToken(mergenToken.value, theme.value)

  const cachedToken = useGlobalCache('token', '', () => {
    return [mergedDerivativeToken]
    // return [mergenToken.value]
  })

  return cachedToken
}
