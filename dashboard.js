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

let unsplashAccessKey = 'AIQlG_hdpej20iq4XeXNBr-vCzeMjcPWrlQsgAWpsw8';
let backgroundContainer = document.querySelector('.background-container');

async function fetchBackgroundImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${unsplashAccessKey}`);
        const data = await response.json();

        if (data && data.urls && data.urls.regular) {
            backgroundContainer.style.backgroundImage = `url(${data.urls.regular})`;
            backgroundContainer.style.backgroundSize = 'cover';
            backgroundContainer.style.backgroundPosition = 'center';
        }
    } catch (error) {
        console.error("Error fetching background image:", error);
    }
}


function fetchWeatherBackground() {
    fetch(`https://api.unsplash.com/photos/random?query=weather&orientation=landscape&client_id=${unsplashAccessKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherCard = document.querySelector('.weather');
            if (data && data.urls && data.urls.regular) {
                weatherCard.style.backgroundImage = `url(${data.urls.regular})`;
                weatherCard.style.backgroundSize = 'cover';
                weatherCard.style.backgroundPosition = 'center';
                weatherCard.style.color = '#fff'; 
            }
        })
        .catch(error => console.error('Error fetching background image:', error));
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
        description.textContent = article.description || "No description available.";

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
}

fetchNews();

// Quote

document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.querySelector(".quote-text"), 
        authorName = document.querySelector(".author .name"),
        quoteBtn = document.querySelector(".quote-button button");

    function randomQuote() {
        quoteBtn.classList.add("loading");
        quoteBtn.innerText = "Loading Quote...";

        fetch("https://api.quotable.io/random")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                quoteText.innerText = result.content;
                authorName.innerText = result.author;
                quoteBtn.innerText = "New Quote";
                quoteBtn.classList.remove("loading");
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
                quoteBtn.innerText = "Try Again";
                quoteBtn.classList.remove("loading");
            });
    }

    quoteBtn.addEventListener("click", randomQuote);
});









