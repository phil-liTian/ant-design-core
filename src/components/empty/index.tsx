import { defineComponent, h, type CSSProperties, type ExtractPropTypes } from 'vue'
import { anyType, ObjectType, withInstall, type VueNode } from '../_utils/type'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import DefaultEmptyImg from './Empty'
import SimpleEmptyImg from './Simple'
import LocaleReceiver from '../locale/LocaleReceiver'
import classNames from '../_utils/classNames'

export const emptyProps = () => ({
  prefixCls: String,
  imageStyle: ObjectType<CSSProperties>(),
  image: anyType<VueNode>(),
  description: anyType<VueNode>(),
})

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>

export const Empty = defineComponent({
  name: 'PEmpty',
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('empty', props)
    const [WrapSSR] = useStyle(prefixCls)
    return () => {
      const pre = prefixCls.value
      const {
        image: mergedImage = slots.image?.() || h(DefaultEmptyImg),
        description = slots.description?.() || undefined,
        imageStyle,
        class: className = '',
        ...restProps
      } = { ...props, ...attrs }
      // des
      const des = typeof description !== 'undefined' ? description : 'No Data'

      // alt
      const alt = typeof des === 'string' ? des : 'empty'

      // image
      const image =
        typeof mergedImage === 'function' ? (mergedImage as () => VueNode)() : mergedImage
      let imageNode: EmptyProps['image'] = null
      if (typeof image === 'string') {
        imageNode = <img src={image} alt={alt} />
      } else {
        imageNode = image
      }

      return WrapSSR(
        <LocaleReceiver
          children={() => {
            return (
              <div class={classNames(pre, className)} {...restProps}>
                <div class={`${pre}-image`} style={imageStyle}>
                  {imageNode}
                </div>
                {des && <div class={`${pre}-description`}>{des}</div>}
                {slots.default && <div class={`${pre}-footer`}>{slots.default()}</div>}
              </div>
            )
          }}
        />,
      )
    }
  },
})

Empty.PRESENTED_IMAGE_DEFAULT = () => h(DefaultEmptyImg)
Empty.PRESENTED_IMAGE_SIMPLE = () => h(SimpleEmptyImg)

export default withInstall(Empty)
