const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
const packageName = 'xt-materials'
// const packageName = require('./package.json').name;
const port = 10290
const prod = process.env.NODE_ENV === 'production'
const publicPath = prod ? '/xt-materials/' : '/'
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: publicPath,
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    filenameHashing: true,
    lintOnSave: false,
    runtimeCompiler: true,
    devServer: {
        port: port,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${packageName}`,
            libraryTarget: 'umd',
            clean: true,
            publicPath: '/'
        }
    }
})
