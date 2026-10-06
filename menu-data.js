// Page 26 - Menu Data Configuration
// Synced with MENU_REFERENCE.md

window.PAGE26_CONFIG = {
  storeName: "PAGE 26",
  tagline: "CHEESECAKES & BAKES",
  phone: "+91 8780547928",
  phoneRaw: "918780547928",
  location: "Bangalore",
  leadTime: "Pre-orders only (Made fresh to order)",
  dietaryNote: "All products are Exclusively Eggless",
  chocolateNote: "All chocolate-based cakes, brownies, muffins and cupcakes are made with couverture chocolate."
};

window.PAGE26_CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨" },
  { id: "cheesecakes", label: "Cheesecakes", icon: "👑", badge: "Signature" },
  { id: "cakes", label: "Cakes", icon: "🎂" },
  { id: "brownies", label: "Brownies", icon: "🍫" },
  { id: "muffins", label: "Muffins", icon: "🧁" },
  { id: "cupcakes", label: "Cupcakes", icon: "🧁" }
];

window.PAGE26_ITEMS = [
  // --- CHEESECAKES · SIGNATURE ---
  {
    id: "cc-classic-newyork",
    category: "cheesecakes",
    name: "Classic New York Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Classic rich, creamy and velvety baked cheesecake on an artisanal biscuit crust.",
    options: [
      { size: "500 g", price: 700 },
      { size: "1 kg", price: 1200 },
      { size: "1.5 kg", price: 1800 },
      { size: "2 kg", price: 2400 }
    ]
  },
  {
    id: "cc-biscoff",
    category: "cheesecakes",
    name: "Biscoff Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Creamy cheesecake swirled and topped with Lotus Biscoff spread and biscuit crumb.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2100 },
      { size: "2 kg", price: 2800 }
    ]
  },
  {
    id: "cc-nutella",
    category: "cheesecakes",
    name: "Nutella Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Decadent hazelnut cocoa Nutella layered cheesecake for ultimate chocolate lovers.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2100 },
      { size: "2 kg", price: 2800 }
    ]
  },
  {
    id: "cc-blueberry",
    category: "cheesecakes",
    name: "Blueberry Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Silky cheesecake topped with sweet and tangy artisanal blueberry compote.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2100 },
      { size: "2 kg", price: 2800 }
    ]
  },
  {
    id: "cc-strawberry",
    category: "cheesecakes",
    name: "Strawberry Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Smooth, luscious cheesecake smothered with artisanal strawberry compote.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2100 },
      { size: "2 kg", price: 2800 }
    ]
  },

  // --- CAKES ---
  {
    id: "cake-ganache",
    category: "cakes",
    name: "Chocolate Ganache Cake",
    isSignature: false,
    isEggless: true,
    note: "Made with couverture chocolate",
    description: "Moist chocolate sponge layered with rich, silky couverture chocolate ganache.",
    options: [
      { size: "Bento (~250–350 g)", price: 500 },
      { size: "500 g", price: 650 },
      { size: "1 kg", price: 1200 },
      { size: "1.5 kg", price: 1750 },
      { size: "2 kg", price: 2300 }
    ]
  },
  {
    id: "cake-redvelvet",
    category: "cakes",
    name: "Red Velvet Cake",
    isSignature: false,
    isEggless: true,
    description: "Classic scarlet sponge with smooth cream cheese frosting. Elegant & delicate.",
    options: [
      { size: "Bento (~250–350 g)", price: 500 },
      { size: "500 g", price: 650 },
      { size: "1 kg", price: 1200 },
      { size: "1.5 kg", price: 1750 },
      { size: "2 kg", price: 2300 }
    ]
  },
  {
    id: "cake-nakednutella",
    category: "cakes",
    name: "Naked Chocolate Nutella Cake",
    isSignature: false,
    isEggless: true,
    note: "Made with couverture chocolate",
    description: "Rustic naked chocolate cake layered generously with pure Nutella and couverture chocolate.",
    options: [
      { size: "Bento (~250–350 g)", price: 550 },
      { size: "500 g", price: 750 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2050 },
      { size: "2 kg", price: 2700 }
    ]
  },

  // --- BROWNIES ---
  {
    id: "brownie-classic",
    category: "brownies",
    name: "Classic Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs • Other toppings on request",
    description: "Ultra-fudgy crackly-top brownies crafted with couverture chocolate.",
    options: [
      { size: "Box of 4", price: 450, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 120, minQty: 4 }
    ]
  },
  {
    id: "brownie-nutella",
    category: "brownies",
    name: "Nutella Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs • Other toppings on request",
    description: "Gooey chocolate brownies swirled with generous dollops of Nutella.",
    options: [
      { size: "Box of 4", price: 500, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 130, minQty: 4 }
    ]
  },
  {
    id: "brownie-biscoff",
    category: "brownies",
    name: "Biscoff Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs • Other toppings on request",
    description: "Fudgy chocolate brownies topped with Lotus Biscoff spread and biscuit crunch.",
    options: [
      { size: "Box of 4", price: 500, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 130, minQty: 4 }
    ]
  },

  // --- MUFFINS ---
  {
    id: "muffin-chocolate",
    category: "muffins",
    name: "Chocolate Muffins",
    isSignature: false,
    isEggless: true,
    note: "Large bakery-style • Couverture chocolate • Min order 4 pcs",
    description: "Tall bakery-style muffins studded with couverture chocolate chunks.",
    options: [
      { size: "Box of 4", price: 380, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 100, minQty: 4 }
    ]
  },
  {
    id: "muffin-vanilla",
    category: "muffins",
    name: "Vanilla Muffins",
    isSignature: false,
    isEggless: true,
    note: "Large bakery-style • Min order 4 pcs",
    description: "Golden bakery-style vanilla muffins with fragrant, delicate crumb.",
    options: [
      { size: "Box of 4", price: 380, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 100, minQty: 4 }
    ]
  },

  // --- CUPCAKES ---
  {
    id: "cupcake-strawberry",
    category: "cupcakes",
    name: "Strawberry Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Min order 4 pcs",
    description: "Delicate vanilla cupcakes topped with silky strawberry buttercream.",
    options: [
      { size: "Box of 4", price: 180, isBox: true },
      { size: "Box of 6", price: 270, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 50, minQty: 4 }
    ]
  },
  {
    id: "cupcake-blueberry",
    category: "cupcakes",
    name: "Blueberry Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Min order 4 pcs",
    description: "Soft sponge cupcakes crowned with luscious blueberry frosting.",
    options: [
      { size: "Box of 4", price: 180, isBox: true },
      { size: "Box of 6", price: 270, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 50, minQty: 4 }
    ]
  },
  {
    id: "cupcake-chocolate",
    category: "cupcakes",
    name: "Chocolate Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs",
    description: "Couverture chocolate cupcakes with whipped dark chocolate swirl.",
    options: [
      { size: "Box of 4", price: 300, isBox: true },
      { size: "Box of 6", price: 450, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 80, minQty: 4 }
    ]
  }
];
