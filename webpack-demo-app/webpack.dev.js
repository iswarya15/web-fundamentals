const path = require('path');
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
    }

})

// __dirname => absolute path of currently executing file.