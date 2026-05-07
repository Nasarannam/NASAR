import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import ThreeHero from './components/ThreeHero';
import { About, Contact, Experience, Hero, Projects, Services, Skills, Testimonials } from './components/Sections';
import { useActiveSection } from './hooks/useActiveSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const sectionIds = useMemo(() => ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'], []);
  const active = useActiveSection(sectionIds);
  const [dark, setDark] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.fromTo(section, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: 'top 80%' } });
    });
  }, []);

  return (
    <div className={`${dark ? 'dark' : ''} bg-base text-white`}>
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(120deg,#070b14,#10192e,#120e22)]" />
      <Navbar active={active} onLang={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')} dark={dark} onTheme={() => setDark((d) => !d)} />
      <ThreeHero />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Testimonials />
      <Contact />
      <a href="#hero" className="fixed bottom-6 right-6 rounded-full border border-neon/40 bg-black/40 px-4 py-2 text-neon">↑ Top</a>
    </div>
  );
}
