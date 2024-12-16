import Empty from '../empty'

export interface RenderEmptyProps {
  componentName?: string
}

export const DefaultRenderEmpty = (props: RenderEmptyProps) => {
  const renderHtml = (componentName?: string) => {
    switch (componentName) {
      case 'Select':
        return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      default:
        return <Empty />
    }
  }

  return renderHtml(props.componentName)
}

export default DefaultRenderEmpty
