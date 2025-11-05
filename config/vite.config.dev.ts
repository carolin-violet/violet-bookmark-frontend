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
        '/api/user-center': {
          target: 'http://127.0.0.1:8200',
          changeOrigin: true,
        },
        // 转到网关
        // '/violet-bookmark': {
        //   target: 'http://127.0.0.1:8101',
        //   changeOrigin: true,
        // },
        // 直接转到core
        '/api/bookmark': {
          target: 'http://127.0.0.1:8202',
          changeOrigin: true,
          // rewrite: (path) => path.replace('/api/bookmark', ''),
        },
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
