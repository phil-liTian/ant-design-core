<template>
  <div>
    <p-divider orientation="left">segmented</p-divider>
    <a-segmented v-model:value="value" :options="data" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const data = reactive(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'])
const value = ref(data[0])
</script>

<style lang="less" scoped></style>
