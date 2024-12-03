import { defineComponent } from 'vue'
import Button from '../button'
import { ObjectType, StringType } from './type'
import { convertLegacyProps, type ButtonProps, type LegacyButtonType } from '../button/buttonTypes'
const actionButtonProps = () => ({
  type: StringType<LegacyButtonType>('default'),
  close: Function,
  actionFn: Function,
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

    const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
      if (!returnValueOfOnOk?.then) return
      returnValueOfOnOk.then(
        (...args: []) => {
          onInternalClose(...args)
        },
        (e: Error) => {
          return Promise.reject(e)
        },
      )
    }

    const onClick = (e) => {
      const { actionFn } = props
      if (!actionFn) {
        onInternalClose()
        return
      }
      let returnValueOfOnOk: PromiseLike<any>
      if (actionFn.length) {
      } else {
        returnValueOfOnOk = actionFn()
        // 什么都没返回 则直接关闭
        if (!returnValueOfOnOk) {
          onInternalClose()
          return
        }
        // 里面可能是一个promise
      }
      handlePromiseOnOk(returnValueOfOnOk!)
    }
    return () => {
      const {} = props
      return (
        <Button {...convertLegacyProps(type)} {...buttonProps} v-slots={slots} onClick={onClick} />
      )
    }
  },
})
