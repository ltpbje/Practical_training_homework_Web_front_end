const mysql = require('mysql');

class DButils {
    getConn() {
        let conn = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'data_query_api',
            multipleStatements: true//开启之后，可以多条sql语句同时执行
        });
        return conn;
    }
    excuteSql(strSql, params = []) {
        let p = new Promise((reslove, reject) => {
            let conn = this.getConn();
            conn.query(strSql, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    reslove(results);
                }
                conn.end();
            });
        });
        return p;
    }
}


module.exports = DButils;