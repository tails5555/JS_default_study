## Type Checking

자바스크립트에서 변수의 타입은 동적(Dynamic) 으로 정해져서 예측하기 힘듭니다. 예를 들어 아래와 같은 함수를 살펴보겠습니다.

```javascript
function add(a, b){
    return a + b;
}

add(10, 20); // 30
add('짱', '구'); // '짱구'
```

이 `add` 함수의 목적은 1 + 1 처럼 간단한 덧셈 계산을 목적으로 만들었지만, 문자열이 들어오면 문자열끼리 붙은 결과가 나옵니다.

그래서 산술 연산을 위한 함수를 구성하기 위해 매개 변수의 타입을 체크할 필요가 있습니다. 

TypeScript 에서는 아래와 같이 매개변수 뿐만 아니라 반환 값에도 타입을 붙여 확인 합니다. 그러나 JavaScript 에서는 타입 지정이 불가능하니, 대신에 타입을 확인하는 것만으로 만족을 시켜야 합니다.

```typescript
function add(a : number, b : number) : number {
    return a + b;
}

add(10, 20); // 30
```

```javascript
function add(a, b){
    // a, b 에 대한 타입 체크를 진행합니다.
    return a + b;
}
```

## `typeof` Operator

`typeof` 는 피연산자의 데이터 타입을 문자열로 반환합니다.

```javascript
console.log(typeof ''); // string
console.log(typeof 100); // number
console.log(typeof true); // boolean
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof new Number(10)); // object
console.log(typeof /[a-d]/); // object. RegExp Object.
console.log(typeof function() {}); // function
console.log(typeof undefined); // undefined
```

`typeof` 연산자는 배열, 날짜, 정규 표현식 등 원시 타입을 제외한 모든 타입은 `object` 로 반환합니다. 객체의 타입을 알아보기 위해 `prototype` 의 메소드를 한 번 건들어 보겠습니다.

## Prototype Methods

객체를 나타내는 문자열을 반환합니다. 그 중에서 `Object.prototype.toString` 와 `Function.prototype.call` 메소드에 대하여 잠깐 살펴 보겠습니다.

```javascript
var today = new Date();
console.log(Object.prototype.toString(today)); // [object Object]
console.log(Object.prototype.toString.call(today)); // [object Date]
```

`Object.prototype.toString` 메소드는 객체를 나타내는 문자열을 반환합니다. 그렇지만 정확한 타입에 대하여 반환하지 않습니다. 예를 들어 날짜 객체를 생성하더라도 `[object Object]` 를 반환합니다.

하지만 `Function.prototype.call` 메소드를 사용하면 객체의 세부적인 타입까지 알아낼 수 있습니다. 마지막 문장과 같이 객체를 가리키는 변수나 객체 리터럴을 작성하면 그 객체에 대한 타입 또한 반환합니다. 이 문장에서는 날짜 타입인 `[object Date]` 를 반환합니다.

```javascript
console.log(Object.prototype.toString.call('')); // [object String]
console.log(Object.prototype.toString.call(new Number(10)); // [object Number]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(/[a-z]+/)); // [object RegExp]
console.log(Object.prototype.toString.call(document)); // [object HTMLDocument]
```

이걸 사용해서 타입을 반환하는 함수를 만들 수 있습니다. 이는 PoiemaWeb JavaScript 에서 참조해서 작성하였습니다. 여기서 쓰인 `String.prototype.slice` 함수는 문자열을 자르는 메소드입니다.

```javascript
function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}

// call 메소드까지 출력 결과는 [object Number] 로 나옵니다.
// 그래서 실제 타입의 시작점은 문자열 인덱스 기준으로 8 입니다.
// 그리고 마지막의 -1 의 뜻은 마지막 문자열의 ']' 를 빼냅니다.

console.log(getType(1000)); // 'Number'
console.log(getType([1, 2, 3])); // 'Array'

// add 함수에 타입 값을 확인합니다.
function sum(a, b){
    if(getType(a) !== 'Number' || getType(b) !== 'Number') {
        throw new TypeError('파라미터는 Number 타입만 할당할 수 있습니다.');
    }
    return a + b;
}

console.log(sum(10, 20)); // 30
console.log(sum('짱', 9)); // TypeError Exception
```

타입의 문자열만 뜯어서 나오는 함수인 `getType` 를 즉석으로 만들었습니다. 이 함수는 원시 타입 뿐만 아니라 객체의 세부 타입까지 모두 알아낼 수 있습니다. 이를 이용해서 방금 작성한 `sum` 함수에 타입을 알아내서 숫자에 대한 산술만 가능하게 제어했습니다. 그리고 JavaScript 에서도 Exception 을 던질 수 있습니다.

## `instanceof`

`Object.prototype.toString` 메소드를 사용해서 객체의 세부 정보까지 알아낼 수 있지만, 객체의 상속 관계까진 알려주진 않습니다.

예를 들어 HTML DOM 에 일부 CSS 를 추가하는 문장을 잠깐 살펴 보겠습니다.

```javascript
function add_css(element, props, value) {
    element.style[props] = value;
}

add_css(null, 'color', 'red'); // TypeError 예외. 'color' 프로퍼티가 없다는 결과가 나옵니다.
```

`add_css` 함수의 `element` 매개변수는 HTML DOM(HTMLElement)를 상속 받아야 합니다. 각 태그 별로 `div(HTMLDivElement)`, `p(HTMLParagraphElement)`, `table(HTMLTableElement)` 등 모든 DOM 요소가 전달 될 수 있습니다. 그래서 DOM 요소인지 확인하기 위해 `HTMLElement` 에 상속 되어 있는지 확인할 필요가 있습니다. 참고로 DOM Tree 의 객체 구성은 아래와 같습니다.

![dom_types](./../image/dom_types.png)

`instanceof` 연산자는 피연산자인 객체가 오른쪽에 명시한 타입의 인스턴스인지 확인시킵니다. 이는 `constructor` 를 이용해 프로토타입 체인(Prototype Chain) 의 인스턴스 여부를 확인합니다. (즉, 상속 을 받은 자식 여부나 같은 객체 타입인지 확인하는 의미 입니다.)

```javascript
function Student(name, grade) {
    this.name = name;
    this.grade = grade;
}

const std = new Student('강학생', 4);

console.log(std instanceof Student); // true
console.log(std instanceof Object); // true
```

참고로 CSS 를 추가하는 실습은 VanillaJS(순수 자바스크립트) 를 사용하였습니다. 이는 스터디 소스를 참고하세요.

## Array Like Object

배열 확인 여부를 위한 메소드는 `Array.isArray()` 를 이용합니다.

유사 배열 객체는 각 인덱스 프로퍼티와 `length` 프로퍼티를 갖는 객체입니다. 문자열, Arguments(인수), HTMLCollection 등이 유사 배열 입니다.

```javascript
console.log(Array.isArray([10, 20])); // true
console.log(Array.isArray({ a : 'a' })); // false
console.log(Array.isArray('ang')); // false
```

유사 배열을 확인하기 위한 함수는 아래와 같이 작성할 수 있습니다. 이 함수도 PoiemaWeb 을 참고하였습니다.

```javascript
function isArrayLike(collection) {
    var MAX_ARRAY_IDX = Math.pow(2, 53) - 1; // JavaScript 에서 숫자는 2^53 - 1 값까지 허용 됩니다. 부동 소수점 8비트와 같습니다.

    const length = collection === null ? undefined : collection.length;
    return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_IDX;
}

console.log(isArrayLike('asd')); // true
console.log(isArrayLike([])); // true
console.log(isArrayLike(document.querySelectorAll('div'))); // true
console.log(isArrayLike({ '0' : 'a', 'length' : 1 })); // true

console.log(isArrayLike(100)); // false
console.log(isArrayLike({ '0' : 'aaa', 'length' : 'a' })); // false
console.log(isArrayLike(document.getElementById('id'))); // false
```

## Strict Mode

Scope 노트에서 암묵적 전역 변수에 대하여 잠깐 다뤘습니다. 예를 들면 아래와 같이 `var` 키워드 없이 임의의 문자열로 변수 이름으로 지정하여 값을 할당하는 것입니다.

```javascript
function func() {
    a = 10;
}
func();
console.log(a); // 10
```

이러한 방법은 JavaScript 에서 추태 밖에 안 됩니다. 이를 막기 위해 ES5 버전부터 추가 된 `strict mode` 를 이용하는 것입니다. 이전의 JavaScript 언어 문법을 엄격하게 적용하여 오류 발생 가능성을 높이면서 JavaScript 엔진의 최적화를 방해하는 요소의 명시적인 에러를 발생합니다. (물론 `ESLint` - JavaScript 문법 강화, `TSLint` - TypeScript 문법 강화 를 사용해도 됩니다.)

이를 적용하는 방법은 매우 간단합니다. 전역의 선두 혹은 함수 몸체 선두에 `use strict` 를 추가하면 됩니다.

1. 전역 스코프를 Strict Mode 로 하는 경우

```javascript
'use strict';

function func() {
    a = 10; // Reference Error
}
func();
console.log(a);
```

2. 함수 레벨 스코프를 Strict Mode 로 하는 경우

```javascript
function func() {
    'use strict';
    a = 10; // Reference Error
}

func();
console.log(a);
```

전역 스코프와 함수 레벨 스코프 별로 Strict Mode 를 사용하면 암묵적 전역 변수를 아무리 선언해도 결국에는 Reference Error 로 종결 짓습니다. 

그렇지만 전역 스코프에 Strict Mode 를 사용하는 것은 올바르지 않습니다. 외부 라이브러리를 함께 불러오는 경우 그 라이브러리가 non-strict Mode 인 경우도 있기 때문입니다. 이런 경우는 즉시 실행함수에 Strict Mode 를 설정하는 방법이 있습니다.

그렇다고 함수 레벨 스코프로 Strict Mode 를 적용하는 것도 좋은 방법도 결국 아닙니다. 예를 들어 어느 함수는 이미 Strict Mode 를 적용했고, 다른 함수는 아무 것도 적용하지 않은 경우 입니다. 외부에서 Strict Mode 를 적용한 함수가 이를 적용하지 않은 함수를 참조하는 경우를 생각하면 문제가 있습니다.

이처럼 전역 스코프와 함수 레벨 스코프 별로 Strict Mode 를 설정하기 애매하면 아래와 같이 즉시 실행 함수를 사용합니다.

```javascript
<script src="/a_library.js" />
<script>
    (function() {
        'use strict';
        // a_library 에 있는 함수 실행
    }());
</script>
```

## Errors Of Strict Mode

대표적인 Strict Mode 의 에러는 아래와 같습니다.

- Implict Global Variable(암묵적 전역 변수. 자세한 내용은 생략합니다.)
- 변수, 함수, 매개변수 삭제. (`delete`)
- 매개변수 이름의 중복
- `with` 문 사용
- `this` 바인딩에 대한 `undefined` 문제.

참고로 Strict Mode 는 Internet Explorer 9 버전 이하는 제공하지 않습니다.

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-type-check
    - https://poiemaweb.com/js-strict-mode