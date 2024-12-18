import { defineComponent } from 'vue'
import { Col } from '../grid'
import classNames from '../_utils/classNames'
import ErrorList from './ErrorList'

const FormItemInput = defineComponent({
  props: ['prefixCls', 'extra'],
  setup(props, { slots }) {
    return () => {
      const { prefixCls, extra } = props
      const baseClassName = `${prefixCls}-item`
      const className = classNames(`${baseClassName}-control`)
      return (
        <Col
          class={className}
          v-slots={{
            default: () => (
              <>
                <div class={`${baseClassName}-control-input`}>
                  <div class={`${baseClassName}-control-input-content`}>{slots.default?.()}</div>
                </div>
                {/* error */}
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <ErrorList />
                </div>

                {extra ? <div class={`${baseClassName}-extra`}>{extra}</div> : null}
              </>
            ),
          }}
        ></Col>
      )
    }
  },
})

export default FormItemInput
