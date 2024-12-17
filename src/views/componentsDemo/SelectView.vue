<template>
  <div>
    <p-tag color="#0a0">simple placement single</p-tag>
    <p-select :options="options1" placeholder="测试placeholder">
      <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        自定义dropdown
      </template>
    </p-select>
    <br />
    <p-select
      class="my-2"
      :options="options1"
      placement="topLeft"
      placeholder="placement topLeft"
    />

    <p-tag color="#0a0">multiple</p-tag>
    <br />

    <p-select class="my-2" placeholder="no options" />

    <p-tag color="#0a0">notFound</p-tag>
    <br />

    <p-select class="my-2" notFoundContent="自定义notFoundContent">
      <template #notFoundContent>12312</template>
    </p-select>

    <p-tag color="#0a0">大数据渲染</p-tag>
    <p-select placeholder="大数据" :options="options" />

    <p-divider>select</p-divider>
    <div :style="{ width: '800px' }" class="my-2">
      <a-select placeholder="ant select" :style="{ width: '100%' }" v-model:value="value" />

      <a-select
        :style="{ width: '100%' }"
        class="my-2"
        mode="combobox"
        :options="options1"
        v-model:value="value1"
      />

      <!-- labelInValue -->
      <a-select
        v-model:value="value2"
        :options="options2"
        :maxTagCount="2"
        mode="tags"
        placeholder="Please select"
        style="width: 200px"
        @popupScroll="handleScroll"
        class="my-2"
      >
        <!-- <template #tagRender="{ value, label }"> {{ value }}===> phil </template> -->
        <!-- <template #removeIcon>close</template> -->
      </a-select>
      <br />

      <a-select class="my-2" placement="topLeft" :options="options1" :style="{ width: '200px' }">
        <template #dropdownRender="{ menuNode: menu }">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0" />
          <a-space>
            <a-input />
            <a-button type="text">add Item</a-button>
          </a-space>
        </template>
      </a-select>

      <!-- 大数据 -->
      <a-select class="my-2" :open="true" :options="options" :style="{ width: '200px' }" />
      <br />
      <!-- 远程加载 -->

      <a-select
        v-model:value="state.value"
        mode="multiple"
        label-in-value
        placeholder="Select users"
        style="width: 100%"
        :filter-option="false"
        :not-found-content="state.fetching ? undefined : null"
        :options="state.data"
        @search="fetchUser"
        class="my-2"
      >
        <template v-if="state.fetching" #notFoundContent>
          <a-spin size="small" />
        </template>

        <template #menuItemSelectedIcon> 这是选中的内容 </template>
      </a-select>

      <a-select
        class="my-2"
        v-model:value="value11"
        show-search
        placeholder="input search text"
        style="width: 200px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="data"
        @search="handleSearch"
        @change="handleChange"
      ></a-select>
      <br />
      <a-select :open="true" :value="[1]" :style="{ width: '200px' }">
        <a-select-option :value="1">option 1</a-select-option>
      </a-select>
      <br />
      <a-select class="my-2" :style="{ width: '200px' }">
        <a-select-opt-group>
          <template #label>
            <span>
              <user-outlined />
              Manager
            </span>
          </template>
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select-opt-group>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import jsonp from 'fetch-jsonp'
import { UserOutlined } from '@ant-design/icons-vue'

const value = ref(undefined)
const value1 = ref('lucy')
const value2 = ref(['a1', 'b2'])
const options1 = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack',
  },
  // {
  //   value: 'lucy',
  //   label: 'Lucy',
  // },
  // {
  //   value: 'disabled',
  //   label: 'Disabled',
  //   disabled: true,
  // },
  // {
  //   value: 'yiminghe',
  //   label: 'Yiminghe',
  // },
])
const options2 = computed(() => {
  return Array.from({ length: 25 }).map((_, i) => {
    return { value: (i + 10).toString(36) + (i + 1) }
  })
})

const options: { value: string; disabled: boolean }[] = []

for (let i = 0; i < 100; i++) {
  const value = `${i.toString(36)}${i}`
  options.push({
    value,
    disabled: i === 10,
  })
}

const handleScroll = (e) => {
  console.log('scroll', e)
}

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    console.log('this.vnodes', this.vnodes)

    return this.vnodes
  },
})

let lastFetchId = 0

const state = reactive({
  data: [],
  value: [],
  fetching: false,
})

const fetchUser = debounce((value) => {
  console.log('fetching user', value)
  lastFetchId += 1
  const fetchId = lastFetchId
  state.data = []
  state.fetching = true
  fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) => {
      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return
      }
      const data = body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }))
      state.data = data
      state.fetching = false
    })
}, 300)

watch(state.value, () => {
  state.data = []
  state.fetching = false
})

let timeout: any
let currentValue = ''

function fetch(value: string, callback: any) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    const params = new URLSearchParams({
      code: 'utf-8',
      q: value,
    })
    jsonp(`https://suggest.taobao.com/sug?${params}`)
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result
          const data: any[] = []
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              label: r[0],
            })
          })
          callback(data)
        }
      })
  }

  timeout = setTimeout(fake, 300)
}

const data = ref<any[]>([])
const value11 = ref()

const handleSearch = (val: string) => {
  fetch(val, (d: any[]) => (data.value = d))
}
const handleChange = (val: string) => {
  console.log(val)
  value11.value = val
  fetch(val, (d: any[]) => (data.value = d))
}
</script>

<style lang="less" scoped></style>
