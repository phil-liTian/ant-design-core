import type { FlattenOptionData } from '../interface'
import type { BaseOptionType, DefaultOptionType, FieldNames } from '../Select'

export function fillFieldNames(fieldNames: FieldNames | undefined) {
  const { value, label, options } = fieldNames || {}
  return {
    label: label || 'label',
    value: value || 'value',
    options: options || 'children',
  }
}

export function flattenOptions<OptionType extends BaseOptionType = DefaultOptionType>(
  options: OptionType[],
  { fieldNames }: { fieldNames?: FieldNames },
): FlattenOptionData<OptionType>[] {
  const flattenOptions: FlattenOptionData<OptionType>[] = []

  if (!options) return []
  const { label: fieldLabel, value: fieldValue, options: fieldOptions } = fillFieldNames(fieldNames)

  function dig(list: OptionType[], isGroupOption: boolean) {
    list.map((data) => {
      const value = data[fieldValue]
      const label = data[fieldLabel]

      flattenOptions.push({
        value,
        label,
        data,
        key: '1',
      })
    })
  }

  dig(options, false)

  return flattenOptions
}
