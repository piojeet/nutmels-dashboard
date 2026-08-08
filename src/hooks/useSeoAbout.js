import { useState } from 'react';
import { showAppToast } from '../utils/appToast';
import { ABOUT_STORAGE_KEY, defaultAbout } from '../components/ui-seo/about/aboutData';

const createParagraph = () => ({ id: crypto.randomUUID(), text: '' });
const createWhyUsItem = () => ({ id: crypto.randomUUID(), label: '', iconSvg: '' });

function readSavedAbout() {
  try {
    const saved = localStorage.getItem(ABOUT_STORAGE_KEY);
    if (!saved) return defaultAbout;
    const parsed = JSON.parse(saved);
    return {
      ...defaultAbout,
      ...parsed,
      paragraphs: parsed.paragraphs?.map((item) => ({ ...item, id: item.id || crypto.randomUUID() })) || defaultAbout.paragraphs,
      whyUs: { ...defaultAbout.whyUs, ...parsed.whyUs, items: parsed.whyUs?.items?.map((item) => ({ ...item, id: item.id || crypto.randomUUID(), iconSvg: item.iconSvg || '' })) || defaultAbout.whyUs.items },
    };
  } catch {
    return defaultAbout;
  }
}

export function useSeoAbout() {
  const [about, setAbout] = useState(readSavedAbout);
  const [pendingDeletion, setPendingDeletion] = useState(null);
  const updateAbout = (key, value) => setAbout((current) => ({ ...current, [key]: value }));
  const updateWhyUs = (key, value) => setAbout((current) => ({ ...current, whyUs: { ...current.whyUs, [key]: value } }));
  const addParagraph = () => setAbout((current) => ({ ...current, paragraphs: [...current.paragraphs, createParagraph()] }));
  const addWhyUsItem = () => setAbout((current) => ({ ...current, whyUs: { ...current.whyUs, items: [...current.whyUs.items, createWhyUsItem()] } }));
  const requestDeletion = (type) => (id, label) => setPendingDeletion({ type, id, label });
  const cancelDeletion = () => setPendingDeletion(null);
  const confirmDeletion = () => {
    if (!pendingDeletion) return;
    setAbout((current) => pendingDeletion.type === 'paragraph' ? { ...current, paragraphs: current.paragraphs.filter((item) => item.id !== pendingDeletion.id) } : { ...current, whyUs: { ...current.whyUs, items: current.whyUs.items.filter((item) => item.id !== pendingDeletion.id) } });
    cancelDeletion();
  };
  const uploadSideMedia = (file) => uploadFile(file, ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'], (result) => setAbout((current) => ({ ...current, sideMedia: result, sideMediaType: file.type })), 'Please upload a supported image or video.');
  const uploadWhyUsIcon = (id, file) => uploadFile(file, ['image/svg+xml'], (result) => setAbout((current) => ({ ...current, whyUs: { ...current.whyUs, items: current.whyUs.items.map((item) => (item.id === id ? { ...item, iconSvg: result } : item)) } })), 'Please upload an SVG file.');
  const saveAbout = () => {
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(about));
    showAppToast({ severity: 'success', summary: 'UI/SEO', detail: 'About settings saved successfully.' });
  };
  return { about, pendingDeletion, updateAbout, updateWhyUs, addParagraph, addWhyUsItem, requestDeletion, cancelDeletion, confirmDeletion, uploadSideMedia, uploadWhyUsIcon, saveAbout };
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
