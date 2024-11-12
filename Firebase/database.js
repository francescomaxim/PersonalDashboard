import { database } from "./firebase.js";
import {
  set,
  get,
  ref,
  push,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

export let user;

export function deleteListElement(userUID, key) {
  const myURL = ref(database, "users/" + userUID + `/ToDoList/${key}`);
  remove(myURL);
}

export async function getToDoList(userUID) {
  const myURL = ref(database, "users/" + userUID + "/ToDoList");
  let snapshot = await get(myURL);
  let toDoList;
  if (snapshot.exists()) {
    toDoList = await snapshot.val();
    return toDoList;
  } else {
    return null;
  }
}

export function writeUserData(userUID, username) {
  set(ref(database, "users/" + userUID), {
    username: username,
  });
}

export function addToList(myUserUID, text) {
  const myURL = ref(database, "users/" + myUserUID + "/ToDoList");
  push(myURL, text);
}

export function checkUserExists(myUserUID) {
  if (myUserUID == null || myUserUID == "") {
    goLogIn();
  } else {
    const myURL = ref(database, "users/" + myUserUID);
    get(myURL).then((snapshot) => {
      if (snapshot.exists()) {
        user = snapshot.val().username;
      } else {
        goLogIn();
      }
    });
  }
}

function goLogIn() {
  window.location.href = "LogIn/login.html";
}
