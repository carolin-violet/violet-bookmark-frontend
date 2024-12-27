// 1. 引入 mitt，是一个函数
import mitt from 'mitt';
import { createApp } from 'vue';
import ArcoVue, { Icon } from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

// 2. 调用 mitt
const Mit = mitt();

// 3. TypeScript注册
// 由于必须要拓展 ComponentCustomProperties 类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit;
  }
}
app.config.globalProperties.$Bus = Mit;

const IconFont = Icon.addFromIconFontCn({
  src: 'https://at.alicdn.com/t/c/font_4430049_nq8wfa6j1hl.js',
});
app.component('IconFont', IconFont);

app.mount('#app');
