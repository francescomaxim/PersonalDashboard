import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://personaldashboard-773bd-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);

let pass;
let myBoolean;

export function createUser(userHash, username, password) {
  let passwordField = ref(database, `${userHash}/password`);
  let userField = ref(database, `${userHash}/username`);
  push(passwordField, password);
  push(userField, username);
}

export function existing(userHash) {
  isExisting(userHash);
  let item = window.localStorage.getItem("isValid");
  if (item == 1) {
    return true;
  } else {
    return false;
  }
}

function isExisting(userHash) {
  let userPath = ref(database, `${userHash}`);
  onValue(userPath, function (snapshot) {
    if (snapshot.exists()) {
      window.localStorage.setItem("isValid", 1);
    } else {
      window.localStorage.setItem("isValid", 0);
    }
  });
}

export function passing(userHash) {
  getPass(userHash);
  return pass;
}

function getPass(userHash) {
  let passwordPath = ref(database, `${userHash}/password`);
  onValue(passwordPath, function (snapshot) {
    if (snapshot.exists()) {
      let password = Object.entries(snapshot.val());
      password.forEach((value) => {
        pass = value[1];
      });
    }
  });
}
