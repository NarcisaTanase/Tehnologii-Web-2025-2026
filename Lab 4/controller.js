//Controller
//- asculta apasarile de butoane
//- decide ce metoda din model se apeleaza
//- care actualizarea view-ului

class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Afișăm valoarea inițială
        this.updateView();

        // Selectăm toate butoanele și punem event listener
        this.buttons = document.querySelectorAll('.button');
        
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Folosim .trim() pentru a curăța eventualele spații din HTML
                this.handleButtonClick(button.textContent.trim());
            });
        });
    }

    handleButtonClick(value) {
        if (!isNaN(value)) {
            // Dacă e număr
            this.model.appendNumber(value);
        } else if (value === 'C') {
            // Dacă e butonul de curățare
            this.model.reset();
        } else if (value === '=') {
            // Dacă e egal
            this.model.calculate();
        } else {
            // Dacă e operator (+, -, *, /)
            this.model.chooseOperation(value);
        }
        
        // La finalul oricărei apăsări, actualizăm afișajul
        this.updateView();
    }

    // Funcție de ajutor ca să actualizăm ambele texte din View
    updateView() {
        this.view.updateDisplay(this.model.displayValue);
        this.view.updateExpression(this.model.expression);
    }
}

// Inițializăm aplicația MVC
const app = new CalculatorController(new CalculatorModel(), new CalculatorView());