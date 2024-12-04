const { post } = require("jquery");

var baseURL = 'http://127.0.0.1:8080';

var request = {
    get: function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: 'GET',
                url: baseURL + url,
                data: data,
                success: function (res) {
                    resolve(res);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    post: function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: 'POST',
                url: baseURL + url,
                data: data,
                success: function (res) {
                    resolve(res);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
};