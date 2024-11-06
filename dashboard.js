function addEvent() {
  const eventInput = document.getElementById("event-input");
  const eventList = document.getElementById("event-list");

  if (eventInput.value) {
    const li = document.createElement("li");
    li.textContent = eventInput.value;
    li.addEventListener("click", () => li.remove());

    eventList.appendChild(li);
    eventInput.value = "";
  }
}

let unsplashAccessKey = "AIQlG_hdpej20iq4XeXNBr-vCzeMjcPWrlQsgAWpsw8";
let backgroundContainer = document.querySelector(".background-container");

async function fetchBackgroundImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${unsplashAccessKey}`
    );
    const data = await response.json();

    if (data && data.urls && data.urls.regular) {
      backgroundContainer.style.backgroundImage = `url(${data.urls.regular})`;
      backgroundContainer.style.backgroundSize = "cover";
      backgroundContainer.style.backgroundPosition = "center";
    }
  } catch (error) {
    console.error("Error fetching background image:", error);
  }
}

function fetchWeatherBackground() {
  fetch(
    `https://api.unsplash.com/photos/random?query=weather&orientation=landscape&client_id=${unsplashAccessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherCard = document.querySelector(".weather");
      if (data && data.urls && data.urls.regular) {
        weatherCard.style.backgroundImage = `url(${data.urls.regular})`;
        weatherCard.style.backgroundSize = "cover";
        weatherCard.style.backgroundPosition = "center";
        weatherCard.style.color = "#fff";
      }
    })
    .catch((error) => console.error("Error fetching background image:", error));
}

fetchBackgroundImage();
fetchWeatherBackground();

setInterval(fetchBackgroundImage, 600000);
setInterval(fetchWeatherBackground, 600000);

let newsApiKey = "fddc7b6e07854521bf4ce374976c4f2d";

async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
    );
    const data = await response.json();

    if (data.status === "ok" && data.articles) {
      displayNews(data.articles);
    } else {
      console.error("Error fetching news:", data);
      document.getElementById("news-info").textContent = "Error loading news.";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("news-info").textContent = "Error loading news.";
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-info");
  newsContainer.innerHTML = "";

  articles.slice(0, 3).forEach((article) => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const title = document.createElement("h3");
    title.classList.add("news-title");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.classList.add("news-description");
    description.textContent =
      article.description || "No description available.";

    const link = document.createElement("a");
    link.classList.add("news-link");
    link.href = article.url;
    link.target = "_blank";
    link.textContent = "Read more";

    newsItem.appendChild(title);
    newsItem.appendChild(description);
    newsItem.appendChild(link);

    newsContainer.appendChild(newsItem);
  });

  newsContainer.scrollTop = 0;
}

fetchNews();



document.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.querySelector(".quote-text"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector(".quote-button button");

  function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        quoteBtn.innerText = "Try Again";
        quoteBtn.classList.remove("loading");
      });
  }

  quoteBtn.addEventListener("click", randomQuote);
});

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

// Language

async function fetchTranslations() {
  const response = await fetch("translations.json");
  return response.json();
}

async function fetchUserPreferences() {
  const response = await fetch("user_preferences.json");
  return response.json();
}

async function applyTranslations(language) {
  const translations = await fetchTranslations();
  const elementsToTranslate = [
    "title",
    "weather-title",
    "loading-weather",
    "currency-title",
    "events-title",
    "add-event-button",
    "quote-title",
    "quote-text",
    "quote-button",
    "news-title",
    "news-title-1",
    "news-desc-1",
    "news-title-2",
    "news-desc-2",
    "news-title-3",
    "news-desc-3",
  ];

  document.documentElement.lang = language;

  elementsToTranslate.forEach((id) => {
    const element = document.getElementById(id);
    if (element && translations[language][id]) {
      element.textContent = translations[language][id];
    }
  });

  const eventInput = document.getElementById("event-input");
  if (eventInput && translations[language]["event-input-placeholder"]) {
    eventInput.placeholder = translations[language]["event-input-placeholder"];
  }
}

async function init() {
  try {
    const userPreferences = await fetchUserPreferences();
    const preferredLanguage =
      userPreferences.language || navigator.language.slice(0, 2);
    await applyTranslations(preferredLanguage);
  } catch (error) {
    console.error("Error applying translations:", error);
  }
}

init();
