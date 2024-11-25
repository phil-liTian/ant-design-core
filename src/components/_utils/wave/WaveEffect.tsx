import { defineComponent, render, Transition } from 'vue'
import { ObjectType } from '../type'

const WaveEffect = defineComponent({
  props: {
    target: ObjectType<HTMLElement>(),
    className: String,
  },
  setup(props) {
    return () => {
      return (
        <Transition>
          <div class={props.className}></div>
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
