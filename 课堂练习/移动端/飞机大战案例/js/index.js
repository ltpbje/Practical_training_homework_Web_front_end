import assetsConfig from "./assetsConfig.js";
import Background from "./Background.js";
const gameControl = {
    dom: {
        game: document.querySelector('#game')
    },
    data: {
        gameWidth: 512,
        gameHeight: 768,
        ctx: null
    },
    gameContainer: {
        //游戏容器，专业存入在页面上需要使用的游戏对象
        bg: null
    },
    bindEvent() {

    },
    async init() {
        // 设置游戏区域的宽度和高度
        this.dom.game.width = this.data.gameWidth;
        this.dom.game.height = this.data.gameHeight;
        // 获取游戏区域的绘图上下文
        this.data.ctx = this.dom.game.getContext('2d');
        // 加载游戏资源
        await assetsConfig.loadAssets(); ///调用加载资源的方法
        // 创建一个背景对象
        this.gameContainer.bg = new Background();
        // 在画布上绘制背景
        this.gameContainer.bg.draw(this.data.ctx);
    }
};




gameControl.init();