import { defineComponent, ref } from 'vue'
import Spin from '../spin'
import VcTable from '../vc-table'

const tableProps = () => ({
  prefixCls: String,
})

const InternalTable = defineComponent({
  name: 'InternalTable',
  inheritAttrs: false,
  props: tableProps(),
  setup(props, { slots }) {
    return () => {
      return (
        <div>
          <Spin spining={false}>
            <VcTable />
          </Spin>
        </div>
      )
    }
  },
})

const Table = defineComponent({
  name: 'PTable',
  props: tableProps(),
  inheritAttrs: false,

  setup() {
    const table = ref()
    return () => {
      return <InternalTable ref={table} />
    }
  },
})

export default Table
