## Scope

> 어느 프로그래밍 언어이든 꼭 알고 넘어가야 하는 개념.

스코프(Scope) 는 참조 대상 식별자인 변수나 함수 이름으로 찾아내는 규칙 입니다.

예를 들어 아래와 같은 문장을 살펴 보겠습니다.

```javascript
var a = '아아아';

function func() {
    console.log(a); // undefined
    var a = '오오오';
    console.log(a); // '오오오'
}

func(); 
console.log(a); // '아아아'

if(a === '아아아'){
    var a = '이이이';
    console.log(a); // '이이이'
}

console.log(a); // '이이이'
```

여기서는 같은 이름인 변수 `a` 가 2번 선언 되었습니다. 이처럼 변수는 전역 또는 코드 블록(`if`, `for`, `while` 등) 이나 함수 내에서 선언하며 중첩될 수 있습니다.

그래서 전역에 선언된 변수 `a` 는 어디서든 참조할 수 있지만, `func` 함수의 `a` 변수는 외부에선 참조할 수 없습니다. 이를 스코프라고 합니다.

스코프의 종류는 크게 전역 스코프(Global Scope), 지역 스코프(Function-Level Scope) 로 나뉩니다.

전역 스코프는 아시다시피 **코드 어디서든 참조** 할 수 있고, 지역 스코프는 **함수 코드 블록 내부와 이의 하위 함수** 에서 참조할 수 있습니다. 마치 같은 나라에서 쓰는 말이 서울말이지만, 다른 지방에서 쓰는 말 중에 일부는 사투리를 섞어 쓰는 것과 비슷합니다.

각 스코프 내부에 있는 변수를 전역 변수(Global Variable), 지역 변수(Local Variable) 로 부릅니다.

## Scope In JavaScript

자바스크립트에서의 스코프는 다른 언어와 개념이 약간 다릅니다. 예를 들어 Java 에서 if 문 Scope 를 작성하겠습니다.

```Java
public class Main {
    public static void main(String[] args){
        int x = 10;
        if(x >= 10){
            int y = 200;
            System.out.printf("%d\n", y);
        }
        System.out.printf("%d\n", y); // y 를 찾을 수 없는 에러가 나올 것입니다.
    }
}
```

Java 에서의 `if` 문 내부 변수 `y` 는 이 `if` 문 에서만 유효합니다. 그래서 바깥에서 `y` 를 조회해도 오류가 걸립니다. 이 개념을 **블록 레벨 스코프(Block Level Scope)** 라고 합니다.

그러나 JavaScript 는 **함수 레벨 스코프(Function Level Scope)** 이기 때문에 함수 블록 내에서 참조 가능한 변수는 외부에선 택도 없게 됩니다.

물론 JavaScript 에서 블록 레벨 스코프를 사용 못 한다는 것은 아닙니다. ECMAScript 6 버전부터 도입 된 `let` 타입을 사용하면 됩니다.

```javascript
var x = 100;
if(x > 10){
    console.log(x); // 100
    var x = 1000;
}
console.log(x); // 1000

let y = 100;
if(y > 10){
    let y = 1000; // Identifier 'y' has already been declared.
}
```
## Global Scope

전역 변수를 생성하는 방법은 JavaScript 를 처음 하는 사람도 금방 할 수 있습니다.

대표적인 전역 변수의 사례는 전역 객체(Global Object) 의 `window` 프로퍼티로 볼 수 있습니다.

```javascript
var global = '전역';

function func() {
    var local = '지역';
    console.log(global); // '전역'
    console.log(local); // '지역'
}

func();

console.log(global); // '전역'
```

C언어, Java 와 달리 특별한 시작점이 따로 없어 코드가 나타나는 즉시 해석되고 실행 됩니다.

그리고 전역에 변수를 선언하기 쉬워 이를 남발하는 문제가 발생하고, 재할당에 의한 상태 변화로 코드 예측이 오히려 어려워 집니다. 

> **Non-Block Level Scope**
> 
> ```javascript
> var x = 10;
> if(x > 1) {
>       var y = 100; 
> }
> console.log(y); // 100
> ``` 
> JavaScript 에서는 블록 레벨 스코프를 사용하지 않기 때문에 변수 `y` 는 코드 블록 내에서 선언되었더라도 **전역 스코프** 를 가져 바깥에서도 사용할 수 있습니다.

## Function Level Scope

```javascript
// Case 01
var x = 100;

(function() {
    var y = 10;
    console.log(y); // 10
})();

console.log(x); // 100
console.log(y); // 'y' is not defined.

// Case 02

function func(){
    console.log(global); // undefined
    var global = '지역';
    console.log(global); // '지역'
}
var global = '전역';
func();
console.log(global); // '전역'
```

자바스크립트는 함수 레벨 스코프를 사용하기 때문에 함수 내부에 선언된 매개변수와 변수는 외부에서 사용이 불가합니다.

Case 01, 02 처럼 전역 영역에서는 전역 변수만 참조 가능하고, 함수 내부에서는 **한정된 전역 변수와 지역 변수만** 참조 가능합니다.

왜 함수 내부에서는 한정된 전역 변수만 참조가 가능할까요? 전역 변수와 지역 변수 이름이 서로 같은 경우에는 지역 변수를 우선으로 대우하기 때문입니다.

여기서 Case 02번 문장을 잠깐 살펴보겠습니다. 왜 전역 변수에 있는 `global` 변수에 대한 출력 결과가 `undefined` 로 나오는 것일까요? 우선 자바스크립트 엔진(V8 를 기준으로)이 기명 함수(이름 있는 함수) 와 전역 변수를 선언한 것을 먼저 발견합니다.

그 다음에 함수 내부에 있는 문장들을 확인하는데 여기서 `global` 변수를 함수 내부에서 선언하는 문장이 발견 됩니다. 그래서 자바스크립트 엔진은 외부에 있는 전역 변수인 `global` 변수의 존재 여부를 판단하지 않고 지역 변수에 있는 `global` 변수를 우선 참조를 합니다. 즉 이를 선언하기 이전에 지역 변수의 값은 `undefined` 가 되어 출력 결과가 이처럼 나옵니다.

```javascript
var global = '전역';

function func1() {
    var global = '지역1';
    console.log(global); // '지역1'

    function func2(){
        console.log(global); // '지역1'
    }

    func2();
}

func1();
console.log(global); // '전역'
```

지역 변수는 자신이 포함된 함수 내부에서도 접근할 수 있게 도와 줍니다. 이를 클로저 개념이라고 합니다. 그리고 함수 `func2` 를 실행하는 경우 `func1` 함수에 의한 우선 순위가 밀려서 결국 지역1 이란 문자열이 나오게 됩니다.

```javascript
var x = 10;

function func1() {
    x = 100;
    console.log(x); // 100

    function func2() {
        x = 1000;
        console.log(x); // 1000
    }

    func2();
}

func1();
console.log(x); // 1000
```

물론 함수 영역에서 전역 변수를 참조할 수는 있습니다. 물론 전역 변수, 상위 함수의 지역 변수 등의 값도 변경할 수 있습니다. 중첩 스코프는 가장 인접한 지역을 우선으로 참조합니다. 

아래와 같은 문장은 중첩 스코프에 대하여 어느 정도 이해하는지 테스트하는 문장이니 비교 및 분석을 진행해보길 권장합니다.

```javascript
var func = function() {
    var a = 10, b = 20;
    var inner = function() {
        var b = 100, c = 200;
        console.log(a, b, c); // 10 100 200
        a += b + c;
        console.log(a, b, c); // 310 100 200
    }
    console.log(a, b); // 10 20
    inner();
    console.log(a, b); // 310 20
}
```

## Lexical Scope

```javascript
var x = 10;

function func() {
    var x = 100;
    another();
}

function another() {
    console.log(x);
}

func(); // 100
another(); // 10
```

위 예제의 실행 결과는 각각 다릅니다. 위 `func()` 함수를 실행하면 변수 `x` 의 값이 이 지역 변수를 따르게 되어 결국 `another()` 함수를 호출하면 출력 결과가 100이 나오게 되는 것입니다.

하지만 달랑 `another()` 함수만 실행하면 변수 `x` 는 전역 변수를 가리키게 되어 출력 결과는 10이 나옵니다.

이처럼 상위 스코프를 추측하는 방법은 어디서 호출하였는가와 어디서 선언하였는가로 달라집니다.

맨 위의 `func()` 함수에서는 `another()` 함수를 또 호출하였기 떄문에 `another()` 함수의 상위 스코프는 `func()` 함수와 전역이 됩니다.

그 다음의 `another()` 함수는 전역에서 선언이 되었으므로 상위 스코프는 전역이 됩니다.

이처럼 어디서 호출하는지 예측하는 방식을 **동적 스코프(Dynamic Scope)** 라고 하고, 어디서 선언이 되었는지 예측하는 방식을 **렉시컬 스코프(Lexical Scope)** 라고 합니다.

**Implicit Global Variable**

> ```javascript
> function func() {
>     x = 20;
> }
> func();
> console.log(x); // 20
> ```
> 
> `func` 함수 내에 선언되지 않은 변수 `x` 를 초기화하면 어떤 과정이 일어날까요? 당연히 변수 `x` 의 참조를 찾는 과정이 시작 될 것입니다.
> 
> 자바스크립트 엔진을 통하여 변수 `x` 가 어디에 선언 되었는지 검색을 하고, 지역 변수와 전역 변수 모두 없는 사실을 발견합니다.
> 
> Global Context 의 `this` 가 가리키는 전역 객체의 프로퍼티 `x`를 동시에 생성합니다. (참조 사이트에서 중간에 함수 호출이 빠졌습니다. 대신에 여기에 추가 하였습니다.) 결국 식별자 `x` 는 전역 변수가 됩니다. 이를 암묵적 전역 변 라고 합니다. 하지만 사용하지 않는 것이 좋겠습니다.

## Overwrite Variables

각 자바스크립트 파일 별로 전역 변수를 중복해서 이용하면 어떻게 될까? 참고로 스터디 소스 코드에 일부 문장을 추가하였습니다.

어느 한 파일은 전역 변수 `x` 의 값을 10으로 초기화하고, 나머지 파일은 전역 변수의 변동 상황을 모른 채 `x` 의 값을 20으로 변경하고 출력합니다.

자바스크립트 모든 파일에 대하여 총괄적으로 전역 변수의 중복을 허용 합니다. 그래서 스터디 파일에 작성한 아래 주석을 실행하면 무한 루프에 걸립니다.

이처럼 전역 변수의 무분별한 사용은 위험합니다. 또한 전역 변수는 지역 변수에 비하여 탐색 시간이 오래 걸립니다.

한 마디로 짧게 이야기 하면 **var 키워드를 사용하지 않는 이상 애초에 사용을 하지 맙시다. 사용을 해도 얻을 장점은 크게 없습니다.**

대신에 전역 변수 이용률을 줄이기 위해 전역 객체 하나를 만드는 습관을 들이는 것입니다.

물론 아래와 같이 즉시 실행 함수를 사용하여 전역 변수 사용을 억제하는 방법이 있습니다. 즉시 실행 함수에서는 잠깐만 실행 되고 그 뒤에는 전역에서 바로 사라집니다.

```javascript
var GLOBAL_OBJ = {};
GLOBAL_OBJ['global_x'] = 100;
console.log(GLOBAL_OBJ.global_x);

(function() {
    var OBJ = {};
    OBJ['global_y'] = 200;
    console.log(OBJ.global_y); // 200
}());

console.log(OBJ.global_y); // 'OBJ' is not defined.
```

## References


- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-scope