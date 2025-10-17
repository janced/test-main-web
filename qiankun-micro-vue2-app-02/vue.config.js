// const { defineConfig } = require('@vue/cli-service')
const { name } = require("./package");

module.exports = {
  devServer: {
    port: 8082,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}` // 定义全局变量名，用于加载异步 chunk。此配置是webpack5的配置，webpack4的配置是jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
