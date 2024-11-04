const fs = require('fs');
const path = require('path');

// 获取文件夹当中的文件信息
const arr = fs.readdirSync(__dirname + '/txt');
console.log(arr);

arr.forEach(item => {
    if (path.join(__dirname, '/txt', item)) {
        // 删除文件夹中的文件
        // console.log(path.join(__dirname, '/txt', item));

        fs.unlinkSync(path.join(__dirname, '/txt', item));
        console.log('删除成功');

    } else {
        console.log('找不到');
    }
});