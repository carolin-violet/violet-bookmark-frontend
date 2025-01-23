<template>
  <div class="tool-container">
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
    <a-button type="primary" @click="handleAdd">
      <template #icon>
        <icon-plus-circle />
      </template>
      <template #default>添加分类</template>
    </a-button>
    <a-link @click="toSite">
      <template #icon>
        <icon-launch />
      </template>
      导航站点
    </a-link>
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
      path: '/website-preview',
    });
    window.open(routeData.href, '_blank');
  };

  const handleAdd = (): void => {
    router.push({
      path: '/website/addCategory',
    });
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

<style lang="less" scoped>
  .tool-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 110px);
    grid-template-rows: repeat(2, 32px);
    gap: 16px;
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-sm) {
    .tool-container {
      grid-template-columns: 110px;
      grid-template-rows: repeat(4, 32px);
    }
  }
</style>
