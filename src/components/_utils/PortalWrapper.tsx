import { computed, defineComponent, onBeforeUnmount, shallowRef, type VNode } from 'vue'
import Portal from './Portal'
import PropTypes from './vue-types'

// container
const getParent = (getContainer) => {
  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelector(getContainer)
    }
    if (typeof getContainer === 'function') {
      return getContainer()
    }

    if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
      return getContainer
    }
  }

  return document.body
}

export default defineComponent({
  name: 'PortalWrapper',
  props: {
    getContainer: PropTypes.any,
  },
  setup(props, { slots }) {
    const container = shallowRef()
    const defaultContainer = document.createElement('div')
    const removeCurrentContainer = () => {
      if (container.value === defaultContainer) {
        container.value.parentNode?.removeChild(container.value)
      }
      container.value = null
    }

    let parent: any = null
    const attachToParent = (force = false) => {
      if (force || !container.value) {
        parent = getParent(props.getContainer)
        if (parent) {
          parent.append(container.value)
        }
      }
    }

    const getContainer = () => {
      if (!container.value) {
        // 首先用div包裹一层
        container.value = defaultContainer
        // 将container加入到
        attachToParent(true)
      }
      return container.value
    }

    onBeforeUnmount(() => {
      removeCurrentContainer()
    })
    return () => {
      let portal: VNode | null = null

      portal = (
        <Portal getContainer={getContainer} v-slots={{ default: () => slots.default?.() }}></Portal>
      )

      return portal
    }
  },
})
