## JavaScript Function

> Java 와 Python 의 핵심은 Class 라면, JavaScript 의 꽃은 Function 이다.

함수는 쉽게 생각하면 f(x) = x + 4 처럼 x 의 값을 대입하면(혹은 입력하면) 이 값에 4를 더해 나오는 값이 나오는(혹은 반환하는) 개념입니다. 

함수는 이름과 매개변수를 가지고 필요할 때 호출하여 블록에 담긴 문장들을 일일히 수행할 수 있습니다. 또한 여러 번 사용한다고 잡아가지 않습니다. 

함수의 특성으로는 다음과 같습니다.

- 코드의 재사용을 목적으로 합니다.
- 객체 생성, 행위를 정의합니다.
- 정보 은닉, 클로저, 모듈화 등을 수행합니다.

참고로 JavaScript 에서 함수 마저도 객체 입니다. 다른 객체와 구분되는 것은 호출이 가능한 것입니다. 그리고 매개변수와 반환, 재귀 호출 등의 기능이 있어 이를 일급 객체라고 합니다.


```javascript
function plus_four(num){
    return num + 4;
}

console.log(plus_four(4)); // 8
console.log(plus_four('4')); // '44'
```

함수에 대한 개념은 프로그래밍 언어를 많이 접해보셨으면 이미 아는 개념으로 JavaScript 만의 함수 개념을 중점으로 설명하겠습니다.

## Function Expression

위에서 언급한 바와 같이 함수는 일급 객체로 아래와 같은 특징이 있습니다.

- 무명의 리터럴(무명 함수) 로 표현할 수 있습니다.
- 변수나 자료구조(Array, Object etc.)에 저장할 수 있습니다.
- 또 다른 함수의 파라미터로 전달할 수 있습니다.
- 반환 값으로 함수를 이용할 수 있습니다.

함수 선언문으로 정의한 `plus_four` 함수를 Function Expression 으로 표현하면 아래와 같습니다.

```javascript
var plus_four = function(num) {
    return num + 4;
}
```

함수명을 생략하여 정의한 함수를 함수 표현식으로 부르는데 함수의 이름이 없어서 익명 함수(Anonymous Function) 라고 합니다.

함수 표현식에서는 함수 이름을 안 쓰는 것이 좋습니다. 어자피 함수 이름을 썼더라도 그 함수의 이름으로 호출할 수 없습니다. 함수 이름은 외부 코드에서 접근이 불가능하기 때문입니다. 다만 함수 블록 내부에서 재귀 호출이 필요한 경우엔 이를 사용할 수 있습니다.

```javascript
var plus_four1 = function pf(num) {
    return num + 4;
}

var plus_four2 = function(num) {
    return num + 4;
}

console.log(plus_four1(4)); // 8
console.log(plus_four2(4)); // 8
console.log(pf(4)); // pf is not defined 라는 에러가 나옵니다.
```

함수도 일급 객체이기 때문에 어느 메모리 공간에 함수가 저장 되어 있고 이를 참조해서 사용합니다. 함수를 호출할 때는 함수의 이름을 사용하는 개념이 아닌 함수를 가리키는 변수를 사용한다고 생각해야 합니다.

```javascript
var square = function (num) {
    return num * num;
}

var sq = square;

function half(num) {
    return num / 2;
}

var hf = half;

console.log(square(4)); // 16
console.log(sq(4)); // 16

console.log(half(4)); // 2
console.log(hf(4)); // 2
```

위의 문장에서 `square` 변수와 `sq` 변수가 각각 가리키는 참조 값은 같아서 둘 다 같은 함수를 가져옵니다. 

그리고 `half` 함수와 `hf` 변수가 가리키는 참조 값도 같습니다. 여기서 `half` 는 함수 이름이라고 생각하는 것보다 함수를 가리키는 변수의 이름으로 이해하는 것이 좋습니다.

그렇다면 함수 표현식을 이용하여 작성한 함수를 변수로 호출이 가능한 이유가 무엇일까? 바로 자바스크립트 엔진에 의해 위에서 작성한 함수 표현식을 자동으로 변경 해줍니다. 또한 `half` 함수도 아래와 같이 해석합니다.

```javascript
var square = function square(num) {
    return num * num;
}

var half = function half(num) {
    return num / 2;
}
```

> **Function 생성자 함수**
> 
> 함수 표현식으로 리터럴을 사용하는 것과 단지 함수 이름을 사용한 함수 생성도 문장으로만 쉽게 정의 가능합니다. 그렇지만 Function 생성자 함수를 사용하는 방법도 있습니다. 이는 Function 객체 prototype 의 constructor 를 사용합니다.
> 
> 그렇지만 일반적으로 사용하지 않습니다. 그러나 각 함수에 대한 정의 방법이 각각 달라도 이를 사용해서 함수를 암묵적으로 생성하는 사실을 알아두는 것이 좋습니다.
> 
> ```javascript
> var square = new Function('num', 'return num * num');
> console.log(square(4)); // 16
> ```

## Function Hoistin'

함수를 정의하는 방법의 차이점이 드러나는 개념이 바로 호이스팅(Hoistin') 입니다. 우선 Only 함수 이름으로만 생성하였을 때의 호이스팅은 다음과 같습니다.

```javascript
// case example
var value = plus_four(4);
console.log(value); // undefined 가 아니라 8이 나옵니다.

function plus_four(number) {
    return number + 4;
}

// same as
var value = undefined;
function plus_four(number) {
    return number + 4;
}

value = plus_four(4);
console.log(value); // 8
```

선언문으로 함수가 정의되면, 이를 선언하기 이전의 시점에서 호출이 가능합니다. 전방에 선언이 됐든, 후방에 선언이 됐든 호출이 가능한 개념이 호이스팅(Hoistin') 이라는 사실은 이미 이전에 공부 했습니다.

그래서 선언문으로 정의된 함수는 자바스크립트 엔진이 스크립트가 로딩되는 시점에서 바로 초기화 하여 Variable Object 에 저장을 합니다. 이를 통해 **함수 선언, 초기화, 할당이 한 번에 이뤄져서** 호이스팅이 가능하게 된 것입니다.

## Variable Hoistin'

그러나 함수 표현식을 사용하여 초기화를 했을 경우에는 어떤 차이가 있는지 알아 보겠습니다.

```javascript
// case example
var value = plus_four(50); // plus_four is not a function.
var plus_four = function(number) {
    return number + 4;
}
```

함수 표현식을 이용하면 함수 호이스팅이 아닌 변수 호이스팅이 발생합니다. 

변수 호이스팅은 **변수 생성, 초기화, 할당이 따로 분리되어 실행** 됩니다. 호이스팅된 변수는 `undefined` 로 초기화되고 실제 값 할당은 할당문에서 이뤄집니다. 그래서 스크립트 로딩 시점에서 변수 객체(Variable Object) 에 할당하지 않고 Runtime 에서 해석하고 실행 됩니다.

이 두 개념들을 통해 함수 호이스팅과 변수 호이스팅의 차이에 대해 알아둘 필요가 있습니다.

실제 JavaScript 함수를 작성할 때 함수 표현식을 권장하는 이유를 추측하면, 함수 호이스팅에서는 함수를 호출하기 **전에** 반드시 함수를 선언해야 하는 규칙을 무시합니다.

또한 대규모 Application 을 개발할 때 인터프리터가 너무 많은 코드를 Variable Object 에 저장하면 응답속도가 떨어지는 이유도 있습니다.

## First Class Object

일급 객체(1st-Class Object) 는 생성, 대입, 연산, 인자, 반환 값으로 전달 등 프로그래밍 언어의 기본적인 조작을 제한없이 사용할 수 있는 대상을 뜻합니다.

일급 객체는 다음과 같은 조건을 만족합니다.

> - 무명의 리터럴로 표현할 수 있습니다.
> - 변수나 자료구조(객체, 배열 등)에 저장할 수 있습니다.
> - 함수의 파라미터로 전달할 수 있습니다.
> - 반환 값으로 사용할 수 있습니다.

아래는 JavaScript 에서 함수는 일급 객체임을 만족하는 사례를 코드로 작성하였습니다.

```javascript
// 첫 번째 조건을 만족합니다.
var hello = function(name) {
    return `Hello, ${name}!`;
}

var bye = function(name) {
    return `Bye, ${name}`;
}

// 두 번째 조건을 만족합니다.
var greeting = {
    morning : hello,
    evening : bye
}

// 세 번째 조건을 만족합니다.
function greeting_func(func, name) {
    return func(name);
}

console.log(greeting_func(moring, '강사람')); // Hello, 강사람

// 네 번째 조건을 만족합니다.
function good_night(name) {
    return function() {
        console.log(`Good Night, ${name}`);
    }
}

var night_func = good_night('강사람');
console.log(night_func());
```

## Call-By-Value, Call-By-Reference

원시 타입 인수는 Call-By-Value 로 동작합니다. 그리고 이외의 타입 인수는 Call-By-Reference 로 동작합니다.

객체 타입의 변수는 Reference 를 함수에 넘겨서 객체의 값들을 복사하지 않고 전달합니다. 

원시 타입 인수는 함수를 빠져나오고 난 후에 값의 변화는 없지만, 객체 타입 인수는 함수를 빠져나오고 난 후에 함수의 문장에 따라 변경됩니다.

```javascript
var money = 1000;
var car = {
    status : '기름필요',
    liter : 10
};

function charge(money, car){
    money -= 500;
    car['status'] = '만땅';
    car['liter'] = 100
}

charge(money, car);
console.log(money); // 1000
console.log(car); // { status : '만땅', liter : 100 }
```

## Function Property

우리가 만든 함수이든 모든 함수는 Property 를 생성할 수 있습니다. 그렇지만 일반 객체와는 다른 함수만의 표준 프로퍼티를 가집니다.

1. Arguments Property 

JavaScript 는 다른 언어와는 달리 유동적인 Arguments(인수) 들을 작성할 수 있습니다. 원래 요구했던 매개변수의 인수의 갯수가 많아지면 이를 참고해서 인수 값을 가져옵니다.

이는 함수 내부에서만 작성할 수 있습니다. 결과 값은 배열처럼 생겼지만 인덱스를 프로퍼티로 가지는 객체가 나옵니다. 이를 유사 배열 객체(Array-Like Object) 라고 합니다. 유사 배열 객체는 `length` 프로퍼티를 가집니다.

```javascript
function add(a, b){
    console.log(arguments);
    return a + b;
}

add(1); // { '0' : 1 }
add(1, 2); // { '0' : 1, '1' : 2 }
add(1, 2, 3); // { '0' : 1, '1' : 2, '2' : 3 }

// 이는 유사 배열 객체를 사용한 가변 인자 덧셈 함수 입니다.
function multi_add() {
    if(!arguments.length) return 0;

    var arr = Array.prototype.slice.call(arguments);
    return arr.reduce((pre, cur) => pre + cur);
}

multi_add(10, 20, 30); // 결과 값은 60이 나옵니다.
```

2. caller Property

caller 프로퍼티는 함수를 호출한 함수 객체를 반환합니다.

```javascript
function func(f) {
    var res = f();
    return res;
}

function func_tmp(){
    return func_tmp.caller;
}

console.log(func_tmp()); // null
console.log(func(func_tmp)); // function func(f) { ... }
```

3. length Property

length 프로퍼티는 함수 정의할 때의 매개 변수의 개수 입니다.

`arguments.length` 는 함수를 호출할 때 작성한 인자의 개수 입니다. 햇깔리지 맙시다.

```javascript
function add(a, b, c){
    console.log(add.length);
    return a + b + c;
}

add(1, 2, 3); // 3
```

4. name Property

말 그대로 함수의 이름 프로퍼티 입니다. 이름 있는 함수는 함수 이름을 반환하고, 무명 함수는 가리키는 변수의 이름을 반환합니다. (PoiemaWeb 에 오타가 있습니다.)

```javascript
var add = function(a, b){
    return a + b;
}

function minus(a, b) {
    return a - b;
}

console.log(add.name); // 'add'
console.log(minus.name); // 'minus'
```

## Types Of Function

1. 즉시 실행 함수(IIFE, Immediately Invoke Function Expression)

함수 정의와 동시에 실행되는 함수 입니다. 이는 최초 한 번만 호출되어 다시는 호출할 수 없습니다.

```javascript
// add 함수. 실행 결과 값은 9.
// 그러나 이름도 의미 없습니다. 
(function add(x, y) {
    return x + y;
}(4, 5)); 

(function (x, y) {
    return x - y;
}(3, 2)); // 실행 결과는 1.
```

실제로는 많이 쓰이지 않을 것 같지만 하나의 글로벌 스코프(Global Scope) 에 선언된 변수나 함수에 대하여 동일한 이름의 이들을 해결하기 위해 사용합니다. 예를 들어 jQuery 라이브러리와 다른 라이브러리를 동시에 사용할 때 변수 이름 충돌 문제를 방지하는 목적으로 사용합니다.

2. 내부 함수(Inner Function)

함수 내부에 정의된 함수를 내부 함수(Inner Function) 라고 합니다. 

내부 함수는 이의 부모 함수에 있는 변수를 접근할 수 있습니다. 반대로 부모가 내부 함수에 있는 변수를 접근할 수 없습니다. 

마치 어린이가 부모님께 장난감을 뺏기지 않으려는 장면과 같습니다.

또한 내부함수는 부모함수 외부에 호출할 수 없습니다. 내부 함수에 대한 개념은 클로저(Closure) 에서 더욱 상세히 다루겠습니다.

```javascript
function parent(toy){
    var newToy = toy;
    function child() {
        var ownToy = '마징가Z';
        console.log(newToy); // '곰인형'
    }
    child();
    console.log(ownToy); // 접근 불가.
}

parent('곰인형');
child(); // 접근 불가.
```

3. 콜백 함수(Callback Function)

> JavaScript 의 함수가 중요한 이유!

명시적인 호출이 이뤄지지 않고 어느 특정 이벤트나 타이머에 따라 호출되는 함수가 필요합니다. 이를 콜백 함수라고 합니다.

이는 React.js 에서도 `onClick`, `onSubmit` 함수 등으로 많이 설정했습니다. 이처럼 콜백 함수는 익명 함수가 매개 변수를 통해 전달 되고 이 내부에서 어느 특정 시점에서 실행이 됩니다.

```javascript
// 타이머에 따른 이벤트 시
setTimeout(function(){
    console.log('안녕');
}, 2000);

// 버튼 클릭 이벤트 시
var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() {
    console.log('Hello');
});
```

콜백 함수는 비동기식 처리 모델에서 주로 사용 됩니다. 이의 개념은 후술 하겠지만, 어느 이벤트 처리가 종료 되면 호출되는 함수를 매개변수에 전달하고 동시에 호출하는 개념 입니다.

콜백 함수는 콜백 큐 메모리에 있다가 해당 이벤트가 발생하면 호출 합니다. 참고로 콜백 함수는 클로저 입니다.

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-function