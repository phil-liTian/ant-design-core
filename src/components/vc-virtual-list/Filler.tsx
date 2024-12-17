import type { CSSProperties, FunctionalComponent } from 'vue'
import ResizeObserver from '../vc-resize-observer'

interface FillerProps {
  prefixCls?: string
  height?: number
  offset?: number
}

const Filler: FunctionalComponent<FillerProps> = ({ height, offset }, { slots }) => {
  let outerStyle = {}
  let innerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  if (offset !== undefined) {
    outerStyle = {
      height: `${height}px`,
      overflow: 'hidden',
      position: 'relative',
    }

    innerStyle = {
      ...innerStyle,
      position: 'absolute',
      transform: `translateY(${offset}px)`,
      left: 0,
      right: 0,
    }
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
