import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DIARY: AppRouteRecordRaw = {
  path: '/diary',
  name: 'Diary',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.diary',
    requiresAuth: true,
    icon: 'icon-share-alt',
    order: 3,
  },
  children: [
    {
      path: 'list',
      name: 'DiaryList',
      component: () => import('@/views/diary/index.vue'),
      meta: {
        locale: 'menu.diary.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'analysis',
      name: 'DiaryAnalysis',
      component: () => import('@/views/diary/index.vue'),
      meta: {
        locale: 'menu.diary.analysis',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DIARY;
