// Existing references
const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const resultText = document.getElementById("result");
const inputValue = document.getElementById("inputValue");
const swapBtn = document.getElementById("swapBtn");

// Units mapping
const units = {
  length: ["cm", "m", "km"],
  weight: ["g", "kg", "lbs"],
  temperature: ["C", "F"]
};

// Initialize unit dropdowns
categorySelect.addEventListener("change", updateUnits);
updateUnits();

function updateUnits() {
  const category = categorySelect.value;
  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";
  units[category].forEach(unit => {
    let option1 = new Option(unit, unit);
    let option2 = new Option(unit, unit);
    fromUnitSelect.add(option1);
    toUnitSelect.add(option2);
  });
  convert(); // update result when category changes
}

// Swap units
swapBtn.addEventListener("click", () => {
  let temp = fromUnitSelect.value;
  fromUnitSelect.value = toUnitSelect.value;
  toUnitSelect.value = temp;
  convert(); // update result after swapping
});

// Auto-update result when user types or changes units
inputValue.addEventListener("input", convert);
fromUnitSelect.addEventListener("change", convert);
toUnitSelect.addEventListener("change", convert);

// Conversion logic
function convert() {
  const category = categorySelect.value;
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  let value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    resultText.innerText = "Result: ";
    return;
  }

  let result;

  // Length Conversion
  if (category === "length") {
    if (fromUnit === "cm" && toUnit === "m") result = value / 100;
    else if (fromUnit === "m" && toUnit === "cm") result = value * 100;
    else if (fromUnit === "m" && toUnit === "km") result = value / 1000;
    else if (fromUnit === "km" && toUnit === "m") result = value * 1000;
    else if (fromUnit === "cm" && toUnit === "km") result = value / 100000;
    else if (fromUnit === "km" && toUnit === "cm") result = value * 100000;
    else result = value;
  }

  // Weight Conversion
  if (category === "weight") {
    if (fromUnit === "g" && toUnit === "kg") result = value / 1000;
    else if (fromUnit === "kg" && toUnit === "g") result = value * 1000;
    else if (fromUnit === "kg" && toUnit === "lbs") result = value * 2.205;
    else if (fromUnit === "lbs" && toUnit === "kg") result = value / 2.205;
    else if (fromUnit === "g" && toUnit === "lbs") result = value / 453.6;
    else if (fromUnit === "lbs" && toUnit === "g") result = value * 453.6;
    else result = value;
  }

  // Temperature Conversion
  if (category === "temperature") {
    if (fromUnit === "C" && toUnit === "F") result = (value * 9/5) + 32;
    else if (fromUnit === "F" && toUnit === "C") result = (value - 32) * 5/9;
    else result = value;
  }

  resultText.innerText = `Result: ${result.toFixed(2)} ${toUnit}`;
}
