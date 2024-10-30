// 滑动盒子
const slide_box = document.querySelector('.slide_box');
let startX = 0;
let slide_box_X;
function touchMove(e) {

    // console.log(e);
    // 触摸时候的位置
    const currentX = e.touches[0].clientX;
    const moveX = currentX - startX;
    // console.log(slide_box.style.transform);
    // console.log(1, slide_box.getBoundingClientRect().x);
    const finalX = slide_box_X + moveX;
    // console.log(slide_box_X + moveX);
    // slide_box.getBoundingClientRect().x = 40;
    slide_box.style.transform = `translateX(${finalX}px)`;
    // console.log(moveX);

    // console.log('x', moveX);

    // slide_box.addEventListener('touchend', function () {
    //     console.log(1);

    //     slide_box.removeEventListener('touchmove', touchMove);
    // });

}

slide_box.addEventListener('touchstart', function (e) {
    slide_box_X = slide_box.getBoundingClientRect().x;
    // 记录刚触摸时候的位置
    startX = e.touches[0].clientX;

    // console.log(e.touches[0].clientX);
    slide_box.addEventListener('touchmove', touchMove);
    slide_box.addEventListener('touchend', function () {
        console.log(slide_box.getBoundingClientRect().x);
        if (slide_box.getBoundingClientRect().x > 0) {
            // console.log(1);

            slide_box.style.transform = `translateX(0px)`;
        }
        // console.log(-1 * (slide_box.clientWidth - document.querySelector('.future_item').clientWidth));
        // 滑块向左移动的最大距离
        const maxLeft = -1 * (slide_box.clientWidth - document.querySelector('.future_item').clientWidth);
        if (slide_box.getBoundingClientRect().x < maxLeft) {
            console.log(1);

            slide_box.style.transform = `translateX(${maxLeft}px)`;
        }
        slide_box.removeEventListener('touchmove', touchMove);
    });
});
