class Equation {
    constructor(term1, term2, operator, id) {
        this.term1 = term1;
        this.term2 = term2;
        this.operator = operator;
        this.result = null;
        this.id = id;
        this.calculateResult();
    }
    
    calculateResult() {
        switch(this.operator) {
            case '+':
                this.result = this.term1 + this.term2;
                // console.log(`${this.term1} + ${this.term2} = ${this.result} `);
            
            break;
            case '-':
                if (this.term1 > this.term2) {
                    this.result = this.term1 - this.term2;
                    // console.log(`${this.term1} - ${this.term2} = ${this.result} `);
                }
                else {
                    this.result = this.term2 - this.term1;
                    // console.log(`${this.term2} - ${this.term1} = ${this.result} `);
                }
            break;
            case '*':
                this.result = this.term1 * this.term2;
                // console.log(`${this.term1} * ${this.term2} = ${this.result} `);
            break;
            case '/':
                this.result = this.term1 / this.term2;
                // console.log(`${this.term1} / ${this.term2} = ${this.result}`);
            break;
            default:
        }
        // console.log(this.result);
    }

    toString() {
        return `${this.term1} ${this.operator} ${this.term2} = ${this.result}`;
    }
}

export default Equation;