import { addClass, removeClass } from "./utils/classHelpers";

let variables = {
    bill: 0,
    percentage: 0,
    people: 0,
    totalPer: 0,
    total: 0
}

const inputs = {
    bill: document.querySelector('#bill-field'),
    custom: document.querySelector('#custom-field'),
    person: document.querySelector('#person-field')
}

const btns = document.querySelectorAll('.calculator__tip-btn');
const resetBtn = document.querySelector('#reset-btn');
const activeBtnClass = "btn--active";
const decimalPlaces = 2;

/* Utils */
    const disable = () => {
        const subObj = {...variables }

        delete subObj.total;
        delete subObj.totalPer;

        if (Object.values(subObj).every(num => num > 0)) {
            removeClass(resetBtn, 'disabled')
        }
        else{
            addClass(resetBtn, 'disabled');
        }

        return true;
    }

    const update = () => {
        disable()
        if (!personsCheck()) {
            return;
        }

        variables.totalPer = (variables. percentage / 100) * variables.bill;
        variables.total = variables.totalPer * variables.people;
        document.querySelector('#price-person').textContent = `$${variables.totalPer.toFixed(decimalPlaces)}`;
        document.querySelector('#price-total').textContent = `$${variables.total.toFixed(decimalPlaces)}`;
    }

    const inputNumberValidation = (value, validCallback, invalidCallback) => {
        try {
            if (value.length > 0 && isFinite(value)) {
                validCallback && validCallback();
            }
            else{
                invalidCallback && invalidCallback();
            }  
        } catch (error) {
            console.warn(error);
            return false;
        }

        return true;
    }

    const initInputField = (field) => {
        field.value = '';
        removeClass(field, 'outlined')
    }

    const curry = (callback) => {
        callback && callback();
        billInit();
        personsCheck();
        update();
        return true;
    }

// Bill field
const billInit = () => {
    let { value } = inputs.bill;
    if (Number(value)  && Number(value) > 0) {
        return;
    }
    value = '0';
    variables.bill = Number(value)
}
inputs.bill.addEventListener('input', function(e){handleBillInput(e, this)});
const handleBillInput = (e, field) => {
    e.stopPropagation();
    e.preventDefault();
    const value = Number(e.target.value);
    if (Number(value) && Number(value) > 0) {
        variables.bill = Number(value);
    } else variables.bill = 0;
    update();
}


// Buttons
    const initButtons = () => {
        btns.forEach((item) => {
            removeClass(item, activeBtnClass);
        });
    }

    const handleBtnClick = (btn, e) => {
        initButtons();
        initInputField(inputs.custom);
        variables.percentage = Number(btn.dataset.value);
        addClass(btn, activeBtnClass);
    }

    btns.forEach(item => {
        item.addEventListener('click', function(e){curry(handleBtnClick(this, e))})
    });


// Custom field
    inputs.custom.addEventListener('focusout', function(e){handleCustomField(this)});
    const handleCustomField = (field) => {
        let { value } = field;

        inputNumberValidation(value, () => curry(function(){
            initButtons()
            variables.percentage = Number(value);
            addClass(field, 'outlined');
        }), () => initInputField(field))
    }

// Person   field   validation
    const personsCheck = () => {
        const { value } = inputs.person;
        if (Number(value) && Number(value) > 0) {
            document.querySelector('#persons-container').dataset.error = "false";
            return true;
        }
        else{
            document.querySelector('#persons-container').dataset.error = "true";
            variables.people = 0;
            return;
        }
    }
    inputs.person.addEventListener('input', function(e){if(personsCheck()){handlePersonField(e, this)} else update()});
    const handlePersonField = (e, field) => {
        let { value } = field;
        variables.people = Number(value);
        update();
    }

// RESET BUTTON
    resetBtn.addEventListener('click', function(e){curry(() => handleResetButton(e, this))})
    const handleResetButton = (e, btn) => {
        variables = {bill: 0,percentage: 0,people: 0,totalPer: 0,total: 0}
        initButtons();
        for (const key in inputs) {
            initInputField(inputs[key]);
            inputs[key].value = "";
        }

        document.querySelector('#price-person').textContent = `$0.00`;
        document.querySelector('#price-total').textContent = `$0.00`;
        update();
    };

window.onload = function() {
    initButtons();
}