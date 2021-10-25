let password = document.querySelector("#login-pass");
let confirmPassword = document.getElementById("passwordConfirm");
let email = document.querySelector(".email-input");
let isValid = true;
let check="1";
let welcomeHeading = document.getElementById("welcome-user");
let loginInput_error = document.querySelector("#username_error");
let email_error = document.querySelector("#email_error");
let pass_error = document.querySelector("#pass_error");
let confirm_error = document.querySelector("#confirm_error");

let loginForm = document.querySelector(".form-login");
let loginButton = document.getElementById("login-btn");
let loginInput = document.querySelector(".login-username");

let users = [];

function validated(event) {
  event.preventDefault();
  if (loginInput.value.length < 3) {
    loginInput_error.style.display = "block";
    loginInput.style.border = "1px solid red";
  } else {
    loginInput_error.style.display = "none";
    loginInput.style.border = "1px solid silver";
  }

  if (password.value.length < 6) {
    pass_error.style.display = "block";
    password.style.border = "1px solid red";
  } else {
    pass_error.style.display = "none";
    password.style.border = "1px solid silver";
  }

  if (confirmPassword.value !== password.value) {
    confirm_error.style.display = "block";
    confirmPassword.style.border = "1px solid red";
  } else {
    confirm_error.style.display = "none";
    confirmPassword.style.border = "1px solid silver";
  }
  if (
    confirmPassword.value !== password.value ||
    password.value.length < 6 ||
    loginInput.value.length < 3
  ) {
    isValid = false;
  } else {
    isValid = true;
  }
  if (isValid == true) {
    check="1";
    //object contains the username and password given from the register form
    let obj = { username: loginInput.value, password: password.value };
    
    // saved the object in local storage as json because local storage can't save object
    localStorage.setItem(`data ${loginInput.value}`, JSON.stringify(obj));

    document.getElementById("login").style.display = "none";
    document.getElementById("login-welcome").style.display = "flex";
    document.getElementById("welcome-name").innerHTML =
      "Welcome " +
      JSON.parse(localStorage.getItem(`data ${loginInput.value}`)).username;
  }
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    JSON.stringify({ username: loginInput.value, password: password.value }) ===
    localStorage.getItem(`data ${loginInput.value}`)
  ) {
    document.getElementById("login").style.display = "none";
    document.getElementById("login-welcome").style.display = "flex";
    // document.getElementsByClassName("login-section")[0].style.height = "50vh";
    document.getElementById("welcome-name").innerHTML =
      "Welcome " +
      JSON.parse(localStorage.getItem(`data ${loginInput.value}`)).username;
  } else {
    alert(" Username or Password incorrect");
  }
});
