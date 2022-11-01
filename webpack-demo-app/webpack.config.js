const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", //3. injects styles to DOM
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader"] //1.  Turns sass into css
            }
        ]
    },

}






// __dirname => absolute path of currently executing file.

// /\.css$/ => (regex) end with .css