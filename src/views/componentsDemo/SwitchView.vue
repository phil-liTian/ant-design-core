<template>
  <div>
    <p-switch v-model:checked="checked" checked-children="开" un-checked-children="关"></p-switch>
    <hr class="my-2px" />
    <a-switch v-model:checked="checked" checked-children="开" un-checked-children="关"></a-switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>

<style lang="less" scoped></style>
