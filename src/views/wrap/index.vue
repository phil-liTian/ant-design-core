<template>
  <div>
    <p-segmented :options="options.slice(0, 10)" v-model:value="showComponent" />
    <p-segmented class="my-2" :options="options.slice(10)" v-model:value="showComponent" />

    <transition name="fade-slide" mode="out-in">
      <component :is="componentMap[showComponent]" />
    </transition>
    <!-- <AlertView /> -->
    <!-- <ButtonView /> -->
    <!-- <SwitchView /> -->
    <!-- <CheckboxView /> -->
    <!-- <RadioView /> -->
    <!-- <InputView /> -->
    <!-- <DividerView /> -->
    <!-- <TagView /> -->
    <!-- <ModalView /> -->
    <!-- <SpinView /> -->
    <!-- <DrawerView /> -->
    <!-- <WatermarkView /> -->
    <!-- <SegmentedView /> -->
    <!-- <ResultView /> -->
    <!-- <GridView /> -->
    <!-- <EmptyView /> -->
    <!-- <SelectView /> -->
    <!-- <FormView /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AlertView from '../componentsDemo/AlertView.vue'
import ButtonView from '../componentsDemo/ButtonView.vue'
import SwitchView from '../componentsDemo/SwitchView.vue'
import CheckboxView from '../componentsDemo/CheckboxView.vue'
import RadioView from '../componentsDemo/RadioView.vue'
import DividerView from '../componentsDemo/DividerView.vue'
import TagView from '../componentsDemo/TagView.vue'
import ModalView from '../componentsDemo/ModalView.vue'
import InputView from '../componentsDemo/InputView.vue'
import SelectView from '../componentsDemo/SelectView.vue'
import SpinView from '../componentsDemo/SpinView.vue'
import DrawerView from '../componentsDemo/DrawerView.vue'
import WatermarkView from '../componentsDemo/WatermarkView.vue'
import SegmentedView from '../componentsDemo/SegmentedView.vue'
import ResultView from '../componentsDemo/ResultView.vue'
import GridView from '../componentsDemo/GridView.vue'
import EmptyView from '../componentsDemo/EmptyView.vue'
import FormView from '../componentsDemo/FormView.vue'
const showComponent = ref('SelectView')

const options = [
  'AlertView',
  'ButtonView',
  'SwitchView',
  'CheckboxView',
  'RadioView',
  'InputView',
  'DividerView',
  'TagView',
  'ModalView',
  'SpinView',
  'DrawerView',
  'WatermarkView',
  'SegmentedView',
  'ResultView',
  'GridView',
  'EmptyView',
  'SelectView',
  'FormView',
]

const componentMap = {
  AlertView: AlertView,
  ButtonView: ButtonView,
  SwitchView: SwitchView,
  CheckboxView: CheckboxView,
  RadioView: RadioView,
  InputView: InputView,
  DividerView: DividerView,
  TagView: TagView,
  ModalView: ModalView,
  SpinView: SpinView,
  DrawerView: DrawerView,
  WatermarkView: WatermarkView,
  SegmentedView: SegmentedView,
  ResultView: ResultView,
  GridView: GridView,
  EmptyView: EmptyView,
  SelectView: SelectView,
  FormView: FormView,
}
</script>

<style lang="less">
.fade-slide {
  &-enter-form {
    transform: translateX(-30px);
    opacity: 0;
  }

  &-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s;
  }
}
</style>
