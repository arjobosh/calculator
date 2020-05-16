const buttons = document.querySelector('.buttons-container');
const digits = 10;


var display = document.createElement('div');
display.style.width = '300px';
display.style.height = '100px';
display.style.borderStyle = 'solid';
display.style.borderColor = 'black';
display.style.borderWidth = '2px';
display.style.fontSize = '50px';
display.style.display = 'flex';
display.style.justifyContent= 'right';
buttons.appendChild(display);


for (i = 0; i < digits; i++) {
    var digit_btn = document.createElement('button');

    style_button(digit_btn, i);
    
    if (i % 3 == 0) {
        var row = document.createElement('div')
        buttons.appendChild(row);
    }
}



var add = document.createElement('button');
style_button(add, '+');
var subtract = document.createElement('button');
style_button(subtract, '-');
var multiply = document.createElement('button');
style_button(multiply, 'x');
var divide = document.createElement('button');
style_button(divide, '÷');
var equals = document.createElement('button');
style_button(equals, '=');
var clear = document.createElement('button');
style_button(clear, 'c');


/****** functions ******/
function operate (op, term1, term2) {
    var result;

    if (op.equals('+')) {
        result = add(term1, term2);
    }
    else if (op.equals('-')) {
        result = subtract(term1, term2);
    }
    else if (op.equals('x')) {
        result = multiply(term1, term2);        
    }
    else if (op.equals('÷')) {
        result = divide(term1, term2);
    }
    else {
        result = 0;
    }
}

function get_display (btn) {
    return btn.value;
}

function add (op1, op2) {
    return op1 + op2;
}

function subtract (op1, op2) {
    return op1 - op2;
}

function subtract (op1, op2) {
    return op1 * op2;
}

function subtract (op1, op2) {
    return op1 / op2;
}

function style_button (btn, label) {
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '50%';
    btn.style.fontSize = '125%';
    btn.textContent = label;
    btn.value = label;    
    btn.addEventListener("click", function() {
        display.value = btn.value;
        display.textContent = btn.value;
    });

    buttons.appendChild(btn);
}