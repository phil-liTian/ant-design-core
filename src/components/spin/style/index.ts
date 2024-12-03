import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import { Keyframes } from 'ant-design-vue'

export interface ComponentToken {}

export interface SpinToken extends FullToken<'Spin'> {
  spinDotDefault: string
  spinDotSize: number
  spinDotSizeSM: number
  spinDotSizeLG: number
}

const antSpinMove = new Keyframes('antSpinMove', {
  to: {
    opacity: `1`,
  },
})

const antRotate = new Keyframes('antRotate', {
  to: { transform: 'rotate(405deg)' },
})

const genSpinStyle = (token): CSSObject => {
  const { componentCls, spinDotDefault, spinDotSize, spinDotSizeLG, fontSize, spinDotSizeSM } =
    token
  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      position: 'relative',
      color: token.colorPrimary,
      textAlign: 'center',
      verticalAlign: 'middle',
      height: '100%',
      minHeight: '2em',
      display: 'none',
      opacity: `0`,
      transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,

      '&-spinning': {
        display: 'block',
        opacity: '1',
      },

      [`${componentCls}-dot`]: {
        position: 'absolute',
        top: `45%`,
        insetInlineStart: `50%`,
        margin: -token.spinDotSize / 2,
        display: 'inline-block',
        width: '1em',
        height: '1em',
        fontSize: token.spinDotSize,

        '&-item': {
          position: 'absolute',
          display: 'block',
          width: (token.spinDotSize - token.marginXXS / 2) / 2,
          height: (token.spinDotSize - token.marginXXS / 2) / 2,
          backgroundColor: token.colorPrimary,
          borderRadius: '100%',
          transform: 'scale(0.75)',
          opacity: `0.3`,
          animationName: antSpinMove,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          animationDirection: 'alternate',

          '&:nth-child(1)': {
            top: 0,
            insetInlineStart: 0,
          },

          '&:nth-child(2)': {
            top: 0,
            insetInlineEnd: 0,
            animationDelay: '0.4s',
          },

          '&:nth-child(3)': {
            insetInlineEnd: 0,
            bottom: 0,
            animationDelay: '0.8s',
          },

          '&:nth-child(4)': {
            bottom: 0,
            insetInlineStart: 0,
            animationDelay: '1.2s',
          },
        },

        '&-spin': {
          transform: 'rotate(45deg)',
          animationName: antRotate,
          animationDuration: '1.2s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        },
      },

      [`${componentCls}-text`]: {
        position: 'absolute',
        top: '50%',
        paddingTop: (spinDotSize - fontSize) / 2 + 2,
        width: '100%',
      },
    },
  }
}

export default genComponentStyleHook('Spin', (token) => {
  const spinToken: SpinToken = mergeToken<SpinToken>(token, {
    spinDotDefault: token.colorTextDescription,
    spinDotSize: token.controlHeightLG / 2,
    spinDotSizeSM: token.controlHeightLG * 0.35,
    spinDotSizeLG: token.controlHeight,
  })
  return [genSpinStyle(spinToken)]
})
