//Menu open and close
function openMenu(){
  document.getElementById("side-menu").style.width = "300px";
  document.getElementById("side-menu-background").style.display = "block";
}
function closeMenu(){
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("side-menu-background").style.display = "none";
}

//load theme
function loadTheme(){
  let theme = localStorage.getItem("Theme");
  if (theme !== null){
    if (theme !== "light-theme"){
      document.body.classList.toggle("dark-mode");
    }
    return ;
  }
  theme = "light-theme"
  localStorage.setItem("Theme", theme)
}

// change theme
function changeTheme(){
  let change = document.body.classList.toggle("dark-mode")
  if (change === true){
    localStorage.setItem("Theme", "dark-theme");
    document.getElementById("dark-icon").style.display = "none";
    document.getElementById("light-icon").style.display = "flex";
  }
  else{
    localStorage.setItem("Theme", "light-theme");
    document.getElementById("dark-icon").style.display = "flex";
    document.getElementById("light-icon").style.display = "none";
  }
}
let UserName = null;
//function to check login state
function checkLogin(){
  if (document.cookie === ""){
    window.alert("Please Login first")
    window.location = "login.html"
  }
  else{
    UserName = document.cookie.split("=")[1]
    document.getElementById("login").innerHTML = `
        <div id="name">
          <a href="login.html" title="Click here to change account"> Welcome ${UserName} </a>
        </div>
        `
  }
}

function checkLoginPassword() {
  const password = document.getElementById("password").value;
  //a regular expression for checking 8 character long and lowercase & capital letter
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (regex.test(password)) {
    const userName = document.getElementById("user-name").value;
    if (findUser(userName, password)) {
        setCookie(userName, 120)
        document.getElementById("login").innerHTML = `
        <div id="name">
          <a href="login.html" title="Click here to change account"> Welcome ${userName} </a>
        </div>
        `
        window.location = "Income-Expenditure.html"
    }
  }
  else{
    document.getElementById("alert-text").innerHTML = "The password must be at least 8 characters long. \
                                                       \nContains lowercase & capital letter";
  }
}

function findUser(username, password) {
  //define a flag whether the user exist
  let user_found = false;
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")) || []
  Object.keys(UserInfo).forEach((user_id) => {
    if (username === user_id) {
      if (password === UserInfo[user_id]) {
        user_found = true;
        return ;
      } else {
        //if the username is same but the password is wrong => tell user password wrong and return 
        document.getElementById("alert-text").innerHTML = "The password is wrong";
        return ;
      }
    }
  });
  if (user_found) {
    return true;
  }
  document.getElementById("alert-text").innerHTML = "Can't find the user. Please login again.";
  document.getElementById("password").value = "";
  return false;
}

function checkCreatePassword() {
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm-password").value;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (regex.test(password)) {
    if (password === confirm_password) {
      const userName = document.getElementById("user-name").value;
      createAccount(userName, password);
      document.getElementById("alert-text").innerHTML = "Account Created";
    } else {
      document.getElementById("alert-text").innerHTML =
        "The password and the confirm password must be the same.";
    }
  } else {
    document.getElementById("alert-text").innerHTML =
      "The password must be at least 8 characters long. \nContains lowercase & capital letter";
  }
}

function createAccount(username, password) {
  const returnValue = JSON.parse(localStorage.getItem("UserInfo"));
  let userInfo = {};
  if (returnValue !== null) {
    userInfo = returnValue;
  }
  userInfo[username] = password;
  localStorage.setItem("UserInfo", JSON.stringify(userInfo));
  window.alert("The account created.");
  window.location = "login.html";
}

function setCookie(username, mins){
  const date = new Date();
  date.setTime(date.getTime() + mins * 60 * 1000)
  document.cookie = `username=${username}; expires=${date.toUTCString()}`
}

// function getLogin(){
//   let login_list = document.cookie;
//   login_list = login_list.split("=");
//   console.log(login_list[1]);
//   return login_list[1]
// }