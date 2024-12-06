// 公共服务类 主要用于解耦，并提供基础方法
const DButils = require('../utils/DButils.js');

class BaseService extends DButils {
    constructor() {
        super();
        this.tableMap = {
            admin_info: 'admin_info',
            room_info: 'room_info',
            stu_info: 'stu_info',
            t_area: 't_area'
        };
        this.currentTableName = '';
        this.pageSize = 10;
    }
    // async deleteId(id) {
    //     let strSql = `delete from ${this.currentTableName} where id = ?`;
    //     let results = await this.excuteSql(strSql, [id]);
    //     // return false;
    //     return results.affectedRows > 0 ? true : false;
    // }
    getAllList() {
        let strSql = `select * from ${this.currentTableName}`;
        return this.excuteSql(strSql);
    }
}


module.exports = BaseService;