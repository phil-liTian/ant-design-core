import type { OverrideToken } from '../interface'
import type { AliasToken } from '../interface/alias'
import type { MapToken } from '../interface/maps'
import getAlphaColor from './getAlphaColor'

type RawMergedToken = MapToken & OverrideToken

export const formatToken = (token: RawMergedToken) => {
  const screenXS = 480
  const screenSM = 576
  const screenMD = 768
  const screenLG = 992
  const screenXL = 1200
  const screenXXL = 1600
  const screenXXXL = 2000

  const aliasToken: AliasToken = {
    ...token,

    colorLink: token.colorInfoText,

    paddingContentHorizontalSM: token.sizeSM,
    paddingContentHorizontal: token.size,
    paddingContentHorizontalLG: token.sizeLG,
    paddingContentVertical: token.size,
    paddingContentVerticalLG: token.sizeLG,
    paddingContentVerticalSM: token.sizeXS,
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,

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

    boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,

    controlOutlineWidth: token.lineWidth * 2,
    // Checkbox size and expand icon size
    controlItemBgHover: token.colorFillTertiary,
    controlItemBgActive: token.colorPrimaryBg,
    controlItemBgActiveHover: token.colorPrimaryBgHover,
    controlItemBgActiveDisabled: token.colorFill,
    controlTmpOutline: token.colorFillQuaternary,

    colorFillAlter: token.colorFillQuaternary,

    fontSizeIcon: token.fontSizeSM,

    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXXL - 1,
    screenXXXL,
    screenXXXLMin: screenXXXL,
  }

  return aliasToken
}
