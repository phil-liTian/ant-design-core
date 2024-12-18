import { defineComponent, type FunctionalComponent } from 'vue'
import { Col } from '../grid'

export interface FormItemLabelProps {
  label: string
  htmlFor: string
}

const formItemLabel: FunctionalComponent<FormItemLabelProps> = (props, { slots }) => {
  const { htmlFor } = props
  const label = props.label || slots.label?.()
  if (!label) return null

  return (
    <Col>
      <label for={htmlFor}>{label}</label>
    </Col>
  )
}

export default formItemLabel
