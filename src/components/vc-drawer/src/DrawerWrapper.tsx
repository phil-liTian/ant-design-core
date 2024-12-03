import { defineComponent } from 'vue'
import { drawerProps } from './IDrawerPropTypes'
import PortalWrapper from '@/components/_utils/PortalWrapper'
import Child from './DrawerChild'

const DrawerWrapper = defineComponent({
  props: drawerProps(),
  setup(props, { slots }) {
    return () => {
      let portal
      if (props.open) {
        portal = <PortalWrapper v-slots={{ default: () => <Child /> }}></PortalWrapper>
      }

      return <div>{slots.default?.()}</div>
    }
  },
})

export default DrawerWrapper
