const express = require('express');
const http = require('http');
const RoomInfoService = require('./services/RoomInfoService.js');
const app = express();
const Ri = new RoomInfoService();
app.get('/delete', async (req, resp) => {
    let results = Ri.deleteId(2);
    console.log(results);

    resp.send(results ? '删除成功' : '删除失败');
});
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....');

});