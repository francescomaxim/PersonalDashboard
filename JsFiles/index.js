import { checkUserExists } from "../Firebase/database.js";

export let userStorage;
checkUserIsLogged();

function checkUserIsLogged() {
  const myUserUID = localStorage.getItem("myuseruid");
  checkUserExists(myUserUID);
}
