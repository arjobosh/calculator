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