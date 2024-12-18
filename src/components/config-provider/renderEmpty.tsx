import Empty from '../empty'
import useConfigInject from './hooks/useConfigInject'

export interface RenderEmptyProps {
  componentName?: string
}

export const DefaultRenderEmpty = (props: RenderEmptyProps) => {
  const { prefixCls } = useConfigInject('empty', props)
  const renderHtml = (componentName?: string) => {
    switch (componentName) {
      case 'Select':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefixCls.value}-small`} />
      default:
        return <Empty />
    }
  }

  return renderHtml(props.componentName)
}

export default DefaultRenderEmpty
