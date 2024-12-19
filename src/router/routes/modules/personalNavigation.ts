import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/personal-navigation',
  name: 'PersonalNavigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation.personal',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'PersonalNavigationList',
      component: () => import('@/views/personalNavigation/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'category/add',
      name: 'PersonalNavigationAddCategory',
      component: () => import('@/views/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'category/edit',
      name: 'PersonalNavigationEditCategory',
      component: () => import('@/views/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'navigation/add',
      name: 'PersonalNavigationAddNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'navigation/edit',
      name: 'PersonalNavigationEditNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
