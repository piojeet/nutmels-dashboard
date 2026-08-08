export const FOOTER_STORAGE_KEY = 'nutmeals:seo-footer';
export const fieldClass = 'h-10 w-full rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-sm text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/50 focus:bg-white-color/[6%]';

export const defaultFooter = {
  aboutText: 'Our desire to change the world is derived from our impulse to introduce FOOD DIVERSITY to every person based on CULTURE, EARNING and CELEBRATION!',
  quickLinks: [{ id: 'home', label: 'Home', url: '/' }, { id: 'about', label: 'About', url: '/pages/about' }, { id: 'shop', label: 'Shop', url: '/shop' }, { id: 'blog', label: 'Blog', url: '/blog' }, { id: 'reviews', label: 'Reviews', url: '/reviews' }, { id: 'contact', label: 'Contact Support', url: '/contact' }],
  policyLinks: [{ id: 'terms', label: 'Terms of Service', url: '/terms' }, { id: 'privacy', label: 'Privacy Policy', url: '/privacy' }, { id: 'user-policy', label: 'User Policy', url: '/user-policy' }, { id: 'cookie-policy', label: 'Cookie Policy', url: '/cookie-policy' }, { id: 'shipping-return', label: 'Shipping & Returns', url: '/shipping-return' }, { id: 'cancellation-refund', label: 'Cancellation & Refund', url: '/cancellation-refund' }, { id: 'disclaimer', label: 'Disclaimer & Conditions', url: '/disclaimer' }],
  contact: {
    workingHours: 'Mon - Sat : 10:00 - 19:30',
    email: 'hello@nutmeals.com',
    phone: '+91 992 44 55 776',
    address: '34, GF, Satyam Mall, Near Mansi circle, Ahmedabad - 380015 Gujarat, India',
  },
  socialLinks: [
    { id: 'whatsapp', label: 'WhatsApp', url: '', outlineSvg: '', fillSvg: '' },
    { id: 'instagram', label: 'Instagram', url: '', outlineSvg: '', fillSvg: '' },
    { id: 'facebook', label: 'Facebook', url: '', outlineSvg: '', fillSvg: '' },
    { id: 'x', label: 'X', url: '', outlineSvg: '', fillSvg: '' },
    { id: 'linkedin', label: 'LinkedIn', url: '', outlineSvg: '', fillSvg: '' },
    { id: 'youtube', label: 'YouTube', url: '', outlineSvg: '', fillSvg: '' },
  ],
};
