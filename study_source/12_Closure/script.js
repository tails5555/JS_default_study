var colors = ['red', 'blue', 'orange', 'green', 'pink', 'black', 'yellow'];
var myBox = document.getElementById('mybox');

var colorBtn = document.getElementById('button1');
var initBtn = document.getElementById('button2');

var getRandomColor = function(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

/* 
 * 아래에서 반환되는 함수들은 클로저 입니다.
 * 클로저 함수 내부에서는 상태를 변경합니다. 여기서 상태는 CSS 스타일로 보겠습니다.
 * 그리고 여기서 클로저가 반환 되면, colorToggle 을 통하여 즉시 실행 되고 사라집니다.
 * 하지만 여기서 color 변수의 값은 여러 색상을 변경하면 그 값들로만 유지 되고, 원래 색상인 하늘색으로 변경해도 그 값이 유지 됩니다.
 * 즉, 클로저를 사용하여 즉시 실행을 하더라도 color 변수의 값은 그대로 기억하는 것이 핵심입니다.
 * 클로저를 사용하지 않고 전역 변수로도 이를 설정할 수 있지만, 사용하지 않길 권장합니다.
 */ 

var colorToggle = function(initialize) {
    return (function() {
        var color = 'skyblue';
        if(!initialize){
            return function () {
                color = getRandomColor(colors);
                myBox.style.backgroundColor = color;
            }
        } else {
            return function () {
                myBox.style.backgroundColor = color;
            }
        }
    })();
}

colorBtn.onclick = colorToggle(false);
initBtn.onclick = colorToggle(true);