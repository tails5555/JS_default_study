# `this`

자바스크립트 함수가 호출될 때, 매개변수로 전달되는 인자값 이외에 `arguments` 객체와 `this` 를 암묵적으로 전달 받습니다.

```javascript
function multiply(x, y){
    console.log(arguments); // 100, 200 등의 인자값 객체 입니다.
    console.log(this); // 무엇을 가리킬까?

    return x * y;
}

multiply(100, 200);
```

Java 에서 `this` 는 인스턴스 자신을 가리키는 참조 변수로 사용됩니다. 예를 들어 아래와 같은 클래스에서 `name`, `grade` 변수는 `Student` 객체의 맴버변수 입니다. 그 중 생성자에 쓰인 매개변수의 이름이 맴버변수와 같더라도 `this` 키워드를 이용해서 구분합니다.

```java
public class Student {
    private String name;
    private Integer grade;

    public Student(String name, Integer grade){
        this.name = name;
        this.grade = grade;
    }
}
```

그러나 JavaScript 의 경우는 `this` 에 바인딩되는 객체는 호출 방식에 따라 달라질 수 있습니다.

이 의미는 함수를 호출할 때 함수가 어떻게 호출되었는가에 따라 `this`에 바인딩할 객체가 동적으로 결정되는 뜻입니다.

여기서 함수를 호출하는 방식은 아래와 같이 4가지가 있습니다.

1. 함수 호출
2. Method 호출
3. 생성자 함수 호출
4. `apply` / `call` / `bind` 호출

```javascript
var func = function(){
    console.dir(this);
};

// 1. 함수 호출
func(); // window.func() or global.func() 와 같습니다.

// 2. Method 호출
var person = 
{ 
    name : '강사람', 
    greeting : func
}

person.greeting(); // person

// 3. 생성자 호출
var instance = new func(); // instance

// 4. apply / call / bind 호출
var person2 = {
    name : '김사람',
}
func.call(person2); // person2
func.apply(person2); // person2
func.bind(person2)(); // person2
```

## Function Call

```javascript
this === window; // true

// at Node.js
this === global; // true
```

함수 호출은 전역 객체(Global Object) 라는 최상위 객체에 해당된 모든 함수를 불러오는 의미입니다.

브라우저 측에서는 `window`, 서버 사이드 측(Node.js)에서는 `global` 객체를 의미합니다.

```javascript
var global = 'GLOBAL';

console.log(window.global); // 'GLOBAL';

var hello = function() {
    console.log('Hello!');
}

window.hello(); // 'Hello'

var func = function() {
    console.log(this); // window
    var inner = function(){
        console.log(this); // window
    }
    inner();
}

func();
```

전역 객체는 전역 스코프를 갖는 전역 변수를 프로퍼티로 소유하는데 기본적으로 `this` 는 전역객체에 바인딩 됩니다. 또한 내부 함수의 경우에도 `this` 는 외부 함수를 신경 쓰지 않고 전역 객체에 바인딩 됩니다.

```javascript
var name = '눈사람';

var person = {
    name : '강사람',
    func : function() {
        console.log(this); // person
        console.log(this.name); // '강사람'

        var inner = function() {
            console.log(this); // window
            console.log(this.name); // '눈사람'
        }

        inner();
    },
    callTimer : function() {
        setTimeout(function(){
            console.log(this);
            console.log(this.name); // 눈사람
        }, 1000);
    }
}

person.func();
person.callTimer();
```

참고로 객체에서 쓰이는 메소드의 `this` 는 객체를 가리키지만, 내부 함수와 콜백 함수에서는 전역 변수를 가리키게 됩니다.

즉 내부 함수는 일반 함수, 메소드, 콜백 함수 어디에 있든 `this` 는 전역 객체를 바인딩하는 의미로 받아들일 수 있습니다.

내부 함수의 `this` 가 객체 안에서 `this` 를 가리키는 방법이 없는 것은 아닙니다. 아래와 같이 즉석으로 객체를 가리키는 방법이 있습니다.

```javascript
var name = '눈사람';

var person = {
    name : '강사람',
    func : function() {
        var that = this; // this === person
        console.log(this); // person object
        console.log(this.name); // '강사람'
        
        var inner = function(){
            console.log(this); // window object
        console.log(this.name); // '눈사람'
            console.log(that); // person object
            console.log(that.name); // '강사람'
        }

        inner();
    }
}

person.func();
```

## Method Call

함수가 객체의 프로퍼티 값이면 메소드로 호출됩니다. 메소드 안의 `this` 는 해당 메소드를 소유한 객체에 바인딩 됩니다.

```javascript
var person1 = {
    name : '강사람',
    func : function() {
        console.log(this.name); // '강사람'
    }
}

var person2 = {
    name : '이사람'
};

person2.func = person1.func; // 객체의 메소드를 전달할 때 this 는 전달 받는 객체를 가리키게 됩니다.

person1.func(); // '강사람'
person2.func(); // '이사람'

function Person(name){
    this.name = name;
}

Person.prototype.greeting = function(){
    return `${this.name} 님, 안녕하신가요?`;
}

var person3 = new Person('김사람');
console.log(person3.greeting()); // '김사람 님, 안녕하신가요?'

Person.prototype.name = '저사람';

console.log(Person.prototype.greeting()); // '저사람 님, 안녕하신가요?'
```

프로토타입 객체(`__proto__`)도 메소드를 가질 수 있어, 이 메소드 안에서 사용된 `this` 도 해당 메소드를 호출한 객체에 바인딩 됩니다.

그러나 프로토타입 객체(`__proto__`)에서 프로퍼티를 설정해도 이를 가리키는 객체의 프로퍼티는 변함이 없습니다.

## Constructor Call

생성자 함수는 말 그대로 객체를 생성합니다. 기존 함수에 `new` 연산자를 붙이면 아예 생성자 함수로 동작합니다. 

이 이야기는 그냥 사칙 연산, 피보나치 함수 등 작은 함수에 대해서도 `new` 연산자로 호출하면 그 자체가 생성자 함수가 된다는 뜻입니다.

생성자가 실행되는 과정은 아래와 같습니다.

1. 빈 객체 생성과 `this` 바인딩

생성자 함수의 코드가 실행되기 전에 빈 객체가 생성 됩니다. 이 빈 객체는 생성자 함수의 `prototype` 프로퍼티가 가리키는 객체를 자신의 `__proto__` 로 가리키게끔 합니다.

2. `this` 를 통한 프로퍼티 생성

`this` 를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있습니다. `this` 는 새로 생성된 객체를 가리킵니다. 이를 이용해서 만든 프로퍼티와 메소드들은 새로 생성된 객체에 동적으로 추가 됩니다.

3. 생성된 객체 반환

반환문이 없으면 `this` 에 바인딩된 새로 생성한 객체가 암묵적으로 반환 됩니다. `this` 를 반환 하여도 결과는 같습니다.

그러나 `this` 가 아닌 다른 객체를 명시적으로 반환하면 이를 반환 합니다. 이로서 생성자 함수는 무용지물이 되어 버립니다.

```javascript
function Student(name, grade){
    // 1단계
    // 2단계
    this.name = name;
    this.grade = grade;
    // 3단계
}

var student1 = {
    name : '강학생',
    grade : 4
};

var student2 = new Student('이학생', 3);

var student3 = Student('김학생', 2);

console.log(student3); // undefined
console.log(window.name); // '김학생'
```

참고로 `student1`, `student2` 의 차이는 `__proto__` 프로퍼티(프로토타입 객체) 에 있습니다. `student1` 의 프로토타입 객체(`__proto__`) 는 `Object.prototype` 이고, `student2` 의 프로토타입 객체(`__proto__`) 는 `Student.prototype` 입니다.

그렇지만 생성자 함수에서 `new` 키워드를 빼 먹으면 어떻게 될까? 그냥 사칙 연산, 피보나치 연산 등을 실행하는 일반 함수와 1도 다르지 않습니다.

생성자 함수의 `this` 는 새로 생성하는 객체를 바인딩하지만, 그냥 호출하는 `this` 는 전역 객체를 가리켜서 `name`, `grade` 변수는 전역 변수에 바인딩 됩니다. 또한 반환문이 없으므로 `undefined` 값을 반환 합니다.

> **Scope-Safe Constructor**
>
> 생성자 함수에는 대문자를 붙어야 하는 이유가 이미 나왔습니다. 그렇지만 위와 같이 `new` 연산자를 안 쓰면 객체가 아예 생성되지 않습니다. 
> 
> 이러한 위험성을 회피하기 위해 사용하는 패턴을 Scope-Safe Pattern 이라고 합니다. 이는 `this` 가 호출된 함수의 인스턴스가 아니면 `new` 연산자를 아예 사용하지 않아서 이 내부에서 `new` 연산자를 재작성하여 인스턴스를 반환합니다.
>
> 대부분 라이브러리에서 광범위하게 사용 됩니다. 
>
> 참고로 `callee` 는 `arguments` 객체의 프로퍼티로 함수 Body 안에서 현재 실행 중인 함수를 참조할 때 사용 됩니다. 즉 함수의 이름과 같은 맥락입니다.
>
> ```javascript
> function Person(args){
>   // arguments.callee 는 호출된 함수의 이름을 나타냅니다.    
>   if(!(this instanceof arguments.callee))
>       return new arguments.callee(args);
>   this.name = args ? args : '';
> }
> 
> var person1 = new Person('한사람');
> var person2 = Person('두사람');
>
> console.log(person1.name); // '한사람'
> console.log(person2.name); // '두사람'
> ```

## `apply` / `call` / `bind` 호출

`this` 에 바인딩될 객체는 함수 호출 패턴에 의해 결정이 되는데 이는 자바스크립트 엔진이 수행합니다. 암묵적으로 `this` 바인딩 하는 방법 이외에 특정 객체에 명시적으로 바인딩하는 방법이 있습니다.

각각 `Function.prototype.apply`, `Function.prototype.call` 메소드 를 이용하는 것입니다.

1. `apply()` Method

```javascript
func.apply(thisArg, [argsArray]);
// thisArg 는 함수 내부의 this 에 바인딩할 객체 입니다.
// argsArray 는 함수에 전달할 Arguments 의 배열 입니다.

// arr.apply( arguments object )
```

`apply()` 메소드를 호출하는 주체는 함수 입니다. 오로지 본질적인 기능은 함수 호출을 하는 것입니다.

```javascript
var Student = function(name, grade) {
    this.name = name;
    this.grade = grade;
}

var std = {};

Student.apply(std, ['강사람', 4]);
console.log(std); // { name : "강사람", grade : 4 }
```

빈 객체 `std` 를 각 `arguments` 배열과 함께 `apply()` 함수로 호출하면, `Student` 함수의 `this` 는 곧 `std` 가 됩니다.

`this` 에 바인딩 된 `std` 객체에는 `name`, `grade` 프로퍼티가 따로 없습니다. 그래서 `arguments` 배열에 작성한 값들을 `name`, `grade` 프로퍼티 순으로 할당합니다.

`apply()` 메소드의 대표 용도는 `arguments` 객체와 같이 유사 배열 객체에서 배열 메소드를 사용하는 경우 입니다. `slice()` 같이 유사 배열 객체가 배열의 메소드를 사용하기 위해 `apply()` 메소드를 이용해야 됩니다.

```javascript
function convertArgsToArray() {
    console.log(arguments); // 인자 값 유사 배열 객체
    var arr = Array.prototype.slice.apply(arguments); // [].slice.apply(arguments)

    console.log(arr);
    return arr;
}

convertArgsToArray(1, 20, 300, 4000);
// [1, 20, 300, 4000]
```

그런데 `Array.prototype.slice.apply(arguments)` 의 의미는 무엇일까? `Array.prototype.slice()` 메소드를 호출하되, `this` 는 `arguments` 객체로 바인딩 하라 는 의미 입니다. 그래서 `slice()` 메소드를 `arguments` 객체 자신의 메소드 인 것처럼 호출할 수 있습니다.

2. `call()` Method

`call()` 메소드는 `apply()` 의 역할과 같지만, 각각 하나의 인자로 넘기는 차이가 있습니다.

```javascript
func.apply(thisArg, ['강학생', 4]);
func.call(thisArg, '강학생', 4);

func.apply(this);
func.call(this); // 콜백 함수에 사용할 this 를 프로토타입 메소드의 this 로 넘깁니다.
```

`call()` 메소드는 콜백 함수의 `this` 를 바인딩하기 위해 사용되기도 합니다.

```javascript
function Student(name, grade){
    this.name = name;
    this.grade = grade;
}

Student.prototype.greeting = function(callback){
    // 1
    if(typeof callback === 'function') {
        callback();
    }
};

Student.prototype.greetingCall = function(callback){
    // 3
    if(typeof callback === 'function'){
        callback.call(this);
    }
}

function func() {
    console.log(this.name);
    console.log(this.grade); // 2 
}

var std = new Student('강학생', 4);

std.greeting(func); // undefined
std.greetingCall(func); // '강학생', 4 가 잘 나옵니다.
```

1번의 시점에서 `this` 는 `Student` 객체 입니다. 하지만 2번의 시점에서 `this` 는 `window` 전역 객체입니다. 그래서 `greeting` 메소드를 실행하면 전부 `undefined` 값이 나옵니다. 이처럼 외부 함수 `func` 의 `this` 가 콜백 함수 내부의 `this` 와 일치 시켜야 하는 번거로움이 발생합니다.

이를 해결하기 위해 3번의 문장 처럼 `call()` 함수를 이용해서 1번의 시점의 `this` 를 콜백 함수에 바인딩 해야 마지막 문장처럼 정상 출력이 됩니다.

3. `bind()` Method

```javascript
func.call(thisArg, '강학생', 4);
func.bind(thisArg, '강학생', 4); // 인수 구성은 같습니다.

// func.bind(this); // 하지만 call 은 실행을 하고, bind 는 오로지 바인딩한 함수만 저장 해 둡니다.
```

```javascript
Student.prototype.greetingBind = function(callback){
    // 4
    if(typeof callback === 'function'){
        callback.bind(this)();
    }
}

std.greetingBind(func); // '강학생', 4 가 잘 나옵니다.
```

ES5 버전에 추가 된 `Function.prototype.bind` 메소드를 이용하는 방법도 있습니다. `bind()` 함수는 인자로 전달한 `this` 가 바인딩 된 새로운 함수를 리턴합니다. 

`bind()` 메소드는 `apply`, `call` 메소드처럼 함수 자체를 실행하지 않습니다. 그 대신에 명시적으로 함수를 호출해야 콜백 함수가 실행 됩니다.

참고로 `bind()` 메소드는 React.js 에서 이벤트를 관리할 때 필수로 사용 됩니다.

```jsx
class MyCounter extends React.Component {
    constructor(props){
        super(props);
        this.handleClickZero = this.handleClickZero.bind(this);
        this.state = { number : 1 };
    }

    handleClickPlus = (event) => {
        const { number } = this.state;
        this.setState({
            number : number + 1
        });
        event.preventDefault();
    }

    handleClickMinus = (event) => {
        const { number } = this.state;
        this.setState({
            number : number - 1
        });
        event.preventDefault();
    }

    handleClickZero = (event) => {
        this.setState({
            number : 0
        });
        event.preventDefault();
    }

    render(){
        const { number } = this.state;
        return(
            <Fragment>
                <h1>{number}</h1>
                <button onClick={(event) => this.handleClickPlus(event)} className="btn btn-primary">증가</button>
                <button onClick={this.handleClickZero} className="btn btn-warning">초기화</button>
                <button onClick={this.handleClickMinus.bind(this)} className="btn btn-danger">감소</button>
            </Fragment>
        )
    }
}

export default MyCounter;
```

## Exercise

참고로 이번 문서와 관련된 예제를 추가로 작성했습니다. `apply`, `call`, `bind` 메소드 사용을 인지하기 위한 예제입니다. 각 사각형들은 `apply`, `call` 메소드를 이용해서 만들고, `bind` 메소드는 버튼에 Event Listener 를 추가하여 사각형을 보이거나 없애거나 둘 중 하나를 작업합니다.

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-this

## Author

- 강인성([tails5555](https://github.com/tails5555))