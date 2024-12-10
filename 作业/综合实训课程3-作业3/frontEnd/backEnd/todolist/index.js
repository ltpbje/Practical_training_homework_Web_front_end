const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const DButils = require('./utils/DButils');

// 创建express应用
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use((req, resp, next) => {
    // 设置响应头，允许跨域访问
    resp.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应头，允许跨域请求的方法
    // 设置允许的请求方法
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    // 设置允许的请求头
});

const DB = new DButils();
router.get('/getData', async (req, resp) => {
    console.log(1);

    let sqlStr = `select * from todolist`;
    let results = await DB.excuteSql(sqlStr);
    resp.json(results);
});




// 创建一个HTTP服务器，并将app作为回调函数传入
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....');
});