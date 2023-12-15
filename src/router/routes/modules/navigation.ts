import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/navigation',
  name: 'navigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation',
    requiresAuth: true,
    icon: 'icon-nav',
    order: 0,
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/navigation/list/index.vue'),
      meta: {
        locale: 'menu.navigation.list',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'personal',
      name: 'personal',
      component: () => import('@/views/navigation/personal/index.vue'),
      meta: {
        locale: 'menu.navigation.personal',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
