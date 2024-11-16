import type { App, Plugin } from 'vue'
import Button from './button'

Button.install = (app: App) => {
  app.component(Button.name as string, Button)

  return app
}

export default Button as typeof Button & Plugin
