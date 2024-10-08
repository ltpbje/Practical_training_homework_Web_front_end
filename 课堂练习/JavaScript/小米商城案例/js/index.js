const search_inp = document.querySelector('#search_inp');

const dataArr = [
    '华为手机',
    '华为手表',
    '华为MateXt',
    '手机'
];
let n = 0;
function changePlaceholder() {

    search_inp.placeholder = dataArr[n]
    n++;
    if (n === dataArr.length) {
        n=0
    }
    
};

setInterval(changePlaceholder, 3000);

// ---------------------search------------------------
const nav_items = document.querySelectorAll('.nav-item li'); 
const con_items = document.querySelectorAll('.con_item');
const second_nav = document.querySelector(".second-nav");
const header = document.querySelector('.header');
for (let i = 0; i < nav_items.length; i++){
    nav_items[i].addEventListener('mouseover', function () {
        // console.log(i);
        // second_nav.style.boxShadow  = '0 2px 2px #D6D6D6;'
        second_nav.style.height = '212px'
        for (let j = 0; j < con_items.length; j++){
            con_items[j].style.display ='none'
        }
        con_items[i].style.display ='block'
    })
    header.addEventListener('mouseleave', function () {
        second_nav.style.height = '0px'
        // second_nav.style.boxShadow = 'none'
    })
}
