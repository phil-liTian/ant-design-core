import type { TransitionProps } from 'vue'

export const getTransitionProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionProps = {
    name: transitionName,
    appear: true,
    enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
    enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
    enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
    leaveFromClass: ` ${transitionName}-leave`,
    leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`,
    ...opt,
  }

  return transitionProps
}
