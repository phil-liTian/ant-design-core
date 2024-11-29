<template>
  <div>
    <p-radio>phil</p-radio>
    <br />
    {{ radioValue }}
    <p-radio-group v-model:value="radioValue">
      <p-radio :value="1">phil</p-radio>
      <p-radio :value="2">phil1</p-radio>
    </p-radio-group>
    <br />
    <a-radio>ant</a-radio>
    <br />
    <a-radio-group v-model:value="radioValue">
      <a-radio :value="1">ant</a-radio>
      <a-radio :value="2">ant1</a-radio>
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radioValue = ref(1)
</script>

<style lang="less" scoped></style>
