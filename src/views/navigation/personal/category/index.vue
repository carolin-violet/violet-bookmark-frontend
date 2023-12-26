<template>
  <div class="category-container">
    <a-space class="tree-container" direction="vertical">
      <a-space>
        <a-input-search
          style="margin-bottom: 8px"
          v-model="searchKey"
        />
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>添加分类</template>
        </a-button>
      </a-space>

      <a-tree :data="treeData" :fieldNames="{ key: 'id' }" :load-more="loadMore" @select="handleSelect">
        <template #title="nodeData">{{ nodeData.name }}</template>
        <template #extra="nodeData">
          <icon-edit style="position: absolute; right: 24px; font-size: 12px; top: 10px; color: #3370ff;"  @click="handleEdit(nodeData)" />
          <icon-delete style="position: absolute; right: 8px; font-size: 12px; top: 10px; color: #3370ff;"  @click="handleDelete(nodeData)" />
        </template>
      </a-tree>
    </a-space>


    <info v-if="modalVisible" v-model:visible="modalVisible" :is-edit="false" :nav="curCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Ref } from 'vue'
import type { ICategoryListItem } from '@/api/category'
import type { INodeDataItem } from '../type'
import info from './info.vue'

const searchKey: Ref<string> = ref('')
const modalVisible: Ref<boolean> = ref(false)
const curCategory: Ref<ICategoryListItem> = ref({})

// 原始数据
const originTreeData: Ref<INodeDataItem[]> = ref([
  {
    name: '分类 0-0',
    id: '0-0',
  },
  {
    name: '分类 0-1',
    id: '0-1',
    children: [
      {
        name: '分类 0-1-1',
        id: '0-1-1'
      }
    ],
  },
])

// 筛选数据
const searchData = (keyword: string): INodeDataItem[] => {
  const loop = (data: INodeDataItem[]) => {
    const result: INodeDataItem[] = [];
    data.forEach(item => {
      if (item.name && item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result;
  }

  return loop(originTreeData.value);
}

// 返回给树组件的数据
const treeData = computed(() => {
  console.log('xxx', searchData(searchKey.value))
  if (!searchKey.value) return originTreeData.value;
  return searchData(searchKey.value);
})

// 动态加载数据
const loadMore = (nodeData: any): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nodeData.children = [
        { name: `leaf`, id: `${nodeData.key}-1`, isLeaf: true },
      ];
      resolve();
    }, 1000);
  });
};

const handleSelect = (selectedKeys: Array<string | number>, data: any): void => {
  console.log('nodeData', data)
}

const handleEdit = (nodeData: INodeDataItem): void => {
  console.log('xx', nodeData)
}
const handleDelete = (nodeData: INodeDataItem): void => {
  console.log('xx', nodeData)
}

const handleAdd = (): void => {

}
</script>
<style lang="less" scoped>
.category-container {
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  padding-bottom: 0;
  background-color: var(--color-fill-2);

  .tree-container {
    width: 100%;
    height: 100%;
    padding-top: 6px;
    padding-left: 3px;
    padding-bottom: 0;
    background-color: var(--color-bg-2);
  }
}
</style>
