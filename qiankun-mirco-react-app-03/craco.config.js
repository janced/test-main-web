// craco.config.js (Final Recommended Version)

const { name } = require('./package.json');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 修改输出配置
      webpackConfig.output = {
        ...webpackConfig.output,
        library: 'reactApp', // 库名，与主应用注册的 name 一致
        libraryTarget: 'umd', // 输出为 UMD 格式
        uniqueName: name, // Webpack 5+，设置唯一的运行时名称，防止冲突
        globalObject: 'window', // 定义全局对象
      };

      return webpackConfig;
    },
  },

  devServer: (devServerConfig, { env, proxy, allowedHost }) => {
    // 设置 headers 允许跨域
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    
    // 确保路由能正确处理
    devServerConfig.historyApiFallback = true;

    // 关闭子应用自身的热更新和实时重新加载，交给 qiankun 处理，避免冲突
    devServerConfig.hot = false;
    devServerConfig.liveReload = false;

    // 兼容不同版本的 webpack-dev-server
    if (devServerConfig.static) {
      // 在较新版本的 webpack-dev-server 中，`watch` 选项在 `static` 内部
      devServerConfig.static.watch = false;
    } else {
      // 兼容旧版本
      devServerConfig.watchFiles = false;
    }

    return devServerConfig;
  },
};