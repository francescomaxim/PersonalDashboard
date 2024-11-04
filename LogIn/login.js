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

myButton.addEventListener("click", () => {
  resetError();
  if (counter === 0) {
    if (myInput.value.length <= 2) {
      errorMessage("username");
    } else {
      goToEmail();
      counter++;
    }
  } else {
    if (counter === 1) {
      const user = myInput.value;
      const isValid = validateEmail(user);
      if (isValid) {
        userHash = parseUser(user);
        verifyUserExist(userHash);
        counter++;
      } else {
        errorMessage("email");
      }
    } else {
      if (counter === 2) {
        if (myInput.value.length < 4) {
          errorMessage("password");
        } else {
          if (userExist != 1) {
            let smt = ref(database, `${userHash}/password`);
            push(smt, myInput.value);
            goIn();
          } else {
            let ok = validatePassword(userHash, myInput.value);
            if (!ok) {
              wrongPass();
            } else {
              goIn();
            }
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

function goIn() {
  saveLogInToLocalStorage(userHash);
  window.location.href = "./../dashboard.html";
}

function saveLogInToLocalStorage(user) {
  localStorage.setItem("user", user);
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
  let message;
  userInDatabase = ref(database, `${user}`);
  onValue(userInDatabase, function (snapshot) {
    if (snapshot.exists()) {
      message = "Enter";
      userExist = 1;
    } else {
      message = "Select";
    }
    goToPassword(message);
  });
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
