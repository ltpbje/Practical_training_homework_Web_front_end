// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    // mode设置webpack基于开发或者生产环境打包
    mode: 'development',
    // entry 入口
    //entry设置webpack的入口文件路径
    entry: path.join(__dirname, './js/index.js'),
    // output设置webpack打包之后生成的新文件的文件名和保存路径  出口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist'),
        publicPath: './'
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
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [
        new HtmlWebpackPlugin({
            //配置模板文件的位置
            template: path.join(__dirname, './index.html'),
            //生成的新文件名称
            filename: 'index.html',
            //生成的js和css自动插入
            inject: true
        }),
        new CleanWebpackPlugin(),

    ]
};


module.exports = config;
