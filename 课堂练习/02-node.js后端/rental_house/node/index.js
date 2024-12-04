const express = require('express');
const http = require('http');
const app = express();
app.use('/roomInfo', require('./routes/roomInfoRoute.js'));
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running.....');

});