import * as database from "../CRUD/crud.js";

const myInput = document.getElementById("myInput");
const myList = document.getElementById("myList");

myInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let text = myInput.value;
    addToList(text);
  }
});

function clearingInput() {
  myInput.value = "";
}

function clearingHTML(item) {
  item.innerHTML = "";
}
