import { defineComponent, ref, type CSSProperties } from 'vue'
import { ArrayType, NumberType, ObjectType, someType, withInstall } from '../_utils/type'

interface WaterMarkFontStyle {
  color?: string
  fontSize?: string | number
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
}

export const watermarkProps = () => ({
  rootClassName: String,
  zIndex: NumberType(9),
  rotate: NumberType(-22),
  width: Number,
  height: Number,
  image: String,
  content: someType<string | string[]>(),
  font: ObjectType<WaterMarkFontStyle>({}),
  gap: ArrayType<[number, number]>([100, 100]),
  offset: ArrayType<[number, number]>(),
})

const watermark = defineComponent({
  name: 'PWatermark',
  props: watermarkProps(),
  setup(props, { slots, attrs }) {
    const { rootClassName } = props
    const containerRef = ref<HTMLDivElement>()
    return () => {
      return (
        <div
          ref={containerRef}
          class={[attrs.class, rootClassName]}
          style={[attrs.style as CSSProperties, { position: 'relative' }]}
        >
          {slots.default?.()}
        </div>
      )
    }
  },
})

export default withInstall(watermark)
