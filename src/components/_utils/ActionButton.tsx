import { defineComponent } from 'vue'
import Button from '../button'
import { ObjectType, StringType } from './type'
import { convertLegacyProps, type ButtonProps, type LegacyButtonType } from '../button/buttonTypes'
const actionButtonProps = () => ({
  type: StringType<LegacyButtonType>('default'),
  close: Function,
  buttonProps: ObjectType<ButtonProps>(),
})

export default defineComponent({
  name: 'ActionButton',
  props: actionButtonProps(),
  setup(props, { slots }) {
    const { buttonProps, type } = props
    const onInternalClose = (...args: any[]) => {
      props.close!(...args)
    }
    const onClick = (e) => {
      onInternalClose()
    }
    return () => {
      const {} = props
      return (
        <Button {...convertLegacyProps(type)} {...buttonProps} v-slots={slots} onClick={onClick} />
      )
    }
  },
})
