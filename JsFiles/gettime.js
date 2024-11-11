const myClock = document.getElementById("myClock");
let myText;

// Apelarea funcției
setInterval(setting, 1000);

function setting() {
  getLocalTime()
    .then((time) => {
      updateGreeting();
      myClock.textContent = time;
    })
    .catch((error) => console.error(error));
}

function getLocalTime() {
  return new Promise((resolve, reject) => {
    // Verifică dacă browserul suportă API-ul de geolocalizare
    if (!navigator.geolocation) {
      reject("Geolocalizarea nu este suportată de browser-ul tău.");
      return;
    }

    // Obține locația utilizatorului
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Creează un obiect `Date` local
        const currentDate = new Date();

        // Folosește fusul orar local pentru a afișa ora exactă
        const options = {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          hour: "2-digit",
          minute: "2-digit",
        };

        // Convertire în format localizat
        const localTime = new Intl.DateTimeFormat("ro-RO", options).format(
          currentDate
        );
        console.log(currentDate.getHours());
        if (0 <= currentDate.getHours()) {
          myText = "Good morning";
        }
        if (12 < currentDate.getHours()) {
          myText = "Good afternoon";
        }
        if (20 < currentDate.getHours()) {
          myText = "Good evening";
        }

        resolve(`${localTime}`);
      },
      (error) => {
        reject("Nu s-a putut obține locația.");
      }
    );
  });
}

import * as database from "../CRUD/crud.js";

let greeting = document.getElementById("greeting");

function updateGreeting() {
  greeting.textContent =
    myText + ", " + window.localStorage.getItem("username") + ".";
}
