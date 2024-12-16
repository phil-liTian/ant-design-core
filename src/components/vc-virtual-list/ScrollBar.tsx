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
      <div
        class={`${prefixCls}-scrollbar`}
        style={{ width: '8px', position: 'absolute', top: 0, bottom: 0, right: 0 }}
      >
        <div
          class={`${prefixCls}-scrollbar-thumb`}
          style={{
            width: '100%',
            height: '20px',
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '99px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        ></div>
      </div>
    )
  },
})
