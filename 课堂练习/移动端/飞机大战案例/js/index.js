import assetsConfig from "./assetsConfig.js";
import Background from "./Background.js";
import Hero from "./Hero.js";
import gameContainer from "./gameContainer.js";
import GameObject from "./GameObject.js";
import gameConfig from "./gameConfig.js";
import Enemy from "./Enemy.js";
import Boom from "./Boom.js";
// 分数
let score = 0;
const gameControl = {
    dom: {
        game: document.querySelector('#game'),
        clearScore: document.querySelector('.clearScore'),
        start_game: document.querySelector('#start_game')
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
        this.dom.clearScore.addEventListener('click', function () {
            localStorage.removeItem('score');
            score = 0;
            document.querySelector('.score').innerText = '0分';
        });
        // this.dom.start_game.addEventListener('click', () => {
        //     gameControl.init();
        //     this.dom.game.style.visibility = 'visible';

        // });
    },
    async init() {
        // 检测本地是否存有分数
        if (localStorage.getItem('score')) {
            score = +localStorage.getItem('score');
            document.querySelector('.score').innerText = localStorage.getItem('score') + '分';
        } else {
            score = 0;
            document.querySelector('.score').innerText = '0分';
        }
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
    checkCrash(a, b) {
        // a 子弹  b 敌机
        // 检测两个对象是否相交
        // 撞不上
        if (a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y
        ) {
            return false;
        } else {
            return true;
        }
    },
    checkBulletAndEnemyCrash() {
        // 检测子弹与敌机相撞
        for (let i = gameContainer.bulletList.length - 1; i >= 0; i--) {
            for (let j = gameContainer.enemyList.length - 1; j >= 0; j--) {
                let b = gameContainer.bulletList[i];
                let e = gameContainer.enemyList[j];
                let result = this.checkCrash(b, e);
                if (result) {
                    // console.log(gameContainer.enemyList[j].width);
                    // 小飞机加5分
                    if (gameContainer.enemyList[j].width == 108) {

                        score += 5;
                        document.querySelector('.score').innerText = score + '分';
                    }

                    // 大飞机加5分
                    if (gameContainer.enemyList[j].width > 108) {
                        score += 10;
                        document.querySelector('.score').innerText = score + '分';
                    }
                    // 本地持久化存储 分数
                    localStorage.setItem('score', score);
                    gameContainer.bulletList.splice(i, 1);
                    gameContainer.enemyList.splice(j, 1);
                    // 加入生成爆炸的操作
                    let boom = new Boom(e.x + e.width / 2, e.y + e.height / 2);
                    gameContainer.boomList.push(boom);
                    break;
                }
            }
        }
    },
    draw() {
        setInterval(() => {
            // 检查是否相撞
            gameControl.checkBulletAndEnemyCrash();
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

gameControl.dom.start_game.addEventListener('click', () => {
    gameControl.init();
    gameControl.dom.game.style.visibility = 'visible';
    gameControl.dom.start_game.disabled = true;
});

document.querySelector('.select_menu .level_title').addEventListener('click', function () {
    const levelList = document.querySelectorAll('.select_menu .level');
    // console.log(levelList[0].style.lineHeight);

    if (levelList[0].style.lineHeight == "30px") {

        for (let i = 0; i < levelList.length; i++) {
            levelList[i].style.lineHeight = '0px';
        }
    } else {
        // console.log(levelList);
        for (let i = 0; i < levelList.length; i++) {
            levelList[i].style.lineHeight = '30px';
        }
    }
});
const levelList = document.querySelectorAll('.select_menu .level');
// console.log(levelList);
for (let i = 0; i < levelList.length; i++) {
    levelList[i].addEventListener('click', function (e) {
        // console.log(e.target.innerText);
        const level = +e.target.innerText;
        gameConfig.level = level;
        document.querySelector('.select_menu .level_title').innerText = `当前level为${level}`;
    });
}


// gameControl.init();