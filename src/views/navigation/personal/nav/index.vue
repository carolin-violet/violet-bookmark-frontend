<template>
  <div class="navigation-container">

    <div class="navigation">
      <div class="top-panel">
        <a-button type="primary" @click="handleCreate">
          <template #icon>
            <icon-plus-circle />
          </template>
          <template #default>添加导航</template>
        </a-button>
      </div>

      <a-divider />

      <a-grid :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 5 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
        <a-grid-item class="demo-item" v-for="item in navList" :key="item.id">
          <a-link :href="item.url">
            <a-space>
              <!-- <a-image show-loader :src="`https://www.google.com/s2/favicons?domain=${item.url}`" alt="" width="14" height="14" /> -->
              <img :src="`https://www.google.com/s2/favicons?domain=${item.url}`" alt="" width="14" height="14" >
              <span :style="{ color: item.ladder ? 'red' : 'blue' }" :title="item.description">{{ item.name }}</span>
              <icon-edit @click.prevent="handleEdit(item)" />
              <a-popconfirm content="确认删除该导航？" type="warning" @ok="handleDelete(item)">
                <icon-delete @click.prevent />
              </a-popconfirm>
            </a-space>
          </a-link>
        </a-grid-item>
      </a-grid>

      <a-pagination :total="total" show-total show-page-size @change="handlePageChange" @page-size-change="handlePageSizeChange"/>
    </div>

    <info v-if="modalVisible" v-model:visible="modalVisible" :is-edit="isEdit" :nav="curNav" :cat_id="params.cat_id!" @updateNavigation="updateNavigation"/>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref, onMounted, getCurrentInstance } from 'vue';
import type { Ref } from 'vue'
import type { INavListItem, Navigation, NavigationParam } from '@/api/navigation'
import { getNavigationList, delNavigation } from '@/api/navigation';
import useLoading from '@/hooks/loading';
import info from './info.vue'

const instance = getCurrentInstance();
const { loading, setLoading } = useLoading(true);
const navList: Ref<Navigation[]> = ref([])

const modalVisible: Ref<boolean> = ref(false)
const curNav: Ref<INavListItem> = ref({})
const params: Ref<NavigationParam> = ref({
  pageNum: 1,
  pageSize: 10,
  name: '',
  cat_id: ''
})
const total: Ref<number> = ref(0)
const isEdit = ref<boolean>(false)

const getDataList = () => {
  setLoading(true);
  getNavigationList(params.value).then(res => {
    navList.value = res.data.list
    total.value = res.data.total
  }).finally(() => {
    setLoading(false);
  })
}

const updateNavigation = () => {
  getDataList()
}

const handleCreate = () => {
  isEdit.value = false
  curNav.value = {}
  modalVisible.value = true
}

const handleEdit = (nav: INavListItem) => {
  isEdit.value = true
  curNav.value = nav
  modalVisible.value = true
}

const handleDelete = (nav: Navigation) => {
  setLoading(true);
  delNavigation(nav.id)
    .then(() => {
      Message.success({
        content: '删除成功!'
      })
      getDataList()
    })
    .finally(() => {
      setLoading(false);
    })
}

const handlePageChange = (page: number) => {
  params.value.pageNum = page
  getDataList()
}

const handlePageSizeChange = (pageSize: number) => {
  params.value.pageSize = pageSize
  getDataList()
}

const handler = (categoryId: string) => {
  params.value.cat_id = categoryId
  getDataList()
}

instance?.proxy?.$Bus.on('changeNavList', handler as any);

onMounted(() => {
  getDataList()
})
</script>

<style lang="less" scoped>
.navigation-container {
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
