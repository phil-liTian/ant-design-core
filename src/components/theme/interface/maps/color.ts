export interface ColorNeutralMapToken {
  /**
   * 组件容器背景色
   * 比如: 默认按钮
   */
  colorBgContainer: string

  /**
   * 浮层默认背景图
   */
  colorBgElevated: string

  /**
   * borderColor
   */
  colorBorder: string

  /**
   * 二级边框色
   */
  colorBorderSecondary: string

  /**
   * 一级文本颜色
   */
  colorText: string
  /**
   * 二级文本颜色
   */
  colorTextSecondary: string
  /**
   * 三级文本颜色
   */
  colorTextTertiary: string
  /**
   * 四级文本颜色
   */
  colorTextQuaternary: string

  /**
   * 填充色
   */
  colorFill: string

  /**
   * 二级填充色
   */
  colorFillSecondary: string

  /**
   * 三级填充色
   */
  colorFillTertiary: string

  /**
   * 四级填充色
   */
  colorFillQuaternary: string

  /**
   * 布局背景色
   */
  colorBgLayout: string
}

interface ColorPrimaryMapToken {
  /**
   * 品牌主色
   */
  colorPrimary: string
  colorPrimaryBg: string
  colorPrimaryBorder: string
  colorPrimaryHover: string
  colorPrimaryActive: string

  colorPrimaryBgHover: string // 2
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
  colorInfoText: string
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
