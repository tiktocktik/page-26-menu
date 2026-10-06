// Page 26 — Boutique Patisserie Script

const PHONE_NUMBER = "918780547928";
let cart = []; // Array of { name, size, unitPrice, qty, minQty }
let pinnedLocationUrl = "";
let currentFilter = "all";
const selectedOptions = {};

// Leaflet Map state
let leafletMap = null;
let leafletMarker = null;

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupDatePicker();
  renderProducts();
  setupCategoryNav();
  setupMapIntegration();
  setupCheckoutModal();
  updateDockUI();
});

// 1. Simplified Single Theme Toggle (🌙 / ☀️) — Accessible anywhere while scrolling
function setupThemeToggle() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const icons = document.querySelectorAll(".theme-icon");

  const savedTheme = localStorage.getItem("page26-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("page26-theme", newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      icons.forEach(icon => { icon.textContent = "☀️"; });
      toggleBtns.forEach(btn => {
        btn.setAttribute("aria-label", "Switch to light theme");
        btn.setAttribute("title", "Switch to light theme");
      });
    } else {
      document.documentElement.removeAttribute("data-theme");
      icons.forEach(icon => { icon.textContent = "🌙"; });
      toggleBtns.forEach(btn => {
        btn.setAttribute("aria-label", "Switch to dark theme");
        btn.setAttribute("title", "Switch to dark theme");
      });
    }
  }
}

// 2. 7 Days Minimum Pre-order Date Enforced
function setupDatePicker() {
  const dateInput = document.getElementById("cust-date");
  if (!dateInput) return;
  const target = new Date();
  target.setDate(target.getDate() + 7);
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;
  dateInput.min = minDate;
  dateInput.value = minDate;
}

// 3. Category Filter Chips Navigation
function setupCategoryNav() {
  const chips = document.querySelectorAll(".nav-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.getAttribute("data-category");
      renderProducts();

      if (currentFilter !== "all") {
        const sec = document.getElementById(`sec-${currentFilter}`);
        if (sec) {
          const navOffset = 110;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elemRect = sec.getBoundingClientRect().top;
          const offsetPosition = elemRect - bodyRect - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    });
  });
}

// 4. Render Category Sections & Product Cards
function renderProducts() {
  const container = document.getElementById("menu-sections");
  if (!container || !window.PAGE26_ITEMS) return;
  container.innerHTML = "";

  const categories = window.PAGE26_CATEGORIES.filter((c) => c.id !== "all");

  categories.forEach((cat) => {
    if (currentFilter !== "all" && currentFilter !== cat.id) return;

    const items = window.PAGE26_ITEMS.filter((i) => i.category === cat.id);
    if (items.length === 0) return;

    const section = document.createElement("section");
    section.className = "menu-category-section";
    section.id = `sec-${cat.id}`;

    let subNote = "";
    if (cat.id === "cheesecakes") subNote = "Exclusively Eggless • Artisanal baked crust";
    if (cat.id === "cakes") subNote = "Couverture chocolate • Bento (~250–350g) to 2 kg";
    if (cat.id === "brownies") subNote = "Couverture chocolate • Min order 4 pcs • Custom toppings on request";
    if (cat.id === "muffins") subNote = "Large bakery-style • Couverture chocolate • Min order 4 pcs";
    if (cat.id === "cupcakes") subNote = "Couverture chocolate • Min order 4 pcs";

    // Section header: Cheesecakes section has the SIGNATURE badge
    section.innerHTML = `
      <div class="category-header-row">
        <div class="category-name-wrap">
          <h2 class="category-title">${cat.label}</h2>
          ${cat.isSignatureSection ? '<span class="category-sig-badge">👑 SIGNATURE</span>' : ''}
          <span class="veg-icon" title="100% Eggless Vegetarian"></span>
        </div>
        <span class="category-subnote">${subNote}</span>
      </div>
      <div class="product-grid" id="grid-${cat.id}"></div>
    `;

    container.appendChild(section);

    const grid = section.querySelector(`#grid-${cat.id}`);
    items.forEach((item) => {
      grid.appendChild(createProductCard(item));
    });
  });
}

// 5. Create Individual Product Card (No redundant crown on each cheesecake)
function createProductCard(item) {
  const card = document.createElement("div");
  card.className = "patisserie-card";

  if (selectedOptions[item.id] === undefined) {
    selectedOptions[item.id] = 0; // Default to first option
  }

  let selectedIdx = selectedOptions[item.id];
  let curOption = item.options[selectedIdx];
  let qty = curOption.minQty || 1;

  card.innerHTML = `
    <div class="card-top">
      <div class="card-title-row">
        <h3 class="card-item-title">${item.name}</h3>
        <span class="veg-icon" title="100% Eggless"></span>
      </div>
      ${item.description ? `<p class="card-item-desc">${item.description}</p>` : ""}
      ${item.note ? `<span class="card-item-note">✨ ${item.note}</span>` : ""}
    </div>

    <div class="card-middle">
      <div class="size-selector-label">Select Weight / Box Size</div>
      <div class="size-pill-row">
        ${item.options.map((opt, i) => `
          <div class="size-pill ${i === selectedIdx ? "selected" : ""}" data-idx="${i}">
            <span class="pill-weight">${opt.size}</span>
            <span class="pill-price">₹${opt.price.toLocaleString("en-IN")}</span>
          </div>
        `).join("")}
      </div>

      <div class="card-bottom-action">
        <div class="live-price-box">
          <span class="price-currency">Total</span>
          <span class="price-number">₹${(curOption.price * qty).toLocaleString("en-IN")}</span>
        </div>

        <div class="card-ctrls">
          <div class="stepper">
            <button type="button" class="stepper-btn btn-dec" aria-label="Decrease quantity">−</button>
            <span class="stepper-val">${qty}</span>
            <button type="button" class="stepper-btn btn-inc" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn-card-add">
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Pill click handlers
  const pills = card.querySelectorAll(".size-pill");
  const priceEl = card.querySelector(".price-number");
  const stepperVal = card.querySelector(".stepper-val");

  function getMinAllowed() {
    const opt = item.options[selectedOptions[item.id] || 0];
    return opt.minQty || 1;
  }

  function updatePriceDisplay() {
    const opt = item.options[selectedOptions[item.id] || 0];
    priceEl.textContent = `₹${(opt.price * qty).toLocaleString("en-IN")}`;
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const idx = parseInt(pill.getAttribute("data-idx"), 10);
      selectedOptions[item.id] = idx;
      pills.forEach((p) => p.classList.remove("selected"));
      pill.classList.add("selected");

      const minAllowed = getMinAllowed();
      if (qty < minAllowed) {
        qty = minAllowed;
        stepperVal.textContent = qty;
      }
      updatePriceDisplay();
    });
  });

  // Quantity Steppers
  card.querySelector(".btn-dec").addEventListener("click", () => {
    const minAllowed = getMinAllowed();
    if (qty > minAllowed) {
      qty -= 1;
      stepperVal.textContent = qty;
      updatePriceDisplay();
    }
  });

  card.querySelector(".btn-inc").addEventListener("click", () => {
    qty += 1;
    stepperVal.textContent = qty;
    updatePriceDisplay();
  });

  // Add to Order
  card.querySelector(".btn-card-add").addEventListener("click", () => {
    const opt = item.options[selectedOptions[item.id] || 0];
    addToCart(item, opt, qty);
    showToast(`Added ${qty}x ${item.name} (${opt.size})`);
  });

  return card;
}

// 6. Cart Management
function addToCart(item, option, qty) {
  const existing = cart.find(
    (c) => c.name === item.name && c.size === option.size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: item.name,
      size: option.size,
      unitPrice: option.price,
      qty: qty,
      minQty: option.minQty || 1
    });
  }

  updateDockUI();
}

function updateCartQty(index, delta) {
  if (!cart[index]) return;
  const item = cart[index];
  const newQty = item.qty + delta;

  if (item.minQty && newQty < item.minQty) {
    cart.splice(index, 1);
  } else if (newQty <= 0) {
    cart.splice(index, 1);
  } else {
    item.qty = newQty;
  }

  updateDockUI();
  renderDrawerCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateDockUI();
  renderDrawerCart();
}

function getTotals() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + (i.qty * i.unitPrice), 0);
  return { count, total };
}

function updateDockUI() {
  const dock = document.getElementById("order-dock");
  const qtyEl = document.getElementById("dock-qty");
  const priceEl = document.getElementById("dock-price");
  const { count, total } = getTotals();

  if (!dock) return;

  if (cart.length > 0) {
    dock.classList.add("visible");
    qtyEl.textContent = count;
    priceEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  } else {
    dock.classList.remove("visible");
  }
}

// 7. Interactive Map Integration (Auto-detect GPS + Interactive Leaflet Pin)
function setupMapIntegration() {
  const btnGps = document.getElementById("btn-gps-auto");
  const btnToggleMap = document.getElementById("btn-toggle-map");
  const mapWrapper = document.getElementById("map-wrapper");
  const pinStatus = document.getElementById("pin-status-pill");
  const addressInput = document.getElementById("cust-address");

  // Toggle Map Picker
  if (btnToggleMap && mapWrapper) {
    btnToggleMap.addEventListener("click", () => {
      const isHidden = mapWrapper.style.display === "none";
      mapWrapper.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        initLeafletMap();
      }
    });
  }

  // Auto-Detect GPS
  if (btnGps) {
    btnGps.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      btnGps.disabled = true;
      btnGps.innerHTML = `<span>⏳ Detecting GPS...</span>`;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          btnGps.disabled = false;
          btnGps.innerHTML = `<span>📍 Auto-Detect GPS</span>`;

          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLocationCoords(lat, lng, "Auto-Detected GPS Location");

          if (mapWrapper && mapWrapper.style.display !== "none") {
            if (leafletMap && leafletMarker) {
              leafletMap.setView([lat, lng], 15);
              leafletMarker.setLatLng([lat, lng]);
            }
          }

          showToast("📍 Exact GPS location attached!");
        },
        (err) => {
          btnGps.disabled = false;
          btnGps.innerHTML = `<span>📍 Auto-Detect GPS</span>`;
          let msg = "Could not fetch GPS location.";
          if (err.code === err.PERMISSION_DENIED) {
            msg = "Location permission was denied. You can tap 'Pick on Map' or type your address.";
          }
          alert(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }
}

function initLeafletMap() {
  if (leafletMap) {
    setTimeout(() => leafletMap.invalidateSize(), 200);
    return;
  }

  const defaultLat = 12.9716;
  const defaultLng = 77.5946;

  try {
    leafletMap = L.map("leaflet-map").setView([defaultLat, defaultLng], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(leafletMap);

    leafletMarker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(leafletMap);
    leafletMarker.bindPopup("Drag me to your exact delivery location!").openPopup();

    // On marker drag end
    leafletMarker.on("dragend", (e) => {
      const pos = e.target.getLatLng();
      setLocationCoords(pos.lat, pos.lng, "Pinned Location");
    });

    // On map click
    leafletMap.on("click", (e) => {
      const pos = e.latlng;
      leafletMarker.setLatLng(pos);
      setLocationCoords(pos.lat, pos.lng, "Pinned Location");
    });

    setTimeout(() => leafletMap.invalidateSize(), 300);
  } catch (e) {
    console.error("Leaflet initialization error:", e);
  }
}

// Global quick jump to Bangalore localities
window.jumpToLocation = function (lat, lng, name) {
  if (!leafletMap || !leafletMarker) return;
  leafletMap.setView([lat, lng], 15);
  leafletMarker.setLatLng([lat, lng]);
  setLocationCoords(lat, lng, name);
  const addr = document.getElementById("cust-address");
  if (addr && !addr.value.includes(name)) {
    addr.value = addr.value ? `${addr.value}, ${name}` : name;
  }
};

function setLocationCoords(lat, lng, label) {
  const latFixed = lat.toFixed(6);
  const lngFixed = lng.toFixed(6);
  pinnedLocationUrl = `https://www.google.com/maps?q=${latFixed},${lngFixed}`;

  const pinStatus = document.getElementById("pin-status-pill");
  if (pinStatus) {
    pinStatus.style.display = "block";
    pinStatus.innerHTML = `✓ ${label}: <strong>${latFixed}, ${lngFixed}</strong> • <a href="${pinnedLocationUrl}" target="_blank" style="color:inherit;text-decoration:underline;">Test on Google Maps</a>`;
  }
}

// 8. Checkout Modal Drawer
function setupCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const open1 = document.getElementById("dock-open-cart");
  const open2 = document.getElementById("dock-btn-checkout");
  const close = document.getElementById("sheet-close");
  const submitBtn = document.getElementById("btn-submit-whatsapp");

  function openDrawer() {
    renderDrawerCart();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (open1) open1.addEventListener("click", openDrawer);
  if (open2) open2.addEventListener("click", openDrawer);
  if (close) close.addEventListener("click", closeDrawer);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDrawer();
    });
  }

  if (submitBtn) submitBtn.addEventListener("click", sendWhatsAppOrder);

  // Original Card Lightbox
  const cardModal = document.getElementById("card-modal");
  const cardBtn = document.getElementById("btn-view-card");
  const cardClose = document.getElementById("card-modal-close");

  if (cardBtn && cardModal) {
    cardBtn.addEventListener("click", () => {
      cardModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
  if (cardClose && cardModal) {
    cardClose.addEventListener("click", () => {
      cardModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
  if (cardModal) {
    cardModal.addEventListener("click", (e) => {
      if (e.target === cardModal) {
        cardModal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
}

function renderDrawerCart() {
  const list = document.getElementById("cart-items-list");
  const totalEl = document.getElementById("cart-total-val");
  const emptyMsg = document.getElementById("cart-empty-message");
  const content = document.getElementById("cart-content-wrapper");

  if (!list) return;
  list.innerHTML = "";

  const { total } = getTotals();
  totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    content.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  content.style.display = "block";

  cart.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div class="cart-item-main">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-size">${item.size} • ₹${item.unitPrice} each</div>
      </div>
      <div class="stepper" style="transform: scale(0.9);">
        <button type="button" class="stepper-btn" onclick="updateCartQty(${i}, -1)">−</button>
        <span class="stepper-val">${item.qty}</span>
        <button type="button" class="stepper-btn" onclick="updateCartQty(${i}, 1)">+</button>
      </div>
      <div class="cart-item-price">₹${(item.qty * item.unitPrice).toLocaleString("en-IN")}</div>
      <button type="button" style="background:none;border:none;color:#999;cursor:pointer;padding:2px 6px;" onclick="removeCartItem(${i})">✕</button>
    `;
    list.appendChild(row);
  });
}

// 9. Send Formatted Order to WhatsApp
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

  const { total } = getTotals();

  // Format delivery date nicely
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

  // Compose formatted WhatsApp text
  let msg = `🍰 *PRE-ORDER REQUEST — PAGE 26*\n`;
  msg += `-----------------------------------------\n`;
  msg += `👤 *Customer Name:* ${name}\n`;
  if (dateFormatted) msg += `📅 *Date Needed:* ${dateFormatted}\n`;
  if (address) msg += `📍 *Delivery Area/Address:* ${address}\n`;
  if (pinnedLocationUrl) msg += `🗺️ *Google Maps Pin:* ${pinnedLocationUrl}\n`;
  if (notes) msg += `📝 *Notes/Customization:* ${notes}\n`;
  msg += `-----------------------------------------\n`;
  msg += `🛒 *SELECTED ITEMS:*\n\n`;

  cart.forEach((item, i) => {
    const subtotal = item.qty * item.unitPrice;
    msg += `${i + 1}. *${item.name}*\n`;
    msg += `   • Size/Weight: ${item.size}\n`;
    msg += `   • Qty: ${item.qty} × ₹${item.unitPrice} = ₹${subtotal.toLocaleString("en-IN")}\n\n`;
  });

  msg += `-----------------------------------------\n`;
  msg += `💰 *TOTAL ESTIMATE: ₹${total.toLocaleString("en-IN")}*\n`;
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
