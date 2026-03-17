// Function to perform calculations
function calculate(operation) {
    // Accessing elements using getElementById
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const resultField = document.getElementById('result');

    if (isNaN(n1) || isNaN(n2)) {
        alert("Please enter valid numbers");
        return;
    }

    let res;
    switch (operation) {
        case 'add': res = n1 + n2; break;
        case 'sub': res = n1 - n2; break;
        case 'mul': res = n1 * n2; break;
        case 'div': 
            res = n2 !== 0 ? n1 / n2 : "Error (Div by 0)"; 
            break;
    }
    
    // Updating content dynamically without reload
    resultField.value = "Result: " + res;
}

// Function to clear all fields
function clearFields() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').value = '';
}

// Example of using onkeyup or onchange for real-time validation
document.getElementById('num1').onkeyup = function() {
    console.log("User is typing in Input 1");
};
