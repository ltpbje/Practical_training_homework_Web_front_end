const express = require('express');
const http = require('http');
const app = express();
app.use((req, resp, next) => {
    // 设置响应头，允许跨域访问
    resp.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应头，允许跨域请求的方法
    // 设置允许的请求方法
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    // 设置允许的请求头
    resp.setHeader("Access-Control-Allow-Headers", "content-type");
    next();
});
app.use('/roomInfo', require('./routes/roomInfoRoute.js'));
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....');

});