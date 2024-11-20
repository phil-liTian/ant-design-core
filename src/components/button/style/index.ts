import genComponentStyleHook from '../../theme/utils/genComponentStyleHook'

export interface ComponentToken {}

// ======================= Shared ============================
const genSharedButtonStyle = (token) => {
  const { componentCls } = token
  return {
    [componentCls]: {
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
    },
  }
}

export default genComponentStyleHook('Button', (token) => {
  return [genSharedButtonStyle(token)]
})
