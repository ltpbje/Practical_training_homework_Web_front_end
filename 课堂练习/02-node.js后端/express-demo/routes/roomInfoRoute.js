const express = require('express');
const router = express.Router();
router.get('/roomInfoList', (req, resp) => {
    console.log(req.query.userName);
    resp.send('你进入了路由里面的roomInfoList');
});
router.get('/roomInfoPage', (req, resp) => {
    resp.send('你进入了路由里面的roomInfoPage');
});
router.get('/roomInfodelete', (req, resp) => {
    resp.send('你进入了路由里面的roomInfodelete');
});

router.post('/add', (req, resp) => {
    console.log(req.body);

});


module.exports = router;