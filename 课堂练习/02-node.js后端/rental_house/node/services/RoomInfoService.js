const BaseService = require('./BaseService.js');
const PageList = require('../model/PageList.js');

class RoomInfoService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.room_info;
    }
    // deleteId
    async getListByPage({ room_name, pageIndex }) {
        let strSql = `select * from ${this.currentTableName} where 1 and isDel = false`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where 1`;
        let strWhere = ``;
        let ps = [];
        if (room_name) {
            strWhere += ` and room_name like ?`;
            ps.push(`${room_name}`);
            // strSql += ` and room_name like ?`;
            // ps.push(`${room_name}`);
        }
        strSql += `${strWhere} limit ${(pageIndex - 1) * this.pageSize},${this.pageSize}`;
        countSql += strWhere;
        let results = await this.excuteSql(strSql + ';' + countSql, [...ps, ...ps]);
        let pageList = new PageList(pageIndex, results[1][0].total_count, results[0], this.pageSize);
        return pageList;
    }


    async findById(id) {
        let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
        let results = await this.excuteSql(strSql, [id]);
        return results[0];
    }

    async update({ id, room_name, max_count, kt, network, washroom, room_size }) {
        let strSql = `update h2003.room_info set room_name=?,max_count=?,kt=?,washroom=?,room_size=? where id = ?`;
        let results = await this.excuteSql(strSql, [room_name, max_count, kt, network, washroom, room_size, id]);
        return results.affectRows > 0 ? true : false;
    }
    async deleteId({ id }) {
        let strSql = `update ${this.currentTableName} set isDel = true where id = ?`;
        let results = await this.excuteSql(strSql, [id]);
        return results.affectedRows > 0 ? true : false;
    }

    async exportExcel({ room_name }) {
        let strSql = `select * from ${this.currentTableName} where isDel = false`;
        let strWhere = ``;
        let ps = [];
        if (room_name) {
            strWhere += ` and room_name like ?`;
            ps.push(room_name);
        }
        strSql += strWhere;
        return this.excuteSql(strSql, ps);
    }
}
module.exports = RoomInfoService;


