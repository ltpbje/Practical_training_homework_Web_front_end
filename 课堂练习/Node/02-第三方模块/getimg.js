const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');




const getData = async () => {
    try {
        let result = [];
        let url = 'https://www.jd.com';
        let resp = await axios.get(url);
        let $ = cheerio.load(resp.data);
        $('.service_list li').each((index, item) => {
            let obj = {};
            // 图片路径
            obj.imgSrc = $(item).find('.service_ico_img').attr('src');
            // 文件名
            obj.title = $(item).find('.service_txt').text();
            result.push(obj);
        });
        fs.writeFileSync(path.join(__dirname, '/imgResult.txt'), JSON.stringify(result), {
            encoding: 'utf8'
        });
        console.log('写入成功');
        // 图片的真实地址已经被我们抓取到  现在我们可以开始下载图片了
        for (let item of result) {
            // 遍历所有的图片地址
            let url2 = item.imgSrc;
            let p = await axios.get(url2, {
                responseType: 'stream'
            });
            let currentImgPath = path.join(__dirname, `/iconImg/${item.title}.png`);
            // 

            // 创建一个可写流，用于将图片写入当前路径
            let currentImgStream = fs.createWriteStream(currentImgPath);
            p.data.pipe(currentImgStream);
            console.log('图片下载成功');

        }



    } catch (error) {
        console.log(error);

    }
};



getData();