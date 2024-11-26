import { computed, defineComponent, ref, watch, type ExtractPropTypes } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { BooleanType, tuple, withInstall } from '../_utils/type'
import useStyle from './style'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import PropTypes from '../_utils/vue-types'
import { getPropsSlot } from '../_utils/props-util'
import KeyCode from '../_utils/KeyCode'
import Wave from '../_utils/wave'
export const SwitchSize = tuple('small', 'default')

type CheckedType = boolean | number | string
export const switchProps = () => ({
  id: String,
  prefixCls: String,
  size: PropTypes.oneOf(SwitchSize),
  loading: BooleanType(undefined),
  disabled: BooleanType(undefined),
  autofocus: BooleanType(undefined),

  // value
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  checkedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).def(true),
  unCheckedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).def(
    false,
  ),

  // slots
  checkedChildren: PropTypes.any,
  unCheckedChildren: PropTypes.any,

  // events
})

export type SwitchProps = Partial<ExtractPropTypes<ReturnType<typeof switchProps>>>

const Switch = defineComponent({
  name: 'PSwitch',
  props: switchProps(),
  setup(props, { expose, emit, slots, attrs }) {
    const { prefixCls, direction, size } = useConfigInject('switch', props)
    const [wrapSSR] = useStyle(prefixCls)

    const prefixClsValue = prefixCls.value
    const mergedDisabled = computed(() => props.disabled)

    const refSwitchNode = ref()

    const checked = ref<string | number | boolean | null>(
      props.checked !== undefined ? props.checked : (attrs.defaultChecked as boolean),
    )
    const checkedStatus = computed(() => checked.value === props.checkedValue)

    watch(
      () => props.checked,
      () => {
        checked.value = props.checked!
      },
    )

    const setChecked = (check: CheckedType, e: MouseEvent | KeyboardEvent) => {
      if (mergedDisabled.value) return
      emit('update:checked', check)
      emit('change', check, e)
    }

    const handleClick = (e: MouseEvent) => {
      const newChecked = checkedStatus.value ? props.unCheckedValue : props.checkedValue

      setChecked(newChecked as CheckedType, e)
      emit('click', newChecked, e)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === KeyCode.LEFT) {
        setChecked(props.unCheckedValue as CheckedType, e)
      } else if (e.keyCode === KeyCode.RIGHT) {
        setChecked(props.checkedValue as CheckedType, e)
      }

      emit('keydown', e)
    }

    const focus = () => {
      refSwitchNode.value?.focus()
    }

    const blur = () => {
      refSwitchNode.value?.blur()
    }

    const classes = computed(() => ({
      [`${prefixClsValue}`]: true,
      [`${prefixClsValue}-small`]: size.value === 'small',
      [`${prefixClsValue}-loading`]: props.loading,
      [`${prefixClsValue}-checked`]: checkedStatus.value,
      [`${prefixClsValue}-disabled`]: mergedDisabled.value,
      [`${prefixClsValue}-rtl`]: direction.value === 'rtl',
    }))

    expose({ focus, blur })

    return () =>
      wrapSSR(
        <Wave>
          <button
            onClick={handleClick}
            onKeydown={handleKeyDown}
            class={[classes.value, attrs.class]}
            ref={refSwitchNode}
            role="switch"
          >
            <div class={`${prefixClsValue}-handle`}>
              {props.loading ? <LoadingOutlined class={`${prefixClsValue}-loading-icon`} /> : null}
            </div>
            <span class={`${prefixClsValue}-inner`}>
              <span class={`${prefixClsValue}-inner-checked`}>
                {getPropsSlot(slots, props, 'checkedChildren')}
              </span>
              <span class={`${prefixClsValue}-inner-unchecked`}>
                {getPropsSlot(slots, props, 'unCheckedChildren')}
              </span>
            </span>
          </button>
          ,
        </Wave>,
      )
  },
})

export default withInstall(Switch)
