const express = require('express');
const http = require('http');
const path = require('path');
const template = require('./node_modules/express-art-template');
const app = express();
const DButils = require('./DButils');
const { log } = require('console');
let s = new Set();
app.get('/', (req, resp) => {
    console.log("我接收了你的请求", req.ip);
    s.add(req.id);
    resp.send(`我接收了你的请求,你的ip地址是${req.ip},当前服务器${s.size}人在线`);
});
app.get('/login', (req, resp) => {
    resp.send(`你现在访问的是登录页面`);
});
app.get('/register', (req, resp) => {
    resp.send(`你现在访问的是注册页面`);
});

app.get('/index', async (req, resp) => {
    try {
        let DB = new DButils();
        let strSql = `select name from test`;
        let results = await DB.excuteSql(strSql);
        console.log(results);

        resp.render("index.html", { abc: results });
    } catch (error) {
        console.log(error);
        resp.status(500);
        resp.send('服务器错误');
    }
    // let arr = ['张三', '李四'];
    // 正常的MVVM 模式操作数据库的一个方法，返回一个数据库操作的结果集，比如执行是查询操作，结果集中就会包含查询的数据
    // resp.render("index.html", { abc: arr });
});


// 设置视图文件夹的路径
app.engine("html", template);// 告诉我们的app，模块的后缀是.html;
// 设置视图文件夹的路径
app.set("views", path.join(__dirname, "views"));
// app.set('views engine', "html");//所有的html

app.use("/roomInfo", require('./routes/roomInfoRoute'));
// 使用express.static()中间件，将静态文件目录设置为./static，并将该目录映射到/abc路径下
app.use('/abc', express.static('./static'));



// 创建一个http服务器，并将app作为参数传入
const server = http.createServer(app);
// 监听8081端口，并将0.0.0.0作为参数传入
server.listen(8081, "0.0.0.0", () => {
    // 当服务器启动时，输出提示信息
    console.log('express server running at http://127.0.0.1:8081');
});

