import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue'
/**
 * 处理icon, 可以是search, 或者自定义, 或者默认下箭头
 * @param props
 * @param slots
 * @returns
 */

export default function getIcons(props: any, slots: any = {}) {
  const { loading, prefixCls, showArrow } = props
  const suffixIcon = props.suffixIcon || (slots.suffixIcon && slots.suffixIcon())

  const getSuffixIconNode = (arrowIcon) => <>{showArrow !== false && arrowIcon}</>

  let mergedSuffixIcon: any = null

  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon)
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode(<LoadingOutlined spin />)
  } else {
    const iconCls = `${prefixCls}-suffix`
    mergedSuffixIcon = () => {
      return <DownOutlined class={iconCls} />
    }
  }

  return {
    suffixIcon: mergedSuffixIcon,
  }
}
