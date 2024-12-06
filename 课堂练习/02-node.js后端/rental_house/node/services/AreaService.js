const BaseService = require('./BaseService.js');


class AreaService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.t_area;
    }

    findListById(parentId) {
        let strSql = `select * from ${this.currentTableName} where parentId = ?`;
        // console.log(1);

        return this.excuteSql(strSql, [parentId]);
    }
}

module.exports = AreaService;