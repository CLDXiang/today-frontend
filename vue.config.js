module.exports = {
  pwa: {
    name: 'fdxk.info',
    themeColor: '#7BC5CF',
    msTileColor: '#7BC5CF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   // swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // },
    manifestOptions: {
      short_name: 'fdxk',
      background_color: '#E3F1F3',
    },
  },
};
