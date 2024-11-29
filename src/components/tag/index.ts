import Tag from './Tag'
import CheckboxTag from './CheckboxTag'
import type { App } from 'vue'
export type { TagProps } from './interface'
export type { ComponentToken } from './style'

Tag.CheckboxTag = CheckboxTag

Tag.install = (app: App) => {
  app.component(Tag.name!, Tag)
  app.component(CheckboxTag.name!, CheckboxTag)

  return app
}

export { CheckboxTag }
export default Tag
