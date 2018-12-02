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

함수를 정의하는 방법의 차이점이 드러나는 개념이 바로 호이스팅(Hoistin') 입니다.