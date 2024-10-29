// 玩家子弹
// 玩家的飞机在哪里 玩家的子弹就在那里发射



import GameObject from "./GameObject.js";
import assetsConfig from "./assetsConfig.js";
import gameContainer from "./gameContainer.js";


export default class Bullet extends GameObject {
    constructor(x, y) {
        // 从assetsConfig.imgList中获取第3张图片
        let img = assetsConfig.imgList[2];
        // 调用父类的构造函数，传入x、y和图片
        super(x, y, img);
        // 设置宽度为图片的宽度
        this.width = img.width;
        // 设置高度为图片的高度
        this.height = img.height;
        // 设置速度为20
        this.speed = 20;
    };
    move() {
        this.y -= this.speed;
        // 子弹打到边界的时候
        if (this.y < 0) {
            // 获取子弹在子弹列表中的索引
            let index = gameContainer.bulletList.indexOf(this);
            // 如果索引存在
            if (index != -1) {
                // 从子弹列表中删除该子弹
                gameContainer.bulletList.splice(index, 1);
            }
        }
    };
    // 绘制函数
    draw(ctx) {
        // 移动
        this.move();
        // 调用父类的绘制函数
        super.draw(ctx);
    };
};