module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,

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

    configureWebpack: config => {
        //在生产环境时去掉全部的console
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
    }
};
