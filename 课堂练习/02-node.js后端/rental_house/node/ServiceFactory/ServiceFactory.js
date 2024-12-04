const path = require('path');
const fs = require('fs');

const serviceFactory = (() => {
    let obj = {};
    let arr = fs.readdirSync(path.join(__dirname, '../services'));
    // console.log(arr);
    // 遍历数组arr中的每一个元素
    for (let item of arr) {
        // 将元素中的.js替换为空，并将首字母转换为小写
        let propertyName = item.replace('.js', '').replace(/^[A-Z]/, p => p.toLowerCase());
        // // 输出转换后的属性名
        // console.log(propertyName);
        let temp = require(path.join(__dirname, '../services', item));
        if (typeof temp === 'function') {
            obj[propertyName] = Reflect.construct(temp, []);
        }
    }

})();

