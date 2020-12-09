/* eslint-disable camelcase */
module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const newArgs = [...args];
      newArgs[0].title = 'fdxk.info';
      return newArgs;
    });
  },
  pwa: {
    name: 'fdxk.info',
    themeColor: '#60BDCA',
    msTileColor: '#60BDCA',
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
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#60BDCA',
            'link-color': '#60BDCA',
            'error-color': '#EF755A',
          },
          javascriptEnabled: true,
        },
      },
      scss: {
        prependData: '@import "~@/scss/common.scss";',
      },
    },
  },
};
