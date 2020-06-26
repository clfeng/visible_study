const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const makePlugins = (configs) => {
    const plugins = [
        new CleanWebpackPlugin()
    ];

    Object.keys(configs.entry).forEach(item => {
        let template = path.resolve(__dirname, `src/${item}/index.html`);
        plugins.push(
            new HtmlWebpackPlugin({
                template: template,
                filename: `${item}.html`,
                chunks: [item]
            })
        );
    });

    return plugins;
}
const configs = {
    mode: "development",
    entry: {
        canvas: './src/canvas/index.js',
        d3: './src/d3/index.js',
        svg: './src/svg/index.js',
        threejs: './src/threejs/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
}
configs.plugins = makePlugins(configs);




module.exports = configs;