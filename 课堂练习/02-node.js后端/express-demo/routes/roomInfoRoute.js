const express = require('express');
const router = express.Router();
router.get('/roomInfoList', (req, resp) => {
    resp.send('你进入了路由里面的roomInfoList');
});
router.get('/roomInfoPage', (req, resp) => {
    resp.send('你进入了路由里面的roomInfoPage');
});
router.get('/roomInfodelete', (req, resp) => {
    resp.send('你进入了路由里面的roomInfodelete');
});


module.exports = router;