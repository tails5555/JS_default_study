## JavaScript Object

JavaScript 에서 Primitive Type 을 제외한 나머지가 Object Type 입니다. JavaScript 에서 Object 는 다음과 같은 속성을 가집니다.

- 객체는 Key-Value 로 구성된 Property 들의 집합 입니다.
- Property 값이 함수인 경우에는 객체의 행동(Behavior) 의 의미를 구분하기 위해 Method 라 합니다.
- JavaScript 의 객체는 상속을 구현하기 위해 Prototype 이라 불리는 객체를 사용합니다.

## What Is Property?

Property 는 Key 와 Value 로 구성 됩니다. 여기서 Key 는 식별자(identity) 이기 때문에 유일한 값입니다. Property 의 Key 값은 **빈 문자열을 포함하는 모든 문자열과 Symbol 값** 으로 구성 됩니다. Value 는 모든 값이 들어올 수 있습니다.

그러나 이미 존재하는 Property 의 Key 값에 Value 값을 할당하면, 가장 나중에 할당된 값이 저장 됩니다. 그리고 배열과 달리 **Property 의 Key 값 순서를 보장하지 않습니다.**

```javascript
var person = {
    name : {
        last : '강',
        first : '사람',
    },
    age : 25,
    hobby : '모형 만들기',
    // ...
    name : '강사람',
}

console.log(person.name); // 나중에 할당 된 '강사람' 이 나오게 됩니다.
```

## Object Literal

JavaScript 에서 객체를 생성하는 방법은 중괄호를 사용합니다. 클래스 기반 언어(C++, Java, Python etc.) 와 비교하면 간단하지만, ES6 버전 이후로는 클래스를 따로 제공합니다.

```javascript
var boy = {
    name : '짱구',
    age : 5,
    sayHello : function () {
        console.log(`${this.name} 님, 안녕하세요?`);
    },
    sayFunctionHello(){
        console.log(`${this.name} 님, 안녕하세요?`);
    },
    sayArrowHello : () => console.log(`${this.name} 님, 안녕하세요?`)
}

boy.sayHello();
// 이 출력 값은 '짱구 님, 안녕하세요?' 가 나옵니다.
boy.sayFunctionHello();
// 이 출력 값도 '짱구 님, 안녕하세요?' 가 나옵니다.
boy.sayArrowHello();
// 이 출력 값은 this 가 무엇을 가리키는지 인식을 못해 ' 님, 안녕하세요?' 가 나옵니다. 

Object.assign(this, boy);
// 위의 출력 결과와 같은 문장이 나오려면 assign() 함수를 사용하여 this 가 boy 객체를 가리키게끔 합니다.
boy.sayArrowHello();
// 그러면 출력 값은 '짱구 님, 안녕하세요?' 가 나옵니다.
```

## Object Constructor Function

`new` 연산자와 `new Object()` 를 이용해서 빈 객체({} 와 같은 맥락.) 를 생성할 수 있습니다. 빈 객체 자체에 대놓고 프로퍼티를 추가하고 할당합니다.

1. Using `new Object()`

```javascript
var girl = new Object();

girl.name = '짱아';
girl.age = 2;
girl.sayHello = function () {
    console.log(`${this.name} 님이 따따따따 거립니다.`);
};
girl.sayArrowHello = () => {
    console.log(`${this.name} 님이 따따따따 거립니다.`);
}

girl.sayHello();
// 이 출력 값은 '짱아 님이 따따따따 거립니다.' 가 나옵니다.

Object.assign(this, girl); // 이 과정이 없으면 this 는 아무 것도 가리키지 않아 원하지 않은 값이 나올 것입니다.
girl.sayArrowHello();
// 그러면 출력 값은 '짱아 님이 따따따따 거립니다.' 가 나옵니다.
```

2. Using Constructor Function

방금 전의 짱구와 짱아와 객체에 쓰인 Property 는 같습니다. 그렇지만 나중에 철수와 유리 객체를 생성하려면 같은 프로퍼티를 생성하는 것은 번거롭습니다. 그래서 생성자 함수를 사용하면 클래스의 개념을 그나마 따를 수 있습니다.

```javascript
function Children(name, age){
    var kindergarten = '팡팡유치원';
    this.name = name;
    this.age = age;
    this.sayHello = function() {
        console.log(`${this.name} 님, 안녕하세요?`);
    };
    this.sayArrowHello = () => console.log(`${this.name} 님, 안녕하세요?`);
}

var children1 = new Children('철수', 5);

children1.sayHello(); // '철수 님, 안녕하세요?'
console.log(children1.age); // 5
console.log(children1.kindergarten); // undefined. kindergarten 변수는 private 변수로 외부에서 접근이 불가능합니다.
children1.sayArrowHello(); // '철수 님, 안녕하세요?'
console.log(this.kindergarten); // '팡팡유치원'

var children2 = new Children('유리', 5);

children2.sayHello(); // '유리 님, 안녕하세요?'
children2.sayArrowHello(); // '유리 님, 안녕하세요?'
console.log(this.kindergarten); // '팡팡유치원'
```

생성자 함수(Constructor Function) 이름은 대문자로 시작하는 것이 관례 입니다.

그리고 Property 와 Method 에 작성한 `this` 키워드는 Constructor Function 이 생성할 Instance(인스턴스) 를 가리키게 됩니다.

this 에 바인딩 되어 있는 프로퍼티와 메소드는 외부 참조 가능합니다. 그러나 생성자 함수 내에 선언 된 일반 변수는 외부 참조가 불가능합니다.

그리고 new 연산자를 붙이면 생성자 함수로 동작을 하는데 `this` 바인딩이 다르게 동작하게 됩니다. 위 문장에서는 철수 객체를 생성할 때 this 는 철수의 인스턴스를 가리키고, 유리 객체를 생성하면 this 는 유리의 인스턴스를 가리킵니다. 그래서 방금 전에 Arrow Function 에서 assign() 함수를 이용한 바인딩이 필요 없어집니다.

## Property Initialize

Property 의 Key 에서 유의할 사항이 있습니다. Key 는 문자열이기 때문에 Quote('', "") 로 구분하는 것이 좋습니다. `genre-name`, `update-date` 등 연산자가 포함된 문자열은 그냥 작성하면 Expression 으로 인식하여 객체 생성에 차질이 생깁니다.

```javascript
var student = {
    id : 10,
    'id' : 1,
    'last-name' : '강',
    'first-name' : '사람',
};

console.log(student); // {id: 1, last-name: "강", first-name: "사람"}
```

물론 Expression 을 사용하여 Property 를 생성해도 상관 없습니다. 다만 대괄호([]) 를 사용해서 묶어서 사용하는 것을 권장합니다.

```javascript
var num_zero = 0;
var num_one = 1;

var student = {
    id : 1,
    ['name' + num_zero] : '강',
    ['name' + num_one] : '사람',
};

console.log(student); // {id: 1, name0: "강", name1: "사람"}
```

추가로 JavaScript 에서 사용 되는 예약어(`class`, `catch`, `const` 등) 를 프로퍼티 Key 로 사용해도 큰 문제는 없지만 권장하진 않습니다. 예약어는 아래 Page 를 참고하시길 바랍니다.

https://www.w3schools.in/javascript-tutorial/keywords/

## Property Access

프로퍼티 값을 읽는 방법은 대표적으로 마침표 사용, 대괄호 사용 으로 나뉩니다. 마침표는 영문자로 시작하는 문자열과 표현식이 아닌 Key 이름으로만 가능합니다. 그리고 대괄호는 문자열로 조회할 때 쿼트로 설정하는 것이 좋습니다. 참고로 존재하지 않은 프로퍼티의 값은 `undefined` 로 반환 됩니다.

```javascript
var student = {
    'id' : 1,
    'student-number' : 201332001,
    'last' : '강',
    'first' : '사람',
    '1' : '뭐지',
};

console.log(student.last); // '강'
console.log(student.student-number); // student - number 는 표현식이기 때문에 마침표 사용법은 먹히지 않습니다.
console.log(student[student-number]); // 마찬가지로 대괄호에 표현식을 써도 바로 안 먹힙니다.
console.log(student['student-number']); // 201332001. 위에서 설명한 바와 같이 표현식이 있으면 쿼트를 사용하여 구분하는 것이 좋겠습니다.

console.log(student[1]); // '뭐지'
console.log(student.1); // 또한 마침표 사용은 숫자로 시작하는 문자열로 불가능합니다.
```

또한 객체의 프로퍼티는 즉석으로 수정, 추가, 삭제할 수 있습니다.

수정과 추가는 마침표, 대괄호 아무거나 설정 가능합니다. 다만 삭제의 경우는 Property 의 Key 값으로만 진행해야 합니다.

```javascript
var myBox = {
    width : 100,
    height : 200
}

// 1. 즉석으로 수정
myBox['width'] = 200; // 박스의 너비가 200 이 됩니다.

// 2. 즉석으로 추가
myBox.height = 300; // 박스의 높이를 300 으로 설정 합니다.
myBox['name'] = '내 박스'; // 박스의 이름을 '내 박스' 로 설정합니다.

// 3. 즉석으로 삭제
delete myBox.name; // 박스의 이름이 없어집니다.
delete myBox; // Property 의 이름이 아닌 객체의 이름으로 삭제 불가능.
```

## for-in Syntax

for-in 문장은 Java 에선 List 에 있는 값을 가져오는 것입니다.

그러나 JavaScript 에서는 객체 안에 있는 Property 의 Key 값을 가져올 때 사용합니다. 물론 배열에 대해서는 Index 값을 가져옵니다.

참고로 배열에 Property 를 추가하면 배열 요소만 순회하지 않고 Property 값도 나오게 됩니다. 그리고 Property 의 Key 는 문자열로 나오기 때문에 Value 를 가져오기 위해 대괄호를 사용하는 것이 좋습니다.

```javascript
var student = {
    stdNum : 201332001,
    last : '강',
    first : '사람',
    grade : 4
};

for(var property in student){
    console.log(property, student[property]);
}

/*
 * 출력 결과는 아래와 같습니다.
 * stdNum 201332001
 * last 강
 * first 사람
 * grade 4
 */

var arr = [10, 20, 30];

for(var idx in arr){
    console.log(idx, arr[idx]);
}

/*
 * 출력 결과는 아래와 같습니다.
 * 0 10
 * 1 20
 * 2 30
 */
```

## Pass-By-Reference

어느 프로그래밍 언어이든 마찬가지인데, Object 은 Reference 를 이용해서 대입합니다. 

객체의 Property 와 Method 등의 연산자는 서로 뭉쳐서 메모리의 어느 공간에 저장 되어 있고, 이에 대입된 변수는 메모리의 주소를 이용하여 Reference 값이 저장 되어 있습니다. 

그리고 객체는 동적으로 변경할 수 있어 Heap Segment 메모리 공간에 저장됩니다.

(물론 Number, String, Boolean 등의 값은 Pass-By-Value 로 복사되어 전달 되는건 안 비밀. 이들은 Stack Segment 메모리 공간에 저장되고 Immutable 한 값인 것도 안 비밀.)

```javascript
var paper1 = {
    context : '아아아'
};

var paper2 = paper1;
console.log(paper1.context, paper2.context); // 둘 다 내용이 똑같습니다.

paper2.context = '이이이';
console.log(paper1.context, paper2.context); // 둘 다 내용이 똑같습니다.

console.log(paper1 === paper2); // true

var paper3 = {
    context : '이이이'
};

console.log(paper1 === paper3); // false
```

위에 작성된 paper1, paper2 의 변수는 { context : '~~~' } 가 저장된 공간을 서로 같이 가리킵니다. 결국에는 복사되지 않고 서로 같은 결과물이 나오게 됩니다.

그러나 paper3 의 변수는 내용이 paper1, paper2 와 서로 같지만 참조하는 객체의 주소가 다르기 때문에 결과는 false 가 나오게 됩니다.

## Types Of Objects

객체의 종류는 크게 2가지 분류로 나뉩니다.

- Built-In Object

    Web Page 를 브라우저에서 바로 로드하면 어느 행위 없이 바로 사용할 수 있습니다.

    - Standard Built-In Object
        
        Primitive Wrapper 객체, Date 객체, RegExp 객체 등을 생성할 때 사용합니다.

    - Native Object

        Web Browser 에서 페이지의 HTML 문장, CSS 문장 등을 분석하거나 이의 Window 의 Event 를 관리할 때 필요한 객체 입니다.

        - BOM(Browser Object Model. 春 아닙니다.)
        - DOM(Document Object Model)

- Host Object

    우리가 방금 전에 짱구, 짱아, 철수, 유리 등 생성한 객체가 이에 해당 됩니다. Constructor Function 과 리터럴 등으로 생성된 객체는 Built-In Object 와 Native Object 가 구성된 이후에 정리합니다.

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-object

## Author

- 강인성([tails5555](https://github.com/tails5555))