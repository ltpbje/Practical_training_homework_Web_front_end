const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');


let result = fs.readFileSync(path.join(__dirname, '/demo.xlsx'));
let xp = xlsx.parse(result);
// console.log(xp[0].data);
// 将xp中的数据转换成JSON格式
let resultArr = [];
let firstExcelTable = xp[0];
// console.log('firstExcelTable', firstExcelTable);
for (let i = 0; i < firstExcelTable.data.length; i++) {
    //每循环一次，代表一行数据
    let obj = {};
    for (let j = 0; j < firstExcelTable.data[i].length; j++) {
        //遍历一行当中的每一个数据
        let propertyName = firstExcelTable.data[0][j];//获取obj对象的属性名
        obj[propertyName] = firstExcelTable.data[i][j];//获取obj对象的属性值

    }
    // 对象放到数组中
    resultArr.push(obj);
}


fs.writeFileSync(path.join(__dirname, '/excel.json'), JSON.stringify(resultArr), { encoding: 'utf8' });

// console.log(resultArr);



