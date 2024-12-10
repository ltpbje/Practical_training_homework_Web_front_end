
// 简单工厂
class ServiceFactory {
    constructor() {
        throw new Error('当前对象不需要new');
    }
    static creatRoomInfoService() {
        let RoomInfoService = require('../services/RoomInfoService.js');
        return new RoomInfoService;
    }
}



module.exports = ServiceFactory;