import type { CSSInterpolation } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import type Keyframe from '@/components/_utils/cssinjs/Keyframes'
import type { AliasToken } from '@/components/theme/interface/alias'
import type { TokenWithCommonCls } from '@/components/theme/utils/genComponentStyleHook'
import { Keyframes } from 'ant-design-vue'
import { initMotion } from './motion'

type ZoomMotionTypes = 'zoom' | 'zoom-big'

const zoomIn: Keyframes = new Keyframes('zoomIn', {
  from: {
    opacity: '0',
    transform: 'scale(0.2)',
  },
  to: {
    opacity: '1',
    transform: 'scale(1)',
  },
})

const zoomOut: Keyframes = new Keyframes('zoomOut', {
  from: {
    opacity: '1',
    transform: 'scale(1)',
  },
  to: {
    opacity: '0',
    transform: 'scale(0.2)',
  },
})

const zoomBigIn: Keyframes = new Keyframes('zoomIn', {
  from: {
    opacity: '0',
    transform: 'scale(0.8)',
  },
  to: {
    opacity: '1',
    transform: 'scale(1)',
  },
})

const zoomBigOut: Keyframes = new Keyframes('zoomOut', {
  from: {
    opacity: '1',
    transform: 'scale(1)',
  },
  to: {
    opacity: '0',
    transform: 'scale(0.8)',
  },
})

const zoomMotion: Record<ZoomMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut,
  },

  'zoom-big': {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut,
  },
}

export const initZoomMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: ZoomMotionTypes,
): CSSInterpolation => {
  const { antCls } = token
  const motionCls = `.${antCls}-${motionName}`
  const { inKeyframes, outKeyframes } = zoomMotion[motionName]

  return [
    // 处理animaton动画
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
    {
      [`${motionCls}-enter, ${motionCls}-appear`]: {
        transform: 'scale(0)',
      },
    },
  ]
}
