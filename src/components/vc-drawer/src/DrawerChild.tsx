import { defineComponent, Transition } from 'vue'
import { drawerChildProps } from './IDrawerPropTypes'
import classNames from '@/components/_utils/classNames'
import KeyCode from '@/components/_utils/KeyCode'

const DrawerChild = defineComponent({
  name: 'DrawerChild',
  props: drawerChildProps(),
  emits: ['close'],
  setup(props, { slots, emit }) {
    const onAfterVisibleChange = () => {
      const { afterVisibleChange, open } = props
      if (afterVisibleChange) {
        afterVisibleChange(!!open)
      }
    }
    const onClose = (e) => {
      emit('close', e)
    }

    // esc 关闭modal
    const handleKeydown = (e) => {
      console.log('e', e)

      if (e.keyCode === KeyCode.ESC) {
        e.stopPropagation()
        onClose(e)
      }
    }
    return () => {
      const {
        showMask,
        prefixCls,
        placement,
        maskMotion,
        motion,
        rootStyle,
        rootClassName,
        contentWrapperStyle,
        open: $open,
        afterVisibleChange,
        maskClosable,
      } = props

      const wrapperClassName = classNames(prefixCls, {
        [`${prefixCls}-${placement}`]: true,
        [rootClassName!]: true,
      })

      const motionProps = typeof motion === 'function' ? motion(placement) : motion

      return (
        <div tabindex={-1} class={wrapperClassName} style={rootStyle} onKeydown={handleKeydown}>
          <Transition {...maskMotion}>
            {showMask ? (
              <div
                onClick={maskClosable ? onClose : undefined}
                v-show={open}
                class={`${prefixCls}-mask`}
              />
            ) : null}
          </Transition>

          <Transition
            {...motionProps}
            onAfterEnter={onAfterVisibleChange}
            onAfterLeave={onAfterVisibleChange}
          >
            <div v-show={open} class={`${prefixCls}-content-wrapper`} style={contentWrapperStyle}>
              <div class={`${prefixCls}-content`}>{slots.default?.()}</div>
            </div>
          </Transition>
        </div>
      )
    }
  },
})

export default DrawerChild
