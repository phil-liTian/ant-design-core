import type { App, Plugin } from 'vue'
import Button from './button'
import ButtonGroup from './button-group'

export type { ButtonType, ButtonShape, ButtonHTMLType, ButtonProps } from './buttonTypes'
export type { ButtonGroupProps } from './button-group'

export type { SizeType as ButtonSize } from '../config-provider'

Button.install = (app: App) => {
  app.component(Button.name as string, Button)
  app.component(ButtonGroup.name as string, ButtonGroup)
  return app
}

export { ButtonGroup }
export default Button as typeof Button & Plugin
