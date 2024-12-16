import { computed, defineComponent, getCurrentInstance, shallowRef } from 'vue'
import Portal from '../_utils/PortalWrapper'
import Popup from './Popup'
import { cloneElement } from '../_utils/vnode'
import { filterEmpty, findDOMNode, getSlot } from '../_utils/props-util'
import { triggerProps } from './interface'
import { watch } from 'vue'
import { genAlignFromPlacement } from './utils/alignUtil'

export default defineComponent({
  name: 'Trigger',
  props: triggerProps(),
  setup(props, { slots }) {
    const triggerRef = shallowRef()
    let sPopupVisible = shallowRef(props.popupVisible)

    const align = computed(() => {
      const { builtinPlacements, popupPlacement, popupAlign } = props
      if (popupPlacement && builtinPlacements) {
        return genAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign)
      }
      return
    })
    const getRootDomNode = () => {
      const { getTriggerDOMNode } = props

      if (!!getTriggerDOMNode) {
        const domNode = findDOMNode(triggerRef.value)
        return getTriggerDOMNode(domNode)
      }
      const instance = getCurrentInstance()

      return findDOMNode(instance)
    }
    const getComponent = () => {
      const { prefixCls, popupStyle, popupClassName } = props

      const popupProps = {
        prefixCls,
        style: popupStyle,
        getRootDomNode,
        align: align.value,
        visible: sPopupVisible.value,
        class: popupClassName,
      }

      return <Popup {...popupProps} v-slots={{ default: slots.popup }}></Popup>
    }

    watch(
      () => props.popupVisible,
      (val: boolean) => {
        sPopupVisible.value = val
      },
    )

    return {
      getComponent,
      sPopupVisible,
    }
  },

  render() {
    const { $attrs, $props, sPopupVisible } = this
    const children = filterEmpty(getSlot(this))
    const child = children[0]
    const trigger = cloneElement(child, { ref: 'triggerRef' })

    // TODO
    const portal = <Portal visible={true} v-slots={{ default: this.getComponent }}></Portal>

    return (
      <>
        {trigger}
        {portal}
      </>
    )
  },
})
