import type { TransitionProps } from 'vue'

export const getTransitionProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionProps = {
    name: transitionName,
    appear: true,
    ...opt,
  }

  return transitionProps
}
