import type { OverrideToken } from '../interface'
import type { AliasToken } from '../interface/alias'
import type { MapToken } from '../interface/maps'

type RawMergedToken = MapToken & OverrideToken

export const formatToken = (token: RawMergedToken) => {
  const aliasToken: AliasToken = {
    ...token,

    paddingContentHorizontalSM: token.sizeSM,
    paddingContentHorizontal: token.size,
    paddingContentHorizontalLG: token.sizeLG,
    paddingContentVertical: token.size,
    paddingContentVerticalLG: token.sizeLG,
    paddingContentVerticalSM: token.sizeXS,
  }

  return aliasToken
}
