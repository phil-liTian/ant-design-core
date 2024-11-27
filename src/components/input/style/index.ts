import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import genComponentStyleHook from '@/components/theme/utils/genComponentStyleHook'

function genBasicInputStyle(token): CSSObject {
  return {}
}

function genInputStyle(token): CSSObject {
  const { componentCls } = token
  return {
    [`${componentCls}`]: {
      ...genBasicInputStyle(token),
    },
  }
}

export default genComponentStyleHook('Input', (token) => {
  return [genInputStyle(token)]
})
