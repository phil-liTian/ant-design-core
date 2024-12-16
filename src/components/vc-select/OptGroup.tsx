import type { FunctionalComponent } from 'vue'
import type { DefaultOptionType } from './Select'

export interface OptionProps extends Omit<DefaultOptionType, 'options'> {}

export interface OptionGroupFC extends FunctionalComponent<OptionProps> {
  isSelectOptGroup: boolean
}

const OptGroup: OptionGroupFC = () => null
OptGroup.displayName = 'PSelectOption'
OptGroup.isSelectOptGroup = true
export default OptGroup
