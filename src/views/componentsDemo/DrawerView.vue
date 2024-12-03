<template>
  <div>
    <p-button @click="showPhilDrawer = true">phil drawer</p-button>
    <p-drawer v-model:open="showPhilDrawer"></p-drawer>

    <p-divider orientation="left">drawer</p-divider>

    <a-button @click="showAntDrawer = true">ant drawer</a-button>
    <a-drawer v-model:open="showAntDrawer"></a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showAntDrawer = ref(false)
const showPhilDrawer = ref(false)
</script>

<style lang="less" scoped></style>
