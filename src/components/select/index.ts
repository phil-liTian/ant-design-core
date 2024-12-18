import type { App, ExtractPropTypes } from 'vue'
import Select, { type selectProps } from './Select'
import type { ComponentToken } from './style/index'

Select.install = (app: App) => {
  app.component(Select.name!, Select)
  app.component(Select.Option.displayName!, Select.Option)
  app.component(Select.OptGroup.displayName!, Select.OptGroup)

  return app
}

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>

export default Select

export type { ComponentToken }
