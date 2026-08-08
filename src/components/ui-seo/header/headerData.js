export const HEADER_STORAGE_KEY = 'nutmeals:seo-header';
export const headerFieldClass = 'h-10 w-full rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-sm text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/50 focus:bg-white-color/[6%]';

export const defaultHeader = {
  logo: '',
  navigationLinks: [
    { id: 'about', label: 'ABOUT', url: '/pages/about' },
    { id: 'shop', label: 'SHOP', url: '/shop' },
    { id: 'blog', label: 'BLOG', url: '/blog' },
  ],
  utilityIcons: [
    { id: 'cart', label: 'Cart', type: 'button', url: '', isVisible: true, outlineSvg: '', fillSvg: '' },
    { id: 'account', label: 'Account', type: 'link', url: '/account', isVisible: true, outlineSvg: '', fillSvg: '' },
    { id: 'search', label: 'Search', type: 'button', url: '', isVisible: true, outlineSvg: '', fillSvg: '' },
    { id: 'contact', label: 'Contact', type: 'link', url: 'tel:+919924455776', isVisible: true, outlineSvg: '', fillSvg: '' },
  ],
};
