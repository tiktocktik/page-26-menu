// Page 26 — Boutique Patisserie Script

const PHONE_NUMBER = "918780547928";
let cart = []; // Array of { name, size, unitPrice, qty, minQty }
let pinnedLocationUrl = "";
let currentFilter = "all";
// Track selected option index per item: { [itemId]: optionIndex }
const selectedOptions = {};

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupDatePicker();
  renderProducts();
  setupCategoryNav();
  setupGeolocation();
  setupCheckoutModal();
  updateDockUI();
});

// Segmented Theme Switch (Light / Dark)
function setupTheme() {
  const btnLight = document.getElementById("btn-theme-light");
  const btnDark = document.getElementById("btn-theme-dark");

  const savedTheme = localStorage.getItem("page26-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  if (btnLight) {
    btnLight.addEventListener("click", () => {
      applyTheme("light");
      localStorage.setItem("page26-theme", "light");
      showToast("☀️ Switched to Light mode");
    });
  }

  if (btnDark) {
    btnDark.addEventListener("click", () => {
      applyTheme("dark");
      localStorage.setItem("page26-theme", "dark");
      showToast("🌙 Switched to Dark mode");
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (btnDark) {
        btnDark.classList.add("active");
        btnDark.setAttribute("aria-pressed", "true");
      }
      if (btnLight) {
        btnLight.classList.remove("active");
        btnLight.setAttribute("aria-pressed", "false");
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (btnLight) {
        btnLight.classList.add("active");
        btnLight.setAttribute("aria-pressed", "true");
      }
      if (btnDark) {
        btnDark.classList.remove("active");
        btnDark.setAttribute("aria-pressed", "false");
      }
    }
  }
}

// 7 Days Minimum Pre-order Date Enforced
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

// Sticky Category Nav
function setupCategoryNav() {
  const chips = document.querySelectorAll(".nav-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.getAttribute("data-category");
      renderProducts();

      // Smooth scroll to target section if not 'all'
      if (currentFilter !== "all") {
        const sec = document.getElementById(`sec-${currentFilter}`);
        if (sec) {
          const navOffset = 130;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elemRect = sec.getBoundingClientRect().top;
          const elemPosition = elemRect - bodyRect;
          const offsetPosition = elemPosition - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    });
  });
}

// Render Products as Modern Responsive Cards
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
    if (cat.id === "cheesecakes") subNote = "Signature baked cheesecakes • 100% Eggless";
    if (cat.id === "cakes") subNote = "Couverture chocolate • Bento (~250–350g) to 2 kg";
    if (cat.id === "brownies") subNote = "Couverture chocolate • Min order 4 pcs • Custom toppings on request";
    if (cat.id === "muffins") subNote = "Bakery-style muffins • Min order 4 pcs";
    if (cat.id === "cupcakes") subNote = "Couverture chocolate • Min order 4 pcs";

    section.innerHTML = `
      <div class="category-header-row">
        <div class="category-name-wrap">
          <h2 class="category-title">${cat.label}</h2>
          <span class="veg-icon" title="100% Eggless"></span>
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

// Create Card Component (Liliyum Style)
function createProductCard(item) {
  const card = document.createElement("div");
  card.className = "patisserie-card";

  if (selectedOptions[item.id] === undefined) {
    selectedOptions[item.id] = 0; // Default to first weight/box
  }

  let selectedIdx = selectedOptions[item.id];
  let curOption = item.options[selectedIdx];
  let qty = curOption.minQty || 1;

  card.innerHTML = `
    <div class="card-top">
      <div class="card-badge-row">
        ${item.isSignature ? '<span class="badge-tag badge-signature">👑 SIGNATURE</span>' : '<span></span>'}
        <span class="veg-icon" title="100% Eggless"></span>
      </div>
      <h3 class="card-item-title">${item.name}</h3>
      ${item.description ? `<p class="card-item-desc">${item.description}</p>` : ""}
      ${item.note ? `<span class="card-item-note">✨ ${item.note}</span>` : ""}
    </div>

    <div class="card-middle">
      <div class="size-selector-label">Choose Weight / Box Size</div>
      <div class="size-pill-grid">
        ${item.options.map((opt, i) => `
          <div class="size-pill ${i === selectedIdx ? "selected" : ""}" data-idx="${i}">
            <span class="pill-weight">${opt.size}</span>
            <span class="pill-price">₹${opt.price.toLocaleString("en-IN")}</span>
          </div>
        `).join("")}
      </div>

      <div class="card-bottom-action">
        <div class="live-price-box">
          <span class="price-currency">Price</span>
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

  // Pill Selection
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

// Cart Manager
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

// Checkout Drawer Modal
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

// GPS Pinpoint Geolocation
function setupGeolocation() {
  const pinBtn = document.getElementById("btn-pin-location");
  const pinStatus = document.getElementById("pin-status-pill");
  const pinText = document.getElementById("pin-text");
  const addressInput = document.getElementById("cust-address");

  if (!pinBtn) return;

  pinBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    pinText.textContent = "Detecting GPS location...";
    pinBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        pinnedLocationUrl = `https://maps.google.com/?q=${lat},${lng}`;

        pinText.textContent = "📍 Pin Attached";
        pinBtn.disabled = false;
        if (pinStatus) {
          pinStatus.style.display = "block";
          pinStatus.innerHTML = `✓ Location pinned: <a href="${pinnedLocationUrl}" target="_blank" style="color:inherit;text-decoration:underline;margin-left:4px;">Test link</a>`;
        }

        if (addressInput && !addressInput.value) {
          addressInput.value = `GPS Pin: ${lat}, ${lng}`;
        }

        showToast("📍 Google Maps location pin attached!");
      },
      (err) => {
        pinText.textContent = "Pinpoint Current Location (Google Maps)";
        pinBtn.disabled = false;
        let msg = "Could not fetch location.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Location permission denied. You can enter your address or Google Maps link manually.";
        }
        alert(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}

// WhatsApp Order Composer
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
    msg += `   • Size: ${item.size}\n`;
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
