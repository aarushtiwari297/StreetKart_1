// StreetKart - Multilingual Support
// Supporting 10+ major languages for global reach

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
        nav_signup: "Vendor Signup",
        hero_badge: "🚀 Empowering 500+ Local Vendors",
        hero_title: "Digital Visibility for<br>Local Street Vendors",
        hero_subtitle: "Connecting communities with local vendors.",
        hero_tagline: '"Local dikhega, tabhi bikega"',
        hero_cta_primary: "Create Free Vendor Profile",
        hero_cta_secondary: "Browse Vendors →",
    },
    hi: {
        nav_home: "होम",
        nav_about: "हमारे बारे में",
        nav_browse: "विक्रेता खोजें",
        nav_contact: "संपर्क करें",
        nav_signup: "विक्रेता पंजीकरण",
        hero_badge: "🚀 500+ स्थानीय विक्रेताओं को सशक्त बना रहे हैं",
        hero_title: "स्थानीय स्ट्रीट विक्रेताओं के लिए<br>डिजिटल दृश्यता",
        hero_subtitle: "समुदायों को स्थानीय विक्रेताओं से जोड़ना।",
        hero_tagline: '"लोकल दिखेगा, तभी बिकेगा"',
        hero_cta_primary: "मुफ्त विक्रेता प्रोफाइल बनाएं",
        hero_cta_secondary: "विक्रेता खोजें →",
    },
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre Nosotros",
        nav_browse: "Buscar Vendedores",
        nav_contact: "Contacto",
        nav_signup: "Registro de Vendedor",
        hero_badge: "🚀 Empoderando a más de 500 vendedores locales",
        hero_title: "Visibilidad Digital para<br>Vendedores Callejeros Locales",
        hero_subtitle: "Conectando comunidades con vendedores locales.",
        hero_tagline: '"Local se verá, entonces se venderá"',
        hero_cta_primary: "Crear Perfil de Vendedor Gratis",
        hero_cta_secondary: "Buscar Vendedores →",
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_browse: "Parcourir les Vendeurs",
        nav_contact: "Contact",
        nav_signup: "Inscription Vendeur",
        hero_badge: "🚀 Autonomiser plus de 500 vendeurs locaux",
        hero_title: "Visibilité Numérique pour<br>les Vendeurs de Rue Locaux",
        hero_subtitle: "Connecter les communautés avec les vendeurs locaux.",
        hero_tagline: '"Le local sera vu, alors il se vendra"',
        hero_cta_primary: "Créer un Profil Vendeur Gratuit",
        hero_cta_secondary: "Parcourir les Vendeurs →",
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über Uns",
        nav_browse: "Händler Durchsuchen",
        nav_contact: "Kontakt",
        nav_signup: "Händler-Anmeldung",
        hero_badge: "🚀 Stärkung von über 500 lokalen Händlern",
        hero_title: "Digitale Sichtbarkeit für<br>Lokale Straßenhändler",
        hero_subtitle: "Gemeinschaften mit lokalen Händlern verbinden.",
        hero_tagline: '"Lokal wird gesehen, dann wird es verkauft"',
        hero_cta_primary: "Kostenloses Händlerprofil Erstellen",
        hero_cta_secondary: "Händler Durchsuchen →",
    },
    pt: {
        nav_home: "Início",
        nav_about: "Sobre Nós",
        nav_browse: "Procurar Vendedores",
        nav_contact: "Contato",
        nav_signup: "Cadastro de Vendedor",
        hero_badge: "🚀 Capacitando mais de 500 vendedores locais",
        hero_title: "Visibilidade Digital para<br>Vendedores de Rua Locais",
        hero_subtitle: "Conectando comunidades com vendedores locais.",
        hero_tagline: '"O local será visto, então será vendido"',
        hero_cta_primary: "Criar Perfil de Vendedor Grátis",
        hero_cta_secondary: "Procurar Vendedores →",
    },
    bn: {
        nav_home: "হোম",
        nav_about: "আমাদের সম্পর্কে",
        nav_browse: "বিক্রেতা খুঁজুন",
        nav_contact: "যোগাযোগ",
        nav_signup: "বিক্রেতা নিবন্ধন",
        hero_badge: "🚀 500+ স্থানীয় বিক্রেতাদের ক্ষমতায়ন",
        hero_title: "স্থানীয় রাস্তার বিক্রেতাদের জন্য<br>ডিজিটাল দৃশ্যমানতা",
        hero_subtitle: "স্থানীয় বিক্রেতাদের সাথে সম্প্রদায়গুলিকে সংযুক্ত করা।",
        hero_tagline: '"স্থানীয় দেখা যাবে, তাহলে বিক্রি হবে"',
        hero_cta_primary: "বিনামূল্যে বিক্রেতা প্রোফাইল তৈরি করুন",
        hero_cta_secondary: "বিক্রেতা খুঁজুন →",
    },
    ta: {
        nav_home: "முகப்பு",
        nav_about: "எங்களை பற்றி",
        nav_browse: "விற்பனையாளர்களைத் தேடு",
        nav_contact: "தொடர்பு",
        nav_signup: "விற்பனையாளர் பதிவு",
        hero_badge: "🚀 500+ உள்ளூர் விற்பனையாளர்களுக்கு அதிகாரம் அளித்தல்",
        hero_title: "உள்ளூர் தெரு விற்பனையாளர்களுக்கான<br>டிஜிட்டல் தெரிவுநிலை",
        hero_subtitle: "உள்ளூர் விற்பனையாளர்களுடன் சமூகங்களை இணைத்தல்.",
        hero_tagline: '"உள்ளூர் தெரியும், பின்னர் விற்கும்"',
        hero_cta_primary: "இலவச விற்பனையாளர் சுயவிவரத்தை உருவாக்கவும்",
        hero_cta_secondary: "விற்பனையாளர்களைத் தேடு →",
    },
    te: {
        nav_home: "హోమ్",
        nav_about: "మా గురించి",
        nav_browse: "విక్రేతలను శోధించండి",
        nav_contact: "సంప్రదించండి",
        nav_signup: "విక్రేత నమోదు",
        hero_badge: "🚀 500+ స్థానిక విక్రేతలకు అధికారం ఇవ్వడం",
        hero_title: "స్థానిక వీధి విక్రేతల కోసం<br>డిజిటల్ దృశ్యమానత",
        hero_subtitle: "స్థానిక విక్రేతలతో సంఘాలను కనెక్ట్ చేయడం.",
        hero_tagline: '"స్థానికం కనిపిస్తుంది, అప్పుడు అమ్ముడవుతుంది"',
        hero_cta_primary: "ఉచిత విక్రేత ప్రొఫైల్‌ను సృష్టించండి",
        hero_cta_secondary: "విక్రేతలను శోధించండి →",
    },
    mr: {
        nav_home: "मुख्यपृष्ठ",
        nav_about: "आमच्याबद्दल",
        nav_browse: "विक्रेते शोधा",
        nav_contact: "संपर्क",
        nav_signup: "विक्रेता नोंदणी",
        hero_badge: "🚀 500+ स्थानिक विक्रेत्यांना सशक्त करणे",
        hero_title: "स्थानिक रस्त्यावरील विक्रेत्यांसाठी<br>डिजिटल दृश्यमानता",
        hero_subtitle: "स्थानिक विक्रेत्यांसह समुदायांना जोडणे.",
        hero_tagline: '"स्थानिक दिसेल, तरच विकेल"',
        hero_cta_primary: "मोफत विक्रेता प्रोफाइल तयार करा",
        hero_cta_secondary: "विक्रेते शोधा →",
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "معلومات عنا",
        nav_browse: "تصفح البائعين",
        nav_contact: "اتصل",
        nav_signup: "تسجيل البائع",
        hero_badge: "🚀 تمكين أكثر من 500 بائع محلي",
        hero_title: "الرؤية الرقمية<br>لبائعي الشوارع المحليين",
        hero_subtitle: "ربط المجتمعات بالبائعين المحليين.",
        hero_tagline: '"المحلي سيُرى، ثم سيُباع"',
        hero_cta_primary: "إنشاء ملف تعريف بائع مجاني",
        hero_cta_secondary: "تصفح البائعين ←",
    },
    zh: {
        nav_home: "首页",
        nav_about: "关于我们",
        nav_browse: "浏览供应商",
        nav_contact: "联系我们",
        nav_signup: "供应商注册",
        hero_badge: "🚀 赋能500+本地供应商",
        hero_title: "本地街头供应商的<br>数字可见性",
        hero_subtitle: "将社区与本地供应商连接起来。",
        hero_tagline: '"本地可见，才能销售"',
        hero_cta_primary: "创建免费供应商资料",
        hero_cta_secondary: "浏览供应商 →",
    }
};

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('streetkart_language') || 'en';

// Translation function
function t(key) {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
}

// Get current language info
function getCurrentLanguageInfo() {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
}

// Toggle dropdown
function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    dropdown?.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const langSwitcher = document.querySelector('.lang-switcher');
    const dropdown = document.querySelector('.lang-dropdown');

    if (langSwitcher && dropdown && !langSwitcher.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Switch language function
function switchLanguage(langCode) {
    currentLanguage = langCode;
    localStorage.setItem('streetkart_language', langCode);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = t(key);
        } else {
            element.innerHTML = t(key);
        }
    });

    // Update current language display
    updateLanguageDisplay();

    // Close dropdown
    const dropdown = document.querySelector('.lang-dropdown');
    dropdown?.classList.remove('active');

    // Update active state
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-lang-code="${langCode}"]`)?.classList.add('active');

    // Show toast notification
    const langInfo = languages.find(l => l.code === langCode);
    if (window.ToastManager) {
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
    // Initialize language switcher
    initLanguageSwitcher();

    // Apply translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = t(key);
        } else {
            element.innerHTML = t(key);
        }
    });
});
