const express = require('express');
const router = express.Router();
const serviceFactory = require('../ServiceFactory/ServiceFactory.js');
const ResultJson = require('../model/ResultJson.js');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: path.join(__dirname, '../adminPhoto')
});

router.post('/uploadAdminPhoto', upload.single('admin_photo'), (req, resp) => {
    let file = req.file;
    if (file) {
        fs.renameSync(file.path, file.path + file.originalname);
        resp.json(new ResultJson(true, '文件上传成功', `/adminPhoto/${file.filename + file.originalname}`));
    }
});



router.post('/add', async (req, resp) => {
    let results = await serviceFactory.adminInfoService.add(req.body);
    resp.json(new ResultJson(results, results ? "注册成功" : "注册失败"));

});
module.exports = router;


