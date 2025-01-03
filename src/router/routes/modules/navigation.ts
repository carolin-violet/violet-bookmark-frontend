import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/navigation',
  name: 'PersonalNavigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation',
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'list',
      name: 'PersonalNavigationList',
      component: () => import('@/views/navigation/index.vue'),
      meta: {
        locale: 'menu.navigation.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addCategory',
      name: 'PersonalNavigationAddCategory',
      component: () => import('@/views/navigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editCategory',
      name: 'PersonalNavigationEditCategory',
      component: () => import('@/views/navigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addNavigation',
      name: 'PersonalNavigationAddNavigation',
      component: () => import('@/views/navigation/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editNavigation',
      name: 'PersonalNavigationEditNavigation',
      component: () => import('@/views/navigation/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'share',
      name: 'ShareNavigationList',
      component: () => import('@/views/navigation/share/index.vue'),
      meta: {
        locale: 'menu.navigation.share.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
