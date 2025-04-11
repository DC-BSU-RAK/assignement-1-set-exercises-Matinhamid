// Select DOM elements
const costInput = document.getElementById('costPerLiter');
const litersInput = document.getElementById('litersPurchased');
const result = document.getElementById('result');
const button = document.getElementById('calculateBtn');

// Function to calculate total cost
function calculateTotal() {
  // Convert inputs to floats
  const cost = parseFloat(costInput.value);
  const liters = parseFloat(litersInput.value);

  // Guard clause if input is invalid
  if (isNaN(cost) || isNaN(liters)) {
    result.textContent = "Please enter valid numbers.";
    return;
  }

  // Calculate and round to 2 decimal places
  const total = (cost * liters).toFixed(2);

  // Display the result
  result.textContent = `Total Cost: £${total}`;
}

// Event listener for button click
button.addEventListener('click', calculateTotal);
