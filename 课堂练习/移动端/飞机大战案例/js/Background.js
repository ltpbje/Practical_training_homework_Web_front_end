// 游戏背景地图;
// x, y, img, width, height;


import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
// 定义一个背景类
class Background extends GameObject {
    // 构造函数，初始化背景的坐标、图片、宽度和高度
    constructor() {
        // 从assetsConfig.imgList中获取第一张图片
        let img = assetsConfig.imgList[0];
        // 调用父类的构造函数，传入参数0，-img.height / 2，img
        super(0, -img.height / 2, img);
        // 设置速度为1
        this.speed = 1;
    };
    // 绘制背景
    draw(ctx) {
        this.move();
        super.draw(ctx);
    };
    move() {
        // 将对象的y坐标增加
        this.y += this.speed;
        // 如果对象的y坐标大于0
        if (this.y > 0) {
            // 将对象的y坐标设置为负的高度的一半
            this.y = -this.height / 2;
        }
    }
}


export default Background;