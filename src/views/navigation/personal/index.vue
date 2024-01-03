<template>
  <a-layout>
    <a-layout-header>
      <a-space>
        <a-button type="primary" @click="handleImport">
          <template #icon>
            <icon-upload />
          </template>
          <template #default>导入数据</template>
        </a-button>
        <a-button type="primary" @click="handleExport">
          <template #icon>
            <icon-download />
          </template>
          <template #default>导出数据</template>
        </a-button>
        <a-link @click="toSite">
          <template #icon>
            <icon-launch />
          </template>
          导航站点
        </a-link>
      </a-space>
    </a-layout-header>
    <a-layout>
      <a-layout-sider :resize-directions="['right']" :width="300">
        <Category />
      </a-layout-sider>
      <a-layout-content>
        <Navigation />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
// import { saveAs } from 'file-saver';
import { exportData } from '@/api/file'
import Navigation from './nav/index.vue'
import Category from './category/index.vue'

const router = useRouter()

const toSite = () => {
  const routeData = router.resolve({
    path: '/preview'
  })
  window.open(routeData.href, '_blank')
}

const handleImport = () => {

}

const handleExport = () => {
  exportData().then((res) => {
    // saveAs(res, 'data.json')
  })
}
</script>
