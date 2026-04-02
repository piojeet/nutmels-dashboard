import { FiCloud, FiDatabase, FiShield } from "react-icons/fi";

export const SETTING_TABS = [
  { id: "currency", label: "Currency" },
  { id: "address", label: "Address" },
  { id: "languages", label: "Languages" },
  { id: "social", label: "Social login" },
  { id: "smtp", label: "SMTP setting" },
  { id: "analytics", label: "Analytics" },
  { id: "payment", label: "Payment" },
  { id: "media", label: "Media storage" },
  { id: "misc", label: "Miscellaneous" },
  { id: "plugins", label: "Plugins" },
  { id: "cache", label: "Clear cache" },
];

export const LANGUAGE_ROWS = [
  { id: 1, name: "English", code: "en", direction: "LTR", isDefault: true, status: "Public", order: 5 },
  { id: 2, name: "Turkish", code: "tr", direction: "LTR", isDefault: false, status: "Public", order: 4 },
  { id: 3, name: "Hindi", code: "hi", direction: "LTR", isDefault: false, status: "Public", order: 3 },
  { id: 4, name: "Arabic", code: "ar", direction: "RTL", isDefault: false, status: "Public", order: 2 },
  { id: 5, name: "French", code: "fr", direction: "LTR", isDefault: false, status: "Draft", order: 1 },
];

const CACHE_PRESETS = [
  {
    id: "views",
    title: "View cache",
    description: "Compiled dashboard and storefront templates.",
    lastCleared: "12 min ago",
    icon: FiDatabase,
  },
  {
    id: "media",
    title: "Image cache",
    description: "Resized thumbnails and generated media variants.",
    lastCleared: "Today, 09:20",
    icon: FiCloud,
  },
  {
    id: "sessions",
    title: "Session cache",
    description: "Temporary carts, admin tokens and runtime sessions.",
    lastCleared: "Yesterday",
    icon: FiShield,
  },
];

export function createCurrencyForm() {
  return {
    currency: "United States Dollar",
    position: "Left",
    format: "US English (1,234,567.89)",
  };
}

export function createAddressForm() {
  return {
    email: "webzedcontact@gmail.com",
    phone: "4534345656",
    address1: "House 4/3, Road: 34, Bronx, NY",
    address2: "",
    city: "New York",
    state: "New York",
    zip: "78947",
    country: "USA",
  };
}

export function createLanguageControls() {
  return {
    sortBy: "recent",
    direction: "desc",
    action: "all",
    search: "",
  };
}

export function createSocialForm() {
  return {
    googleEnabled: true,
    googleClientId: "********************************",
    googleClientSecret: "**************",
    facebookEnabled: true,
    facebookClientId: "************",
    facebookClientSecret: "**************",
  };
}

export function createSmtpForm() {
  return {
    host: "smtp.gmail.com",
    port: "465",
    encryption: "SSL",
    username: "webzedcontact@gmail.com",
    password: "webzed-secret",
    from: "webzedcontact@gmail.com",
  };
}

export function createAnalyticsForm() {
  return {
    googleEnabled: false,
    googleAnalyticsId: "G-**********",
    facebookEnabled: false,
    facebookPixelId: "516935765764356",
  };
}

export function createPaymentSettings() {
  return {
    defaultMethod: "Stripe",
    methods: [
      {
        id: "cod",
        name: "Cash on delivery",
        summary: "Offline payment collected after order fulfilment.",
        enabled: true,
        expanded: false,
        fields: [],
      },
      {
        id: "paypal",
        name: "Paypal",
        summary: "Global wallet payments with sandbox-ready credentials.",
        enabled: true,
        expanded: false,
        fields: [
          { key: "clientId", label: "Client ID", value: "paypal-client-id" },
          { key: "secret", label: "Secret", value: "paypal-secret-key" },
        ],
      },
      {
        id: "stripe",
        name: "Stripe",
        summary: "Card payments, Apple Pay and fast checkout methods.",
        enabled: true,
        expanded: true,
        fields: [
          { key: "publishable", label: "Publishable key", value: "pk_live_********" },
          { key: "secret", label: "Secret key", value: "sk_live_********" },
        ],
      },
      {
        id: "razorpay",
        name: "Razorpay",
        summary: "UPI, cards and wallet support for India-focused flows.",
        enabled: true,
        expanded: false,
        fields: [
          { key: "keyId", label: "Key ID", value: "rzp_live_********" },
          { key: "keySecret", label: "Key secret", value: "razorpay-secret" },
        ],
      },
      {
        id: "bank",
        name: "Bank payment",
        summary: "Manual transfer instructions with settlement notes.",
        enabled: true,
        expanded: false,
        fields: [
          { key: "accountName", label: "Account name", value: "NutMeals Pvt Ltd" },
          { key: "accountNumber", label: "Account number", value: "XXXX-XXXX-2456" },
        ],
      },
    ],
  };
}

export function createMediaForm() {
  return {
    storage: "Google cloud storage",
    thumbPrefix: "thumb-",
    defaultImage: "default-image.webp",
    cdnUrl: "https://cdn.ishop.cholobangla.com/",
    projectId: "****************",
    bucket: "*******",
    pathPrefix: "******",
  };
}

export function createMiscForm() {
  return {
    guestCheckout: true,
    cookieBanner: true,
    vendorRegistration: true,
    attachPdf: true,
    translatePdf: false,
    sellerEmail: false,
    country: "Afghanistan",
    region: "Badakhshan",
  };
}

export function createPlugins() {
  return [
    {
      id: "pos",
      name: "POS plugin",
      description: "Counter billing, barcode flow and quick cart actions for in-store purchases.",
      active: true,
    },
  ];
}

export function createCacheTargets() {
  return CACHE_PRESETS.map((item, index) => ({ ...item, selected: index !== 2 }));
}
