<template>
  <div>
    <p-radio>phil</p-radio>
    <br />
    {{ radioValue }}
    <p-radio-group v-model:value="radioValue">
      <p-radio :value="1">phil</p-radio>
      <p-radio :value="2">phil1</p-radio>
    </p-radio-group>

    <p-radio-group v-model:value="radioValue" :options="[1, 2, 3]"></p-radio-group>

    <p-radio-group :options="RadioOptions" v-model:value="radioValue"></p-radio-group>

    <p-radio-group
      :options="RadioOptions"
      v-model:value="radioValue"
      optionType="button"
    ></p-radio-group>

    <p-radio-group v-model:value="radioValue">
      <p-radio-button :value="1">1</p-radio-button>
      <p-radio-button :value="2">2</p-radio-button>
    </p-radio-group>

    <br />
    <hr />
    <a-radio>ant</a-radio>
    <br />
    <a-radio-group v-model:value="radioValue">
      <a-radio :value="1">ant</a-radio>
      <a-radio :value="2">ant1</a-radio>
    </a-radio-group>

    <a-radio-group v-model:value="radioValue" :options="[1, 2, 3]"></a-radio-group>

    <br />
    <a-radio-group v-model:value="radioValue" :options="RadioOptions"></a-radio-group>

    <br />

    <a-radio-group
      optionType="button"
      v-model:value="radioValue"
      :options="RadioOptions"
    ></a-radio-group>

    <br />
    <br />

    <a-radio-group v-model:value="radioValue">
      <a-radio-button :value="1">1</a-radio-button>
      <a-radio-button :value="2">2</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'

const radioValue = ref(1)

const RadioOptions = ref([
  { label: h('div', { style: { color: 'red' } }, 'test h 函数'), value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
])
</script>

<style lang="less" scoped></style>
