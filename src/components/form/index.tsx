import type { App } from 'vue'
import Form from './Form'

Form.install = (app: App) => {
  app.component(Form.name!, Form)
}

export default Form
