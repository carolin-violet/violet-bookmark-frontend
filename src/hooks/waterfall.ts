// 分类模块的瀑布流布局
import { onBeforeUnmount } from 'vue';

/**
 *
 * @param container 瀑布流容器
 * @param width 每一个瀑布流元素的宽度
 */

function useWaterfall(originalContainer: HTMLElement, width: number) {
  let container: HTMLElement = originalContainer;
  let itemList: HTMLElement[];

  let timer: number = null!;

  const setContainer = (newContainer: HTMLElement) => {
    container = newContainer;
  };

  // 计算列数和间隙宽度
  const calc = () => {
    const columns = Math.floor(container.clientWidth / width);

    const gapCount = columns + 1;
    const leftSpace = container.clientWidth % width;
    const gapWidth = leftSpace / gapCount;

    return {
      columns,
      gapWidth,
    };
  };

  // 设置瀑布流元素的位置
  const setPosition = () => {
    console.log('container', container);
    if (!container) return;
    itemList = Array.from(container.children) as HTMLElement[];
    container.style.position = 'relative';
    const { columns, gapWidth } = calc();

    const columnHeight = new Array(columns).fill(0);

    // 遍历每一个元素，使其填充到最短列的下面
    for (let i = 0; i < itemList.length; i += 1) {
      const item: HTMLElement = itemList[i];
      console.log('item', item);

      item.style.width = `${width}px`;

      // 确定子分类模块与顶部的距离
      const top = Math.min(...columnHeight);
      item.style.top = `${top}px`;

      // 重新设置当前这一列的高度
      const index = columnHeight.indexOf(top);
      columnHeight[index] += item.clientHeight + gapWidth;

      // 确定子分类模块与左边的距离
      const left = (index + 1) * gapWidth + index * width;
      item.style.left = `${left}px`;

      item.style.position = 'absolute';
    }

    // 设置子分类模块容器的整体高度
    const height = Math.max(...columnHeight);
    container.style.height = `${height}px`;
  };

  // 监听页面缩放
  const handleResize = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(setPosition, 300);
  };

  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(timer);
    timer = null!;
  });

  return {
    setContainer,
    setPosition,
  };
}

export default useWaterfall;
