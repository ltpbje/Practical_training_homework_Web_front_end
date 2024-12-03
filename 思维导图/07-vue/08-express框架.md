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