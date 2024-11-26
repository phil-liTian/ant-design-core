import type { SeedToken, PresetColorsType } from '../interface'

export const defaultPresetColors: PresetColorsType = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
}

const seedToken: SeedToken = {
  // Color
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',

  // Line
  lineWidth: 1,
  lineType: 'solid',

  // motion
  motionBase: 0,
  motionUnit: 0.1,
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',

  // Radius
  borderRadius: 6,

  // Font
  fontSize: 14,

  //
  colorBgBase: '',

  colorTextBase: '',

  // size
  sizeStep: 4,
  sizeUnit: 4,

  // height
  controlHeight: 32,
}

export default seedToken
