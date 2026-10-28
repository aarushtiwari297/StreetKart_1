// StreetKart - Multilingual Support & Vendor Content Localization Engine
// Phase 5: Supporting 12 UI Languages with Confident Lucknow Vendor Content Translations

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' }
];

const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_browse: "Browse Vendors",
        nav_contact: "Contact",
        nav_signup: "+ Add Stall",
        nav_my_stall: "My Stall",
        nav_login: "Sign In",
        nav_logout: "Sign Out",
        nav_profile: "Profile",
        location_label: "Lucknow, UP",

        hero_badge: "🚀 Empowering 500+ Local Vendors",
        hero_title: "Digital Visibility for<br>Local Street Vendors",
        hero_subtitle: "Connecting communities with local vendors.",
        hero_tagline: '"Local dikhega, tabhi bikega"',
        hero_cta_primary: "Create Free Vendor Profile",
        hero_cta_secondary: "Browse Vendors →",

        guest_welcome_badge: "👋 Welcome to StreetKart",
        guest_welcome_title: "Hyperlocal Street Commerce in Lucknow",
        guest_welcome_desc: "Select your path below to begin discovering authentic carts or managing your stall.",
        role_card_customer_title: "I am a Customer",
        role_card_customer_desc: "Find nearby street vendors, fresh vegetables, snacks, and morning tea within walking distance.",
        role_card_customer_btn: "Start Browsing",
        role_card_vendor_title: "I am a Street Vendor",
        role_card_vendor_desc: "Manage your stall status, update live items, change operating timings, and reach your neighbours.",
        role_card_vendor_btn: "Vendor Portal",
        guest_login_link_text: "Already have an account? Sign In",

        browse_title: "Discover Nearby Stalls",
        browse_subtitle: "Locate street carts, pushcarts and neighborhood artisans open for business right now.",
        search_placeholder: "Search vendors by name, locality or items (e.g., Pani Puri, Tomato, Kaapi)...",
        category_heading: "Category",
        category_swipe_hint: "Swipe to see all categories",
        category_all: "All",
        category_snacks: "Snacks",
        category_vegetables: "Vegetables",
        category_tea: "Tea",
        category_flowers: "Flowers",
        category_other: "Other",
        category_stalls_suffix: "Stalls",
        filter_open_now: "Open Right Now",
        filter_under_50: "Items Under ₹50",
        reset_all_filters: "Reset All Filters",
        empty_search_title: "No stalls match your search",
        empty_search_desc: "Try adjusting your category pills, distance radius, or search query",

        walk_to_cart: "Walk to Cart",
        call_vendor: "Call Vendor",
        status_open: "Open Right Now",
        status_closed: "Currently Closed",
        status_verified: "Verified Local Vendor",
        status_since: "Since",
        status_live: "Live",

        stall_not_found_title: "Stall Not Found",
        stall_not_found_desc: "The vendor you are looking for is not listed or has moved.",
        back_to_browse: "Back to Browse",
        share_stall: "Share Stall",
        price_range_label: "Price Range",
        proximity_label: "Proximity",
        daily_timings_label: "Daily Timings",
        setup_type_label: "Setup Type",
        menu_pricing_title: "Today's Fresh Prep (Menu & Pricing)",
        fresh_daily_stock: "Fresh Daily Stock",
        direct_settlement_title: "Direct Stall Settlement:",
        direct_settlement_desc: "Pay directly to the vendor via UPI QR or cash at the cart. No advance payment or app platform cut.",
        cart_location_title: "Cart Location & Spotting (Lucknow, UP)",
        landmark_label: "Landmark:",
        budget_friendly: "Budget-friendly",
        away_label: "Away",

        stall_live_heading: "DUKAAN CHALU HAI (STALL IS LIVE)",
        stall_closed_heading: "DUKAAN BAND HAI (STALL IS CLOSED)",
        btn_chalu: "KHULI HAI (OPEN)",
        btn_band: "BAND HAI (CLOSED)",
        today_menu: "Today's Cart Menu & Live Stock",
        btn_add_item: "+ Naya Item",
        mil_raha_hai: "✓ Mil Raha Hai",
        khatam: "✕ Khatam",
        edit_profile_btn: "Edit Profile",
        customer_preview_title: "Live Customer Preview",

        auth_modal_title: "Welcome to StreetKart",
        auth_tab_login: "Sign In",
        auth_tab_register: "Create Account",
        demo_customer_btn: "One-Click Demo Customer",
        demo_vendor_btn: "One-Click Demo Vendor",
        email_label: "Email Address",
        password_label: "Password",
        name_label: "Your Name",
        role_label: "I am a...",
        role_option_customer: "Customer (Discover stalls)",
        role_option_vendor: "Vendor (Manage stall)",
        btn_submit_login: "Sign In",
        btn_submit_register: "Create Account"
    },
    hi: {
        nav_home: "होम",
        nav_about: "हमारे बारे में",
        nav_browse: "विक्रेता खोजें",
        nav_contact: "संपर्क करें",
        nav_signup: "+ दुकान जोड़ें",
        nav_my_stall: "मेरी दुकान",
        nav_login: "लॉग इन",
        nav_logout: "लॉग आउट",
        nav_profile: "प्रोफाइल",
        location_label: "लखनऊ, उत्तर प्रदेश",

        hero_badge: "🚀 500+ स्थानीय विक्रेताओं को सशक्त बना रहे हैं",
        hero_title: "स्थानीय स्ट्रीट विक्रेताओं के लिए<br>डिजिटल दृश्यता",
        hero_subtitle: "समुदायों को स्थानीय विक्रेताओं से जोड़ना।",
        hero_tagline: '"लोकल दिखेगा, तभी बिकेगा"',
        hero_cta_primary: "मुफ्त विक्रेता प्रोफाइल बनाएं",
        hero_cta_secondary: "विक्रेता खोजें →",

        guest_welcome_badge: "👋 स्ट्रीटकार्ट में आपका स्वागत है",
        guest_welcome_title: "लखनऊ में स्थानीय स्ट्रीट कॉमर्स",
        guest_welcome_desc: "आस-पास के ठेले खोजने या अपनी दुकान का प्रबंधन करने के लिए नीचे अपना विकल्प चुनें।",
        role_card_customer_title: "मैं एक ग्राहक हूँ",
        role_card_customer_desc: "पैदल दूरी पर आस-पास के स्ट्रीट वेंडर, ताजी सब्जियां, चाट और सुबह की कड़क चाय खोजें।",
        role_card_customer_btn: "दुकानें देखना शुरू करें",
        role_card_vendor_title: "मैं एक स्ट्रीट वेंडर हूँ",
        role_card_vendor_desc: "अपनी दुकान का स्टेटस बदलें, मेन्यू अपडेट करें, समय बदलें और पड़ोसियों तक पहुंचें।",
        role_card_vendor_btn: "वेंडर पोर्टल",
        guest_login_link_text: "पहले से खाता है? साइन इन करें",

        browse_title: "आस-पास के ठेले और दुकानें",
        browse_subtitle: "अभी खुली हुई स्ट्रीट कार्ट, ठेले और स्थानीय कारीगरों को खोजें।",
        search_placeholder: "नाम, स्थान या आइटम से खोजें (जैसे पानी पूरी, टमाटर, चाय)...",
        category_heading: "श्रेणी",
        category_swipe_hint: "सभी श्रेणियां देखने के लिए स्वाइप करें",
        category_all: "सभी",
        category_snacks: "नाश्ता व चाट",
        category_vegetables: "सब्जियां",
        category_tea: "चाय",
        category_flowers: "फूल",
        category_other: "अन्य सेवाएं",
        category_stalls_suffix: "दुकानें",
        filter_open_now: "अभी खुली दुकानें",
        filter_under_50: "₹50 से कम",
        reset_all_filters: "सभी फ़िल्टर रीसेट करें",
        empty_search_title: "कोई दुकान नहीं मिली",
        empty_search_desc: "श्रेणी या खोज शब्द बदलकर पुनः प्रयास करें।",

        walk_to_cart: "ठेले तक पैदल जाएं",
        call_vendor: "विक्रेता को कॉल करें",
        status_open: "अभी खुली है",
        status_closed: "वर्तमान में बंद है",
        status_verified: "सत्यापित स्थानीय विक्रेता",
        status_since: "स्थापना",
        status_live: "लाइव",

        stall_not_found_title: "दुकान नहीं मिली",
        stall_not_found_desc: "जिस विक्रेता को आप खोज रहे हैं वह सूचीबद्ध नहीं है या स्थान बदल गया है।",
        back_to_browse: "वापस सूची पर जाएं",
        share_stall: "दुकान शेयर करें",
        price_range_label: "मूल्य सीमा",
        proximity_label: "दूरी",
        daily_timings_label: "दैनिक समय",
        setup_type_label: "दुकान का प्रकार",
        menu_pricing_title: "आज की ताजा तैयारी (मेन्यू व मूल्य)",
        fresh_daily_stock: "ताजा दैनिक स्टॉक",
        direct_settlement_title: "सीधा भुगतान:",
        direct_settlement_desc: "ठेले पर यूपीआई क्यूआर या नकद के जरिए सीधे विक्रेता को भुगतान करें। कोई बिचौलिया या कमीशन नहीं।",
        cart_location_title: "दुकान का स्थान व दिशा (लखनऊ, उत्तर प्रदेश)",
        landmark_label: "लैंडमार्क:",
        budget_friendly: "किफायती",
        away_label: "दूर",

        stall_live_heading: "दुकान चालू है (लाइव)",
        stall_closed_heading: "दुकान बंद है",
        btn_chalu: "खुली है (OPEN)",
        btn_band: "बंद है (CLOSED)",
        today_menu: "आज का मेन्यू और लाइव स्टॉक",
        btn_add_item: "+ नया आइटम",
        mil_raha_hai: "✓ मिल रहा है",
        khatam: "✕ खत्म",
        edit_profile_btn: "प्रोफाइल संपादित करें",
        customer_preview_title: "ग्राहक पूर्वावलोकन",

        auth_modal_title: "स्ट्रीटकार्ट में आपका स्वागत है",
        auth_tab_login: "साइन इन",
        auth_tab_register: "खाता बनाएं",
        demo_customer_btn: "डेमो ग्राहक (वन-क्लिक)",
        demo_vendor_btn: "डेमो वेंडर (वन-क्लिक)",
        email_label: "ईमेल पता",
        password_label: "पासवर्ड",
        name_label: "आपका नाम",
        role_label: "मेरी भूमिका...",
        role_option_customer: "ग्राहक (दुकानें खोजें)",
        role_option_vendor: "विक्रेता (दुकान प्रबंधित करें)",
        btn_submit_login: "साइन इन करें",
        btn_submit_register: "खाता बनाएं"
    },
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre Nosotros",
        nav_browse: "Buscar Vendedores",
        nav_contact: "Contacto",
        nav_signup: "+ Agregar Puesto",
        nav_my_stall: "Mi Puesto",
        nav_login: "Iniciar Sesión",
        nav_logout: "Cerrar Sesión",
        nav_profile: "Perfil",
        location_label: "Lucknow, UP",
        hero_badge: "🚀 Empoderando a más de 500 vendedores locales",
        hero_title: "Visibilidad Digital para<br>Vendedores Callejeros Locales",
        hero_subtitle: "Conectando comunidades con vendedores locales.",
        hero_tagline: '"Local se verá, entonces se venderá"',
        hero_cta_primary: "Crear Perfil de Vendedor Gratis",
        hero_cta_secondary: "Buscar Vendedores →",
        browse_title: "Descubre Puestos Cercanos",
        browse_subtitle: "Localiza puestos callejeros y artesanos abiertos ahora mismo.",
        search_placeholder: "Buscar por nombre, localidad o productos...",
        category_heading: "Categoría",
        category_all: "Todos",
        category_snacks: "Aperitivos",
        category_vegetables: "Verduras",
        category_tea: "Té",
        category_flowers: "Flores",
        category_other: "Otros",
        filter_open_now: "Abierto Ahora",
        filter_under_50: "Menos de ₹50",
        walk_to_cart: "Caminar al Puesto",
        call_vendor: "Llamar al Vendedor",
        status_open: "Abierto Ahora",
        status_closed: "Cerrado Actualmente",
        auth_tab_login: "Iniciar Sesión",
        auth_tab_register: "Crear Cuenta"
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_browse: "Parcourir les Vendeurs",
        nav_contact: "Contact",
        nav_signup: "+ Ajouter un Stand",
        nav_my_stall: "Mon Stand",
        nav_login: "Connexion",
        nav_logout: "Déconnexion",
        nav_profile: "Profil",
        location_label: "Lucknow, UP",
        hero_badge: "🚀 Autonomiser plus de 500 vendeurs locaux",
        hero_title: "Visibilité Numérique pour<br>les Vendeurs de Rue Locaux",
        hero_subtitle: "Connecter les communautés avec les vendeurs locaux.",
        hero_tagline: '"Le local sera vu, alors il se vendra"',
        hero_cta_primary: "Créer un Profil Vendeur Gratuit",
        hero_cta_secondary: "Parcourir les Vendeurs →",
        browse_title: "Découvrez les Stands à Proximité",
        browse_subtitle: "Localisez les vendeurs de rue et artisans ouverts en ce moment.",
        search_placeholder: "Rechercher par nom, quartier ou produit...",
        category_heading: "Catégorie",
        category_all: "Tous",
        category_snacks: "Snacks",
        category_vegetables: "Légumes",
        category_tea: "Thé",
        category_flowers: "Fleurs",
        category_other: "Autres",
        filter_open_now: "Ouvert Maintenant",
        filter_under_50: "Moins de ₹50",
        walk_to_cart: "Aller au Stand",
        call_vendor: "Appeler le Vendeur",
        status_open: "Ouvert Maintenant",
        status_closed: "Actuellement Fermé",
        auth_tab_login: "Connexion",
        auth_tab_register: "Créer un Compte"
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über Uns",
        nav_browse: "Händler Durchsuchen",
        nav_contact: "Kontakt",
        nav_signup: "+ Stand Hinzufügen",
        nav_my_stall: "Mein Stand",
        nav_login: "Anmelden",
        nav_logout: "Abmelden",
        nav_profile: "Profil",
        location_label: "Lucknow, UP",
        hero_badge: "🚀 Stärkung von über 500 lokalen Händlern",
        hero_title: "Digitale Sichtbarkeit für<br>Lokale Straßenhändler",
        hero_subtitle: "Gemeinschaften mit lokalen Händlern verbinden.",
        hero_tagline: '"Lokal wird gesehen, dann wird es verkauft"',
        hero_cta_primary: "Kostenloses Händlerprofil Erstellen",
        hero_cta_secondary: "Händler Durchsuchen →",
        browse_title: "Stände in der Nähe Entdecken",
        browse_subtitle: "Finden Sie Straßenhändler und Handwerker, die jetzt geöffnet sind.",
        search_placeholder: "Nach Name, Ort oder Artikeln suchen...",
        category_heading: "Kategorie",
        category_all: "Alle",
        category_snacks: "Snacks",
        category_vegetables: "Gemüse",
        category_tea: "Tee",
        category_flowers: "Blumen",
        category_other: "Andere",
        filter_open_now: "Jetzt Geöffnet",
        filter_under_50: "Unter ₹50",
        walk_to_cart: "Zum Stand Gehen",
        call_vendor: "Händler Anrufen",
        status_open: "Jetzt Geöffnet",
        status_closed: "Derzeit Geschlossen",
        auth_tab_login: "Anmelden",
        auth_tab_register: "Konto Erstellen"
    },
    pt: {
        nav_home: "Início",
        nav_about: "Sobre Nós",
        nav_browse: "Procurar Vendedores",
        nav_contact: "Contato",
        nav_signup: "+ Adicionar Barraca",
        nav_my_stall: "Minha Barraca",
        nav_login: "Entrar",
        nav_logout: "Sair",
        nav_profile: "Perfil",
        location_label: "Lucknow, UP",
        hero_badge: "🚀 Capacitando mais de 500 vendedores locais",
        hero_title: "Visibilidade Digital para<br>Vendedores de Rua Locais",
        hero_subtitle: "Conectando comunidades com vendedores locais.",
        hero_tagline: '"O local será visto, então será vendido"',
        hero_cta_primary: "Criar Perfil de Vendedor Grátis",
        hero_cta_secondary: "Procurar Vendedores →",
        browse_title: "Descubra Barracas Próximas",
        browse_subtitle: "Encontre carrinhos de rua e artesãos abertos agora.",
        search_placeholder: "Buscar por nome, local ou itens...",
        category_heading: "Categoria",
        category_all: "Todos",
        category_snacks: "Lanches",
        category_vegetables: "Legumes",
        category_tea: "Chá",
        category_flowers: "Flores",
        category_other: "Outros",
        filter_open_now: "Aberto Agora",
        filter_under_50: "Menos de ₹50",
        walk_to_cart: "Ir à Barraca",
        call_vendor: "Ligar para Vendedor",
        status_open: "Aberto Agora",
        status_closed: "Fechado Atualmente",
        auth_tab_login: "Entrar",
        auth_tab_register: "Criar Conta"
    },
    bn: {
        nav_home: "হোম",
        nav_about: "আমাদের সম্পর্কে",
        nav_browse: "বিক্রেতা খুঁজুন",
        nav_contact: "যোগাযোগ",
        nav_signup: "+ স্টল যোগ করুন",
        nav_my_stall: "আমার স্টল",
        nav_login: "লগ ইন",
        nav_logout: "লগ আউট",
        nav_profile: "প্রোফাইল",
        location_label: "লখনউ, উত্তরপ্রদেশ",
        hero_badge: "🚀 500+ স্থানীয় বিক্রেতাদের ক্ষমতায়ন",
        hero_title: "স্থানীয় রাস্তার বিক্রেতাদের জন্য<br>ডিজিটাল দৃশ্যমানতা",
        hero_subtitle: "স্থানীয় বিক্রেতাদের সাথে সম্প্রদায়গুলিকে সংযুক্ত করা।",
        hero_tagline: '"স্থানীয় দেখা যাবে, তাহলে বিক্রি হবে"',
        hero_cta_primary: "বিনামূল্যে বিক্রেতা প্রোফাইল তৈরি করুন",
        hero_cta_secondary: "বিক্রেতা খুঁজুন →",
        browse_title: "নিকটবর্তী স্টল খুঁজুন",
        browse_subtitle: "বর্তমানে খোলা রাস্তার স্টল ও কারিগরদের খুঁজুন।",
        search_placeholder: "নাম, এলাকা বা আইটেম দিয়ে খুঁজুন...",
        category_heading: "বিভাগ",
        category_all: "সব",
        category_snacks: "স্ন্যাক্স",
        category_vegetables: "শাকসবজি",
        category_tea: "চা",
        category_flowers: "ফুল",
        category_other: "অন্যান্য",
        filter_open_now: "এখন খোলা",
        filter_under_50: "₹৫০ এর নিচে",
        walk_to_cart: "স্টলে হেঁটে যান",
        call_vendor: "বিক্রেতাকে কল করুন",
        status_open: "এখন খোলা",
        status_closed: "বর্তমানে বন্ধ",
        auth_tab_login: "লগ ইন",
        auth_tab_register: "অ্যাকাউন্ট তৈরি করুন"
    },
    ta: {
        nav_home: "முகப்பு",
        nav_about: "எங்களை பற்றி",
        nav_browse: "விற்பனையாளர்களைத் தேடு",
        nav_contact: "தொடர்பு",
        nav_signup: "+ கடையைச் சேர்க்கவும்",
        nav_my_stall: "எனது கடை",
        nav_login: "உள்நுழைக",
        nav_logout: "வெளியேறுக",
        nav_profile: "சுயவிவரம்",
        location_label: "லக்னோ, உ.பி",
        hero_badge: "🚀 500+ உள்ளூர் விற்பனையாளர்களுக்கு அதிகாரம் அளித்தல்",
        hero_title: "உள்ளூர் தெரு விற்பனையாளர்களுக்கான<br>டிஜிட்டல் தெரிவுநிலை",
        hero_subtitle: "உள்ளூர் விற்பனையாளர்களுடன் சமூகங்களை இணைத்தல்.",
        hero_tagline: '"உள்ளூர் தெரியும், பின்னர் விற்கும்"',
        hero_cta_primary: "இலவச விற்பனையாளர் சுயவிவரத்தை உருவாக்கவும்",
        hero_cta_secondary: "விற்பனையாளர்களைத் தேடு →",
        browse_title: "அருகிலுள்ள கடைகளைக் கண்டறியவும்",
        browse_subtitle: "தற்போது திறக்கப்பட்டுள்ள தெருக் கடைகளைக் கண்டறியவும்.",
        search_placeholder: "பெயர், பகுதி அல்லது பொருட்கள் மூலம் தேடவும்...",
        category_heading: "வகை",
        category_all: "அனைத்தும்",
        category_snacks: "சிற்றுண்டி",
        category_vegetables: "காய்கறிகள்",
        category_tea: "தேநீர்",
        category_flowers: "மலர்கள்",
        category_other: "பிற",
        filter_open_now: "இப்போது திறந்துள்ளது",
        filter_under_50: "₹50க்கு கீழ்",
        walk_to_cart: "கடைக்கு நடந்து செல்லுங்கள்",
        call_vendor: "அழைக்கவும்",
        status_open: "இப்போது திறந்துள்ளது",
        status_closed: "தற்போது மூடப்பட்டுள்ளது",
        auth_tab_login: "உள்நுழைக",
        auth_tab_register: "கணக்கை உருவாக்கு"
    },
    te: {
        nav_home: "హోమ్",
        nav_about: "మా గురించి",
        nav_browse: "విక్రేతలను శోధించండి",
        nav_contact: "సంప్రదించండి",
        nav_signup: "+ దుకాణాన్ని జోడించండి",
        nav_my_stall: "నా దుకాణం",
        nav_login: "లాగిన్",
        nav_logout: "లాగ్ అవుట్",
        nav_profile: "ప్రొఫైల్",
        location_label: "లక్నో, యు.పి",
        hero_badge: "🚀 500+ స్థానిక విక్రేతలకు అధికారం ఇవ్వడం",
        hero_title: "స్థానిక వీధి విక్రేతల కోసం<br>డిజిటల్ దృశ్యమానత",
        hero_subtitle: "స్థానిక విక్రేతలతో సంఘాలను కనెక్ట్ చేయడం.",
        hero_tagline: '"స్థానికం కనిపిస్తుంది, అప్పుడు అమ్ముడవుతుంది"',
        hero_cta_primary: "ఉచిత విక్రేత ప్రొఫైల్‌ను సృష్టించండి",
        hero_cta_secondary: "విక్రేతలను శోధించండి →",
        browse_title: "సమీప దుకాణాలను కనుగొనండి",
        browse_subtitle: "ప్రస్తుతం తెరిచి ఉన్న వీధి దుకాణాలను కనుగొనండి.",
        search_placeholder: "పేరు, ప్రాంతం లేదా వస్తువుల ద్వారా శోధించండి...",
        category_heading: "వర్గం",
        category_all: "అన్నీ",
        category_snacks: "స్నాక్స్",
        category_vegetables: "కూరగాయలు",
        category_tea: "టీ",
        category_flowers: "పూలు",
        category_other: "ఇతరాలు",
        filter_open_now: "ఇప్పుడు తెరిచి ఉంది",
        filter_under_50: "₹50 లోపు",
        walk_to_cart: "దుకాణానికి నడవండి",
        call_vendor: "కాల్ చేయండి",
        status_open: "ఇప్పుడు తెరిచి ఉంది",
        status_closed: "ప్రస్తుతం మూసివేయబడింది",
        auth_tab_login: "లాగిన్",
        auth_tab_register: "ఖాతాను సృష్టించండి"
    },
    mr: {
        nav_home: "मुख्यपृष्ठ",
        nav_about: "आमच्याबद्दल",
        nav_browse: "विक्रेते शोधा",
        nav_contact: "संपर्क",
        nav_signup: "+ स्टॉल जोडा",
        nav_my_stall: "माझा स्टॉल",
        nav_login: "लॉग इन",
        nav_logout: "लॉग आउट",
        nav_profile: "प्रोफाइल",
        location_label: "लखनौ, यु.पी",
        hero_badge: "🚀 500+ स्थानिक विक्रेत्यांना सशक्त करणे",
        hero_title: "स्थानिक रस्त्यावरील विक्रेत्यांसाठी<br>डिजिटल दृश्यमानता",
        hero_subtitle: "स्थानिक विक्रेत्यांसह समुदायांना जोडणे.",
        hero_tagline: '"स्थानिक दिसेल, तरच विकेल"',
        hero_cta_primary: "मोफत विक्रेता प्रोफाइल तयार करा",
        hero_cta_secondary: "विक्रेते शोधा →",
        browse_title: "जवळील स्टॉल्स शोधा",
        browse_subtitle: "सध्या सुरू असलेले रस्त्यावरील स्टॉल्स शोधा.",
        search_placeholder: "नाव, परिसर किंवा वस्तूंनुसार शोधा...",
        category_heading: "प्रवर्ग",
        category_all: "सर्व",
        category_snacks: "स्नॅक्स",
        category_vegetables: "भाज्या",
        category_tea: "चहा",
        category_flowers: "फुले",
        category_other: "इतर",
        filter_open_now: "आता सुरू आहे",
        filter_under_50: "₹५० पेक्षा कमी",
        walk_to_cart: "स्टॉलकडे चालत जा",
        call_vendor: "कॉल करा",
        status_open: "आता सुरू आहे",
        status_closed: "सध्या बंद आहे",
        auth_tab_login: "लॉग इन",
        auth_tab_register: "खाते तयार करा"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "معلومات عنا",
        nav_browse: "تصفح البائعين",
        nav_contact: "اتصل",
        nav_signup: "+ إضافة كشك",
        nav_my_stall: "كشكي",
        nav_login: "تسجيل الدخول",
        nav_logout: "تسجيل الخروج",
        nav_profile: "الملف الشخصي",
        location_label: "لكناو، أوتار براديش",
        hero_badge: "🚀 تمكين أكثر من 500 بائع محلي",
        hero_title: "الرؤية الرقمية<br>لبائعي الشوارع المحليين",
        hero_subtitle: "ربط المجتمعات بالبائعين المحليين.",
        hero_tagline: '"المحلي سيُرى، ثم سيُباع"',
        hero_cta_primary: "إنشاء ملف تعريف بائع مجاني",
        hero_cta_secondary: "تصفح البائعين ←",
        browse_title: "اكتشف الأكشاك القريبة",
        browse_subtitle: "حدد مواقع أكشاك الشوارع المفتوحة الآن.",
        search_placeholder: "ابحث بالاسم أو المنطقة أو الأصناف...",
        category_heading: "الفئة",
        category_all: "الكل",
        category_snacks: "وجبات خفيفة",
        category_vegetables: "خضروات",
        category_tea: "شاي",
        category_flowers: "زهور",
        category_other: "أخرى",
        filter_open_now: "مفتوح الآن",
        filter_under_50: "أقل من 50 روبية",
        walk_to_cart: "المشي إلى الكشك",
        call_vendor: "اتصل بالبائع",
        status_open: "مفتوح الآن",
        status_closed: "مغلق حالياً",
        auth_tab_login: "تسجيل الدخول",
        auth_tab_register: "إنشاء حساب"
    },
    zh: {
        nav_home: "首页",
        nav_about: "关于我们",
        nav_browse: "浏览供应商",
        nav_contact: "联系我们",
        nav_signup: "+ 添加摊位",
        nav_my_stall: "我的摊位",
        nav_login: "登录",
        nav_logout: "登出",
        nav_profile: "个人资料",
        location_label: "勒克瑙，北方邦",
        hero_badge: "🚀 赋能500+本地供应商",
        hero_title: "本地街头供应商的<br>数字可见性",
        hero_subtitle: "将社区与本地供应商连接起来。",
        hero_tagline: '"本地可见，才能销售"',
        hero_cta_primary: "创建免费供应商资料",
        hero_cta_secondary: "浏览供应商 →",
        browse_title: "发现附近的摊位",
        browse_subtitle: "查找当前正在营业的街头推车与手艺人。",
        search_placeholder: "按名称、区域或商品搜索...",
        category_heading: "分类",
        category_all: "全部",
        category_snacks: "小吃",
        category_vegetables: "蔬菜",
        category_tea: "茶饮",
        category_flowers: "鲜花",
        category_other: "其他",
        filter_open_now: "正在营业",
        filter_under_50: "低于₹50",
        walk_to_cart: "步行前往",
        call_vendor: "拨打电话",
        status_open: "正在营业",
        status_closed: "暂停营业",
        auth_tab_login: "登录",
        auth_tab_register: "创建账户"
    }
};

// =========================================================================
// VENDOR CONTENT LOCALIZATION DATASET (Phase C)
// Multilingual data structure mapping stable vendor IDs 1-25 & categories
// =========================================================================
const VENDOR_CONTENT_TRANSLATIONS = {
    hi: {
        categories: {
            "All": "सभी",
            "Snacks": "नाश्ता व चाट",
            "Vegetables": "सब्जियां",
            "Tea": "चाय",
            "Flowers": "फूल",
            "Other": "अन्य सेवाएं"
        },
        vendors: {
            1: {
                name: "अवध चाट कॉर्नर",
                description: "मसालेदार छोले, मीठी दही और अवधी जीरा पानी के साथ तैयार कुरकुरी आलू बास्केट चाट के लिए प्रसिद्ध।",
                landmark: "कैथेड्रल चर्च गेट के पास",
                products: ["बास्केट चाट", "पानी बताशे", "दही पापड़ी", "मटर टिक्की"],
                menuItems: [
                    { name: "सिग्नेचर बास्केट चाट", desc: "मसालेदार चना, मीठी दही और चटनी से भरी कुरकुरी आलू की टोकरी" },
                    { name: "पानी बताशे (6 नग)", desc: "हिंग और पोदीना-धनिया जलजीरा के साथ करारे बताशे" },
                    { name: "दही पापड़ी चाट", desc: "गाढ़े दही, भुना जीरा और सोंठ की चटनी से सजी पापड़ी" },
                    { name: "मटर टिक्की प्लेट", desc: "अदरक लच्छे और नींबू के साथ तवे पर सिकी सफेद मटर की टिक्की" }
                ]
            },
            2: {
                name: "चौरसिया निमिश एवं खस्ता",
                description: "पारंपरिक चौक की ओस, केसर और पिस्ता से मथी हुई मक्खन मलाई, खस्ता उड़द कचौरी के साथ।",
                landmark: "गोल दरवाजा मार्केट के पास",
                products: ["मक्खन मलाई (निमिश)", "उड़द खस्ता", "हींग कचौरी", "आलू झोल"],
                menuItems: [
                    { name: "निमिश / मक्खन मलाई (कुल्हड़)", desc: "केसर, पिस्ता और चांदी के वर्क से सजी झागदार मलाई" },
                    { name: "उड़द दाल खस्ता (2 नग)", desc: "मसालेदार उड़द दाल की भरावन से बनी कुरकुरी पूरियां" },
                    { name: "आलू झोल हींग कचौरी के साथ", desc: "गरमा-गरम तीखे आलू के रसे के साथ कुरकुरी कचौरी" },
                    { name: "कस्तूरी मेथी पूरी", desc: "ताजी मेथी के स्वाद वाली तली पूरी अचार के साथ" }
                ]
            },
            3: {
                name: "गंगा प्रसाद दही गुजिया",
                description: "मीठी दही और भुने जीरे, काले नमक और सोंठ की चटनी में भीगी मेवों से भरी दही गुजिया।",
                landmark: "मोहन मार्केट लेन के सामने",
                products: ["दही गुजिया", "खस्ता पापड़ी", "कटोरी चाट", "सोंठ चटनी पूरी"],
                menuItems: [
                    { name: "अवधी दही गुजिया", desc: "मेवे से भरी दाल की मुलायम गुजिया, मीठी दही में भीगी" },
                    { name: "सेव पापड़ी चाट", desc: "मसालेदार सेव, आलू और हरी मिर्च से भरपूर कुरकुरी पापड़ी" },
                    { name: "कटोरी चाट", desc: "उबले अंकुरित अनाज, अनार और चटनियों से भरी तली कटोरी" },
                    { name: "पानी पूरी खस्ता कॉम्बो", desc: "विभिन्न तीखे और खट्टे पानी के साथ पांच बताशे" }
                ]
            },
            4: {
                name: "गोमती पांच-पानी बताशे",
                description: "सेंधा नमक और भुने मसालों से तैयार पांच तरह के ठंडे पानी के साथ हाथ से बने कुरकुरे बताशे।",
                landmark: "पत्रकारपुरम चौराहा के पास",
                products: ["हींग पानी पूरी", "जीरा बताशे", "पुदीना बताशे", "मीठा बताशा"],
                menuItems: [
                    { name: "पांच-पानी बताशे टेस्टिंग प्लेट", desc: "हींग, पुदीना, नींबू, कच्चा आम और सोंठ का पानी" },
                    { name: "क्लासिक हींग पानी पूरी", desc: "ताजी पिसी हींग के तीखे पानी के साथ छह बताशे" },
                    { name: "मीठे दही बताशे", desc: "दही, मीठी सोंठ और बूंदी से भरे बताशे" },
                    { name: "सूखा पूरी भेल", desc: "नींबू, कटे धनिए और मसालेदार प्याज के साथ सूखी पूरी" }
                ]
            },
            5: {
                name: "अवधी स्वाद टिक्की कियोस्क",
                description: "शुद्ध देसी घी में बड़े लोहे के तवे पर धीमी आंच पर सिकी कुरकुरी आलू टिक्की।",
                landmark: "चंदर नगर चौराहा के पास",
                products: ["देसी घी आलू टिक्की", "छोले टिक्की", "भल्ला पापड़ी", "मटर चाट"],
                menuItems: [
                    { name: "देसी घी आलू टिक्की प्लेट", desc: "शुद्ध घी में तली आलू टिक्की छोले और चटनी के साथ" },
                    { name: "दही भल्ला स्पेशल", desc: "ठंडी मीठी दही में डूबे नर्म उड़द दाल के भल्ले" },
                    { name: "छोले टिक्की मसाला", desc: "मसालेदार काबुली चने और कद्दूकस मूली से सजी दो टिक्की" }
                ]
            },
            6: {
                name: "मुन्ना जी मटर कुलचा कार्ट",
                description: "नींबू, बारीक प्याज और हरी मिर्च से बने चटपटे सफेद मटर, तवे पर सिंक मक्खन कुलचे के साथ।",
                landmark: "भूतनाथ मार्केट पार्किंग के पास",
                products: ["मक्खन मटर कुलचा", "मसाला छाछ", "आमचूर चटनी कुलचा"],
                menuItems: [
                    { name: "स्पेशल मटर कुलचा (2 कुलचे)", desc: "मक्खन में सिंक नरम कुलचे चटपटे उबले मटर के साथ" },
                    { name: "भुना जीरा मसाला छाछ", desc: "पुदीना और भुना जीरा से तैयार ठंडी छाछ" }
                ]
            },
            7: {
                name: "शाही रबड़ी कुल्फी कार्ट",
                description: "मिट्टी के मटकों में बर्फ-नमक में जमी पारंपरिक मलाईदार पिस्ता-केसर कुल्फी लच्छेदार रबड़ी के साथ।",
                landmark: "मेफेयर सिनेमा कॉर्नर के पास",
                products: ["मटका कुल्फी", "शाही रबड़ी फालूदा", "केसर पिस्ता कुल्फी", "पान कुल्फी"],
                menuItems: [
                    { name: "शाही रबड़ी फालूदा कुल्फी", desc: "गाढ़ी लच्छेदार रबड़ी, गुलाब शरबत और फालूदा के साथ कुल्फी" },
                    { name: "केसरिया मटका कुल्फी", desc: "केसर, इलायची और कटे पिस्ते से भरपूर कुल्फी" }
                ]
            },
            8: {
                name: "शंभू हरी सब्जी मंडी ठेला",
                description: "किसान मंडी से प्रतिदिन तड़के लाई गई ताजी हरी पालक, मेथी, परवल और गोभी।",
                landmark: "चौक सब्जी मंडी प्रवेश द्वार",
                products: ["देसी पालक", "ताजा मेथी", "हरी मटर", "परवल", "फूलगोभी"],
                menuItems: [
                    { name: "ताजा देसी पालक (प्रति किलो)", desc: "खेत से सीधी लाई गई मुलायम पत्तीदार पालक" },
                    { name: "मीठी हरी मटर (प्रति किलो)", desc: "ताजे तोड़े गए मीठे मटर के दाने" }
                ]
            },
            9: {
                name: "रामू ताजा फल एवं शाकभाजी",
                description: "अमीनाबाद में स्थानीय बागों के अमरूद, मौसमी फल और हर दिन की ताजी मौसमी सब्जियां।",
                landmark: "प्रताप मार्केट कॉर्नर के पास",
                products: ["लखनऊ सफेदा अमरूद", "ताजा नींबू", "अदरक", "देसी टमाटर"],
                menuItems: [
                    { name: "लखनऊ सफेदा अमरूद (प्रति किलो)", desc: "मीठे और सुगंधित सफेद अमरूद" },
                    { name: "देसी खट्टे टमाटर (प्रति किलो)", desc: "देसी सलाद व ग्रेवी वाले लाल टमाटर" }
                ]
            },
            10: {
                name: "किसान फ्रेश ग्रीन्स कार्ट",
                description: "गोमती नगर निवासियों के लिए सीधे खेत से लाई गई ताजी सब्जियां, ब्रोकली और शिमला मिर्च।",
                landmark: "विवेक खंड पार्क के पास",
                products: ["हरी शिमला मिर्च", "देसी खीरा", "हरी मिर्च", "ताजा धनिया"],
                menuItems: [
                    { name: "क्रंची देसी खीरा (प्रति किलो)", desc: "ताजा और रसीला सलाद खीरा" },
                    { name: "हरी शिमला मिर्च (प्रति किलो)", desc: "ताजी और खस्ता हरी शिमला मिर्च" }
                ]
            },
            11: {
                name: "छोटे लाल कांदा-बटाटा ठेला",
                description: "छांटे हुए लाल प्याज, नए आलू और लहसुन की बोरियां उचित दाम पर।",
                landmark: "आलमबाग बस डिपो लेन के पास",
                products: ["लाल प्याज", "पहाड़ी नया आलू", "देसी लहसुन"],
                menuItems: [
                    { name: "छांटा हुआ लाल प्याज (5 किलो बैग)", desc: "सूखा और टिकाऊ मध्यम आकार का प्याज" },
                    { name: "नया आलू (5 किलो बैग)", desc: "सब्जी और चिप्स के लिए उत्तम नया आलू" }
                ]
            },
            12: {
                name: "शुक्ला जी फ्रेश वेजिटेबल हैंडकार्ट",
                description: "इंदिरा नगर में सुबह-शाम कॉलोनी में ताजा परवल, तोरी, लौकी और बीन्स बेचने वाला ठेला।",
                landmark: "सेक्टर 14 पानी की टंकी के पास",
                products: ["ताजी लौकी", "हरी तोरी", "बीन्स", "देसी भिंडी"],
                menuItems: [
                    { name: "मुलायम देसी लौकी (प्रति नग)", desc: "हल्की और ताजी हरी गोल लौकी" },
                    { name: "ताजी हरी भिंडी (प्रति किलो)", desc: "बिना रेशे वाली कोमल भिंडी" }
                ]
            },
            13: {
                name: "हजरतगंज कुल्हड़ कैफे",
                description: "अदरक और छोटी इलायची की खौलती कड़क चाय, टेराकोटा मिट्टी के कुल्हड़ में परोसी जाती है।",
                landmark: "हनुमान मंदिर के पास, हजरतगंज",
                products: ["अदरक कुल्हड़ चाय", "इलायची स्पेशल चाय", "मक्खन टोस्ट", "बन मक्खन"],
                menuItems: [
                    { name: "स्पेशल अदरक-इलायची कुल्हड़ चाय", desc: "मिट्टी की सौंधी खुशबू वाली गाढ़ी कड़क चाय" },
                    { name: "लखनऊ बन मक्खन", desc: "ताजे बन पर अमूल मक्खन की परत" }
                ]
            },
            14: {
                name: "कश्मीरी गुलाबी चाय स्टॉल",
                description: "बादाम, पिस्ता और हल्की समुद्री नमक के साथ घंटों खौलाई गई पारंपरिक नून चाय।",
                landmark: "अकबरी गेट, चौक",
                products: ["गुलाबी नून चाय", "बाकरखानी", "केसरिया कहवा"],
                menuItems: [
                    { name: "पिस्ता बादाम गुलाबी चाय", desc: "गुलाबी रंग की नमकीन-मलाईदार चाय कतरे मेवों के साथ" },
                    { name: "कुरकुरी बाकरखानी (2 नग)", desc: "पारंपरिक तंदूरी परतदार रोटी चाय में डुबोने के लिए" }
                ]
            },
            15: {
                name: "कैसर जाफरानी चाय",
                description: "कश्मीर के शुद्ध केसर और दालचीनी के अर्क से धीमी आंच पर पकाई गई जाफरानी चाय।",
                landmark: "कैसरबाग बस स्टैंड के पास",
                products: ["जाफरानी केसर चाय", "मलाई मारके चाय", "मट्ठी"],
                menuItems: [
                    { name: "असली जाफरानी चाय (कुल्हड़)", desc: "शुद्ध केसर के धागों से सुगंधित चाय" },
                    { name: "अजवाइन खस्ता मट्ठी", desc: "देसी घी की बनी कुरकुरी मट्ठी" }
                ]
            },
            16: {
                name: "गोमती तंदूरी चाय स्पॉट",
                description: "दहकते मिट्टी के कुल्हड़ को तंदूर से निकालकर चाय में डुबोकर दिया जाने वाला स्मोकी स्वाद।",
                landmark: "रिवरफ्रंट पार्क गेट 2 के पास",
                products: ["तंदूरी स्मोकी चाय", "मसाला चाय", "रस्क बिस्कुट"],
                menuItems: [
                    { name: "तंदूरी कुल्हड़ चाय", desc: "दहकते कुल्हड़ में खौलती स्मोकी फ्लेवर वाली चाय" },
                    { name: "सूजी इलायची रस्क (4 नग)", desc: "क्रिस्पी रस्क चाय के साथ" }
                ]
            },
            17: {
                name: "आलमबाग स्टेशन कड़क चाय",
                description: "दिन-रात खुली रहने वाली तेज पत्ती और कुटी काली मिर्च की ऊर्जादायक रेलवे कड़क चाय।",
                landmark: "आलमबाग रेलवे कॉलोनी चौराहा",
                products: ["रेलवे कड़क चाय", "काली मिर्च चाय", "समोसा"],
                menuItems: [
                    { name: "डबल पत्ती कड़क चाय", desc: "थकान मिटाने वाली तेज चाय" },
                    { name: "गरमा-गरम आलू समोसा", desc: "पुदीना चटनी के साथ ताजा तला समोसा" }
                ]
            },
            18: {
                name: "अवध गेंदा एवं गुलाब माला",
                description: "मंदिर पूजा और स्वागत के लिए ताजे गेंदे, गुलाब और तुलसी की मालाएं।",
                landmark: "कोनेश्वर महादेव मंदिर के पास",
                products: ["गेंदा फूल माला", "गुलाब की पंखुड़ियां", "पूजा दूर्वा", "तुलसी दल"],
                menuItems: [
                    { name: "ताजा गेंदा माला (जोड़ी)", desc: "पीले और नारंगी गेंदे की गूंथी हुई सुंदर माला" },
                    { name: "देसी लाल गुलाब पंखुड़ी (250 ग्राम)", desc: "पूजा एवं सजावट के लिए महकते गुलाब" }
                ]
            },
            19: {
                name: "गंज बेला एवं जैस्मिन कियोस्क",
                description: "शाम को महकते बेला, जूही और मोगरे के गजरे और कार डैशबोर्ड के लिए ताजे फूल।",
                landmark: "हजरतगंज मल्टीलेवल पार्किंग के सामने",
                products: ["मोगरा गजरा", "बेला वेणी", "कार हैंगिंग माला"],
                menuItems: [
                    { name: "हाथ से बना मोगरा गजरा", desc: "बालों और कलाई के लिए सुगंधित मोगरे के फूल" },
                    { name: "बेला वेणी माला", desc: "सफेद बेला की सौम्य खुशबूदार माला" }
                ]
            },
            20: {
                name: "भूतनाथ सेक्रेड फ्लावर्स",
                description: "भूतनाथ मंदिर दर्शन के लिए बेलपत्र, धतूरा, कमल गट्टा और दैनिक पूजा टोकरी।",
                landmark: "भूतनाथ मंदिर मुख्य द्वार",
                products: ["दैनिक पूजा थाली", "बेलपत्र", "नीलकमल", "धतूरा"],
                menuItems: [
                    { name: "पूर्ण शिव पूजा टोकरी", desc: "बेलपत्र, धतूरा, आक के फूल और भस्म का संपुट" },
                    { name: "लाल कमल का फूल", desc: "अनुष्ठान एवं विशेष अर्चना हेतु" }
                ]
            },
            21: {
                name: "नजीर चिकन एम्ब्रॉयडरी रफू",
                description: "लखनऊ के नाजुक चिकनकारी कुर्ते, साड़ियों की अदृश्य रफू और धागा मरम्मत के माहिर कारीगर।",
                landmark: "टेढ़ी पुलिया, चौक",
                products: ["अदृश्य रफू", "चिकनकारी धागा मरम्मत", "जरी काम ठीक करना"],
                menuItems: [
                    { name: "बारीक चिकन रफू कार्य", desc: "पुराने फटे कपड़े को बिना निशान के रफू करना" },
                    { name: "धागा मैचिंग एवं बटन टांकना", desc: "सटीक शेड धागे से मरम्मत" }
                ]
            },
            22: {
                name: "कैलाश फुटवियर एवं लेदर वर्क्स",
                description: "हजरतगंज में जूतों की सिलाई, लेदर हील मरम्मत और इंस्टेंट पॉलिश की पुरानी दुकान।",
                landmark: "हलवासिया कोर्ट के पीछे",
                products: ["जूता सिलाई", "लेदर सोल मरम्मत", "पॉलिश"],
                menuItems: [
                    { name: "मजबूत नायलॉन धागा सिलाई", desc: "जूते और सैंडल की पक्की सिलाई" },
                    { name: "लेदर बफिंग एवं वैक्स पॉलिश", desc: "चमड़े के जूतों की गहरी चमक" }
                ]
            },
            23: {
                name: "अमीनाबाद कीमेकर एवं लॉकस्मिथ",
                description: "डुप्लीकेट चाबी बनाने, कार रिमोट बैटरी बदलने और ताले की मरम्मत में 25 वर्षों का अनुभव।",
                landmark: "गड़बड़झाला मार्केट प्रवेश",
                products: ["डुप्लीकेट चाबी", "कार रिमोट चाबी", "ताला रिपेयर"],
                menuItems: [
                    { name: "कंप्यूटराइज्ड पीतल चाबी कटिंग", desc: "5 मिनट में सटीक डुप्लीकेट चाबी" },
                    { name: "गोदरेज ताला सर्विसिंग", desc: "जाम तालों की सफाई और चाबी निर्माण" }
                ]
            },
            24: {
                name: "मनोज बाइसिकल पंक्चर एवं केयर",
                description: "साइकिल पंक्चर, हवा, चेन आयलिंग और ब्रेक मरम्मत का त्वरित और भरोसेमंद स्टॉल।",
                landmark: "मनोज पाण्डेय चौराहा, गोमती नगर",
                products: ["ट्यूब पंक्चर रिपेयर", "हवा", "ब्रेक सेटिंग", "चेन ल्यूब"],
                menuItems: [
                    { name: "हॉट पैच पंक्चर रिपेयर", desc: "गर्म टिकली से पक्का और टिकाऊ पंक्चर" },
                    { name: "कंप्लीट ब्रेक व चेन ट्यून-अप", desc: "चिकनाई और ब्रेक तार एडजस्टमेंट" }
                ]
            },
            25: {
                name: "राम मिलन चाकू एवं कैंची धारक",
                description: "घूर्णन पहिए पर घरेलू रसोई के चाकुओं, कैंचियों और सरोते पर पानी चढ़ाकर पैनी धार लगाना।",
                landmark: "आलमबाग सब्जी मंडी चौराहा",
                products: ["चाकू धार लगाना", "कैंची धार", "सरोता रिपेयर"],
                menuItems: [
                    { name: "रसोई चाकू पैना करना (प्रति नग)", desc: "सब्जी और फल काटने के लिए तेज धार" },
                    { name: "दर्जी की कैंची धार", desc: "कपड़ा काटने वाली कैंची की संतुलित धार" }
                ]
            }
        }
    }
};

// =========================================================================
// TRANSLATION ENGINE & RESOLVERS
// =========================================================================

// Read current language from localStorage or default to English
let currentLanguage = localStorage.getItem('streetkart_language') || 'en';

// UI translation function with fallback: Selected Language -> English -> key
function t(key) {
    if (!key) return '';
    return translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
}

// Get localized text for a vendor entity field
function getLocalizedText(entity, field, locale = currentLanguage) {
    if (!entity) return '';
    const id = entity.id !== undefined ? entity.id : entity;

    // 1. Check in VENDOR_CONTENT_TRANSLATIONS for locale
    if (VENDOR_CONTENT_TRANSLATIONS[locale]?.vendors?.[id]?.[field]) {
        return VENDOR_CONTENT_TRANSLATIONS[locale].vendors[id][field];
    }
    // 2. English fallback
    if (VENDOR_CONTENT_TRANSLATIONS['en']?.vendors?.[id]?.[field]) {
        return VENDOR_CONTENT_TRANSLATIONS['en'].vendors[id][field];
    }
    // 3. Object-based translation on entity
    if (entity[field] && typeof entity[field] === 'object' && !Array.isArray(entity[field])) {
        return entity[field][locale] || entity[field]['en'] || Object.values(entity[field])[0] || '';
    }
    // 4. Default to entity property
    if (entity[field] !== undefined && entity[field] !== null) {
        return entity[field];
    }
    return '';
}

// Get localized category name
function getLocalizedCategory(categoryName, locale = currentLanguage) {
    if (!categoryName) return '';
    return VENDOR_CONTENT_TRANSLATIONS[locale]?.categories?.[categoryName]
        || translations[locale]?.[`category_${categoryName.toLowerCase()}`]
        || VENDOR_CONTENT_TRANSLATIONS['en']?.categories?.[categoryName]
        || categoryName;
}

// Get localized menu item
function getLocalizedMenuItem(item, vendorId, itemIndex, locale = currentLanguage) {
    if (!item) return { name: '', price: '', desc: '' };
    let name = item.name;
    let desc = item.desc;

    if (vendorId !== undefined && itemIndex !== undefined) {
        const trans = VENDOR_CONTENT_TRANSLATIONS[locale]?.vendors?.[vendorId]?.menuItems?.[itemIndex];
        if (trans) {
            if (trans.name) name = trans.name;
            if (trans.desc) desc = trans.desc;
        } else {
            const enTrans = VENDOR_CONTENT_TRANSLATIONS['en']?.vendors?.[vendorId]?.menuItems?.[itemIndex];
            if (enTrans) {
                if (enTrans.name) name = enTrans.name;
                if (enTrans.desc) desc = enTrans.desc;
            }
        }
    }
    return {
        ...item,
        name,
        desc
    };
}

// Get localized vendor object for rendering
function getLocalizedVendor(vendor, locale = currentLanguage) {
    if (!vendor) return vendor;
    const vendorId = vendor.id;
    const trans = VENDOR_CONTENT_TRANSLATIONS[locale]?.vendors?.[vendorId];

    const localizedItems = Array.isArray(vendor.menuItems)
        ? vendor.menuItems.map((item, idx) => getLocalizedMenuItem(item, vendorId, idx, locale))
        : (vendor.products || []).map((p, idx) => {
            const pTrans = trans?.products?.[idx];
            return {
                name: pTrans || p,
                price: vendor.priceRange || '₹30',
                desc: 'Freshly prepared at cart'
            };
        });

    return {
        ...vendor,
        name: trans?.name || vendor.name,
        description: trans?.description || vendor.description,
        landmark: trans?.landmark || vendor.landmark,
        category: vendor.category, // Keep original category for filtering logic
        categoryDisplay: getLocalizedCategory(vendor.category, locale),
        products: Array.isArray(trans?.products) ? trans.products : vendor.products,
        menuItems: localizedItems
    };
}

// Get current language metadata
function getCurrentLanguageInfo() {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
}

// Toggle language dropdown menu
function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    dropdown?.classList.toggle('active');
}

// Close dropdown on click outside
document.addEventListener('click', (e) => {
    const langSwitcher = document.querySelector('.lang-switcher');
    const dropdown = document.querySelector('.lang-dropdown');

    if (langSwitcher && dropdown && !langSwitcher.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Update all translated elements in DOM
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translated = t(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translated;
        } else {
            element.innerHTML = translated;
        }
    });
}

// Switch language function
function switchLanguage(langCode) {
    currentLanguage = langCode;
    localStorage.setItem('streetkart_language', langCode);

    // Update all elements with data-i18n attribute
    applyTranslations();

    // Update current language display in button
    updateLanguageDisplay();

    // Close dropdown
    const dropdown = document.querySelector('.lang-dropdown');
    dropdown?.classList.remove('active');

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-lang-code="${langCode}"]`)?.classList.add('active');

    // Dispatch global event for live components
    window.dispatchEvent(new CustomEvent('streetkart:languageChanged', {
        detail: { language: langCode }
    }));

    // Show toast notification
    const langInfo = languages.find(l => l.code === langCode);
    if (window.ToastManager && langInfo) {
        ToastManager.success(`Language changed to ${langInfo.nativeName}`);
    }
}

// Update language display in button
function updateLanguageDisplay() {
    const langInfo = getCurrentLanguageInfo();
    const currentBtn = document.querySelector('.lang-current');
    if (currentBtn) {
        currentBtn.innerHTML = `
      <span class="lang-icon">${langInfo.flag}</span>
      <span>${langInfo.code.toUpperCase()}</span>
      <span style="margin-left: auto;">▼</span>
    `;
    }
}

// Initialize language switcher
function initLanguageSwitcher() {
    const langSwitcher = document.querySelector('.lang-switcher');
    if (!langSwitcher) return;

    const langInfo = getCurrentLanguageInfo();

    // Create language switcher HTML
    langSwitcher.innerHTML = `
    <button class="lang-current" onclick="toggleLanguageDropdown()">
      <span class="lang-icon">${langInfo.flag}</span>
      <span>${langInfo.code.toUpperCase()}</span>
      <span style="margin-left: auto;">▼</span>
    </button>
    <div class="lang-dropdown">
      ${languages.map(lang => `
        <button class="lang-option ${lang.code === currentLanguage ? 'active' : ''}" 
                data-lang-code="${lang.code}" 
                onclick="switchLanguage('${lang.code}')">
          <span class="lang-option-flag">${lang.flag}</span>
          <span class="lang-option-name">${lang.nativeName}</span>
          <span class="lang-option-code">${lang.code}</span>
        </button>
      `).join('')}
    </div>
  `;
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    applyTranslations();
});

// Expose on window object
if (typeof window !== 'undefined') {
    window.StreetKartI18n = {
        languages,
        translations,
        VENDOR_CONTENT_TRANSLATIONS,
        t,
        getLocalizedText,
        getLocalizedCategory,
        getLocalizedMenuItem,
        getLocalizedVendor,
        switchLanguage,
        applyTranslations,
        getCurrentLanguage: () => currentLanguage
    };
    window.t = t;
    window.switchLanguage = switchLanguage;
    window.getLocalizedText = getLocalizedText;
    window.getLocalizedCategory = getLocalizedCategory;
    window.getLocalizedMenuItem = getLocalizedMenuItem;
    window.getLocalizedVendor = getLocalizedVendor;
}
