import { Keyframes } from 'ant-design-vue'
import { initMotion } from './motion'

// ===================== Slide up =====================
const slideUpIn = new Keyframes('philSlideUpIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: '1',
  },
})
const slideUpOut = new Keyframes('philSlideUpOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: '1',
  },

  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },
})

// ===================== Slide down =====================
export const slideDownIn = new Keyframes('philSlideDownIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: '1',
  },
})

export const slideDownOut = new Keyframes('philSlideDownOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: '1',
  },

  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0,
  },
})

// ===================== Slide left =====================
export const slideLeftIn = new Keyframes('philSlideLeftIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: '1',
  },
})

export const slideLeftOut = new Keyframes('philSlideLeftOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: '1',
  },

  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },
})

// ===================== Slide right =====================
export const slideRightIn = new Keyframes('philSlideRightIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: '1',
  },
})

export const slideRightOut = new Keyframes('philSlideRightOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: '1',
  },

  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0,
  },
})

type SlideMotionTypes = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
const slideMotion: Record<SlideMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  'slide-up': {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut,
  },

  'slide-down': {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut,
  },

  'slide-left': {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut,
  },

  'slide-right': {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut,
  },
}

export const initSlideMotion = (token, motionName: SlideMotionTypes) => {
  const { antCls } = token
  const motionCls = `.${antCls}-${motionName}`
  // const motionCls = `.phil-slide-down`
  const { inKeyframes, outKeyframes } = slideMotion[motionName]

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
    {
      [`${motionCls}-enter,${motionCls}-appear`]: {
        transform: 'scale(0)',
        transformOrigin: '0% 0%',
        opacity: 0,
        animationTimingFunction: token.motionEaseOutQuint,
      },
      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInQuint,
      },
    },
    // {
    //   [`${motionCls}-enter-active`]: {
    //     transition: 'all 0.3s ease-out',
    //   },
    //   [`${motionCls}-leave-active`]: {
    //     transition: 'all 0.8s cubic-bezier(1, 0.5, 0.8, 1)',
    //   },
    //   [`${motionCls}-enter,${motionCls}-leave`]: {
    //     transform: 'translateX(20px)',
    //     opacity: 0,
    //   },
    // },
  ]
}
