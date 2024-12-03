import { defineComponent } from 'vue'

const DrawerChild = defineComponent({
  name: 'DrawerChild',
  props: ['prefixCls', 'open', 'forceRender'],
  setup(props, { slots }) {
    return () => <div>{slots.default?.()}</div>
  },
})

export default DrawerChild
