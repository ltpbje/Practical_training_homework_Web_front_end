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

router.get('/getListByPage', async (req, resp) => {
    try {
        let results = await serviceFactory.roomInfoService.getListByPage(req.query);
        resp.json(new ResultJson(true, '数据请求成功', results));
    } catch (error) {
        console.log(error);
        resp.status(500).json(new ResultJson(false, '数据请求失败', error));
    }
});


router.get('/findById', async (req, resp) => {
    try {
        let { id } = req.query;
        let results = await serviceFactory.roomInfoService.findById(id);
        resp.json(new ResultJson(true, '数据请求成功', results));
    } catch (error) {
        resp.status(500).json(new ResultJson(false, '数据请求失败', error));
    }
});

module.exports = router;