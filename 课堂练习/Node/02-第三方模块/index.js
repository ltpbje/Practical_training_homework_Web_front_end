const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const getData = async () => {
    // 错误捕获
    try {
        // 定义一个url变量，值为'https://axios-http.com/zh/docs/example'
        let url = 'https://axios-http.com/zh/docs/example';
        // 使用axios.get方法发送一个GET请求，获取url的响应
        let resp = await axios.get(url);
        // 定义一个空数组result
        let result = [];
        // 使用cheerio库加载resp.data
        const $ = cheerio.load(resp.data);
        $(".aside-container>a").each((index, item) => {
            let obj = {};
            obj.text = $(item).text();
            // console.log($(item).text());
            result.push(obj.text);
        });
        // console.log(result.join('\n'));
        const content = result.join('\n');
        fs.writeFileSync(path.join(__dirname, 'output.txt'), content, {
            encoding: 'utf8'
        });
        // fs.writeFileSync('output.txt', JSON.stringify(result), {
        //     encoding: 'utf8'
        // });
        const txt = fs.readFileSync(path.join(__dirname, 'output.txt'), {
            encoding: 'utf8'
        });
        console.log(txt);

        console.log('写入成功');


    } catch (error) {
        console.log('错误', error);
    }

};

getData();