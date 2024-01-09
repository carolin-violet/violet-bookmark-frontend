export default function useWaterFall() {
  // 每个小分类的宽度
  const categoryWith = 300;

  // 计算列数和间隙宽度
  const calc = (navWrapper) => {
    const columns = Math.floor(navWrapper.clientWidth / categoryWith);

    const gapCount = columns + 1;
    const leftSpace = navWrapper.clientWidth % categoryWith;
    const gapWidth = leftSpace / gapCount;

    return {
      columns,
      gapWidth,
    };
  };

  const setPosition = () => {
    const activeElList = document.querySelectorAll('.sub-category');
    const navWrapper = document.querySelector('.nav-wrapper');
    const { columns, gapWidth } = calc(navWrapper);

    const columnHeight = new Array(columns).fill(0);

    // 遍历每一个小分类，使其填充到最短列的下面
    for (let i = 0; i < activeElList.length; i += 1) {
      const subCategoryEl = activeElList[i];

      // 确定子分类模块与顶部的距离
      const top = Math.min(...columnHeight);
      subCategoryEl.style.top = `${top}px`;

      // 重新设置当前这一列的高度
      const index = columnHeight.indexOf(top);
      columnHeight[index] += subCategoryEl.clientHeight + gapWidth;

      // 确定子分类模块与左边的距离
      const left = (index + 1) * gapWidth + index * categoryWith;
      subCategoryEl.style.left = `${left}px`;
    }

    // 设置子分类模块容器的整体高度
    const height = Math.max(...columnHeight);
    navWrapper.style.height = `${height}px`;
  };

  // 监听页面缩放
  const timer = null;
  window.onresize = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(setPosition, 300);
  };

  return {
    setPosition,
  };
}
