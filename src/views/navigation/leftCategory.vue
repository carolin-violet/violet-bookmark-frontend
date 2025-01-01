<template>
  <div class="category-container">
    <a-space class="tree-container" direction="vertical">
      <Tool />
      <a-space>
        <a-input-search v-model="searchKey" />
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>添加分类</template>
        </a-button>
      </a-space>

      <a-tree
        :data="treeData"
        :field-names="{ title: 'name', key: 'id' }"
        :load-more="loadMore"
      >
        <template #title="nodeData">
          <span @click="handleSelect(nodeData)">{{ nodeData.name }}</span>
        </template>
        <template #extra="nodeData">
          <icon-edit
            style="
              position: absolute;
              right: 32px;
              font-size: 16px;
              top: 10px;
              color: #3370ff;
            "
            @click="handleEdit(nodeData)"
          />
          <a-popconfirm
            content="确认删除该导航？"
            type="warning"
            @ok="handleDelete(nodeData)"
          >
            <icon-delete
              style="
                position: absolute;
                right: 8px;
                font-size: 16px;
                top: 10px;
                color: #3370ff;
              "
            />
          </a-popconfirm>
        </template>
      </a-tree>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue';
  import { IconUser, IconUserGroup } from '@arco-design/web-vue/es/icon';
  import { ref, computed, onMounted, getCurrentInstance, h } from 'vue';
  import { getCategoryList, delCategory } from '@/api/category';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store';
  import type { Ref } from 'vue';
  import Tool from './components/Tool.vue';

  interface TreeNodeData {
    [key: string]: any;
  }

  const userStore = useUserStore();
  const { userRole } = userStore;

  const router = useRouter();
  const instance = getCurrentInstance();
  const searchKey: Ref<string> = ref('');

  // 原始数据
  const originTreeData: Ref<TreeNodeData[]> = ref([]);

  // 筛选数据
  const searchData = (keyword: string): TreeNodeData[] => {
    const loop = (data: TreeNodeData[]) => {
      const result: TreeNodeData[] = [];
      data.forEach((item) => {
        if (
          item.title &&
          item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        ) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };

    return loop(originTreeData.value);
  };

  // 返回给树组件的数据
  const treeData = computed(() => {
    if (!searchKey.value) return originTreeData.value;
    return searchData(searchKey.value);
  });

  const getData = () => {
    const params =
      userRole === 'admin'
        ? { parentId: -1, pageSize: 1000 }
        : { parentId: -1, openness: 0, pageSize: 1000 };
    getCategoryList(params).then((res) => {
      originTreeData.value = res.data.records.map((item) => ({
        ...item,
        icon: () => h(item.openness ? IconUserGroup : IconUser),
        isLeaf: false,
      }));
    });
  };

  // 动态加载数据
  const loadMore = (node: TreeNodeData): Promise<void> => {
    return new Promise((resolve) => {
      const params =
        userRole === 'admin'
          ? { pageSize: 1000, parentId: node.id as number }
          : {
              openness: 0,
              pageSize: 1000,
              parentId: node.id as number,
            };
      getCategoryList(params).then((res) => {
        node.children = res.data.records.map((item) => {
          const { icon, ...nodeItem } = item;
          return {
            ...nodeItem,
            isLeaf: true,
          };
        });
        resolve();
      });
    });
  };

  const handleSelect = (data: TreeNodeData): void => {
    // console.log('data', data)
    if (data.parentId !== -1) {
      instance?.proxy?.$Bus.emit('changeNavList', data);
    }
  };

  const handleEdit = (nodeData: TreeNodeData): void => {
    router.push({
      path: '/navigation/editCategory',
      query: {
        id: nodeData.id,
      },
    });
  };

  const handleDelete = (nodeData: TreeNodeData): void => {
    delCategory(nodeData.id as number).then(() => {
      Message.success({
        content: '删除成功!',
      });
      getData();
    });
  };

  const handleAdd = (): void => {
    router.push({
      path: '/navigation/addCategory',
    });
  };

  onMounted(() => {
    getData();
  });
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
      padding-left: 8px;
      padding-bottom: 0;
      background-color: var(--color-bg-2);
    }
  }
</style>
