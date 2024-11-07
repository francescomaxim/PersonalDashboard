let unsplashAccessKey = "AIQlG_hdpej20iq4XeXNBr-vCzeMjcPWrlQsgAWpsw8";
const quoteCard = document.getElementById("quote");

function fetchBackground() {
  fetch(
    `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${unsplashAccessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherCard = document.querySelector(".weather");
      if (data && data.urls && data.urls.regular) {
        quoteCard.style.backgroundImage = `url(${data.urls.regular})`;
        quoteCard.style.backgroundSize = "cover";
        quoteCard.style.backgroundPosition = "center";
        quoteCard.style.color = "#fff";
      }
    })
    .catch((error) => console.error("Error fetching background image:", error));
}

fetchBackground();

setInterval(fetchBackground, 600000);
