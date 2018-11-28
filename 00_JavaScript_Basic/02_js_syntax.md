## JavaScript Basic Syntax

이 개념에 대해서는 프로그래밍 언어 공부를 경험한 자로 짧게 요약하여 작성 하겠습니다.

1. 변수

- 값을 저장하고 참조하기 위해 사용 됩니다.
- 1회용 값이 아닌 값은 변수에 담아 사용합니다.
- 메모리 상 주소에 값을 저장하고, 그 주소로 값을 참조할 때 필요한 자연어 식별자가 곧 변수 입니다.

```javascript
// JavaScript 에서 Number 는 8바이트 부동소수점 형의 값입니다.
// 추가로 양-음의 무한대인 Infinity, -Infinity 타입과 NaN(숫자가 아님) 타입도 존재합니다.
var x = 10;
var pi = 3.14;

// 문자열의 값은 변경이 불가능한 Immutable Value 입니다.
var str = 'Hello, JavaScript!';
```

JavaScript 에서 데이터 타입을 따로 지정하지 않아도 됩니다. 하지만 TypeScript 을 사용하면 데이터 타입을 설정하여 정확도를 높입니다.

그리고 10, 3.14, 'Hello, JavaScript!' 등의 값들은 리터럴(Literal) 로 불리는데, 소스 코드 안에서 직접 작성한 상수의 값 입니다. 이외에도 `undefined`, `null`, `true`, `false`, 객체나 배열 등으로 작성 가능합니다.

타입은 Number, String, Boolean, null, undefined, Symbol 등의 원시 타입(Primitive Data Type) 과 객체 타입인 Object 로 7가지 입니다.

**변수의 주요 특성**

JavaScript 에서 변수는 중복 호출이 가능합니다. 그러나 추천하진 않습니다.

그리고 var 키워드를 생략하여 Global 변수를 사용할 수 있습니다.(암묵적인 전역 변수 생성.)

그리고 동적 타이핑(Dynamic Typing) 을 제공하여 변수의 타입 지정 조차 없이 자동으로 타입이 결정 됩니다. 예를 들어 숫자와 문자를 서로 붙일 때의 타입 변환은 아래와 같습니다.

```javascript
var a = 10;
console.log(typeof a); // number

var b = '20';
console.log(typeof b); // string

a = a + b;
console.log(typeof a); // string
console.log(a); // '1020'
```

그리고 JavaScript 은 다른 언어와 다르게 선언문은 호이스팅(Hoistin') 이 됩니다. 호이스팅은 var 문, function 선언문 등 해당 Scope의 선두로 옮겨진 것처럼 동작하는 특성 입니다. 

JavaScript 변수는 Function-Level Scope 를 가지게 됩니다. 그러나 ES6 버전 이후에 Block-Level Scope 를 가질 수 있습니다.

```javascript
console.log(value);
var value = 200;
console.log(value); // 200
{
    var value = 250;
}
console.log(value); // 250

myFunc();
function myFunc() {
    alert('function hoisting');
}
```

2. 연산자

다른 언어와 크게 다르지 않기 때문에 별 큰 설명 없이 넘어 가겠습니다.

```javascript
var a = 10 + 20;
var b = a * 30; // 사칙연산과 나머지는 여기서도 똑같습니다.
var c = 'Hello ' + 'JavaScript'; // 문자열은 서로 붙어 줍니다.

var d = ( b > 900 ) && (a >= 30) // 논리 비교 연산자도 똑같습니다.

var e = new Date(); // 인스턴스 생성 연산자도 Java와 유사합니다.
```

그러나 JavaScript 에서 `==` 와 `===`, `!=` 와 `!==` 의 차이를 알아둬야 합니다. 각 연산자의 전자는 타입에 상관 없이 값만 비교합니다. 그러나 후자는 타입을 비교하여 strict 하게 비교합니다. 전자 연산자를 사용하면 Warning 이 나옵니다.

3. 키워드, 주석

어느 프로그래밍 언어이든 마찬가지로 변수 이름을 키워드로 설정할 수 없는 건 JavaScript 도 마찬가지 입니다. 예를 들어 다음과 같이 변수를 선언할 수 없습니다.

```javascript
var var = 10; // 이렇게 작성하면 안 됩니다.
```

주석은 C언어, Java 와 유사합니다.

```javascript
// 단일 주석 입니다.
var a = 10 + 20;

/*
 * 여러 줄 주석 입니다.
 */
var c = a * a;
```

4. 문과 표현식

문(Statement) 은 값, 연산자, 표현식, 키워드 주석 등으로 구성 됩니다. 코드 블록으로 그룹화 할 수 있어야 합니다. 순서는 아래로 내려가면서 실행 되지만, 함수 호출이 일어나면 달라질 수도 있습니다.

그리고 JavaScript 에서는 블록 유효 범위를 생성하지 않고 함수 단위의 유효 범위만 생성 합니다. 이러한 개념을 호이스팅으로 부릅니다.

문은 항상 끝나는 시점에서 세미콜론을 찍어주는 것이 좋습니다. 물론 안 찍어도 큰 상관은 없지만 가독성이 떨어집니다.

```javascript
// 배열 선언
var arr = [10, 20, 30];

// 배열 요소 출력
for(var k=0;k<arr.length;k++){
    console.log(arr[k]);
}
```

표현식(Expression)은 오직 하나의 값으로만 평가 되는 개념 입니다. 배열 요소, 함수 호출, 메소드 호출, 연산자 조합 등을 표현식이라고 부릅니다.

```javascript
100 // 100
20 * 50 // 1000
```

문과 표현식을 서로 비교하면 표현식은 문을 구성하는 요소로도 볼 수 있습니다. 아래의 문장을 참고해도 거기서 거기라는 점을 느낄 것입니다.

```javascript
// 선언문 : x = 5 * 20 을 포함하는 문입니다.
var x = 5 * 20;
// 할당문 : 이 자체는 표현식이지만, 완전한 문이기도 합니다.
x = 300;
```

5. 함수

> **JavaScript 의 존재 이유**

어떤 작업을 수행하기 위해 필요한 문의 집합을 정의한 코드 블록입니다.

함수는 이름이 필요하고, 파라미터, 반환 값 등은 옵션 입니다. 미리 정의된 함수를 재사용하는 방향으로 구축하는 것이 중요합니다.

```javascript
function hello(name){
    alert(`hello, ${name}!`);
}
```

6. 객체

객체는 원시 타입(Primitive Type) 변수를 제외한 나머지 값들이 곧 객체 입니다.

Java 에서는 맴버 변수였지만, JavaScript 에서는 Property 로 부릅니다. 이는 Key-Value 로 구성된 집합입니다. 

그 중 Property 를 사용하여 함수도 정의할 수 있는데 이는 메소드로 불립니다. JavaScript 의 객체는 Property 와 Method 들의 집합입니다. 객체지향의 상속을 구현하기 위해 Prototype 을 이용합니다.

```javascript
var student = {
    last : '강',
    first : '학생',
    hello : () => console.log(`hello, ${this.last} ${this.first}!`)
}
```

7. 배열

배열은 1개의 변수에 여러 개의 값을 순서대로 넣을 때 사용 합니다.

```javascript
var arr = [10, 20, 30, 40];
var arr_cpy = arr.slice();
arr_cpy.push(50);
```

8. undefined, null

undefined 값은 선언 이후 할당하지 않은 변수의 값입니다. 개발자가 의도적으로 undefined 값을 할당하는 경우는 크게 없고 권장하지도 않습니다. 변수의 값이 해당 없는 값은 null 값으로 할당하는 것이 좋습니다.

null 값은 의도적으로 변수에 값이 없는 것을 명시할 때 사용하고, 메모리 주소의 참조 정보를 제거하는 것을 의마하고, JavaScript 엔진에서 참조하지 않는 메모리 영역에 대하여 가비지 콜렉션을 수행하게 됩니다. 그러나 null 의 타입은 엄연히 Object 이기 때문에 이를 비교하기 위해서는 아래와 같이 작성하셔야 됩니다.

```javascript
if(obj === null){
    // Action
}
```

9. symbol

ES6 버전 부터 Object 의 Property 를 위한 변경 불가능한 값 입니다. 이름의 충돌 위험이 없는 Property Key 를 만들기 위해 사용 됩니다.

```javascript
var key = Symbol('last')

var person = { last : '강', first : '사람' };
person[key] = '김';
console.log(person[key]); // 김
```

## References

- JavaScript 기본 문법 요소

    - https://poiemaweb.com/js-syntax-basics
    - https://poiemaweb.com/js-data-type-variable
    - https://poiemaweb.com/js-operator