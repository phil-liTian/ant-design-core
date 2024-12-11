<template>
  <div>
    <p-select />
    <p-divider>select</p-divider>
    <div :style="{ width: '800px' }">
      <a-select :style="{ width: '100%' }" :options="options1" v-model:value="value1" />

      <a-select
        :style="{ width: '100%' }"
        mode="combobox"
        :options="options1"
        v-model:value="value1"
      />
      <a-select
        v-model:value="value2"
        :options="options2"
        :maxTagCount="2"
        mode="tags"
        placeholder="Please select"
        style="width: 200px"
        @popupScroll="handleScroll"
        class="my-2"
      />
      <br />

      <a-select placement="topLeft" :options="options1" :style="{ width: '200px' }">
        <template #dropdownRender="{ menuNode: menu }">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0" />
          <a-space>
            <a-input />
            <a-button type="text">add Item</a-button>
          </a-space>
        </template>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { computed, defineComponent, ref } from 'vue'

const value1 = ref('lucy')
const value2 = ref(['a1', 'b2'])
const options1 = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
])
const options2 = computed(() => {
  return Array.from({ length: 25 }).map((_, i) => {
    return { value: (i + 10).toString(36) + (i + 1) }
  })
})

const handleScroll = (e) => {
  console.log('scroll', e)
}

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes
  },
})
</script>

<style lang="less" scoped></style>
