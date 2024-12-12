<template>
  <div>
    <p-divider orientation="left">tree</p-divider>
    <a-tree :treeData="treeData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { TreeProps } from 'ant-design-vue'

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
]

const expandedKeys = ref<string[]>(['0-0-0', '0-0-1'])
const selectedKeys = ref<string[]>(['0-0-0', '0-0-1'])
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1'])
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys)
})
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
})
</script>

<style lang="less" scoped></style>
