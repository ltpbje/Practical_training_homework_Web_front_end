const express = require('express'); //引入express 模块
const app = express();              //创建实例
const http = require('http');
const mysql = require('mysql');     //引入mysql 模块
// 创建数据库连接 填入数据库信息 
const conn = mysql.createConnection({
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

// 使用body-parser中间件解析JSON请求体
// app.use(bodyParser.json());
// 数据查询接口
app.get('/query', (req, res) => {
    let { id, name } = req.query;

    // 构建查询语句
    let query = 'SELECT * FROM items WHERE 1 ';
    let params = [];

    if (id) {
        // 根据id匹配
        query += ' AND id = ?';
        params.push(id);
    }

    if (name) {
        query += ' AND name LIKE ?';
        // 模糊匹配
        params.push(`%${name}%`);
    }

    // 执行查询
    conn.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

const server = http.createServer(app);

// 开启服务器
server.listen(3000, () => {
    console.log('服务器在3000端口开启。。。。。 http://127.0.0.1:3000/');
});