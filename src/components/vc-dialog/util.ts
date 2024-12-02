function getScroll(w: Window, top: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`]
  const method = `scroll${top ? 'Top' : 'Left'}`
  if (typeof ret !== 'number') {
    const d = w.document
    // ie6,7,8 standard mode
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }

  return ret
}

export function offset(el: Element) {
  const rect = el.getBoundingClientRect()
  const pos = {
    left: rect.left,
    top: rect.top,
  }
  const doc = el.ownerDocument
  // const w = doc.defaultView
  // TODO: 加上在页面中的滚动偏移量

  return pos
}

export function getMotionName(prefixCls: string, transitionName?: string, animationName?: string) {
  let motionName = transitionName

  if (!motionName && animationName) {
    motionName = `${prefixCls}-${animationName}`
  }

  return motionName
}
