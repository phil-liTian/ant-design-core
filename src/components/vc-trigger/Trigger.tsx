import { defineComponent } from 'vue'
import Portal from '../_utils/PortalWrapper'
import Popup from './Popup'

export default defineComponent({
  name: 'Trigger',
  setup() {
    const getComponent = () => {
      return <Popup></Popup>
    }
    return () => <Portal v-slots={{ default: getComponent }}></Portal>
  },
})
