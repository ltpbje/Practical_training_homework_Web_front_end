const express = require('express');
const router = express.Router();
const serviceFactory = require('../ServiceFactory/ServiceFactory.js');
router.get('/roomInfoList', async (req, resp) => {
    try {
        let results = await serviceFactory.roomInfoService.getAllList();
        resp.json(results);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;