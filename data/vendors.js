// StreetKart - Dynamic & Local-first Vendor Data Layer
// Fictional Lucknow, Uttar Pradesh Demo Seed Dataset (25 Stalls)
// Compatible with both local testing and Supabase adapter

const defaultVendors = [
  // =========================================================================
  // CATEGORY: SNACKS (7 Vendors)
  // =========================================================================
  {
    id: 1,
    name: "Awadh Chaat Corner",
    category: "Snacks",
    locality: "Hazratganj, Lucknow",
    landmark: "Near Cathedral Church Gate",
    products: ["Basket Chaat", "Pani Batashe", "Dahi Papdi", "Matar Tikki"],
    priceRange: "₹30-90",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 168,
    distance: "350m",
    walkTime: "4 min",
    since: "2011",
    setupType: "Mobile Thela (Cart)",
    timings: "4:00 PM – 10:30 PM",
    verified: false,
    phone: "+91 522 000 0101",
    description: "Famous for crisp potato basket chaat layered with spiced chickpeas, sweet curd, and signature Awadhi jeera water.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Signature Basket Chaat", price: "₹90", desc: "Crispy potato basket filled with spicy chana, sweet curd & chutneys", available: true },
      { name: "Pani Batashe (6 pcs)", price: "₹30", desc: "Crisp puris with spicy heeng and mint coriander jaljeera", available: true },
      { name: "Dahi Papdi Chaat", price: "₹60", desc: "Papdis layered with thick curd, roasted jeera and tamarind glaze", available: true },
      { name: "Matar Tikki Plate", price: "₹50", desc: "Griddled white pea patty topped with diced ginger and lemon", available: true }
    ]
  },
  {
    id: 2,
    name: "Chaurasia Nimish & Khasta",
    category: "Snacks",
    locality: "Chowk, Lucknow",
    landmark: "Near Gol Darwaza Market",
    products: ["Makhan Malai (Nimish)", "Urad Khasta", "Heeng Kachori", "Aloo Jhol"],
    priceRange: "₹25-70",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 194,
    distance: "400m",
    walkTime: "5 min",
    since: "2006",
    setupType: "Brass Corner Stall",
    timings: "6:30 AM – 1:00 PM, 4:30 PM – 9:00 PM",
    verified: false,
    phone: "+91 522 000 0102",
    description: "Traditional Chowk makhan malai whisked with dew, saffron, and pistachios, served with flaky spiced urad khastas.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Nimish / Makhan Malai (Kulhad)", price: "₹70", desc: "Frothy winter milk cream whipped with saffron, pistachio and chandi varq", available: true },
      { name: "Urad Dal Khasta (2 pcs)", price: "₹35", desc: "Flaky deep-fried puris stuffed with spiced urad dal", available: true },
      { name: "Aloo Jhol with Hing Kachori", price: "₹40", desc: "Spicy simmering potato gravy served with crispy kachoris", available: true },
      { name: "Kasturi Methi Poori", price: "₹25", desc: "Fresh fenugreek flavoured fried flatbread with pickle", available: false }
    ]
  },
  {
    id: 3,
    name: "Ganga Prasad Dahi Gujiya",
    category: "Snacks",
    locality: "Aminabad, Lucknow",
    landmark: "Opp. Mohan Market Lane",
    products: ["Dahi Gujiya", "Khasta Papdi", "Katori Chaat", "Saunth Chutney Puris"],
    priceRange: "₹30-80",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 142,
    distance: "250m",
    walkTime: "3 min",
    since: "2014",
    setupType: "Mobile Thela (Cart)",
    timings: "3:30 PM – 10:00 PM",
    verified: false,
    phone: "+91 522 000 0103",
    description: "Famous dry fruit stuffed dahi gujiya soaked in sweetened curd and topped with cumin, black salt, and rich date-tamarind saunth.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Awadhi Dahi Gujiya", price: "₹80", desc: "Soft lentil dumpling stuffed with dry fruits, soaked in sweet spiced curd", available: true },
      { name: "Sev Papdi Chaat", price: "₹45", desc: "Crunchy papdis showered with spiced sev, potatoes and green chillies", available: true },
      { name: "Katori Chaat", price: "₹60", desc: "Fried flour bowl stuffed with boiled sprouts, pomegranate and chutneys", available: true },
      { name: "Pani Puri Khasta Combo", price: "₹30", desc: "Five assorted spiced water hollow puris", available: true }
    ]
  },
  {
    id: 4,
    name: "Gomti Paanch-Pani Batashe",
    category: "Snacks",
    locality: "Gomti Nagar, Lucknow",
    landmark: "Near Patrakarpuram Chauraha",
    products: ["Hing Pani Puri", "Jeera Batashe", "Pudina Batashe", "Meetha Batasha"],
    priceRange: "₹20-50",
    isOpen: true,
    rating: 4.7,
    reviewsCount: 118,
    distance: "180m",
    walkTime: "2 min",
    since: "2018",
    setupType: "Three-wheel Cart",
    timings: "4:00 PM – 10:00 PM",
    verified: false,
    phone: "+91 522 000 0104",
    description: "Crisp hand-rolled batashe served with five distinct cold herbal waters prepared daily with rock salt and roasted spices.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Paanch-Pani Batashe Tasting Plate", price: "₹50", desc: "Heeng, Pudina, Nimbu, Kacha Aam, and Saunth waters", available: true },
      { name: "Classic Heeng Pani Puri", price: "₹20", desc: "Six puris with pungent freshly ground heeng water", available: true },
      { name: "Sweet Dahi Batashe", price: "₹40", desc: "Curd-filled hollow puris with sweet sonth and boondi", available: true },
      { name: "Sukha Puri Bhel", price: "₹30", desc: "Crushed puris with lemon, chopped coriander and masala onions", available: true }
    ]
  },
  {
    id: 5,
    name: "Awadhi Swaad Tikki Kiosk",
    category: "Snacks",
    locality: "Alambagh, Lucknow",
    landmark: "Near Chander Nagar Chauraha",
    products: ["Desi Ghee Aloo Tikki", "Chhole Tikki", "Bhalla Papdi", "Matar Chaat"],
    priceRange: "₹35-80",
    isOpen: false,
    rating: 4.8,
    reviewsCount: 88,
    distance: "650m",
    walkTime: "8 min",
    since: "2015",
    setupType: "Semi-covered Thela",
    timings: "4:30 PM – 10:00 PM",
    verified: false,
    phone: "+91 522 000 0105",
    description: "Golden brown shallow-fried potato patties slow cooked on wide iron tawas with pure ghee, garnished with ginger juliennes.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Desi Ghee Aloo Tikki Plate", price: "₹70", desc: "Slow-roasted potato patties pan-fried in pure ghee with chhole", available: true },
      { name: "Dahi Bhalla Special", price: "₹60", desc: "Velvety lentil bhallas immersed in chilled sweetened yogurt", available: true },
      { name: "Chhole Tikki Masala", price: "₹80", desc: "Double patty covered in spicy Kabuli chana and shredded radish", available: true },
      { name: "Crispy Papdi Plate", price: "₹35", desc: "Dry savoury papdi seasoned with chatpata chaat masala", available: true }
    ]
  },
  {
    id: 6,
    name: "Munna Ji Matar Kulcha Cart",
    category: "Snacks",
    locality: "Indira Nagar, Lucknow",
    landmark: "Near Bhootnath Mandir Tiraha",
    products: ["Sukha Matar Kulcha", "Lemon Onion Salad", "Masala Boondi", "Roasted Jeera Chaat"],
    priceRange: "₹30-60",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 135,
    distance: "300m",
    walkTime: "4 min",
    since: "2013",
    setupType: "Mobile Thela (Cart)",
    timings: "11:00 AM – 8:30 PM",
    verified: false,
    phone: "+91 522 000 0106",
    description: "Steaming dry spiced white peas tossed with roasted cumin, green chillies, and freshly squeezed lemon, served with soft griddled kulchas.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Sukha Matar Kulcha (2 Kulchas)", price: "₹50", desc: "Spiced Lucknowi dry white peas with griddled fluffy kulchas", available: true },
      { name: "Paneer Stuffed Kulcha Plate", price: "₹60", desc: "Kulcha filled with crumbled cottage cheese and fresh herbs", available: true },
      { name: "Masala Boondi Bowl", price: "₹30", desc: "Crispy chickpea pearls tossed with chopped onions and lime", available: true },
      { name: "Spicy Lemon Roasted Pea Bowl", price: "₹35", desc: "Tangy boiled peas seasoned with roasted cumin and green chillies", available: true }
    ]
  },
  {
    id: 7,
    name: "Shahi Rabdi Kulfi Cart",
    category: "Snacks",
    locality: "Hazratganj, Lucknow",
    landmark: "Near Janpath Market Alley",
    products: ["Falooda Kulfi", "Kesar Pista Rabdi", "Matka Malai Kulfi", "Rose Syrup"],
    priceRange: "₹40-90",
    isOpen: false,
    rating: 4.9,
    reviewsCount: 156,
    distance: "500m",
    walkTime: "6 min",
    since: "2009",
    setupType: "Traditional Red-Cloth Handcart",
    timings: "2:00 PM – 11:00 PM",
    verified: false,
    phone: "+91 522 000 0107",
    description: "Slow-reduced rich buffalo milk kulfi stored in frozen terracotta matkas with crushed dry fruits and fragrant kewra water.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkaufeoPOa67U4Pnpmk5xSEDS2hR24LAG52s-8vx70RQ0LhkZR7kaW1adDbJO5uysAVvIR6oUCI-R9IA8JhHnVEVnArqjiWVR_K1-pyKhAiRUzg9GLvSlv0B7c2HgiVkUUJnA5kwii-Lu8Dn8TVpzFleYqhHNYirOaBraWSd0NuABPBohN9s9Y8uiDz8fCmKtcIvPniSQErBR4RjCE0fEn8fGmEgRecgDpUikeAo",
    menuItems: [
      { name: "Royal Falooda Kulfi", price: "₹90", desc: "Dense milk kulfi topped with rose syrup, cornstarch falooda and sabja seeds", available: true },
      { name: "Kesar Pista Matka Kulfi", price: "₹70", desc: "Traditional saffron and pistachio frozen dessert in clay pot", available: true },
      { name: "Rabdi Plate with Rose Essence", price: "₹60", desc: "Slow-simmered layered milk cream infused with cardamoms", available: true },
      { name: "Plain Malai Stick Kulfi", price: "₹40", desc: "Classic condensed milk frozen kulfi on wooden stick", available: true }
    ]
  },

  // =========================================================================
  // CATEGORY: VEGETABLES (5 Vendors)
  // =========================================================================
  {
    id: 8,
    name: "Shambhu Hari Sabzi Mandi Cart",
    category: "Vegetables",
    locality: "Chowk, Lucknow",
    landmark: "Near Akbari Gate Subzi Galli",
    products: ["Palak", "Arbi Ke Patte", "Desi Baingan", "Methi", "Hari Mirch"],
    priceRange: "₹15-50",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 92,
    distance: "320m",
    walkTime: "4 min",
    since: "2012",
    setupType: "Wooden Handcart",
    timings: "6:00 AM – 1:00 PM, 4:00 PM – 8:30 PM",
    verified: false,
    phone: "+91 522 000 0108",
    description: "Morning harvest from local Gomti riverbeds featuring tender spinach, fresh fenugreek, colocasia leaves, and small heirloom eggplants.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgaU9CdU3k1Vyhn9oqDslaKFBCaSjU-FqscMcUFLSwZ8F5Ynpzflv6IceXV5n-aAUSM7w7eujdYi9s6_8KqQjVGu7_bS0HNS071jPekBonjVEpLNo6jwaitGHPYl_Xwoul_BZ2VKLPUw9UnI7pRNAxyinSjDXBuMLO52rym_GxK9okHzJvx68DL4Cc4_2LgbQdqBKTgab493OGvzL_U0U0bvwDsAuR55-ix6IhEEs",
    menuItems: [
      { name: "Desi Palak (1 Bunch)", price: "₹15", desc: "Fresh tender spinach harvested from local Gomti riverbeds", available: true },
      { name: "Arbi Ke Patte (Colocasia Leaves Pack)", price: "₹30", desc: "Selected fresh leaves ideal for steaming Awadhi patode", available: true },
      { name: "Chhoti Gol Baingan (1 kg)", price: "₹40", desc: "Tender purple round eggplants for traditional kalonji", available: true },
      { name: "Fresh Methi Leaves (1 Bunch)", price: "₹20", desc: "Aromatic seasonal fenugreek leaves", available: true },
      { name: "Spicy Hari Mirch & Adrak Pack", price: "₹50", desc: "Assorted fiery local green chillies and root ginger (500g)", available: true }
    ]
  },
  {
    id: 9,
    name: "Ramu Taaza Fal & Shakbhaji",
    category: "Vegetables",
    locality: "Aminabad, Lucknow",
    landmark: "Corner of Pratap Market",
    products: ["Gawar Phali", "Desi Tamatar", "Adrak", "Nimbu", "Kadi Patta"],
    priceRange: "₹10-60",
    isOpen: true,
    rating: 4.7,
    reviewsCount: 104,
    distance: "210m",
    walkTime: "3 min",
    since: "2016",
    setupType: "Three-wheel Green Cart",
    timings: "7:00 AM – 1:30 PM, 4:30 PM – 9:00 PM",
    verified: false,
    phone: "+91 522 000 0109",
    description: "Daily farm-fresh tomatoes, seasonal cluster beans, raw bananas, and aromatic curry leaves brought directly from peri-urban mandis.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgaU9CdU3k1Vyhn9oqDslaKFBCaSjU-FqscMcUFLSwZ8F5Ynpzflv6IceXV5n-aAUSM7w7eujdYi9s6_8KqQjVGu7_bS0HNS071jPekBonjVEpLNo6jwaitGHPYl_Xwoul_BZ2VKLPUw9UnI7pRNAxyinSjDXBuMLO52rym_GxK9okHzJvx68DL4Cc4_2LgbQdqBKTgab493OGvzL_U0U0bvwDsAuR55-ix6IhEEs",
    menuItems: [
      { name: "Fresh Kadi Patta (Curry Leaves)", price: "₹10", desc: "Fresh aromatic garden-picked curry leaf bunch", available: true },
      { name: "Desi Country Tomatoes (1 kg)", price: "₹35", desc: "Juicy tart red tomatoes delivered daily from rural mandis", available: true },
      { name: "Tender Gawar Phali (Cluster Beans 500g)", price: "₹30", desc: "Fresh hand-sorted cluster beans for home curries", available: true },
      { name: "Kachha Kela (Raw Banana Pack of 4)", price: "₹40", desc: "Firm green cooking bananas for cutlets and koftas", available: true },
      { name: "Fresh Lemon (Pack of 8)", price: "₹60", desc: "Thin-skinned juicy yellow table lemons", available: true }
    ]
  },
  {
    id: 10,
    name: "Kisan Fresh Greens Cart",
    category: "Vegetables",
    locality: "Gomti Nagar, Lucknow",
    landmark: "Near Mithaiwala Chauraha",
    products: ["Lauki", "Bhindi", "Torai", "Palak", "Coriander Bunches"],
    priceRange: "₹20-60",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 145,
    distance: "450m",
    walkTime: "5 min",
    since: "2017",
    setupType: "Wooden Handcart",
    timings: "6:30 AM – 12:00 PM, 4:00 PM – 8:00 PM",
    verified: false,
    phone: "+91 522 000 0110",
    description: "Naturally grown green vegetables including tender bottle gourds, okra, washed coriander bunches, and stringless french beans.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgaU9CdU3k1Vyhn9oqDslaKFBCaSjU-FqscMcUFLSwZ8F5Ynpzflv6IceXV5n-aAUSM7w7eujdYi9s6_8KqQjVGu7_bS0HNS071jPekBonjVEpLNo6jwaitGHPYl_Xwoul_BZ2VKLPUw9UnI7pRNAxyinSjDXBuMLO52rym_GxK9okHzJvx68DL4Cc4_2LgbQdqBKTgab493OGvzL_U0U0bvwDsAuR55-ix6IhEEs",
    menuItems: [
      { name: "Tender Green Lauki (Bottle Gourd 1 pc)", price: "₹25", desc: "Smooth seedless bottle gourd freshly harvested", available: true },
      { name: "Fresh Bhindi (Lady Finger 1 kg)", price: "₹50", desc: "Crisp dark-green farm okra sorted by hand", available: true },
      { name: "Ridge Gourd / Torai (1 kg)", price: "₹45", desc: "Tender seasonal ridge gourd for light gravies", available: true },
      { name: "Dhaniya & Pudina Bundle", price: "₹20", desc: "Washed fragrant coriander leaves and refreshing garden mint", available: true },
      { name: "Tender Green Beans (French Beans 500g)", price: "₹60", desc: "Finely graded stringless french beans", available: true }
    ]
  },
  {
    id: 11,
    name: "Chhotey Lal Kanda-Batata Cart",
    category: "Vegetables",
    locality: "Alambagh, Lucknow",
    landmark: "Near Alambagh Bus Stand Sabzi Mandi",
    products: ["Desi Aloo", "Lal Pyaz", "Desi Garlic", "Chhoti Mirch"],
    priceRange: "₹20-50",
    isOpen: true,
    rating: 4.6,
    reviewsCount: 76,
    distance: "380m",
    walkTime: "5 min",
    since: "2010",
    setupType: "Three-wheel Green Cart",
    timings: "7:00 AM – 2:00 PM, 4:00 PM – 9:30 PM",
    verified: false,
    phone: "+91 522 000 0111",
    description: "Wholesale-grade household essentials: firm Pahari potatoes, sharp local red onions, country garlic, and spicy green chillies.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgaU9CdU3k1Vyhn9oqDslaKFBCaSjU-FqscMcUFLSwZ8F5Ynpzflv6IceXV5n-aAUSM7w7eujdYi9s6_8KqQjVGu7_bS0HNS071jPekBonjVEpLNo6jwaitGHPYl_Xwoul_BZ2VKLPUw9UnI7pRNAxyinSjDXBuMLO52rym_GxK9okHzJvx68DL4Cc4_2LgbQdqBKTgab493OGvzL_U0U0bvwDsAuR55-ix6IhEEs",
    menuItems: [
      { name: "Pahari Aloo (2 kg Pack)", price: "₹50", desc: "Firm mountain potatoes suitable for curries and chaat", available: true },
      { name: "Lal Desi Pyaz (Onions 1 kg)", price: "₹35", desc: "Pungent medium-sized dry red cooking onions", available: true },
      { name: "Desi Garlic / Lehsun (250g)", price: "₹45", desc: "Strong-flavoured local small garlic cloves", available: true },
      { name: "Fresh Lemon & Green Chilli Turban", price: "₹20", desc: "Five lemons paired with fresh green chillies", available: true }
    ]
  },
  {
    id: 12,
    name: "Shukla Ji Fresh Vegetable Handcart",
    category: "Vegetables",
    locality: "Indira Nagar, Lucknow",
    landmark: "Sector 14 Corner, Near Water Tank",
    products: ["Shimla Mirch", "Gajar", "Matar Phali", "Sarson Ka Saag"],
    priceRange: "₹20-70",
    isOpen: false,
    rating: 4.8,
    reviewsCount: 89,
    distance: "550m",
    walkTime: "7 min",
    since: "2014",
    setupType: "Wooden Handcart",
    timings: "6:30 AM – 1:00 PM, 4:30 PM – 8:30 PM",
    verified: false,
    phone: "+91 522 000 0112",
    description: "Winter specialty vegetables including sweet red carrots, shelled green peas, crunchy bell peppers, and fresh mustard greens.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgaU9CdU3k1Vyhn9oqDslaKFBCaSjU-FqscMcUFLSwZ8F5Ynpzflv6IceXV5n-aAUSM7w7eujdYi9s6_8KqQjVGu7_bS0HNS071jPekBonjVEpLNo6jwaitGHPYl_Xwoul_BZ2VKLPUw9UnI7pRNAxyinSjDXBuMLO52rym_GxK9okHzJvx68DL4Cc4_2LgbQdqBKTgab493OGvzL_U0U0bvwDsAuR55-ix6IhEEs",
    menuItems: [
      { name: "Green Shimla Mirch (Capsicum 500g)", price: "₹40", desc: "Crisp bell peppers for stir-fries and bhaji", available: true },
      { name: "Red Delhi Carrots / Gajar (1 kg)", price: "₹35", desc: "Sweet crunchy winter carrots for salads and halwa", available: true },
      { name: "Fresh Green Peas / Matar Phali (1 kg)", price: "₹70", desc: "Sweet freshly shelled local green pea pods", available: true },
      { name: "Sarson Ka Saag Leaves Bundle", price: "₹20", desc: "Cleaned mustard greens ready for winter steaming", available: true }
    ]
  },

  // =========================================================================
  // CATEGORY: TEA & BEVERAGES (5 Vendors)
  // =========================================================================
  {
    id: 13,
    name: "Hazratganj Kulhad Kafe",
    category: "Tea",
    locality: "Hazratganj, Lucknow",
    landmark: "Near Mayfair Cinema Corner",
    products: ["Kulhad Masala Chai", "Bun Maska", "Rusk", "Adrak Chai"],
    priceRange: "₹15-45",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 224,
    distance: "280m",
    walkTime: "3 min",
    since: "2008",
    setupType: "Brass Corner Stall",
    timings: "6:00 AM – 11:30 PM",
    verified: false,
    phone: "+91 522 000 0113",
    description: "Famous roadside evening tea hub pouring strong clove-cardamom spiced tea in unglazed clay kulhads with griddled bun maska.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5_PB451FT_XrrgArnI_u4bM0015QxSRw-RocO39W8KY-5AKR6xfD3swlrJO5RHnB4iyoxF7geXcR9V3fr1RCUy8P-GdtiyYQ8tmd5D4iAHnP5h1Zssva9WivuSN8Gnh915ZlE8eaJQxWXDSZvQlar9HlwyJsUKIpx6x2_BdkM9RhlQKyXqBj1OJAKl-ikF4A9C_VOeDAiAiv-th8M0PlXvCoCSvA5FiqD7z_rBI",
    menuItems: [
      { name: "Special Kulhad Masala Chai", price: "₹15", desc: "Rich milk tea brewed with crushed cardamoms, cinnamon and cloves in terracotta", available: true },
      { name: "Toasted Bun Maska", price: "₹30", desc: "Soft local bun griddled on iron tawa with generous dollop of butter", available: true },
      { name: "Adrak-Tulsi Kadak Tea", price: "₹20", desc: "Invigorating strong brew with freshly pounded ginger and holy basil", available: true },
      { name: "Suji Milk Rusk (Plate of 4)", price: "₹45", desc: "Crunchy double-baked semolina rusks dipped in piping hot tea", available: true }
    ]
  },
  {
    id: 14,
    name: "Kashmiri Gulabi Chai Stall",
    category: "Tea",
    locality: "Chowk, Lucknow",
    landmark: "Beside Phool Wali Gali",
    products: ["Noon Chai (Pink Chai)", "Sweet Sheermal", "Bakarkhani", "Pista Chai"],
    priceRange: "₹20-60",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 162,
    distance: "390m",
    walkTime: "5 min",
    since: "2011",
    setupType: "Samovar Copper Kiosk",
    timings: "7:00 AM – 11:00 AM, 4:00 PM – 10:30 PM",
    verified: false,
    phone: "+91 522 000 0114",
    description: "Authentic slow-simmered pink Kashmiri noon chai brewed with green tea leaves, almonds, and saffron, paired with warm sheermal slices.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5_PB451FT_XrrgArnI_u4bM0015QxSRw-RocO39W8KY-5AKR6xfD3swlrJO5RHnB4iyoxF7geXcR9V3fr1RCUy8P-GdtiyYQ8tmd5D4iAHnP5h1Zssva9WivuSN8Gnh915ZlE8eaJQxWXDSZvQlar9HlwyJsUKIpx6x2_BdkM9RhlQKyXqBj1OJAKl-ikF4A9C_VOeDAiAiv-th8M0PlXvCoCSvA5FiqD7z_rBI",
    menuItems: [
      { name: "Traditional Noon Chai (Pink Tea)", price: "₹30", desc: "Brewed green tea leaves with baking soda, milk, salt and crushed dry fruits", available: true },
      { name: "Zafrani Sheermal Slice", price: "₹60", desc: "Warm saffron-flavoured traditional sweet leavened flatbread", available: true },
      { name: "Kashmiri Bakarkhani", price: "₹40", desc: "Layered crisp spiced biscuit bread flavoured with ghee", available: true },
      { name: "Pista Badam Kulhad Chai", price: "₹20", desc: "Sweet milk tea finished with slivers of toasted almonds", available: true }
    ]
  },
  {
    id: 15,
    name: "Qaiser Zafrani Chai",
    category: "Tea",
    locality: "Aminabad, Lucknow",
    landmark: "Opp. Prakash Kulfi Crossing",
    products: ["Kesar Zafrani Chai", "Ajwain Mathri", "Khari Biscuit", "Elaichi Chai"],
    priceRange: "₹15-40",
    isOpen: true,
    rating: 4.7,
    reviewsCount: 138,
    distance: "230m",
    walkTime: "3 min",
    since: "2015",
    setupType: "Mobile Thela (Cart)",
    timings: "6:30 AM – 10:30 PM",
    verified: false,
    phone: "+91 522 000 0115",
    description: "Full-bodied boiled tea steeped with crushed Kashmiri saffron threads, served alongside crisp ajwain mathris and flaky khari biscuits.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5_PB451FT_XrrgArnI_u4bM0015QxSRw-RocO39W8KY-5AKR6xfD3swlrJO5RHnB4iyoxF7geXcR9V3fr1RCUy8P-GdtiyYQ8tmd5D4iAHnP5h1Zssva9WivuSN8Gnh915ZlE8eaJQxWXDSZvQlar9HlwyJsUKIpx6x2_BdkM9RhlQKyXqBj1OJAKl-ikF4A9C_VOeDAiAiv-th8M0PlXvCoCSvA5FiqD7z_rBI",
    menuItems: [
      { name: "Kesar Zafrani Kadak Chai", price: "₹25", desc: "Steaming full-cream tea infused with real Kashmiri saffron strands", available: true },
      { name: "Ajwain Crispy Mathri (Plate)", price: "₹20", desc: "Flaky savoury biscuit spiced with aromatic carom seeds", available: true },
      { name: "Surati Khari Biscuit (3 pcs)", price: "₹15", desc: "Puff pastry tea biscuits baked golden brown", available: true },
      { name: "Special Elaichi Kadak Chai", price: "₹40", desc: "Double-boiled strong black tea tempered with aromatic green cardamom", available: true }
    ]
  },
  {
    id: 16,
    name: "Gomti Tandoori Chai Spot",
    category: "Tea",
    locality: "Gomti Nagar, Lucknow",
    landmark: "Near Manoj Pandey Chauraha",
    products: ["Tandoori Kulhad Chai", "Gur (Jaggery) Chai", "Lemon Tea", "Butter Toast"],
    priceRange: "₹20-50",
    isOpen: false,
    rating: 4.8,
    reviewsCount: 172,
    distance: "510m",
    walkTime: "6 min",
    since: "2019",
    setupType: "Clay Oven Street Stall",
    timings: "7:00 AM – 10:30 PM",
    verified: false,
    phone: "+91 522 000 0116",
    description: "Live charcoal-fired clay cups plunged into bubbling tea to release a distinct smoky, earthy aroma, accompanied by golden butter toast.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5_PB451FT_XrrgArnI_u4bM0015QxSRw-RocO39W8KY-5AKR6xfD3swlrJO5RHnB4iyoxF7geXcR9V3fr1RCUy8P-GdtiyYQ8tmd5D4iAHnP5h1Zssva9WivuSN8Gnh915ZlE8eaJQxWXDSZvQlar9HlwyJsUKIpx6x2_BdkM9RhlQKyXqBj1OJAKl-ikF4A9C_VOeDAiAiv-th8M0PlXvCoCSvA5FiqD7z_rBI",
    menuItems: [
      { name: "Smoky Tandoori Kulhad Chai", price: "₹30", desc: "Red-hot clay cup dipped into boiling spiced tea for distinct earthy aroma", available: true },
      { name: "Desi Gur (Jaggery) Chai", price: "₹25", desc: "Refined sugar-free tea sweetened with organic sugarcane jaggery", available: true },
      { name: "Fresh Mint Lemon Tea", price: "₹20", desc: "Clear refreshing black tea with fresh mint leaves and squeezed lemon", available: true },
      { name: "Crispy Butter Toast", price: "₹50", desc: "Thick hand-cut bread browned on tawa with salted butter", available: true }
    ]
  },
  {
    id: 17,
    name: "Alambagh Station Kadak Chai",
    category: "Tea",
    locality: "Alambagh, Lucknow",
    landmark: "Near Alambagh Metro Station Gate 2",
    products: ["Kadak Masala Chai", "Samosa", "Dal Vada", "Suji Toast"],
    priceRange: "₹12-35",
    isOpen: true,
    rating: 4.7,
    reviewsCount: 115,
    distance: "190m",
    walkTime: "2 min",
    since: "2013",
    setupType: "Brass Corner Stall",
    timings: "5:30 AM – 11:00 PM",
    verified: false,
    phone: "+91 522 000 0117",
    description: "Fast-moving transit hub serving steaming hot cutting tea, crunchy dal vadas, and fresh potato samosas for morning commuters.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5_PB451FT_XrrgArnI_u4bM0015QxSRw-RocO39W8KY-5AKR6xfD3swlrJO5RHnB4iyoxF7geXcR9V3fr1RCUy8P-GdtiyYQ8tmd5D4iAHnP5h1Zssva9WivuSN8Gnh915ZlE8eaJQxWXDSZvQlar9HlwyJsUKIpx6x2_BdkM9RhlQKyXqBj1OJAKl-ikF4A9C_VOeDAiAiv-th8M0PlXvCoCSvA5FiqD7z_rBI",
    menuItems: [
      { name: "Cutting Masala Chai", price: "₹12", desc: "Half-glass quick roadside brew with crushed ginger and pepper", available: true },
      { name: "Fresh Aloo Samosa (2 pcs)", price: "₹30", desc: "Piping hot fried pastry filled with spiced potatoes and peas", available: true },
      { name: "Crispy Dal Vada Plate", price: "₹35", desc: "Coarsely ground chana dal fritters served with green chutney", available: true },
      { name: "Suji Rusk Pair", price: "₹15", desc: "Sweet crisp twice-baked rusk for morning commuters", available: true }
    ]
  },

  // =========================================================================
  // CATEGORY: FLOWERS (3 Vendors)
  // =========================================================================
  {
    id: 18,
    name: "Awadh Genda & Rose Mala",
    category: "Flowers",
    locality: "Chowk, Lucknow",
    landmark: "Near Koneshwar Mahadev Mandir",
    products: ["Genda Phool Garland", "Gulab Petals", "Dhatura", "Belpatra Bunch"],
    priceRange: "₹15-80",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 84,
    distance: "270m",
    walkTime: "3 min",
    since: "2012",
    setupType: "Flower Kiosk",
    timings: "5:00 AM – 1:00 PM, 4:30 PM – 9:00 PM",
    verified: false,
    phone: "+91 522 000 0118",
    description: "Hand-tied golden marigold garlands, fragrant Indian rose petals, and holy puja samagri prepared daily for temple visitors.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ypINeeyNfPrYLpX462RGajFXMOIiXOZ3QHZ4lnR0cMF-70wFr2sJQru07AGav8FURVBGHtJgoAqm5CtJHXGzmbAJuVk60J5PwBqMoo8C7tipTDSfhnP6Nm5d8T3F8GFGNhgvIKUNGLOhJCjpAo2yF36yOi1twQQwx6syLZPeWPRuZF9VncUmIrn-H4e5SUOsDMx8o1yGR47uv-sjCXSr5iSNTS1Mqoxn9Jy03mc",
    menuItems: [
      { name: "Fresh Orange Marigold Garland (1 Mala)", price: "₹30", desc: "Tightly hand-woven marigold garland for temple deities or doorframes", available: true },
      { name: "Red Rose Petals Pack (250g)", price: "₹50", desc: "Loose fragrant Indian desi rose petals for religious ceremonies", available: true },
      { name: "Shiva Puja Samagri Pack", price: "₹40", desc: "Sacred Belpatra leaves, Dhatura fruits and blue flowers", available: true },
      { name: "Yellow Genda Phool String (1 Yard)", price: "₹15", desc: "Bright festive flower string sold by length", available: true },
      { name: "Double Thick Festival Garland", price: "₹80", desc: "Grand interwoven red rose and golden marigold ceremonial garland", available: false }
    ]
  },
  {
    id: 19,
    name: "Ganj Bela & Jasmine Kiosk",
    category: "Flowers",
    locality: "Hazratganj, Lucknow",
    landmark: "Beside Hanuman Setu Road Turn",
    products: ["Fragrant Bela Gajra", "Chameli String", "Puja Thali Assortment", "Rose Petals"],
    priceRange: "₹25-100",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 112,
    distance: "340m",
    walkTime: "4 min",
    since: "2015",
    setupType: "Decorated Wooden Cart",
    timings: "6:00 AM – 12:30 PM, 4:00 PM – 9:30 PM",
    verified: false,
    phone: "+91 522 000 0119",
    description: "Exquisite sweet-scented Lucknowi bela and jasmine hair gajras strung with banana fiber, fresh roses, and morning puja offerings.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ypINeeyNfPrYLpX462RGajFXMOIiXOZ3QHZ4lnR0cMF-70wFr2sJQru07AGav8FURVBGHtJgoAqm5CtJHXGzmbAJuVk60J5PwBqMoo8C7tipTDSfhnP6Nm5d8T3F8GFGNhgvIKUNGLOhJCjpAo2yF36yOi1twQQwx6syLZPeWPRuZF9VncUmIrn-H4e5SUOsDMx8o1yGR47uv-sjCXSr5iSNTS1Mqoxn9Jy03mc",
    menuItems: [
      { name: "Fragrant Bela (Jasmine) Gajra", price: "₹35", desc: "Traditional Lucknowi jasmine floral circlet woven with banana fibre", available: true },
      { name: "Chameli Hair String (1 Veni)", price: "₹25", desc: "Sweet-scented delicate evening flower string", available: true },
      { name: "Daily Mandir Puja Basket", price: "₹60", desc: "Assortment of fresh marigolds, hibiscus, basil leaves and durva grass", available: true },
      { name: "Premium Red Dutch Rose Bouquet (3 Stems)", price: "₹100", desc: "Long-stemmed fresh red roses wrapped in eco-friendly paper", available: true }
    ]
  },
  {
    id: 20,
    name: "Bhootnath Sacred Flowers",
    category: "Flowers",
    locality: "Indira Nagar, Lucknow",
    landmark: "Opp. Bhootnath Market Main Gate",
    products: ["Peela Genda Mala", "Red Hibiscus", "Kamal Gatta", "Tulsi Mala"],
    priceRange: "₹20-90",
    isOpen: false,
    rating: 4.7,
    reviewsCount: 68,
    distance: "420m",
    walkTime: "5 min",
    since: "2017",
    setupType: "Flower Kiosk",
    timings: "5:30 AM – 1:00 PM, 5:00 PM – 9:00 PM",
    verified: false,
    phone: "+91 522 000 0120",
    description: "Daily temple flowers, auspicious red hibiscus blossoms for Hanuman and Devi pujas, pristine lotus pairs, and sacred basil garlands.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ypINeeyNfPrYLpX462RGajFXMOIiXOZ3QHZ4lnR0cMF-70wFr2sJQru07AGav8FURVBGHtJgoAqm5CtJHXGzmbAJuVk60J5PwBqMoo8C7tipTDSfhnP6Nm5d8T3F8GFGNhgvIKUNGLOhJCjpAo2yF36yOi1twQQwx6syLZPeWPRuZF9VncUmIrn-H4e5SUOsDMx8o1yGR47uv-sjCXSr5iSNTS1Mqoxn9Jy03mc",
    menuItems: [
      { name: "Peela Genda Mala (Temple Offering)", price: "₹30", desc: "Fresh fragrant yellow marigolds tied on cotton string", available: true },
      { name: "Sacred Pink Lotus (Pair of 2)", price: "₹50", desc: "Fresh morning lotus blossoms for home altar and Lakshmi puja", available: true },
      { name: "Red Hibiscus Flowers Pack (11 Flowers)", price: "₹20", desc: "Pristine red hibiscus buds hand-picked for deity worship", available: true },
      { name: "Chandan Tulsi Garland", price: "₹90", desc: "Holy basil leaves threaded with sandalwood beads", available: false }
    ]
  },

  // =========================================================================
  // CATEGORY: OTHER / ARTISANS & MICRO-SERVICES (5 Vendors)
  // =========================================================================
  {
    id: 21,
    name: "Nazeer Chikan Embroidery Rafu",
    category: "Other",
    locality: "Chowk, Lucknow",
    landmark: "Near Victoria Street Chowk",
    products: ["Chikan Kurtas Rafu", "Zari Thread Repair", "Button Fixing", "Hand Stitching"],
    priceRange: "₹20-80",
    isOpen: true,
    rating: 4.9,
    reviewsCount: 154,
    distance: "310m",
    walkTime: "4 min",
    since: "2002",
    setupType: "Artisan Low-Stool Spot",
    timings: "10:30 AM – 7:30 PM",
    verified: false,
    phone: "+91 522 000 0121",
    description: "Master textile artisan offering invisible mending (rafu) for delicate Lucknawi chikan garments, zari dupattas, and fine cotton kurtas.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHyVrMlD4tLYQG-gq8sO-sLuA03Zmk6tV7lcIQMlTE3Nj5nFT_SW0cILGdusMFyIrgt4Dteh9JhDkoKoPObcgGLJT-dPaX2NR80bVp1JU0toVvB35lnjG_il-Hi9twaVz2GIuUBueL0xIo6aZ9pmaD6MeendCJTI_X7aoLvE54UOCAxrUbVqyhcmj3jyHPnj1dVI8e4vURXQKxIMez2wRaFiiq8_BHVLXAs4jOqGM",
    menuItems: [
      { name: "Fine Chikan Kurta Invisible Rafu", price: "₹50", desc: "Artisanal hand-weaving mending for delicate cotton and georgette chikan fabric", available: true },
      { name: "Zari & Gota Border Re-stitching", price: "₹80", desc: "Delicate silver and gold thread reattachment on dupattas and kurtas", available: true },
      { name: "Saree Fall & Pico (Per Saree)", price: "₹60", desc: "Precision edge edging and protective lining attachment", available: true },
      { name: "Mother-of-Pearl Button Fixing", price: "₹20", desc: "Hand-sewing tailored buttons on formal kurtas and shirts", available: true }
    ]
  },
  {
    id: 22,
    name: "Kailash Footwear & Leather Works",
    category: "Other",
    locality: "Hazratganj, Lucknow",
    landmark: "Under Peepal Tree near GPO Compound",
    products: ["Sole Hand-Stitching", "Formal Buffing", "Belt Punching", "Zip Replacement"],
    priceRange: "₹20-90",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 110,
    distance: "260m",
    walkTime: "3 min",
    since: "1999",
    setupType: "Artisan Tree Spot",
    timings: "9:30 AM – 7:30 PM",
    verified: false,
    phone: "+91 522 000 0122",
    description: "Reliable street leather craftsman providing waxed-nylon shoe sole repairs, deep polish buffing, and heavy bag zipper replacements.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHyVrMlD4tLYQG-gq8sO-sLuA03Zmk6tV7lcIQMlTE3Nj5nFT_SW0cILGdusMFyIrgt4Dteh9JhDkoKoPObcgGLJT-dPaX2NR80bVp1JU0toVvB35lnjG_il-Hi9twaVz2GIuUBueL0xIo6aZ9pmaD6MeendCJTI_X7aoLvE54UOCAxrUbVqyhcmj3jyHPnj1dVI8e4vURXQKxIMez2wRaFiiq8_BHVLXAs4jOqGM",
    menuItems: [
      { name: "Heavy Waxed Cord Sole Stitching", price: "₹50", desc: "Double-needle hand-stitched sole reinforcement for leather formal shoes", available: true },
      { name: "Full Leather Buff & Cream Polish", price: "₹30", desc: "Deep conditioning and mirror shine for brown and black leather footwear", available: true },
      { name: "Leather Bag Strap & Zip Replacement", price: "₹90", desc: "Tough nylon slider and runner replacement on laptop or travel bags", available: true },
      { name: "Belt Hole Punching & Buckle Adjustment", price: "₹20", desc: "Sizing holes punched with precision steel revolving plier", available: true }
    ]
  },
  {
    id: 23,
    name: "Aminabad Keymaker & Locksmith",
    category: "Other",
    locality: "Aminabad, Lucknow",
    landmark: "Beside Gadbadjhala Market Entrance",
    products: ["Brass Duplicate Keys", "Padlock Servicing", "Master Key Cutting"],
    priceRange: "₹30-75",
    isOpen: true,
    rating: 4.7,
    reviewsCount: 88,
    distance: "190m",
    walkTime: "2 min",
    since: "2007",
    setupType: "Portable Wooden Box Cart",
    timings: "10:00 AM – 8:00 PM",
    verified: false,
    phone: "+91 522 000 0123",
    description: "Instant duplicate key cutting for door padlocks, mortise locks, and two-wheeler ignitions cut on precision hand tracers.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHyVrMlD4tLYQG-gq8sO-sLuA03Zmk6tV7lcIQMlTE3Nj5nFT_SW0cILGdusMFyIrgt4Dteh9JhDkoKoPObcgGLJT-dPaX2NR80bVp1JU0toVvB35lnjG_il-Hi9twaVz2GIuUBueL0xIo6aZ9pmaD6MeendCJTI_X7aoLvE54UOCAxrUbVqyhcmj3jyHPnj1dVI8e4vURXQKxIMez2wRaFiiq8_BHVLXAs4jOqGM",
    menuItems: [
      { name: "Brass Duplicate Key Cutting", price: "₹40", desc: "Precision-milled duplicate keys for Godrej, Harrison and padlock cylinders", available: true },
      { name: "Two-Wheeler Ignition Key Copy", price: "₹60", desc: "Durable steel motorcycle or scooter key cut on electric tracer", available: true },
      { name: "Jam Padlock Servicing & Oil Flush", price: "₹30", desc: "Rust cleaning, spring loosening and graphite lubrication", available: true },
      { name: "Computerised Dimple Key Duplication", price: "₹75", desc: "High-security multi-point dimple key cutting for modern main doors", available: true }
    ]
  },
  {
    id: 24,
    name: "Manoj Bicycle Puncture & Care",
    category: "Other",
    locality: "Gomti Nagar, Lucknow",
    landmark: "Near Vivek Khand Mini Stadium Gate",
    products: ["Tubeless Patch", "Cycle Air Pumping", "Chain Lubrication", "Brake Tuning"],
    priceRange: "₹10-50",
    isOpen: true,
    rating: 4.8,
    reviewsCount: 95,
    distance: "480m",
    walkTime: "6 min",
    since: "2016",
    setupType: "Street Corner Tool Station",
    timings: "7:00 AM – 8:00 PM",
    verified: false,
    phone: "+91 522 000 0124",
    description: "Quick bicycle tube vulcanization, chain degreasing, cable tightening, and tire maintenance for local school children and commuters.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHyVrMlD4tLYQG-gq8sO-sLuA03Zmk6tV7lcIQMlTE3Nj5nFT_SW0cILGdusMFyIrgt4Dteh9JhDkoKoPObcgGLJT-dPaX2NR80bVp1JU0toVvB35lnjG_il-Hi9twaVz2GIuUBueL0xIo6aZ9pmaD6MeendCJTI_X7aoLvE54UOCAxrUbVqyhcmj3jyHPnj1dVI8e4vURXQKxIMez2wRaFiiq8_BHVLXAs4jOqGM",
    menuItems: [
      { name: "Bicycle Tube Cold Patch Puncture Repair", price: "₹20", desc: "Submerged leak detection, rubber buffing and vulcanised cold patch sealing", available: true },
      { name: "Full Tyre Pressure Check & Air Top-up", price: "₹10", desc: "Calibrated manual foot pump air filling for two bicycle tyres", available: true },
      { name: "Chain Cleaning & Heavy Oil Lubrication", price: "₹30", desc: "De-greasing and fresh chain lubrication to ensure smooth pedalling", available: true },
      { name: "Brake Cable Tightening & Pad Alignment", price: "₹50", desc: "Front and rear brake cable adjustment with new friction pads", available: true }
    ]
  },
  {
    id: 25,
    name: "Ram Milan Knife & Scissor Sharpener",
    category: "Other",
    locality: "Alambagh, Lucknow",
    landmark: "Near Singar Nagar Crossroad",
    products: ["Kitchen Knife Grinding", "Tailor Scissor Sharpening", "Brass Polish"],
    priceRange: "₹15-60",
    isOpen: false,
    rating: 4.6,
    reviewsCount: 62,
    distance: "620m",
    walkTime: "7 min",
    since: "2005",
    setupType: "Foot-Pedal Grinder Bicycle",
    timings: "9:00 AM – 6:30 PM",
    verified: false,
    phone: "+91 522 000 0125",
    description: "Traditional foot-treadle rotating water-stone sharpener providing razor edges for dressmaking scissors, kitchen knives, and brass ware polish.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHyVrMlD4tLYQG-gq8sO-sLuA03Zmk6tV7lcIQMlTE3Nj5nFT_SW0cILGdusMFyIrgt4Dteh9JhDkoKoPObcgGLJT-dPaX2NR80bVp1JU0toVvB35lnjG_il-Hi9twaVz2GIuUBueL0xIo6aZ9pmaD6MeendCJTI_X7aoLvE54UOCAxrUbVqyhcmj3jyHPnj1dVI8e4vURXQKxIMez2wRaFiiq8_BHVLXAs4jOqGM",
    menuItems: [
      { name: "Kitchen Chef Knife Edge Sharpening", price: "₹25", desc: "Traditional revolving sandstone foot-wheel grinding with water cooling", available: true },
      { name: "Tailor Scissors Heavy Grinding", price: "₹40", desc: "Razor-sharp bevelling on large heavy-duty dressmaking fabric shears", available: true },
      { name: "Brass Utensil Polish (Per Small Kalash)", price: "₹60", desc: "Tamarind-ash scrubbing and buffing for traditional brass puja ware", available: true },
      { name: "Kitchen Peeler & Small Blade Honing", price: "₹15", desc: "Fine oil-stone honing for paring knives and slicers", available: true }
    ]
  }
];

// LocalStorage Helper for state persistence with Versioning & Cache Invalidation
const CURRENT_DATASET_VERSION = 'lucknow_v1';

function getStoredVendors() {
  try {
    const storedVersion = localStorage.getItem('streetkart_dataset_version');
    const stored = localStorage.getItem('streetkart_vendors_data');

    if (stored) {
      const parsed = JSON.parse(stored);
      
      // If version matches, return stored vendors
      if (storedVersion === CURRENT_DATASET_VERSION && Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }

      // If version mismatch (e.g. old Bangalore demo data), migrate safely:
      // Preserve any custom vendors created by the user during signup testing (id > 25)
      const userCreatedVendors = Array.isArray(parsed) 
        ? parsed.filter(v => typeof v.id === 'number' && v.id > 25) 
        : [];

      const migratedList = [...defaultVendors, ...userCreatedVendors];
      localStorage.setItem('streetkart_vendors_data', JSON.stringify(migratedList));
      localStorage.setItem('streetkart_dataset_version', CURRENT_DATASET_VERSION);
      
      // Reset active dashboard stall to vendor #1 (Awadh Chaat Corner)
      localStorage.setItem('streetkart_current_vendor_id', '1');
      return migratedList;
    }

    // First initialization: seed with the 25 Lucknow vendors
    localStorage.setItem('streetkart_vendors_data', JSON.stringify(defaultVendors));
    localStorage.setItem('streetkart_dataset_version', CURRENT_DATASET_VERSION);
  } catch (e) {
    console.warn('Could not read from localStorage, using default vendors', e);
  }
  return defaultVendors;
}

function saveVendors(vendorList) {
  try {
    localStorage.setItem('streetkart_vendors_data', JSON.stringify(vendorList));
  } catch (e) {
    console.warn('Could not persist to localStorage', e);
  }
}

// Global active vendors list
let vendors = getStoredVendors();

// Helper function to get vendor by ID
function getVendorById(id) {
  const all = getStoredVendors();
  return all.find(vendor => vendor.id === parseInt(id) || vendor.id === String(id));
}

// Helper function to filter vendors by Category, Open status, and Search query
function filterVendors(category = 'All', openOnly = false, searchQuery = '') {
  const all = getStoredVendors();
  const q = (searchQuery || '').trim().toLowerCase();

  return all.filter(vendor => {
    // Category match
    const categoryMatch = category === 'All' || vendor.category === category;
    
    // Open status match
    const openMatch = !openOnly || vendor.isOpen;

    // Search query match across Name, Locality, Category, Landmark, and Products (both original and localized)
    let searchMatch = true;
    if (q) {
      const inName = (vendor.name || '').toLowerCase().includes(q);
      const inLocality = (vendor.locality || '').toLowerCase().includes(q);
      const inCategory = (vendor.category || '').toLowerCase().includes(q);
      const inProducts = Array.isArray(vendor.products) && vendor.products.some(p => p.toLowerCase().includes(q));
      const inLandmark = (vendor.landmark || '').toLowerCase().includes(q);

      let inLocalized = false;
      if (typeof window !== 'undefined' && window.StreetKartI18n && typeof window.StreetKartI18n.getLocalizedVendor === 'function') {
        const loc = window.StreetKartI18n.getLocalizedVendor(vendor);
        const inLocName = (loc.name || '').toLowerCase().includes(q);
        const inLocDesc = (loc.description || '').toLowerCase().includes(q);
        const inLocCategory = (loc.categoryDisplay || '').toLowerCase().includes(q);
        const inLocLandmark = (loc.landmark || '').toLowerCase().includes(q);
        const inLocProducts = Array.isArray(loc.products) && loc.products.some(p => p.toLowerCase().includes(q));
        inLocalized = inLocName || inLocDesc || inLocCategory || inLocLandmark || inLocProducts;
      }

      searchMatch = inName || inLocality || inCategory || inProducts || inLandmark || inLocalized;
    }

    return categoryMatch && openMatch && searchMatch;
  });
}

// Helper function to get all distinct categories
function getCategories() {
  const all = getStoredVendors();
  const categories = ['All'];
  all.forEach(vendor => {
    if (vendor.category && !categories.includes(vendor.category)) {
      categories.push(vendor.category);
    }
  });
  return categories;
}

// Helper function to update a vendor's availability status
function updateVendorAvailability(id, isOpen) {
  const all = getStoredVendors();
  const idx = all.findIndex(v => v.id === parseInt(id) || v.id === String(id));
  if (idx !== -1) {
    all[idx].isOpen = Boolean(isOpen);
    all[idx].lastUpdated = new Date().toISOString();
    saveVendors(all);
    vendors = all;
    return all[idx];
  }
  return null;
}

// Helper function to add a newly created vendor from signup
function createVendorProfile(newVendorData) {
  const all = getStoredVendors();
  const newId = all.length > 0 ? Math.max(...all.map(v => typeof v.id === 'number' ? v.id : 0)) + 1 : 26;
  
  const createdVendor = {
    id: newId,
    name: newVendorData.vendorName || newVendorData.name,
    category: newVendorData.category || 'Other',
    locality: newVendorData.locality || 'Hazratganj, Lucknow',
    landmark: newVendorData.landmark || 'Near main market',
    products: Array.isArray(newVendorData.products) 
      ? newVendorData.products 
      : (typeof newVendorData.products === 'string' ? newVendorData.products.split(',').map(s => s.trim()).filter(Boolean) : []),
    priceRange: newVendorData.priceRange || '₹20-50',
    isOpen: newVendorData.isOpen !== undefined ? Boolean(newVendorData.isOpen) : true,
    rating: 5.0,
    reviewsCount: 1,
    distance: "100m",
    walkTime: "1 min",
    since: new Date().getFullYear().toString(),
    setupType: "Mobile Thela (Cart)",
    timings: newVendorData.timings || "8:00 AM – 9:00 PM",
    verification_status: 'pending',
    verified: false,
    phone: newVendorData.phone || "+91 522 000 0000",
    description: newVendorData.description || "Fresh daily produce and authentic local items straight from our street cart.",
    imageUrl: newVendorData.imageUrl || newVendorData.stallPhoto || "assets/logo-icon.svg",
    createdAt: new Date().toISOString(),
    menuItems: []
  };

  all.unshift(createdVendor);
  saveVendors(all);
  vendors = all;
  localStorage.setItem('streetkart_current_vendor_id', String(newId));
  return createdVendor;
}

// Export to window for global access
window.StreetKartData = {
  getVendors: getStoredVendors,
  getVendorById,
  filterVendors,
  getCategories,
  updateVendorAvailability,
  createVendorProfile,
  saveVendors
};
