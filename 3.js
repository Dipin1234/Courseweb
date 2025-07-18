let svg = document.querySelector("svg");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let mouth = document.querySelector("#mouth");
let smile = document.querySelector("#smile");
let eyeRight = document.querySelector("#eye-right");
let eyeLeft = document.querySelector("#eye-left");
let eyebrowRight = document.querySelector("#eyebrow-right");
let eyebrowLeft = document.querySelector("#eyebrow-left");
let armRight = document.querySelector("#arm-right");
let armLeft = document.querySelector("#arm-left");
let handRight = document.querySelector("#hand-right");
let handLeft = document.querySelector("#hand-left");
let showPassword = document.querySelector("#show-password-container");

// Demo credentials
const DEMO_EMAIL = "user@gmail.com";
const DEMO_PASSWORD = "userpassword";

// Form submission handler
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form from submitting to server
  if (email.value === DEMO_EMAIL && password.value === DEMO_PASSWORD) {
    // Successful login, redirect to result.html
    window.location.href = "1.html";
  } else {
    // Show error message
    alert("Invalid email or password. Use demo@example.com and password123.");
  }
});

// Logic for typing on the email field
function updateMouthEyes(e) {
  let movePos = e.target.value.length > 30 ? 13.33 : e.target.value.length / 2.15;
  eyeRight.setAttribute("cy", 112);
  eyeLeft.setAttribute("cy", 112);
  eyeRight.setAttribute("cx", 142 + movePos);
  eyeLeft.setAttribute("cx", 96 + movePos);
  
  if (e.target.value.length < 4) {
    eyebrowLeft.style.transform = "translate(0, 0)";
    eyebrowRight.style.transform = "translate(0, 0)";
    mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,138  140,143  125,143  110,143 109,138 106,132 Z");
    smile.setAttribute("d", "M125,138 C 140,138 143.5,132 143.5,132 143.5,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,138 125,138 Z");
  } else if (e.target.value.indexOf("@") > 0) {
    eyebrowLeft.style.transform = "translate(0, -2px)";
    eyebrowRight.style.transform = "translate(0, -2px)";
    mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,149  125,149  116,149 109,142 106,132 Z");
    smile.setAttribute("d", "M125,144 C 140,144 143,132 143,132 143,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,144 125,144 Z");
  } else {
    eyebrowLeft.style.transform = "translate(0, -0.5px)";
    eyebrowRight.style.transform = "translate(0, -0.5px)";
    mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,146  125,146  116,146 109,142 106,132 Z");
    smile.setAttribute("d", "M125,141 C 140,141 143,132 143,132 143,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,141 125,141 Z");
  }
}

// Reset eyes and mouth to original position
function resetEyesMouth(e) {
  eyeRight.setAttribute("cy", 107);
  eyeLeft.setAttribute("cy", 107);
  eyeRight.setAttribute("cx", 148);
  eyeLeft.setAttribute("cx", 102);
  eyebrowLeft.style.transform = "translate(0, 0)";
  eyebrowRight.style.transform = "translate(0, 0)";
  if (e.target.value.indexOf("@") < 0) {
    mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,146  125,146  116,146 109,142 106,132 Z");
    smile.setAttribute("d", "M125,141 C 140,141 143,132 143,132 143,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,141 125,141 Z");
  }
}

// Placeholder animation
document.querySelectorAll("fieldset.with-placeholder input").forEach(function(el) {
  el.addEventListener("focus", function() {
    this.parentNode.querySelector(".placeholder").classList.add("active");
  });
  el.addEventListener("blur", function() {
    if (this.value === "") {
      this.parentNode.querySelector(".placeholder").classList.remove("active");
    }
  });
});

// Email animations
email.addEventListener("focus", updateMouthEyes);
email.addEventListener("keyup", updateMouthEyes);
email.addEventListener("blur", resetEyesMouth);

// Password animation: move arms to cover eyes
password.addEventListener("focus", function(e) {
  svg.classList.add("arms-up");
  if (svg.classList.contains("looking")) {
    updateMouthEyes(e);
    armLeft.setAttribute("d", "M 118,178 C 64,206 49,145 86,106");
    armRight.setAttribute("d", "M 132,178 C 186,206 201,145 164,106");
    handLeft.setAttribute("d", "M 81,103 C 76,96 90,76 93,79 95,80 96,81 91,88 102,76 106,71 109,73 112,76 102,87 99,90 102,87 112,74 116,77 119,80 105,94 103,96 107,91 114,84 116,86 119,89 100,120 89,111");
    handRight.setAttribute("d", "M 169,103 C 174,96 160,76 157,79 155,80 154,81 159,88 148,76 144,71 141,73 138,76 148,87 151,90 148,87 138,74 134,77 131,80 145,94 147,96 143,91 136,84 134,86 131,89 150,120 161,111");
  } else {
    armLeft.setAttribute("d", "M 118,178 C 64,206 49,145 86,115");
    armRight.setAttribute("d", "M 132,178 C 186,206 201,145 164,115");
    handLeft.setAttribute("d", "M 81,110 C 76,103 90,83 93,86 95,87 96,88 91,95 102,83 106,78 109,80 112,83 102,94 99,97 102,94 112,81 116,84 119,87 105,101 103,103 107,98 114,91 116,93 119,96 100,127 89,118");
    handRight.setAttribute("d", "M 169,110 C 174,103 160,83 157,86 155,87 154,88 159,95 148,83 144,78 141,80 138,83 148,94 151,97 148,94 138,81 134,84 131,87 145,101 147,103 143,98 136,91 134,93 131,96 150,127 161,118");
  }
});
password.addEventListener("input", function(e) {
  if (showPassword.classList.contains("active")) {
    updateMouthEyes(e);
  }
});
password.addEventListener("blur", function(e) {
  svg.classList.remove("arms-up");
  resetEyesMouth(e);
  armLeft.setAttribute("d", "M 118,178 C 94,179 66,220 65,254");
  armRight.setAttribute("d", "M 132,178 C 156,179 184,220 185,254");
  handLeft.setAttribute("d", "M 51,270 C 46,263 60,243 63,246 65,247 66,248 61,255 72,243 76,238 79,240 82,243 72,254 69,257 72,254 82,241 86,244 89,247 75,261 73,263 77,258 84,251 86,253 89,256 70,287 59,278");
  handRight.setAttribute("d", "M 199,270 C 204,263 190,243 187,246 185,247 184,248 189,255 178,243 174,238 171,240 168,243 178,254 181,257 178,254 168,241 164,244 161,247 175,261 177,263 173,258 166,251 164,253 161,256 180,287 191,278");
});

// Show/hide password
showPassword.addEventListener("click", function() {
  this.classList.toggle("active");
  svg.classList.toggle("looking");
  password.type = this.classList.contains("active") ? "text" : "password";
});