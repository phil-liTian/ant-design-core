<template>
  <div>
    <p-watermark
      :height="30"
      :width="130"
      :font="{ color: 'red', fontSize: 26 }"
      content="phil Design"
    >
      <!-- image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original" -->

      <div style="height: 500px" />
    </p-watermark>

    <a-watermark
      :height="30"
      :width="130"
      image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
      :font="{ color: 'red' }"
      content="Ant Design Vue"
    >
      <div style="height: 500px" />
    </a-watermark>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
