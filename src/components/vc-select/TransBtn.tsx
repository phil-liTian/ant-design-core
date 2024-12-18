import type { FunctionalComponent } from 'vue'

interface TransBtnProps {
  class: string
}

const TransBtn: FunctionalComponent<TransBtnProps> = (props, { slots }) => {
  const { class: className } = props

  return (
    <span class={className} style={{ userSelect: 'none' }}>
      <span>{slots.default?.()}</span>
    </span>
  )
}

TransBtn.inheritAttrs = false
TransBtn.displayName = 'TransBtn'

export default TransBtn
