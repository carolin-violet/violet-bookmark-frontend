// // 图标懒加载
function useLazyLoadImg() {
  let container: HTMLElement;

  function lazyLoad() {
    const imgs: HTMLElement[] = Array.from(container.querySelectorAll('img'));
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 通过该属性判断元素是否出现在视口内
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          // 图片加载完成后解除监听
          imageObserver.unobserve(img);
        }
      });
    }, options);
    imgs.forEach((img) => {
      // 只有添加了data-src的img标签才监听
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }

  function loadImg(originalContainer: HTMLElement) {
    container = originalContainer;
    lazyLoad();
  }

  return { loadImg };
}

export default useLazyLoadImg;
