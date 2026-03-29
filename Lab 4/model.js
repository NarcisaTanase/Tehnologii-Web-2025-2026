//Model
//- valorile curente: operand 1, operand2, operator, displayValue
//- metode pentru actualizare
//- regula de calcul
//- validare minimala, de exemplu sa nu permita rezultat invalid

class CalculatorModel {
    constructor() {
        this.operand1 = '';
        this.operand2 = '';
        this.operator = '';
        this.displayValue = '0';
        this.expression = ''; // Expresia mică de deasupra (ex: "5 +")
    }

    appendNumber(number) {
        // Dacă e 0 sau mesaj de eroare, le înlocuim. Altfel, adăugăm cifra.
        if (this.displayValue === '0' || this.displayValue === 'Eroare') {
            this.displayValue = number;
        } else {
            this.displayValue += number;
        }
    }

    chooseOperation(op) {
        if (this.displayValue === 'Eroare') return; // Blocăm dacă e eroare
        
        // Dacă nu avem deja un prim număr salvat
        if (this.operand1 === '') {
            this.operand1 = this.displayValue;
            this.operator = op;
            this.expression = this.operand1 + ' ' + this.operator;
            this.displayValue = '0';
        } else if (this.operator) {
            // Dacă utilizatorul se răzgândește și apasă alt operator
            this.operator = op;
            this.expression = this.operand1 + ' ' + this.operator;
        }
    }

    calculate() {
        // Nu facem nimic dacă nu avem operator sau primul număr
        if (!this.operator || this.operand1 === '') return;

        this.operand2 = this.displayValue;
        let result = 0;
        let num1 = parseFloat(this.operand1);
        let num2 = parseFloat(this.operand2);

        // Regula de calcul în funcție de operator
        switch (this.operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': 
                // Validare minimală: tratarea erorii de împărțire la zero
                if (num2 === 0) {
                    this.displayValue = 'Eroare';
                    this.operand1 = '';
                    this.operand2 = '';
                    this.operator = '';
                    this.expression = 'Nu poți împărți la 0';
                    return;
                }
                result = num1 / num2; 
                break;
        }

        // Salvăm rezultatul
        this.displayValue = result.toString();
        this.expression = this.operand1 + ' ' + this.operator + ' ' + this.operand2 + ' =';
        
        // Resetăm starea pentru o nouă operație, dar păstrăm rezultatul pe ecran
        this.operand1 = ''; 
        this.operand2 = '';
        this.operator = '';
    }

    reset() {
        this.operand1 = '';
        this.operand2 = '';
        this.operator = '';
        this.displayValue = '0';
        this.expression = '';
    }
}