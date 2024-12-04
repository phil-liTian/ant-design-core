<template>
  <div>
    <p-radio-group :options="options" v-model:value="placement"></p-radio-group>

    <p-button @click="showPhilDrawer = true">phil drawer</p-button>
    <p-drawer
      :bodyStyle="{ padding: 0 }"
      :width="999"
      title="phil-drawer"
      :placement="placement"
      v-model:open="showPhilDrawer"
    >
      <template #extra>
        <div>12312</div>
      </template>
      234
      <template #footer>
        <a-button>footer</a-button>
      </template>
    </p-drawer>

    <p-divider orientation="left">drawer</p-divider>

    <a-button @click="showAntDrawer = true">ant drawer</a-button>
    <a-drawer v-model:open="showAntDrawer" :placement="placement" title="ant drawer">
      <template #extra>1231</template>

      <template #footer>
        <a-button>footer</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const placement = ref('right')
const options = ref([
  { label: '上', value: 'top' },
  { label: '右', value: 'right' },
  { label: '下', value: 'bottom' },
  { label: '左', value: 'left' },
])

const showAntDrawer = ref(false)
const showPhilDrawer = ref(true)
</script>

<style lang="less" scoped></style>
