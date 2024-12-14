import { defineComponent, nextTick, onMounted, onUpdated, ref, watch, type PropType } from 'vue'
import { alignElement } from 'dom-align'
import { cloneElement } from '../_utils/vnode'
import PropTypes from '../_utils/vue-types'
import type { AlignType, TargetType } from './interface'
import { ObjectType } from '../_utils/type'

function getElement(func: TargetType) {
  if (typeof func !== 'function') return null
  return func()
}

export default defineComponent({
  name: 'Align',
  props: {
    target: [Object, Function] as PropType<TargetType>,
    align: ObjectType<AlignType>({}),
  },

  setup(props, { slots }) {
    const { target: latestTarget, align: latestAlign } = props
    const nodeRef = ref()

    onMounted(() => {
      resetAlign()
    })
    const resetAlign = () => {
      const source = nodeRef.value

      const target = getElement(latestTarget!)

      // target是当前选择的selector
      // document.querySelector('.phil-select-selector')
      // console.log('target', source, { offset: [0, 4], points: ['tl', 'bl'] })

      alignElement(source, target, latestAlign)
    }

    return () => {
      const child = slots.default?.()
      if (child) {
        return cloneElement(child[0], { ref: nodeRef })
      }
    }
  },
})
