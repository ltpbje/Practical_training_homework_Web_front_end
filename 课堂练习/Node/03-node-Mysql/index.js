const mysql = require('mysql');

// 创建mysql链接
const conn = mysql.createConnection({
    host: '127.0.0.1',//服务器位置
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'h2003'
});

conn.connect(error => {
    if (error) {
        console.log('连接数据库失败');
        console.log(error);

    } else {
        console.log('连接数据库成功');
    }
});

// let insertSql = `INSERT INTO test(name, age) VALUES('赵六', '80');`;

// conn.query(insertSql, (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     conn.end();
// });


// let name = '李四';
// let age = 18;
// // 带参新增
// let insertSql = `INSERT INTO test(name, age) VALUES(?, ?);`;
// conn.query(insertSql, [name, age], (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });

// // 修改操作
// let updateSql = `update test set name = ? where age = ?`;
// conn.query(updateSql, ['zhangsan', 77], (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });

// // 删除操作
// let deleteSql = `delete from test where age = ?`;

// conn.query(deleteSql, [80], (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });

// 5. 查询操作
// let strSql = `select * from test`;

// // 5.1.普通查询
// conn.query(strSql, (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });


// // 5.2.带参查询
// let strSql = `select * from test where age = ?`;
// conn.query(strSql, [77], (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });


// // 5.3 模糊查询
// let strSql = `select * from test where age like ?`;
// conn.query(strSql, [77], (error, result) => {
//     if (error) {
//         console.log('执行失败', error);
//     } else {
//         console.log(result);
//     }
//     // 断开连接
//     conn.end();
// });

// 5.4、SQL语句动态拼接（重点！！！！！！！）
// let sname = '';
// let ssex = '男';
// let snation = '回族';

// // 准备sql语句
// //select * from stuinfo where 1 and sname like ? and ssex= ? and snation like ?
// let strSql = `select * from stuinfo where 1`;
// let arr = [];
// // 开始拼接
// if (sname) {
//     strSql = strSql + ` and sname like ?`;
//     arr.push(sname);
// }
// if (ssex) {
//     strSql = strSql + ` and ssex = ?`;
//     arr.push(ssex);
// }
// if (snation) {
//     strSql = strSql + ` and snation = ?`;
//     arr.push(snation);
// }

// // 页码
// let pageIndex = 1;

// // 拼接分页条件
// strSql += ` limit ${(pageIndex - 1) * 5},5`;
let strSql = `select * from test where 1`;
// let age = 18;
let arr = [];
let pageIndex = 2;
strSql += ` limit ${(pageIndex - 1) * 5},5`;
// strSql = strSql + ` and age = ?`;
// arr.push
conn.query(strSql, (error, result) => {
    if (error) {
        console.log('执行失败', error);
    } else {
        console.log('执行成功', result);
    }
    // 断开连接
    conn.end();
});