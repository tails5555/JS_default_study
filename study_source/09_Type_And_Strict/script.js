// 타입을 확인하는 함수. 방금 전에 작성한 함수와 같습니다.
function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}

// 문자열 타입 확인 함수. CSS 의 property Value 값을 확인합니다.
function isString(target) {
    return getType(target) === 'String';
}

// HTMLElement 타입 확인 함수. HTML 에 있는 DOM 타입을 확인합니다.
function isElement(target) {
    return !!(target && target instanceof HTMLElement);
}

// VanillaJS 함수로 HTML DOM 을 가져오는 단일 쿼리로 CSS 를 일부 추가합니다.
function add_css(element, props, value){
    // HTML DOM 이 아니면 예외 처리 합니다.
    if(!(isElement(element) && isString(props) && isString(value))) {
        throw new TypeError('매개변수의 타입이 맞지 않아요.');
    }

    element.style[props] = value;
}

// HTML DOM 을 가져오는 복수 쿼리로 CSS 를 일부 추가합니다.
function add_multi_css(elements, props, value){
    for(idx in elements){
        // 숫자가 아닌 타입이면 true 값을 반환합니다.
        if(isNaN(idx)) break;

        // HTML DOM 이 아니면 예외 처리 합니다.
        if(!(isElement(elements[idx]) && isString(props) && isString(value))) {
            throw new TypeError('매개변수의 타입이 맞지 않아요.');
        }

        elements[idx].style[props] = value;
    }
}

// 빨간 정사각형을 만드는 함수
add_css(document.getElementById('example1'), 'background-color', 'red');
add_css(document.getElementById('example1'), 'height', '100px');
add_css(document.getElementById('example1'), 'width', '100px');

// 하늘색 원을 만드는 함수
add_css(document.getElementById('example2'), 'background-color', 'skyblue');
add_css(document.getElementById('example2'), 'border-radius', '50px');
add_css(document.getElementById('example2'), 'height', '100px');
add_css(document.getElementById('example2'), 'width', '100px');

// 노란 둥근 사각형을 만드는 함수
add_css(document.getElementById('example3'), 'background-color', 'yellow');
add_css(document.getElementById('example3'), 'border-radius', '10px');
add_css(document.getElementById('example3'), 'height', '100px');
add_css(document.getElementById('example3'), 'width', '100px');

// 모든 div 요소에 Margin 을 추가합니다.
add_multi_css(document.querySelectorAll('div'), 'margin', '10px');