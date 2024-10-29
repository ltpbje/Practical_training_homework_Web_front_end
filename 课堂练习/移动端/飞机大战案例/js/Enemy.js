// 敌机


import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
import gameContainer from "./gameContainer.js";
import gameConfig from "./gameConfig.js";


export default class Enemy extends GameObject {
    constructor() {
        // 生成一个0-100之间的随机数
        let temp = parseInt(Math.random() * 100);
        // 初始化图片变量
        let img = null;
        // 如果随机数小于15
        if (temp < 15) {
            // 图片变量赋值为assetsConfig.imgList中的第3个元素
            img = assetsConfig.imgList[3];
        } else {
            // 否则，图片变量赋值为assetsConfig.imgList中的第4个元素
            img = assetsConfig.imgList[4];
        }
        // 生成一个0-gameConfig.gameWidth之间的随机数
        let x = parseInt(Math.random() * (gameConfig.gameWidth - 100));
        // 调用父类构造函数，传入x坐标、y坐标和图片
        super(x, 0, img);
        // 生成一个1-3之间的随机数，并加1，赋值给speed
        this.speed = parseInt(Math.random() * 3) + 2;
    }
    move() {
        this.y += this.speed;
        // 移除自己
        if (this.y > gameConfig.gameHeight) {
            let index = gameContainer.enemyList.indexOf(this);
            if (index != -1) {
                gameContainer.enemyList.splice(index, 1);
            }
        }
    };
    draw(ctx) {
        this.move();
        super.draw(ctx);
    }
}