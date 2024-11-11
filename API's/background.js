const quoteCard = document.getElementById("quote");

export function fetchBackground(response, data) {
  const weatherCard = document.querySelector(".weather");
  if (data && data.urls && data.urls.regular) {
    quoteCard.style.backgroundImage = `url(${data.urls.regular})`;
    quoteCard.style.backgroundSize = "cover";
    quoteCard.style.backgroundPosition = "center";
    quoteCard.style.color = "#fff";
  }
}
