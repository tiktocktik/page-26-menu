// Page 26 - Menu Data Configuration
// Small-batch artisanal home bakery in Bangalore

window.PAGE26_CONFIG = {
  storeName: "PAGE 26",
  tagline: "CHEESECAKES & BAKES",
  phone: "+91 8780547928",
  phoneRaw: "918780547928",
  location: "Bangalore",
  leadTime: "1 Week's Notice (Pre-orders only)",
  dietaryNote: "100% Exclusively Eggless",
  chocolateNote: "All chocolate bakes are made with pure couverture chocolate (real cocoa butter)."
};

window.PAGE26_CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨" },
  { id: "cheesecakes", label: "Cheesecakes", icon: "👑", isSignatureSection: true },
  { id: "cakes", label: "Cakes", icon: "🎂" },
  { id: "brownies", label: "Brownies", icon: "🍫" },
  { id: "muffins", label: "Muffins", icon: "🧁" },
  { id: "cupcakes", label: "Cupcakes", icon: "🧁" }
];

window.PAGE26_ITEMS = [
  // --- CHEESECAKES (The whole section is Signature) ---
  {
    id: "cc-classic-newyork",
    category: "cheesecakes",
    name: "Classic New York Cheesecake",
    isEggless: true,
    description: "Dense, slow-baked cream cheese on a buttery biscuit crust. Not overly sweet.",
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
    isEggless: true,
    description: "Baked cream cheese layered with Lotus Biscoff spread.",
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
    isEggless: true,
    description: "Slow-baked cream cheese swirled with pure Nutella and hazelnut chocolate.",
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
    isEggless: true,
    description: "Classic baked cheesecake topped with blueberry compote.",
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
    isEggless: true,
    description: "Smooth baked cheesecake topped with strawberry compote.",
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
    isEggless: true,
    note: "Couverture chocolate • Bento ~250–350g",
    description: "Moist chocolate sponge layered with pure dark couverture chocolate ganache.",
    options: [
      { size: "Bento (~250–350g)", price: 500 },
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
    isEggless: true,
    note: "Bento ~250–350g",
    description: "Soft cocoa-buttermilk sponge paired with whipped real cream cheese frosting.",
    options: [
      { size: "Bento (~250–350g)", price: 500 },
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
    isEggless: true,
    note: "Couverture chocolate • Bento ~250–350g",
    description: "Layers of chocolate cake filled with pure Nutella and couverture drip, semi-frosted.",
    options: [
      { size: "Bento (~250–350g)", price: 550 },
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
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs",
    description: "Fudgy and gooey inside with a crinkle top, made with melted couverture.",
    options: [
      { size: "Box of 4", price: 450, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 120, minQty: 4 }
    ]
  },
  {
    id: "brownie-nutella",
    category: "brownies",
    name: "Nutella Brownies",
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs",
    description: "Our fudgy brownie batter baked with thick swirls of pure Nutella.",
    options: [
      { size: "Box of 4", price: 500, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 130, minQty: 4 }
    ]
  },
  {
    id: "brownie-biscoff",
    category: "brownies",
    name: "Biscoff Brownies",
    isEggless: true,
    note: "Couverture chocolate • Min order 4 pcs",
    description: "Fudgy chocolate brownies swirled with Lotus Biscoff spread.",
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
    isEggless: true,
    note: "Large bakery-style • Couverture chocolate • Min order 4 pcs",
    description: "Bakery-style dome muffins loaded with melted couverture chocolate chunks.",
    options: [
      { size: "Box of 4", price: 380, isBox: true },
      { size: "Per piece (Min 4 pcs)", price: 100, minQty: 4 }
    ]
  },
  {
    id: "muffin-vanilla",
    category: "muffins",
    name: "Vanilla Muffins",
    isEggless: true,
    note: "Large bakery-style • Min order 4 pcs",
    description: "Soft, pillowy golden muffins with a warm vanilla flavor.",
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
    isEggless: true,
    note: "Sold in boxes of 4 & 6",
    description: "Fluffy vanilla cupcakes piped with strawberry buttercream.",
    options: [
      { size: "Box of 4", price: 180, isBox: true },
      { size: "Box of 6", price: 270, isBox: true }
    ]
  },
  {
    id: "cupcake-blueberry",
    category: "cupcakes",
    name: "Blueberry Cupcakes",
    isEggless: true,
    note: "Sold in boxes of 4 & 6",
    description: "Soft vanilla cupcakes topped with blueberry buttercream swirl.",
    options: [
      { size: "Box of 4", price: 180, isBox: true },
      { size: "Box of 6", price: 270, isBox: true }
    ]
  },
  {
    id: "cupcake-chocolate",
    category: "cupcakes",
    name: "Chocolate Cupcakes",
    isEggless: true,
    note: "Couverture chocolate • Sold in boxes of 4 & 6",
    description: "Rich cocoa cupcakes piped with whipped dark couverture chocolate ganache.",
    options: [
      { size: "Box of 4", price: 300, isBox: true },
      { size: "Box of 6", price: 450, isBox: true }
    ]
  }
];
