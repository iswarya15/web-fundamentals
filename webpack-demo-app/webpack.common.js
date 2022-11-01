const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
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
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },

}


// /\.css$/ => (regex) end with .css