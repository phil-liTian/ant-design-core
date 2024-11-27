import { defineComponent } from 'vue'
import { baseInputProps } from './inputProps'
import { cloneElement } from '../_utils/vnode'
import { hasAddon, hasPrefixSuffix } from './utils/commonUtil'
import { has } from 'node_modules/vue-types/dist/utils'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'BaseInput',
  props: baseInputProps(),
  setup(props, { slots }) {
    const {
      prefixCls,
      allowClear,
      prefix = slots.prefix?.(),
      suffix = slots.suffix?.(),
      addonAfter = slots.addonAfter?.(),
      addonBefore = slots.addonBefore?.(),
    } = props
    return () => {
      const { inputElement } = props

      const getClearIcon = () => {
        const { allowClear, handleReset } = props
        if (!allowClear) return null
        const iconNode = slots.clearIcon?.() || '*'
        return <span onClick={handleReset}>{iconNode}</span>
      }

      let element = cloneElement(inputElement)

      // 处理prefix和Suffix
      if (hasPrefixSuffix({ prefix, suffix, allowClear })) {
        const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`
        const affixWrapperCls = classNames(affixWrapperPrefixCls, {})

        const suffixNode = (suffix || allowClear) && (
          <span class={`${prefixCls}-suffix`}>
            {getClearIcon()}
            {suffix}
          </span>
        )

        element = (
          <span class={affixWrapperCls}>
            {prefix && <span class={`${prefixCls}-prefix`}></span>}
            {cloneElement(inputElement)}
            {suffixNode}
          </span>
        )
      }

      // 处理addonBefore和addonAfter
      if (hasAddon({ addonAfter, addonBefore })) {
        const addonCls = `${prefixCls}-addon`
        const wrapperCls = `${prefixCls}-group`

        const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`)
        const mergedGroupClassName = classNames(`${prefixCls}-group-wrapper`)

        return (
          <span class={mergedGroupClassName}>
            <span class={mergedWrapperClassName}>
              {addonBefore && <span class={addonCls}>{addonBefore}</span>}
              {cloneElement(inputElement)}
              {addonAfter && <span class={addonCls}>{addonAfter}</span>}
            </span>
          </span>
        )
      }

      return element
    }
  },
})
