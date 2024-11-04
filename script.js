let greeting = document.getElementById("greeting");

updateGreeting();

function updateGreeting() {
  let myUser = getUser();
  greeting.textContent = `Hello there ${myUser}`;
}

function getUser() {
  let myUser = window.localStorage.getItem("user");
  return myUser;
}
