// ==========================================================================
// PAGE 26 — Artisanal Eggless Patisserie & Bakes (Bangalore)
// Core Application Logic & WhatsApp Pre-Order Engine
// ==========================================================================

const PHONE_NUMBER = "918780547928";
let cart = []; // Array of { id, name, size, unitPrice, qty, minQty, serving }
let pinnedLocationUrl = "";
let currentFilter = "all";
let searchQuery = "";
const selectedOptions = {};

// Order & Fulfillment state
let currentDeliveryMode = "home"; // "home" or "pickup"

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  setupThemeToggle();
  setupDatePicker();
  setupCategoryNav();
  setupSearchInput();
  renderProducts();
  renderFaqs();
  renderReviews();
  setupDeliveryMethod();
  setupGoogleMapsIntegration();
  setupCheckoutModal();
  setupMenuCardModal();
  restoreFormDraft();
  setupFormAutoSave();
  updateDockUI();
});

// --------------------------------------------------------------------------
// 1. Theme Toggle (🌙 / ☀️)
// --------------------------------------------------------------------------
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (!toggleBtn || !icon) return;

  const savedTheme = localStorage.getItem("page26-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("page26-theme", newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      icon.textContent = "☀️";
      toggleBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      document.documentElement.removeAttribute("data-theme");
      icon.textContent = "🌙";
      toggleBtn.setAttribute("aria-label", "Switch to dark theme");
    }
  }
}

// --------------------------------------------------------------------------
// 2. 7-Day Minimum Pre-order Date Enforced
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// 3. Category Filter Chips Navigation
// --------------------------------------------------------------------------
function setupCategoryNav() {
  const chips = document.querySelectorAll(".nav-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");
      currentFilter = chip.getAttribute("data-category");
      renderProducts();

      if (currentFilter !== "all") {
        const sec = document.getElementById(`sec-${currentFilter}`);
        if (sec) {
          const navOffset = 130;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elemRect = sec.getBoundingClientRect().top;
          const offsetPosition = elemRect - bodyRect - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    });
  });
}

// --------------------------------------------------------------------------
// 4. Live Search Input
// --------------------------------------------------------------------------
function setupSearchInput() {
  const searchInput = document.getElementById("menu-search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const resetBtn = document.getElementById("btn-reset-search");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = (e.target.value || "").trim().toLowerCase();
    if (clearBtn) {
      clearBtn.style.display = searchQuery ? "flex" : "none";
    }
    renderProducts();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearBtn.style.display = "none";
      renderProducts();
      searchInput.focus();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      if (clearBtn) clearBtn.style.display = "none";
      currentFilter = "all";
      document.querySelectorAll(".nav-chip").forEach((c) => {
        const isAll = c.getAttribute("data-category") === "all";
        c.classList.toggle("active", isAll);
        c.setAttribute("aria-selected", isAll ? "true" : "false");
      });
      renderProducts();
    });
  }
}

// --------------------------------------------------------------------------
// 5. Render Category Sections & Product Vitrines
// --------------------------------------------------------------------------
function renderProducts() {
  const container = document.getElementById("menu-sections");
  const zeroState = document.getElementById("search-zero-state");
  if (!container || !window.PAGE26_ITEMS) return;
  container.innerHTML = "";

  const categories = window.PAGE26_CATEGORIES.filter((c) => c.id !== "all");
  let totalMatched = 0;

  categories.forEach((cat) => {
    if (currentFilter !== "all" && currentFilter !== cat.id) return;

    let items = window.PAGE26_ITEMS.filter((i) => i.category === cat.id);

    // Apply search filter if active
    if (searchQuery) {
      items = items.filter((item) => {
        const textToSearch = [
          item.name,
          item.description || "",
          item.flavorNotes || "",
          item.ingredients || "",
          item.badge || ""
        ].join(" ").toLowerCase();
        return textToSearch.includes(searchQuery);
      });
    }

    if (items.length === 0) return;
    totalMatched += items.length;

    const section = document.createElement("section");
    section.className = "menu-category-section";
    section.id = `sec-${cat.id}`;
    section.setAttribute("aria-labelledby", `heading-${cat.id}`);

    section.innerHTML = `
      <div class="category-header-banner">
        <div class="cat-title-group">
          <h2 class="category-heading" id="heading-${cat.id}">${cat.label}</h2>
          ${cat.isSignatureSection ? '<span class="category-badge-pill">👑 BOUTIQUE SIGNATURE</span>' : ''}
          <div class="veg-seal" title="100% Eggless Vegetarian">
            <span class="veg-seal-dot"></span>
          </div>
        </div>
        ${cat.highlight ? `<span class="category-note-right">${cat.highlight}</span>` : ''}
      </div>
      <div class="product-grid" id="grid-${cat.id}"></div>
    `;

    container.appendChild(section);

    const grid = section.querySelector(`#grid-${cat.id}`);
    items.forEach((item) => {
      grid.appendChild(createProductCard(item));
    });
  });

  if (zeroState) {
    zeroState.style.display = totalMatched === 0 ? "block" : "none";
  }
}

// --------------------------------------------------------------------------
// 6. Create Individual Product Vitrine Card
// --------------------------------------------------------------------------
function createProductCard(item) {
  const card = document.createElement("article");
  card.className = "patisserie-card";

  if (selectedOptions[item.id] === undefined) {
    selectedOptions[item.id] = 0; // Default to first weight/box option
  }

  let selectedIdx = selectedOptions[item.id];
  let curOption = item.options[selectedIdx];
  let qty = curOption.minQty || 1;

  card.innerHTML = `
    <div class="card-top">
      <div class="card-header-line">
        <h3 class="card-title">${item.name}</h3>
        <div class="veg-seal" title="100% Eggless Vegetarian">
          <span class="veg-seal-dot"></span>
        </div>
      </div>

      ${item.badge ? `<span class="card-badge-tag">${item.badge}</span>` : ""}
      ${item.description ? `<p class="card-desc">${item.description}</p>` : ""}
      ${item.flavorNotes ? `
        <div class="card-flavor-notes">
          <span>✨</span>
          <span>${item.flavorNotes}</span>
        </div>
      ` : ""}
    </div>

    <div class="card-middle">
      <div class="card-sizes-group">
        <div class="size-label">Select Weight / Box Size</div>
        <div class="size-chips-grid">
          ${item.options.map((opt, i) => `
            <button type="button" class="size-chip ${i === selectedIdx ? "active" : ""}" data-idx="${i}">
              <span class="chip-size-name">${opt.size}</span>
              ${opt.serving ? `<span class="chip-serving">${opt.serving}</span>` : ""}
              <span class="chip-price">₹${opt.price.toLocaleString("en-IN")}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="card-action-bar">
        <div class="live-price-group">
          <span class="price-micro-label">Subtotal</span>
          <span class="price-number">₹${(curOption.price * qty).toLocaleString("en-IN")}</span>
        </div>

        <div class="card-controls">
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

  // Option pill click handlers
  const pills = card.querySelectorAll(".size-chip");
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
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

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

  // Add to Order Action
  card.querySelector(".btn-card-add").addEventListener("click", () => {
    const opt = item.options[selectedOptions[item.id] || 0];
    addToCart(item, opt, qty);
    showToast(`Added ${qty}x ${item.name} (${opt.size})`);
  });

  return card;
}

// --------------------------------------------------------------------------
// 7. Render FAQ Accordion
// --------------------------------------------------------------------------
function renderFaqs() {
  const container = document.getElementById("faq-accordion-list");
  if (!container || !window.PAGE26_FAQS) return;
  container.innerHTML = "";

  window.PAGE26_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    if (index === 0) item.classList.add("active"); // First FAQ open by default

    item.innerHTML = `
      <button type="button" class="faq-question" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${faq.q}</span>
        <span class="faq-icon-glyph">+</span>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    `;

    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      item.classList.toggle("active", !isActive);
      btn.setAttribute("aria-expanded", !isActive ? "true" : "false");
    });

    container.appendChild(item);
  });
}

// --------------------------------------------------------------------------
// 8. Render Customer Reviews
// --------------------------------------------------------------------------
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container || !window.PAGE26_REVIEWS) return;
  container.innerHTML = "";

  window.PAGE26_REVIEWS.forEach((rev) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars">★★★★★</div>
      <h3 class="review-highlight">"${rev.highlight}"</h3>
      <p class="review-text">${rev.review}</p>
      <div class="review-author">
        <span class="review-name">${rev.name}</span>
        <span class="review-loc">📍 ${rev.locality}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 9. Cart Operations & Persistence
// --------------------------------------------------------------------------
function addToCart(item, opt, qty) {
  const existing = cart.find((c) => c.id === item.id && c.size === opt.size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      size: opt.size,
      unitPrice: opt.price,
      serving: opt.serving || "",
      qty: qty,
      minQty: opt.minQty || 1
    });
  }

  saveCartToStorage();
  updateDockUI();
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateDockUI();
  renderCartItems();
}

function updateCartQty(index, newQty) {
  const item = cart[index];
  if (!item) return;
  const minAllowed = item.minQty || 1;
  if (newQty < minAllowed) {
    removeFromCart(index);
    return;
  }
  item.qty = newQty;
  saveCartToStorage();
  updateDockUI();
  renderCartItems();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your pre-order?")) {
    cart = [];
    saveCartToStorage();
    updateDockUI();
    renderCartItems();
    showToast("Pre-order cleared");
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("page26_cart", JSON.stringify(cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("page26_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
}

function updateDockUI() {
  const dock = document.getElementById("order-dock");
  const qtyEl = document.getElementById("dock-qty");
  const priceEl = document.getElementById("dock-price");
  if (!dock || !qtyEl || !priceEl) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  qtyEl.textContent = totalQty;
  priceEl.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

  if (totalQty > 0) {
    dock.classList.add("visible");
  } else {
    dock.classList.remove("visible");
  }
}

function renderCartItems() {
  const container = document.getElementById("cart-items-list");
  const emptyMsg = document.getElementById("cart-empty-message");
  const contentWrapper = document.getElementById("cart-content-wrapper");
  const subtotalEl = document.getElementById("cart-subtotal-val");
  const totalEl = document.getElementById("cart-total-val");

  if (!container) return;

  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.style.display = "block";
    if (contentWrapper) contentWrapper.style.display = "none";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";
  if (contentWrapper) contentWrapper.style.display = "block";

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.qty;
    subtotal += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-size">${item.size} • ₹${item.unitPrice.toLocaleString("en-IN")} each</span>
      </div>
      <div class="item-right-actions">
        <div class="stepper">
          <button type="button" class="stepper-btn btn-cart-dec">−</button>
          <span class="stepper-val">${item.qty}</span>
          <button type="button" class="stepper-btn btn-cart-inc">+</button>
        </div>
        <span class="item-total">₹${itemTotal.toLocaleString("en-IN")}</span>
        <button type="button" class="btn-remove-item" aria-label="Remove item">✕</button>
      </div>
    `;

    row.querySelector(".btn-cart-dec").addEventListener("click", () => {
      updateCartQty(index, item.qty - 1);
    });

    row.querySelector(".btn-cart-inc").addEventListener("click", () => {
      updateCartQty(index, item.qty + 1);
    });

    row.querySelector(".btn-remove-item").addEventListener("click", () => {
      removeFromCart(index);
    });

    container.appendChild(row);
  });

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (totalEl) totalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
}

// --------------------------------------------------------------------------
// 10. Checkout Drawer & Modals
// --------------------------------------------------------------------------
function setupCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const openBtn = document.getElementById("dock-btn-checkout");
  const openInfoBtn = document.getElementById("dock-open-cart");
  const closeBtn = document.getElementById("sheet-close");
  const browseBtn = document.getElementById("btn-browse-trigger");
  const submitBtn = document.getElementById("btn-submit-whatsapp");
  const clearBtn = document.getElementById("btn-clear-cart");

  function openModal() {
    renderCartItems();
    if (modal) modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (openInfoBtn) openInfoBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (browseBtn) browseBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (clearBtn) clearBtn.addEventListener("click", clearCart);
  if (submitBtn) submitBtn.addEventListener("click", handleWhatsAppSubmit);
}

function setupMenuCardModal() {
  const modal = document.getElementById("card-modal");
  const openBtns = [
    document.getElementById("btn-view-card"),
    document.getElementById("hero-btn-menu-card")
  ];
  const closeBtn = document.getElementById("card-modal-close");

  function openCard() {
    if (modal) modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCard() {
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    if (btn) btn.addEventListener("click", openCard);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeCard);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeCard();
    });
  }
}

// --------------------------------------------------------------------------
// 11. Delivery Mode & Google Maps Integration
// --------------------------------------------------------------------------
function setupDeliveryMethod() {
  const radios = document.querySelectorAll('input[name="delivery-mode"]');
  const cardHome = document.getElementById("card-delivery-home");
  const cardPickup = document.getElementById("card-delivery-pickup");
  const addressGroup = document.getElementById("delivery-address-group");
  const pickupBanner = document.getElementById("kitchen-pickup-banner");
  const deliveryStatus = document.getElementById("cart-delivery-status");
  const shippingDisclaimer = document.getElementById("shipping-disclaimer");

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      currentDeliveryMode = e.target.value;

      if (currentDeliveryMode === "home") {
        if (cardHome) cardHome.classList.add("active");
        if (cardPickup) cardPickup.classList.remove("active");
        if (addressGroup) addressGroup.style.display = "block";
        if (pickupBanner) pickupBanner.style.display = "none";
        if (deliveryStatus) deliveryStatus.textContent = "At actuals via Porter/Dunzo upon dispatch";
        if (shippingDisclaimer) {
          shippingDisclaimer.textContent = "🛵 Delivery charges are calculated at actuals based on distance via Porter or Dunzo upon dispatch. Or choose free kitchen pickup!";
        }
      } else {
        if (cardPickup) cardPickup.classList.add("active");
        if (cardHome) cardHome.classList.remove("active");
        if (addressGroup) addressGroup.style.display = "none";
        if (pickupBanner) pickupBanner.style.display = "block";
        if (deliveryStatus) deliveryStatus.textContent = "Free (Kitchen Self-Pickup)";
        if (shippingDisclaimer) {
          shippingDisclaimer.textContent = "🛍️ Free kitchen self-pickup. Scheduled pickup time slot will be confirmed over WhatsApp.";
        }
      }
    });
  });
}

function setupGoogleMapsIntegration() {
  const gpsBtn = document.getElementById("btn-gps-auto");
  const statusPill = document.getElementById("pin-status-pill");
  const previewBox = document.getElementById("gmaps-preview-box");
  const iframe = document.getElementById("gmaps-iframe");
  const addressInput = document.getElementById("cust-address");
  const chips = document.querySelectorAll(".chip-jump");

  // Locality Quick Jump
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const area = chip.getAttribute("data-area");
      if (addressInput) {
        addressInput.value = `${area}, Bangalore`;
      }
      updateMapPreview(`${area}, Bangalore, Karnataka`);
    });
  });

  // GPS Auto Pin
  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser.");
        return;
      }

      gpsBtn.textContent = "📍 Locating your position...";
      gpsBtn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          pinnedLocationUrl = `https://www.google.com/maps?q=${lat},${lng}`;

          gpsBtn.textContent = "✓ Location Pinned Successfully";
          gpsBtn.disabled = false;

          if (statusPill) {
            statusPill.style.display = "block";
            statusPill.innerHTML = `📍 Pinned GPS: <strong>${lat}, ${lng}</strong> (<a href="${pinnedLocationUrl}" target="_blank" style="text-decoration:underline;">View in Maps</a>)`;
          }

          updateMapPreview(`${lat},${lng}`);
          showToast("Exact location pinned!");
        },
        (err) => {
          gpsBtn.textContent = "📍 Pin My Exact Location (Google Maps)";
          gpsBtn.disabled = false;
          showToast("Could not retrieve GPS. Please type your locality below.");
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  }

  function updateMapPreview(query) {
    if (!iframe || !previewBox) return;
    previewBox.style.display = "block";
    iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
  }
}

// --------------------------------------------------------------------------
// 12. Form Draft Auto-Save & Restore
// --------------------------------------------------------------------------
function setupFormAutoSave() {
  const fields = ["cust-name", "cust-date", "cust-address", "cust-notes"];
  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        saveFormDraft();
      });
    }
  });
}

function saveFormDraft() {
  const draft = {
    name: (document.getElementById("cust-name") || {}).value || "",
    date: (document.getElementById("cust-date") || {}).value || "",
    address: (document.getElementById("cust-address") || {}).value || "",
    notes: (document.getElementById("cust-notes") || {}).value || "",
    mode: currentDeliveryMode,
    pinnedUrl: pinnedLocationUrl
  };
  try {
    localStorage.setItem("page26_checkout_draft", JSON.stringify(draft));
  } catch (e) {}
}

function restoreFormDraft() {
  try {
    const saved = localStorage.getItem("page26_checkout_draft");
    if (!saved) return;
    const draft = JSON.parse(saved);

    if (draft.name) (document.getElementById("cust-name") || {}).value = draft.name;
    if (draft.address) (document.getElementById("cust-address") || {}).value = draft.address;
    if (draft.notes) (document.getElementById("cust-notes") || {}).value = draft.notes;
    if (draft.pinnedUrl) pinnedLocationUrl = draft.pinnedUrl;

    if (draft.date) {
      const dateEl = document.getElementById("cust-date");
      if (dateEl && dateEl.min && draft.date >= dateEl.min) {
        dateEl.value = draft.date;
      }
    }
  } catch (e) {}
}

// --------------------------------------------------------------------------
// 13. WhatsApp Pre-Order Compilation & Dispatch
// --------------------------------------------------------------------------
function handleWhatsAppSubmit() {
  if (cart.length === 0) {
    showToast("Your pre-order is empty. Select items to proceed.");
    return;
  }

  const nameInput = document.getElementById("cust-name");
  const dateInput = document.getElementById("cust-date");
  const addressInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  const name = (nameInput ? nameInput.value : "").trim();
  const date = (dateInput ? dateInput.value : "").trim();
  const address = (addressInput ? addressInput.value : "").trim();
  const notes = (notesInput ? notesInput.value : "").trim();

  if (!name) {
    showToast("Please enter your name.");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!date) {
    showToast("Please select your preferred delivery/pickup date.");
    if (dateInput) dateInput.focus();
    return;
  }

  if (currentDeliveryMode === "home" && !address && !pinnedLocationUrl) {
    showToast("Please enter your Bangalore delivery area or pin your location.");
    if (addressInput) addressInput.focus();
    return;
  }

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  // Format Date (DD-MMM-YYYY)
  let formattedDate = date;
  try {
    const parts = date.split("-");
    const dObj = new Date(parts[0], parts[1] - 1, parts[2]);
    formattedDate = dObj.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {}

  // Compile Structured WhatsApp Pre-Order Message
  let msg = `*🍰 PRE-ORDER — PAGE 26 CHEESECAKES & BAKES*\n`;
  msg += `─────────────────────────\n`;
  msg += `*Customer:* ${name}\n`;
  msg += `*Scheduled Date:* ${formattedDate}\n`;
  msg += `*Fulfillment:* ${currentDeliveryMode === "home" ? "🛵 Bangalore Door Delivery" : "🛍️ Kitchen Self-Pickup"}\n`;

  if (currentDeliveryMode === "home") {
    if (address) msg += `*Delivery Area:* ${address}\n`;
    if (pinnedLocationUrl) msg += `*Google Maps Pin:* ${pinnedLocationUrl}\n`;
    msg += `*Delivery Fee:* At actuals via Porter/Dunzo upon dispatch\n`;
  } else {
    msg += `*Pickup Location:* Bangalore Kitchen (Slot confirmed on chat)\n`;
  }

  msg += `─────────────────────────\n`;
  msg += `*ORDER ITEMS (100% Eggless):*\n`;

  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   • Size/Weight: ${item.size}\n`;
    msg += `   • Quantity: ${item.qty}\n`;
    msg += `   • Price: ₹${(item.unitPrice * item.qty).toLocaleString("en-IN")}\n`;
  });

  msg += `─────────────────────────\n`;
  msg += `*ESTIMATED SUBTOTAL:* ₹${subtotal.toLocaleString("en-IN")}\n`;

  if (notes) {
    msg += `─────────────────────────\n`;
    msg += `*Cake Message / Special Notes:*\n${notes}\n`;
  }

  msg += `─────────────────────────\n`;
  msg += `_Order submitted via page26.vercel.app_\n`;
  msg += `_Notice policy: 1 week advance notice acknowledged._`;

  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

// --------------------------------------------------------------------------
// 14. Toast Notification Popup
// --------------------------------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}
