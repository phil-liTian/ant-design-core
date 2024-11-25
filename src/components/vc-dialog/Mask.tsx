import { defineComponent, Transition } from 'vue'
import { BooleanType, ObjectType, StringType } from '../_utils/type'
import { getTransitionProps } from '../_utils/transition'

export default defineComponent({
  name: 'DialogMask',
  props: {
    prefixCls: StringType(undefined),
    visible: BooleanType(undefined),
    maskProps: ObjectType({}),
    motionName: StringType(undefined),
  },
  setup(props) {
    const { visible, prefixCls, maskProps, motionName } = props
    const transitionProps = getTransitionProps(motionName)
    return () => (
      <Transition {...transitionProps}>
        <div class={`${prefixCls}-mask`} v-show={visible} {...maskProps}></div>
      </Transition>
    )
  },
})
