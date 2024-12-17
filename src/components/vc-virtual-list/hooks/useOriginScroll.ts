import type { Ref } from 'vue'

export default (isScrollAtTop: Ref<Boolean>, isScrollAtBottom: Ref<Boolean>) => {
  let lock = false
  return (deltaY: number) => {
    const originScroll =
      (deltaY < 0 && isScrollAtTop.value) || (deltaY > 0 && isScrollAtBottom.value)

    return !lock && originScroll
  }
}
