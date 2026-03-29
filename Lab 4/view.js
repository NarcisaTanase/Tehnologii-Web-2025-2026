//View 
//- structura HTML a calculatorului
//- CSS
//- afisajul rezultatului

class CalculatorView {
    constructor() {
        this.displayResult = document.querySelector('.show-result');
        this.displayType = document.querySelector('.show-type');
    }

    updateDisplay(value) {
        this.displayResult.textContent = value;
    }

    updateExpression(value) {
        this.displayType.textContent = value;
    }
}
