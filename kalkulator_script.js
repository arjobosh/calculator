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
display.style.justifyContent= 'right';
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
style_button(clear, 'c', row1);
var div = document.createElement('button');
//div.style.float = 'right';
style_button(div, '/', row1);

var row2 = document.createElement('div');
for (i = 7; i < digits; i++) {
    var digit_btn = document.createElement('button');
    style_button(digit_btn, i, row2);         
}
var mul = document.createElement('button');
//mul.style.float = 'right';
style_button(mul, '*', row2);

var row3 = document.createElement('div');
for (i = 4; i < 7; i++) {
    var digit_btn = document.createElement('button');
    style_button(digit_btn, i, row3);         
}
var minus = document.createElement('button');
//minus.style.float = 'right';
style_button(minus, '-', row3);

var row4 = document.createElement('div');
for (i = 1; i < 4; i++) {
    var digit_btn = document.createElement('button');
    style_button(digit_btn, i, row4);
}
var plus = document.createElement('button');
//plus.style.float = 'right';
style_button(plus, '+', row4);

var row5 = document.createElement('div');
var digit_btn = document.createElement('button');
style_button(digit_btn, 0, row5);
var equals = document.createElement('button');
//equals.style.float = 'right';
style_button(equals, '=', row5);

/* -------------------------------------------------------------- */
function set_display (val) {
    display.value = val;
}

function get_display () {
    return display.value;
}

var t1 = '', t2 = '', op = '';

function style_button(btn, label, row) {
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '50%';
    btn.style.fontSize = '125%';    
    btn.textContent = label;
    btn.value = label;
    btn.addEventListener('click', function() {
        if (btn.value != 'c' && btn.value != '=') {
            if (isNaN(btn.value)) {
                op = btn.value;
                t1 = t2;
                t2 = '';
            }
            else {
                t2 += btn.value                
            }

            display.textContent = t1 + op + t2;
        }
        else {
            if (btn.value == '=') {
                display.textContent = calculate(op, t1, t2);
                t1 = t2 = op = '';
            }
            else {
                display.textContent = t1 = t2 = op = 0;
            }
        }
    });

    row.appendChild(btn);
    pad.appendChild(row);
    buttons.appendChild(pad);
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
    return t1 / t2;
}