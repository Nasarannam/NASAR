import { motion } from 'framer-motion';

export default function Navbar({ active, onLang, dark, onTheme }) {
  const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'];
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-sm font-semibold tracking-[0.3em] text-neon">NASAR</h1>
        <div className="hidden gap-4 md:flex">
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className={`text-xs uppercase ${active === id ? 'text-neon' : 'text-white/70'} transition`}>
              {id}
            </a>
          ))}
        </div>
        <div className="flex gap-2 text-xs">
          <button onClick={onLang} className="rounded-full bg-white/10 px-3 py-1">Lang</button>
          <button onClick={onTheme} className="rounded-full bg-white/10 px-3 py-1">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </motion.nav>
  );
}
