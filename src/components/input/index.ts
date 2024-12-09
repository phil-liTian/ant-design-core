import type { App } from 'vue'
import Input from './Input'
import Password from './Password'
import Textarea from './Textarea'
import Group from './Group'
import Search from './Search'
export type { InputProps } from './inputProps'

Input.Password = Password
Input.Textarea = Textarea
Input.Group = Group

Input.install = (app: App) => {
  app.component(Input.name!, Input)
  app.component(Password.name!, Password)
  app.component(Textarea.name!, Textarea)
  app.component(Group.name!, Group)
  app.component(Search.name!, Search)

  return app
}

export {
  Password as InputPassword,
  Textarea as InputTextarea,
  Group as InputGroup,
  Search as InputSearch,
}

export default Input
