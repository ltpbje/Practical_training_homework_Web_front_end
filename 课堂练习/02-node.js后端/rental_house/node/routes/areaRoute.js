const express = require('express');
const router = express.Router();
const serviceFactory = require('../ServiceFactory/ServiceFactory.js');
const ResultJson = require('../model/ResultJson.js');


router.get('/findListByParentId', async (req, resp) => {
    let { parentId } = req.query;
    let results = await serviceFactory.areaService.findListById(parentId);
    // resp.json(1);
    // console.log(results);

    resp.json(new ResultJson(true, '数据请求成功', results));

});


module.exports = router;