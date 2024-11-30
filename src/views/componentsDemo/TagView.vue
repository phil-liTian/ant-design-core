<template>
  <div>
    <p-tag>phil</p-tag>
    <p-tag :bordered="false">phil borderedless</p-tag>
    <p-tag closable>phil</p-tag>
    <p-tag closable>phil <template #closeIcon>关闭</template> </p-tag>
    <p-tag color="#0a0">phil</p-tag>
    <p-tag color="red">phil</p-tag>
    <p-tag color="pink">phil</p-tag>
    <p-tag color="yellow">phil</p-tag>
    <p-tag color="green">phil</p-tag>

    <p-checkable-tag v-model:checked="checked">phil checkable</p-checkable-tag>

    <p-divider>tag</p-divider>
    <a-tag>ant</a-tag>
    <a-tag :bordered="false">ant</a-tag>
    <a-tag closable>ant</a-tag>
    <a-tag closable>
      ant
      <template #closeIcon>111</template>
    </a-tag>
    <a-tag color="#0a0">ant</a-tag>
    <a-tag color="red">ant</a-tag>
    <a-tag color="pink">ant</a-tag>

    <a-checkable-tag v-model:checked="checked">ant checkable</a-checkable-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<style lang="less" scoped></style>
