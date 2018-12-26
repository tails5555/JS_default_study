## Closure

> 이 개념을 제대로 공부했다면 자바스크립트의 동작 원리를 제대로 깨달으셨습니다.

클로저(Closure) 는 JavaScript 뿐만 아니라 Function(함수) 를 일급 객체로 취급하는 함수형 프로그래밍 언어(Erlang, Scala 등) 에서 사용 되는 중요한 특성입니다. 일급 객체에 대한 개념을 까먹었으면 6번 함수(Function) 스터디 노트를 참조하시길 바랍니다.

MDN(Mozila Web) 에서 클로저는 함수와 그 함수가 선언되었을 때의 렉시컬 환경과의 조합으로 설명 되어 있습니다. 그러나 무슨 소리인지 이해가 안 갈 것입니다.

여기서 짐작할 수 있는 키워드는 **함수가 선언되었을 때의 렉시컬 환경(Lexical Environment)** 을 제어하는 것입니다.

이에 대한 설명은 소스 코드를 우선 참고하고 이해하는 것이 좋겠습니다.

```javascript
function outerFunction() {
    var a = 20;
    var innerFunction = function() {
        console.log(a); // 20
    }
    innerFunction();
}

outerFunction();
```

함수 `outerFunction()` 에서 내부 함수 `innerFunction()` 가 선언되고 호출 되었습니다. 여기서 내부 함수인 `innerFunction()` 는 자신을 포함하는 함수인 `outerFunction()` 안에 동거하는 변수 `a` 를 접근할 수 있습니다. 렉시컬 스코프(Lexical Scope) 에 따라 같은 함수 내에 두 변수들이 선언 되었기 때문입니다.

Scope 스터디 노트에 따르면, 함수를 호출할 때가 아니라 함수를 **어디에** 선언되었는가에 따라 결정되는 개념을 **렉시컬 스코프(Lexical Scope)** 라고 합니다. 

## Closure With Execution Context

위에서 설명한 `innerFunction()` 과 `outerFunction()` 에 대하여 실행 컨텍스트와 연관 지어 알아 보겠습니다.

내부함수 `innerFunction()` 가 호출되면 자신의 실행 컨텍스트(Execution Context, EC) 가 EC Stack 에 쌓이고 변수 객체(Variable Object) 와 스코프 체인(Scope Chain), `this` 바인딩 객체가 결정 됩니다. 

여기서 함수 `innerFunction()` 의 스코프 체인은 전역 스코프(Global Scope) 를 가리키는 전역 객체, 함수 `outerFunction()` 의 스코프를 가리키는 이의 활성 객체, 마지막으로 자신의 스코프를 가리키는 활성 객체를 순차적으로 바인딩 합니다. 스코프 체인이 바인딩한 객체가 바로 렉시컬 스코프(Lexical Scope) 의 실체 입니다.

```markdown
**innerFunction() Scope Chain**

innerFunction() -> outerFunction() -> Global Scope

innerFunction() 의 시점으로 스코프 체인은 함수가 호출되는 순서대로 쌓이게 됩니다.

맨 처음에 부른 주체는 밑바닥으로 밀려납니다.
```

그래서 내부 함수인 `innerFunction()` 가 자신을 포함하고 있는 외부함수 `outerFunction()` 의 변수 `a` 에 접근하는 것을 **상위 스코프에 접근** 한다고 합니다. 이는 렉시컬 스코프의 참조(Reference) 를 차례대로 저장하고 있는 실행 컨텍스트의 스코프 체인을 자바스크립트 엔진이 검색할 수 있기 때문에 가능한 입니다.

자세히 알아보면, `innerFuncion()` 함수 스코프에서 변수 `a` 를 압수 수색하면 검색 실패하지만, 외부 함수인 `outerFunction()` 함수 스코프에서 변수 `a` 를 발견하게 되어 `innerFunction()` 에서 변수 `a` 를 사용할 수 있게 되는 것입니다.

```javascript
function outerFunction() {
    var num = 100;
    var innerFunction = function () {
        console.log(num);
    }
    return innerFunction;
}

var insideFunc = outerFunction();
insideFunc();
```

이번에는 `innerFunction()` 만을 반환하게 했습니다. 여기서 `outerFunction()` 은 안에 있는 함수만 반환하고 실행 컨텍스트에서 없어지게 됩니다. 그러면 변수 `num` 에 대해 접근하는 방법은 없는 것인가요? 아닙니다.

실제로 위의 실행 결과로는 `num` 의 값인 10이 나옵니다. 이는 이미 실행이 종료되어 실행 컨텍스트 Stack 에서 제거된 함수인 `outerFunction()` 함수의 지역 변수인 `x` 가 다시 되살아나서 동작하고 있습니다.

이처럼 자신을 포함하는 외부 함수 보다 내부 함수가 오래 유지 되는 경우, 내부 함수가 호출 되더라도, 외부 함수의 지역 변수에 접근할 수 있습니다. 이를 **클로저(Closure)** 라고 합니다.

참고로 클로저는 마치 80~90년대 활약하다가 불미의 사고로 돌아가신 유재하, 김현식을 연상하면 쉽게 이해 됩니다. 비록 같은 날 11월 1일에 돌아 가셨지만, 실제로 이 노래를 리메이크한 가수들의 음악이나 발표 된 음원을 들어보면, 돌아가시기 전에 불렀던 감정이 그대로 묻어 나서 더욱 듣고 싶어질 것입니다.

이제 MDN 에서 설명한 뜻을 더욱 자세하게 풀어 보겠습니다. 함수는 **내부 함수**, 선언 될 때의 렉시컬 환경은 **내부 함수가 선언될 때의 스코프** 를 의미합니다. 클로저는 자신이 생성될 때의 환경(Lexical Environment)을 기억하는 함수로 생각하면 됩니다.

클로저에 의해 참조된 외부 함수의 변수인 `num` 을 자유 변수(Free Variable) 라고 합니다. 클로저는 자유 변수와 엮여 있는 의미로도 볼 수 있습니다.

## Examples Of Closure

자바스크립트에서 클로저 라는 노래가 웰케 불러지는 것일까요? 원래 자신이 생성될 때의 환경(Lexical Environment) 을 기억해야 되어 메모리 차원에서 손해를 볼 수 있습니다. 하지만 자바스크립트 등 함수 기반 프로그래밍에서는 유용하게 쓸 수 있습니다.

1. 상태 유지

클로저는 **현재 상태를 기억하고 변경된 최신 상태를 유지** 하는 목적으로 사용 됩니다.

이 예제는 클로저의 `mybox` 를 이용한 상자 색상 변경 프로그램을 참고하시면 이해하기 쉽습니다.

#### 계속 작성하겠습니다!