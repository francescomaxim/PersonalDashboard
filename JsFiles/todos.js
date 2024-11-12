import {
  addToList,
  getToDoList,
  deleteListElement,
} from "../Firebase/database.js";

const myInput = document.getElementById("myInput");
const myList = document.getElementById("myList");

initList();

async function initList() {
  let toDo = await getToDoList(getUserUID());
  if (toDo != null) {
    let toDoArray = Object.entries(toDo);
    createList(toDoArray);
  }
}

myInput.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    let text = myInput.value;
    clearingInput();
    addToList(getUserUID(), text);
    initList();
  }
});

function createList(toDo) {
  clearingHTML(myList);
  for (let i = 0; i < toDo.length; i++) {
    createListItem(toDo[i]);
  }
}

function createListItem(toDoElement) {
  let myElement = document.createElement("li");
  myElement.textContent = toDoElement[1];
  myElement.addEventListener("click", () => {
    deleteListElement(getUserUID(), toDoElement[0]);
    initList();
  });
  myList.append(myElement);
}

function clearingInput() {
  myInput.value = "";
}

function clearingHTML(item) {
  item.innerHTML = "";
}

function getUserUID() {
  return localStorage.getItem("myuseruid");
}
