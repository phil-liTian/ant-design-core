<template>
  <div>
    <p-input v-model:value="value" allow-clear />
    <p-input prefix="123" suffix="456" class="my-2" />
    <p-input class="my-2">
      <template #prefix><UserOutlined /></template>
      <template #suffix><InfoCircleOutlined /></template>
    </p-input>

    <p-input addonBefore="phil addon before" addonAfter="phil addon after" />
    <p-input placeholder="这个一个placeholder">
      <template #addonBefore>ant addon</template>
      <template #addonAfter>ant after</template>
    </p-input>

    <p-input status="error" placeholder="TODO error" />

    <p-textarea auto-size placeholder="auto size" :style="{ width: '200px' }" />
    <p-textarea
      placeholder="设置了minRows和maxRows的textarea"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      @pressEnter="handleEnter"
    />

    <p-input-search placeholder="search" />

    <p-input-password placeholder="password" v-model:value="value" />

    <p-divider orientation="left">input</p-divider>

    <a-input v-model:value="value" allow-clear />
    <a-input prefix="123" suffix="456" class="my-2" />
    <a-input>
      <template #prefix><UserOutlined /></template>
      <template #suffix><InfoCircleOutlined /></template>
    </a-input>

    <a-input class="my-2" allow-clear status="error" />
    <a-input class="my-2" placeholder="warning" allow-clear status="warning" />
    <a-input class="my-2" show-count :maxlength="10" />

    <a-input addonBefore="before" addonAfter="after" class="my-2" />
    <a-input>
      <template #addonBefore>ant addon</template>
      <template #addonAfter>ant after</template>
    </a-input>

    <a-input-search class="my-2" />
    <a-input-search class="my-2" enter-button loading @search="handleSearch" />
    <a-textarea auto-size placeholder="auto size" :style="{ width: '200px' }" />
    <a-textarea
      :auto-size="{ minRows: 2, maxRows: 5 }"
      @pressEnter="handleEnter"
      show-count
      max-length="100"
    />

    <a-input-group class="my-2">
      <a-input :style="{ width: '200px' }" />
      <a-input :style="{ width: '200px' }" />
    </a-input-group>

    <a-input-password v-model:value="value" placeholder="input password">
      <template #iconRender="v">
        <EyeTwoTone v-if="v"></EyeTwoTone>
        <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
      </template>
    </a-input-password>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  UserOutlined,
  InfoCircleOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons-vue'

const value = ref(1)

const handleEnter = (e) => {
  console.log('e', e)
}

const handleSearch = (e) => {
  console.log('e', e)
}
</script>

<style lang="less" scoped></style>
