## Type Casting, Type Coercion

JavaScript 에서 값의 타입은 의도적으로 변환하거나 아무 말 없이 자동 변환될 수 있습니다. 

개인이 스스로 값의 타입을 변경하는 것은 타입 캐스팅(Type Casting) 이라고 합니다.

```javascript
var a = 30 - 20;
var str = a.toString(); // 숫자 -> 문자열로 변환
console.log(str); // '10'. 숫자 10이 아닙니다.
```

그러나 본인의 의도와는 전혀 상관 없이 타입이 자동으로 변환되는 경우가 있습니다. 이를 타입 강제 변환(Type Coercion) 이라고 합니다. 타입 강제 변환은 JavaScript Engine 이 코드를 평가하는 과정에서 발생한 부수 효과로 인하여 발생하게 됩니다. 예를 들면 아래와 같은 사례를 살펴보겠습니다.

```javascript
var a = '15';

var b = a - 10; // a 이란 문자열이 숫자로 변환 됩니다.
console.log(b); // 출력 결과 값은 5가 나옵니다. 숫자 입니다.
```

Type Coercion 은 언제 어떤 타입으로 변환되는지 예측할 수 있는 코드를 작성해야 합니다. 그렇다고 Type Casting 만 사용하는 것도 JavaScript 에서 원하지 않습니다. 아래에 언급할 Short-Circuit Evalution 을 사용할 때 Type Coercion 이 필요하게 될 것입니다.

## Examples Of Type Casting

타입 캐스팅의 사례는 아래와 같이 new 연산자 없이 변경한 값을 생성할 수 있습니다.

```javascript
var x = '0';

var num = Number(x); // 0
var num2 = +x; // 앞에 +를 붙이면 자동으로 숫자로 변환합니다.
var str = String(x); // '0'
var bool = Boolean(x); // true. 문자열 '0' 은 true 를 반환합니다!
```
## Examples Of Type Coercion

타입 강제 변환의 사례는 문자열, 숫자, Boolean 대수 로 나뉘게 됩니다.

```javascript
// 1. 문자열
var a = 10 + '20'; // '1020'

// 2. 숫자
var b = 10 * '5'; // 50
var c = 10 * true; // 10 * 1 = 10
var d = 10 * false; // 10 * 0 = 0
var e = 10 * undefined; // NaN
var f = 10 * '4달러'; // NaN

// 3. Boolean 대수
if(undefined){
    console.log('undefined 값도 false 로 인식합니다.');
}
if(null){
    console.log('Null 값은 false 로 인식 합니다.');
}
if(''){
    console.log('빈 문자열도 false 로 인식 합니다.');
}
if(0){
    console.log('숫자 0도 false 나 마찬 가지 입니다.');
    console.log('그 대신 문자열 0은 true 값 입니다.');
}

if('str'){
    console.log('OK');
}
if(-3){
    console.log('0 이외의 실수는 OK');
}
```

> **Truthy-Falsy Value**
>
> 우선 아래의 값들은 Boolean 에서는 무조건 false 로 변환하게 됩니다.
> 
> - `false`
> - `undefined`
> - `null`
> - `0`
> - `NaN`
> - `''`
> 
> 그러나 이외의 값들은 전부 true 로 변환합니다. 이 개념도 아래에서 언급할 Short-Circuit Evaluation 에서 매우 중요합니다.

> **Careful Of Type Coercion**
> 
> 우선 new 를 사용하여 Boolean 객체를 생성하면(즉, Wrapper 클래스를 사용한다면) 이 값이 false 라도 조건문에서는 true 로 인식합니다.
> 
> ```javascript
> var bool = new Boolean(false);
> if(bool){
>     alert('bool 의 값이 false 인줄 알았죠??');
> }
> ```

> **`!!` 연산자**
> 그리고 Truthy-Falsy Value 에 대한 Boolean 값을 출력하길 원하면 `!!` 연산자로 가져올 수 있습니다.
> 
> ```javascript
> console.log(!!null); // false
> console.log(!!undefined); // false
> console.log(!!''); // false
> 
> console.log(!![]); // true
> console.log(!!{}); // true
> console.log(!!1); // true
> ```

## Short-Circult Evaluation

JavaScript 에서만 논리 연산자에 대하여 단축 평가를 합니다.

AND(`&&`) 인 경우에는 왼쪽이 `false` 이면 오른쪽은 쳐다도 보지 않습니다.

그리고 OR(`||`) 인 경우에도 왼쪽이 `true` 이면 오른쪽도 마찬가지로 쳐다도 보지 않습니다.

```javascript
var a = 'my_str';

console.log( true || a ); // true
console.log( false || a ); // false
console.log( a || true ); // 'my_str'
console.log( true && a ); // 'my_str'
console.log( false && a ); // false 
console.log( a && true ); // true
```

이를 유용하게 사용하는 경우는 JavaScript 객체의 null 값인 경우를 고려하고 Property 를 가져올 때 유용하게 사용합니다. 즉, Null Pointer Exception 에 대해 대비할 수 있습니다.

```javascript
var person = {
    name : {
        last : 'kang',
        first : 'person'
    },
    age : 20
}

if(person.name){ // 그렇다고 person.name === true 와는 전혀 다릅니다.
    console.log(person.name.last);
} else {
    console.log('이름이 존재하지 않습니다.');
}

console.log(person.name && person.name.last); // 'kang'
console.log(person.name && person.name.mid); // undefined
console.log(person.name && ( person.name.first || person.name.second )); // 이 논리식도 유용한데 Null 값이 아닌 경우에는 OR 연산자의 전자와 후자의 존재에 따라 값이 나오게 합니다.
```

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-type-coercion

- 생활코딩 사이트 Boolean 객체 참조
    - https://opentutorials.org/course/50/42