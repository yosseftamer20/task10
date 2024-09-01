var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var successNotification = document.getElementById("successNotification");
var errorNotification = document.getElementById("errorNotification");
var alreadyExists = document.getElementById("alreadyExists");
var isNotExists = document.getElementById("isNotExists");

var userName = localStorage.getItem("sessionUsername");
if (userName) {
  document.getElementById(
    'welcomeMessage'
  ).innerHTML = `<h1>Welcome, ${userName}!</h1>`;
}

var customers = [];
if (localStorage.getItem("AllCustomers")) {
  customers = JSON.parse(localStorage.getItem("AllCustomers"));
}

//========================== Sign Up Part ==========================

function signUpIsEmpty() {
  return !(
    signUpName.value === "" ||
    signUpEmail.value === "" ||
    signUpPassword.value === ""
  );
}

function isEmailExist() {
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].email == signUpEmail.value) {
      return true;
    }
  }
}

function signUp() {
  if (!signUpIsEmpty()) {
    errorNotification.classList.replace("d-none", "d-block");
    return;
  }
  var customer = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };
  if (
    Authentication(signUpName) &
    Authentication(signUpEmail) &
    Authentication(signUpPassword)
  ) {
    if (customers.length == 0) {
      customers.push(customer);
      localStorage.setItem("AllCustomers", JSON.stringify(customers));
      successNotification.classList.replace("d-none", "d-block");
      clearInput();
      return true;
    } else if (isEmailExist() == true) {
      alreadyExists.classList.replace("d-none", "d-block");
    } else {
      customers.push(customer);
      localStorage.setItem("AllCustomers", JSON.stringify(customers));
      successNotification.classList.replace("d-none", "d-block");
      clearInput();
    }
  }
}

//========================== Sign In Part ==========================

function signInIsEmpty() {
  return !(signInEmail.value === "" || signInPassword.value === "");
}

function isUserExist() {
  for (let i = 0; i < customers.length; i++) {
    if (
      customers[i].email === signInEmail.value &&
      customers[i].password === signInPassword.value
    ) {
      localStorage.setItem("sessionUsername", customers[i].name);
      console.log('hell');
      
      return true;
    }
  }
  return false;
}

function signIn() {
  isNotExists.classList.replace("d-block", "d-none");
  if (!signInIsEmpty()) {
    errorNotification.classList.replace("d-none", "d-block");
    return;
  } else if (Authentication(signInEmail) & Authentication(signInPassword)) {
    isNotExists.classList.replace("d-block", "d-none");
    if (isUserExist()) {
      window.location.href = "home.html";
    } else {
      isNotExists.classList.replace("d-none", "d-block");
      return;
    }
  }
}


function clearInput() {
  signUpName.value = null;
  signUpEmail.value = null;
  signUpPassword.value = null;
  signInEmail.value = null;
  signInPassword.value = null;
}

function Authentication(userData) {
  errorNotification.classList.replace("d-block", "d-none");

  var dataRegex = {
    signUpName: /^[A-Z].{2,8}$/,
    signUpEmail: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/,
    signUpPassword: /^[A-Za-z0-9.*\/+\-_#$]{6,}$/i,
    signInEmail: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/,
    signInPassword: /^[A-Za-z0-9.*\/+\-_#$]{6,}$/i,
  };
  if (dataRegex[userData.id].test(userData.value)) {
    userData.classList.remove("is-invalid");
    userData.classList.add("is-valid");
    userData.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    userData.classList.remove("is-valid");
    userData.classList.add("is-invalid");
    userData.nextElementSibling.classList.remove("d-none");
    return false;
  }
}


function logout() {
  localStorage.removeItem('sessionUsername');
  window.location.href = "index.html"; 
}