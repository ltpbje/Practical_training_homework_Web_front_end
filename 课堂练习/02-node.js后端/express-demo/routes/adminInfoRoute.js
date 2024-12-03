const express = require('express');
const router = express.Router();
router.get('/roomInfoList', (req, resp) => {
    resp.send('你进入了路由里面的roomInfoList');
});


module.exports = router;