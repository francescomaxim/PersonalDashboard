const myHeader = document.getElementById("myHeader");
const myInput = document.getElementById("myInput");
const mySmall = document.getElementById("mySmall");
const myButton = document.getElementById("myButton");

counter = 0;

myButton.addEventListener("click", () => {
  counter++;
  if (counter === 0) {
  } else {
    if (counter === 1) {
      myHeader.innerHTML = `What's your email, ${myInput.value}?`;
      myInput.value = "";
      mySmall.innerHTML = "Enter your emal to create an account or log in";
    } else {
      if (counter === 2) {
        myHeader.innerHTML = `Enter your password`;
        myInput.setAttribute("type", "password");
        myInput.value = "";
        mySmall.innerHTML = "";
      }
    }
  }
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}
