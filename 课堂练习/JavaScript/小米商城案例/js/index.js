const search_inp = document.querySelector('#search_inp');

const dataArr = [
    '华为手机',
    '华为手表',
    '华为MateXt',
    '手机'
];
let n = 0;
function changePlaceholder() {

    search_inp.placeholder = dataArr[n];
    n++;
    if (n === dataArr.length) {
        n = 0;
    }

};

setInterval(changePlaceholder, 3000);

// ---------------------search end------------------------
const nav_items = document.querySelectorAll('.nav-item li');
const con_items = document.querySelectorAll('.con_item');
const second_nav = document.querySelector(".second-nav");
const header = document.querySelector('.header');
for (let i = 0; i < nav_items.length; i++) {
    nav_items[i].addEventListener('mouseover', function () {
        // console.log(i);
        second_nav.classList.add('second-nav_boxShadow');
        second_nav.style.height = '212px';
        for (let j = 0; j < con_items.length; j++) {
            con_items[j].style.display = 'none';
        }
        con_items[i].style.display = 'block';
    });
    header.addEventListener('mouseleave', function () {
        second_nav.style.height = '0px';
        second_nav.classList.remove('second-nav_boxShadow');
    });
}
// -----------------二级导航栏 end-------------------------

const banner_navs = document.querySelectorAll('.banner_nav ul li');
// console.log(banner_navs);
const banner_tabs = document.querySelectorAll('.banner_tabs .banner_tab');
for (let i = 0; i < banner_navs.length; i++) {
    banner_navs[i].addEventListener('mouseover', function () {
        for (let j = 0; j < banner_tabs.length; j++) {
            banner_tabs[j].style.display = 'none';
        }
        banner_tabs[i].style.display = 'block';
    });
}
const banner = document.querySelector('.banner');
banner.addEventListener('mouseleave', function () {
    for (let j = 0; j < banner_tabs.length; j++) {
        banner_tabs[j].style.display = 'none';
    }
});

// ------------------返回到页面顶部---------------------

const toTopButton = document.querySelector('.fixed_box ul li:last-of-type');
window.onscroll = function () {
    let toTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(toTop);
    if (toTop >= 400) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }

};

toTopButton.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});