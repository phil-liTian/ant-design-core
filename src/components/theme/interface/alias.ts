import type { MapToken } from './maps'

export interface AliasToken extends MapToken {
  // 关闭按钮
  closeIcon: string
  closeIconHover: string

  // Background
  colorFillAlter: string

  // font
  fontSizeIcon: string

  // padding content
  paddingContentVertical: number
  paddingContentVerticalSM: number
  paddingContentVerticalLG: number
  paddingContentHorizontal: number
  paddingContentHorizontalSM: number
  paddingContentHorizontalLG: number

  // switch & button default outline
  controlTmpOutline: string

  //
  colorLink: string

  // opacity
  opacityLoading: number

  // Control
  controlInteractiveSize: number

  // padding
  paddingXXS: number
  paddingXS: number
  paddingSM: number
  padding: number
  paddingMD: number
  paddingLG: number
  paddingXL: number

  // margin
  marginXXS: number
  marginXS: number
  marginSM: number
  margin: number
  marginMD: number
  marginLG: number
  marginXL: number
  marginXXL: number

  // Text
  colorTextPlaceholder: string
  colorTextDisabled: string
  colorTextHeading: string
  colorTextLabel: string
  colorTextDescription: string
  colorTextLightSolid: string

  // 分割线的颜色
  colorSplit: string
  // icon hover的颜色
  colorIconHover: string
  colorIcon: string

  // @internal
  boxShadowDrawerLeft: string
  boxShadowDrawerRight: string
  boxShadowDrawerDown: string
  boxShadowDrawerUp: string
}
