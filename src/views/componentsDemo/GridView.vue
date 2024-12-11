<template>
  <div>
    <p-row :gutter="[16, 16]">
      <p-col :order="1" :span="6"><div>col-6-order-1</div></p-col>
      <p-col :order="2" :span="6"><div>col-6-order-2</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
      <p-col :span="6"><div>col-6</div></p-col>
    </p-row>

    <p-row>
      <p-col :span="18" :push="6"><div>col-18 col-push-6</div></p-col>
      <p-col :span="6" :pull="18"><div>col-6 col-pull-18</div></p-col>
    </p-row>

    <p-row>
      <p-col :span="20" :offset="4"><div>span-20-offset</div></p-col>
    </p-row>

    <p-row>
      <p-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div>Col</div></p-col>
      <p-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"><div>Col</div></p-col>
      <p-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div>Col</div></p-col>
    </p-row>

    <p-divider orientation="left">grid</p-divider>

    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col :order="1" :span="6"><div>col-6-order-1</div></a-col>
      <a-col :order="2" :span="6"><div>col-6-order-2</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
      <a-col :span="6"><div>col-6</div></a-col>
    </a-row>

    <!-- push、pull -->
    <a-row>
      <a-col :span="18" :push="6"><div>col-18 col-push-6</div></a-col>
      <a-col :span="6" :pull="18"><div>col-6 col-pull-18</div></a-col>
    </a-row>

    <a-row>
      <a-col :span="20" :offset="4"><div>span-20-offset-4</div></a-col>
    </a-row>

    <!-- grid -->
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div>Col</div></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"><div>Col</div></a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"><div>Col</div></a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { Col as PCol, Row as PRow } from '@/components/components'
import useBreakpoint from '@/components/_utils/hooks/useBreakpoint'
const screens = useBreakpoint()
</script>

<style lang="less">
.phil-col,
.ant-col {
  height: 60px;
  > div {
    background: #3875f6;
    line-height: 60px;
    text-align: center;
  }

  &:nth-child(2n) {
    > div {
      background-color: #0a0;
    }
  }
}
</style>
