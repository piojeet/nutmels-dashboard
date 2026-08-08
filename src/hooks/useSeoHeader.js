import { useState } from 'react';
import { FiLink, FiPhone, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { showAppToast } from '../utils/appToast';
import { defaultHeader, HEADER_STORAGE_KEY } from '../components/ui-seo/header/headerData';

const utilityIconMap = { cart: FiShoppingCart, account: FiUser, search: FiSearch, contact: FiPhone };
const createNavLink = () => ({ id: crypto.randomUUID(), label: '', url: '' });
const createUtilityIcon = () => ({ id: crypto.randomUUID(), label: '', type: 'button', url: '', isVisible: true, outlineSvg: '', fillSvg: '', Icon: FiLink });

function hydrateHeader(savedHeader = defaultHeader) {
  return {
    ...defaultHeader,
    ...savedHeader,
    navigationLinks: savedHeader.navigationLinks?.map((link) => ({ ...link, id: link.id || crypto.randomUUID() })) || defaultHeader.navigationLinks,
    utilityIcons: savedHeader.utilityIcons?.map((item) => ({ ...item, Icon: utilityIconMap[item.id] || FiLink, outlineSvg: item.outlineSvg || '', fillSvg: item.fillSvg || '' })) || defaultHeader.utilityIcons.map((item) => ({ ...item, Icon: utilityIconMap[item.id] })),
  };
}

function readSavedHeader() {
  try {
    const saved = localStorage.getItem(HEADER_STORAGE_KEY);
    return hydrateHeader(saved ? JSON.parse(saved) : defaultHeader);
  } catch {
    return hydrateHeader();
  }
}

export function useSeoHeader() {
  const [header, setHeader] = useState(readSavedHeader);
  const [pendingDeletion, setPendingDeletion] = useState(null);
  const updateHeader = (key, value) => setHeader((current) => ({ ...current, [key]: value }));
  const updateUtilityIcon = (id, key, value) => setHeader((current) => ({ ...current, utilityIcons: current.utilityIcons.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const addNavLink = () => setHeader((current) => ({ ...current, navigationLinks: [...current.navigationLinks, createNavLink()] }));
  const addUtilityIcon = () => setHeader((current) => ({ ...current, utilityIcons: [...current.utilityIcons, createUtilityIcon()] }));
  const requestDeletion = (type) => (id, label) => setPendingDeletion({ type, id, label });
  const cancelDeletion = () => setPendingDeletion(null);
  const confirmDeletion = () => {
    if (!pendingDeletion) return;
    const collection = pendingDeletion.type === 'navigation' ? 'navigationLinks' : 'utilityIcons';
    setHeader((current) => ({ ...current, [collection]: current[collection].filter((item) => item.id !== pendingDeletion.id) }));
    cancelDeletion();
  };
  const uploadLogo = (file) => uploadFile(file, ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'], (result) => updateHeader('logo', result), 'Please upload a PNG, JPG, WEBP, or SVG logo.');
  const uploadUtilitySvg = (id, field, file) => uploadFile(file, ['image/svg+xml'], (result) => updateUtilityIcon(id, field, result), 'Please upload an SVG file.');
  const saveHeader = () => {
    const serializable = {
      ...header,
      utilityIcons: header.utilityIcons.map((item) => ({
        id: item.id,
        label: item.label,
        type: item.type,
        url: item.url,
        isVisible: item.isVisible,
        outlineSvg: item.outlineSvg,
        fillSvg: item.fillSvg,
      })),
    };
    localStorage.setItem(HEADER_STORAGE_KEY, JSON.stringify(serializable));
    showAppToast({ severity: 'success', summary: 'UI/SEO', detail: 'Header settings saved successfully.' });
  };
  return { header, pendingDeletion, updateHeader, updateUtilityIcon, addNavLink, addUtilityIcon, requestDeletion, cancelDeletion, confirmDeletion, uploadLogo, uploadUtilitySvg, saveHeader };
}

function uploadFile(file, acceptedTypes, onLoad, errorMessage) {
  if (!file) return;
  if (!acceptedTypes.includes(file.type)) {
    showAppToast({ severity: 'warn', summary: 'UI/SEO', detail: errorMessage });
    return;
  }
  const reader = new FileReader();
  reader.onload = () => onLoad(reader.result);
  reader.readAsDataURL(file);
}
