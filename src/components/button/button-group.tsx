import { computed, defineComponent, reactive, type ExtractPropTypes, type PropType } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import type { SizeType } from '../config-provider/context'
import createContext from '../_utils/createContext'
import { flattenChildren } from '../_utils/props-util'

const buttonGroupProps = () => ({
  size: {
    type: String as PropType<SizeType>,
  },
})

export const GroupSizeContext = createContext<{
  size: SizeType
}>()

export default defineComponent({
  name: 'PButtonGroup',
  props: buttonGroupProps(),
  setup(props, { slots }) {
    const { prefixCls, direction } = useConfigInject('btn-group', props)
    GroupSizeContext.useProvide(
      reactive({
        size: computed(() => props.size),
      }),
    )

    const classes = computed(() => {
      const { size } = props
      const prefixClsVal = prefixCls.value
      const sizeCls =
        {
          large: 'lg',
          small: 'sm',
        }[size!] || undefined

      return {
        [`${prefixClsVal}`]: true,
        [`${prefixClsVal}-${sizeCls}`]: sizeCls,
        [`${prefixClsVal}-rtl`]: direction.value === 'rtl',
      }
    })

    return () => <div class={classes.value}>{flattenChildren(slots.default?.() as any)}</div>
  },
})

export type ButtonGroupProps = Partial<ExtractPropTypes<ReturnType<typeof buttonGroupProps>>>
