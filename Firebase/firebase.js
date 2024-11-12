// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHalSs2moqZ4gyBSrPNQm97N5Ht6EEAGQ",
  authDomain: "personal-dashboard-c91db.firebaseapp.com",
  projectId: "personal-dashboard-c91db",
  storageBucket: "personal-dashboard-c91db.firebasestorage.app",
  messagingSenderId: "634631605090",
  appId: "1:634631605090:web:e17244a8cdc95a49ccba3b",
  databaseURL:
    "https://personal-dashboard-c91db-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
