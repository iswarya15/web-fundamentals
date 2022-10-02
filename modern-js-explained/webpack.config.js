var path = require('path')
module.exports = {
    target: "web",
    mode: "development",
    entry: './index.js',
    output: {
        filename: 'main.js',
        publicPath: 'dist',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        },
        compress: true,
        port: 9000,
        devMiddleware: {
            writeToDisk: true
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

}