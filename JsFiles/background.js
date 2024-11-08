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

fetchBackgroundImage();