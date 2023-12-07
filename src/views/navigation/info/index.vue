<template>
  <div class="container">
    <!-- <img src="https://www.google.com/s2/favicons?domain=https://echarts.apache.org/examples/zh/index.html#chart-type-bar" alt="" width="14" height="14"> -->

    <div class="navigation">
      <div class="top-panel">
        <a-button type="primary">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>添加</template>
        </a-button>
        <a-space style="float: right">
          <a-cascader :options="options" :style="{ width: '320px' }" placeholder="Please select ..." />
          <a-button>筛选</a-button>
        </a-space>
      </div>

      <a-divider />

      <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
        <a-grid-item class="demo-item">
          <a-link :loading="loading2" @click="handleClick">
            <template #icon>
              <icon-edit />
            </template>
            Link
          </a-link>
        </a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item">item</a-grid-item>
        <a-grid-item class="demo-item" :span="{ xl: 4, xxl: 6 }" suffix>
          suffix
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>

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

.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
