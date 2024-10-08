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