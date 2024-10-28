import assetsConfig from "./assetsConfig.js";
import Background from "./Background.js";
import Hero from "./Hero.js";
import gameContainer from "./gameContainer.js";
import GameObject from "./GameObject.js";
const gameControl = {
    dom: {
        game: document.querySelector('#game')
    },
    data: {
        gameWidth: 512,
        gameHeight: 768,
        ctx: null
    },
    // gameContainer: {
    //     //游戏容器，专业存入在页面上需要使用的游戏对象
    //     bg: null,
    //     p1: null
    // },
    bindEvent() {
        this.dom.game.addEventListener('mousemove', event => {
            let { offsetX, offsetY } = event;
            if (gameContainer.p1) {
                gameContainer.p1.move(offsetX - 50, offsetY - 50);
            }
        });
    },
    async init() {
        // 设置游戏区域的宽度和高度
        this.dom.game.width = this.data.gameWidth;
        this.dom.game.height = this.data.gameHeight;
        // 获取游戏区域的绘图上下文
        this.data.ctx = this.dom.game.getContext('2d');
        // 加载游戏资源
        await assetsConfig.loadAssets(); ///调用加载资源的方法
        this.bindEvent();
        // 创建一个背景对象
        gameContainer.bg = new Background();
        // 创建一个飞机Hero对象，并将其赋值给gameContainer的p1属性
        gameContainer.p1 = new Hero();
        // // 在画布上绘制背景
        // this.gameContainer.bg.draw(this.data.ctx);
        this.draw();


    },
    draw() {
        setInterval(() => {
            // 在画布上绘制背景
            // this.gameContainer.bg.draw(this.data.ctx);
            // this.gameContainer.p1.draw(this.data.ctx);
            // 反射
            Reflect.ownKeys(gameContainer).forEach(item => {
                if (gameContainer[item] && gameContainer[item] instanceof GameObject) {
                    gameContainer[item].draw(this.data.ctx);
                }
            });
        }, 20);
    }
};




gameControl.init();