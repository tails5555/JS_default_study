## Main Properties

본래 JavaScript 는 Web Application 의 보조적인 기능을 수용하기 위해 사용된 도구에 불구했습니다.

원래는 Server 에서만 개발했던 Web Application 이 Client 로 옮겨진 추세입니다.

DOM(Document Object Model) Elements 들을 쉽게 제어하는 jQuery 가 JavaScript 을 발전시키는데 기여했습니다.

JavaScript 는 Python 처럼 컴파일 작업을 별도로 수행하지 않아도 되는 인터프리터(Interpreter) 언어 입니다.

인터프리터의 목표는 즉시 실행하고, 컴파일러를 빠르게 동작해야 합니다. 이를 해결하기 위해 모던 자바스크립트 엔진(Chrome V8, Safari JSCode, Edge Chakra 등) 이 동원 되었습니다.

JavaScript 는 다른 언어와 유사하여 접근성이 쉬운 편입니다.

그러나 원초 JavaScript 에서는 class 의 개념이 없어서 imperative(명령형), **functional**(함수형), **prototype-based**(프로토타입 기반) 객체 지향 을 지원합니다. 

(물론 최근에 ES6 버전에서 class, extends, const, let 등으로 상속, 정보 은닉의 기능이 어느 정도 지원 되고 있습니다.)

Web Browser 에서 돌아가는 반쪽 짜리 언어가 아닌 Node.js 를 사용하여 Server 를 구축하고, Hybrid App(Ionic, React Native, Vue Native) 으로 크로스 플랫폼 언어로 사용 되고, SPA(Single Page Application) 의 사용층을 확보하는데 1등 공신인 언어가 JavaScript 입니다.

## JavaScript Structure

JavaScript 의 기본 구조는 크게 2가지로 나뉘는데 ECMAScript 와 Client API 로 나뉩니다.

ECMAScript 의 요소는 Object, String, Number, Boolean, Symbol, Date, Math, Promise 등 논리적인 문장에서 기본으로 다루는 객체들입니다.

Client Side API 의 요소는 크게 5가지로 나뉩니다.

- Global Object
    
    대표적으로 브라우저 창에서는 window, Node.js 에서는 global 이 있습니다.

- DOM 
    
    Document, Event, HTML Element, HTML Nodes 등이 있습니다.

- BOM
  
    Location, History, Navigator, Screen 등 Router 관련된 개념입니다.

- AJAX

    XMLHttpRequest, fetch 등이 있습니다. 참고로 axios 는 이를 위한 외부 라이브러리 입니다.

- HTML5 API
  
    BLOB, File, Web Storage(Local Storage, Session Storage), Geolocation 등 HTML5 에 탑재 된 개념 입니다.

## References

- JavaScript 개요(PoiemaWeb 참조)
    
    - https://poiemaweb.com/js-introduction

## Author

- 강인성([tails5555](https://github.com/tails5555))