// 引入path模块
const path = require('path');
// 引入fs模块
const fs = require('fs');

// let p1 = path.join(__dirname, '/txt/adc.txt');
// // 1. fs.existsSync(p1) 判断路径是否存在
// let result = fs.existsSync(p1);
// console.log(result);
// 2、fs.rmdirSync() 删除空文件夹 如果删除的不是空文件夹会报错
// let p2 = path.join(__dirname, '/img');
// if (fs.existsSync(p2)) {
//     fs.rmdirSync(p2);
// } else {
//     console.log('路径不存在');
// }

// // 3. fs.unlinkSync() 根据路径删除文件
// let p3 = path.join(__dirname, '/img/1.js');
// if (fs.existsSync(p3)) {
//     fs.unlinkSync(p3);
// } else {
//     console.log('这个文件不存在');

// }

// //4、fs.copyFileSync（oldPath,newPath）复制文件
// let oldPath = path.join(__dirname, '/txt/abc.txt');
// let newPath = path.join(__dirname, '/123/abc.txt');
// fs.copyFileSync(oldPath, newPath);

// // 5、fs.renameSync（oldPath,newPath）文件重命名
// let oldPath = path.join(__dirname, '/txt/abc.txt');
// let newPath = path.join(__dirname, '/txt/123.txt');

// // 6、fs.mkdirSync（）根据路径创建文件夹
// let p6 = path.join(__dirname, '/css');
// if (fs.existsSync(p6)) {
//     console.log('文件夹已存在');

// } else {
//     fs.mkdirSync(p6);
// }

// //7、fs.readdirSync（）读取某一个路径下的文件夹内部信息

// let arr = fs.readdirSync(__dirname + '/txt');
// console.log(arr);


// // /8、fs.statSync()读取路径状态
// let sta = fs.statsync(dirname + "/txt");
// console.log(sta);

// sta.isFile();//判断是否是文件路径;
// sta.isDirectory();//判断是否是文件夹路径



// // 9、fs.readFileSync(通过路径读取路径指向文件的内部内容)
// const result = fs.readFileSync(__dirname + '/123/abc.txt', {
//     encoding: 'utf8'
// });
// console.log(result);





// // 拼接文件路径
// let p3 = path.join(__dirname, '/img/1.js');
// if (fs.existsSync(p3)) {
//     fs.unlinkSync(p3);
//     console.log('文件删除成功');

// } else {
//     console.log('这个文件不存在');

// }

// let p2 = path.join(__dirname, '/img');
// console.log(1, __dirname);

// if (fs.existsSync(p2)) {
//     fs.rmdirSync(p2);
//     console.log('文件夹删除成功');

// } else {
//     console.log('这个文件夹不存在');
// }

// // 获取文件路径