import type { App } from 'vue'
import Radio from './Radio'
import Group from './Group'
import RadioButton from './RadioButton'

export type { RadioProps } from './Radio'
export type { RadioGroupProps } from './Group'

Radio.Group = Group
Radio.Button = RadioButton

Radio.install = (app: App) => {
  app.component(Radio.name!, Radio)
  app.component(Group.name!, Group)
  app.component(RadioButton.name!, RadioButton)

  return app
}
export { Radio, RadioButton, Group, Group as RadioGroup }

export default Radio as typeof Radio & {
  Group: typeof Group
  Button: typeof RadioButton
}
