// 游戏背景地图;
// x, y, img, width, height;


import assetsConfig from "./assetsConfig.js";

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.img = assetsConfig.imgList[0];
        this.width = this.img.width;
        this.height = this.img.height;
    }
    draw(ctx) {
        ctx.drawImage(this.img,
            this.x,
            this.y,
            this.width,
            this.height);
    }
}


export default Background;