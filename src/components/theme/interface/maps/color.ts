interface ColorNeutralMapToken {
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
}

export interface ColorMapToken extends ColorNeutralMapToken, ColorPrimaryMapToken {}
