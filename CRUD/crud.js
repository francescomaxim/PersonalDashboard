// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
// getDatabase,
// ref,
// push,
// onValue,
// remove,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSetting = {
//   databaseURL:
//     "https://personaldashboard-773bd-default-rtdb.europe-west1.firebasedatabase.app/",
// };

// const app = initializeApp(appSetting);
// const database = getDatabase(app);

// let pass;
// let usernamee;
// let myArray;

// export function createUser(userHash, username, password) {
//   let passwordField = ref(database, `${userHash}/password`);
//   let userField = ref(database, `${userHash}/username`);
//   push(passwordField, password);
//   push(userField, username);
// }

// export function existing(userHash) {
//   isExisting(userHash);
//   let item = window.localStorage.getItem("isValid");
//   if (item == 1) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function isExisting(userHash) {
//   let userPath = ref(database, `${userHash}`);
//   onValue(userPath, function (snapshot) {
//     if (snapshot.exists()) {
//       window.localStorage.setItem("isValid", 1);
//     } else {
//       window.localStorage.setItem("isValid", 0);
//     }
//   });
// }

// export function passing(userHash) {
//   getPass(userHash);
//   return pass;
// }

// function getPass(userHash) {
//   let passwordPath = ref(database, `${userHash}/password`);
//   onValue(passwordPath, function (snapshot) {
//     if (snapshot.exists()) {
//       let password = Object.entries(snapshot.val());
//       password.forEach((value) => {
//         pass = value[1];
//       });
//     }
//   });
// }

// export function passing2(userHash) {
//   getPass2(userHash);
//   return usernamee;
// }

// function getPass2(userHash) {
//   let passwordPath = ref(database, `${userHash}/username`);
//   onValue(passwordPath, function (snapshot) {
//     if (snapshot.exists()) {
//       let password = Object.entries(snapshot.val());
//       password.forEach((value) => {
//         usernamee = value[1];
//       });
//     }
//   });
// }

// export function addToList(userHash, item) {
//   let toDoListPath = ref(database, `${userHash}/ToDoList`);
//   push(toDoListPath, item);
// }

// export function getList(userHash) {
//   let toDoListPath = ref(database, `${userHash}/ToDoList`);
//   onValue(toDoListPath, function (snapshot) {
//     if (snapshot.exists()) {
//       let myArray = Object.entries(snapshot.val());
//       myArray.forEach((value) => {
//         console.log(value);
//       });
//     }
//   });
// }

// export function saveToArray(array) {}
