let unsplashAccessKey = "L311R-ah5T6Yucd_45Wys-2zL0bHjA8FLd3BYjxq1ao";

function fetchWeatherBackground() {
  fetch(
    `https://api.unsplash.com/photos/random?query=weather&orientation=landscape&client_id=${unsplashAccessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const backgroundContainer = document.getElementById("main");
      if (data && data.urls && data.urls.regular) {
        console.log("sunt aici");
        backgroundContainer.style.backgroundImage = `url(${data.urls.regular})`;
        backgroundContainer.style.backgroundSize = "cover";
        backgroundContainer.style.backgroundPosition = "center";
        backgroundContainer.style.color = "#fff";
      }
    })
    .catch((error) => console.error("Error fetching background image:", error));
}

//fetchWeatherBackground();
