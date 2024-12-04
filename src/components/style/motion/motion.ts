import type { Keyframes } from 'ant-design-vue'

/**
 * forwards：当动画完成后，元素会保留动画最后一帧的样式。
 * backwards：在动画延迟期间（如果有延迟），元素会应用动画第一帧的样式。
 * both：这个取值结合了forwards和backwards的效果
 */

const initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: 'both',
})

const initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: 'both',
})

export const initMotion = (
  motionCls: string,
  inKeyframes: Keyframes,
  outKeyframes: Keyframes,
  duration: string,
) => {
  return {
    [`${motionCls}-enter,${motionCls}-appear`]: {
      animationPlayState: 'paused',
      ...initMotionCommon(duration),
    },

    [`${motionCls}-leave`]: {
      animationPlayState: 'paused',
      ...initMotionCommonLeave(duration),
    },

    [`${motionCls}-enter${motionCls}-enter-active,${motionCls}-appear${motionCls}-appear-active`]: {
      animationName: inKeyframes,
      animationPlayState: 'running',
    },

    [`${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: 'running',
    },
  }
}
