const BaseService = require('./BaseService.js');
const PageList = require('../model/PageList.js');

class RoomInfoService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.room_info;
    }
    // deleteId
    async getListByPage({ room_name, pageIndex }) {
        let strSql = `select * from ${this.currentTableName} where 1`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where 1`;
        let strWhere = ``;
        let ps = [];
        if (room_name) {
            strWhere += ` and room_like ?`;
            ps.push(`${room_name}`);
            // strSql += ` and room_name like ?`;
            // ps.push(`${room_name}`);
        }
        strSql += `${strWhere} limit ${(pageIndex - 1) * this.pageSize},${this.pageSize}`;
        countSql += strWhere;
        let results = await this.excuteSql(strSql + ';' + countSql, [...ps, ...ps]);
        let pageList = new PageList(pageIndex, results[1][0].total_count, this.pageSize, results[0]);
        return pageList;
    }
}


