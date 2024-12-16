<template>
  <div>
    <p-tag color="#0a0">simple placement single</p-tag>
    <p-select :options="options1" placeholder="测试placeholder" />
    <br />
    <p-select :options="options1" placement="topLeft" placeholder="placement topLeft" />

    <p-tag color="#0a0">multiple</p-tag>
    <br />

    <p-select placeholder="no options" />

    <p-tag color="#0a0">notFound</p-tag>
    <br />

    <p-select notFoundContent="2323423">
      <template #notFoundContent>12312</template>
    </p-select>

    <p-divider>select</p-divider>
    <div :style="{ width: '800px' }">
      <!-- :options="options1" -->

      <a-select placeholder="ant select" :style="{ width: '100%' }" v-model:value="value" />

      <a-select
        :style="{ width: '100%' }"
        class="my-2"
        mode="combobox"
        :options="options1"
        v-model:value="value1"
      />

      <a-select
        labelInValue
        v-model:value="value2"
        :options="options2"
        :maxTagCount="2"
        mode="tags"
        placeholder="Please select"
        style="width: 200px"
        @popupScroll="handleScroll"
        class="my-2"
      >
        <!-- <template #tagRender="{ value, label }"> {{ value }}===> phil </template> -->
      </a-select>
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

      <a-select :open="true" :options="options" :style="{ width: '200px' }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { computed, defineComponent, ref } from 'vue'

const value = ref(undefined)
const value1 = ref('lucy')
const value2 = ref(['a1', 'b2'])
const options1 = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack',
  },
  // {
  //   value: 'lucy',
  //   label: 'Lucy',
  // },
  // {
  //   value: 'disabled',
  //   label: 'Disabled',
  //   disabled: true,
  // },
  // {
  //   value: 'yiminghe',
  //   label: 'Yiminghe',
  // },
])
const options2 = computed(() => {
  return Array.from({ length: 25 }).map((_, i) => {
    return { value: (i + 10).toString(36) + (i + 1) }
  })
})

const options: { value: string; disabled: boolean }[] = []

for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`
  options.push({
    value,
    disabled: i === 10,
  })
}

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
    console.log('this.vnodes', this.vnodes)

    return this.vnodes
  },
})
</script>

<style lang="less" scoped></style>
