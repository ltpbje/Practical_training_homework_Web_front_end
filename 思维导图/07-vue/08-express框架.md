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

  