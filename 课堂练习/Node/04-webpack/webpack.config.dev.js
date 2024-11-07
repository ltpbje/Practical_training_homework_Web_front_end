// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const chalk = require('chalk');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { type } = require('os');
const config = {
    // mode设置webpack基于开发或者生产环境打包
    mode: 'development',
    // entry 入口
    //entry设置webpack的入口文件路径
    entry: {
        index: './js/index.js',
        login: "./js/login.js"
    },
    // output设置webpack打包之后生成的新文件的文件名和保存路径  出口
    output: {
        filename: 'js/[name].[fullhash:8].js',
        path: path.join(__dirname, './dist'),
        clean: true
    },
    // module在打包过程 根据你自己的需求载入 webpack的第三方模块  对打包过程添加规则
    module: {
        //rules是一个webpack的规则数组，数组中的每一个元素就是一条规则  每一条规则就是一个匿名的配置对象
        rules: [
            //创建一条规则，这条规则适用于所有的JS文件
            {
                test: /\.js$/, //匹配所有的JS文件
                exclude: /node_modules/, //把node_modules目录中的js文件排除在babel的转换以外
                loader: "babel-loader",//把当前规则所匹配的JS文件在打包过程中需要进入到babel中进行处理
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    // {
                    //     loader: 'sass-loader'
                    // }
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|bmp|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "img/",
                            esModule: false,
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: "fonts/",
                            esModule: false,
                            publicPath: '../fonts',
                            limit: 8 * 1024 //把小于8KB的图片转换成base64格式
                        }
                    },
                ],
                type: 'javascript/auto'
            }
        ],

    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './login.html'),
            //生成的新文件名称
            filename: 'login.html',
            //生成的js和css自动插入
            inject: true,
            //指定要插入的chunk
            chunks: ["login"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, './static'),
                    to: path.join(__dirname, './dist/static'),
                }
            ]
        }),
        new CleanWebpackPlugin(),
        // 创建一个ProgressBarWebpackPlugin实例，设置进度条的格式为绿色文字“进度:”，白色文字“[:bar]”，绿色文字“:percent”，并且不清除进度条
        new ProgressBarWebpackPlugin({
            format: chalk.green('进度:') + chalk.white("[:bar]") + chalk.green(':percent'),
            clear: false
        })
    ],
    // 配置开发服务器
    devServer: {
        // 设置端口号为8088
        port: 8088,
        // 允许所有主机访问
        allowedHosts: '*',
        // 配置静态文件目录
        static: {
            // 静态文件目录为当前目录下的static文件夹
            directory: path.join(__dirname, './static')
        },
        // 配置客户端
        client: {
            // 显示错误信息
            overlay: true,
            // 显示编译进度
            progress: true,
        },
        // 监听文件变化
        watchFiles: [
            // 监听index.html文件变化
            "./index.html",
            // 监听login.html文件变化
            './login.html',
        ],
        // 启用热更新
        hot: true
    }
};


module.exports = config;
