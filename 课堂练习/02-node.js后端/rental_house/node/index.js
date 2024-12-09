// 引入express模块
const bodyParser = require('body-parser');
// const { error } = require('console');
const express = require('express');
const fs = require('fs');
// 引入http模块
const http = require('http');
const path = require('path');
const ResultJson = require('./model/ResultJson.js');
const AppConfig = require('./config/AppConfig.js');
const jwt = require('jsonwebtoken');

require('express-async-errors');
// 创建express应用
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }));

app.use((req, resp, next) => {
    // 设置响应头，允许跨域访问
    resp.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应头，允许跨域请求的方法
    // 设置允许的请求方法
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    // 设置允许的请求头
    resp.setHeader("Access-Control-Allow-Headers", "content-type");
    resp.setHeader("Access-Control-Allow-Headers", "rental_house_token");
    next();
});

app.use((req, resp, next) => {
    let pathValidata = AppConfig.excludePath.some(item => item.test(req.path));
    if (pathValidata) {
        next();
    } else {
        if (req.method.toUpperCase() == "OPTIONS") {
            next();
        } else {
            let token = req.header.rental_house_token;
            if (token) {
                jwt.verify(token, AppConfig.jwtKey, (error, decoded) => {
                    if (error) {
                        resp.status(403).json(new ResultJson(false, "当前token失效"));
                    } else {
                        console.log(decoded);
                        next();
                    }
                });
            }
        }
    }
});
app.use('/roomInfo', require('./routes/roomInfoRoute.js'));
app.use('/area', require('./routes/areaRoute.js'));
app.use('/adminInfo', require('./routes/adminInfoRoute.js'));
app.use('/adminPhoto', express.static(path.join(__dirname, "./adminPhoto")));
app.use((error, req, resp, next) => {
    resp.status(500).json(new ResultJson(false, "数据请求失败", error));
});

// 创建一个HTTP服务器，并将app作为回调函数传入
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....');
    const deleteExcelFile = () => {
        // console.log(1);

        let excelDirPath = path.join(__dirname, "./excelDir");
        let arr = fs.readdirSync(excelDirPath);
        for (let item of arr) {
            let fileCreateTime = item.split("-")[0];
            if (Date.now() - fileCreateTime > 1 * 60 * 1000) {
                fs.unlinkSync(path.join(excelDirPath, item));
            }
        }
    };
    // deleteExcelFile();
    setInterval(deleteExcelFile, 1000);
});