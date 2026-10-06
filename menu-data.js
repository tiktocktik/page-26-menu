// Page 26 - Menu Data Configuration
// You can edit prices, flavours, or details directly in this file.

window.PAGE26_CONFIG = {
  storeName: "PAGE 26",
  tagline: "CHEESECAKES & BAKES",
  phone: "+91 8780547928",
  phoneRaw: "918780547928", // for wa.me and tel:
  location: "Bengaluru",
  leadTime: "1 Week's Notice",
  dietaryNote: "All products are Exclusively Eggless",
  chocolateNote: "All chocolate-based cakes, brownies, and muffins are made with premium couverture chocolate."
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
  // --- CHEESECAKES ---
  {
    id: "cc-newyork",
    category: "cheesecakes",
    name: "New York Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Classic rich, creamy and velvety New York style baked cheesecake on a crisp biscuit base.",
    options: [
      { size: "500 g", price: 700 },
      { size: "1 kg", price: 1200 },
      { size: "1.5 kg", price: 1750 },
      { size: "2 kg", price: 2300 }
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
      { size: "1.5 kg", price: 2050 },
      { size: "2 kg", price: 2700 }
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
      { size: "1.5 kg", price: 2050 },
      { size: "2 kg", price: 2700 }
    ]
  },
  {
    id: "cc-blueberry",
    category: "cheesecakes",
    name: "Blueberry Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Silky cheesecake topped with artisanal sweet and tangy blueberry compote.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2050 },
      { size: "2 kg", price: 2700 }
    ]
  },
  {
    id: "cc-strawberry",
    category: "cheesecakes",
    name: "Strawberry Cheesecake",
    isSignature: true,
    isEggless: true,
    description: "Smooth, luscious cheesecake smothered with fresh strawberry reduction.",
    options: [
      { size: "500 g", price: 800 },
      { size: "1 kg", price: 1400 },
      { size: "1.5 kg", price: 2050 },
      { size: "2 kg", price: 2700 }
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
      { size: "Bento (~300 g)", price: 450 },
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
      { size: "Bento (~300 g)", price: 450 },
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
      { size: "Bento (~300 g)", price: 500 },
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
    name: "Classic Fudgy Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Custom toppings on request",
    description: "Ultra-fudgy, crackly-top brownies made with rich couverture dark chocolate.",
    options: [
      { size: "Box of 4", price: 450 },
      { size: "Box of 6", price: 650 }
    ]
  },
  {
    id: "brownie-nutella",
    category: "brownies",
    name: "Nutella Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Custom toppings on request",
    description: "Gooey chocolate brownies swirled with generous dollops of warm Nutella.",
    options: [
      { size: "Box of 4", price: 500 },
      { size: "Box of 6", price: 720 }
    ]
  },
  {
    id: "brownie-biscoff",
    category: "brownies",
    name: "Biscoff Brownies",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Custom toppings on request",
    description: "Fudgy chocolate brownies topped with spiced Lotus Biscoff spread and biscuit crunch.",
    options: [
      { size: "Box of 4", price: 500 },
      { size: "Box of 6", price: 720 }
    ]
  },

  // --- MUFFINS ---
  {
    id: "muffin-chocolate",
    category: "muffins",
    name: "Chocolate Muffins",
    isSignature: false,
    isEggless: true,
    note: "Large bakery-style • Couverture chocolate",
    description: "Soft, towering bakery-style muffins studded with melted couverture chocolate chunks.",
    options: [
      { size: "Box of 4", price: 380 },
      { size: "Box of 6", price: 540 }
    ]
  },
  {
    id: "muffin-vanilla",
    category: "muffins",
    name: "Vanilla Muffins",
    isSignature: false,
    isEggless: true,
    note: "Large bakery-style",
    description: "Fluffy, golden, aromatic bakery-style vanilla muffins with delicate crumb.",
    options: [
      { size: "Box of 4", price: 380 },
      { size: "Box of 6", price: 540 }
    ]
  },

  // --- CUPCAKES ---
  {
    id: "cupcake-strawberry",
    category: "cupcakes",
    name: "Strawberry Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Sold in boxes of 4 and 6",
    description: "Tender vanilla cupcakes swirled with delightful strawberry frosting.",
    options: [
      { size: "Box of 4", price: 180 },
      { size: "Box of 6", price: 250 }
    ]
  },
  {
    id: "cupcake-blueberry",
    category: "cupcakes",
    name: "Blueberry Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Sold in boxes of 4 and 6",
    description: "Soft cupcakes topped with silky blueberry infused buttercream.",
    options: [
      { size: "Box of 4", price: 180 },
      { size: "Box of 6", price: 250 }
    ]
  },
  {
    id: "cupcake-chocolate",
    category: "cupcakes",
    name: "Chocolate Cupcakes",
    isSignature: false,
    isEggless: true,
    note: "Couverture chocolate • Sold in boxes of 4 and 6",
    description: "Rich couverture chocolate cupcakes with whipped dark chocolate swirl.",
    options: [
      { size: "Box of 4", price: 300 },
      { size: "Box of 6", price: 420 }
    ]
  }
];
