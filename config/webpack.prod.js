const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin") //检查代码规范
const HtmlWebpackPlugin = require("html-webpack-plugin") //自动引入html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //单独打包css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩css
const TerserPlugin = require("terser-webpack-plugin");//压缩js
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }), // css单独打包

    ],
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups:{
                react:{
                    test:/[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name:"chunk-react",
                    priority:40
                },
                antd:{
                    test:/[\\/]node_modules[\\/]antd(.*)?[\\/]/,
                    name:"chunk-antd",
                    priority:30
                },
                lib:{
                    test:/[\\/]node_modules[\\/]/,
                    name:"chunk-libs",
                    priority:20
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        },
        minimizer: [
            new CssMinimizerPlugin(), //压缩css
            new TerserPlugin() //压缩js
        ]
    },
    // webpack 解析模块加载选型
    resolve: {
        // 自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"]
    },
    mode: "production",
    performance:false,//关闭打包性能分析,提升打包速度
}