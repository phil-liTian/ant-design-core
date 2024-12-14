import { DownOutlined } from '@ant-design/icons-vue'
/**
 * 处理icon, 可以是search, 或者自定义, 或者默认下箭头
 * @param props
 * @param slots
 * @returns
 */

export default function getIcons(props: any, slots: any = {}) {
  const { loading, prefixCls } = props
  const suffixIcon = props.suffixIcon || (slots.suffixIcon && slots.suffixIcon())

  let mergedSuffixIcon: any = null

  if (suffixIcon !== undefined) {
  } else if (loading) {
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
