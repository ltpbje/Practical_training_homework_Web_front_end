const BaseService = require("./BaseService.js");
const md5 = require("md5-node");
const AppConfig = require('../config/AppConfig.js');


class AdminInfoService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.admin_info;
    }

    async add({ admin_name, admin_sex, admin_tel, admin_pwd, admin_email, admin_photo, admin_address }) {
        admin_pwd = md5(admin_pwd + AppConfig.md5salt);
        let strSql = `insert into ${this.currentTableName} (admin_name, admin_sex, admin_tel, admin_pwd, admin_email, admin_photo, admin_address) value(?,?,?,?,?,?,?)`;
        let results = await this.excuteSql(strSql, [admin_name, admin_sex, admin_tel, admin_pwd, admin_email, admin_photo, admin_address]);
        return results.affectedRows > 0 ? true : false;
    }
}


module.exports = AdminInfoService;