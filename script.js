// Replace 'YOUR_API_KEY' with your actual ExchangeRate-API key
const apiKey = '7f3a9b8c09eb9ea7d8ce7c29 ';
const apiUrl = `https://open.er-api.com/v6/latest`;

// Function to fetch and populate currency options
async function populateCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const currencyOptions = Object.keys(data.rates);

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    // Add currency options to the select elements
    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;

        fromCurrencySelect.add(option1);
        toCurrencySelect.add(option2);
    });
}

// Function to convert currency
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    const conversionUrl = `${apiUrl}/${fromCurrency}?apikey=${apiKey}`;

    try {
        const response = await fetch(conversionUrl);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            resultDiv.innerHTML = `${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}`;
        } else {
            resultDiv.innerHTML = 'Conversion failed. Please try again later.';
        }
    } catch (error) {
        console.error('Error converting currency:', error);
        resultDiv.innerHTML = 'An error occurred. Please try again later.';
    }
}

// Populate currency options when the page loads
populateCurrencies();
