// 这里配置的都是需要加载的资源图片


const assetsList = [
    './assets/bg1.jpg',
    './assets/plane_0.png',
    './assets/fire.png'
];



/**
 * 
 * 资源管理对象 所有加载好的资源都必须要通过这个对象来进行管理
 * 
 */

const assetsConfig = {
    imgList: [],
    // 加载资源
    loadAssets() {
        let p = new Promise((reslove, reject) => {
            let count = 0;
            for (let i = 0; i < assetsList.length; i++) {
                let img = new Image();  // 创建一个图片对象
                img.src = assetsList[i];
                this.imgList.push(img);
                img.onload = event => {
                    count++;
                    if (count == assetsList.length) {
                        console.log('资源全部加载完毕');
                        // 成功
                        reslove();
                    }
                };
                img.onerror = event => {
                    reject();
                };
            }

        });
        return p;
    }
};


export default assetsConfig;