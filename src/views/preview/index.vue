<template>
  <div class="preview-container">ttttttt</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { exportData } from '@/api/file'

const navData = ref([])

const getData = () => {
  exportData().then((res: any) => {
    navData.value = res.data
  })
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.preview-container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/bg/1080p.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

@media screen and (max-width: 2560px) {
  .preview-container {
    background-image: url('@/assets/images/bg/2k.webp');
  }
}

@media screen and (max-width: 1920px) {
  .preview-container {
    background-image: url('@/assets/images/bg/1080p.webp');
  }
}

@media screen and (max-width: 1200px) {
  .preview-container {
    background-image: url('@/assets/images/bg/ipad2020.webp');
  }
}

@media screen and (max-width: 768px) {
  .preview-container {
    background-image: url('@/assets/images/bg/mobile.webp');
  }
}
</style>
