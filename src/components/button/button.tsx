import { computed, defineComponent, h, shallowRef, type VNode } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import initDefaultProps, { flattenChildren } from '../_utils/props-util'
import { buttonProps, type ButtonType } from './buttonTypes'

type Loading = boolean | number

// 设计规范 只有两个汉字时自动添加空格
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link'
}

export default defineComponent({
  name: 'PButton',
  props: initDefaultProps(buttonProps(), { type: 'default' }),
  setup(props, { slots, attrs, emit }) {
    const { prefixCls, direction, autoInsertSpaceInButton } = useConfigInject('btn', props)
    const [wrapSSR] = useStyle(prefixCls)
    let isNeedInserted = false

    const pre = prefixCls.value
    const innerLoading = shallowRef<Loading>(false)

    console.log('props', props.type)

    const classes = computed(() => {
      const { type, danger, block, ghost } = props

      return [
        {
          [`${pre}`]: true,
          [`${pre}-${type}`]: type,
          [`${pre}-background-ghost`]: ghost,
          [`${pre}-dangerous`]: !!danger,
          [`${pre}-block`]: block,
          [`${pre}-rtl`]: direction.value === 'rtl',
        },
      ]
    })

    // 向外抛出点击事件
    const handleClick = (event: Event) => {
      if (innerLoading.value) {
        event.preventDefault()
        return
      }
      emit('click', event)
    }

    const handleMousedown = (event: Event) => {
      emit('mousedown', event)
    }

    // 如果只有两个中文 则在这两个中文中添加一个空格(设计规范如此)
    const insertSpace = (child: VNode, needInserted: boolean) => {
      const SPACE = needInserted ? ' ' : ''
      if (child.type === Text) {
        let text = (child.children as string).trim()
        if (isTwoCNChar(text)) {
          // 两个中文中间加空格
          text = text.split('').join(SPACE)
        }

        return <span>{text}</span>
      }

      return child
    }

    const buttonProps = {
      class: [classes.value, attrs.class],
      onClick: handleClick,
      onMouseDown: handleMousedown,
    }

    return () => {
      const children = flattenChildren(slots.default?.() as any)
      const { icon = slots.icon?.(), htmlType } = props
      isNeedInserted = children.length === 1 && !icon && !isUnBorderedButtonType(props.type)
      const { href, target } = props
      const kids = children.map((child) =>
        insertSpace(child, isNeedInserted && autoInsertSpaceInButton.value!),
      )

      // 如果有href 则默认使用a标签
      if (href) {
        return wrapSSR(
          <a {...buttonProps} href={href} target={target}>
            {kids}
          </a>,
        )
      }

      let buttonNode = (
        <button {...buttonProps} type={htmlType}>
          {kids}
        </button>
      )

      return wrapSSR(buttonNode)
    }
  },
})
