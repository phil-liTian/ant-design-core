<template>
  <div>
    <p-result
      status="403"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <p-button key="console" type="primary">Go Console</p-button>
        <p-button key="buy">Buy Again</p-button>
      </template>
    </p-result>
    <p-divider orientation="left">result</p-divider>
    <a-result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <a-button key="console" type="primary">Go Console</a-button>
        <a-button key="buy">Buy Again</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
