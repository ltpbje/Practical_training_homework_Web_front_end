const BaseService = require('./BaseService.js');


class RoomInfoService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.room_info;
    }
    // deleteId

}


module.exports = RoomInfoService;