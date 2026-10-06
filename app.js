// Page 26 — Boutique Patisserie Script

const PHONE_NUMBER = "918780547928";
let cart = []; // Array of { name, size, unitPrice, qty, minQty }
let pinnedLocationUrl = "";
let currentFilter = "all";
const selectedOptions = {};

// Order & Fulfillment state
let currentDeliveryMode = "home"; // "home" or "pickup"

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  setupThemeToggle();
  setupDatePicker();
  renderProducts();
  setupCategoryNav();
  setupDeliveryMethod();
  setupGoogleMapsIntegration();
  setupCheckoutModal();
  restoreFormDraft();
  setupFormAutoSave();
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
  if (!dateInput.value || dateInput.value < minDate) {
    dateInput.value = minDate;
  }
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

// 6. Cart Management & Session Persistence (LocalStorage)
const CART_STORAGE_KEY = "page26_cart";
const DRAFT_STORAGE_KEY = "page26_checkout_draft";

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        cart = parsed.filter((item) =>
          item &&
          typeof item.name === "string" &&
          typeof item.size === "string" &&
          typeof item.unitPrice === "number" &&
          typeof item.qty === "number" &&
          item.qty > 0
        );
      }
    }
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    cart = [];
  }
}

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

  saveCartToStorage();
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

  saveCartToStorage();
  updateDockUI();
  renderDrawerCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateDockUI();
  renderDrawerCart();
}

function clearAllCart() {
  cart = [];
  saveCartToStorage();
  updateDockUI();
  renderDrawerCart();
}

// Expose cart functions globally for inline onclick handlers
window.updateCartQty = updateCartQty;
window.removeCartItem = removeCartItem;
window.clearAllCart = clearAllCart;

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

// Form Draft Auto-Save & Restore
function saveFormDraft() {
  try {
    const nameInput = document.getElementById("cust-name");
    const dateInput = document.getElementById("cust-date");
    const addrInput = document.getElementById("cust-address");
    const notesInput = document.getElementById("cust-notes");

    const draft = {
      name: nameInput ? nameInput.value : "",
      date: dateInput ? dateInput.value : "",
      mode: currentDeliveryMode,
      address: addrInput ? addrInput.value : "",
      pinnedLocationUrl: pinnedLocationUrl,
      notes: notesInput ? notesInput.value : ""
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn("Could not save form draft", e);
  }
}

function restoreFormDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (!draft) return;

    const nameInput = document.getElementById("cust-name");
    const dateInput = document.getElementById("cust-date");
    const addrInput = document.getElementById("cust-address");
    const notesInput = document.getElementById("cust-notes");

    if (nameInput && draft.name) nameInput.value = draft.name;
    if (notesInput && draft.notes) notesInput.value = draft.notes;
    if (addrInput && draft.address) addrInput.value = draft.address;

    if (dateInput && draft.date && dateInput.min && draft.date >= dateInput.min) {
      dateInput.value = draft.date;
    }

    if (draft.mode === "pickup") {
      const pickupRadio = document.querySelector('input[name="delivery-mode"][value="pickup"]');
      if (pickupRadio) {
        pickupRadio.checked = true;
        pickupRadio.dispatchEvent(new Event("change"));
      }
    }

    if (draft.pinnedLocationUrl) {
      pinnedLocationUrl = draft.pinnedLocationUrl;
      const gmapsIframe = document.getElementById("gmaps-iframe");
      const mapPreviewBox = document.getElementById("gmaps-preview-box");
      const pinStatus = document.getElementById("pin-status-pill");

      if (pinStatus) {
        pinStatus.style.display = "flex";
        pinStatus.innerHTML = `
          <span>✓ Saved Location • <a href="${pinnedLocationUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">Verify in Maps</a></span>
          <button type="button" class="btn-clear-pin" id="btn-clear-pin" title="Clear location">✕ Clear</button>
        `;
        const clearBtn = document.getElementById("btn-clear-pin");
        if (clearBtn) {
          clearBtn.addEventListener("click", () => {
            if (addrInput) addrInput.value = "";
            pinnedLocationUrl = "";
            pinStatus.style.display = "none";
            if (mapPreviewBox) mapPreviewBox.style.display = "none";
            saveFormDraft();
          });
        }
      }

      if (gmapsIframe && mapPreviewBox) {
        if (pinnedLocationUrl.includes("q=")) {
          const qVal = pinnedLocationUrl.split("q=")[1];
          gmapsIframe.src = `https://maps.google.com/maps?q=${qVal}&z=15&output=embed`;
          mapPreviewBox.style.display = "block";
        }
      }
    }
  } catch (e) {
    console.warn("Could not restore form draft", e);
  }
}

function setupFormAutoSave() {
  const nameInput = document.getElementById("cust-name");
  const dateInput = document.getElementById("cust-date");
  const addrInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  [nameInput, dateInput, addrInput, notesInput].forEach((el) => {
    if (el) {
      el.addEventListener("input", saveFormDraft);
      el.addEventListener("change", saveFormDraft);
    }
  });
}

// 7. Delivery Method Selection (Home Delivery vs Kitchen Pickup)
function setupDeliveryMethod() {
  const homeRadio = document.querySelector('input[name="delivery-mode"][value="home"]');
  const pickupRadio = document.querySelector('input[name="delivery-mode"][value="pickup"]');
  const cardHome = document.getElementById("card-delivery-home");
  const cardPickup = document.getElementById("card-delivery-pickup");
  const addressGroup = document.getElementById("delivery-address-group");
  const pickupBanner = document.getElementById("kitchen-pickup-banner");
  const deliveryStatusBadge = document.getElementById("cart-delivery-status");
  const shippingDisclaimer = document.getElementById("shipping-disclaimer");

  function updateDeliveryUI() {
    const isHome = homeRadio && homeRadio.checked;
    currentDeliveryMode = isHome ? "home" : "pickup";

    if (cardHome && cardPickup) {
      if (isHome) {
        cardHome.classList.add("active");
        cardPickup.classList.remove("active");
      } else {
        cardPickup.classList.add("active");
        cardHome.classList.remove("active");
      }
    }

    if (addressGroup) addressGroup.style.display = isHome ? "block" : "none";
    if (pickupBanner) pickupBanner.style.display = isHome ? "none" : "block";

    if (deliveryStatusBadge) {
      deliveryStatusBadge.textContent = isHome ? "At actuals via Porter/Dunzo" : "Free (Kitchen Pickup)";
    }
    if (shippingDisclaimer) {
      shippingDisclaimer.innerHTML = isHome
        ? "🛵 Delivery charges are calculated at actuals based on distance upon dispatch, or you can opt for free kitchen pickup."
        : "🛍️ Free pickup from our Bangalore kitchen. Exact address & time window will be shared on WhatsApp.";
    }
  }

  if (homeRadio) homeRadio.addEventListener("change", () => {
    updateDeliveryUI();
    saveFormDraft();
  });
  if (pickupRadio) pickupRadio.addEventListener("change", () => {
    updateDeliveryUI();
    saveFormDraft();
  });
}

// 8. User-Friendly Google Maps Integration (Auto-detect GPS + Manual Override + Link Paste)
function setupGoogleMapsIntegration() {
  const btnGps = document.getElementById("btn-gps-auto");
  const mapPreviewBox = document.getElementById("gmaps-preview-box");
  const gmapsIframe = document.getElementById("gmaps-iframe");
  const pinStatus = document.getElementById("pin-status-pill");
  const addressInput = document.getElementById("cust-address");
  const chips = document.querySelectorAll(".chip-jump");

  function clearLocationPin() {
    pinnedLocationUrl = "";
    if (pinStatus) {
      pinStatus.style.display = "none";
      pinStatus.innerHTML = "";
    }
    if (mapPreviewBox) {
      mapPreviewBox.style.display = "none";
    }
    if (btnGps) {
      btnGps.disabled = false;
      btnGps.innerHTML = `<span>📍 Pin My Exact Location (Google Maps)</span>`;
    }
  }

  function renderStatusPill(labelHtml) {
    if (!pinStatus) return;
    pinStatus.style.display = "flex";
    pinStatus.innerHTML = `
      <span>${labelHtml}</span>
      <button type="button" class="btn-clear-pin" id="btn-clear-pin" title="Clear or update location">✕ Clear</button>
    `;
    const clearBtn = document.getElementById("btn-clear-pin");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (addressInput) addressInput.value = "";
        clearLocationPin();
        showToast("Location cleared. You can type an address or re-pin.");
      });
    }
  }

  // Single-Tap "Pin My Exact Location"
  if (btnGps) {
    btnGps.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Location services are not supported by your browser.");
        return;
      }

      btnGps.disabled = true;
      btnGps.innerHTML = `<span>⏳ Pinning your location...</span>`;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          btnGps.disabled = false;
          btnGps.innerHTML = `<span>✓ Location Pinned on Google Maps!</span>`;

          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const latFixed = lat.toFixed(6);
          const lngFixed = lng.toFixed(6);

          pinnedLocationUrl = `https://www.google.com/maps?q=${latFixed},${lngFixed}`;

          renderStatusPill(`✓ GPS Pinned: <strong>${latFixed}, ${lngFixed}</strong> • <a href="${pinnedLocationUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">Verify in Maps</a>`);

          if (gmapsIframe) {
            gmapsIframe.src = `https://maps.google.com/maps?q=${latFixed},${lngFixed}&z=16&output=embed`;
            if (mapPreviewBox) mapPreviewBox.style.display = "block";
          }

          showToast("📍 Location pinned on Google Maps!");
        },
        (err) => {
          btnGps.disabled = false;
          btnGps.innerHTML = `<span>📍 Pin My Exact Location (Google Maps)</span>`;
          let msg = "Could not detect GPS location.";
          if (err.code === err.PERMISSION_DENIED) {
            msg = "Location permission was denied. You can type your society/apartment name or share your live pin in WhatsApp.";
          }
          alert(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  // Live address preview, link paste & coordinate detection
  if (addressInput) {
    let debounceTimer;
    addressInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = addressInput.value.trim();
        if (!val) {
          if (!pinnedLocationUrl.includes("q=")) {
            clearLocationPin();
          }
          return;
        }

        // 1. If user pasted a Google Maps or web link
        if (/^https?:\/\//i.test(val)) {
          pinnedLocationUrl = val;
          renderStatusPill(`✓ Google Maps link added • <a href="${val}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">Verify</a>`);
          return;
        }

        // 2. If user pasted exact coordinates e.g. "12.9716, 77.5946"
        const coordsMatch = val.match(/^(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)$/);
        if (coordsMatch) {
          const lat = parseFloat(coordsMatch[1]).toFixed(6);
          const lng = parseFloat(coordsMatch[3]).toFixed(6);
          pinnedLocationUrl = `https://www.google.com/maps?q=${lat},${lng}`;
          if (gmapsIframe) {
            gmapsIframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
            if (mapPreviewBox) mapPreviewBox.style.display = "block";
          }
          renderStatusPill(`✓ Coordinates: <strong>${lat}, ${lng}</strong> • <a href="${pinnedLocationUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">Verify in Maps</a>`);
          return;
        }

        // 3. Typed address or landmark in Bangalore
        const query = `${val}, Bangalore`;
        pinnedLocationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        if (gmapsIframe) {
          gmapsIframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
          if (mapPreviewBox) mapPreviewBox.style.display = "block";
        }
        renderStatusPill(`📍 Using address: <strong>${val}</strong>`);
      }, 600);
    });
  }

  // Bangalore Quick Area Chips
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const area = chip.getAttribute("data-area");
      if (!area) return;
      if (addressInput) {
        addressInput.value = `${area}, Bangalore`;
      }
      if (gmapsIframe) {
        gmapsIframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(area + ", Bangalore")}&z=14&output=embed`;
        if (mapPreviewBox) mapPreviewBox.style.display = "block";
      }
      pinnedLocationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(area + ", Bangalore")}`;
      renderStatusPill(`✓ Area: <strong>${area}, Bangalore</strong>`);
      showToast(`Selected ${area}`);
    });
  });
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
  const subtotalEl = document.getElementById("cart-subtotal-val");
  const totalEl = document.getElementById("cart-total-val");
  const emptyMsg = document.getElementById("cart-empty-message");
  const content = document.getElementById("cart-content-wrapper");

  if (!list) return;
  list.innerHTML = "";

  const { total } = getTotals();
  if (subtotalEl) subtotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    content.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  content.style.display = "block";

  // Items header with Clear Cart option
  const headerRow = document.createElement("div");
  headerRow.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 4px;";
  headerRow.innerHTML = `
    <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Selected Items (${cart.length})</span>
    <button type="button" id="btn-clear-cart-all" style="background: none; border: none; color: var(--text-muted); font-size: 0.75rem; cursor: pointer; text-decoration: underline; padding: 2px 4px;">Clear Cart</button>
  `;
  list.appendChild(headerRow);

  const clearBtn = headerRow.querySelector("#btn-clear-cart-all");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all items from your order?")) {
        clearAllCart();
        showToast("Cart cleared");
      }
    });
  }

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
  const mapLinkInput = document.getElementById("cust-map-link");
  const notesInput = document.getElementById("cust-notes");

  const name = nameInput ? nameInput.value.trim() : "";
  const date = dateInput ? dateInput.value : "";
  const address = addrInput ? addrInput.value.trim() : "";
  const mapLink = mapLinkInput ? mapLinkInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";
  const isHomeDelivery = currentDeliveryMode === "home";

  if (!name) {
    alert("Please enter your name.");
    if (nameInput) nameInput.focus();
    return;
  }

  if (isHomeDelivery && !address && !pinnedLocationUrl && !mapLink) {
    alert("Please enter your delivery area or location.");
    if (addrInput) addrInput.focus();
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
  msg += `🚚 *Fulfillment:* ${isHomeDelivery ? "🛵 Home Delivery" : "🛍️ Kitchen Pickup (Self-Pickup)"}\n`;

  if (isHomeDelivery) {
    if (address) msg += `📍 *Delivery Area:* ${address}\n`;
    const finalMapUrl = pinnedLocationUrl || mapLink;
    if (finalMapUrl) msg += `🗺️ *Google Maps Link:* ${finalMapUrl}\n`;
  } else {
    msg += `📍 *Pickup Location:* Bangalore Kitchen (please confirm time window)\n`;
  }

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
  msg += `💰 *ITEMS SUBTOTAL: ₹${total.toLocaleString("en-IN")}*\n`;
  if (isHomeDelivery) {
    msg += `📦 *Delivery Charges:* Extra at actuals via Porter/Dunzo (based on distance)\n`;
  } else {
    msg += `📦 *Delivery Charges:* Free (Kitchen Pickup)\n`;
  }
  msg += `-----------------------------------------\n`;
  msg += `⏳ *Pre-orders only (1 week notice) • Exclusively Eggless*\n`;
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
