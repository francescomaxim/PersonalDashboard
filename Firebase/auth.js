import { user, writeUserData } from "./database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  errorMessage,
  resetError,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../LogIn/verify.js";

const myHeader = document.getElementById("myHeader");
const myInput = document.getElementById("myInput");
const mySmall = document.getElementById("mySmall");
const myButton = document.getElementById("myButton");
const myButton2 = document.getElementById("myButton2");

let counter = 0;
let username;
let email;
let password;

myButton2.addEventListener("click", () => {
  window.location.href = "../LogIn/login2.html";
});

myButton.addEventListener("click", () => {
  if (counter == 0) {
    resetError();
    username = myInput.value;
    if (validateUsername(username)) {
      counter++;
      myButton2.style.display = `none`;
      goToEmail(username);
    } else {
      errorMessage("username");
    }
  } else {
    if (counter == 1) {
      email = myInput.value;
      if (validateEmail(email)) {
        counter++;
        goToPassword();
      } else {
        errorMessage("email");
      }
    } else {
      if (counter == 2) {
        password = myInput.value;
        if (!validatePassword(password)) {
          errorMessage("password");
        } else {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              writeUserData(user.uid, username);
              setTimeout(function () {
                window.location.href = "../index.html";
                localStorage.setItem("myuseruid", user.uid);
              }, 2000);
            })
            .catch((error) => {});
        }
      }
    }
  }
});

function goToEmail(username) {
  myHeader.innerHTML = `What's your email, ${username}?`;
  myInput.value = "";
  mySmall.innerHTML = "Enter your emal to create an account or log in";
}

function goToPassword() {
  myHeader.innerHTML = `Create your password`;
  myInput.setAttribute("type", "password");
  myInput.value = "";
  mySmall.innerHTML =
    `Password should contain:` +
    `<br>` +
    `At least one uppercase letter` +
    `<br>` +
    `At least one lowercase letter ` +
    `<br>` +
    `At least one digit` +
    `<br>` +
    ` At least one special symbol ` +
    `<br>` +
    `And should be more than 4 character`;
}
