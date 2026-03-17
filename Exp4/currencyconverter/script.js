function convert() {
    // Access DOM elements
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');

    // Sample static conversion rate: 1 USD = 72 INR
    const rate = 72;
    let convertedValue = 0;

    if (from === "USD" && to === "INR") {
        convertedValue = amount * rate;
    } else if (from === "INR" && to === "USD") {
        convertedValue = amount / rate;
    } else {
        convertedValue = amount; // Same currency
    }

    // Update content dynamically
    resultDiv.innerHTML = "Amount = " + Math.round(convertedValue);
}

// Initial calculation on load
window.onload = convert;
