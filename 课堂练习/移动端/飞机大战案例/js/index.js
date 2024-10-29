import assetsConfig from "./assetsConfig.js";
import Background from "./Background.js";
import Hero from "./Hero.js";
import gameContainer from "./gameContainer.js";
import GameObject from "./GameObject.js";
import gameConfig from "./gameConfig.js";
import Enemy from "./Enemy.js";
const gameControl = {
    dom: {
        game: document.querySelector('#game')
    },
    data: {
        gameWidth: 512,
        gameHeight: 768,
        ctx: null,
        p1FireTimerID: null
    },
    // gameContainer: {
    //     //游戏容器，专业存入在页面上需要使用的游戏对象
    //     bg: null,
    //     p1: null
    // },
    bindEvent() {
        this.dom.game.addEventListener('mousemove', event => {
            // 获取鼠标在游戏区域内的坐标
            let { offsetX, offsetY } = event;
            // 如果游戏区域有玩家1，则调用玩家1的移动方法
            if (gameContainer.p1) {
                gameContainer.p1.move(offsetX - 50, offsetY - 50);
            }
        });
        // 监听鼠标按下事件，如果按下的是左键，则调用玩家1的射击方法
        this.dom.game.addEventListener('mousedown', event => event.button == 0 && this.p1Fire()
        );
        // 监听鼠标松开事件，调用玩家1的停止射击方法
        document.addEventListener('mouseup', event => {
            this.p1StopFire();
        });
    },
    async init() {
        // 设置游戏区域的宽度和高度
        this.dom.game.width = gameConfig.gameWidth;
        this.dom.game.height = gameConfig.gameHeight;
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
        this.addEnemy();
        this.draw();


    },
    p1Fire() {
        // 玩家一飞机开火方法
        this.data.p1FireTimerID = setInterval(() => {
            if (gameContainer.p1) {
                gameContainer.p1.fire();
            }
        }, 90);
    },
    p1StopFire() {
        // 玩家一飞机停火方法
        clearInterval(this.data.p1FireTimerID);
    },
    addEnemy() {
        //添加敌机
        setInterval(() => {
            let { maxEnemyCount } = gameConfig;
            let count = maxEnemyCount - gameContainer.enemyList.length;
            for (let i = 0; i < count; i++) {
                let e = new Enemy();
                gameContainer.enemyList.push(e);

            }

        }, 250);
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
                } else if (gameContainer[item] instanceof Array) {
                    gameContainer[item].forEach(item2 => {
                        item2.draw(this.data.ctx);
                    });
                }
            });
        }, 20);
    }
};




gameControl.init();