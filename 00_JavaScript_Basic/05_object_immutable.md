## Object Immutability

객체 생성 이후 그 상태를 변경할 수 없는 디자인 패턴이 필요합니다. 객체는 참조(Reference) 로 전달 받습니다. 그러나 같은 객체를 참조하는 다른 변수들의 대처가 필요합니다. 

의도치 않은 객체의 변경이 발생하는 원인은 참조한 다른 객체에서 또 다른 객체를 변경하기 때문입니다. 예를 들어 아래와 같은 사례 입니다.

```javascript
var department = {
    name : '소프트웨어공학과',
    professor : '이교수'
};

var student1 = {
    last : '강',
    first : '학생',
    dept : department
};

var student2 = {
    last : '김',
    first : '학생',
    dept : department
};

// student 객체의 dept 프로퍼티와 department 변수가 가리키는 Reference 가 같습니다.
student1['dept'] = {
    ...department,
    professor : '홍교수'
}; 
```

`student1` 변수 안에 있는 `dept` 프로퍼티를 변경하는 의미가 `department` 변수의 객체도 동시에 변경이 되어야 합니다. 같은 학과의 학과장이 유지되기 위해 애초에 `department` 변수의 객체를 불변 객체로 만들 필요가 있습니다.

불변 객체를 만드는 방법은 Observer 패턴을 사용하는 것과 방어적 복사(Defensive Copy) 방법이 있습니다. 복제나 비교에 대한 조작을 단순화할 수 있지만 변경 가능한 데이터가 많으면 부적절합니다.

또한 불변 데이터 패턴을 쉽게 구현하는 방법이 ES6 에 추가 되었습니다. (일명 `Object.assign()` 함수.)

## Immutable Values

JavaScript 에서 Primitive Type(원시 타입) 은 연산자를 쓰지 않은 이상 변경이 불가능합니다.

하지만 Object Type(원시 타입 이외의 타입) 은 변경 가능합니다.

```javascript
var str = 'JavaScript';
str = 'JS Language';

var message = '여러분 이거 다 JavaScript 인거 아시죠?';
var word = message.slice(9, 19);

console.log(word); // 'JavaScript'
```

그렇지만 위와 같은 문장을 읽어보면 `str` 변수의 값이 변경 되어 보입니다. 그렇지만 처음에 작성한 JavaScript 문자열이 어느 메모리 공간에 생성되고, 그 다음에 JS Language 문자열이 또 다른 메모리 공간에 생성 됩니다. 그래서 `str` 변수가 결국 가리키는 참조가 달라질 뿐이지, JavaScript 문자열이 메모리 상에서 없어지는 의미는 전혀 아닙니다.

또한 `message` 변수에서 일부 문자열을 자르는 과정에서도 값 자제를 변경하는 것처럼 느끼겠지만, 단순히 JavaScript 문자열만 가져와 새로운 문자열을 만들 뿐이지, `message` 변수의 값은 그대로 유지됩니다.

```javascript
var arr = [10, 20, 30];
console.log(arr.length); // 3

var new_len = arr.push(40);
console.log(arr.length); // 4
console.log(new_len); // 4

var person1 = {
    last : '강',
    first : '사람',
    age : 25
};

var person2 = person1; // person2 는 person1 이 가리키는 객체의 인스턴스와 같습니다.

var tmpName = person2.first;
person2.first = '인간';

console.log(tmpName); // 사람
console.log(person1.first); // 인간
console.log(person2.first); // 인간
```

위에서 `arr` 변수가 가리키는 객체를 `push()` 함수를 이용하여 값을 추가하면 `new_len` 변수에는 새로 추가 된 배열의 길이가 저장됩니다. 배열도 JavaScript 에서 객체이기 때문에 `push()` 함수는 배열의 객체 그 자체를 변경 시킵니다.(Mutable Value)

그러나 아래 `person1`, `person2` 변수를 참고하면 `person1` 변수, `person2` 변수가 가리키는 객체와 같습니다. 여기서 `person2` 의 `first` 프로퍼티 Value 를 `tmpName` 변수에 참조 값을 보내는 것이 아닌 새로운 문자열인 '사람' 을 메모리 공간에 추가 합니다. 그래서 `person2` 의 `first` 프로퍼티의 Value 가 수정 되어도 `tmpName` 의 값은 변함이 없습니다. 그러나 `person1` 의 `first` 프로퍼티는 원초에 가리킨 객체여서 똑같이 변합니다.
