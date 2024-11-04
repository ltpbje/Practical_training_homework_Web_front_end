const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

//第一步：读取JSON文件
let result1 = fs.readFileSync(path.join(__dirname, '/excel.json'));
const objStr = result1.toString();
let jsonObj = JSON.parse(objStr);


// 第二步：构造所需的excel数据结构
let excelObj = {
    name: 'haha',
    data: []
};

// 第三步：转换数据结构
// 构造第一行数据 也就是excel的表头，内容即为现在jsonObj对象的属性名





let excelFirstLine = Object.keys(jsonObj[0]);
//将第一行数据添加到工作表的data中
excelObj.data.push(excelFirstLine);
//接下来添加exce当中真正的数据，也就是每个对象的属性值
jsonObj.forEach(item => {
    excelObj.data.push(Object.values(item));
});


// 第四步：根据数据生成excel文件

//现在我们把excelobj当中的数据再转回成buffer类型，准备写入
let excelBuffer = xlsx.build([excelObj]);
// 把数据写入到硬盘（注意：写入硬盘实际就是把数据作为文件保存下来）

fs.writeFileSync(path.join(__dirname, '/new.xlsx'), excelBuffer, { encoding: 'utf8' });

