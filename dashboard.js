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

