## Execution Context

실행 컨텍스트는 Scope, Hoisting, Closure, `this`, `function` 등 동작 원리를 담고 있는 JavaScript 의 핵심 원리 입니다.

다음에 배울 Closure 개념을 공부하기 위해 꼭 알아야 합니다.

ECMAScript Specification 에서 실행 컨텍스트는 실행 가능한 코드가 실제로 실행하기 위해 **필요한 환경** 으로 정의한다. 실행 가능한 코드는 **전역 코드**, **함수 코드**, **Eval 코드**(JavaScript 코드 일부를 문자열로 묶어 내장 함수로 사용하는 개념 입니다.)

JavaScript 엔진은 코드를 실행하기 위하여 변수(전역 변수, 지역 변수, 매개 변수, 객체 Property), 함수 선언 장소, 변수의 Scope, `this` 의 가리키는 정보 등을 알고 있어야 합니다.

실행에 필요한 정보를 정리하고 구분하기 위하여 실행 컨텍스트를 물리적 객체의 형태로 관리합니다. 아래의 소스 코드를 사례로 들어 보겠습니다.

```javascript
var a = 10;

function func1() {
    var b = 20;

    function func2() {
        var c = 30;
        console.log(a + b + c);
    }

    func2();
}

func1();
```

실행 컨텍스트의 구조는 스택(Stack) 과 유사합니다. 우선 Global EC(Execution Context) 이 Stack 에 누적되고, 여기서는 각 함수 `func1()`, `func2()` 단위 별 EC 가 새로 생성 됩니다. 이 친구들은 스택에 쌓이게 되고 컨트롤이 이동합니다.

```markdown
1. Global EC
2. Global EC => func1() EC
3. Global EC => func1() EC => func2() EC
4. func2() 함수 종료 시, TOP 이 func1() EC 를 가리킵니다.
5. func1() 함수 종료 시, TOP 이 Global EC 를  가리킵니다.
```

여기서 Global EC(전역 실행 컨텍스트) 는 JavaScript Application 이 종료될 때(Web Browser 가 닫히거나 Web Page 를 나가는 경우.) 까지 유지 됩니다.

함수 실행이 각각 끝나면 해당 함수의 EC 를 파기하고 직전의 EC 에게 컨트롤을 반환 합니다.

## EC Object

실행 컨텍스트의 물리적인 구조는 객체의 형태를 가지고, 아래의 3개 프로퍼티를 소유합니다.

1. Variable Object (변수 객체)

실행 컨텍스트가 생성 되면 JavaScript 엔진은 실행에 필요한 여러 정보(위에서 언급한 전역 변수, 지역 변수 등등)들을 담을 객체가 필요합니다. 이를 Variable Object 라고 부릅니다.

코드에서는 Variable Object 를 엔진에 의해 참조만 하고, 실제로 접근 불가능합니다.

Variable Object 는 EC 의 프로퍼티의 일부로 다른 객체를 각각 가리킵니다. 전역 코드의 EC 와 함수 코드의 EC 는 다릅니다.

전역 컨텍스트(전역 코드의 EC) 는 최상위에 위치하는 **모든 전역 변수와 함수 등을 포함**하는 전역 객체(Global Object) 를 가리킵니다.

함수 컨텍스트(함수 코드의 EC) 는 활성 객체(Activation Object) 를 가리키며 **매개 변수와 인수들** 정보를 배열의 형태로 (정확히는 유사 배열 객체) 담는 `Arguments Object` 가 새로 추가 됩니다.

2. Scope Chain(SC)

스코프 체인(Scope Chain) 은 일종의 List 입니다. 전역 객체와 중첩된 함수의 스코프의 레퍼런스 포인터를 차례로 저장 합니다.

이 뜻은 스코프 체인이 해당 전역 혹은 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 전역 객체(Global Object)나 활성 객체(Activation Object)의 리스트를 가리킵니다.

실행 컨텍스트의 활성 객체를 선두로 하여 순차적으로 활성 객체(Activation Object. 상위에서 하위 순으로)를 가리키고, 리스트의 마지막 포인터는 무조건 전역 객체(Global Object) 를 가리킵니다.

> **Scope Chain VS Prototype Chain**
> 
> 스코프 체인과 프로토타입 체인과는 참고로 엄연히 다릅니다.
> 
> 스코프 체인은 식별자 중에서 전역 객체의 프로퍼티가 아닌 식별자(변수) 를 검색하는 메커니즘의 구조 입니다.
> 
> 하지만 프로토타입 체인(Prototype Chain) 은 전역 객체 이외의 객체 프로퍼티(메소드도 포함 됩니다.) 를 검색하는 메커니즘의 구조 입니다.

JavaScript 엔진은 Scope Chain 을 통하여 Lexical Scope 를(렉시컬 스코프. 함수의 호출에 따라 변수의 스코프를 결정하는 개념. 이는 8번 노트에서 참고하시길 바랍니다.) 파악합니다. 

함수 중첩 상태에서 하위 함수 안에서 상위 함수의 스코프와 전역 스코프까지 참조할 수 있습니다. 이는 스코프 체인 검색을 통해 가능합니다. 중첩될 때마다 부모 함수의 Scope 가 자식 함수의 스코프 체인에 포함 됩니다. 함수 실행 중에 변수를 만나면 그 변수를 Activation Object 에서 검색하고, 없는 경우에는 스코프 체인에 담긴 순서대로 검색을 이어가게 됩니다.

스코프 체인(Scope Chain) 은 함수의 프로퍼티인 `[[Scope]]` 로 참조할 수 있습니다.

3. `this` Value

`this` 프로퍼티에는 `this` 값이 할당 됩니다. `this` 에 할당 되는 값은 함수 호출 패턴에 의해 달라지는 사실을 지난 노트에서 잠깐 다뤘습니다.

이는 아래 링크를 통해 참고하시길 바랍니다.

[this 노트 바로 가기](./10_this_keyword.md)

## Reference About Execution Context

실행 컨텍스트의 생성 과정에 대해서는 아래 링크를 참조하시길 바랍니다.

[링크 참조](https://poiemaweb.com/js-execution-context#3-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%9D%98-%EC%83%9D%EC%84%B1-%EA%B3%BC%EC%A0%95)

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-execution-context

## Author

- 강인성([tails5555](https://github.com/tails5555))