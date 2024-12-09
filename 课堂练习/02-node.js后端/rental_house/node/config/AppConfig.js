const AppConfig = {
    md5salt: 'asdhajksfediuqw;asjdkahsdhjashjkdkjasgdajhkgdhjasdkghajgdzxnbch',
    // 设置一个数组 这个数组里面设置的路径，外面的拦截器放行
    excludePath: [
        /\adminInfo\/checkLogin/
    ],
    jwtKey: "ashjdkgasuidy8aisjhgd"//jwt的密钥
};

module.exports = AppConfig;