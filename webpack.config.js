const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require.resolve("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/assets", to: "" },
                { from: "public/template", to: "www" },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};