const myClock = document.getElementById("myClock");

// Apelarea funcției
getLocalTime()
  .then((time) => (myClock.textContent = time))
  .catch((error) => console.error(error));

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
        resolve(`${localTime}`);
      },
      (error) => {
        reject("Nu s-a putut obține locația.");
      }
    );
  });
}
