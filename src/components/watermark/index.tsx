import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import { ArrayType, NumberType, ObjectType, someType, withInstall } from '../_utils/type'
import { useToken } from '../theme/internal'
import { getPixelRatio, getStyleStr, rotateWatermark } from './utils'

interface WaterMarkFontStyle {
  color?: string
  fontSize?: string | number
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
}

const BaseSize = 2
const FontGap = 3
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

export type WatermarkProps = Partial<ExtractPropTypes<ReturnType<typeof watermarkProps>>>

const watermark = defineComponent({
  name: 'PWatermark',
  props: watermarkProps(),
  setup(props, { slots, attrs }) {
    const { rootClassName, offset } = props
    const [, token] = useToken()
    const containerRef = ref<HTMLDivElement>()
    const watermarkRef = shallowRef<HTMLDivElement>()
    const gapX = computed(() => props.gap[0] ?? 100)
    const gapY = computed(() => props.gap[1] ?? 100)
    const gapXCenter = computed(() => gapX.value / 2)
    const gapYCenter = computed(() => gapY.value / 2)
    const offsetLeft = computed(() => offset[0] ?? gapXCenter.value)
    const offsetTop = computed(() => offset[1] ?? gapYCenter.value)
    const fontSize = computed(() => props.font.fontSize || token.value.fontSizeLG)
    console.log('font', fontSize.value)

    const fontWeight = computed(() => props.font.fontWeight || 'normal')
    const fontStyle = computed(() => props.font?.fontStyle ?? 'normal')
    const fontFamily = computed(() => props.font?.fontFamily ?? 'sans-serif')
    const color = computed(() => props.font.color || token.value.colorFill)

    const maskStyle = computed(() => {
      const maskStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: props.zIndex ?? 9,
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
      }

      return maskStyle
    })

    const getMarkSize = (ctx: CanvasRenderingContext2D) => {
      const { width, height } = props
      let defaultWidth = 120
      let defaultHeight = 64

      return [width ?? defaultWidth, height ?? defaultHeight]
    }

    const fillText = (
      ctx: CanvasRenderingContext2D,
      drawX: number,
      drawY: number,
      drawWidth: number,
      drawHeight: number,
    ) => {
      const ratio = 1 || getPixelRatio()

      const content = props.content
      const mergedFontSize = Number(fontSize.value) * ratio
      // 设置颜色
      ctx.fillStyle = color.value
      ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${mergedFontSize}px/${drawHeight}px ${fontFamily.value}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.translate(drawWidth / 2, 0)
      console.log('ctx.font', ctx.font, fontStyle.value, mergedFontSize)

      const contents = Array.isArray(content) ? content : [content]
      contents.forEach((item, index) => {
        ctx.fillText(item ?? '', drawX, drawY)
      })
    }

    const appendWatermark = (base64Url: string) => {
      if (watermarkRef.value && containerRef.value) {
        // 给水印设置样式
        watermarkRef.value.setAttribute(
          'style',
          getStyleStr({
            ...maskStyle.value,
            backgroundImage: `url(${base64Url})`,
          }),
        )

        // 将水印添加到container中
        containerRef.value?.append(watermarkRef.value)
      }
    }

    const destroyWatermark = () => {
      if (watermarkRef.value) {
        watermarkRef.value.remove()
        watermarkRef.value = undefined
      }
    }

    const renderWatermark = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const rotate = props.rotate ?? 22

      if (ctx) {
        if (!watermarkRef.value) {
          watermarkRef.value = document.createElement('div')
        }

        // 做何作用？？
        const [markWidth, markHeight] = getMarkSize(ctx)
        const ratio = getPixelRatio()
        console.log('ratio', ratio)

        const canvasWidth = (markWidth + gapX.value) * ratio
        const canvasHeight = (markHeight + gapY.value) * ratio

        canvas.setAttribute('width', `${canvasWidth * BaseSize}px`)
        canvas.setAttribute('height', `${canvasHeight * BaseSize}px`)

        const image = props.image
        const drawX = (gapX.value * ratio) / 2
        const drawY = (gapY.value * ratio) / 2
        const drawWidth = markWidth * ratio
        const drawHeight = markHeight * ratio
        const rotateX = (drawWidth + gapX.value * ratio) / 2
        const rotateY = (drawHeight + gapY.value * ratio) / 2

        const alternateDrawX = drawX + canvasWidth
        const alternateDrawY = drawY + canvasHeight
        const alternateRotateX = rotateX + canvasWidth
        const alternateRotateY = rotateY + canvasHeight

        rotateWatermark(ctx, rotateX, rotateY, rotate)
        if (image) {
          // 图片
          const img = new Image()

          img.onload = () => {
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

            appendWatermark(canvas.toDataURL())
          }
          img.crossOrigin = 'anonymous'
          // img.referrerPolicy = 'no-referrer'

          img.src = image
        } else {
          // 文本
          fillText(ctx, drawX, drawY, drawWidth, drawHeight)

          // rotateWatermark(ctx, alternateDrawX, alternateDrawY, rotate)
          appendWatermark(canvas.toDataURL())
        }
      }
    }

    onMounted(() => {
      renderWatermark()
    })

    onBeforeUnmount(() => {
      destroyWatermark()
    })

    watch(
      () => [props],
      () => {
        renderWatermark()
      },
      { deep: true, immediate: true },
    )

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
