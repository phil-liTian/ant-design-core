<template>
  <div>
    <p-button @click="showPhilModal = true">show phil modal</p-button>
    <p-modal :width="800" title="phil" v-model:open="showPhilModal" />
    <p-button class="mx-2px" @click="handleShowPhilConfirm">confirm</p-button>
    <p-button class="mx-2px" @click="handleShowPhilInfo">info</p-button>

    <p-divider>modal</p-divider>
    <a-button @click="showAntModal = true" type="primary">show ant modal</a-button>
    <a-modal title="ant" v-model:open="showAntModal"></a-modal>

    <a-button class="mx-10px" @click="handleShowConfirm">confirm</a-button>
    <a-button class="mx-10px" @click="handleShowWarn">warn</a-button>
    <a-button class="mx-10px" @click="handleShowInfo">info</a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { Modal as PModal } from '@/components/components'

const showAntModal = ref(false)
const showPhilModal = ref(false)

const handleShowConfirm = () => {
  Modal.confirm({
    title: 'confirm',
  })
}

const handleShowWarn = () => {
  Modal.warn({
    title: 'warn',
  })
}

const handleShowInfo = () => {
  Modal.info({
    title: 'info',
  })
}

const handleShowPhilConfirm = () => {
  PModal.confirm({
    title: 'confirm',
  })
}

const handleShowPhilInfo = () => {
  PModal.info({
    title: 'info',
  })
}
</script>

<style lang="less" scoped></style>
