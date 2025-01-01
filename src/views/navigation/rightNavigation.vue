<template>
  <div class="navigation-container">
    <a-layout class="navigation-layout">
      <a-layout-header>
        <div class="top-panel">
          <a-button
            type="primary"
            :disabled="!ifSelectCategory"
            @click="handleCreate"
          >
            <template #icon>
              <icon-plus-circle />
            </template>
            <template #default>添加导航</template>
          </a-button>
          <span style="margin-left: 20px">
            {{
              ifSelectCategory
                ? `当前选中分类：${currentCategory?.name}`
                : '请选择一个二级分类'
            }}</span
          >
        </div>

        <a-divider />
      </a-layout-header>
      <a-layout-content>
        <a-row :gutter="[20, 12]" class="navigation-list">
          <a-col
            v-for="item in navList"
            :key="item.id"
            class="navigation-item"
            flex="200px"
          >
            <a-link :href="item.url" @click.prevent>
              <div class="link">
                <div class="left" @click="open(item.url)">
                  <img
                    class="navigation-icon"
                    :src="`https://www.google.com/s2/favicons?domain=${item.url}`"
                    alt=""
                    width="16"
                    height="16"
                  />
                  <span
                    class="navigation-name"
                    :style="{ color: item.ladder ? 'red' : 'blue' }"
                    :title="item.description"
                    >{{ item.name }}</span
                  >
                </div>
                <div class="right">
                  <icon-edit
                    style="margin-right: 4px"
                    @click.prevent="handleEdit(item)"
                  />
                  <icon-share-internal
                    style="margin-right: 4px"
                    @click.prevent="handleTransfer(item)"
                  />
                  <a-popconfirm
                    content="确认删除该导航？"
                    type="warning"
                    @ok="handleDelete(item)"
                  >
                    <icon-delete @click.prevent />
                  </a-popconfirm>
                </div>
              </div>
            </a-link>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer>
        <a-pagination
          :total="total"
          show-total
          show-page-size
          @change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </a-layout-footer>
    </a-layout>

    <Transfer
      v-if="dialogVisible"
      v-model="dialogVisible"
      :website-id="websiteId"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue';
  import { ref, getCurrentInstance, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getNavigationList, delNavigation } from '@/api/navigation';
  import useLoading from '@/hooks/loading';

  import type { Ref } from 'vue';
  import type { Navigation, NavigationParam } from '@/api/navigation';
  import type { TreeCategoryNode } from '@/api/category';
  import Transfer from './components/Transfer.vue';

  const router = useRouter();
  const instance = getCurrentInstance();
  const { loading, setLoading } = useLoading(true);
  const navList: Ref<Navigation[]> = ref([]);

  const currentCategory = ref<Partial<TreeCategoryNode>>({});
  const params: Ref<Partial<NavigationParam>> = ref({
    pageNum: 1,
    pageSize: 10,
    name: '',
  });
  const total: Ref<number> = ref(0);

  const ifSelectCategory = computed(() => {
    const { parentId, id } = currentCategory.value || {};
    return Number(parentId) !== -1 && id;
  });

  const getDataList = () => {
    setLoading(true);
    getNavigationList({
      ...params.value,
      categoryId: currentCategory.value?.id,
    })
      .then((res) => {
        navList.value = res.data.records;
        total.value = Number(res.data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreate = () => {
    router.push({
      path: '/navigation/addNavigation',
      query: {
        categoryId: currentCategory.value.id,
      },
    });
  };

  const handleEdit = (nav: Navigation) => {
    router.push({
      path: '/navigation/editNavigation',
      query: {
        id: nav.id,
        categoryId: currentCategory.value.id,
      },
    });
  };

  const handleDelete = (nav: Navigation) => {
    setLoading(true);
    delNavigation(nav.id)
      .then(() => {
        Message.success({
          content: '删除成功!',
        });
        getDataList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (page: number) => {
    params.value.pageNum = page;
    getDataList();
  };

  const handlePageSizeChange = (pageSize: number) => {
    params.value.pageSize = pageSize;
    getDataList();
  };

  const open = (url: string) => {
    window.open(url, '_blank');
  };

  const handler = (data: TreeCategoryNode) => {
    currentCategory.value = data;
    getDataList();
  };

  instance?.proxy?.$Bus.on('changeNavList', handler as any);
  instance?.proxy?.$Bus.on('transferSuccess', getDataList);

  const dialogVisible = ref<boolean>(false);
  const websiteId = ref<number>(undefined!);
  const handleTransfer = (nav: Navigation) => {
    websiteId.value = nav.id;
    dialogVisible.value = true;
  };
</script>

<style lang="less" scoped>
  .navigation-container {
    padding: 16px 20px;
    padding-bottom: 0;
    height: 100%;
    background-color: var(--color-fill-2);

    .navigation-layout {
      padding: 16px 20px;
      padding-bottom: 0;
      height: 100%;
      background-color: var(--color-bg-2);
      .navigation-list {
        .navigation-item {
          .link {
            width: 240px;
            display: flex;
            align-items: center;
            column-gap: 8px;
            .left {
              width: 150px;
              display: flex;
              align-items: center;
              column-gap: 6px;
              .navigation-icon {
                width: 16px;
              }
              .navigation-name {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .right {
              flex: 1;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
