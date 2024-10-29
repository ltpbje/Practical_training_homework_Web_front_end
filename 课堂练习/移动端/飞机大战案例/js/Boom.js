// 爆炸动画对象

import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
import gameContainer from "./gameContainer.js";




export default class Boom extends GameObject {
    constructor(x, y) {
        let img = assetsConfig.imgList[5];
        super(x, y, img);
        this.width = 0;
        this.height = 0;
    }
    // 由于这里我们希望实现爆炸效果有小变大的缩放效果  所以我们这里重写draw方法
    draw(ctx) {

        this.width += 2;

        this.height += 2;
        this.x -= 1;
        this.y -= 1;
        super.draw(ctx);
        if (this.width > this.img.width || this.height > this.img.height) {
            let index = gameContainer.boomList.indexOf(this);
            if (index != -1) {
                gameContainer.boomList.splice(index, 1);
            }

        }
    }
}
