// Page 26 Menu Application Logic

let cart = []; // Array of { id, name, size, price, qty }
let activeCategory = "all";
let searchQuery = "";
// Track selected option index per item card: { [itemId]: optionIndex }
const selectedOptions = {};

document.addEventListener("DOMContentLoaded", () => {
  initDeliveryDate();
  renderCategoryTabs();
  renderMenu();
  setupEventListeners();
  updateCartUI();
});

// Calculate minimum delivery date (+7 days from today)
function initDeliveryDate() {
  const dateInput = document.getElementById("order-date");
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

// Render category navigation pills
function renderCategoryTabs() {
  const container = document.getElementById("category-tabs");
  if (!container) return;
  container.innerHTML = "";

  window.PAGE26_CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${cat.id === activeCategory ? "active" : ""}`;
    btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.label}</span>`;
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderCategoryTabs();
      renderMenu();
      window.scrollTo({ top: document.getElementById("menu-root").offsetTop - 120, behavior: "smooth" });
    });
    container.appendChild(btn);
  });
}

// Filter and render items
function renderMenu() {
  const root = document.getElementById("menu-root");
  if (!root) return;
  root.innerHTML = "";

  const q = searchQuery.toLowerCase().trim();

  // Filter items
  const filtered = window.PAGE26_ITEMS.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.note && item.note.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    root.innerHTML = `
      <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 10px;">🍰</p>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 8px;">No flavours found</h3>
        <p style="font-size: 0.9rem;">Try searching with a different term or clear the filter.</p>
      </div>
    `;
    return;
  }

  // Group by category if "all" is active, or render current category
  const categoriesToRender = activeCategory === "all"
    ? window.PAGE26_CATEGORIES.filter((c) => c.id !== "all")
    : window.PAGE26_CATEGORIES.filter((c) => c.id === activeCategory);

  categoriesToRender.forEach((cat) => {
    const itemsInCat = filtered.filter((i) => i.category === cat.id);
    if (itemsInCat.length === 0) return;

    const groupDiv = document.createElement("section");
    groupDiv.className = "category-group";
    groupDiv.id = `cat-${cat.id}`;

    // Header for group
    let metaNote = "";
    if (cat.id === "cheesecakes") metaNote = "👑 Page 26 Signature • Exclusively Eggless";
    if (cat.id === "cakes") metaNote = "Couverture chocolate cakes • Bento to 2 kg";
    if (cat.id === "brownies") metaNote = "Couverture chocolate • Boxes of 4 & 6 • Custom toppings on request";
    if (cat.id === "muffins") metaNote = "Bakery-style • Couverture chocolate • Boxes of 4 & 6";
    if (cat.id === "cupcakes") metaNote = "Boxes of 4 & 6 • Exclusively Eggless";

    groupDiv.innerHTML = `
      <div class="category-group-header">
        <h2 class="category-title">
          <span>${cat.label}</span>
          ${cat.id === "cheesecakes" ? '<span class="crown-badge">👑 SIGNATURE</span>' : ''}
          <span class="veg-indicator" title="100% Eggless Vegetarian"></span>
        </h2>
        <span class="category-meta-note">${metaNote}</span>
      </div>
      <div class="cards-grid" id="grid-${cat.id}"></div>
    `;

    root.appendChild(groupDiv);

    const grid = groupDiv.querySelector(`#grid-${cat.id}`);
    itemsInCat.forEach((item) => {
      const card = createItemCard(item);
      grid.appendChild(card);
    });
  });
}

// Create Card element
function createItemCard(item) {
  const card = document.createElement("div");
  card.className = "menu-card";

  if (selectedOptions[item.id] === undefined) {
    selectedOptions[item.id] = 0; // Default to first size/price option
  }

  const selectedIndex = selectedOptions[item.id];
  let qty = 1;

  card.innerHTML = `
    <div class="card-header">
      <div class="card-title-row">
        <h3 class="card-name">${item.name}</h3>
        <div class="card-icons">
          <span class="veg-indicator" title="100% Eggless"></span>
        </div>
      </div>
      <p class="card-desc">${item.description || ""}</p>
      ${item.note ? `<span class="card-special-note">✨ ${item.note}</span>` : ""}
    </div>

    <div class="card-body">
      <div class="option-selector-label">Select Weight / Box Size</div>
      <div class="options-list" id="options-${item.id}">
        ${item.options.map((opt, idx) => `
          <div class="option-chip ${idx === selectedIndex ? "selected" : ""}" data-idx="${idx}">
            <span class="size-label">${opt.size}</span>
            <span class="price-label">₹${opt.price.toLocaleString("en-IN")}</span>
          </div>
        `).join("")}
      </div>

      <div class="card-actions">
        <div class="qty-control">
          <button type="button" class="qty-btn btn-minus" aria-label="Decrease quantity">−</button>
          <span class="qty-value">1</span>
          <button type="button" class="qty-btn btn-plus" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="btn-add-order">
          <span>+ Add to Order</span>
          <span class="btn-price-display">₹${(item.options[selectedIndex].price).toLocaleString("en-IN")}</span>
        </button>
      </div>
    </div>
  `;

  // Attach option click handlers
  const optionChips = card.querySelectorAll(".option-chip");
  const priceDisplay = card.querySelector(".btn-price-display");
  const qtyVal = card.querySelector(".qty-value");

  function updateButtonPrice() {
    const curIdx = selectedOptions[item.id];
    const unitPrice = item.options[curIdx].price;
    priceDisplay.textContent = `₹${(unitPrice * qty).toLocaleString("en-IN")}`;
  }

  optionChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const idx = parseInt(chip.getAttribute("data-idx"), 10);
      selectedOptions[item.id] = idx;
      optionChips.forEach((c) => c.classList.remove("selected"));
      chip.classList.add("selected");
      updateButtonPrice();
    });
  });

  // Attach quantity handlers
  card.querySelector(".btn-minus").addEventListener("click", () => {
    if (qty > 1) {
      qty -= 1;
      qtyVal.textContent = qty;
      updateButtonPrice();
    }
  });

  card.querySelector(".btn-plus").addEventListener("click", () => {
    qty += 1;
    qtyVal.textContent = qty;
    updateButtonPrice();
  });

  // Attach Add to Order
  card.querySelector(".btn-add-order").addEventListener("click", () => {
    const curIdx = selectedOptions[item.id];
    const option = item.options[curIdx];
    addToCart(item, option, qty);
    showToast(`Added ${qty}x ${item.name} (${option.size}) to order!`);
  });

  return card;
}

// Cart management
function addToCart(item, option, qty) {
  const existing = cart.find(
    (c) => c.itemId === item.id && c.size === option.size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      itemId: item.id,
      name: item.name,
      size: option.size,
      price: option.price,
      qty: qty
    });
  }
  updateCartUI();
}

function updateCartQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
  renderCartDrawer();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCartUI();
  renderCartDrawer();
}

function getCartTotals() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  return { count, total };
}

function updateCartUI() {
  const { count, total } = getCartTotals();
  const stickyBar = document.getElementById("sticky-bottom-bar");
  const countBadge = document.getElementById("cart-count-badge");
  const totalDisplay = document.getElementById("cart-total-display");

  if (!stickyBar) return;

  if (count > 0) {
    stickyBar.classList.add("show");
    countBadge.textContent = count;
    totalDisplay.textContent = `₹${total.toLocaleString("en-IN")}`;
  } else {
    stickyBar.classList.remove("show");
  }
}

// Render Order Drawer Modal
function renderCartDrawer() {
  const itemsContainer = document.getElementById("modal-items-list");
  const totalDisplay = document.getElementById("modal-total-display");
  const emptyState = document.getElementById("cart-empty-state");
  const checkoutForm = document.getElementById("checkout-form-section");

  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";

  const { count, total } = getCartTotals();
  totalDisplay.textContent = `₹${total.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (checkoutForm) checkoutForm.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (checkoutForm) checkoutForm.style.display = "block";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "order-item-row";
    row.innerHTML = `
      <div class="order-item-details">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-size">Weight/Size: <strong>${item.size}</strong> • ₹${item.price} each</div>
      </div>
      <div class="qty-control" style="transform: scale(0.9);">
        <button type="button" class="qty-btn" onclick="updateCartQty(${index}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button type="button" class="qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
      </div>
      <div class="order-item-price">₹${(item.qty * item.price).toLocaleString("en-IN")}</div>
      <button type="button" class="btn-remove-item" onclick="removeCartItem(${index})" title="Remove item">✕</button>
    `;
    itemsContainer.appendChild(row);
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Open Checkout Drawer
  const openCheckoutBtn = document.getElementById("btn-open-checkout");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckoutBtn = document.getElementById("btn-close-checkout");

  if (openCheckoutBtn && checkoutModal) {
    openCheckoutBtn.addEventListener("click", () => {
      renderCartDrawer();
      checkoutModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  // Backdrop click
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // WhatsApp Order Submission
  const btnSubmitWhatsapp = document.getElementById("btn-send-whatsapp");
  if (btnSubmitWhatsapp) {
    btnSubmitWhatsapp.addEventListener("click", () => {
      sendOrderViaWhatsApp();
    });
  }

  // Call directly button
  const btnCallDirect = document.getElementById("btn-call-direct");
  if (btnCallDirect) {
    btnCallDirect.addEventListener("click", () => {
      window.location.href = `tel:${window.PAGE26_CONFIG.phoneRaw}`;
    });
  }

  // Menu Lightbox viewer
  const btnViewMenuImg = document.getElementById("btn-view-menu-img");
  const lightboxModal = document.getElementById("menu-image-lightbox");
  const closeLightbox = document.getElementById("btn-close-lightbox");

  if (btnViewMenuImg && lightboxModal) {
    btnViewMenuImg.addEventListener("click", () => {
      lightboxModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener("click", () => {
      lightboxModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
}

// Generate & Send WhatsApp Order
function sendOrderViaWhatsApp() {
  if (cart.length === 0) {
    alert("Please add at least one bakery item to your order.");
    return;
  }

  const nameInput = document.getElementById("order-name");
  const phoneInput = document.getElementById("order-phone");
  const dateInput = document.getElementById("order-date");
  const addressInput = document.getElementById("order-address");
  const notesInput = document.getElementById("order-notes");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const deliveryDate = dateInput ? dateInput.value : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  if (!name) {
    alert("Please enter your name so we know who the order is for.");
    if (nameInput) nameInput.focus();
    return;
  }

  const { total } = getCartTotals();

  // Format delivery date nicely
  let formattedDate = deliveryDate;
  if (deliveryDate) {
    try {
      const d = new Date(deliveryDate + "T00:00:00");
      formattedDate = d.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (e) {
      formattedDate = deliveryDate;
    }
  }

  // Build clean WhatsApp message
  let msg = `🍰 *NEW PRE-ORDER REQUEST - PAGE 26*\n`;
  msg += `-----------------------------------------\n`;
  msg += `👤 *Customer Name:* ${name}\n`;
  if (phone) msg += `📞 *Contact:* ${phone}\n`;
  if (formattedDate) msg += `📅 *Preferred Date:* ${formattedDate}\n`;
  if (address) msg += `📍 *Delivery Area/Address:* ${address}\n`;
  if (notes) msg += `📝 *Notes/Customization:* ${notes}\n`;
  msg += `-----------------------------------------\n`;
  msg += `🛒 *ORDER DETAILS:*\n\n`;

  cart.forEach((item, i) => {
    const itemTotal = item.qty * item.price;
    msg += `${i + 1}. *${item.name}*\n`;
    msg += `   • Size/Weight: ${item.size}\n`;
    msg += `   • Qty: ${item.qty} × ₹${item.price} = ₹${itemTotal.toLocaleString("en-IN")}\n\n`;
  });

  msg += `-----------------------------------------\n`;
  msg += `💰 *ESTIMATED TOTAL: ₹${total.toLocaleString("en-IN")}*\n`;
  msg += `-----------------------------------------\n`;
  msg += `⏳ *Note:* Pre-orders only (1 week's notice) • Exclusively Eggless\n`;
  msg += `📍 Bengaluru`;

  // Encode URL
  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${window.PAGE26_CONFIG.phoneRaw}?text=${encodedMsg}`;

  // Open in new window or redirect
  window.open(waUrl, "_blank");
}

// Toast helper
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}
