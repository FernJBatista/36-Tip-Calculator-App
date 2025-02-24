document.addEventListener('DOMContentLoaded', event => {
    bill.value = null;
    numOfPeople.value = null;
});

//Bill variables
const bill = document.querySelector('#bill');
// Button Container
const buttonContainer = document.querySelector('#buttonContainer');
const tipButtons = document.querySelectorAll('.tip');
const customBtn = document.querySelector('#customBtn');
// Number of People
const numOfPeople = document.querySelector('#numOfPeople');
// Tip Total Variables
const tipAmountPerPerson = document.querySelector('#tipAmountPerPerson');
const tipAmountTotal = document.querySelector('#tipAmountTotal');
// Reset Button
const resetBtn = document.querySelector('#resetBtn');

tipAmountPerPerson.innerText = '$' + 0;
tipAmountTotal.innerText = '$' + 0;

// Bill Value
let billValue = 0;
bill.addEventListener('input', event => {
    // Bil value update
    billValue = event.target.value;
    console.log('This is the bill value: ' + billValue);
    if (!tipPercentage) {
        return;
    } else if (tipPercentage){
        calculateTipAmount();
    }
})

// Number of People Value
let numberOfPeopleValue = 1;
numOfPeople.addEventListener('input', event => {
    if (event.target.value <= 0) {
        // Default value is 1
        numberOfPeopleValue = 1;
        console.log('Number of people set to: 1');
        calculateTipAmount();
        return numberOfPeopleValue;
    } else if (event.target.value > 1) {
        event.target.value = numOfPeople.value;
        // Number of People Value update
        numberOfPeopleValue = numOfPeople.value;
        console.log('This is the number of people: ' + numberOfPeopleValue);
    }
    calculateTipAmount();
});

//Tip Percentage Value (From tip % buttons)
let tipPercentage = 0.05;
tipButtons.forEach(tipButton => {
    tipButton.addEventListener('click', event => {
        // Remove active class from all buttons
        tipButtons.forEach(tipButton => {
            tipButton.classList.remove('active');
        });
        // Add active class to button
        event.target.classList.add('active');

        // Tip Percentage Value
        tipPercentage = event.target.value;
        calculateTipAmount();
        console.log('This is the tip percentage: ' + tipPercentage);
    });

    // Remove value from custom input
    customBtn.value = '';
});

// Custom Tip Percentage Value (From custom input)  
customBtn.addEventListener('input', event => {
    // Remove active class from all buttons
    tipButtons.forEach(tipButton => {
        tipButton.classList.remove('active');
    });

    // Tip Percentage Value
    tipPercentage = customBtn.value / 100;
    console.log('This is the tip percentage: ' + tipPercentage);
    calculateTipAmount();
});

// Reset Button
resetBtn.addEventListener('click', event => {
    reset();
});

function calculateTipAmount() {
    // Tip Per Person Value
    const tipAmountPerPersonValue = Math.round(((billValue * tipPercentage) / numberOfPeopleValue) * 100) / 100;
    tipAmountPerPerson.innerText = '$' + tipAmountPerPersonValue;
    // Tip Total Value
    const tipAmountTotalValue = Math.round((billValue * tipPercentage) * 100) / 100;
    tipAmountTotal.innerText = '$' + tipAmountTotalValue;
}

function reset() {
    // Reset Bill Value
    bill.value = null;
    billValue = 0;
    // Reset Number of People Value
    numOfPeople.value = null;
    numberOfPeopleValue = 1;
    // Reset Tip Percentage Value
    tipPercentage = 0;
    // Reset Tip Per Person Value
    tipAmountPerPerson.innerText = '$' + 0;
    // Reset Tip Total Value
    tipAmountTotal.innerText = '$' + 0;
    // Remove active class from all buttons
    tipButtons.forEach(tipButton => {
        tipButton.classList.remove('active');
    });
    // Remove value from custom input
    customBtn.value = '';
}