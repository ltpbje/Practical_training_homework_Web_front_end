const express = require("express");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const category = require("./data/category.json");
const shops = require("./data/shops.json");
const data = require("./data/data.json");
const app = express();

//默认的电话号码
let tell_num = "13710001000";
//默认的短信验证码
let mark_num = "687966";
//默认的账号
let user_name = "680069001";
//默认的密码
let password = "66666666";
//默认的图形验证码
let code = "abcd";
//token码
const secretKey = 'Kw_ImmT-n6qWa78YPoN5iWqFnff6VTKhPAX6SH2zHrm+Z2yapyTovJRn/St9hn8EIrm4L75nvCy7qHTvsBfgR2K8HawoLpHkS93';

//跨域处理
// 跨域设置
app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 200,
	allowedHeaders: 'Content-Type,Authorization,Accept',
}));


//获取轮播
app.get("/category", (req, res) => {
	res.send({
		"status": 200,
		"message": "获取category数据成功！",
		"list": [...category]
	});
});

/*

//const imagesCategory = path.join(__dirname, 'images', 'category');
//app.use('/images/category', express.static(imagesCategory));
// 动态图片路由
// app.get('/images/category/:imageName', (req, res) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	const imageName = req.params.imageName;
// 	const imagePath = path.join(imagesCategory, imageName);
// 	res.sendFile(imagePath);
// });

 */

//shops
app.get("/shops", (req, res) => {
	res.send({
		"status": 200,
		"message": "获取shops数据成功！",
		"list": [...shops]
	});
});

//获取info数据
app.get("/info", (req, res) => {
	let { info } = data[0];
	res.send({
		"status": 200,
		"message": "获取info数据成功！",
		"list": info
	});
});
//获取goods数据
app.get("/goods", (req, res) => {
	let { goods } = data[0];
	res.send({
		"status": 200,
		"message": "获取goods数据成功！",
		"list": goods
	});
});

//获取ratings数据
app.get("/ratings", (req, res) => {
	let { ratings } = data[0];
	res.send({
		"status": 200,
		"message": "获取ratings数据成功！",
		"list": ratings
	});
});
//test电话验证

//获取短信验证码数据
app.get("/get_tell_mark", (req, res) => {
	mark_num = Math.floor(Math.random() * 900000) + 100000;

	res.send({
		"status": 200,
		"message": "短信验证码发送成功！",
		"err": 0,
		"code": mark_num
	});
	console.log("短信验证码为：" + mark_num);
});

//获取4位图形验证码
app.get("/get_code", (req, res) => {
	//模拟生成随机的4位验证码
	code = "";
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < 4; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		code += characters[randomIndex];
	}

	res.send({
		"status": 200,
		"message": "获取图形验证码成功！",
		"code": code
	});
});

// 使用 body-parser 中间件解析 POST 请求的请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//登录电话和短信验证码登录功能
app.post("/login_tell", (req, res) => {
	if (req.body.mark1 == mark_num) {
		tell_num = req.body.tell;
		const user = {
			tell_num,
			user_name,
		};
		const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
		res.send({
			"status": 200,
			"message": "成功！",
			"token": token
		});
	} else {
		res.send({
			"status": 403,
			"message": "服务器拒绝！验证码错误！",
			"type": 1
		});
	}

});
//账号密码登录功能
app.post("/login_pwd", (req, res) => {
	if (req.body.username == user_name && req.body.password == password && req.body.mark2 == code) {
		const user = {
			tell_num,
			user_name,
		};
		const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
		res.send({
			"status": 200,
			"message": "成功！",
			"token": token
		});
	} else {
		res.send({
			"status": 403,
			"message": "服务器拒绝！账号、密码或验证码错误！",
			"type": 1
		});
	}
});

// 存放category图片的目录
const imagesCategory = path.join(__dirname, 'images');
// 设置静态文件目录
app.use('/images', express.static(imagesCategory));

app.listen(8900, () => {
	console.log("get at 127.0.0.1:8900/category 获取轮播数据");
	console.log("get at 127.0.0.1:8900/shops 获取商家列表数据");
	console.log("get at 127.0.0.1:8900/info 获取商家信息数据");
	console.log("get at 127.0.0.1:8900/goods 获取商家商品数据");
	console.log("get at 127.0.0.1:8900/ratings 获取商家评论数据");
	console.log("get at 127.0.0.1:8900/get_tell_mark 获取短信验证码");
	console.log("get at 127.0.0.1:8900/get_code 获取4位图形验证码");
	console.log("post at 127.0.0.1:8900/login_tell 手机号+短信验证码登录 data:{tell:***,mark1:***}");
	console.log("post at 127.0.0.1:8900/login_pwd 账号+密码+验证码登录 data:{username:***,password:***,mark2:***}");
	console.log("默认账号：" + user_name + "，默认密码：" + password);
});