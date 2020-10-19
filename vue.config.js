const CompressionPlugin = require('compression-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')

module.exports = {
  publicPath: './',
  pages: {
    'index': {
      // page 的入口
      entry: './src/main.js',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'KHG Viewer'
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-tw',
      fallbackLocale: 'zh-tw',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    Default: '#FFFFFF',
    msTileColor: '#FFFFFF',
    themeColor: '#FFFFFF',
    name: 'KHG Viewer',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#FFFFFF',
      start_url: '/?source=pwa'
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('CompressionPlugin').use(new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
        minRatio: 0.8 // 压缩比
      }))

      // config.plugin('PreloadWebpackPlugin').use(
      //   new PreloadWebpackPlugin({
      //     rel: 'preload',
      //     as(entry) {
      //       if (/\.css$/.test(entry)) return 'style'
      //       if (/\.woff$/.test(entry)) return 'font'
      //       if (/\.png$/.test(entry)) return 'image'
      //       return 'script'
      //     }
      //   }))
    }
  }
}
