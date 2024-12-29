// // 图标懒加载
import { onBeforeUnmount } from 'vue';

function useHidden() {
  let container: HTMLElement;
  let itemList: HTMLElement[];
  let Observer: IntersectionObserver;

  function lazyLoad() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 通过该属性判断元素是否出现在视口内
        const item = entry.target;
        if (entry.isIntersecting) {
          // item.classList.remove('hidden');
          item.classList.add('animate__zoomIn');
        } else {
          // item.classList.add('hidden');
          item.classList.remove('animate__zoomIn');
        }
      });
    }, options);
    itemList.forEach((item) => {
      Observer.observe(item);
    });
  }

  function init(originalContainer: HTMLElement) {
    container = originalContainer;
    itemList = Array.from(container.children) as HTMLElement[];
    lazyLoad();
  }

  onBeforeUnmount(() => {
    itemList.forEach((item) => {
      Observer.unobserve(item);
    });
  });

  return { init };
}

export default useHidden;
