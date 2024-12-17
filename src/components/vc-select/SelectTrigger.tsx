import { computed, defineComponent } from 'vue'
import Trigger from '../vc-trigger'
import { BooleanType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { Placement } from './BaseSelect'
import classNames from '../_utils/classNames'
const getBuiltInPlacements = () => {
  const adjustX = 0
  return {
    bottomLeft: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    bottomRight: {
      points: ['tr', 'br'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topLeft: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topRight: {
      points: ['br', 'tr'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
  }
}

export default defineComponent({
  name: 'SelectTrigger',
  props: {
    prefixCls: String,
    visible: BooleanType(undefined),
    popupElement: PropTypes.any,
    containerWidth: Number,
    getTriggerDOMNode: Function,
    placement: StringType<Placement>('bottomLeft'),
    dropdownClassName: String,
    dropdownRender: Function,
  },
  setup(props, { slots }) {
    const { prefixCls } = props
    const dropdownPrefixCls = `${prefixCls}-dropdown`
    const builtInPlacements = computed(() => {
      return getBuiltInPlacements()
    })
    return () => {
      const {
        visible,
        popupElement,
        containerWidth,
        getTriggerDOMNode,
        placement,
        dropdownClassName,
        dropdownRender,
      } = props

      let popupNode = popupElement

      if (dropdownRender) {
        // dropdownRender 第一个参数是optionList, 第二个参数是所有的props
        popupNode = dropdownRender({ menuNode: popupElement, props })
      }
      let popupStyle = { minWidth: `${containerWidth}px`, width: `${containerWidth}px` }

      return (
        <Trigger
          popupVisible={visible}
          prefixCls={dropdownPrefixCls}
          popupStyle={popupStyle}
          popupPlacement={placement}
          builtinPlacements={builtInPlacements.value}
          popupClassName={classNames(dropdownClassName)}
          getTriggerDOMNode={getTriggerDOMNode}
          v-slots={{
            default: slots.default,
            popup: () => <div>{popupNode}</div>,
          }}
        ></Trigger>
      )
    }
  },
})
