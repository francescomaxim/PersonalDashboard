export function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length > 4
  );
}

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function validateUsername(username) {
  if (username.replace(/\s/g, "").length < 1) {
    return false;
  }
  return true;
}

export function errorMessage(message) {
  mySmall.innerHTML = `Please enter a valid ${message}!`;
  mySmall.style.color = "red";
}

export function resetError() {
  mySmall.style.color = "white";
}
