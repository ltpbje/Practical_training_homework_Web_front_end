function GVerify(options, callback) { // 创建一个图形验证码对象，接收options对象为参数
    this.options = { // 默认options参数值
        id: 'v_container', // 容器Id
        canvasId: 'verifyCanvas', // canvas的ID
        width: '80', // 默认canvas宽度
        height: '40', // 默认canvas高度
        code: ''
    };
    this.callback = callback;
    this.count = 0;
    for (var i in options) { // 根据传入的参数，修改默认参数值
        this.options[i] = options[i];
    }
    this._init();
}

GVerify.prototype = {
    /** 版本号**/
    version: '1.0.0',

    /** 初始化方法**/
    _init: function () {
        var con = document.getElementById(this.options.id);
        var canvas = document.createElement('canvas');
        canvas.id = this.options.canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = 'pointer';
        canvas.innerHTML = '您的浏览器版本不支持canvas';
        con.appendChild(canvas);
    },

    getCode: function () {
        var p = new Promise((resolve, reject) => {
            let results = this.callback();
            if (results) {
                resolve(results);
            } else {
                reject();
            }
        });
        return p;
    },

    /** 生成验证码**/
    refresh: async function () {
        var canvas = document.getElementById(this.options.canvasId);
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
        }
        ctx.textBaseline = 'middle';
        ctx.fillStyle = randomColor(180, 240);
        ctx.fillRect(0, 0, this.options.width, this.options.height);
        let yzmCode = await this.getCode();
        this.options.code = yzmCode.code;
        var txtArr = this.options.code.split("");
        for (var i = 0; i < 4; i++) {
            var txt = txtArr[i];
            ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; // 随机生成字体大小
            ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            var x = this.options.width / 5 * i;
            var y = this.options.height / 2;
            var deg = randomNum(-30, 30);
            /** 设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            /** 恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /** 绘制干扰线**/
        for (var i = 0; i < 4; i++) {
            ctx.strokeStyle = randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
            ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
            ctx.stroke();
        }
        /** 绘制干扰点**/
        for (var i = 0; i < this.options.width / 4; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
        return yzmCode.code;
    },

    /** 验证验证码**/
    validate: function (code) {
        var code = code.toLowerCase();
        var v_code = this.options.code.toLowerCase();
        if (code == v_code) {
            return true;
        } else {
            return false;
        }
    }
};

/** 生成一个随机数**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/** 生成一个随机色**/
function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export {
    GVerify
};