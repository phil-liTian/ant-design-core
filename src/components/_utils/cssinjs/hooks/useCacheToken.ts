import { computed, ref } from 'vue'
import { useGlobalCache } from './useGlobalCache'

function getComputedToken<DerivativeToken extends object>(
  originToken,
  theme,
  format?: (token) => DerivativeToken,
) {
  const derivativeToken = theme.getDerivativeToken(originToken)

  let mergedDerivativeToken = {
    ...derivativeToken,
    ...originToken,
  }

  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken)
  }

  return mergedDerivativeToken
}

export function useCacheToken(theme, tokens, options = ref({})) {
  const { formatToken } = options.value
  const mergenToken = computed(() => Object.assign({}, ...tokens.value))

  // 这里会执行derivatives, 真正执行生成衍生token的逻辑
  const mergedDerivativeToken = getComputedToken(mergenToken.value, theme.value, formatToken)

  const cachedToken = useGlobalCache('token', '', () => {
    return [mergedDerivativeToken]
    // return [mergenToken.value]
  })

  return cachedToken
}
