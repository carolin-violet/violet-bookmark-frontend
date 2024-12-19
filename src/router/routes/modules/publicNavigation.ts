import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/public-navigation',
  name: 'PublicNavigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation.public',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'PublicNavigationList',
      component: () => import('@/views/publicNavigation/index.vue'),
      meta: {
        locale: 'menu.navigation.public.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'category/add',
      name: 'PublicNavigationAddCategory',
      component: () => import('@/views/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'category/edit',
      name: 'PublicNavigationEditCategory',
      component: () => import('@/views/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'navigation/add',
      name: 'PublicNavigationAddNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'navigation/edit',
      name: 'PublicNavigationEditNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
