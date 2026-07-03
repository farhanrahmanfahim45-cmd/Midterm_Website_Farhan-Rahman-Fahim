/* =========================================================
   NovaSound - script.js
   Farhan Rahman Fahim - ID: 2310843
   ========================================================= */

const memoryStore = {};


function getCookie(name) {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;max-age=" + (60 * 60 * 24 * 7);
}

function storageGet(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch (e) {
    // localStorage unavailable, fall through to cookie/memory
  }

  const cookieValue = getCookie(key);
  if (cookieValue !== null) return cookieValue;

  return memoryStore[key] !== undefined ? memoryStore[key] : null;
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // ignore, we still persist via cookie/memory below
  }


  setCookie(key, value);
  memoryStore[key] = value;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateLoginDisplay();
});


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
