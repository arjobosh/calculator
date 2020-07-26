const digits = 10;
const body = document.querySelector('body');
body.style.backgroundColor = '#fff291'

const buttons = document.querySelector('.calc-container');
buttons.style.display = 'flex';
buttons.style.flexDirection = 'column';
buttons.style.alignItems = 'center';

var display = document.createElement('div');
display.id = 'display';
display.style.width = '230px';
display.style.height = '100px';
display.style.marginTop = '50px';
display.style.borderStyle = 'solid';
display.style.borderColor = 'black';
display.style.borderWidth = '5px';
display.style.borderTopLeftRadius = '0.5em';
display.style.borderTopRightRadius = '0.5em';
display.style.fontFamily = 'helvetica';
display.style.fontSize = '50px';
display.style.display = 'flex';
display.style.justifyContent = 'right';
display.style.padding = '5px';
display.style.backgroundColor = '#fffce8';
buttons.appendChild(display);

var pad = document.createElement('div');
pad.id = 'pad';
pad.style.width = '230px';
pad.style.height = '270px';
pad.style.borderStyle = 'solid';
pad.style.borderColor = 'black';
pad.style.borderWidth = '5px';
pad.style.borderTopWidth = '1px';
pad.style.borderBottomLeftRadius = '1.5em';
pad.style.borderBottomRightRadius = '1.5em';
pad.style.backgroundColor = '#c2c2c2';
pad.style.display = 'grid';
pad.style.alignItems = 'center';
pad.style.justifyItems = 'center';
pad.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
pad.style.gridTemplateRows = '1fr 1fr 1fr 1fr';
pad.style.padding = '5px';

// row 1
for (i = 7; i < digits; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i);
}
var div = document.createElement('button');
styleButton(div, '÷');

// row 2
for (i = 4; i < 7; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i);
}
var mul = document.createElement('button');
styleButton(mul, 'x');

// row 3
for (i = 1; i < 4; i++) {
    var digitBtn = document.createElement('button');
    styleButton(digitBtn, i);
}
var minus = document.createElement('button');
styleButton(minus, '-');

// row 4
var clear = document.createElement('button');
styleButton(clear, 'C');
var digitBtn = document.createElement('button');
styleButton(digitBtn, 0);
var equals = document.createElement('button');
styleButton(equals, '=');
var plus = document.createElement('button');
styleButton(plus, '+');

buttons.appendChild(pad);

/* -------------------------------------------------------------- */
var exprStack = new Stack();
var term = '';

function styleButton(btn, label) {
    btn.id = label;
    btn.style.width = '45px';
    btn.style.height = '45px';
    btn.style.border = 'none';
    btn.style.borderRadius = '37%'
    btn.style.backgroundColor = 'black';
    btn.style.color = 'white';
    btn.style.fontSize = '110%';
    btn.style.fontFamily = 'helvetica';
    btn.textContent = label;
    btn.value = label;
    btn.addEventListener('click', function() {
        if (!isNaN(btn.value)) {
            term += btn.value;
            display.textContent = term;
        }
        else {
            if (btn.value == 'C') {
                exprStack = new Stack();
                term = '';
                display.textContent = term;
            }
            else if (btn.value == '=') {
                if (!isNaN(term) && !isNaN(exprStack.peek())) {
                    exprStack.push(term);

                    var t1 = exprStack.pop();
                    var t2 = exprStack.pop();
                    var op = exprStack.pop();

                    term = calculate(op, t1, t2);
                    display.textContent = term;
                }
            }
            else {
                if (!isNaN(term) && !isNaN(exprStack.peek())) {
                    var t1 = exprStack.pop();
                    var t2 = term;
                    var op = exprStack.pop();

                    term = calculate(op, t1, t2);
                }

                if (btn.value === '÷')
                    exprStack.push('/');
                else if (btn.value === 'x')
                    exprStack.push('*');
                else
                    exprStack.push(btn.value);

                exprStack.push(term);
                display.textContent = term;
                term = '';
            }
        }

        console.log("term: " + term);
        console.log("stack: " + exprStack.printStack());
    });
    
    if (label == '÷' || label == 'x' || label == '-' || label == '+' || label == '=') {
        btn.className = 'operator';
    }
    else if (label == 'C') {
        btn.className = 'clear';
    }
    else {
        btn.className = 'digit';
    }

    pad.appendChild(btn);
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
    return (t1 > t2) ? -(t1 - t2) : (t1 - t2);
}

function multiply(t1, t2) {
    return t1 * t2;
}

function divide(t1, t2) {
    return t2 / t1;
}

