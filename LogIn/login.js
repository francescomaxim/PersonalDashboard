const myHeader = document.getElementById("myHeader");
const myInput = document.getElementById("myInput");
const mySmall = document.getElementById("mySmall");
const myButton = document.getElementById("myButton");

counter = 0;

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
      isValid = validateEmail(myInput.value);
      if (isValid) {
        goToPassword();
        counter++;
      } else {
        errorMessage("email");
      }
    } else {
      if (counter === 2) {
        if (myInput.value.length < 4) {
          errorMessage("password");
        } else {
          //successfull
        }
      }
    }
  }
});

function goToPassword() {
  myHeader.innerHTML = `Enter your password`;
  myInput.setAttribute("type", "password");
  myInput.value = "";
  mySmall.innerHTML = "";
}

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
