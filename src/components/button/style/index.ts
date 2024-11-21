import { colors } from 'unocss/preset-mini'
import genComponentStyleHook from '../../theme/utils/genComponentStyleHook'

export interface ComponentToken {}

// ======================= Shared ============================
const genSharedButtonStyle = (token) => {
  const { componentCls } = token

  return {
    [componentCls]: {
      outline: 'none',
      cursor: 'pointer',
      color: token.colorPrimary,
    },
  }
}

// Type: Default
const genDefaultButtonStyle = (token) => ({
  'background-color': '#fff',
})

const genTypeButtonStyle = (token) => {
  const { componentCls } = token
  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
  }
}

export default genComponentStyleHook('Button', (token) => {
  return [
    genSharedButtonStyle(token),

    // type
    genTypeButtonStyle(token),
  ]
})
