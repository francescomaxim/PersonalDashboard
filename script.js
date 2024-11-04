import * as database from "./CRUD/crud.js";

let greeting = document.getElementById("greeting");

updateGreeting();

function updateGreeting() {
  greeting.textContent =
    "Good morning, " + window.localStorage.getItem("username") + ".";
}
