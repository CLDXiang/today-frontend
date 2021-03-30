/* eslint-disable */

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|txt|json)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fdxk',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 240,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /\.(?:js|html|css)$/,
  workbox.strategies.networkFirst({
    cacheName: 'fdxk-bundle',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 240,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
