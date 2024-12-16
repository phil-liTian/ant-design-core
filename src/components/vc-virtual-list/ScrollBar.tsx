import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScrollBar',
  props: {
    prefixCls: String,
  },
  setup(props) {
    return {}
  },
  render() {
    const { prefixCls } = this.$props
    return (
      <div class={`${prefixCls}-scrollbar`}>
        <div
          class={`${prefixCls}-scrollbar-thumb`}
          style={{
            width: '20px',
            height: '20px',
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '99px',
            cursor: 'pointer',
          }}
        ></div>
      </div>
    )
  },
})
