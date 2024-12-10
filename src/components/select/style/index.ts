import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {}

function genSelectStyle(token) {
  const { componentCls } = token
  return [
    {},

    // Base
    // Single
    // Multiple
  ]
}

export default genComponentStyleHook('Select', (token) => {
  const selectToken = mergeToken(token, {})
  return [genSelectStyle(selectToken)]
})
