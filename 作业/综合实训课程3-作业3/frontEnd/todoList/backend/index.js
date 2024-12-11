const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const DButils = require('./utils/DButils');
const mysql = require('mysql');
let conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'data_query_api',
    multipleStatements: true//开启之后，可以多条sql语句同时执行
});
// 测试连接
conn.connect(err => {
    console.log(err, '如果为null 就是连接成功');
});
// 创建express应用
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use((req, resp, next) => {
    // 设置响应头，允许跨域访问
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Headers", "*");
    resp.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

const DB = new DButils();
app.get('/getData', async (req, resp) => {

    let sqlStr = `select * from todolist`;
    let results = await DB.excuteSql(sqlStr);
    resp.json(results);
});


app.post('/add', async (req, resp) => {
    // console.log(1);

    let sqlStr = `insert into todolist(title,content,status,startTime,endTime) values (?,?,?,?,?);`;
    let { title, content, status, startTime, endTime } = req.body;
    let params = [title, content, status, startTime, endTime];
    let results = await DB.excuteSql(sqlStr, params);
    // console.log(results);
    resp.json(results);

});
app.get('/delete', async (req, resp) => {
    let sqlStr = `DELETE FROM todolist WHERE id=?;`;
    const { id } = req.query;
    const params = [id];
    await DB.excuteSql(sqlStr, params);
    resp.json('ok');
});

app.get('/finish', async () => {
    let sqlStr = `update todolist set status='已完成' where id = ?; `;
});
// app.get('/', (req, resp) => {
//     console.log(1);

// });




// 创建一个HTTP服务器，并将app作为回调函数传入
// const server = http.createServer(app);
app.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....', 'http://127.0.0.0:8080/');
});