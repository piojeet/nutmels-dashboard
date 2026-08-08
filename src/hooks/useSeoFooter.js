import { useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { showAppToast } from '../utils/appToast';
import { defaultFooter, FOOTER_STORAGE_KEY } from '../components/ui-seo/footer/footerData';

const socialIconMap = { whatsapp: FaWhatsapp, instagram: FaInstagram, facebook: FaFacebookF, x: FaXTwitter, linkedin: FaLinkedinIn, youtube: FaYoutube };
const createLink = () => ({ id: crypto.randomUUID(), label: '', url: '' });
const createSocialLink = () => ({ id: crypto.randomUUID(), label: '', url: '', Icon: FiLink, outlineSvg: '', fillSvg: '' });

function hydrateFooter(savedFooter = defaultFooter) {
  return {
    ...defaultFooter,
    ...savedFooter,
    quickLinks: savedFooter.quickLinks?.map((link) => ({ ...link, id: link.id || crypto.randomUUID() })) || defaultFooter.quickLinks,
    policyLinks: savedFooter.policyLinks?.map((link) => ({ ...link, id: link.id || crypto.randomUUID() })) || defaultFooter.policyLinks,
    socialLinks: savedFooter.socialLinks?.map((social) => ({ ...social, Icon: socialIconMap[social.id] || FiLink, outlineSvg: social.outlineSvg || '', fillSvg: social.fillSvg || '' })) || defaultFooter.socialLinks.map((social) => ({ ...social, Icon: socialIconMap[social.id] })),
  };
}

function readSavedFooter() {
  try {
    const saved = localStorage.getItem(FOOTER_STORAGE_KEY);
    return hydrateFooter(saved ? JSON.parse(saved) : defaultFooter);
  } catch {
    return hydrateFooter();
  }
}

function toSerializableFooter(footer) {
  return { ...footer, socialLinks: footer.socialLinks.map(({ id, label, url, outlineSvg, fillSvg }) => ({ id, label, url, outlineSvg, fillSvg })) };
}

export function useSeoFooter() {
  const [footer, setFooter] = useState(readSavedFooter);
  const [pendingDeletion, setPendingDeletion] = useState(null);

  const updateFooter = (key, value) => setFooter((current) => ({ ...current, [key]: value }));
  const updateContact = (key, value) => setFooter((current) => ({ ...current, contact: { ...current.contact, [key]: value } }));
  const updateSocial = (id, key, value) => setFooter((current) => ({ ...current, socialLinks: current.socialLinks.map((social) => (social.id === id ? { ...social, [key]: value } : social)) }));
  const addLink = (collection) => setFooter((current) => ({ ...current, [collection]: [...current[collection], createLink()] }));
  const addSocial = () => setFooter((current) => ({ ...current, socialLinks: [...current.socialLinks, createSocialLink()] }));
  const requestDeletion = (type) => (id, label) => setPendingDeletion({ type, id, label });
  const cancelDeletion = () => setPendingDeletion(null);

  const confirmDeletion = () => {
    if (!pendingDeletion) return;
    const collection = pendingDeletion.type === 'quick' ? 'quickLinks' : pendingDeletion.type === 'policy' ? 'policyLinks' : 'socialLinks';
    setFooter((current) => ({ ...current, [collection]: current[collection].filter((item) => item.id !== pendingDeletion.id) }));
    cancelDeletion();
  };

  const uploadSocialSvg = (id, field, file) => {
    if (!file) return;
    if (file.type !== 'image/svg+xml') {
      showAppToast({ severity: 'warn', summary: 'UI/SEO', detail: 'Please upload an SVG file.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateSocial(id, field, reader.result);
    reader.readAsDataURL(file);
  };

  const saveFooter = () => {
    localStorage.setItem(FOOTER_STORAGE_KEY, JSON.stringify(toSerializableFooter(footer)));
    showAppToast({ severity: 'success', summary: 'UI/SEO', detail: 'Footer settings saved successfully.' });
  };

  return { footer, pendingDeletion, updateFooter, updateContact, updateSocial, addLink, addSocial, requestDeletion, cancelDeletion, confirmDeletion, uploadSocialSvg, saveFooter };
}
