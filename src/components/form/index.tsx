import type { App } from 'vue'
import Form from './Form'
import FormItem from './FormItem'
import FormItemRest from './FormItemContext'
import type { FormProps } from './Form'

Form.install = (app: App) => {
  app.component(Form.name!, Form)
  app.component(Form.Item.name!, Form.Item)
  app.component(FormItemRest.name!, FormItemRest)
}

export { FormItem, FormItemRest, type FormProps }

export default Form
