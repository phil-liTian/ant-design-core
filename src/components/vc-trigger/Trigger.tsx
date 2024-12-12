import { defineComponent, shallowRef } from 'vue'
import Portal from '../_utils/PortalWrapper'
import Popup from './Popup'
import { cloneElement } from '../_utils/vnode'
import { filterEmpty, getSlot } from '../_utils/props-util'
import { triggerProps } from './interface'
import { watch } from 'vue'

export default defineComponent({
  name: 'Trigger',
  props: triggerProps(),
  setup(props, { slots }) {
    let sPopupVisible = shallowRef(props.popupVisible)
    const getComponent = () => {
      return <Popup v-slots={{ default: slots.popup }}></Popup>
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

    const portal = (
      <Portal visible={sPopupVisible} v-slots={{ default: this.getComponent }}></Portal>
    )

    return (
      <>
        {trigger}
        {portal}
      </>
    )
  },
})
