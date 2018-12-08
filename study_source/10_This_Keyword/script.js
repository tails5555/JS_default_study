function Square(element, color, width, height){
    this.element = element;
    this.color = color;
    this.width = width;
    this.height = height;
}

Square.prototype.drawCall = function(callback) {
    if(typeof callback === 'function') {
        callback.call(this);
    }
}

Square.prototype.drawApply = function(callback) {
    if(typeof callback === 'function') {
        callback.apply(this);
    }
}

Square.prototype.methodBind = function(callback) {
    if(typeof callback === 'function') {
        return callback.bind(this);
    }
}

function drawing(){
    this.element.style['display'] = 'block';
    this.element.style['background-color'] = this.color;
    this.element.style['width'] = `${this.width}px`;
    this.element.style['height'] = `${this.height}px`;
}

function initializing(){
    this.element.style['display'] = 'none';
}

var elem01 = document.getElementById('example1');
var elem02 = document.getElementById('example2');
var elem03 = document.getElementById('example3');

var sq01 = new Square(elem01, 'red', 100, 100);
sq01.drawCall(drawing);

var sq02 = new Square(elem02, 'blue', 150, 150);
sq02.drawApply(drawing);

var sq03 = new Square(elem03, 'green', 150, 150);
var btn03 = document.getElementById('ex03');
var hasClick = false;

btn03.addEventListener('click', function() {
    var methodBind;
    if(!hasClick){
        methodBind = sq03.methodBind(drawing);
        hasClick = true;
        btn03.childNodes[0].nodeValue = 'EX03 종료';
    } else {
        methodBind = sq03.methodBind(initializing);
        hasClick = false;
        btn03.childNodes[0].nodeValue = 'EX03 재실행';
    }
    methodBind();
});