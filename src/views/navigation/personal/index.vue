<template>
  <div class="container">

    <div class="navigation">
      <div class="top-panel">
        <a-space>
          <a-button type="primary" @click="handleCreate">
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
          <a-cascader :options="categoryList" placeholder="请选择类型" />
          <a-button>筛选</a-button>
        </a-space>
      </div>

      <a-divider />

      <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 8 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
        <a-grid-item class="demo-item" v-for="item in navList" :key="item.id">
          <a-link :href="item.url">
            <a-space>
              <a-image show-loader :src="`https://www.google.com/s2/favicons?domain=${item.url}`" alt="" width="14" height="14" />
              <span :style="{ color: item.ladder ? 'red' : 'blue' }" :title="item.description">{{ item.title }}</span>
              <icon-edit />
              <icon-delete />
            </a-space>
          </a-link>
        </a-grid-item>
      </a-grid>
    </div>

    <info v-if="modalVisible" v-model:visible="modalVisible" :is-edit="false" :nav="curNav"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue'
import type { INavListItem, ICategoryListItem } from './type'
import info from './info.vue'

const navList: Ref<INavListItem[]> = ref([
  { id: '1', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: '2', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: '3', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: '4', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: '5', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: '6', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: '7', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: true },
  { id: '8', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
  { id: '9', title: 'xxxxxxxxxxxxxxx', url: 'baidu.com', description: 'xxx', ladder: false },
])

const categoryList: Ref<ICategoryListItem[]> = ref([])

const modalVisible: Ref<boolean> = ref(false)
const curNav: Ref<INavListItem> = ref({})

const handleCreate = () => {
  curNav.value = {}
  modalVisible.value = true
}
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
