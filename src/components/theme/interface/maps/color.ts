export interface ColorNeutralMapToken {
  /**
   * 组件容器背景色
   * 比如: 默认按钮
   */
  colorBgContainer: string
}

interface ColorPrimaryMapToken {
  /**
   * 品牌主色
   */
  colorPrimary: string
  colorPrimaryBg: string
  colorPrimaryBorder: string
}

interface ColorSuccessMapToken {
  /**
   * 成功色的浅色背景色
   */
  colorSuccessBg: string
  colorSuccessBorder: string
  colorSuccess: string
}

interface ColorWarningMapToken {
  /**
   * 警告色的浅色背景色
   */
  colorWarningBg: string
  colorWarningBorder: string
  colorWarning: string
}

interface ColorInfoMapToken {
  /**
   * 信息色的浅色背景色
   */
  colorInfo: string
  colorInfoBg: string
  colorInfoBorder: string
}

interface ColorErrorMapToken {
  /**
   * 错误色的浅色背景色
   */
  colorErrorBg: string
  colorError: string
  colorErrorBorder: string
}

export interface ColorMapToken
  extends ColorNeutralMapToken,
    ColorPrimaryMapToken,
    ColorErrorMapToken,
    ColorSuccessMapToken,
    ColorWarningMapToken,
    ColorInfoMapToken {
  /**
   * 纯白色
   * @default #ffffff
   */
  colorWhite: string

  /**
   * 蒙层的背景颜色
   * 例如 Modal和Drawer使用该token
   */
  colorBgMask: string
}
