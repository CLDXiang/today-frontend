/* eslint-disable */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|css|html|txt|js|json)$/,
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
