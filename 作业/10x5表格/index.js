const singleRows = document.querySelectorAll('table tr:nth-of-type(2n+1)');
const doubleRows = document.querySelectorAll('table tr:nth-of-type(2n)');
const button = document.querySelector('button');

button.addEventListener('click', function () {
    for (let i = 0; i < singleRows.length; i++) {
        singleRows[i].classList.toggle('bg_red');
    }
    for (let i = 0; i < doubleRows.length; i++) {
        doubleRows[i].classList.toggle('bg_green');
    }
});

