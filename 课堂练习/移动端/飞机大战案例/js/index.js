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

    }
};




gameControl.init();