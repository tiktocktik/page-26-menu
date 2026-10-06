// Page 26 - Menu & Ordering Script

const PHONE_NUMBER = "918780547928";
let cart = []; // Array of { name, size, unitPrice, qty, minQty }

let pinnedLocationUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupDeliveryDatePicker();
  setupGeolocation();
  setupModalEvents();
  updateDockUI();
});

// Calculate +7 days notice for the date picker
function setupDeliveryDatePicker() {
  const dateInput = document.getElementById("cust-date");
  if (!dateInput) return;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
  const dd = String(targetDate.getDate()).padStart(2, "0");
  const minDateStr = `${yyyy}-${mm}-${dd}`;
  dateInput.min = minDateStr;
  dateInput.value = minDateStr;
}

// Add Item directly by tapping price
function addToOrder(name, size, unitPrice, minQty = 1) {
  const existingIndex = cart.findIndex(
    (item) => item.name === name && item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += minQty > 1 ? minQty : 1;
  } else {
    cart.push({
      name,
      size,
      unitPrice,
      qty: minQty,
      minQty: minQty
    });
  }

  showToast(`Added ${name} (${size})`);
  updateDockUI();
}

function updateCartQty(index, delta) {
  if (!cart[index]) return;
  const item = cart[index];
  const step = item.minQty > 1 ? item.minQty : 1;
  const newQty = item.qty + (delta * step);

  if (newQty < (item.minQty || 1)) {
    cart.splice(index, 1);
  } else {
    item.qty = newQty;
  }

  updateDockUI();
  renderModalCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateDockUI();
  renderModalCart();
}

function getCartTotals() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.qty * i.unitPrice), 0);
  return { totalCount, totalPrice };
}

function updateDockUI() {
  const dock = document.getElementById("order-dock");
  const countEl = document.getElementById("dock-count");
  const totalEl = document.getElementById("dock-total");
  const { totalCount, totalPrice } = getCartTotals();

  if (!dock) return;

  if (cart.length > 0) {
    dock.classList.add("visible");
    countEl.textContent = totalCount;
    totalEl.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;
  } else {
    dock.classList.remove("visible");
  }
}

function renderModalCart() {
  const container = document.getElementById("modal-items-container");
  const totalEl = document.getElementById("modal-total-val");
  const emptyView = document.getElementById("cart-empty-view");
  const activeView = document.getElementById("cart-active-view");

  if (!container) return;
  container.innerHTML = "";

  const { totalPrice } = getCartTotals();
  totalEl.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    emptyView.style.display = "block";
    activeView.style.display = "none";
    return;
  }

  emptyView.style.display = "none";
  activeView.style.display = "block";

  cart.forEach((item, idx) => {
    const itemTotal = item.qty * item.unitPrice;
    const row = document.createElement("div");
    row.className = "selected-item-row";
    row.innerHTML = `
      <div class="item-left-desc">
        ${item.name}
        <span class="item-sub-size">${item.size} • ₹${item.unitPrice} each</span>
      </div>
      <div class="item-ctrls">
        <button type="button" class="qty-pill-btn" onclick="updateCartQty(${idx}, -1)">−</button>
        <span class="qty-display">${item.qty}</span>
        <button type="button" class="qty-pill-btn" onclick="updateCartQty(${idx}, 1)">+</button>
      </div>
      <div class="item-price-val">₹${itemTotal.toLocaleString("en-IN")}</div>
      <button type="button" style="background:none;border:none;color:#999;cursor:pointer;padding:0 4px;" onclick="removeCartItem(${idx})">✕</button>
    `;
    container.appendChild(row);
  });
}

function setupModalEvents() {
  const modal = document.getElementById("checkout-modal");
  const openBtn1 = document.getElementById("dock-btn-open");
  const openBtn2 = document.getElementById("dock-checkout-btn");
  const closeBtn = document.getElementById("modal-close");
  const submitBtn = document.getElementById("btn-submit-order");

  function openModal() {
    renderModalCart();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (openBtn1) openBtn1.addEventListener("click", openModal);
  if (openBtn2) openBtn2.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", sendWhatsAppOrder);
  }

  // Lightbox
  const lightbox = document.getElementById("card-lightbox");
  const openCardBtn = document.getElementById("btn-view-card");
  const closeCardBtn = document.getElementById("lightbox-close");

  if (openCardBtn && lightbox) {
    openCardBtn.addEventListener("click", () => {
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
  if (closeCardBtn && lightbox) {
    closeCardBtn.addEventListener("click", () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
}

function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Please select at least one item from the menu.");
    return;
  }

  const nameInput = document.getElementById("cust-name");
  const dateInput = document.getElementById("cust-date");
  const addrInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  const name = nameInput ? nameInput.value.trim() : "";
  const date = dateInput ? dateInput.value : "";
  const address = addrInput ? addrInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  if (!name) {
    alert("Please enter your name.");
    if (nameInput) nameInput.focus();
    return;
  }

  const { totalPrice } = getCartTotals();

  // Format delivery date
  let dateFormatted = date;
  if (date) {
    try {
      const d = new Date(date + "T00:00:00");
      dateFormatted = d.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (e) {
      dateFormatted = date;
    }
  }

  // Compose clean WhatsApp text
  let msg = `🍰 *PRE-ORDER REQUEST — PAGE 26*\n`;
  msg += `-----------------------------------------\n`;
  msg += `👤 *Customer:* ${name}\n`;
  if (dateFormatted) msg += `📅 *Date Needed:* ${dateFormatted}\n`;
  if (address) msg += `📍 *Area/Address:* ${address}\n`;
  if (pinnedLocationUrl) msg += `🗺️ *Google Maps Pin:* ${pinnedLocationUrl}\n`;
  if (notes) msg += `📝 *Notes/Customization:* ${notes}\n`;
  msg += `-----------------------------------------\n`;
  msg += `🛒 *SELECTED ITEMS:*\n\n`;

  cart.forEach((item, i) => {
    const subtotal = item.qty * item.unitPrice;
    msg += `${i + 1}. *${item.name}*\n`;
    msg += `   • Size: ${item.size}\n`;
    msg += `   • Qty: ${item.qty} × ₹${item.unitPrice} = ₹${subtotal.toLocaleString("en-IN")}\n\n`;
  });

  msg += `-----------------------------------------\n`;
  msg += `💰 *TOTAL ESTIMATE: ₹${totalPrice.toLocaleString("en-IN")}*\n`;
  msg += `-----------------------------------------\n`;
  msg += `⏳ *Pre-orders only (1 week's notice) • Exclusively Eggless*\n`;
  msg += `📍 Bangalore`;

  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

function showToast(text) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

// Dark/Light Theme Manager
function setupTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");

  const savedTheme = localStorage.getItem("page26-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("page26-theme", newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeLabel) themeLabel.textContent = "Light";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeLabel) themeLabel.textContent = "Dark";
    }
  }
}

// Geolocation Pinpoint Manager
function setupGeolocation() {
  const geoBtn = document.getElementById("btn-get-location");
  const geoStatus = document.getElementById("geo-status");
  const geoText = document.getElementById("geo-text");
  const addressInput = document.getElementById("cust-address");

  if (!geoBtn) return;

  geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    geoText.textContent = "Locating via GPS...";
    geoBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        pinnedLocationUrl = `https://maps.google.com/?q=${lat},${lng}`;

        geoText.textContent = "📍 Pin Attached";
        geoBtn.disabled = false;
        if (geoStatus) {
          geoStatus.style.display = "flex";
          geoStatus.innerHTML = `✓ Pin attached: <a href="${pinnedLocationUrl}" target="_blank" style="color:inherit;text-decoration:underline;margin-left:4px;">Test link</a>`;
        }

        if (addressInput && !addressInput.value) {
          addressInput.value = `GPS Pin: ${lat}, ${lng}`;
        }

        showToast("📍 Google Maps location pin attached!");
      },
      (error) => {
        geoText.textContent = "Pinpoint Current Location (Google Maps)";
        geoBtn.disabled = false;
        let errMsg = "Unable to retrieve location.";
        if (error.code === error.PERMISSION_DENIED) {
          errMsg = "Location access was denied. You can manually enter your address or paste a Google Maps link.";
        }
        alert(errMsg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}
