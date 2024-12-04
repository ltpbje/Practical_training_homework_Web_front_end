const BaseService = require('./BaseService.js');


class RoomInfoService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.room_info;
    }
    // deleteId
    getListByPage({ room_name }) {
        let strSql = `select * from ${this.currentTableName} where 1`;
        let ps = [];
        if (room_name) {
            strSql += ` and room_name like ?`;
            ps.push(`${room_name}`);
        }
        return this.excuteSql(strSql, ps);
    }
}


module.exports = RoomInfoService;