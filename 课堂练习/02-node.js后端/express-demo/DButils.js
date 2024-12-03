const mysql = require('mysql');

class DButils {
    getConn() {
        let conn = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'h2003'
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