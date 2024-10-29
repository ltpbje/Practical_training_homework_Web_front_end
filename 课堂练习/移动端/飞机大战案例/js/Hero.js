// 玩家飞机


import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
import Bullet from "./Bullet.js";
import gameContainer from "./gameContainer.js";
import gameConfig from "./gameConfig.js";
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
        if (x < 0) {
            x = 0;
        } else if (x > gameConfig.gameWidth - this.width) {
            x = gameConfig.gameWidth - this.width;
        }
        if (y < 0) {
            y = 0;
        } else if (y > gameConfig.gameHeight - this.height) {
            y = gameConfig.gameHeight - this.height;
        }

        this.x = x;
        this.y = y;
    }

    fire() {
        let b = new Bullet(this.x, this.y);
        // 修正子弹坐标
        b.x = b.x + this.width / 2 - b.width / 2;
        gameContainer.bulletList.push(b);
    }
}


export default Hero;