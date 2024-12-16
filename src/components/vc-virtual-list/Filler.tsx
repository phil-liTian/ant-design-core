import type { CSSProperties, FunctionalComponent } from 'vue'
import ResizeObserver from '../vc-resize-observer'

interface FillerProps {
  prefixCls?: string
  height?: number
}

const Filler: FunctionalComponent<FillerProps> = ({ height }, { slots }) => {
  let outerStyle = {
    height: `${height}px`,
    overflow: 'hidden',
  }
  let innerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div style={outerStyle}>
      <ResizeObserver>
        <div style={innerStyle}>{slots.default?.()}</div>
      </ResizeObserver>
    </div>
  )
}

export default Filler
