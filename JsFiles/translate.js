// async function fetchTranslations() {
//   const response = await fetch("Translation/translations.json");
//   return response.json();
// }

// async function fetchUserPreferences() {
//   const response = await fetch("Translation/user_preferences.json");
//   return response.json();
// }

// async function applyTranslations(language) {
//   const translations = await fetchTranslations();
//   const elementsToTranslate = [
//     "title",
//     "weather-title",
//     "loading-weather",
//     "currency-title",
//     "events-title",
//     "add-event-button",
//     "quote-title",
//     "quote-text",
//     "quote-button",
//     "news-title",
//     "news-title-1",
//     "news-desc-1",
//     "news-title-2",
//     "news-desc-2",
//     "news-title-3",
//     "news-desc-3",
//   ];

//   document.documentElement.lang = language;

//   elementsToTranslate.forEach((id) => {
//     const element = document.getElementById(id);
//     if (element && translations[language][id]) {
//       element.textContent = translations[language][id];
//     }
//   });

//   const eventInput = document.getElementById("event-input");
//   if (eventInput && translations[language]["event-input-placeholder"]) {
//     eventInput.placeholder = translations[language]["event-input-placeholder"];
//   }
// }

// async function init() {
//   try {
//     const userPreferences = await fetchUserPreferences();
//     const preferredLanguage =
//       userPreferences.language || navigator.language.slice(0, 2);
//     await applyTranslations(preferredLanguage);
//   } catch (error) {
//     console.error("Error applying translations:", error);
//   }
// }

// init();
