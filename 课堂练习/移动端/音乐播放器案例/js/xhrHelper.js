var XHRHelper = {
	init: function (method, url, callBack) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var jsonStr = xhr.responseText;
				callBack(jsonStr);
			}
		};
		return xhr;
	},
	get: function (url, callBack) {
		var xhr = this.init("GET", url, callBack);
		xhr.send();
	},
	post: function (url, callBack, data) {
		var xhr = this.init("POST", url, callBack);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		if (data) {
			xhr.send(data);
		} else {
			xhr.send();
		}
	}
}

