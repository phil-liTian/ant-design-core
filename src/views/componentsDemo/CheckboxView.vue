<template>
  <div>
    <p-checkbox v-model:checked="checked">phil</p-checkbox>

    <hr />

    <a-checkbox v-model:checked="checked">ant</a-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>

<style lang="less" scoped></style>
