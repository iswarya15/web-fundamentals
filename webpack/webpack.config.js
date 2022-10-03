module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        filename: "main.js",
        publicPath: "dist",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    }
}