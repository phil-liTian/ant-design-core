import { defineComponent } from 'vue'
import { drawerProps } from './IDrawerPropTypes'
import PortalWrapper from '@/components/_utils/PortalWrapper'
import Child from './DrawerChild'

const DrawerWrapper = defineComponent({
  props: drawerProps(),
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => {
      const { getContainer, ...otherProps } = props
      let portal

      if (!getContainer) {
        return <Child v-slots={slots} {...otherProps} />
      }

      if (props.open) {
        portal = (
          <PortalWrapper
            v-slots={{
              default: () => (
                <Child
                  v-slots={slots}
                  {...otherProps}
                  afterVisibleChange={props.afterVisibleChange}
                />
              ),
            }}
          ></PortalWrapper>
        )
      }

      return portal
    }
  },
})

export default DrawerWrapper
