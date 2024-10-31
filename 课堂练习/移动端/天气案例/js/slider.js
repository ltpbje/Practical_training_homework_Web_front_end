// 滑动盒子
const slide_box = document.querySelector('.slide_box');
let startX = 0;
let slide_box_X;
function touchMove(e) {

    // console.log(e);
    // 触摸时候的位置
    const currentX = e.touches[0].clientX;
    const moveX = currentX - startX;
    const finalX = slide_box_X + moveX;
    // console.log(finalX);

    if (finalX > 80) {
        slide_box.style.transform = `translateX(80px)`;
    }
    else if (finalX < -1 * (slide_box.clientWidth - document.querySelector('.future').clientWidth) - 80) {
        slide_box.style.transform = `translateX(${-1 * (slide_box.clientWidth - document.querySelector('.future').clientWidth) - 80}px)`;
    }
    else {
        slide_box.style.transform = `translateX(${finalX}px)`;
    }
}

// 监听触摸结束事件
slide_box.addEventListener('touchend', function () {
    console.log(slide_box.getBoundingClientRect().x);
    if (slide_box.getBoundingClientRect().x > 0) {
        // console.log(1);
        let startX = slide_box.getBoundingClientRect().x;
        // 回弹效果
        let timer = setInterval(() => {
            startX -= 5;
            slide_box.style.transform = `translateX(${startX}px)`;

            if (startX <= 0) {
                clearInterval(timer);
            }
        }, 10);
        // slide_box.style.transform = `translateX(0px)`;
    }
    // console.log(-1 * (slide_box.clientWidth - document.querySelector('.future_item').clientWidth));
    // 滑块向左移动的最大距离
    const maxLeft = -1 * (slide_box.clientWidth - document.querySelector('.future').clientWidth);
    if (slide_box.getBoundingClientRect().x < maxLeft) {
        // console.log(1);
        let startX = slide_box.getBoundingClientRect().x;
        // 回弹效果
        let timer = setInterval(() => {
            startX += 5;
            slide_box.style.transform = `translateX(${startX}px)`;

            if (startX >= maxLeft) {
                clearInterval(timer);
            }
        }, 10);
        // slide_box.style.transform = `translateX(${maxLeft}px)`;
    }
    // slide_box.removeEventListener('touchmove', touchMove);
});
// 监听触摸开始事件
slide_box.addEventListener('touchstart', function (e) {
    // 记录刚触摸时候 滑动盒子的位置
    slide_box_X = slide_box.getBoundingClientRect().x;
    // 记录刚触摸时候的位置
    startX = e.touches[0].clientX;
    // console.log(startX);

    // // 记录 触摸移动事件
    // // console.log(e.touches[0].clientX);
    // slide_box.addEventListener('touchmove', touchMove);
    // slide_box.addEventListener('touchend', function () {
    //     console.log(slide_box.getBoundingClientRect().x);
    //     if (slide_box.getBoundingClientRect().x > 0) {
    //         // console.log(1);

    //         slide_box.style.transform = `translateX(0px)`;
    //     }
    //     // console.log(-1 * (slide_box.clientWidth - document.querySelector('.future_item').clientWidth));
    //     // 滑块向左移动的最大距离
    //     const maxLeft = -1 * (slide_box.clientWidth - document.querySelector('.future').clientWidth);
    //     if (slide_box.getBoundingClientRect().x < maxLeft) {
    //         // console.log(1);

    //         slide_box.style.transform = `translateX(${maxLeft}px)`;
    //     }
    //     slide_box.removeEventListener('touchmove', touchMove);
    // });
});


slide_box.addEventListener('touchmove', touchMove);

