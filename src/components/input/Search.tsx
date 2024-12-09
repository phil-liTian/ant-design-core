import { defineComponent, shallowRef } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import inputProps from './inputProps'
import Input from './Input'
import Button from '../button'
import PropTypes from '../_utils/vue-types'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'PInputSearch',
  props: {
    ...inputProps(),
    enterButton: PropTypes.any,
  },
  emits: ['search'],
  setup(props, { slots, emit }) {
    const inputRef = shallowRef()
    const { prefixCls } = useConfigInject('input-search', props)
    return () => {
      const { enterButton = slots.enterButton?.() ?? false, ...restProps } = props

      const onSearch = (e) => {
        emit('search', e.target.value, e)
      }

      const searchIcon = typeof enterButton === 'boolean' ? <SearchOutlined /> : null
      const btnClassName = `${prefixCls.value}-button`

      let button: any

      button = (
        <Button class={btnClassName} type={enterButton ? 'primary' : undefined} onClick={onSearch}>
          {searchIcon || enterButton}
        </Button>
      )

      const cls = classNames(prefixCls.value)

      return <Input {...restProps} class={cls} ref={inputRef} addonAfter={button} v-slots={slots} />
    }
  },
})
