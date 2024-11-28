<template>
  <div>
    {{ checked }}
    {{ checkedList }}
    <p-checkbox v-model:checked="checked">phil</p-checkbox>
    <br />
    <p-checkbox-group v-model:value="checkedList">
      <p-checkbox value="1">1</p-checkbox>
      <p-checkbox value="2">2</p-checkbox>
    </p-checkbox-group>

    <p-checkbox-group v-model:value="checkedList1" :options="[1, 2, 3]" />
    <p-checkbox-group v-model:value="checkedList1" :options="options" />
    <br />
    <p-checkbox-group :options="options">
      <template #label="option">{{ option.value }}</template>
    </p-checkbox-group>

    <hr />

    <a-checkbox v-model:checked="checked">ant</a-checkbox>
    <br />
    <a-checkbox-group v-model:value="checkedList">
      <a-checkbox value="1">1</a-checkbox>
      <a-checkbox value="2">2</a-checkbox>
    </a-checkbox-group>
    <br />
    <a-checkbox-group v-model:value="checkedList1" :options="[1, 2, 3]" />
    <a-checkbox-group v-model:value="checkedList1" :options="options" />

    <br />
    <a-checkbox-group :options="options">
      <template #label>12312</template>
    </a-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

const checked = ref(false)
const checkedList = ref(['1'])
const checkedList1 = ref([1])

const options = [
  { label: h('div', {}, '123'), value: 1 },
  { label: h('div', {}, '456'), value: 2 },
]
</script>

<style lang="less" scoped></style>
