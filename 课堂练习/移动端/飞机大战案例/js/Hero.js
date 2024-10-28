// 玩家飞机


import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
class Hero extends GameObject {
    constructor() {
        let img = assetsConfig.imgList[1];
        super(200, 500, img);
    }
    // draw(ctx) {
    //     ctx.drawImage(
    //         this.img,
    //         this.x,
    //         this.y,
    //         this.width,
    //         this.height
    //     );
    // }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}


export default Hero;