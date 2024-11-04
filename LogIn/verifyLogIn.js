checkLogIn();

function checkLogIn() {
  let key = localStorage.getItem("user");
  if (key == null) {
    window.location.href = "LogIn/login.html";
  }
}
