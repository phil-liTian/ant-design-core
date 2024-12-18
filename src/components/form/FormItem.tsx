import { defineComponent } from 'vue'
import { Row } from '../grid'
import FormItemLabel from './FormItemLabel'
import FormItemInput from './FormItemInput'
import PropTypes from '../_utils/vue-types'

const formItemProps = () => ({
  prefixCls: String,
  htmlFor: String,
  label: PropTypes.any,
})

export default defineComponent({
  name: 'PFormItem',
  props: formItemProps(),
  setup(props, { slots }) {
    const { label, htmlFor } = props
    return () => (
      <div>
        <Row
          v-slots={{
            default: () => (
              <>
                <FormItemLabel htmlFor={htmlFor!} label={label} v-slots={{ label: slots.label }} />
                <FormItemInput v-slots={{ default: slots.default }} />
              </>
            ),
          }}
        />
      </div>
    )
  },
})
