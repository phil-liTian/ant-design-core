<template>
  <div>
    <a-flex>
      <p-empty />

      <p-empty>
        <template #description>12312</template>
      </p-empty>

      <p-empty :description="null" />

      <p-empty
        :image-style="{
          height: '160px',
        }"
      ></p-empty>
    </a-flex>
    <p-divider orientation="left">empty</p-divider>
    <a-flex>
      <a-empty>
        <template #description>12312</template>
      </a-empty>
      <a-empty
        :image-style="{
          height: '160px',
        }"
      ></a-empty>
    </a-flex>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
