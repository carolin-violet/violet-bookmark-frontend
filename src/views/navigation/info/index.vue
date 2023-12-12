<template>
  <div class="container">
    <!-- <img src="https://www.google.com/s2/favicons?domain=https://echarts.apache.org/examples/zh/index.html#chart-type-bar" alt="" width="14" height="14"> -->

    <div class="navigation">
      <div class="top-panel">
        <a-space>
          <a-button type="primary">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>添加</template>
        </a-button>
        <a-button type="primary">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>导入</template>
        </a-button>
        <a-button type="primary">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>导出</template>
        </a-button>
        </a-space>
        <a-space style="float: right">
          <!-- <a-cascader :options="options" :style="{ width: '320px' }" placeholder="Please select ..." /> -->
          <a-cascader :options="options" placeholder="Please select ..." />
          <a-button>筛选</a-button>
        </a-space>
      </div>

      <a-divider />

      <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 8 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
        <a-grid-item class="demo-item" v-for="item in list" :key="item.id">
          <a-link :loading="loading2" :href="item.url" @click="handleClick" :title="item.description">
            <a-space>
              <img :src="`https://www.google.com/s2/favicons?domain=${item.url}`" alt="" width="14" height="14">
              <span :style="{ color: item.ladder ? 'red' : 'blue' }">{{ item.title }}</span>
              <icon-edit />
              <icon-delete />
            </a-space>
          </a-link>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const list = ref([
  { id: 1, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: 2, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: 3, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: 4, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: 5, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: 6, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: 7, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: 8, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: 9, title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
])

</script>

<style lang="less" scoped>
.container {
  padding: 16px 20px;
  padding-bottom: 0;
  background-color: var(--color-fill-2);

  .navigation {
    padding: 16px 20px;
    padding-bottom: 0;
    background-color: var(--color-bg-2);
  }
}

.grid-demo-grid .demo-item {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
</style>
