const axios = require('axios');

let url = 'https://axios-http.com/zh/docs/example';

const getData = async () => {
    let resp = await axios.get(url);
    console.log(resp.data);

};

getData();