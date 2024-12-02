import type { GenerateStyle } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import type { CSSObject } from '../cssinjs/hooks/useStyleRegister'
export interface ComponentToken {}

export type WaveToken = FullToken<'Wave'>

const genWaveStyle: GenerateStyle<WaveToken> = (token): CSSObject => {
  const { componentCls, colorPrimary } = token

  return {
    [componentCls]: {
      position: 'absolute',
      background: 'transparent',
      pointerEvents: 'none',
      opacity: `0.2`,
      boxSizing: 'border-box',
      color: `var(--wave-color, ${colorPrimary})`,
      // color: `${colorPrimary}`,
      boxShadow: `0 0 0 0 currentcolor`,

      // =================== Motion ===================
      '&.wave-motion-appear': {
        transition: [
          `box-shadow 0.4s ${token.motionEaseOutCirc}`,
          `opacity 2s ${token.motionEaseOutCirc}`,
        ].join(','),

        '&-active': {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: `0`,
        },
      },
    },
  }
}

export default genComponentStyleHook('Wave', (token) => {
  return [genWaveStyle(token)]
})
