import type { AliasToken } from '@/components/theme/interface/alias'
import type { TokenWithCommonCls } from '@/components/theme/utils/genComponentStyleHook'
import { initMotion } from './motion'
import { Keyframes } from 'ant-design-vue'
import type { CSSInterpolation } from '@/components/_utils/cssinjs/hooks/useStyleRegister'

const fadeIn = new Keyframes('antFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

const fadeOut = new Keyframes('antFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
})

export const initFadeMotion = (token: TokenWithCommonCls<AliasToken>): CSSInterpolation => {
  const { antCls } = token
  const motionCls = `.${antCls}-fade`

  return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid)]
}
