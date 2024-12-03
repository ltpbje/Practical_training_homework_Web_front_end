const express = require('express');
const http = require('http');
const app = express();

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
const server = http.createServer(app);
server.listen(8081, "0.0.0.0", () => {
    console.log('express server running at http://127.0.0.1:8081');
});

