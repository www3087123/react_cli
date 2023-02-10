const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); //激活js的HMR功能插件
module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        // 处理css兼容性问题
                        // 配合package.json中的 browserslist来指定兼容性
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env"
                                ]
                            }
                        }
                    }
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        // 处理css兼容性问题
                        // 配合package.json中的 browserslist来指定兼容性
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env"
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|svg|gif|webp)/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                }
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource"
            },
            // 处理js
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "../src"),
                options: { 
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: ["react-refresh/babel"] //激活js 的HMR功能
                },
               
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache")
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new ReactRefreshWebpackPlugin()//激活js 的HMR功能

    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        }
    },
    // webpack 解析模块加载选型
    resolve: {
        // 自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"]
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true, //解决前端路由刷新404问题
    }
}