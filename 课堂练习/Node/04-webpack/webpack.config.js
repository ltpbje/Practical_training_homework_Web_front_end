// webpack 配置文件
//我们把这个文件看成事webpack的配置文件，以后的webpack就使用这个配置文件进行打包

//webpack的配置文件中，使用commonJs模块化规范

const path = require('path');


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
        rules: [
            {
                test: /\.js$/
            }
        ]
    },
    // plugins对webpack本身的打包功能做额外的扩展配置
    plugins: [


    ]
};


module.exports = config;
