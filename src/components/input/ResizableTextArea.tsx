import { computed, defineComponent, ref, watch } from 'vue'
import BaseInput from '../_utils/BaseInput'
import { textareaProps } from './inputProps'
import ResizeObserver from '../vc-resize-observer'
import classNames from '../_utils/classNames'
import calculateAutoSizeStyle from './calculateNodeHeight'

const RESIZE_START = 0
const RESIZE_MEASURING = 1
const RESIZE_STABLE = 2

const ResizableTextarea = defineComponent({
  inheritAttrs: false,
  props: textareaProps(),
  setup(props, { attrs }) {
    const textAreaRef = ref()
    const textareaStyles = ref({})
    const minRows = ref<number>()
    const maxRows = ref<number>()
    const needAutoSize = computed(() => !!props.autoSize)
    const resizeStatus = ref(RESIZE_STABLE)

    const onInternalResize = (size: { width: number; height: number }) => {
      if (resizeStatus.value === RESIZE_STABLE) {
        console.log('size', size)
      }
    }

    const startResize = () => {
      resizeStatus.value = RESIZE_START
    }

    watch(
      [resizeStatus, textAreaRef],
      () => {
        if (!textAreaRef.value) return
        if (resizeStatus.value === RESIZE_START) {
          resizeStatus.value = RESIZE_MEASURING
        } else if (resizeStatus.value === RESIZE_MEASURING) {
          textareaStyles.value = calculateAutoSizeStyle(
            textAreaRef.value.input,
            false,
            minRows.value,
            maxRows.value,
          )
        }
      },
      { flush: 'post', immediate: true },
    )

    watch(
      [() => props.value, needAutoSize],
      () => {
        if (needAutoSize) {
          startResize()
        }
      },
      { immediate: true },
    )
    const renderTextarea = () => {
      const { prefixCls } = props
      const cls = classNames(prefixCls, attrs.class)
      const style = [attrs.style, textareaStyles.value]
      const textareaProps = {
        class: cls,
        style,
      }

      return (
        <ResizeObserver onResize={onInternalResize}>
          <BaseInput {...textareaProps} ref={textAreaRef} tag="textarea" />
        </ResizeObserver>
      )
    }

    return () => renderTextarea()
  },
})

export default ResizableTextarea
