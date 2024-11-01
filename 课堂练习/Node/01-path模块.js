const path = require('path');

// 1、join方法路径拼接
const p1 = path.join(__dirname, '/txt');
console.log(p1);

//2 extname方法 获取某个路径的后缀名 
let p2 = path.extname(__filename);
// console.log(__filename);

console.log(p2);

// 3 isAbsolute 方法 判断是否是绝对路径
let p3 = path.isAbsolute(__dirname);
console.log(p3);


// 4、resolve方法  将相对路径转换成绝对路径
let p4 = path.resolve('./text/abc');
console.log(p4);

