import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: false,
  register: true,
  runtimeCaching: [
    {
      urlPattern: '/',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'start-url',
      },
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'dev',
      },
    },
  ],
  workboxOptions: {
    // ログを無効化
    disableDevLogs: true,
  },
});

const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
};

export default withPWA(nextConfig);
