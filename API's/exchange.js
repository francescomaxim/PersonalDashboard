const scrollingText = document.getElementById("scrolling-text");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";
const displayedCurrencies = ["EUR", "GBP", "USD", "JPY", "CAD"];

async function fetchExchangeRates() {
  try {
    const response = await fetch(`${API_URL}RON`);
    const data = await response.json();

    startScrollingRates(data.rates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert(
      "Failed to load exchange rates from API. Using local data if available."
    );

    const savedRates = localStorage.getItem("exchangeRates");
    if (savedRates) {
      const rates = JSON.parse(savedRates);
      startScrollingRates(rates);
    } else {
      alert("No local data available.");
    }
  }
}

function startScrollingRates(rates) {
  const exchangeRatesList = displayedCurrencies.map((currency) => {
    return `${currency}: ${
      rates[currency] ? rates[currency].toFixed(2) : "N/A"
    }`;
  });

  let index = 0;
  setInterval(() => {
    scrollingText.textContent = `Current Exchange Rates - ${exchangeRatesList[index]}`;
    index = (index + 1) % exchangeRatesList.length;
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  fetchExchangeRates();
});
