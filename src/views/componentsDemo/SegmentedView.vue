<template>
  <div>
    <p-segmented v-model:value="philValue" :options="data" />
    <br />
    <p-segmented v-model:value="value2" :options="options2">
      <template #label="{ payload }">
        <div style="padding: 4px 4px">
          <div>{{ payload.title }}</div>
          <div>{{ payload.subTitle }}</div>
        </div>
      </template>
    </p-segmented>

    <p-divider orientation="left">segmented</p-divider>
    <a-segmented v-model:value="value" :options="data" />
    <br />
    <a-segmented v-model:value="value2" :options="options2">
      <template #label="{ payload }">
        <div style="padding: 4px 4px">
          <div>{{ payload.title }}</div>
          <div>{{ payload.subTitle }}</div>
        </div>
      </template>
    </a-segmented>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const data = reactive(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'])
const value = ref('Weekly')
const philValue = ref('Weekly')
const value2 = ref('spring')

const options2 = ref([
  {
    value: 'spring',
    payload: {
      title: 'Spring',
      subTitle: 'Jan-Mar',
    },
  },
  {
    value: 'summer',
    payload: {
      title: 'Summer',
      subTitle: 'Apr-Jun',
    },
  },
  {
    value: 'autumn',
    payload: {
      title: 'Autumn',
      subTitle: 'Jul-Sept',
    },
  },
  {
    value: 'winter',
    payload: {
      title: 'Winter',
      subTitle: 'Oct-Dec',
    },
  },
])
</script>

<style lang="less" scoped></style>
