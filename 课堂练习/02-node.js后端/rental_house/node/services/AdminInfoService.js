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
    async checkLogin({ zh, admin_pwd }) {
        let strSql = `select * from ${this.currentTableName} where isDel = false and admin_pwd = ?  `;
        admin_pwd = md5(admin_pwd + AppConfig.md5salt);
        if (/^\w+@\w+\.com$/.test(zh)) {
            strSql += ` and admin_email = ? `;

        } else if (/^1[3456789][0-9]{9}$/.test(zh)) {
            strSql += ` and admin_tel = ? `;

        } else {
            strSql += ` and id = ? `;
        }
        let results = await this.excuteSql(strSql, [admin_pwd, zh]);
        return results[0];
    }
}


module.exports = AdminInfoService;