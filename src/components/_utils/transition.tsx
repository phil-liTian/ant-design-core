import type { TransitionProps } from 'vue'
import { tuple } from './type'

const SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight')
export type SelectCommonPlacement = (typeof SelectPlacements)[number]

export const getTransitionProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionProps = {
    name: transitionName,
    appear: true,
    enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
    enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
    enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
    leaveFromClass: `${transitionName}-leave`,
    leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`,
    ...opt,
  }

  return transitionProps
}

/**
 * 可指定TransitionName, 否则transitionName 默认为 前缀 + motionName
 * @param rootPrefixCls
 * @param motion
 * @param transitionName
 * @returns
 */
const getTransitionName = (rootPrefixCls: string, motion?: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName
  }
  return `${rootPrefixCls}-${motion}`
}

export { getTransitionName }
