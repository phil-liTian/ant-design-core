<template>
  <div>
    <p-spin></p-spin>
    <p-spin :spining="false"></p-spin>
    <div :style="{ width: '100px', height: '100px' }">
      <p-spin :spining="true" size="large" tip="加载中"></p-spin>
      <!-- <a-spin :indicator="indicator"></a-spin> -->
    </div>
    <p-divider>spin</p-divider>
    <a-spin></a-spin>
    <a-spin :delay="1000"></a-spin>
    <div :style="{ width: '100px', height: '100px' }">
      <a-spin :spinning="true" size="large" tip="加载中">
        <div>内容</div>
      </a-spin>
      <!-- <a-spin :indicator="indicator"></a-spin> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { Spin } from 'ant-design-vue'
import { Spin as PSpin } from '@/components/components'

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
})

Spin.setDefaultIndicator({ indicator })
// PSpin.setDefaultIndicator({ indicator })
</script>

<style lang="less" scoped></style>
