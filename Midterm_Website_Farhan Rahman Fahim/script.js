/* =========================================================
   NovaSound - script.js
   Farhan Rahman Fahim - ID: 2310843
   ========================================================= */

const memoryStore = {};

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return memoryStore[key] || null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    memoryStore[key] = value;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateLoginDisplay();
});


// LOGIN BUTTON (used in header on all pages)

function toggleLogin() {
  const isLoggedIn = storageGet("novasound_loggedIn") === "true";

  if (!isLoggedIn) {
    const username = prompt("Enter your name to log in:");
    if (username && username.trim() !== "") {
      storageSet("novasound_loggedIn", "true");
      storageSet("novasound_username", username.trim());
      alert("Welcome, " + username.trim() + "! You are now logged in.");
    }
  } else {
    storageSet("novasound_loggedIn", "false");
    alert("You have been logged out.");
  }

  updateLoginDisplay();
}

function updateLoginDisplay() {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;

  const isLoggedIn = storageGet("novasound_loggedIn") === "true";
  const username = storageGet("novasound_username");

  if (isLoggedIn && username) {
    loginBtn.textContent = "Logout (" + username + ")";
  } else {
    loginBtn.textContent = "Login";
  }
}


// ADD TO CART BUTTON (used on products page)

function addToCart(productName, price) {
  let count = parseInt(storageGet("novasound_cartCount")) || 0;
  count += 1;
  storageSet("novasound_cartCount", count);

  updateCartDisplay();
  alert(productName + " (Tk " + price + ") added to your cart!");
}

function updateCartDisplay() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const count = parseInt(storageGet("novasound_cartCount")) || 0;
  cartCountEl.textContent = "Cart: " + count;
}


// PLACE ORDER BUTTON (used on contact page)

function placeOrder() {
  const count = parseInt(storageGet("novasound_cartCount")) || 0;

  if (count === 0) {
    alert("Your cart is empty. Add some products first!");
    return;
  }

  alert("Thank you! Your order of " + count + " item(s) has been placed. We will contact you shortly.");
  storageSet("novasound_cartCount", 0);
  updateCartDisplay();
}


// CONTACT FORM SUBMISSION (contact page)

function submitContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value;
  const status = document.getElementById("formStatus");

  if (name.trim() === "") {
    status.style.color = "#e74c3c";
    status.textContent = "Please enter your name before submitting.";
    return;
  }

  status.style.color = "#0ea5a4";
  status.textContent = "Thanks, " + name + "! Your message has been sent. We'll reply within 24 hours.";
  document.getElementById("contactForm").reset();
}