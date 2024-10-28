// 


class GameObject {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
    }
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}


export default GameObject;

