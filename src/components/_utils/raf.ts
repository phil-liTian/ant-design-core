let raf = (callback: FrameRequestCallback) => setTimeout(callback, 16)
let caf = (num: number) => clearTimeout(num)

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback)
  caf = (num: number) => window.cancelAnimationFrame(num)
}

let rafUUID = 0
const rafIds = new Map<number, number>()
function cleanup(id: number) {
  rafIds.delete(id)
}

export const wrapperRaf = (callback: () => void, times = 1): number => {
  rafUUID += 1
  let id = rafUUID
  function callRaf(leftTimes: number) {
    if (leftTimes > 0) {
      const realId = raf(() => callRaf(leftTimes - 1))
      rafIds.set(id, realId)
    } else {
      cleanup(id)
      callback()
    }
  }

  callRaf(times)

  return id
}

wrapperRaf.cancel = (id: number) => {
  const realId = rafIds.get(id)!
  cleanup(realId)

  return caf(realId)
}
