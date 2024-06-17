document.addEventListener('DOMContentLoaded', function() {
    // Set the current date in the invoice
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('invoiceDate').innerText = currentDate;

    // Attach click event listeners to each name link
    const nameLinks = document.querySelectorAll('.name-link');
    nameLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const name = this.innerText.trim();
            fillInvoice(name);
        });
    });

    // Function to fill invoice based on selected name
    function fillInvoice(name) {
        // Populate invoice fields
        document.getElementById('invoiceTo').value = name;

        // Automatically calculate consumption
        calculateConsumption();
    }

    // Function to calculate consumption
    function calculateConsumption() {
        const previousRead = parseFloat(document.getElementById('previousRead').value) || 0;
        const currentRead = parseFloat(document.getElementById('currentRead').value) || 0;
        const consumption = currentRead - previousRead;

        const consumptionValue = consumption > 0 ? consumption : 0;
        const totalValue = consumptionValue * 100;

        document.getElementById('consumption').value = consumptionValue;
        document.getElementById('total').value = totalValue;

        updateTotal();
    }

    // Function to update total in the invoice
    function updateTotal() {
        const totalValue = parseFloat(document.getElementById('total').value) || 0;
        const balanceBf = parseFloat(document.getElementById('balanceBf').value) || 0;
        const currentBill = parseFloat(document.getElementById('currentBill').value) || 0;
        const otherCharges = parseFloat(document.getElementById('otherCharges').value) || 0;

        const subtotal = totalValue + balanceBf + currentBill + otherCharges;
        const vat = subtotal * 0.16;
        const grandTotal = subtotal + vat;

        document.getElementById('subtotal').innerText = subtotal.toFixed(2);
        document.getElementById('vat').innerText = vat.toFixed(2);
        document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
    }

    // Attach event listeners to input fields for dynamic calculations
    const inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach(input => {
        input.addEventListener('input', function() {
            calculateConsumption();
        });
    });

    // Send button functionality
    const sendButton = document.getElementById('sendInvoice');
    sendButton.addEventListener('click', function() {
        const invoiceData = {
            invoiceTo: document.getElementById('invoiceTo').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            consumption: parseFloat(document.getElementById('consumption').value),
            total: parseFloat(document.getElementById('grandTotal').innerText)
        };

        // Here you can implement sending logic, like an AJAX request
        console.log("Sending invoice data:", invoiceData);
        alert("Invoice sent successfully!");
    });
});
