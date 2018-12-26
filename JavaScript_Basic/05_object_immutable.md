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

그러나 아래 `person1`, `person2` 변수를 참고하면 `person1` 변수, `person2` 변수가 가리키는 객체와 같습니다. 여기서 `person2` 의 `first` 프로퍼티 Value 를 `tmpName` 변수에 참조 값을 보내는 것이 아닌 새로운 문자열인 '사람' 을 메모리 공간에 추가 합니다. 그래서 `person2` 의 `first` 프로퍼티의 Value 가 수정 되어도 `tmpName` 의 값은 변함이 없습니다.(Immutable Value)

하지만 `person1` 의 `first` 프로퍼티는 원초에 가리킨 객체여서 똑같이 변합니다.

## Immutable Data Pattern

동적으로 변하는 Mutable Value 에 대해서 Property 의 변경을 막고 이를 방어적 복사(Defensive Copy) 를 하는 방법이 있습니다. 하지만 비용이 좀 드는 단점이 있습니다.

1. Object.assign(`target`, ...objects)

타깃 객체로 여러 객체들의 Property 를 복사합니다. 물론 같은 프로퍼티의 Key 가 존재하면 후자에 작성한 프로퍼티로 대체합니다. 당연히 리턴 값은 타깃 객체에 후자에 작성한 객체의 프로퍼티들을 묶어 새로 생성된 객체가 됩니다. 참고로 이 함수는 ES6 버전 부터 제공합니다.

```javascript
// Case 01
var obj = { num1 : 10 };
var cpy_obj = Object.assign({}, obj);

console.log(cpy_obj); // { num1 : 10 };
console.log(obj !== cpy_obj); // true

// Case 02
var kor_score = { kor : 90 };
var math_score = { math : 85 };
var eng_score = { eng : 95 };

var total_scores = Object.assign(kor_score, math_score, eng_score);

console.log(total_scores); // { kor : 90, math : 85, eng : 95 }
console.log(kor_score); // 위의 값이랑 같습니다.
console.log(total_scores === kor_score); // true
```

Case 01 에서는 `Object.assign()` 함수를 사용하여 빈 객체에 프로퍼티를 복사하는 과정입니다. 객체의 프로퍼티는 `obj` 와 `cpy_obj` 가 서로 같지만 이 둘의 객체는 서로 다른 메모리 주소를 참조하기 때문에 불일치 연산자의 결과가 `true` 가 나옵니다.

Case 02 에서는 국어, 수학, 영어 점수 데이터를 `kor_score` 가 가리키는 변수의 객체에 서로 뭉쳐 `total_scores` 에서도 가리킵니다. `total_scores` 의 결과는 국어, 수학, 영어 점수 프로퍼티가 서로 뭉친 객체가 나옵니다. 또한 타깃 객체를 가리키는 `kor_score` 도 `total_scores` 가 가리키는 객체의 값과 같습니다. 또한 인스턴스도 같아서 동치 연산자의 결과가 `true` 가 나오게 됩니다.

```javascript
const person1 = {
    last : '강',
    first : '사람',
    age : 25
};

const person2 = Object.assign({}, person1);

person2.last = '이';

console.log(person1.last); // 강
console.log(person2.last); // 이
```

물론 `person1` 가 가리키는 객체를 `person2` 에 그대로 갖다 썼을 때 `person2` 의 일부 값을 변경할지라도 `person1` 의 값엔 영향이 1도 없게 됩니다. 이러한 원리를 **Shallow Copy** 라고 부릅니다.

참고로 ES6에 추가 된 타입인 `const` 객체는 값을 아예 변경할 수 없는 개념으로 알고 있지만, 객체를 재할당하는 것만 불가능하지, 객체의 프로퍼티는 **변경할 수 있음**을 유의하시길 바랍니다. TypeScript 에서도 객체의 재할당 여부를 일일히 확인하여 `let` 으로 설정한 변수를 `const` 로 고치라고 경고를 날립니다.

2. Object.freeze()

freeze 의 의미는 냉동, 얼리다 의 의미입니다. 어렸을 때 얼음땡 놀이를 했거나 영화 겨울왕국을 봤으면 쉽게 이해할 것입니다. 이 함수를 사용하면 Immutable 객체를 만들 수 있습니다.

```javascript
const person1 = {
    last : '강',
    first : '사람',
    age : 25,
    interested : {
        front : ['react', 'vue'],
        back : ['spring', 'django']
    }
};

console.log(person1.age); // 25

Object.freeze(person1); // person1 가 가리키는 객체는 불변 객체가 됩니다.
person1['age'] = 26; // 여기서 에러가 나지 않고 그냥 씹습니다.
console.log(person1.age); // 25

person1['interested']['front'] = ['angular', 'react'];
console.log(person1['interested']['front']); // ['angular', 'react']
console.log(Object.isFrozen(person1));

function deepFreeze(obj) {
    const props = Object.getOwnPropertyNames(obj);
    props.forEach((name) => {
        const prop = obj[name];
        if(typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });
    return Object.freeze(obj);
}

deepFreeze(person1);
person1['interested']['front'] = ['typescript', 'react']; // Deep Freeze 를 진행할 때 interested 가 가리키는 객체의 값도 불변 처리가 되어 결국에는 ['angular', 'react'] 로 남게 됩니다.
console.log(person1['interested']['front']); // ['angular', 'react']
```

불변 객체를 만드면 객체의 프로퍼티의 값을 변경하려 시도를 해도 결국에는 씹고 넘어갑니다. 그렇지만 큰 객체에만 freeze 함수를 적용하면 내부 프로퍼티의 객체에는 반영되지 않습니다. 이를 위해 Deep Freeze 를 해야 합니다.

참고로 `Object.assign()`, `Object.freeze()` 함수는 변경이 많은 거대한 객체에서는 성능 이슈가 있어서 사용하지 않는 것이 좋습니다. 이외에도 `Immutable.js` 를 사용하는 방법이 있는데 이는 List, Stack, Map 등 영구 불변 자료구조를 제공합니다.

## References

- PoiemaWeb 참조 사이트
    - https://poiemaweb.com/js-immutability

- Immutable.js 사이트
    - https://facebook.github.io/immutable-js/

## Author

- 강인성([tails5555](https://github.com/tails5555))