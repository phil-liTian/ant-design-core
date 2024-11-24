<template>
  <div>
    <p-alert message="phil alert" banner></p-alert>
    <p-alert closable closeText="关闭" class="my-2" type="error" message="phil alert"></p-alert>
    <p-alert closable type="warning" message="phil alert"></p-alert>
    <p-alert class="my-2" type="success" message="phil alert"></p-alert>

    <hr class="my-10px" />

    <a-alert message="ant alert" closable closeText="关闭"></a-alert>
    <a-alert message="ant alert" banner class="my-2" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
