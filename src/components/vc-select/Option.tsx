import type { FunctionalComponent } from 'vue'
import type { DefaultOptionType } from './Select'

// TODO value如何产生关联？？
export interface OptionProps extends Omit<DefaultOptionType, 'label'> {
  [prop: string]: any
}

export interface OptionFC extends FunctionalComponent<OptionProps> {
  isSelectOption: boolean
}

const Option: OptionFC = () => null
Option.displayName = 'PSelectOption'
Option.isSelectOption = true
export default Option
