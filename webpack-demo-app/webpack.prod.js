const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge')

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "main.[hash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./imgs/[name].[hash].[ext]",
    },
})

// __dirname => absolute path of currently executing file.