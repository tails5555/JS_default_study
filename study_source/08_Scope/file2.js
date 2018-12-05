func();

x = 20;
document.write(x);

/* 이 문장을 실행하면 무한 루프가 발생합니다...
 * for(var x = 10; x <= 100; x++){
 *      func();
 *      document.write(x);
 * }
 */