import type { OverrideToken } from '../interface'
import type { AliasToken } from '../interface/alias'
import type { MapToken } from '../interface/maps'
import getAlphaColor from './getAlphaColor'

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
    colorTextPlaceholder: token.colorTextQuaternary,
    colorTextDisabled: token.colorTextQuaternary,
    colorTextHeading: token.colorText,
    colorTextLabel: token.colorTextSecondary,
    colorTextDescription: token.colorTextTertiary,
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

    // margin
    marginXXS: token.sizeXXS,
    marginXS: token.sizeXS,
    marginSM: token.sizeSM,
    margin: token.size,
    marginMD: token.sizeMD,
    marginLG: token.sizeLG,
    marginXL: token.sizeXL,
    marginXXL: token.sizeXXL,

    // 分割线的颜色
    colorSplit: getAlphaColor(token.colorBorderSecondary, token.colorBgContainer),
  }

  return aliasToken
}
