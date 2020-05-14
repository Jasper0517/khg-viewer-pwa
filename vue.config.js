module.exports = {
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
  }
}
