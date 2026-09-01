// Mock Product Catalog for Silver House — Luxury Silver & Spiritual Artifacts Store

export const CATEGORIES = [
  {
    id: "silver-coins-bars",
    name: "Silver Coins & Bars",
    shortName: "Coins & Bars",
    description: "Certified 999 Pure Fine Silver Investment Coins & Festive Embossed Sets",
    heroBanner: "/images/hero_silver_coins.png",
    icon: "Coins",
    subcategories: [
      { id: "pure-999-coins", name: "Pure Silver Coins (999 Purity)" },
      { id: "embossed-festival-coins", name: "Custom Embossed / Festival Coins" },
      { id: "investment-bars", name: "Investment Bars & Ingot Sets" }
    ]
  },
  {
    id: "silver-idols",
    name: "Silver Idols (Murti)",
    shortName: "Silver Murti",
    description: "Sacred 925 & 999 Pure Silver Deity Murti for Home Temple & Car Dashboard",
    heroBanner: "/images/hero_silver_idols.png",
    icon: "Sparkles",
    subcategories: [
      { id: "ganesha-laxmi", name: "Lord Ganesha & Goddess Laxmi" },
      { id: "bal-gopal-krishna", name: "Bal Gopal / Krishna Idols" },
      { id: "dashboard-idols", name: "Pocket & Car Dashboard Idols" },
      { id: "puja-artifacts", name: "Temple & Puja Room Artifacts" },
      { id: "silver-rakhi", name: "Silver Rakhi & Sacred Threads" }
    ]
  },
  {
    id: "utensils-silverware",
    name: "Utensils & Home Silverware",
    shortName: "Home Silverware",
    description: "Pure Silver Dinner Sets, Baby Feeding Utensils & Handcrafted Puja Silverware",
    heroBanner: "/images/hero_silverware.png",
    icon: "Utensils",
    subcategories: [
      { id: "thali-sets", name: "Dinnerware & Thali Sets" },
      { id: "baby-feeding", name: "Baby Feeding Sets (Spoon, Bowl, Glass)" },
      { id: "puja-essentials", name: "Puja Essentials (Diya, Kalash, Bell, Jal Cup)" },
      { id: "drinkware", name: "Drinkware (Glasses, Jugs, Flasks)" }
    ]
  },
  {
    id: "kids-baby",
    name: "Kids & Baby Collection",
    shortName: "Kids & Baby",
    description: "Protective 925 Silver Nazariya, Adjustable Baby Bangles & Newborn Gifts",
    heroBanner: "/images/hero_baby_nazariya.png",
    icon: "Baby",
    subcategories: [
      { id: "silver-nazariya", name: "Silver Nazariya (Black Bead Bracelets & Anklets)" },
      { id: "baby-bangles", name: "Adjustable Baby Bangles & Bracelets" },
      { id: "kids-anklets", name: "Kids Anklets (Payal)" },
      { id: "newborn-gifts", name: "Newborn Gift Sets" }
    ]
  },
  {
    id: "sacred-rudraksha",
    name: "Sacred Rudraksha Collection",
    shortName: "Sacred Rudraksha",
    description: "Lab Certified 1 to 14 Mukhi Rudraksha Beads Encased in 925 Silver",
    heroBanner: "/images/hero_sacred_rudraksha.png",
    icon: "ShieldCheck",
    subcategories: [
      { id: "certified-beads", name: "1 Mukhi to 14 Mukhi Certified Beads" },
      { id: "silver-capped-mala", name: "Silver-Capped Rudraksha Mala & Bracelets" },
      { id: "rudraksha-lockets", name: "Rudraksha & Silver Combination Lockets" }
    ]
  },
  {
    id: "custom-gifting",
    name: "Custom & Personalized Gifts",
    shortName: "Custom Gifts",
    description: "Handcrafted Custom Yatra Lockets, Engraved Coins & Festive Hampers",
    heroBanner: "/images/hero_yatra_locket.png",
    icon: "Gift",
    subcategories: [
      { id: "custom-yatra-lockets", name: "Custom Yatra / Shrine Lockets (Made on Order)" },
      { id: "engraved-coins", name: "Engraved Silver Coins & Utensils" },
      { id: "corporate-hampers", name: "Corporate & Festive Gifting Hampers" }
    ]
  }
];

export const PRODUCTS = [
  // 1. SILVER COINS & BARS
  {
    id: "coin-laxmi-ganesh-999-10g",
    name: "999 Fine Silver Lakshmi Ganesh Blessed 10g Coin",
    category: "silver-coins-bars",
    subcategory: "embossed-festival-coins",
    purity: "999 Fine Pure Silver",
    purityCode: "999",
    weightGrams: 10,
    price: 1850,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Puja, Gifting",
    images: [
      "/images/pure_silver_coin_lakshmi_ganesh.png",
      "/images/hero_silver_coins.png"
    ],
    shortDesc: "Double-sided embossed Goddess Lakshmi and Lord Ganesha coin crafted in 999 fine pure silver with Tamper-Proof BIS Hallmark Blister Packaging.",
    specs: {
      "Metal Purity": "999 Fine Pure Silver (99.9% Purity)",
      "Weight": "10 Grams",
      "Diameter": "32 mm",
      "Packaging": "Tamper-Proof Blister Card with BIS Certificate",
      "Ideal For": "Diwali Puja, Wedding Gift, Housewarming Blessed Gift"
    }
  },
  {
    id: "bar-pure-silver-50g",
    name: "Silver House 999 Pure Silver Investment Bar (50 Grams)",
    category: "silver-coins-bars",
    subcategory: "investment-bars",
    purity: "999 Fine Pure Silver",
    purityCode: "999",
    weightGrams: 50,
    price: 8450,
    originalPrice: 9500,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    isBestSeller: true,
    isCustomizable: true,
    recipient: "Investment, Gifting",
    images: [
      "/images/hero_silver_coins.png",
      "/images/pure_silver_coin_lakshmi_ganesh.png"
    ],
    shortDesc: "High-polish Swiss-style ingot bar cast in 999 fine silver. Includes serial number engraving and assay verification stamp.",
    specs: {
      "Metal Purity": "999 Fine Silver",
      "Weight": "50 Grams",
      "Dimensions": "45mm x 25mm x 4mm",
      "Certification": "NABL Lab Assay Certified",
      "Custom Engraving": "Available on request (Name/Date)"
    }
  },
  {
    id: "coin-diwali-shubh-labh-20g",
    name: "Shubh Labh Floral Oval Silver Coin (20 Grams)",
    category: "silver-coins-bars",
    subcategory: "pure-999-coins",
    purity: "999 Fine Pure Silver",
    purityCode: "999",
    weightGrams: 20,
    price: 3600,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 67,
    inStock: true,
    isBestSeller: false,
    isCustomizable: false,
    recipient: "Puja, Gifting",
    images: [
      "/images/pure_silver_coin_lakshmi_ganesh.png",
      "/images/hero_silver_coins.png"
    ],
    shortDesc: "Oval shaped blessed coin with intricate traditional filigree border and Shubh Labh mantra in Devanagari script.",
    specs: {
      "Metal Purity": "999 Fine Silver",
      "Weight": "20 Grams",
      "Shape": "Oval Medallion",
      "Finish": "Antique Matte & Mirror Shine Dual Finish"
    }
  },

  // 2. SILVER IDOLS (MURTI)
  {
    id: "idol-pure-ganesha-sitting-50g",
    name: "Divine 925 Silver Sitting Siddhivinayak Ganesha Idol",
    category: "silver-idols",
    subcategory: "ganesha-laxmi",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 55,
    price: 9800,
    originalPrice: 11500,
    rating: 4.9,
    reviewsCount: 210,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Puja, Gifting",
    images: [
      "/images/hero_silver_idols.png",
      "/images/product_bal_gopal.png"
    ],
    shortDesc: "Intricately carved Lord Ganesha seated on a lotus throne with trunk turned left for prosperity and obstacle removal.",
    specs: {
      "Metal Purity": "925 Sterling Silver with Anti-Tarnish Lacquer",
      "Weight": "55 Grams",
      "Height": "3.5 Inches",
      "Base": "Solid Silver Lotus Base",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "idol-bal-gopal-silver-30g",
    name: "Laddoo Gopal / Bal Krishna Playing Flute Silver Idol",
    category: "silver-idols",
    subcategory: "bal-gopal-krishna",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 32,
    price: 5950,
    originalPrice: 6900,
    rating: 4.9,
    reviewsCount: 118,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Puja, Gifting",
    images: [
      "/images/product_bal_gopal.png",
      "/images/hero_silver_idols.png"
    ],
    shortDesc: "Charming Bal Gopal Krishna idol with peacock feather crown detail, ideal for home mandir and Janmashtami celebrations.",
    specs: {
      "Metal Purity": "925 Hallmarked Silver",
      "Weight": "32 Grams",
      "Height": "2.8 Inches",
      "Craftsmanship": "Handcrafted Electro-Forming Technology"
    }
  },
  {
    id: "idol-car-dashboard-ganesha-acrylic",
    name: "Car Dashboard Sacred Ganesha Frame in 999 Silver",
    category: "silver-idols",
    subcategory: "dashboard-idols",
    purity: "999 Fine Pure Silver",
    purityCode: "999",
    weightGrams: 15,
    price: 3200,
    originalPrice: 3800,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Gifting",
    images: [
      "/images/product_car_dashboard.png",
      "/images/hero_silver_idols.png"
    ],
    shortDesc: "3D Swiss-foil 999 pure silver Ganesha idol encased in crystal clear scratch-resistant acrylic frame with 3M adhesive bottom.",
    specs: {
      "Silver Foil Purity": "999 Pure Silver Foil",
      "Weight": "15 Grams Silver Content",
      "Dimensions": "2.5 x 2.5 x 3 Inches",
      "Feature": "UV Resistant Acrylic Dome + 3M Base Tape"
    }
  },
  {
    id: "silver-rakhi-divine-om",
    name: "925 Pure Silver Divine OM & Ganesha Rakhi",
    category: "silver-idols",
    subcategory: "silver-rakhi",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 5,
    price: 999,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 68,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Brother, Family, Puja",
    images: [
      "/images/pure_silver_coin_lakshmi_ganesh.png",
      "/images/hero_silver_idols.png"
    ],
    shortDesc: "Blessed 925 sterling silver Om & Ganesha Rakhi handcrafted with resham thread. Includes BIS hallmark authenticity card.",
    specs: {
      "Metal Purity": "925 Sterling Silver",
      "Weight": "5 Grams",
      "Thread Material": "Pure Resham Thread with Silver Beads",
      "Ideal For": "Raksha Bandhan, Brother Gifting"
    }
  },

  // 3. UTENSILS & HOME SILVERWARE
  {
    id: "thali-set-5piece-royal-silver",
    name: "Royal Heritage 925 Silver 5-Piece Dinner Thali Set",
    category: "utensils-silverware",
    subcategory: "thali-sets",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 480,
    price: 78500,
    originalPrice: 89000,
    rating: 5.0,
    reviewsCount: 45,
    inStock: true,
    isBestSeller: false,
    isCustomizable: true,
    recipient: "Gifting, Puja",
    images: [
      "/images/hero_silverware.png",
      "/images/product_baby_feeding_set.png"
    ],
    shortDesc: "Complete 5-piece royal dinnerware set comprising 11-inch Silver Thali, 2 Bowls, 1 Glass, and 1 Dessert Spoon.",
    specs: {
      "Set Includes": "1 Plate (280g), 2 Bowls (60g x 2), 1 Tumbler Glass (60g), 1 Spoon (20g)",
      "Total Weight": "480 Grams",
      "Metal Purity": "925 Sterling Silver",
      "Purity Certificate": "Government Approved Assay Hallmark"
    }
  },
  {
    id: "baby-feeding-set-3piece",
    name: "Newborn Pure Silver Annaprashan Bowl, Spoon & Glass Set",
    category: "utensils-silverware",
    subcategory: "baby-feeding",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 110,
    price: 17900,
    originalPrice: 21000,
    rating: 4.9,
    reviewsCount: 164,
    inStock: true,
    isBestSeller: true,
    isCustomizable: true,
    recipient: "Baby, Kids",
    images: [
      "/images/product_baby_feeding_set.png",
      "/images/hero_silverware.png"
    ],
    shortDesc: "Natural antibacterial 925 silver baby feeding set designed with rounded smooth safety edges for Annaprashan and first solid meals.",
    specs: {
      "Includes": "1 Curved Feeding Bowl, 1 Smooth Silver Spoon, 1 Mini Tumbler",
      "Weight": "110 Grams",
      "Safety": "100% Non-Toxic, Lead-Free & Smooth Rounded Edges",
      "Engraving": "Free Baby Name Engraving Included"
    }
  },
  {
    id: "puja-silver-diya-peacock",
    name: "Peacock Engraved Pure Silver Puja Diya (50 Grams)",
    category: "utensils-silverware",
    subcategory: "puja-essentials",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 50,
    price: 8900,
    originalPrice: 10200,
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    isBestSeller: false,
    isCustomizable: false,
    recipient: "Puja",
    images: [
      "/images/product_silver_puja_diya.png",
      "/images/hero_silverware.png"
    ],
    shortDesc: "Traditional oil lamp diya with hand-chased peacock motif backrest, crafted to enhance daily home temple aarti.",
    specs: {
      "Metal Purity": "925 Sterling Silver",
      "Weight": "50 Grams",
      "Height": "3 Inches",
      "Capacity": "Dual Wick Holder"
    }
  },

  // 4. KIDS & BABY COLLECTION
  {
    id: "baby-nazariya-silver-bead-bracelet",
    name: "Protective Black Bead & 925 Silver Baby Nazariya (Pair)",
    category: "kids-baby",
    subcategory: "silver-nazariya",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 12,
    price: 2450,
    originalPrice: 2990,
    rating: 5.0,
    reviewsCount: 340,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Baby, Kids",
    images: [
      "/images/hero_baby_nazariya.png",
      "/images/product_kids_payal.png"
    ],
    shortDesc: "Traditional evil-eye protection pair of adjustable bracelets with natural crystal black beads and certified 925 silver charm balls.",
    specs: {
      "Set": "Pair of 2 Bracelets (Wrist/Anklet)",
      "Metal": "925 Sterling Silver",
      "Adjustability": "3.5 to 5 Inches (Fits 0-3 Years)",
      "Skin Safety": "Hypoallergenic, Nickel-Free Silver"
    }
  },
  {
    id: "adjustable-silver-baby-bangles-ghungroo",
    name: "Silver Ghungroo Bell Adjustable Baby Bangles (Pair)",
    category: "kids-baby",
    subcategory: "baby-bangles",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 24,
    price: 4400,
    originalPrice: 5200,
    rating: 4.9,
    reviewsCount: 195,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Baby, Kids",
    images: [
      "/images/hero_baby_nazariya.png",
      "/images/product_kids_payal.png"
    ],
    shortDesc: "Soft jingling bell sound bangles with expandable self-adjusting mechanism suitable for babies from 6 months up to 4 years.",
    specs: {
      "Weight": "24 Grams (Pair)",
      "Purity": "925 Hallmarked Sterling Silver",
      "Mechanism": "Smooth Expandable Pipe Joints",
      "Sound": "Gentle Melodious Ghungroo Chiming"
    }
  },
  {
    id: "kids-silver-payal-anklet-flower",
    name: "Little Princess Silver Payal Anklet with Floral Charms",
    category: "kids-baby",
    subcategory: "kids-anklets",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 18,
    price: 3250,
    originalPrice: 3800,
    rating: 4.8,
    reviewsCount: 86,
    inStock: true,
    isBestSeller: false,
    isCustomizable: false,
    recipient: "Kids",
    images: [
      "/images/product_kids_payal.png",
      "/images/hero_baby_nazariya.png"
    ],
    shortDesc: "Delicate silver chain anklet adorned with pink enamel floral drops and protective silver bell charms.",
    specs: {
      "Length": "6.5 Inches + 1 Inch Extension",
      "Purity": "925 Sterling Silver",
      "Weight": "18 Grams Pair"
    }
  },

  // 5. SACRED RUDRAKSHA COLLECTION
  {
    id: "rudraksha-1-mukhi-certified-silver-casing",
    name: "Original Lab Certified 1 Mukhi Half Moon Rudraksha in 925 Silver",
    category: "sacred-rudraksha",
    subcategory: "certified-beads",
    purity: "925 Silver Casing",
    purityCode: "925",
    weightGrams: 8,
    price: 12500,
    originalPrice: 15000,
    rating: 5.0,
    reviewsCount: 94,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Puja, Self",
    images: [
      "/images/hero_sacred_rudraksha.png",
      "/images/product_rudraksha_5_mukhi.png"
    ],
    shortDesc: "Authentic Kaju-shaped 1 Mukhi Rameshwaram Rudraksha bead encased in ornamental 925 silver frame with hanging loop. Includes IGL Lab Report.",
    specs: {
      "Rudra Mukhi": "1 Mukhi (Lord Shiva Consciousness)",
      "Origin": "Rameshwaram / South India",
      "Casing Material": "925 Sterling Silver",
      "Lab Certificate": "Includes Physical Govt-Approved Gemological Report",
      "Benefits": "Focus, Higher Consciousness, Peace & Vitality"
    }
  },
  {
    id: "rudraksha-5-mukhi-mala-silver-capped",
    name: "5 Mukhi Indonesian Rudraksha Mala (54 Beads) with 925 Silver Caps",
    category: "sacred-rudraksha",
    subcategory: "silver-capped-mala",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 42,
    price: 6800,
    originalPrice: 7900,
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    isBestSeller: true,
    isCustomizable: false,
    recipient: "Puja, Self",
    images: [
      "/images/product_rudraksha_5_mukhi.png",
      "/images/hero_sacred_rudraksha.png"
    ],
    shortDesc: "Hand-strung 54+1 bead sacred Rudraksha necklace with each bead securely capped in handcrafted silver caps and silver wire link chain.",
    specs: {
      "Bead Count": "54 + 1 Guru Bead",
      "Bead Size": "8 mm Diameter",
      "Metal Capping": "925 Pure Silver",
      "Length": "28 Inches Overall"
    }
  },

  // 6. CUSTOM & PERSONALIZED GIFTS
  {
    id: "custom-yatra-locket-made-on-order",
    name: "Custom Made-on-Order Silver Yatra / Shrine Sacred Locket",
    category: "custom-gifting",
    subcategory: "custom-yatra-lockets",
    purity: "925 Sterling Silver",
    purityCode: "925",
    weightGrams: 16,
    price: 4950,
    originalPrice: 5800,
    rating: 5.0,
    reviewsCount: 280,
    inStock: true,
    isBestSeller: true,
    isCustomizable: true,
    isYatraLocket: true,
    recipient: "Custom, Gifting, Self",
    images: [
      "/images/hero_yatra_locket.png",
      "/images/pure_silver_coin_lakshmi_ganesh.png"
    ],
    shortDesc: "Specialized sacred locket crafted on order. Upload your pilgrimage shrine deity photo (Kedarnath, Vaishno Devi, Tirupati, Badrinath) and engrave your family name/gotra on the reverse silver plate.",
    specs: {
      "Customization": "Deity Photo Insert + Back Name/Date/Mantra Engraving",
      "Metal Purity": "925 Sterling Silver Frame with Waterproof Crystal Lens",
      "Weight": "16 Grams",
      "Crafting Time": "Handcrafted in 3-5 Working Days",
      "Chain": "Comes with complimentary 18-inch 925 silver chain"
    }
  },
  {
    id: "custom-engraved-silver-coin-giftbox",
    name: "Custom Photo & Name Engraved 999 Silver Coin (20 Grams)",
    category: "custom-gifting",
    subcategory: "engraved-coins",
    purity: "999 Fine Pure Silver",
    purityCode: "999",
    weightGrams: 20,
    price: 3950,
    originalPrice: 4600,
    rating: 4.9,
    reviewsCount: 140,
    inStock: true,
    isBestSeller: true,
    isCustomizable: true,
    recipient: "Custom, Gifting",
    images: [
      "/images/pure_silver_coin_lakshmi_ganesh.png",
      "/images/hero_silver_coins.png"
    ],
    shortDesc: "Precision fiber-laser engraved coin featuring high definition photo engraving on front and personalized message on back.",
    specs: {
      "Metal": "999 Fine Pure Silver",
      "Weight": "20 Grams",
      "Customization": "High Resolution Laser Engraved Portrait + Text",
      "Packaging": "Luxury Velvet Gift Box with LED Lighting"
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    date: "2 days ago",
    comment: "The Custom Yatra Locket with Kedarnath Mahadev image came out beyond divine! The 925 silver craftsmanship is so authentic and heavy. Packaging was immaculate with the Hallmark certificate.",
    product: "Custom Silver Yatra Locket",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Rajesh Kulkarni",
    location: "Pune",
    rating: 5,
    date: "1 week ago",
    comment: "Bought the 50g 999 Silver Ganesha Murti for our new office mandir. Absolutely flawless mirror shine and pure silver stamp. Delivered safely within 48 hours to Pune!",
    product: "Divine 925 Silver Sitting Ganesha",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Priyanka & Dr. Dev",
    location: "Delhi NCR",
    rating: 5,
    date: "3 weeks ago",
    comment: "The Silver Nazariya for our newborn daughter is so soft on her skin and the jingling Ghungroos bring so much joy to our house. Highly recommend Silver House for baby gifting!",
    product: "Silver Ghungroo Baby Bangles",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  }
];

export const PROMO_CODES = {
  "SACRED10": { discountPercent: 10, minAmount: 1000, desc: "10% OFF on your first sacred purchase" },
  "SILVERVIP": { discountFlat: 500, minAmount: 3000, desc: "₹500 Flat OFF on orders above ₹3,000" },
  "YATRA2026": { discountPercent: 15, minAmount: 4000, desc: "15% OFF on Custom Yatra Lockets" }
};

export const PINCODES = {
  "110001": { status: "Available", city: "New Delhi", estDays: "2-3 Business Days", cod: true },
  "400001": { status: "Available", city: "Mumbai", estDays: "1-2 Business Days", cod: true },
  "560001": { status: "Available", city: "Bengaluru", estDays: "2-3 Business Days", cod: true },
  "700001": { status: "Available", city: "Kolkata", estDays: "3-4 Business Days", cod: true },
  "600001": { status: "Available", city: "Chennai", estDays: "3-4 Business Days", cod: true },
  "380001": { status: "Available", city: "Ahmedabad", estDays: "2 Business Days", cod: true }
};
