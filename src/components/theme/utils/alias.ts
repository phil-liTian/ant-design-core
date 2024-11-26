import type { OverrideToken } from '../interface'
import type { AliasToken } from '../interface/alias'
import type { MapToken } from '../interface/maps'

type RawMergedToken = MapToken & OverrideToken

export const formatToken = (token: RawMergedToken) => {
  const aliasToken: AliasToken = {
    ...token,

    colorLink: token.colorInfoText,

    paddingContentHorizontalSM: token.sizeSM,
    paddingContentHorizontal: token.size,
    paddingContentHorizontalLG: token.sizeLG,
    paddingContentVertical: token.size,
    paddingContentVerticalLG: token.sizeLG,
    paddingContentVerticalSM: token.sizeXS,

    // Text
    colorTextLightSolid: token.colorWhite,

    opacityLoading: 0.65,

    controlInteractiveSize: token.controlHeight / 2,

    // padding
    paddingXXS: token.sizeXXS,
    paddingXS: token.sizeXS,
    paddingSM: token.sizeSM,
    padding: token.size,
    paddingMD: token.sizeMD,
    paddingLG: token.sizeLG,
    paddingXL: token.sizeXL,
  }

  return aliasToken
}
