const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let url = 'https://www.taobao.com/';


async function getData() {
    let result = [];
    let resp = await axios.get(url);
    let $ = cheerio.load(resp.data);
    console.log(resp.data);

    $('.user-externalLink-item').each((index, item) => {
        let obj = {};
        obj.imgSrc = $(item).find('.user-externalLink-item-img').attr('src');
        obj.title = $(item).find('.user-externalLink-item-text').text();
        result.push(obj);
        console.log($(item));
        console.log(1);


    });
    console.log(result);

}


getData();