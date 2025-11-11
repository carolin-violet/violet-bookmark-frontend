<template>
  <div class="word-cloud-container">
    <canvas ref="canvasRef" class="word-cloud-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
  import { getDashboardWordCloud } from '@/api/analyze';
  import WordCloud from 'wordcloud';
  import type { DashboardWordCloudItem } from '@/api/analyze';

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const wordList = ref<Array<DashboardWordCloudItem>>([]);
  const loading = ref(false);

  const generateWordCloud = async (retrySize?: number) => {
    if (!canvasRef.value) {
      return;
    }

    // 如果数据为空，不生成词云
    if (!wordList.value || wordList.value.length === 0) {
      return;
    }

    try {
      // 获取容器尺寸
      const container = canvasRef.value.parentElement;
      if (!container) {
        return;
      }

      // 获取容器的实际尺寸
      const containerWidth = container.clientWidth || 1200;
      const containerHeight = container.clientHeight || 800;

      if (containerWidth === 0 || containerHeight === 0) {
        return;
      }

      // 设置 canvas 实际尺寸，使用容器的完整尺寸
      canvasRef.value.width = containerWidth;
      canvasRef.value.height = containerHeight;

      // 清除 canvas 背景，确保完全透明
      const ctx = canvasRef.value.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, containerWidth, containerHeight);
      }

      // 根据容器尺寸计算合适的参数，让词云填满空间
      const gridSize = Math.max(
        8,
        Math.min(20, Math.round(containerWidth / 80))
      );
      const weightFactor = (size: number) => {
        // 根据容器尺寸调整权重因子，让文字更大，填满空间
        const factor = Math.max(6, containerWidth / 150);
        return size * factor;
      };

      WordCloud(canvasRef.value, {
        list: wordList.value,
        gridSize,
        weightFactor,
        fontFamily: 'Arial, sans-serif',
        color: (word: string, weight: number) => {
          // 使用柔和的渐变色方案，避免使用蓝色
          if (weight > 20) {
            return '#FF7D00'; // 橙色
          }
          if (weight > 15) {
            return '#00B42A'; // 绿色
          }
          if (weight > 10) {
            return '#722ED1'; // 紫色
          }
          if (weight > 5) {
            return '#F53F3F'; // 红色
          }
          return '#86909C'; // 灰色
        },
        backgroundColor: 'transparent',
        rotateRatio: 0.3,
        rotationSteps: 2,
        // 不设置 shape，让文字自由排列，避免出现蓝色区域
        minSize: 8,
        drawOutOfBound: false,
        shrinkToFit: true, // 让库自动缩小已放置的词以腾出空间
      });
    } catch (error) {
      // 如果是内存溢出错误，尝试使用更小的尺寸重试
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const isMemoryError =
        error instanceof RangeError ||
        errorMessage.includes('Out of memory') ||
        errorMessage.includes('getImageData');

      if (isMemoryError && !retrySize) {
        // 使用更小的尺寸重试（800x800）
        setTimeout(() => {
          generateWordCloud(800);
        }, 100);
        return;
      }

      // 如果重试后仍然失败，尝试使用更小的尺寸（600x600）
      if (isMemoryError && retrySize === 800) {
        setTimeout(() => {
          generateWordCloud(600);
        }, 100);
        return;
      }

      // 如果重试后仍然失败，或者不是内存错误，显示错误提示
      if (canvasRef.value) {
        const ctx = canvasRef.value.getContext('2d');
        if (ctx) {
          const { width: canvasWidth, height: canvasHeight } = canvasRef.value;
          const displayWidth = canvasWidth || 800;
          const displayHeight = canvasHeight || 600;
          ctx.fillStyle = '#8c8c8c';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            'Failed to load word cloud',
            displayWidth / 2,
            displayHeight / 2
          );
        }
      }
    }
  };

  const handleResize = () => {
    nextTick(() => {
      generateWordCloud();
    });
  };

  // 监听数据变化，当数据加载完成后生成词云
  watch(
    wordList,
    () => {
      if (wordList.value && wordList.value.length > 0) {
        nextTick(() => {
          generateWordCloud();
        });
      }
    },
    { deep: true }
  );

  onMounted(async () => {
    try {
      loading.value = true;
      // 获取词云数据
      const res = await getDashboardWordCloud();

      // 确保数据格式正确
      if (res && res.data) {
        const { data } = res;
        // 验证数据格式：应该是 [string, number][] 的数组
        if (Array.isArray(data) && data.length > 0) {
          // 验证每个元素是否是 [string, number] 格式
          const isValid = data.every(
            (item) =>
              Array.isArray(item) &&
              item.length === 2 &&
              typeof item[0] === 'string' &&
              typeof item[1] === 'number'
          );
          if (isValid) {
            wordList.value = data;
          } else {
            wordList.value = [];
          }
        } else {
          wordList.value = [];
        }
      } else {
        wordList.value = [];
      }
    } catch (error) {
      wordList.value = [];
    } finally {
      loading.value = false;
    }

    // 等待 DOM 更新和容器尺寸计算完成后再生成词云
    await nextTick();
    // 使用 setTimeout 确保容器已经有尺寸
    setTimeout(() => {
      if (wordList.value && wordList.value.length > 0 && canvasRef.value) {
        const container = canvasRef.value.parentElement;
        if (
          container &&
          container.clientWidth > 0 &&
          container.clientHeight > 0
        ) {
          generateWordCloud();
        } else {
          // 如果容器尺寸为 0，等待一段时间后重试
          setTimeout(() => {
            generateWordCloud();
          }, 100);
        }
      }
    }, 100);

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<style lang="less" scoped>
  .word-cloud-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
  }

  .word-cloud-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
