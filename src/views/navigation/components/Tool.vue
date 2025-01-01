<template>
  <div>
    <a-space
      style="width: 100%; height: 100%; padding: 8px; background-color: white"
      size="large"
    >
      <a-upload :custom-request="customRequest">
        <template #upload-button>
          <a-button type="primary">
            <template #icon>
              <icon-upload />
            </template>
            <template #default>导入数据</template>
          </a-button>
        </template>
      </a-upload>
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
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  // import FileSaver from 'file-saver'
  import save from '@/utils/save';
  import { exportData, importData, source } from '@/api/file';

  const router = useRouter();

  const toSite = () => {
    const routeData = router.resolve({
      path: '/navigation-preview',
    });
    window.open(routeData.href, '_blank');
  };

  const handleExport = () => {
    exportData().then((res: any) => {
      // FileSaver.saveAs(res, 'data.json')
      const json = JSON.stringify({ data: res.data });
      save(json, 'data.json', 'application/json');
    });
  };

  const customRequest = (option: any) => {
    const { onProgress, onError, onSuccess, fileItem } = option;

    function onprogress(event: any) {
      // let percent;
      // if (event.total > 0) {
      //   // 0 ~ 1
      //   percent = event.loaded / event.total;
      // }
      // onProgress(percent, event);
    }

    const formData = new FormData();
    formData.append('file', fileItem.file);

    importData(formData, onprogress)
      .then((res) => {
        console.log('res', res);
        onSuccess(res);
      })
      .catch((err) => {
        console.log('err', err);
        onError(err);
      });

    return {
      abort() {
        source.cancel();
      },
    };
  };
</script>

<!-- <style lang="less" scoped>
</style> -->
