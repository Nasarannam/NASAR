import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { nav: { about: 'About', projects: 'Projects', contact: 'Contact' }, heroCta: 'View Projects' } },
  hi: { translation: { nav: { about: 'परिचय', projects: 'प्रोजेक्ट्स', contact: 'संपर्क' }, heroCta: 'प्रोजेक्ट्स देखें' } },
};

i18n.use(initReactI18next).init({ resources, lng: 'en', fallbackLng: 'en' });
export default i18n;
