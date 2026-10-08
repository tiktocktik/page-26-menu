// Page 26 - Menu Data Configuration
// Boutique Artisanal Patisserie in Bangalore, Karnataka

window.PAGE26_CONFIG = {
  storeName: "PAGE 26",
  tagline: "CHEESECAKES & BAKES",
  subheading: "Artisanal Eggless Patisserie • Bangalore",
  phone: "+91 8780547928",
  phoneRaw: "918780547928",
  location: "Bangalore, Karnataka, India",
  leadTime: "1 Week's Notice (Pre-orders only)",
  leadTimeDays: 7,
  dietaryNote: "100% Exclusively Eggless",
  chocolateNote: "Exclusively crafted with pure couverture chocolate (real cocoa butter, zero compound).",
  heroImage: "images/hero_cheesecake.jpg",
  geo: {
    lat: 12.9716,
    lng: 77.5946,
    city: "Bangalore",
    state: "Karnataka",
    country: "India"
  }
};

window.PAGE26_CATEGORIES = [
  { id: "all", label: "All Creations", count: 16 },
  { id: "cheesecakes", label: "Baked Cheesecakes", count: 5, isSignatureSection: true, highlight: "Slow-baked on biscuit crust" },
  { id: "cakes", label: "Celebration Cakes", count: 3, highlight: "Pure Couverture & Whipped Frostings" },
  { id: "brownies", label: "Fudgy Brownies", count: 3, highlight: "Crinkle-top couverture bakes" },
  { id: "muffins", label: "Bakery Muffins", count: 2, highlight: "Jumbo bakery-style dome bakes" },
  { id: "cupcakes", label: "Artisanal Cupcakes", count: 3, highlight: "Whipped buttercream swirls in boxes" }
];

window.PAGE26_ITEMS = [
  // --- CHEESECAKES ---
  {
    id: "cc-classic-newyork",
    category: "cheesecakes",
    name: "Classic New York Cheesecake",
    image: "images/classic_ny_cheesecake.jpg",
    badge: "Boutique Signature",
    isEggless: true,
    flavorNotes: "Rich, dense, delicately tangy with a golden baked top",
    description: "Our crowning creation. Dense, slow-baked Philadelphia-style cream cheese on a hand-pressed buttery biscuit crust. Perfectly balanced, never overly sweet.",
    ingredients: "Cream cheese, cultured cream, butter biscuit crust, vanilla bean extract",
    options: [
      { size: "500 g", price: 700, serving: "Serves 4–5" },
      { size: "1 kg", price: 1200, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 1800, serving: "Serves 12–14" },
      { size: "2 kg", price: 2400, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cc-biscoff",
    category: "cheesecakes",
    name: "Lotus Biscoff Cheesecake",
    image: "images/lotus_biscoff_cheesecake.jpg",
    badge: "Crowd Favourite",
    isEggless: true,
    flavorNotes: "Caramelized speculoos spice & velvety baked cream cheese",
    description: "Slow-baked velvety cream cheese layered and swirled with original Lotus Biscoff spread over a crunchy spiced biscuit base, finished with Biscoff crumb.",
    ingredients: "Cream cheese, Lotus Biscoff spread, caramelized biscuit crust",
    options: [
      { size: "500 g", price: 800, serving: "Serves 4–5" },
      { size: "1 kg", price: 1400, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 2100, serving: "Serves 12–14" },
      { size: "2 kg", price: 2800, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cc-nutella",
    category: "cheesecakes",
    name: "Nutella Cheesecake",
    image: "images/nutella_hazelnut_cheesecake.jpg",
    badge: "Decadent Choice",
    isEggless: true,
    flavorNotes: "Roasted hazelnut cocoa ripple & ultra-smooth cheesecake",
    description: "Silky slow-baked cream cheese harmoniously swirled with generous folds of authentic Nutella and roasted hazelnut chocolate on a cocoa biscuit crust.",
    ingredients: "Cream cheese, pure Nutella hazelnut spread, dark chocolate biscuit crust",
    options: [
      { size: "500 g", price: 800, serving: "Serves 4–5" },
      { size: "1 kg", price: 1400, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 2100, serving: "Serves 12–14" },
      { size: "2 kg", price: 2800, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cc-blueberry",
    category: "cheesecakes",
    name: "Blueberry Cheesecake",
    image: "images/blueberry_cheesecake.jpg",
    badge: "Fruit Artisanal",
    isEggless: true,
    flavorNotes: "Lush wild berry compote with creamy citrus undertones",
    description: "Our signature baked cream cheese cheesecake crowned with a slow-simmered whole blueberry compote that cuts through the rich cheesecake with natural brightness.",
    ingredients: "Cream cheese, whole wild blueberries, citrus zest, butter crust",
    options: [
      { size: "500 g", price: 800, serving: "Serves 4–5" },
      { size: "1 kg", price: 1400, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 2100, serving: "Serves 12–14" },
      { size: "2 kg", price: 2800, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cc-strawberry",
    category: "cheesecakes",
    name: "Strawberry Cheesecake",
    image: "images/strawberry_cheesecake.jpg",
    badge: "Seasonal Sweet",
    isEggless: true,
    flavorNotes: "Ripe farm strawberry reduction over dense velvety cheese",
    description: "Luxurious baked cheesecake blanketed with artisanal strawberry compote made from succulent strawberries, balancing sweet tartness with rich dairy warmth.",
    ingredients: "Cream cheese, farm strawberries, Madagascar vanilla, biscuit base",
    options: [
      { size: "500 g", price: 800, serving: "Serves 4–5" },
      { size: "1 kg", price: 1400, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 2100, serving: "Serves 12–14" },
      { size: "2 kg", price: 2800, serving: "Serves 16–20" }
    ]
  },

  // --- CAKES ---
  {
    id: "cake-ganache",
    category: "cakes",
    name: "Chocolate Ganache Cake",
    image: "images/chocolate_ganache_cake.jpg",
    badge: "100% Couverture",
    isEggless: true,
    flavorNotes: "54% dark couverture chocolate silk & tender cocoa sponge",
    description: "Tender, feather-light dark chocolate sponge enveloped in silky, melt-in-mouth dark couverture ganache crafted with genuine cocoa butter.",
    ingredients: "Pure dark couverture chocolate, organic cocoa, dairy cream",
    options: [
      { size: "Bento (~250–350g)", price: 500, serving: "Serves 1–2 · Petite Gift" },
      { size: "500 g", price: 650, serving: "Serves 4–5" },
      { size: "1 kg", price: 1200, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 1750, serving: "Serves 12–14" },
      { size: "2 kg", price: 2300, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cake-redvelvet",
    category: "cakes",
    name: "Red Velvet Cake",
    image: "images/red_velvet_cake.jpg",
    badge: "Classic Elegance",
    isEggless: true,
    flavorNotes: "Delicate cocoa buttermilk crumb with whipped cream cheese",
    description: "Velvety, soft-crumbed ruby sponge delicately infused with cocoa, paired with whipped cream cheese frosting that delivers an airy, sophisticated tang.",
    ingredients: "Cultured buttermilk alternative, pure cream cheese frosting, cocoa",
    options: [
      { size: "Bento (~250–350g)", price: 500, serving: "Serves 1–2 · Petite Gift" },
      { size: "500 g", price: 650, serving: "Serves 4–5" },
      { size: "1 kg", price: 1200, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 1750, serving: "Serves 12–14" },
      { size: "2 kg", price: 2300, serving: "Serves 16–20" }
    ]
  },
  {
    id: "cake-nakednutella",
    category: "cakes",
    name: "Naked Chocolate Nutella Cake",
    image: "images/naked_nutella_cake.jpg",
    badge: "Celebration Showstopper",
    isEggless: true,
    flavorNotes: "Multi-layered cocoa sponge, luscious Nutella & glossy drip",
    description: "Showstopping semi-frosted rustic celebration cake. Moist chocolate cake tiers filled with generous Nutella fudge and finished with a glossy couverture chocolate drip.",
    ingredients: "Pure Nutella, dark couverture chocolate, artisanal cocoa sponge",
    options: [
      { size: "Bento (~250–350g)", price: 550, serving: "Serves 1–2 · Petite Gift" },
      { size: "500 g", price: 750, serving: "Serves 4–5" },
      { size: "1 kg", price: 1400, serving: "Serves 8–10" },
      { size: "1.5 kg", price: 2050, serving: "Serves 12–14" },
      { size: "2 kg", price: 2700, serving: "Serves 16–20" }
    ]
  },

  // --- BROWNIES ---
  {
    id: "brownie-classic",
    category: "brownies",
    name: "Classic Fudgy Brownies",
    image: "images/classic_fudge_brownie.jpg",
    badge: "Gooey Center",
    isEggless: true,
    flavorNotes: "Crinkly paper-thin top, molten center, deep cocoa aroma",
    description: "The gold standard brownie. Glossy crinkle crust giving way to an intensely fudgy, molten center baked with pure melted dark couverture chocolate.",
    ingredients: "Dark couverture chocolate, Dutch-processed cocoa, dairy butter",
    options: [
      { size: "Box of 4", price: 450, isBox: true, serving: "4 Large Squares" },
      { size: "Per piece (Min 4 pcs)", price: 120, minQty: 4, serving: "Min 4 pcs" }
    ]
  },
  {
    id: "brownie-nutella",
    category: "brownies",
    name: "Nutella Brownies",
    image: "images/nutella_fudge_brownie.jpg",
    badge: "Double Indulgence",
    isEggless: true,
    flavorNotes: "Nutella ripple ribbons baked into fudgy couverture crumb",
    description: "Our signature dense brownie batter swirled generously with thick ribbons of pure Nutella hazelnut cream before going into the oven.",
    ingredients: "Pure Nutella, couverture chocolate, butter, vanilla bean",
    options: [
      { size: "Box of 4", price: 500, isBox: true, serving: "4 Large Squares" },
      { size: "Per piece (Min 4 pcs)", price: 130, minQty: 4, serving: "Min 4 pcs" }
    ]
  },
  {
    id: "brownie-biscoff",
    category: "brownies",
    name: "Lotus Biscoff Brownies",
    image: "images/biscoff_fudge_brownie.jpg",
    badge: "Caramel Crunch",
    isEggless: true,
    flavorNotes: "Spiced speculoos cookie crunch baked atop fudgy chocolate",
    description: "Deep dark chocolate fudgy brownies crowned with a molten swirl of Lotus Biscoff butter and crunchy caramelized biscuit crumble.",
    ingredients: "Lotus Biscoff spread, speculoos biscuits, couverture chocolate",
    options: [
      { size: "Box of 4", price: 500, isBox: true, serving: "4 Large Squares" },
      { size: "Per piece (Min 4 pcs)", price: 130, minQty: 4, serving: "Min 4 pcs" }
    ]
  },

  // --- MUFFINS ---
  {
    id: "muffin-chocolate",
    category: "muffins",
    name: "Bakery Chocolate Muffins",
    image: "images/chocolate_chunk_muffin.jpg",
    badge: "Jumbo Dome",
    isEggless: true,
    flavorNotes: "High-domed, moist cocoa crumb studded with couverture chunks",
    description: "Generous artisanal bakery-style high dome muffins with a soft, moist crumb bursting with pockets of melted dark couverture chocolate in every bite.",
    ingredients: "Couverture chocolate chunks, rich cocoa crumb, golden crust",
    options: [
      { size: "Box of 4", price: 380, isBox: true, serving: "4 Jumbo Muffins" },
      { size: "Per piece (Min 4 pcs)", price: 100, minQty: 4, serving: "Min 4 pcs" }
    ]
  },
  {
    id: "muffin-vanilla",
    category: "muffins",
    name: "Golden Vanilla Muffins",
    image: "images/vanilla_bakery_muffin.jpg",
    badge: "Pillowy Soft",
    isEggless: true,
    flavorNotes: "Warm bourbon vanilla aroma with a tender buttery crumble",
    description: "Classic bakery dome muffins with a golden caramelized crust, fragrant with warm pure vanilla and baked to an impossibly tender, pillowy crumb.",
    ingredients: "Bourbon vanilla, dairy butter, golden caramelized sugar crust",
    options: [
      { size: "Box of 4", price: 380, isBox: true, serving: "4 Jumbo Muffins" },
      { size: "Per piece (Min 4 pcs)", price: 100, minQty: 4, serving: "Min 4 pcs" }
    ]
  },

  // --- CUPCAKES ---
  {
    id: "cupcake-strawberry",
    category: "cupcakes",
    name: "Strawberry Swirl Cupcakes",
    image: "images/strawberry_swirl_cupcake.jpg",
    badge: "Berry Whipped",
    isEggless: true,
    flavorNotes: "Vanilla sponge piped with silky real strawberry buttercream",
    description: "Feather-light golden sponge cupcakes crowned with luscious swirls of real strawberry fruit buttercream and delicate garnish.",
    ingredients: "Farm strawberry reduction, vanilla sponge, velvety buttercream",
    options: [
      { size: "Box of 4", price: 180, isBox: true, serving: "Box of 4 Treats" },
      { size: "Box of 6", price: 270, isBox: true, serving: "Box of 6 Treats" }
    ]
  },
  {
    id: "cupcake-blueberry",
    category: "cupcakes",
    name: "Blueberry Bliss Cupcakes",
    image: "images/blueberry_swirl_cupcake.jpg",
    badge: "Fresh Swirl",
    isEggless: true,
    flavorNotes: "Tender vanilla crumb paired with wild blueberry cream",
    description: "Airy vanilla sponge cupcakes generously piped with vibrant wild blueberry swirl buttercream, offering a delicate floral berry sweetness.",
    ingredients: "Wild blueberry compote, golden vanilla crumb, buttercream",
    options: [
      { size: "Box of 4", price: 180, isBox: true, serving: "Box of 4 Treats" },
      { size: "Box of 6", price: 270, isBox: true, serving: "Box of 6 Treats" }
    ]
  },
  {
    id: "cupcake-chocolate",
    category: "cupcakes",
    name: "Dark Chocolate Couverture Cupcakes",
    image: "images/chocolate_ganache_cupcake.jpg",
    badge: "Pure Indulgence",
    isEggless: true,
    flavorNotes: "Rich cocoa base piped with whipped dark chocolate ganache",
    description: "Intense, moist cocoa cupcakes crowned with an opulent, velvety swirl of whipped dark couverture chocolate ganache.",
    ingredients: "54% dark couverture chocolate, Dutch cocoa, rich ganache swirl",
    options: [
      { size: "Box of 4", price: 300, isBox: true, serving: "Box of 4 Treats" },
      { size: "Box of 6", price: 450, isBox: true, serving: "Box of 6 Treats" }
    ]
  }
];

window.PAGE26_FAQS = [
  {
    q: "Why do pre-orders require 1 week's notice?",
    a: "Every single bake at Page 26 is made entirely from scratch in small, artisanal batches. We procure fresh, premium ingredients—including fresh fruit compotes and pure couverture chocolate—specifically for your order. We never freeze or mass-produce ahead of time, ensuring you receive your bake at peak freshness and flavor."
  },
  {
    q: "Are all your cakes and desserts 100% eggless?",
    a: "Yes! 100% of our menu is strictly eggless and vegetarian. We craft our recipes using cultured dairy, cream cheese, and time-honored artisanal techniques to achieve dense, authentic New York cheesecake textures and feather-light sponges without a single egg."
  },
  {
    q: "What is couverture chocolate and why does it matter?",
    a: "Unlike commercial bakeries that use compound chocolate made with hydrogenated vegetable palm fats, Page 26 exclusively uses pure couverture chocolate containing high percentages of real cocoa butter. Couverture melts luxuriously at body temperature, giving a velvety mouthfeel and deep, complex chocolate flavor with zero waxy residue."
  },
  {
    q: "How does delivery work across Bangalore?",
    a: "Because delicate cheesecakes and frosted bakes require careful temperature and handling, we arrange point-to-point delivery across Bangalore via Porter or Dunzo at actual distance-based rates upon dispatch. Alternatively, you can choose free Kitchen Pickup from our Bangalore location and collect your order at your convenience."
  },
  {
    q: "Can I add a custom message or request specific toppings on my cake?",
    a: "Absolutely! When filling out your pre-order details on the website, simply enter your custom message (e.g. 'Happy Birthday Ananya!') in the Cake Message / Notes field. This will be automatically compiled into your WhatsApp pre-order message so our head baker can personalize your cake."
  },
  {
    q: "How should I store my cheesecake or baked goods once received?",
    a: "Cheesecakes must be kept refrigerated at 2°C–5°C and enjoyed cold; they stay fresh for up to 4–5 days. Brownies and muffins can be kept in an airtight container at cool room temperature for 3 days or refrigerated for up to a week. For maximum indulgence, warm your brownies for 10–15 seconds before eating!"
  }
];

window.PAGE26_REVIEWS = [
  {
    name: "Pooja Krishnamurthy",
    locality: "Indiranagar, Bangalore",
    rating: 5,
    highlight: "The best New York Cheesecake in Bangalore!",
    review: "As vegetarians, finding authentic dense New York cheesecake that doesn't feel like gelatin pudding is almost impossible. Page 26's Classic New York is perfection—rich, creamy, authentic biscuit crust. Worth every bit of the 1-week wait!"
  },
  {
    name: "Rohan & Sneha Mehta",
    locality: "Koramangala, Bangalore",
    rating: 5,
    highlight: "The Lotus Biscoff Cheesecake was the star of our party.",
    review: "Ordered the 1 kg Lotus Biscoff Cheesecake for our anniversary. The caramel crunch and silky cream cheese had our guests raving. Plus, ordering directly over WhatsApp was effortless and so personal."
  },
  {
    name: "Arjun Venkatesh",
    locality: "HSR Layout, Bangalore",
    rating: 5,
    highlight: "You can taste the real couverture chocolate.",
    review: "The Fudgy Brownies and Dark Chocolate Ganache cake are leagues ahead of commercial bakeries. Real cocoa butter makes all the difference—no artificial sweetness or palm oil waxy feel. Highly recommended!"
  }
];
