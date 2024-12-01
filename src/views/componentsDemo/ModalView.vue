<template>
  <div>
    <p-button @click="showPhilModal = true">show phil modal</p-button>
    <p-modal title="phil" v-model:open="showPhilModal" />

    <p-divider>modal</p-divider>
    <a-button @click="showAntModal = true" type="primary">show ant modal</a-button>
    <a-modal title="ant" v-model:open="showAntModal"></a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showAntModal = ref(false)
const showPhilModal = ref(false)
</script>

<style lang="less" scoped></style>
