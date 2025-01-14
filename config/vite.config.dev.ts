import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {
        '/user-center-api': {
          target: 'http://127.0.0.1:8100',
          changeOrigin: true,
        },
        '/violet-bookmark': {
          target: 'http://127.0.0.1:8101', // 转到网关
          changeOrigin: true,
        },
        // '/violet-bookmark-core': {
        //   target: 'http://127.0.0.1:8102',
        //   changeOrigin: true,
        // },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
