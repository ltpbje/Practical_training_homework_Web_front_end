const express = require('express');
const router = express.Router();
const serviceFactory = require('../ServiceFactory/ServiceFactory.js');

const ResultJson = require('../model/ResultJson.js');
router.get('/roomInfoList', async (req, resp) => {
    try {
        let results = await serviceFactory.roomInfoService.getAllList();
        resp.json(new ResultJson(true, '数据请求成功', results));
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;