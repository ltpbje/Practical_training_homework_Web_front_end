// 游戏背景地图;
// x, y, img, width, height;


import assetsConfig from "./assetsConfig.js";

// 定义一个背景类
class Background {
    // 构造函数，初始化背景的坐标、图片、宽度和高度
    constructor() {
        this.x = 0;
        this.y = 0;
        this.img = assetsConfig.imgList[0];
        this.width = this.img.width;
        this.height = this.img.height;
    }
    // 绘制背景
    draw(ctx) {
        ctx.drawImage(this.img,
            this.x,
            this.y,
            this.width,
            this.height);
    }
}


export default Background;