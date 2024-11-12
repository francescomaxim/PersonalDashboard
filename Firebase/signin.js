import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

const myButton = document.getElementById("myButton");
const myInput = document.getElementById("myInput");
const myInput2 = document.getElementById("myInput2");
const mySmall = document.getElementById("mySmall");

myButton.addEventListener("click", () => {
  const email = myInput.value;
  const password = myInput2.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearWrong();
      const user = userCredential.user;
      setTimeout(function () {
        window.location.href = "../index.html";
        localStorage.setItem("myuseruid", user.uid);
      }, 2000);
    })
    .catch((error) => {
      isWrong();
    });
});

function isWrong() {
  mySmall.style.color = "red";
  mySmall.innerText = "Wrong email or password";
}

function clearWrong() {
  mySmall.style.color = "black";
  mySmall.innerText = "loggin in...";
}
