import { computed } from 'vue'
import { useToken } from '../theme/internal'

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>

type SubscribeFunc = (screens: ScreenMap) => void

function getResponsiveMap(token): BreakpointMap {
  return {
    xs: `(max-width: ${token.screenXSMax}px)`,
    sm: `(min-width: ${token.screenSM}px)`,
    md: `(min-width: ${token.screenMD}px)`,
    lg: `(min-width: ${token.screenLG}px)`,
    xl: `(min-width: ${token.screenXL}px)`,
    xxl: `(min-width: ${token.screenXXL}px)`,
    xxxl: `(min-width: ${token.screenXXL}px)`,
  }
}

export default function useResponsiveObserve() {
  const [, token] = useToken()
  return computed(() => {
    const responsiveMap: BreakpointMap = getResponsiveMap(token.value)

    const subscribers = new Map<Number, SubscribeFunc>()
    let subUid = -1
    let screens = {}
    return {
      subscribe(func: SubscribeFunc) {
        if (!subscribers.size) this.register()
        func(screens)

        return ++subUid
      },

      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken)
        if (!subscribers.size) this.unregister()
      },

      dispatch(pointMap: any) {
        screens = pointMap

        subscribers.forEach((func) => func(screens))
        return subscribers.size >= 1
      },

      register() {
        Object.keys(responsiveMap).forEach((screen: string) => {
          const matchMediaQuery = responsiveMap[screen]

          const listener = ({ matches }: MediaQueryListEvent) => {
            this.dispatch({
              ...screens,
              [screen]: matches,
            })
          }

          const mql = window.matchMedia(matchMediaQuery)
          mql.addListener(listener)
          // listener(mql)
        })
      },

      unregister() {
        subscribers.clear()
      },

      responsiveMap,
    }
  })
}
