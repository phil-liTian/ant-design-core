import { Keyframes } from 'ant-design-vue'
import { initMotion } from './motion'

const slideUpIn = new Keyframes('philSlideUpIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },
})
const slideUpOut = new Keyframes('philSlideUpOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },

  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },
})

export // | 'slide-down' | 'slide-left' | 'slide-right'
type SlideMotionTypes = 'slide-up'
const slideMotion: Record<SlideMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  'slide-up': {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut,
  },
}

export const initSlideMotion = (token, motionName: SlideMotionTypes) => {
  const { antCls } = token
  const motionCls = `.${antCls}-${motionName}`
  const { inKeyframes, outKeyframes } = slideMotion[motionName]
  console.log(
    'inKeyframes',
    motionCls,
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
  )

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
    {
      [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
        transform: 'scale(0)',
        transformOrigin: '0% 0%',
        opacity: 0,
        animationTimingFunction: token.motionEaseOutQuint,
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInQuint,
      },
    },
  ]
}
