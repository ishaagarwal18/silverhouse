// Product Catalog matching MS SQL Backend Database Schema (dbo.category & dbo.product)

export const CATEGORIES = [
  {
    id: "silver-rings",
    category_id: 1,
    name: "Silver Rings",
    shortName: "Rings",
    description: "Designer 925 sterling silver rings and bands",
    heroBanner: "/images/hero_silver_coins.png",
    icon: "Sparkles",
    idealFor: "Women",
    subcategories: [
      { id: "solitaire-rings", name: "Solitaire & Halo Rings" },
      { id: "floral-bands", name: "Floral Silver Bands" }
    ]
  },
  {
    id: "silver-pendants-chains",
    category_id: 2,
    name: "Silver Pendants & Chains",
    shortName: "Pendants & Chains",
    description: "Minimalist and devotional silver chains and lockets",
    heroBanner: "/images/hero_yatra_locket.png",
    icon: "Sparkles",
    idealFor: "Women",
    subcategories: [
      { id: "lotus-mandala", name: "Lotus Mandala Pendants" },
      { id: "devotional-lockets", name: "Devotional Lockets & Chains" }
    ]
  },
  {
    id: "silver-bangles-kadas",
    category_id: 3,
    name: "Silver Bangles & Kadas",
    shortName: "Bangles & Kadas",
    description: "Traditional antique kadas and dailywear silver bangles",
    heroBanner: "/images/hero_silverware.png",
    icon: "Sparkles",
    idealFor: "Women",
    subcategories: [
      { id: "filigree-kadas", name: "Royal Filigree Kadas" },
      { id: "dailywear-bangles", name: "Dailywear Silver Bangles" }
    ]
  },
  {
    id: "silver-payal-anklets",
    category_id: 4,
    name: "Silver Payal & Anklets",
    shortName: "Payal & Anklets",
    description: "Ethnic bridal payals and lightweight dailywear anklets",
    heroBanner: "/images/hero_baby_nazariya.png",
    icon: "Sparkles",
    idealFor: "Women",
    subcategories: [
      { id: "bridal-ghungroo", name: "Bridal Ghungroo Payal" },
      { id: "lightweight-anklets", name: "Lightweight Daily Anklets" }
    ]
  },
  {
    id: "silver-religious-idols",
    category_id: 5,
    name: "Silver Religious Idols",
    shortName: "Religious Idols",
    description: "Pure 999 fine silver devotional murti and puja items",
    heroBanner: "/images/hero_silver_idols.png",
    icon: "Sparkles",
    idealFor: "ALL",
    subcategories: [
      { id: "ganesha-laxmi-murti", name: "Ganesha & Laxmi Murti Set" },
      { id: "puja-temple-idols", name: "Puja Room Deity Idols" }
    ]
  },
  {
    id: "silver-coins-bars",
    category_id: 6,
    name: "Silver Coins & Bars",
    shortName: "Coins & Bars",
    description: "Hallmarked 999 fine silver investment coins and bars",
    heroBanner: "/images/hero_silver_coins.png",
    icon: "Coins",
    idealFor: "ALL",
    subcategories: [
      { id: "lotus-temple-coin", name: "Lotus Temple Coins" },
      { id: "investment-bars", name: "Investment Bullion Bars" }
    ]
  },
  {
    id: "men-silver-collection",
    category_id: 7,
    name: "Men Silver Collection",
    shortName: "Men Collection",
    description: "Bold silver bracelets and rings crafted for men",
    heroBanner: "/images/hero_sacred_rudraksha.png",
    icon: "ShieldCheck",
    idealFor: "Men",
    subcategories: [
      { id: "curb-link-bracelets", name: "Heavy Curb Link Bracelets" },
      { id: "men-rings-kada", name: "Masculine Rings & Kadas" }
    ]
  },
  {
    id: "kids-nazariya-bracelets",
    category_id: 8,
    name: "Kids Nazariya & Bracelets",
    shortName: "Kids Collection",
    description: "Protective silver nazariya beads and charm bracelets",
    heroBanner: "/images/hero_baby_nazariya.png",
    icon: "Baby",
    idealFor: "Kids",
    subcategories: [
      { id: "evil-eye-nazariya", name: "Evil Eye Silver Nazariya" },
      { id: "baby-bangles", name: "Baby Charm Bracelets" }
    ]
  }
];

export const PRODUCTS = [
  {
    id: "301",
    name: "Pure 999 Silver Ganesha Laxmi Murti Set",
    category: "silver-religious-idols",
    category_name: "Silver Religious Idols",
    category_id: 5,
    purity: "99.9 Pure",
    purityCode: "999",
    weightGrams: 45.00,
    price: 7499,
    originalPrice: 7499,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    quantity: 12,
    ideal_for: "ALL",
    packaging: "Hard Velvet Box",
    labour_cost: 850,
    actual_cost: 5800,
    priority: 100,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Divine handcrafted silver idols with antique polish for puja temple.",
    specs: {
      "Metal Purity": "99.9 Pure Silver",
      "Net Weight": "45.00 Grams",
      "Packaging": "Hard Velvet Box",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "302",
    name: "Solitaire Halo Floral Silver Ring",
    category: "silver-rings",
    category_name: "Silver Rings",
    category_id: 1,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 4.20,
    price: 2374,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 34,
    inStock: true,
    quantity: 25,
    ideal_for: "Women",
    packaging: "Ring Box",
    labour_cost: 300,
    actual_cost: 1750,
    priority: 80,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Sparkling cubic zirconia studded silver band with floral crown.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "4.20 Grams",
      "Packaging": "Ring Box",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "303",
    name: "Heritage Filigree Openable Kada",
    category: "silver-bangles-kadas",
    category_name: "Silver Bangles & Kadas",
    category_id: 3,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 38.50,
    price: 8909,
    originalPrice: 9899,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
    quantity: 8,
    ideal_for: "Women",
    packaging: "Royal Box",
    labour_cost: 1400,
    actual_cost: 7200,
    priority: 70,
    images: [
      "https://images.unsplash.com/photo-1611591475285-a29ae287f480?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Traditional royal handcrafted openable broad silver kada.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "38.50 Grams",
      "Packaging": "Royal Box",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "304",
    name: "Lotus Mandala Silver Pendant Chain",
    category: "silver-pendants-chains",
    category_name: "Silver Pendants & Chains",
    category_id: 2,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 7.80,
    price: 3299,
    originalPrice: 3299,
    rating: 4.7,
    reviewsCount: 41,
    inStock: true,
    quantity: 18,
    ideal_for: "Women",
    packaging: "Sleek Pouch",
    labour_cost: 350,
    actual_cost: 2300,
    priority: 60,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Modern laser cut devotional lotus pendant with sleek link chain.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "7.80 Grams",
      "Packaging": "Sleek Pouch",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "305",
    name: "Heavy Curb Link Silver Men Bracelet",
    category: "men-silver-collection",
    category_name: "Men Silver Collection",
    category_id: 7,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 28.00,
    price: 5979,
    originalPrice: 6499,
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    quantity: 14,
    ideal_for: "Men",
    packaging: "Leather Box",
    labour_cost: 650,
    actual_cost: 4800,
    priority: 50,
    images: [
      "https://images.unsplash.com/photo-1611591475285-a29ae287f480?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Solid high-polish masculine link bracelet with secure box lock.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "28.00 Grams",
      "Packaging": "Leather Box",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "306",
    name: "Bridal Ghungroo Chandi Payal Pair",
    category: "silver-payal-anklets",
    category_name: "Silver Payal & Anklets",
    category_id: 4,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 42.00,
    price: 8999,
    originalPrice: 8999,
    rating: 4.8,
    reviewsCount: 37,
    inStock: true,
    quantity: 10,
    ideal_for: "Women",
    packaging: "Velvet Case",
    labour_cost: 1200,
    actual_cost: 6600,
    priority: 40,
    images: [
      "https://images.unsplash.com/photo-1611591475285-a29ae287f480?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Traditional double-layer chiming ankle bells with oxidised antique finish.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "42.00 Grams",
      "Packaging": "Velvet Case",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "307",
    name: "Evil Eye Black Bead Silver Baby Nazariya",
    category: "kids-nazariya-bracelets",
    category_name: "Kids Nazariya & Bracelets",
    category_id: 8,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 3.50,
    price: 1299,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    quantity: 30,
    ideal_for: "Kids",
    packaging: "Soft Pouch",
    labour_cost: 180,
    actual_cost: 880,
    priority: 30,
    images: [
      "https://images.unsplash.com/photo-1611591475285-a29ae287f480?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Protective silver charm nazariya pair with adjustable smooth lock.",
    specs: {
      "Metal Purity": "92.5 Sterling Silver",
      "Net Weight": "3.50 Grams",
      "Packaging": "Soft Pouch",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "308",
    name: "999 Fine Silver Lotus Temple Coin (10g)",
    category: "silver-coins-bars",
    category_name: "Silver Coins & Bars",
    category_id: 6,
    purity: "99.9 Pure",
    purityCode: "999",
    weightGrams: 10.00,
    price: 1799,
    originalPrice: 1799,
    rating: 5.0,
    reviewsCount: 112,
    inStock: true,
    quantity: 50,
    ideal_for: "ALL",
    packaging: "Blister Pack",
    labour_cost: 120,
    actual_cost: 1520,
    priority: 20,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    ],
    shortDesc: "Government certified tamper-proof blister card investment bullion coin.",
    specs: {
      "Metal Purity": "99.9 Pure Silver",
      "Net Weight": "10.00 Grams",
      "Packaging": "Blister Pack",
      "Certification": "BIS Hallmarked"
    }
  },
  {
    id: "309",
    name: "Royal Antique Radha Krishna Silver Statue (120g)",
    category: "silver-religious-idols",
    category_name: "Silver Religious Idols",
    category_id: 5,
    purity: "99.9 Pure",
    purityCode: "999",
    weightGrams: 120.00,
    price: 18499,
    originalPrice: 19499,
    rating: 5.0,
    reviewsCount: 18,
    inStock: true,
    quantity: 6,
    ideal_for: "ALL",
    packaging: "Royal Velvet Wooden Box",
    isBestSeller: true,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "310",
    name: "Minimalist Cubic Zirconia Solitaire Ring",
    category: "silver-rings",
    category_name: "Silver Rings",
    category_id: 1,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 3.80,
    price: 1899,
    originalPrice: 1899,
    rating: 4.7,
    reviewsCount: 22,
    inStock: true,
    quantity: 30,
    ideal_for: "Women",
    packaging: "Premium Ring Box",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "311",
    name: "Adjustable Peacock Motif Silver Ring",
    category: "silver-rings",
    category_name: "Silver Rings",
    category_id: 1,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 4.50,
    price: 2299,
    originalPrice: 2550,
    rating: 4.8,
    reviewsCount: 16,
    inStock: true,
    quantity: 20,
    ideal_for: "Women",
    packaging: "Velvet Pouch",
    images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "312",
    name: "Classic Temple Design Silver Bangle Set (Pair)",
    category: "silver-bangles-kadas",
    category_name: "Silver Bangles & Kadas",
    category_id: 3,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 48.00,
    price: 11499,
    originalPrice: 12499,
    rating: 4.9,
    reviewsCount: 14,
    inStock: true,
    quantity: 10,
    ideal_for: "Women",
    packaging: "Hard Velvet Case",
    isBestSeller: true,
    images: ["https://images.unsplash.com/photo-1611591475817-21a44e644675?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "313",
    name: "Oxidised Silver Broad Chandi Kada",
    category: "silver-bangles-kadas",
    category_name: "Silver Bangles & Kadas",
    category_id: 3,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 32.00,
    price: 7899,
    originalPrice: 7899,
    rating: 4.6,
    reviewsCount: 19,
    inStock: true,
    quantity: 12,
    ideal_for: "Women",
    packaging: "Royal Box",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "314",
    name: "Shiv Trishul & Damru Silver Pendant Chain",
    category: "silver-pendants-chains",
    category_name: "Silver Pendants & Chains",
    category_id: 2,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 9.50,
    price: 3899,
    originalPrice: 4099,
    rating: 5.0,
    reviewsCount: 45,
    inStock: true,
    quantity: 25,
    ideal_for: "ALL",
    packaging: "Sleek Gift Box",
    isBestSeller: true,
    images: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "315",
    name: "Tree of Life Sterling Silver Pendant",
    category: "silver-pendants-chains",
    category_name: "Silver Pendants & Chains",
    category_id: 2,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 6.20,
    price: 2699,
    originalPrice: 2699,
    rating: 4.7,
    reviewsCount: 11,
    inStock: true,
    quantity: 15,
    ideal_for: "Women",
    packaging: "Sleek Pouch",
    images: ["https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "316",
    name: "Solid Royal Silver Kada for Men (40g)",
    category: "men-silver-collection",
    category_name: "Men Silver Collection",
    category_id: 7,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 40.00,
    price: 8999,
    originalPrice: 9499,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    quantity: 15,
    ideal_for: "Men",
    packaging: "Leatherette Box",
    isBestSeller: true,
    images: ["https://images.unsplash.com/photo-1620656798579-1984d9e87dfa?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "317",
    name: "Heavy Sterling Silver Cuban Link Chain",
    category: "men-silver-collection",
    category_name: "Men Silver Collection",
    category_id: 7,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 35.00,
    price: 8299,
    originalPrice: 9199,
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    quantity: 10,
    ideal_for: "Men",
    packaging: "Leatherette Box",
    images: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "318",
    name: "Heavy Oxidised Antique Ghungroo Payal",
    category: "silver-payal-anklets",
    category_name: "Silver Payal & Anklets",
    category_id: 4,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 55.00,
    price: 11999,
    originalPrice: 12599,
    rating: 4.9,
    reviewsCount: 15,
    inStock: true,
    quantity: 8,
    ideal_for: "Women",
    packaging: "Velvet Case",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "319",
    name: "Silver Baby Kada with Charm Bells (Pair)",
    category: "kids-nazariya-bracelets",
    category_name: "Kids Nazariya & Bracelets",
    category_id: 8,
    purity: "92.5 Sterling",
    purityCode: "925",
    weightGrams: 8.00,
    price: 2499,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    quantity: 22,
    ideal_for: "Kids",
    packaging: "Gift Pouch",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"]
  },
  {
    id: "320",
    name: "999 Pure Silver Lakshmi Ganesha 50g Bar",
    category: "silver-coins-bars",
    category_name: "Silver Coins & Bars",
    category_id: 6,
    purity: "99.9 Pure",
    purityCode: "999",
    weightGrams: 50.00,
    price: 8499,
    originalPrice: 8499,
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
    quantity: 40,
    ideal_for: "ALL",
    packaging: "Tamper-Evident Blister Card",
    isBestSeller: true,
    images: ["https://images.unsplash.com/photo-1611591475817-21a44e644675?auto=format&fit=crop&w=600&q=80"]
  }
];

export const PINCODES = [
  { code: "110001", city: "New Delhi", state: "Delhi", days: 2, expressAvailable: true, codAvailable: true },
  { code: "400001", city: "Mumbai", state: "Maharashtra", days: 2, expressAvailable: true, codAvailable: true },
  { code: "560001", city: "Bengaluru", state: "Karnataka", days: 3, expressAvailable: true, codAvailable: true },
  { code: "700001", city: "Kolkata", state: "West Bengal", days: 3, expressAvailable: true, codAvailable: true },
  { code: "600001", city: "Chennai", state: "Tamil Nadu", days: 3, expressAvailable: true, codAvailable: true },
  { code: "500001", city: "Hyderabad", state: "Telangana", days: 3, expressAvailable: true, codAvailable: true },
  { code: "380001", city: "Ahmedabad", state: "Gujarat", days: 2, expressAvailable: true, codAvailable: true },
  { code: "302001", city: "Jaipur", state: "Rajasthan", days: 2, expressAvailable: true, codAvailable: true }
];

export const PROMO_CODES = {
  "WELCOME10": { discountPct: 10, minSpend: 1000, label: "10% OFF Welcome Offer" },
  "FESTIVE500": { flatDiscount: 500, minSpend: 4999, label: "₹500 OFF Festive Special" },
  "SILVERPURE": { discountPct: 5, minSpend: 500, label: "5% OFF Pure Silver Artifacts" }
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "New Delhi",
    rating: 5,
    verified: true,
    text: "Ordered the Pure 999 Silver Ganesha Laxmi Murti Set for Diwali Puja. Exceptional craftsmanship, authentic BIS Hallmark certificate, and velvet packaging!",
    productName: "Pure 999 Silver Ganesha Laxmi Murti Set"
  },
  {
    id: 2,
    name: "Priya Malhotra",
    location: "Mumbai",
    rating: 5,
    verified: true,
    text: "The Solitaire Halo Floral Silver Ring is so stunning and lightweight! Perfect 925 sterling silver purity and secure delivery.",
    productName: "Solitaire Halo Floral Silver Ring"
  },
  {
    id: 3,
    name: "Ananya Iyer",
    location: "Bengaluru",
    rating: 5,
    verified: true,
    text: "Got the Lotus Temple 10g 999 Silver Coin for my parents' anniversary. Tamper-proof blister card packaging and instant dispatch!",
    productName: "999 Fine Silver Lotus Temple Coin (10g)"
  }
];
