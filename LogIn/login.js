// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
//   remove,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSetting = {
//   databaseURL:
//     "https://personaldashboard-773bd-default-rtdb.europe-west1.firebasedatabase.app/",
// };

// const app = initializeApp(appSetting);
// const database = getDatabase(app);

import * as database from "../CRUD/crud.js";

const myHeader = document.getElementById("myHeader");
const myInput = document.getElementById("myInput");
const mySmall = document.getElementById("mySmall");
const myButton = document.getElementById("myButton");

let counter = 0;

let pathOfUser;
let userHash;
let userInDatabase;
let userExist;
let pass;
let username;

myButton.addEventListener("click", () => {
  resetError();
  if (counter === 0) {
    if (myInput.value.length <= 2) {
      errorMessage("username");
    } else {
      username = myInput.value;
      goToEmail();
      counter++;
    }
  } else {
    if (counter === 1) {
      userHash = parseUser(myInput.value);
      database.existing(userHash);
      goToPassword("Enter");
      counter++;
    } else {
      if (counter === 2) {
        if (myInput.value.length < 4) {
          errorMessage("password");
        } else {
          if (database.existing(userHash)) {
            let passing = database.passing(userHash);
            if (passing == myInput.value) {
              goIn(passing, username);
            } else {
              wrongPass();
            }
          } else {
            database.createUser(userHash, username, myInput.value);
            goIn(myInput.value, username);
          }
        }
      }
    }
  }
});

function wrongPass() {
  mySmall.innerHTML = "Wrong password";
  mySmall.style.color = "red";
}

function goIn(pass, username) {
  saveLogInToLocalStorage(userHash, pass, username);
  window.location.href = "./../index.html";
}

function saveLogInToLocalStorage(user, pass, username) {
  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  localStorage.setItem("username", username);
}

function validatePassword(user, password) {
  getPass(userHash);
  if (pass[1] == password) {
    return true;
  } else {
    return false;
  }
}

function verifyUserExist(user) {
  // let message;
  // userInDatabase = ref(database, `${user}`);
  // onValue(userInDatabase, function (snapshot) {
  //   if (snapshot.exists()) {
  //     message = "Enter";
  //     userExist = 1;
  //   } else {
  //     message = "Select";
  //   }
  //   goToPassword(message);
  // });
}

function getPass(user) {
  let passwordPath = ref(database, `${user}/password`);
  onValue(passwordPath, function (snapshot) {
    if (snapshot.exists()) {
      let password = Object.entries(snapshot.val());
      password.forEach((value) => {
        pass = value;
      });
    }
  });
}

function parseUser(user) {
  return user.replace(/[^a-zA-Z ]/g, "");
}

function goToPassword(message) {
  myHeader.innerHTML = `${message} your password`;
  myInput.setAttribute("type", "password");
  myInput.value = "";
  mySmall.innerHTML = "";
}

function checkPassword(password) {}

function goToEmail() {
  myHeader.innerHTML = `What's your email, ${myInput.value}?`;
  myInput.value = "";
  mySmall.innerHTML = "Enter your emal to create an account or log in";
}

function errorMessage(message) {
  mySmall.innerHTML = `Please enter a valid ${message}!`;
  mySmall.style.color = "red";
}

function resetError() {
  mySmall.style.color = "white";
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}
