// Get HTML elements
const billInput = document.getElementById('bill');
const tipContainer = document.getElementById('tip-container');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

// Variable to store selected tip percentage
let tipPercent = 0;

// Helper function to trigger pop animation on text elements
function animateDisplay(element) {
    element.classList.remove('pop-animate');
    void element.offsetWidth;
    element.classList.add('pop-animate');
}

// Simple calculation function
function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    if (bill > 0 && people >= 1) {
        const totalTip = bill * (tipPercent / 100);
        const tipPerPerson = totalTip / people;
        const totalPerPerson = (bill + totalTip) / people;
        tipAmountDisplay.innerText = '৳' + tipPerPerson.toFixed(2);
        totalAmountDisplay.innerText = '৳' + totalPerPerson.toFixed(2);
        animateDisplay(tipAmountDisplay);
        animateDisplay(totalAmountDisplay);
    } else {
        tipAmountDisplay.innerText = '৳0.00';
        totalAmountDisplay.innerText = '৳0.00';
    }
}

// Helper function to unselect all tip buttons
function removeActiveButtons() {
    tipButtons.forEach(function (button) {
        button.classList.remove('active');
    });
}

// Event listener on parent container
tipContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('tip-btn')) {
        removeActiveButtons();
        customTipInput.value = '';
        event.target.classList.add('active');
        tipPercent = parseFloat(event.target.getAttribute('data-tip'));
        calculate();
    }
});

// Handle custom tip input typing
customTipInput.addEventListener('input', function () {
    removeActiveButtons();
    tipPercent = parseFloat(customTipInput.value) || 0;
    calculate();
});

// Recalculate whenever bill or people count changes
billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

// Handle Reset button click
resetBtn.addEventListener('click', function () {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '1';
    tipPercent = 0;
    removeActiveButtons();
    calculate();
});