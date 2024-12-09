
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
                    if (error.state == 403) {
                        location.replace('../login.html');
                    }
                    reject(error);
                },
                beforeSend: function (xhr) {
                    var rental_house_token = sessionStorage.getItem('rental_house_token');
                    if (rental_house_token) {
                        xhr.setRequestHeader('rental_house_token', rental_house_token);
                    }
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