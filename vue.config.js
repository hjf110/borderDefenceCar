module.exports = {
    publicPath: './',
    assetsDir: 'static',
    devServer: {
        port: 10015, //开发环境端口号
        https: false //传输协议
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    //关闭格式检查
    lintOnSave: false,
    //打包时不会生成  .map  文件,加快打包速度
    productionSourceMap: false,
    //在生产环境时去掉全部的console
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
    }
};
