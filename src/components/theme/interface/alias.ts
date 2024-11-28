import type { MapToken } from './maps'

export interface AliasToken extends MapToken {
  // 关闭按钮
  closeIcon: string
  closeIconHover: string

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

  // text
  colorTextLightSolid: string

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
}
