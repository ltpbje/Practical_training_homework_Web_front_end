# express后端项目搭建 -- 管理员模块

- 管理员模块其实做起来的和之前的房间信息模块其实有很多相似之处，但是会在这个基础上附加很多额外的功能，那么，我们先来看以下几个功能
- 1、省市区三级联动菜单
- 2、图片上传
- 3、MD5密码加密

## 1、省市区三级联动

- 省市区三级联动需要有数据支持，这个数据可以放在数据库里面，页可以直接写在一个JSON文件，我们这里采用的是将省市区三级的数据放在数据库里面，通过请求来获取到对应的数据
- 在services目录下面新建一个AreaService.js

```js
const BaseService = require("./BaseService.js");
class AraeService extends BaseService {
    constructor() {
        super();
        this.currentTableName = this.tableMap.t_area;
    }
    findListById(parentId) {
        let strSql = `select * from ${this.currentTableName} where parentId = ?`;
        return this.excuteSql(strSql, [parentId]);
    }
}
module.exports = AraeService;
```

- > 注意：
  >
  > 记得在BaseService.js的tableMap添加一个 t_area:'t_area'

- 在routes目录下新建areaRoute.js

```js
const express = require("express");
const router = express.Router();
const serviceFactory = require('../ServiceFactory/ServiceFactory.js');
const ResultJson = require("../model/ResultJson.js");
router.get("/findListByParentId", async (req, resp) => {
    let { parentId } = req.query;
    let results = await
        serviceFactory.areaService.findListById(parentId);
    resp.json(new ResultJson(true, "数据获取成功", results));
});
module.exports = router;
```

- 写完之后记得在入口文件index.js中use一下

- ```js
  app.use('/area',require('./routes/areaRoute.js'))
  ```

  

- 前端请求

```js
 $(function () {
    function renderOptions(parentId, targetElement) {
        var loading = Qmsg.loading("数据加载中...");
        request.get("/area/findListByParentId", {
            parentId: parentId
        }).then(function (res) {
            var htmlStr = template("temp1", {
                list: res.data
            });
            $(targetElement).html(htmlStr);
        }).catch(function (error) {
            console.log(error);
            Qmsg.error("服务器错误");
        }).finally(function () {
            loading.close();
        });
    }
    //先主动调用一遍，获取到所有的省信息并渲染在对应的select当中
    renderOptions(-1, "#sel_province");
    //选择省份的时候，渲染对应的城市
    $("#sel_province").on("change", function () {
        var parentId = $(this).val();
        renderOptions(parentId, "#sel_city");
    });
    //选择省份的时候，渲染对应的城市
    $("#sel_city").on("change", function () {
        var parentId = $(this).val();
        renderOptions(parentId, "#sel_area");
    });
})
```

## 2、图片上传

- 上传文件使用input的文件选择框，通过ajax实现上传

- ```html
  <input accept="image/*" type="file" class="custom-file-input" id="admin_photo_file">
  ```

- 上面的标签中有一个属性 accept=“image/*” 这里accept属性表示限制选择的文件类型，后面的值代表允许选择的文件类型有哪些，这里的意思就是允许所有的图片文件

- 这里我们先制作前端请求，请求地址我们可以先进行预设，然后在写后端路由的时候根据我们的预设来写后端路由的路径即可

```js
//---------------------------图片上传-------------------------
$("#admin_photo_file").on("change", function () {
    var file = this.files[0];
    if (file) {
        if (/^image\/(jpe?g|png|gif)/.test(file.type)) {
            //创建一个表单域对象
            var formData = new FormData();
            formData.append("admin_photo", file);
            $.ajax({
                url: baseURL + "/adminInfo/uploadAdminPhoto",
                method: "post",
                data: formData,
                processData: false, //不对上传的数据做二次处理
                contentType: false, //不携带任何的请求类型过去
                success: function (res) {
                    $("#img_admin_photo").attr("src", baseURL +
                        res.data);
                    Qmsg.success("上传图片成功");
                },
                error: function (error) {
                    console.log(error);
                    Qmsg.error("上传失败");
                },
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.onprogress = function (e) {
                        var precent = parseInt(e.loaded / e.total
                            * 100);
                        $("#img-upload-progress").css("width", precent + "%").text(precent + "%");
                    };
                    return xhr;
                }
            });
        } else {
            $("#admin_photo_file").val("");
            Qmsg.error("上传文件格式错误");
        }
    }
})
```

- express框架默认是不具备文件上传的功能的，所以需要使用中间件multer来实现

- 安装包

- ```cmd
  npm i multer --save
  ```

- 在routes目录中新建一个adminInfoRoute.js

```js
const express = require("express");
const router = express.Router();
const ResultJson = require("../model/ResultJson.js");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "../adminPhoto")
});
router.post("/uploadAdminPhoto", upload.single("admin_photo"),
    (req, resp) => {
        console.log(req.file);
    });
module.exports = router;
```

- 在入口文件index.js中use一下

- ```js
  app.use('/adminInfo',require('./routes/adminInfoRoute.js'))
  ```

- 当我们开始测试接口的时候，发现文件可以上传了，但是我们的文件名有问题，它没有后缀名

- 现在我们需要修改一下代码
- 在请求对象会包含我们上传的文件信息，在这个里面我们有可以利用的作为文件扩展名使用

```cmd
{
    fieldname: 'admin_photo',
    originalname: '1.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'D:\\2024-河师大前端实训\\rental_house\\node\\adminPhoto',
    filename: '701beb62f24fb509f22f82e43e034962',
    path: 'D:\\2024-河师大前端实训\\rental_house\\node\\adminPhoto\\701beb62f24fb509f22f82e43e034962',
    size: 27714
}
```

- 现在开始修改

```js
 router.post("/uploadAdminPhoto", upload.single("admin_photo"),
    (req, resp) => {
        let file = req.file;
        if (file) {
            fs.renameSync(file.path, file.path + file.originalname);
            resp.json(new ResultJson(true, "文件上传成功", `/adminPhoto/${file.filename +file.originalname}`));
        }
    })
```

- 现在图片依然显示不了，主要是因为所有的请求都需要由后端路由来接管，但是我们这里没有对应的图片路由去接管这些图片请求，那么，我们可以使用静态区域解决这个问题

- > 注意：
  >
  > 一般在应用中使用的图片这些都属于静态资源，不需要经过路由

- 我们把adminPhoto目录设置为静态区域，当请求地址为 /adminPhoto时，可以直接请求到adminPhoto目录下的静态资源

- ```js
  app.use('/adminPhoto',express.static(path.join(__dirname,"./adminPhoto")))
  ```

  

## 3、密码的MD5加密



- MD5是一种号称不可逆的加密模式，它会把原本的字符串产生一个新的字符串，node里面md5加密的方式有很多，我们使用第三方包md5-node

- 安装包

- ```cmd
  npm i md5-node --save
  ```

  

- 这里我们做一个简单的演示

- ```js
  const md5 = require('md5-node');
  let str = "123456";
  let mdStr = md5(str);
  console.log(mdStr)
  ```

- 这里我们得到了一个加密的字符串，但是，这样其实还是有隐患的，因为一些常见的密码使用了加密还是有一些工具可以进行穷举解密，所以，这个时候我们还可以对密码进行**加严**

```js
const md5 = require('md5-node');
let str = "123456";
let str1 = "dwjqioheoiundoqeuy3213dno2348"
let mdStr = md5(str + str1);
console.log(mdStr)
```

- 所谓的加盐其实就是在原本需要加密的字符串的基础上，再添加一个无规则的字符串，防止原本的字符串的加密文本过于简单

## 4、保存管理员数据

- 前端请求：

  ```js
  var imgURL = ""; //这里的值是再上传图片的时候返回的图片路径
  function saveData() {
      var loading = Qmsg.loading("正在注册中...");
      request.post("/adminInfo/add", {
          admin_name: $("#admin_name").val(),
          admin_sex: $("#admin_sex").val(),
          admin_tel: $("#admin_tel").val(),
          admin_pwd: $("#admin_pwd").val(),
          admin_email: $("#admin_email").val(),
          admin_photo: imgURL,
          admin_address:
              [$("#sel_province").val(), $("#sel_city").val(), $("#sel_area").val
                  (), $("#detail_addr").val()].join("")
      }).then(function (res) {
          if (res.status == "success") {
              Qmsg.success("注册成功");
          } else {
              Qmsg.error("注册失败");
          }
      }).catch(function (error) {
          console.log(error);
          Qmsg.error("服务器错误");
      }).finally(function () {
          loading.close();
      });
  }
  $("#btn-save").on("click", function () {
      saveData();
  })
  ```

  

- 新建一个config目录里面新建一个AppConfig.js用来设置md5加严设置

- ```js
  const AppConfig = {
      md5salt:"wqoicbuo122390dhsoqw"
  }
  module.exports = AppConfig;
  ```

- AdminService.js

```js
 const BaseService = require("./BaseService.js");
        const md5 = require("md5-node");
        const AppConfig = require("../config/AppConfig.js");
        class AdminInfoService extends BaseService {
            constructor() {
                super();
                this.currentTableName = this.tableMap.admin_info;
            }
            async add({ admin_name, admin_sex, admin_tel, admin_pwd, admin_email, admin_photo, admin_address }) {
                admin_pwd = md5(admin_pwd + AppConfig.md5salt);
                let strSql = `insert into ${this.currentTableName} (admin_name,admin_sex,admin_tel,admin_pwd,admin_email,admin_photo,admin_address) value(?,?,?,?,?,?,?)`;
                let results = await this.excuteSql(strSql,
                    [admin_name, admin_sex, admin_tel, admin_pwd, admin_email, admin_photo
                        , admin_address]);
                console.log(results);
                return results.affectedRows > 0 ? true : false;
            }
        }
        module.exports = AdminInfoService;
```

- adminInfoRoute.js

- ```js
  router.post("/add",async (req,resp) => {
      let results = await serviceFactory.adminInfoService.add(req.body);
      resp.json(new ResultJson(results,results?"注册成功":"注册失败"))
  })
  ```

  