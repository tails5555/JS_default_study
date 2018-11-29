## Hello, JavaScript

JavaScript 을 처음 시작하면 HTML 와 CSS, JS 파일 등을 서로 분리하는 것이 좋습니다.

이에 대한 방법은 Study Source 0-1 번 방법을 참고하시길 바랍니다. 참고로 이는 버튼 하나를 클릭하면 h1 태그에 Hello World 표출, 나머지 하나는 alert 로 Hello World 표출하는 과정입니다.

관심사를 분리하는 대신에 스크립트 로딩 지연으로 인한 병목 현상을 방지하는 키워드가 추가 되었습니다.
(허나 Internet Explorer 9 버전 이하는 지원하지 않습니다.)

```html
<script src="main.js" />
<script async src="main_primary.js" />
<script defer src="main_secondary.js" />
```

script 에 있는 소스를 실행하기 위해서는 외부 스크립트 파일의 다운로드와 웹 페이지 파싱 과정이 필요합니다. 이 두 가지로 나뉘는 실행 시점이 async, defer 키워드의 차이점입니다.

async 키워드는 script 다운로드 완료 되는 시점에서 바로 실행이 됩니다. 

defer 키워드는 웹 페이지 파싱이 완료 되는 시점에서 바로 실행이 됩니다.

## JavaScript Environment

![html_css_processor](./../image/html_css_process.png)

Chrome, Safari 에서 사용되는 Webkit 을 기반으로 한 DOM 트리와 CSSOM 트리 렌더링 과정 입니다.

JavaScript 가 가장 많이 사용되는 분야는 브라우저 환경에서 동작하는 Web Application 입니다.

대부분의 프로그래밍 언어는 운영체제 상에서 실행되지만, Web Application 내의 JavaScript 는 HTML 와 CSS 가 동시에 실행 됩니다.

Web Browser 의 존재 이유는 서버에 요청(Request)을 하고, 서버에게 응답(Response) 을 받아 페이지로 표기하는 것입니다. 서버로부터 HTML, CSS, JS, Resource(이미지, 소리, 동영상 etc.) 파일 등을 받습니다.

그 중 HTML, CSS 파일은 렌더링 엔진은 각각 HTML 파서, CSS 파서가 파싱을 진행하고 난 후에 DOM 트리, CSSOM 트리로 변환 시킵니다. 생성된 렌더 트리로 Web 페이지를 표시합니다.

그러나 JavaScript 는 HTML 파서가 해결하지 않습니다. script 태그를 만다면 DOM 생성 프로세스를 중지하고 JavaScript 엔진에게 권한을 넘깁니다. (Chrome 을 사용하면 V8 엔진이 이 역할을 합니다.)

JavaScript 엔진이 스크립트 파일을 로드하고 파싱하여 실행한 후, 실행이 완료 되면 다시 HTML 파서에게 권한을 넘기고 DOM 생성을 재개합니다.

결국 브라우저에서 HTML, CSS, JavaScript 을 Synchronous(동기)적으로 처리합니다. script 의 위치에 따라 Blocking 이 발생하여 DOM 생성이 지연될 수 있습니다.

그래서 대부분 script 태그는 body 요소의 하단부에 위치 시킵니다.

그 이유는 아래와 같습니다.

- HTML 요소들이 스크립트 로딩 지연으로 인하여 렌더링에 지장을 안 받습니다.
  
- DOM 이 완성되지 않은 상태에서 JavaScript 가 DOM 을 조작하면 에러가 발생합니다.

## References

- JavaScript 환경 및 실행 과정(PoiemaWeb 참조)
    
    - https://poiemaweb.com/js-hello-world
    - https://poiemaweb.com/js-browser

- 브라우저에서 실행되는 과정(Naver D2)

    - https://d2.naver.com/helloworld/59361
    - 참고로 이 문서에 대해 좋은 내용이 워낙 많아서 한 번 시간 잡고 읽어 보고 난 후에 정리하겠습니다!