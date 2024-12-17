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

function getKey(data: BaseOptionType, index: number) {
  const { key } = data
  let value
  if ('value' in data) {
    ;({ value } = data)
  }
  if (key !== undefined && key !== null) {
    return key
  }
  if (value !== undefined) {
    return value
  }

  return `rc-index-key-${index}`
}

export function flattenOptions<OptionType extends BaseOptionType = DefaultOptionType>(
  options: OptionType[],
  { fieldNames }: { fieldNames?: FieldNames },
): FlattenOptionData<OptionType>[] {
  const flattenList: FlattenOptionData<OptionType>[] = []

  if (!options) return []
  const { label: fieldLabel, value: fieldValue, options: fieldOptions } = fillFieldNames(fieldNames)

  function dig(list: OptionType[], isGroupOption: boolean) {
    list.map((data) => {
      const value = data[fieldValue]
      const label = data[fieldLabel]

      flattenList.push({
        value,
        label,
        data,
        key: getKey(data, flattenList.length),
      })
    })
  }

  dig(options, false)

  return flattenList
}
