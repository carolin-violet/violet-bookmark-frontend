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
          <a-popconfirm content="确认删除该导航？" type="warning" @ok="handleDelete(nodeData)">
            <icon-delete style="position: absolute; right: 8px; font-size: 12px; top: 10px; color: #3370ff;" />
          </a-popconfirm>
        </template>
      </a-tree>
    </a-space>


    <info v-if="modalVisible" v-model:visible="modalVisible" :is-edit="isEdit" :category="curCategory" :option="option" @updateCategory="updateCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { getCategoryList, delCategory } from '@/api/category';
import type { Ref, ComputedRef } from 'vue'
import type { ICategoryListItem, CategoryOption } from '@/api/category'
import info from './info.vue'

const instance = getCurrentInstance();
const searchKey: Ref<string> = ref('')
const modalVisible: Ref<boolean> = ref(false)
const curCategory: Ref<ICategoryListItem> = ref({})
const isEdit = ref<boolean>(false)

// 原始数据
const originTreeData: Ref<ICategoryListItem[]> = ref([])

// 筛选数据
const searchData = (keyword: string): ICategoryListItem[] => {
  const loop = (data: ICategoryListItem[]) => {
    const result: ICategoryListItem[] = [];
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
  if (!searchKey.value) return originTreeData.value;
  return searchData(searchKey.value);
})

const option: ComputedRef<CategoryOption[]> = computed(() => {
  const temp = originTreeData.value.map(({ id, name }) => ({ id, name }))
  return temp.concat([{ id: '-1', name: '无' }])
})

const getData = () => {
  getCategoryList('-1').then(res => {
    originTreeData.value = res.data
  })
}

// 动态加载数据
const loadMore = (nodeData: ICategoryListItem): Promise<void> => {
  return new Promise((resolve) => {
    getCategoryList(nodeData.id!).then((res) => {
      nodeData.children = res.data.map((item: ICategoryListItem) => {
        item.isLeaf = true
        return item
      })
      resolve()
    })
  });
};

const updateCategory = () => {
  getData()
}

const handleSelect = (selectedKeys: Array<string | number>, data: any): void => {
  // console.log('nodeData', data, data.node.id)
  instance?.proxy?.$Bus.emit('changeNavList', data.node.id)
}

const handleEdit = (nodeData: ICategoryListItem): void => {
  isEdit.value = true
  curCategory.value = nodeData
  modalVisible.value = true
}
const handleDelete = (nodeData: ICategoryListItem): void => {
  delCategory(nodeData.id!)
    .then(() => {
      Message.success({
        content: '删除成功!'
      })
      getData()
    })
}

const handleAdd = (): void => {
  isEdit.value = false
  curCategory.value = {}
  modalVisible.value = true
}

onMounted(() => {
  getData()
})
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
