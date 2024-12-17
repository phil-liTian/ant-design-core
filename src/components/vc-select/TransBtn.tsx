import type { FunctionalComponent } from 'vue'

interface TransProps {
  class: string
}

const TransBtn: FunctionalComponent<TransProps> = (props, { slots }) => {
  const { class: className } = props
  return (
    <span class={className}>
      <span>{slots.default?.()}</span>
    </span>
  )
}

export default TransBtn
