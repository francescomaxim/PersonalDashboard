const API_URL = "https://api.exchangerate-api.com/v4/latest/";
const displayedCurrencies = ["EUR", "GBP", "USD", "JPY", "CAD"];
const currencyFlags = {
  EUR: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/2560px-Flag_of_Europe.svg.png",
  GBP: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2560px-Flag_of_the_United_Kingdom.svg.png",
  USD: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png",
  JPY: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/2560px-Flag_of_Japan.svg.png",
  CAD: "https://upload.wikimedia.org/wikipedia/en/archive/c/cf/20190402205956%21Flag_of_Canada.svg",
};

async function fetchExchangeRates() {
  try {
    const response = await fetch(`${API_URL}RON`);
    const data = await response.json();

    displayExchangeRates(data.rates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert(
      "Failed to load exchange rates from API. Using local data if available."
    );

    const savedRates = localStorage.getItem("exchangeRates");
    if (savedRates) {
      const rates = JSON.parse(savedRates);
      displayExchangeRates(rates);
    } else {
      alert("No local data available.");
    }
  }
}

function displayExchangeRates(rates) {
  const ratesContainer = document.getElementById("exchange-rates");
  ratesContainer.innerHTML = ""; // Clear previous content

  displayedCurrencies.forEach((currency) => {
    const rateElement = document.createElement("div");
    rateElement.classList.add("rate-item");

    const flagImg = document.createElement("img");
    flagImg.src = currencyFlags[currency] || "https://flagcdn.com/w20/un.png"; // Fallback to a default flag image if not found
    flagImg.alt = `${currency} flag`;
    flagImg.width = 60; // Adjust the size as needed
    flagImg.height = 37;

    const rate = rates[currency] ? rates[currency].toFixed(2) : "N/A";
    const rateText = document.createElement("span");
    rateText.textContent = ` ${currency}: ${rate}`;

    rateElement.appendChild(flagImg);
    rateElement.appendChild(rateText);
    ratesContainer.appendChild(rateElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchExchangeRates();
});
