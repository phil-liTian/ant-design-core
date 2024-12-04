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

    colorIcon: token.colorTextTertiary,
    colorIconHover: token.colorText,

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

    // font
    fontWeightStrong: 600,

    // @internal
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
  }

  return aliasToken
}
