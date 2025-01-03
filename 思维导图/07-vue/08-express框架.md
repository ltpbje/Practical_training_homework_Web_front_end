# express框架

- express是一个基于node环境下运行的使用JavaScript进行后端程序开发的一个框架，目前来说，使用javascript实现后端开发的主流框架：

- 1、express

- 2、koa

- 3、egg

- 安装

- ```cmd
  npm i express --save
  ```

- 首先我们可以通过一个终端命令，查询下电脑的端口信息

- ```cmd
  netstat -ano
  ```

- 找到一个空闲端口，创建服务

- ```js
  const express = require("express");
  const http = require("http");
  const app = express();
  //在服务器上开始运行我们的程序
  const server = http.createServer(app);
  server.listen(8081,"0.0.0.0",() => {
      console.log("服务器启动成功")
  })
  ```

  

  - 现在我们已经创建号了一个http服务器程序，并且运行在8081端口上

  - 整个大致的执行逻辑如下：

    - 1、通过express创建一个可以直接在node环境下运行的应用实例

    - 2、通过http模块吧创建好的应用实例载入到一个服务器的运行服务当中

    - 3、找一个空闲端口来启动服务，从而启动在该服务上运行的基于express框架创建的应用实例app

## 1、处理http请求

- 当我们的服务器构建以后，其他的互联网上的电脑可以通过监听我们的ip地址及端口就可以访问到这个服务器，但是现在的服务器还并没有处理这个访问的http请求在做请求处理之前，我们先了解以下http的请求方式，在http协议里面有很多种请求方式

- 1、get：它是基于浏览器地址栏的url请求，适合少量数据的传递

- 2、post：它是基于报文的请求，属于机密请求，可以与服务器之间传输大量的数据，它不同于浏览器的地址请求，所有的请求都不会再地址栏显示

- 3、put

- 4、delete

- 5、options

- 当我们以默认弄得地址进入到服务器的适合，服务器会报一个 Cannot GET / 的信息，说明服务器没有处理 / 路径的get请求

- 在express所生成的应用程序当中，有专门用于处理上面几种请求的方法

- ```js
  let s = new Set();
  app.get('/',(req,resp) => {
      console.log("我接收了你的请求",req.ip);
      s.add(req.ip);
      resp.send(`我接收到了你的请求，你的ip地址是${req.ip},当前服务器${s.size}人在线`)
  })
  ```

- > 分析：
  >
  > req：代表当前浏览器到服务器的对象 request
  >
  > resp：代表当前服务器返回给浏览器的对象 response

- ```js
  app.get('/login',(req,resp) => {
      resp.send("你现在访问的是登录页面")
  })
  app.get('/register',(req,resp) => {
      resp.send("你现在访问的是注册页面")
  })
  ```

- 上面我们一共处理了3个请求路径，这个时候浏览器就可以访问以下三个路径

- | 后端设置             | 前端请求地址                   |
  | -------------------- | ------------------------------ |
  | app.get("/")         | http://127.0.0.1:8081/         |
  | app.get("/login")    | http://127.0.0.1:8081/login    |
  | app.get("/register") | http://127.0.0.1:8081/register |

## 2、express页面渲染
- 以下的做法是基于MVC前后混合开发模式制作的

- express要实现要实现页面渲染需要使用第三方模块，art-template

- 首先，我们在当前目录下创建一个views目录用于存放html文件

- 然后，我们使用第三方模块art-template来完成页面的渲染，将这个页面发送给请求者

- 安装

  - ```cmd
    npm i art-template express-art-template --save
    ```

- 完成之后引入模块配置

- 第一步：设置视图文件所在目录

  - ```js
    app.set("views",path.join(__dirname,"/views"));
    ```

- 第二步：设置模块渲染引擎

  - ```js
    const template = require("express-art-template")
    app.engine("html",template); //告诉我们的app，模块的后缀是.html
    ```

- 当设置完成之后，我们希望象内前端渲染一个模板文件，这个时候直接调用resp.render()

  - ```js
    resp.render('index.html')
    ```

- 当通过模板引擎渲染页面的时候，页面经常会使用到一些数据，这些数据怎么获取

  - ```js
    app.get('/index',(req,resp) => {
        //这里我们举例制作一个简单的数组作为数据渲染使用
        let arr = ["张三","李四"]
        //正常的MVVM模式下会有一个操作数据库的方法，返回一个数据库操作的结果集，比如执行是查询操作，结果集中就会包含查询的数据，然后我们返回给前端的只是查询到的数据，前端拿到数据自己渲染
        resp.render('index.html',{abc:arr})
    })
    ```

    

- 那么，基于上面的说法，我们可以开始做一个简单的用于操作数据库的方法，来获取真实的前后端数据交互的体验

## 3、数据库操作封装

- 现在我们开始尝试连接数据库，在node环境下要连接服务器需要使用对应的功能模块，不同厂家推出的数据库管理系统都有自己对应用于跟node连接的工具\

- 安装连接工具包

- ```cmd
  npm i mysql
  ```

- 创建一个DButils.js

  ```js
  const mysql = require('mysql');
  class DButils {
      getConn() {
          let conn = mysql.createConnection({
              host: "127.0.0.1",
              port: 3306,
              user: 'root',
              password: 'root',
              database: 'h2003'
          });
          return conn;
      }
      excuteSql(strSql, params = []) {
          let p = new Promise((resolve, reject) => {
              let conn = this.getConn();
              conn.query(strSql, params, (error, results) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(results);
                  }
                  conn.end();
              });
          });
          return p;
      }
  }
  module.exports = DButils;
  ```

  - 导入DButils，设置路由

    ```js
    app.get('/index', async (req, resp) => {
        try {
            let DB = new DButils();
            let strSql = `select sname from stuinfo`;
            let results = await DB.excuteSql(strSql);
            resp.render('index.html', { abc: results });
        } catch (error) {
            console.log(error);
            resp.status(500);
            resp.send("服务器错误");
        }
    })
    ```

    

- > **总结：整个数据请求响应到渲染的过程（MVC模式）**
  >
  > 1、在浏览器地址栏时输入请求地址
  >
  > 2、后端服务器中的get接收请求并处理（做了一个操作数据库的处理）
  >
  > 3、处理结果在get方法内部通过render渲染到后端的模板页面中
  >
  > 4、浏览器接收已经渲染好数据的页面进行展示
  >
  > **扩展：MVVM模块**
  >
  > 如果在前后端分离开发的模式下，在后端程序中就不会执行一个渲染数据的操作，而是直接把获取的数据返回给前端，然后前端在自己渲染

## 4、express路由（后端路由）

- 路由简单来说就是一个集散中心，后端路由负责接收请求然后分发服务，具体来说我们写的app.get就是一个路由，get方法中的回调函数就是提供的服务，但是现在我们不可能说把所有可以提供的服务全部都写在一个index.js这个文件中，这些下去这个文件会非常臃肿，所以模块化开发的思路未我们提供了一个解决方案

- 这里我们以一个宿舍管理系统的演示案例来进行说明

- 一般来说对于路由的分文件管理，我们可以根据数据库的设计来决定，一般根据数据库中的数据模块来划分

- 现在的话，我们的演示项目中主要有三个大的数据功能模块，分别是管理员模块，房间信息模块，学生信息模块，那么，我们就可以根据这个来进行文件划分

- 现在我们可以在项目目录下创建一个routes目录，在这个目录下面专门用来存放路由对象，路由的文件名命名使用小驼峰写法，比如admin_info模块的路由我呢见我们可以叫做adminInfoRoute.js

- 这里，我们就以roomInfoRoute.js为例说明下

- ```js
  const express = require('express');
  const router = express.Router();
  router.get('/roomInfoList', (req, resp) => {
      resp.send("你进入了路由里面的roomInfoList");
  });
  router.get('/roomInfoPage', (req, resp) => {
      resp.send("你进入了路由里面的roomInfoPage");
  });
  router.get('/roomInfodelete', (req, resp) => {
      resp.send("你进入了路由里面的roomInfodelete");
  });
  module.exports = router;
  ```

  - 然后在入口文件中index.js引入路由文件

  - ```js
    app.use("/roomInfo",require('./routes/roomInfoRoute.js'));
    ```

  - > 分析：
    >
    > 现在写在use中的第一个参数的路径，会作为一级路径，原本写在路由文件中get方法的第一个参数的路径，作为二级路径，两者拼接到一起，然后带上服务器地址，形成一个完整的room_info模块的后端数据接口

## 5、express静态文件区域

- express里面所有的请求全部都会被程序或者路由接管，这个时候所有的请求都必须经过路由或者程序本身的统一，否则后端是不会为该请求提供服务的，这个时候有些特殊文件我们是不需要经过路由同意的，比如图片，JS文件，CSS文件，字体文件等等，这个时候可以把这个文件设置在一个静态区域中，这些文件不受限制，可以直接访问

- ```js
  app.use('请求路径',express.static('静态目录路径'))
  ```

  ## 6、resp对象的使用

  - 之前我们简单的说过resp就是服务器响应给浏览器的对象，我们可以通过这个对象向客户端返回一些东西
  - 1、resp.send() 向客户端返回一个字符串

  - 2、resp.sendFile() 向客户端返回一个文件下载信息，客户端会提示下载文件

  - 3、resp.json() 向客户端返回一个JSON字符串

  - 4、resp.render() 向客户端返回一个经过渲染的模板文件

## 7、服务器接收前端传递的数据

### 7.1 get请求

- 假设现在我们有这样是一个地址：http://127.0.0.1:8081/roomInfo/roomInfoList?userName=zhangsan&age=18

- 这个地址会最终进入到服务器的路由当中

- ```js
  router.get('/roomInfoList',(req,resp) => {
      console.log(req.query.userName)
      resp.send("你进入了路由里面的roomInfoList")
  })
  ```

  

- > 分析：
  >
  > get请求传递的参数其实就在地址当中的search部分
  >
  > 所有的search参数都会在req对象的query属性中调用
  >
  > ```js
  > req.query.userName;
  > req.query.age;
  > ```

### 7.2 post请求

- 之前我们的get请求是一个基础请求方式，是一种需要把值放在地址后面的，也就是所谓的地址栏传值，这个请求最大的特点就是简单，方便，但是确定也很明显

- 缺点：
- 1、它会把所有的请求参数都在地址栏上面，敏感信息就直接暴露了
- 2、浏览器的地址栏有字符长度的限制，它不适合传递大量的数据，同时也无法传递文件
- post请求就解决了这些问题，post请求时不基于浏览器地址栏的，它会把请求的参数以报文的形式放在请求体当中，这样就可以进行大批量的数据传递
- 在express的框架当中，如果要接收post请求，需要安装一个中间件body-parser

- 安装

- ```cmd
  npm i body-parser --save
  ```

- 导入入口文件配置

- ```js
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({extended:false})) //urlencoded代表地址栏里面的url直接使用encoded解码后使用
  app.use(bodyParser.json({limit:'30mb'})); //把文件数据转成JSON传输，文本内容最大容器设置30MB
  ```

- 最后我们可以设置一个post请求的接口测试

- ```js
  router.post('/add',(req,resp) => {
      console.log(req.body,"1111");
  })
  ```

- > 分析：
  >
  > 正常可以接收到post请求的话，跟随post请求传递的数据会保存在req请求对象的body中
  > 

# express项目制作

- 初始化项目：

- ```cmd
  npm init --yes
  ```

  

- 安装依赖包

- ```cmd
  npm i express mysql --save
  ```

## 1、开始项目的基本功能制作

- 导入数据库操作的封装对象

- 创建项目入口文件index.js

- ```js
  const express = require('express');
  const http = require('http');
  const app = express();
  const server = http.createServer(app);
  server.listen(8080,'0.0.0.0',() => {
      console.log('server is running ...')
  })
  ```

## 2、编写服务层

- 服务层其实就时一个一个的对象，这个对象用于操作对应的数据表，这里对象里面有很多常用的操作数据库的方法，比如增删改查，分页查询等等一系列方法，而且其方法的内部结构非常简单，在不同的方法内准备好需要执行的sql语句，然后再调用数据库封装对象中的excuteSql方法，将准备好的SQL语句作为该方法的参数传入操作数据库即可
- 新建services目录
- 根据数据库来创建service对象
- 根据数据库我们会创建三个service对象，所以我们再services目录下创建三个文件用于分别保存三个服务对象

- 1、admin_info 管理员表 ------- AdminInfoService.js

- 2、room_info 房间表 -------- RoomInfoService.js

- 3、stu_info 学生表 --------- StuInfoService.js

- 现在以roomInfoService为例完成服务对象

- ```js
  class RoomInfoService {
      add(){}
      deleteId(){}
      update(){}
      findId(){}
      query(){}
  }
  ```

  

- 现在我们强制约束，每个service至少有5个方法，但是这样的话就会形成高耦合状态
- 现在我们再中间加一层BaseService，提供一个基础服务，以达到项目解耦的状态
- **思路：继承**
- RoomInfoService ----> 继承 ------> BaseService ------> 继承DButils.js

### 2.1、BaseService功能重构

```js
//公共服务类，主要用于解耦，并提供基础方法
const DButils = require('../utils/DButils.js');
class BaseService extends DButils {
    constructor() {
        super();
        this.tableMap = {
            admin_info: 'admin_info',
            room_info: 'room_info',
            stu_info: 'stu_info'
        };
        this.currentTableName = "";
    }
    async deleteId(id) {
        let strSql = `delete from ${this.currentTableName} where id = ?`;
        let results = await this.excuteSql(strSql, [id]);
        return results.affectedRows > 0 ? true : false;
    }
}
```

- > 分析：
  >
  > 再上面的代码中，为了更好的实现于数据库的解耦关系，我们再当前的BaseService中创建了tabMap对象，用于映射数据表，同时提供一个公共方法deleteId

### 2.2、RoomInfoService.js举例

- ```js
  const BaseService = require('./baseService.js');
  class RoomInfoService extends BaseService {
      constructor() {
          super();
          this.currentTableName = this.tableMap.room_info;
      }
  }
  module.exports = RoomInfoService
  ```

  

## 3、简单工厂模式

- 我们在后面使用功能的适合（需要使用这些service的时候），我们会发现一个高耦合的情况，如果当某一个文件或某几个文件同时都需要使用多个service的时候，我们需要把这些挨个导入并且挨个new一遍才能调里面的方法

- 现在我们需要降低这个耦合性，所以我们会生产一个对象叫做工厂对象，这个工厂专门用于生产所有的service

- ```js
  class ServiceFactory {
      constructor() {
          throw new Error("当前对象不需要new");
      }
      static createRoomInfoService() {
          let RoomInfoService =
              require('../services/RoomInfoService.js');
          return new RoomInfoService;
      }
      //.....
  }
  module.exports = ServiceFactory;
  ```

  - 上面的代码我们手动创建了一个工厂，这样后期我们在使用service的时候统一使用这个ServiceFactory就好，当我们需要使用这个service，可以这些写

  - ```js
    const ServiceFactory = require("./factory/ServiceFactory.js");
    ServiceFactory.createRoomInfoService().deleteId(1);
    ```

  - 这个时候，我们可以看到所有的服务都是由工厂来生产，同时serviceFactory里面的方法都是静态方法，不需要new可以直接调用，而这些工厂内的静态方法的调用直接返回一个new好的服务对象，那么我们就可以直接从这些服务对象中调用服务方法来操作数据库

## 4、抽象工厂模式

```js
const path = require('path');
const fs = require('fs');
const serviceFactory = (() => {
    let obj = {};
    let arr = fs.readdirSync(path.join(__dirname, "../services"));
    //['AdminInfoService.js','BaseService.js','RoomInfoService.js','StuInfoService.js'];
    //构建属性名
    for (let item of arr) {
        let propertyName = item.replace(".js", "").replace(/^[A-Z]/, p => p.toLowerCase());
        let temp =
            require(path.join(__dirname, '../services', item));
        if (typeof temp === "function") {
            obj[propertyName] = Reflect.construct(temp, []);
        }
    }
    return obj;
})();
module.exports = serviceFactory;
```

- > 分析：
  >
  > 在当前的抽象工厂模式下，我们直接读取了services目录，然后找到了文件信息（文件名），动态创建对象，动态导入文件，然后通过反射导入的构造函数来new出来服务对象
  >
  > 后期由新的数据表，我们就可以会有新的服务对象，那么就会在services目录创建新的xxxxService.js，这个时候抽象工厂会自动帮我们反射出来进行实例化，然后做到自己的工厂对象内部的属性上面

## 5、制作room_info路由

- 先制作一个用于查询表数据的服务方法，由于所有的表都可以支持完整的表查询服务，所以我们把这个服务方法做成一个基础方法由BaseService.js来提供

```js
//公共服务类，主要用于解耦，并提供基础方法
const DButils = require('../utils/DButils.js');
class BaseService extends DButils {
    constructor() {
        super();
        this.tableMap = {
            admin_info: 'admin_info',
            room_info: 'room_info',
            stu_info: 'stu_info'
        };
        this.currentTableName = "";
    }
    //表数据查询
    getAllList() {
        let strSql = `select * from ${this.currentTableName}`;
        return this.excuteSql(strSql);
    }
}
module.exports = BaseService
```

- 继承至该BaseService的服务对象就都可以继承到这个方法

- 新建routes目录，创建roomInfoRoute.js文件

- ```js
  const express = require('express');
  const router = express.Router();
  const serviceFactory = require('../ServiceFactory/ServiceFactory.js');
  router.get('/roomInfoList', async (req, resp) => {
      try {
          let results = await
              serviceFactory.roomInfoService.getAllList();
          resp.json(results);
      } catch (error) {
          console.log(error);
      }
  });
  module.exports = router;
  ```

  - 在入口文件中导入room_info的路由对象加载到应用实例中

  - ```js
    app.use('/roomInfo',require('./routes/roomInfoRoute.js'))
    ```

  - 那么，现在应该是可以在浏览器中直接输入以下地址可以获取到房间信息表中的所有房间信息的JSON数据

  - ```
    http://127.0.0.1:8080/roomInfo/roomInfoList
    ```

    

## 6、跨域请求

- 我们先准备一个前端的页面

- ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initialscale=1.0">
      <title>Document</title>
      <script src="js/jquery-3.5.1.min.js"></script>
  </head>
  
  <body>
      <script>
          $(function () {
              $.get('http://127.0.0.1:8080/roomInfo/roomInfoList', function (res
              ) {
                  console.log(res);
              });
          })
      </script>
  </body>
  
  </html>
  
  ```

- 当我们通过前端网页发送了一个ajax请求的时候报错了，因为这个ajax请求不允许跨域的数据产生

- > **什么是跨域？**
  >
  > 这个是一个浏览器安全策略的设置导致的一个问题，这个安全策略叫做同源策略，当请求来源于请求去向不一致的时候，就会发生跨域的问题

- ajax跨域是一个非常常见的问题，也是必须要解决得到问题，解决方式：
- 1、反射代理
- 2、通过在服务端添加响应头实现CORS
- 3、jsonp
- 设置cors拦截器

```js
const express = require('express');
const http = require('http');
const app = express();
//cors拦截器
app.use((req, resp, next) => {
    resp.setHeader("Access-control-Allow-Origin", "*");
    resp.setHeader("Access-control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    resp.setHeader("Access-control-Allow-Headers", "content-type");
    next();
});
app.use('/roomInfo', require('./routes/roomInfoRoute.js'));
const server = http.createServer(app);
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running ...');
})
```

- > 注意点：
  >
  > 这个拦截器一定要设置在服务器启动与路由加载之前

## 7、封装返回的JSON数据

- ```js
  {
      status："success",
      msg:"数据请求成功",
      data:[]
  }
  ```

- 创建一个model目录，新建啊一个ResultJson.js

- ```js
  class ResultJson{
      constructor(flag,msg,data=[]){
          this.status = flag ? "success" : "fail";
          this.msg = msg;
          this.data = data;
      }
  }
  module.exports = ResultJson;
  ```

- 现在我们给仅有的一个服务方法getAllList执行的响应结果套用上上面的响应数据结构

- ```js
  //......
  const ResultJson = require('../model/ResultJson.js');
  router.get('/roomInfoList', async (req, resp) => {
      try {
          let results = await
              serviceFactory.roomInfoService.getAllList();
          resp.json(new ResultJson(true, "数据请求成功", results));
      } catch (error) {
          console.log(error);
      }
  });
  module.exports = router;
  ```

  

# express后端项目搭建 -- 房间信息模块

- 现在我们首先制作一个用于房间信息查询的方法，该方法的制作可以看作是一个综合查询的方法，并且不是单一的某一种查询方式
- 对于当前应用场景来看，我们需要制作一个搜索查询（模糊查询）和分页查询为一体的查询服务方法

## 1、制作查询方法

- 在RoomInfoService.js中的构造函数内插入新的查询方法

- ```js
  getListByPage({ room_name }){
      let strSql = `select * from ${this.currentTableName} where 1`;
      let ps = [];
      if (room_name) {
          strSql += ` and room_name like ?`;
          ps.push(`${room_name}`);
      }
      return this.excuteSql(strSql, ps);
  }
  ```

- 然后再路由中调用该方法查询房间信息

- ```js
  router.get('/getListByPage', async (req, resp) => {
      try {
          let results = await
              serviceFactory.roomInfoService.getListByPage(req.query);
          resp.json(new ResultJson(true, "数据请求成功", results));
      } catch (error) {
          resp.status(500).json(new ResultJson(false, "数据请求失败", error));
      }
  })
  ```

- 制作一个roomInfoList.html前端页面，准备好基本的html结构之后，我们发送请求

- ```js
  
      $(function () {
          $("#btn-query").on("click", function () {
              $.get("http://127.0.0.1:8080/roomInfo/getListByPage?room_name = " + 										$("#room_name").val(), function (res) {
                  console.log(res);
              });
          });
      })
  ```

  - > 分析：
    >
    > 这里我们html中会设置一个根据房间名来搜索的功能，同时准备一个搜索按钮btn-query，当点击搜索按钮的时候，如果搜索框内有房间名就根据房间所搜结果，如果没有就直接查询全部房间信息

- 当以上请求可以正常拿到数据之后，我们就开始制作渲染数据所需要的模板，这里我们使用template-web来实现原生的html数据渲染

```html
<script type="text/html" id="temp1">
    {{each roomInfoList item index}}
    <tr>
    <td><input type="checkbox"></td>
    <td>{{item.room_name}}</td>
    <td>{{item.max_count}}</td>
    <td><span class="p-1 text-light rounded {{item.kt == 1 ?
    'bg-success':'bg-danger'}}">{{item.kt == 1 ? "有":"无"}}</span>
    </td>
    <td><span class="p-1 text-light rounded {{item.network ==
    1 ? 'bg-success':'bg-danger'}}">{{item.network == 1 ? "有":"无"}}
    </span></td>
    <td><span class="p-1 text-light rounded {{item.washroom
    == 1 ? 'bg-success':'bg-danger'}}">{{item.washroom == 1 ?
    "有":"无"}}</span></td>
    <td>{{item.room_size}}</td>
    <td>{{item.max_count}}</td>
    <td>
    <a href="#" class="btn btn-warning btn-sm">编辑</a>
    <a href="#" class="btn btn-danger btn-sm">删除</a>
    </td>
    </tr>
    {{/each}}
</script>
```

- 修改get请求把响应的数据在template中渲染好之后，插入到tbody中

- ```js
  $(function () {
      $("#btn-query").on("click", function () {
          $.get("http://127.0.0.1:8080/roomInfo/getListByPage?room_name = " + 							$("#room_name").val(), function (res) {
              var htmlStr = template("temp1", {
                  roomInfoList: res.data
              });
              $("#table-roomInfo>tbody").html(htmlStr);
          });
      });
  })
  ```

- 现在，当我们点击查询按钮的时候就可以看到渲染结果了

- > **扩展：jQ的AJAX二次封装**
  >
  > 这里我们利用JQuery提供的ajax方法对其进行二次封装，方便后续调用
  >
  > ```js
  > var baseURL = "http://127.0.0.1:8080";
  > var request = {
  >     get: function (url, data) {
  >         return new Promise(function (resolve, reject) {
  >             $.ajax({
  >                 method: 'get',
  >                 url: baseURL + url,
  >                 data: data,
  >                 success: function (res) {
  >                     resolve(res);
  >                 },
  >                 error: function (error) {
  >                     reject(error);
  >                 }
  >             });
  >         });
  >     },
  >     post: function () {
  >         return new Promise(function (resolve, reject) {
  >             $.ajax({
  >                 method: 'post',
  >                 url: baseURL + url,
  >                 data: data,
  >                 success: function (res) {
  >                     resolve(res);
  >                 },
  >                 error: function (error) {
  >                     reject(error);
  >                 }
  >             });
  >         });
  >     }
  > }
  > ```
  >
  > 

## 2、分页查询

- 上面我们已经把所有的房间信息全部渲染出来了，但是太长了，需要进行分页管理，所以我们现在需要对我们的查询数据进行分页查询

- 在做分页查询的时候首先我们一定要先确定每页显示的数量，不然分页查询无从查起

- 在BaseService.js中添加一个属性用来决定一页显示多少条数据

- ```js
  this.pageSize = 10;
  ```

  

  

  - 要做成分页查询我们需要知道的数据

  - 1、当前查询第几页 pageIndex

  - 2、共有多少页 pageCount

  - 3、共多少条数据 totalCount

  - 在model目录下创建一个pageList.js

```js
class PageList {
    constructor(pageIndex, totalCount, listData, pageSize) {
        this.pageIndex = pageIndex;
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / pageSize);
        this.listData = listData;
        this.pageStart = this.pageIndex - 3 > 0 ? this.pageIndex
            - 3 : 1;
        this.pageEnd = this.pageStart + 6 > this.pageCount ?
            this.pageCount : this.pageStart + 6;
    }
}
module.exports = PageList;
```

-  以上就做为分页查询专属的数据模板进行使用
- 现在我们把getListByPage方法进行完善

```js
const BaseService = require('./BaseService.js');
const PageList = require("../model/PageList.js");
class RoomInfoService extends BaseService {
    //.......
    async getListByPage({ room_name, pageIndex }) {
        let strSql = `select * from ${this.currentTableName} where 1`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where 1`;
        let strWhere = ``;
        let ps = [];
        if (room_name) {
            strWhere += ` and room_like ?`;
            ps.push(`${room_name}`);
        }
        strSql += ` ${strWhere} limit ${(pageIndex - 1) *
            this.pageSize},${this.pageSize}`;
        countSql += strWhere;
        let results = await this.excuteSql(strSql + ";" +
            countSql, [...ps, ...ps]);
        let pageList = new PageList(pageIndex, results[1]
        [0].total_count, this.pageSize, results[0]);
        return pageList;
    }
}
module.exports = RoomInfoService
```

- 然后我们来改造前端请求

```js
$(function () {
    var currentPageIndex = 1;
    function getData(pageIndex) {
        var loading = Qmsg.loading("正在加载数据中...");
        request.get("/roomInfo/getListByPage", {
            pageIndex: pageIndex,
            room_name: $("#room_name").val()
        }).then(function (res) {
            if (res.status == "success") {
                console.log(res);
                Qmsg.success("数据获取成功");
                var htmlStr = template("temp1", {
                    roomInfoList: res.data.listData
                });
                $("#table-roomInfo>tbody").html(htmlStr);
                //渲染页码
                var htmlStr2 = template("temp2", {
                    pageCount: res.data.pageCount,
                    pageIndex: res.data.pageIndex,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd
                });
                $(".pagination").html(htmlStr2);
                //总数渲染
                var htmlStr3 = template("temp3", {
                    pageCount: res.data.pageCount,
                    pageIndex: res.data.pageIndex,
                    totalCount: res.data.totalCount
                });
                $("#page-list-info").html(htmlStr3);
            }
        }).catch(function (error) {
            console.log(error);
            Qmsg.error("服务器错误");
        }).finally(function () {
            loading.close();
        });
    }
    getData(currentPageIndex);
    $(".pagination").on("click", "li", function () {
        var index = $(this).attr("data-index");
        getData(index);
        currentPageIndex = index;
    });
})
```

- 同时制作对应的模板

```html
<script type="text/html" id="temp2">
    <li data-index="1" class="page-item"><a href="#"
    class="page-link">首页</a></li>
    <%for(var i = pageStart; i <= pageEnd;i++){%>
    <li data-index="{{i}}" class="page-item"><a href="#"
    class="page-link">{{i}}</a></li>
    <%}%>
    <li data-index="{{pageCount}}" class="page-item"><a
    href="#" class="page-link">尾页</a></li>
</script>
<script type="text/html" id="temp3">
    当前第{{pageIndex}}，共{{pageCount}}页，共{{totalCount}}条
</script>

```

## 3、配置项目热启动

- 在进行node项目开发的时候，我们更改了项目的源代码之后，我们希望项目自动重新启动，这个技术叫做热启动，它需要一个第三包来实现

- ```cmd
  npm i nodemon --save-dev
  ```

- 在package.json中配置启动脚本

- ```cmd
  "dev": "nodemon --watch ./"
  ```

## 4、编辑房间信息

- 把之前渲染的表格模板中的后面两个按钮中的a连接，改一下

- ```html
  <td>
      <a href="./editRoomInfo.html?id={{item.id}}" class="btn btnwarning btn-sm">编辑</a>
      <a href="#" class="btn btn-danger btn-sm">删除</a>
  </td>
  ```

- 制作新的用于通过id查询房间信息的服务

- roomInfoService.js

- ```js
   async findById(id){
      let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
      let results = await this.excuteSql(strSql, [id]);
      return results[0];
  }
  ```

  

- 新建后端路由，制作对应的数据接口分配新做的服务方法

- roomInfoRoute.js

- ```js
  
  router.get('/findById', async (req, resp) => {
      try {
          let { id } = req.query;
          let results = await
              serviceFactory.roomInfoService.findById(id);
          resp.json(new ResultJson(true, "数据请求成功", results));
      } catch (error) {
          resp.status(500).json(new ResultJson(false, "数据请求失败", error));
      }
  })
  ```

  

- 现在可以在编辑页面中渲染需要编辑的房间信息，然后我们通过修改编辑页面中的表单数据进行房间信息修改
- 所以，这里先需要在房间编辑页面中请求对应id的房间信息
- 在后端中就需要编写对应的服务与路由
- RoomInfoService.js

```js
async findById(id){
    let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
    let results = await this.excuteSql(strSql,[id]);
    return results[0]
}
```

- roomInfoRoute.js

  ```js
  router.get('/findById', async (req, resp) => {
      try {
          let { id } = req.query;
          let results = await
              serviceFactory.roomInfoService.findById(id);
          resp.json(new ResultJson(true, "数据请求成功", results));
      } catch (error) {
          resp.status(500).json(new ResultJson(false, "数据请求失败", error));
      }
  })
  ```

- 制作前端编辑页面的房间信息请求

- ```js
   $(function () {
      function getById() {
          //获取浏览器地址上的id
          var u = new URL(location.href);
          var id = u.searchParams.get("id");
          var loading = Qmsg.loading("数据加载中...");
          request.get("/roomInfo/findById", {
              id: id
          }).then(function (res) {
              if (res.status == "success") {
                  var htmlStr = template("temp1", {
                      roomInfo: res.data
                  });
                  $("#form-addRoomInfo").html(htmlStr);
              }
          }).catch(function (error) {
              console.log(error);
              Qmsg.error("服务器错误");
          }).finally(function () {
              loading.close();
          });
      }
      getById();
  })
  ```

-  然后我们可以开始编辑房间信息并保存数据

- 这里我们保存数据使用post请求（一般情况下往数据库中写入数据我们都使用post请求），所以记得安装body-parser用于解析post请求

```js
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }))
```

- > 注意：
  >
  > bodyParser的use配置一定要在cors拦截器之前，不然无法解析req.body

- 开始制作修改房间信息的服务

- RoomInfoService.js

```js
async update({ id, room_name, max_count, kt, network, washroom, room_size }){
            let strSql = `update rental_house.room_info set room_name=?,max_count=?,kt=?,network=?,washroom=?,room_size=? where id=?`;
            let results = await this.excuteSql(strSql, [room_name, max_count, kt, network, washroom, room_size, id]);
            return results.affectRows > 0 ? true : false;
        }
```

- roomInfoRoute.js

```js
router.post('/update', async (req, resp) => {
    try {
        let results = await
            serviceFactory.roomInfoService.update(req.body);
        resp.json(new ResultJson(results, results ? "修改成功" : "修改失败"));
    } catch (error) {
        resp.status(500).json(new ResultJson(false, "请求失败", error));
    }
})
```

- 前端制作修改请求

```js
 function saveData() {
    var loading = Qmsg.loading("正在保存中...");
    request.post("/roomInfo/update", {
        id: $("#id").val(),
        room_name: $("#room_name").val(),
        max_count: $("#max_count").val(),
        kt: $("[name='kt']:checked").val(),
        network: $("[name='network']:checked").val(),
        washroom: $("[name='washroom']:checked").val(),
        room_size: $("#room_size").val()
    }).then(function (res) {
        Qmsg.success("保存成功");
        location.replace("./roomInfoList.html");
    }).catch(function (error) {
        console.log(error);
        Qmsg.error("保存失败");
    }).finally(function () {
        loading.close();
    });
}
$("#form-addRoomInfo").on("click", "#btn-save", saveData)
```

## 5、删除房间信息

- 关于删除操作，一般来说数据库管理员是不会给我们直接删除数据的权限的，所以，我们其实执行所谓的删除操作本质上来讲是一个update更新操作，一般我们会给一张表中的数据添加一个用于执行逻辑删除（软删除）的字段，我们通过修改这个字段的值，配合查询的限制条件来实现逻辑删除

- 这里我们就以room_info表中的isDel字段为例来进行说明，该字段是一个非空字段，起值只会是0或者1，我们通过在查询时添加对应字段的限制条件来限制查询结果，从而达到删除的效果

- 现在先对之前的查询方法进行修改

- RoomInfoService.js

- ```js
  async deleteId({ id }){
      let strSql = `update ${this.currentTableName} set isDel = true where id = ?`;
      let results = await this.excuteSql(strSql, [id]);
      return results.affectedRows > 0 ? true : false;
  }
  ```

- roomInfoRoute.js

- ```js
  router.get('/delete', async (req, resp) => {
      try {
          let results = await
              serviceFactory.roomInfoService.deleteId(req.query);
          resp.json(new ResultJson(results, results ? "修改成功" : "修改失败"));
      } catch (error) {
          resp.status(500).json(new ResultJson(false, "请求失败", error));
      }
  })
  ```

  - 在前端制作请求

- > 这里我们在删除的按钮上面添加一个自定义属性data-id用于在数据渲染时记录当前渲染的这条数据的id，方便我们在删除时知道要删除的这条数据的id是多少

```js
function deleteId(id) {
    var loading = Qmsg.loading("正在删除中...");
    request.get('/roomInfo/delete', {
        id: id
    }).then(function (res) {
        if (res.status == "success") {
            Qmsg.success("删除成功");
            getData(currentPageIndex);
        }
    }).catch(function (error) {
        Qmsg.error("删除失败");
    }).finally(function () {
        loading.close();
    });
}
$("#table-roomInfo>tbody").on("click", "#btn-delete", function () {
    var index = $(this).attr("data-id");
    deleteId(index);
})
```

## 6、Excel导出

- 这里我们制作一个将当前房间信息表中的所有数据导出成excel的功能

- RoomInfoService.js

```js
async exportExcel({ room_name }){
    let strSql = `select * from ${this.currentTableName} where isDel = false`;
    let strWhere = ``;
    let ps = [];
    if (room_name) {
        strWhere += ` and room_name like ?`;
        ps.push(room_name);
    }
    strSql += strWhere;
    return this.excuteSql(strSql, ps);
}
```

- 现在我们需要把查询到的数据写入到excel表格中，所以需要一个第三方中间件支持

- ```cmd
  npm i node-xlsx --save
  ```

  

- 编写用于创建excel表格第三方工具类

```js
const xlsx = require("node-xlsx");
const path = require("path");
const fs = require("fs");
class ExcelUtils {
    static resultsToExcel(results) {
        if (results.length > 0) {
            let headRow = Object.keys(results[0]);
            let dataRows = results.map(item =>
                Object.values(item));
            dataRows.unshift(headRow);
            let excelObj = {
                name: "sheet1",
                data: dataRows
            };
            let savePath =
                path.join(__dirname, "../excelDir", `${Date.now()}-${parseInt(Math.
                    random() * 1000)}.xlsx`);
            let excelBuffer = xlsx.build([excelObj]);
            fs.writeFileSync(savePath, excelBuffer);
            return savePath;
        } else {
            return "";
        }
    }
}
module.exports = ExcelUtils;
```

- roomInfoRoute.js导入写好的excel工具类

```js
router.get("/exportExcel", async (req, resp) => {
    let results = await
        serviceFactory.roomInfoService.exportExcel(req.query);
    let excelPath = ExcelUtils.resultsToExcel(results);
    if (excelPath) {
        resp.sendFile(excelPath);
    } else {
        resp.status(500).json(new ResultJson(false, "excel没有数据，不能下载"));
    }
})
```

- 前端制作请求获取excel文件下载

```js
$(".btn-export-excel").on("click", function () {
    window.open(baseURL + "/roomInfo/exportExcel?room_name=" +
        $("#room_name").val());
})
```

- 现在，我们可以完成excel表格导出与下载，但是现在有新问题了，随着时间推移导出excel的次数越来越多，在服务器中堆积的excel文件就会越来越多，挤占服务器空间，所以我们需要定期清理
- 这个时候我们在启动项目的时候在入口文件index.js中添加一个定时器，去完成清理

```js
const path = require("path");
const fs = require("fs");
server.listen(8080, '0.0.0.0', () => {
    console.log('server is running ...');
    const deleteExcelFile = () => {
        let excelDirPath = path.join(__dirname, "./excelDir");
        let arr = fs.readdirSync(excelDirPath);
        for (let item of arr) {
            let fileCreateTime = item.split("-")[0];
            if (Date.now() - fileCreateTime > 5 * 60 * 1000) {
                fs.unlinkSync(path.join(excelDirPath, item));
            }
        }
    };
    deleteExcelFile();
    setInterval(deleteExcelFile, 5 * 60 * 1000);
})
```

## 7、全局异常捕获

- 在路由当中，我们写了很多的try...catch 异常捕获

- 在 express框中提供了一个中间件express-async-errors ，这个包可以实现全局异常获取，这样我们可以简化非常多的代码

- 安装包

- ```cmd
  npm i express-async-errors --save
  ```

- 在入口文件中导入全局异常捕获并进行配置

- ```js
  require('express-async-errors');
  const ResultJson = require("./model/ResultJson.js");
  //......
  app.use((error, req, resp, next) => {
      resp.status(500).json(new ResultJson(false, "数据请求失败", error));
      next();
  })
  ```

  
