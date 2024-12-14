import { computed } from 'vue'

export default (labeledValues) => {
  const filledLabeledValues = computed(() => {
    const patchedValues = labeledValues.value?.map((item) => {
      return item
    })

    return patchedValues || []
  })

  return [filledLabeledValues]
}
