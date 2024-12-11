import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue'
import type { ScreenMap } from '../responsiveObserve'
import useResponsiveObserve from '../responsiveObserve'

function useBreakPoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  const responsiveObserve = useResponsiveObserve()
  let token: number

  onMounted(() => {
    token = responsiveObserve.value.subscribe((newScreens) => {
      screens.value = newScreens
    })
  })

  onUnmounted(() => {
    responsiveObserve.value.unsubscribe(token)
  })

  return screens
}

export default useBreakPoint
