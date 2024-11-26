import { defineComponent, onMounted, ref, render, Transition } from 'vue'
import { ObjectType } from '../type'
import { useState } from '../hooks/useState'
import { wrapperRaf } from '../raf'
import { getTargetWaveColor } from './utils'

function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value
}

const WaveEffect = defineComponent({
  props: {
    target: ObjectType<HTMLElement>(),
    className: String,
  },
  setup(props) {
    let rafId: number
    let timeoutId: any
    const divRef = ref<HTMLDivElement>()
    const [color, setWaveColor] = useState<string | null>(null)
    const [borderRadius, setBorderRadius] = useState<number[]>([])
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [enabled, setEnabled] = useState(false)

    function syncPos() {
      const { target } = props
      const nodeStyle = getComputedStyle(target)

      // 设置wave的颜色
      setWaveColor(getTargetWaveColor(target))

      const { borderLeftWidth, borderTopWidth } = nodeStyle

      // top left width height
      setTop(parseFloat(borderTopWidth))
      setLeft(parseFloat(borderLeftWidth))
      setWidth(target.offsetWidth)
      setHeight(target.offsetHeight)

      const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      } = nodeStyle

      setBorderRadius([
        validateNum(parseFloat(borderTopLeftRadius)),
        validateNum(parseFloat(borderTopRightRadius)),
        validateNum(parseFloat(borderBottomRightRadius)),
        validateNum(parseFloat(borderBottomLeftRadius)),
      ])
    }

    const removeDom = () => {
      const holder = divRef.value?.parentElement
      if (holder) {
        render(null, holder)
        if (holder.parentElement) {
          holder.parentElement.removeChild(holder)
        }
      }
    }

    // TODO
    const onTransitionend = (e: TransitionEvent) => {
      if (e.propertyName === 'opacity') {
      }
    }

    const clear = () => {
      clearTimeout(timeoutId)
    }

    onMounted(() => {
      clear()
      timeoutId = setTimeout(() => {
        removeDom()
      }, 5000)

      const { target } = props

      if (target) {
        wrapperRaf(() => {
          syncPos()
        })
      }
    })

    return () => {
      const waveStyle = {
        left: `${left.value}px`,
        top: `${top.value}px`,
        width: `${width.value}px`,
        height: `${height.value}px`,
        borderRadius: borderRadius.value.map((radiu) => `${radiu}px`).join(' '),
      }

      if (color) {
        waveStyle['--wave-color'] = color.value
      }

      return (
        <Transition
          name="wave-motion"
          appear
          appearFromClass="wave-motion-appear"
          appearActiveClass="wave-motion-appear"
          appearToClass="wave-motion-appear wave-motion-appear-active"
        >
          <div
            ref={divRef}
            style={waveStyle}
            class={props.className}
            onTransitionend={onTransitionend}
          ></div>
        </Transition>
      )
    }
  },
})

function showWaveEffect(node: HTMLElement, classNames: string) {
  const holder = document.createElement('div')
  holder.style.position = 'absolute'
  holder.style.left = `0px`
  holder.style.top = `0px`
  node?.insertBefore(holder, node?.firstChild)

  render(<WaveEffect target={node} className={classNames} />, holder)

  return () => {
    render(null, holder)
    if (holder.parentElement) {
      holder.parentElement.removeChild(holder)
    }
  }
}

export default showWaveEffect
