var heading = document.getElementById('heading-text');

var headBtn = document.getElementById('head-btn');
var alertBtn = document.getElementById('alert-btn');

headBtn.addEventListener('click', function () {
    heading.innerHTML = '안녕하세요, JavaScript!';
});

alertBtn.addEventListener('click', function () {
    alert('이거 다 JavaScript 인거 아시죠?');
});