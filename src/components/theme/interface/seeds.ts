export interface SeedToken {
  /**
   * 主色
   */
  colorPrimary: string

  /**
   * 信息色
   */
  colorInfo: string

  /**
   * 成功色
   */
  colorSuccess: string

  /**
   * 警告色
   */
  colorWarning: string

  /**
   * 错误色
   */
  colorError: string

  // ---------------- line -------------------
  lineWidth: number
  lineType: string

  // ---------------- motion -------------------

  // 时长变化单位
  motionUnit: number

  // 基础动画时长
  motionBase: number
  motionEaseInOutCirc: string
  motionEaseOutCirc: string

  // 基础圆角
  borderRadius: number

  // 默认字号
  fontSize: number

  //
  colorBgBase: string
  colorTextBase: string

  // ===================size=====================
  // 尺寸变化单位
  sizeUnit: number
  // 尺寸步长
  sizeStep: number

  // 基础高度
  controlHeight: number

  fontFamily: string

  // Font
  fontWeightStrong: number

  /**
   * 浮层基础 zIndex
   * @default 1000
   */
  zIndexPopupBase: number
}
