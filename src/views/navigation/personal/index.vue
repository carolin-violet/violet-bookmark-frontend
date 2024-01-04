<template>
  <a-layout>
    <a-layout-sider :width="300">
      <a-space direction="vertical">
        <a-upload :custom-request="customRequest" />
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
    </a-layout-sider>
    <a-layout-sider :resize-directions="['right']" :width="300">
      <Category />
    </a-layout-sider>
    <a-layout-content>
      <Navigation />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
// import { saveAs } from 'file-saver';
import { exportData, importData, source } from '@/api/file'
import Navigation from './nav/index.vue'
import Category from './category/index.vue'

const router = useRouter()

const toSite = () => {
  const routeData = router.resolve({
    path: '/preview'
  })
  window.open(routeData.href, '_blank')
}

const handleExport = () => {
  exportData().then((res) => {
    // saveAs(res, 'data.json')
  })
}

const customRequest = (option: any) => {
  const { onProgress, onError, onSuccess, fileItem } = option

  function onprogress(event: any) {
    // let percent;
    // if (event.total > 0) {
    //   // 0 ~ 1
    //   percent = event.loaded / event.total;
    // }
    // onProgress(percent, event);
  };

  const formData = new FormData();
  formData.append('file', fileItem.file);

  importData(formData, onprogress).then(res => {
    console.log('res', res)
    onSuccess(res)
  }).catch(err => {
    console.log('err', err)
    onError(err)
  })

  return {
    abort() {
      source.cancel()
    }
  }
};
</script>
