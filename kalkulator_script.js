const buttons = document.querySelector('.calc-container');
const digits = 10;

var display = document.createElement('div');
display.style.width = '300px';
display.style.height = '100px';
display.style.borderStyle = 'solid';
display.style.borderColor = 'black';
display.style.borderWidth = '2px';
display.style.fontSize = '60px';
display.style.display = 'flex';
display.style.justifyContent = 'right';
display.style.fontSize = '48px';
buttons.appendChild(display);

var pad = document.createElement('div');
pad.style.width = '300px';
pad.style.height = '300px';
pad.style.borderStyle = 'solid';
pad.style.borderColor = 'black';
pad.style.borderWidth = '2px';
pad.style.display = 'flex';
pad.style.justifyContent = 'space-evenly';
pad.style.flexDirection = 'column';

var row1 = document.createElement('div');
var clear = document.createElement('button');
styleButton(clear, 'c', row1);
var div = document.createElement('button');
styleButton(div, '/', row1);

var row2 = document.createElement('div');
for (i = 7; i < digits; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i, row2);         
}
var mul = document.createElement('button');
styleButton(mul, '*', row2);

var row3 = document.createElement('div');
for (i = 4; i < 7; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i, row3);         
}
var minus = document.createElement('button');
styleButton(minus, '-', row3);

var row4 = document.createElement('div');
for (i = 1; i < 4; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i, row4);
}
var plus = document.createElement('button');
styleButton(plus, '+', row4);

var row5 = document.createElement('div');
var digitBtn = document.createElement('button');
styleButton(digitBtn, 0, row5);
var equals = document.createElement('button');
styleButton(equals, '=', row5);

buttons.appendChild(pad);

/* -------------------------------------------------------------- */
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);        
    }

    pop() {
        if (this.items.length == 0) {
            return "Stack empty";
        }

        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    emptyStack() {
        var s = "";
        for (i = 0; i < this.items.length; i++) {
            s = this.pop();
        }

        return s;
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printStack() {
        var s = "";
        for (var i = 0; i < this.items.length; i++) {
            s += this.items[i] + " ";
        }

        return s;
    }
}

var exprStack = new Stack();
var term = '';

function styleButton(btn, label, row) {
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '50%';
    btn.style.fontSize = '125%';    
    btn.textContent = label;
    btn.value = label;
    btn.addEventListener('click', function() {
        if (!isNaN(btn.value)) {
            term += btn.value;
            display.textContent = term;
        }
        else {
            if (btn.value == 'c') {
                exprStack = new Stack();
                term = '';
                display.textContent = term;
            }
            else if (btn.value == '=') {
                exprStack.push(term);

                var t1 = exprStack.pop();
                var t2 = exprStack.pop();
                var op = exprStack.pop();

                term = calculate(op, t1, t2);
                display.textContent = term;
            }
            else {
                if (!isNaN(term) && !isNaN(exprStack.peek())) {
                    var t1 = exprStack.pop();
                    var t2 = term;
                    var op = exprStack.pop();

                    term = calculate(op, t1, t2);
                }

                exprStack.push(btn.value);
                exprStack.push(term);
                display.textContent = term;
                term = '';
            }
        }

        console.log("term: " + term);
        console.log("stack: " + exprStack.printStack());
    });

    row.appendChild(btn);
    pad.appendChild(row);
}

function calculate(op, t1, t2) {
    var result;
    switch (op) {
        case '+':
            result = add(t1, t2);
            break;
        case '-':
            result = subtract(t1, t2);
            break;
        case '*':
            result = multiply(t1, t2);
            break;
        case '/':
            result = divide(t1, t2);
            break;
        default:
            result = 0;                
    }
    return result;
}

function add(t1, t2) {
    return parseInt(t1) + parseInt(t2);
}

function subtract(t1, t2) {
    return t1 - t2;
}

function multiply(t1, t2) {
    return t1 * t2;
}

function divide(t1, t2) {
    return t2 / t1;
}

