import type { App } from 'vue'
import Select from './Select'
import type { ComponentToken } from './style/index'

Select.install = (app: App) => {
  app.component(Select.name!, Select)

  return app
}

export default Select

export type { ComponentToken }
