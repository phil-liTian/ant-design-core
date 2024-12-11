import { defineComponent } from 'vue'
import Portal from '../_utils/PortalWrapper'
import Popup from './Popup'
import { cloneElement } from '../_utils/vnode'
import { filterEmpty, getSlot } from '../_utils/props-util'

export default defineComponent({
  name: 'Trigger',
  setup(props, { slots }) {
    const getComponent = () => {
      return '123'
    }
    return {
      getComponent,
    }
  },

  render() {
    const { $attrs } = this
    const children = filterEmpty(getSlot(this))
    const child = children[0]
    const trigger = cloneElement(child, { ref: 'triggerRef' })

    const portal = <Portal v-slots={{ default: this.getComponent }}></Portal>

    return (
      <>
        {trigger}
        {portal}
      </>
    )
  },
})
