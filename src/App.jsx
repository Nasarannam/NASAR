import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Moon, Sun, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Full Stack Developer', 'Java Developer', 'UI/UX Designer', 'Problem Solver'];
const skills = { Frontend: ['React', 'Tailwind', 'TypeScript'], Backend: ['Java', 'Node', 'Spring'], Database: ['PostgreSQL', 'MySQL', 'MongoDB'], Tools: ['Git', 'Docker', 'Figma'] };
const projects = ['Hotel Management System', 'Student Management System', 'Expense Tracker', 'AI Song Recommendation System'];

function SectionTitle({ t }) { return <h2 className="text-3xl md:text-5xl font-semibold mb-10 gradient-text">{t}</h2>; }

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState('hero');
  const [role, setRole] = useState(roles[0]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    const i = setInterval(() => setRole((r) => roles[(roles.indexOf(r) + 1) % roles.length]), 1800);
    gsap.utils.toArray('.reveal').forEach((el) => gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }));
    return () => clearInterval(i);
  }, [dark]);

  const nav = useMemo(() => ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'], []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-base">
      <div className="fixed inset-0 -z-10 opacity-35"><Canvas><Stars radius={100} depth={50} count={4000} factor={4} fade speed={1} /></Canvas></div>
      <header className="fixed w-full top-0 z-50 px-6 py-4"><nav className="glass rounded-2xl px-5 py-3 flex justify-between items-center"><span className="font-bold">NASAR</span><div className="hidden md:flex gap-4">{nav.map((n) => <a key={n} href={`#${n}`} className={`${active === n ? 'text-cyan' : 'text-white/70'} capitalize`}>{n}</a>)}</div><button onClick={() => setDark((v) => !v)}>{dark ? <Sun /> : <Moon />}</button></nav></header>

      <section id="hero" className="h-screen section flex flex-col justify-center">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-8xl font-bold">Nasar <span className="gradient-text">Annam</span></motion.h1>
        <p className="text-2xl md:text-3xl mt-5 text-white/90 h-10">{role}</p>
        <div className="flex gap-3 mt-8"><button className="px-5 py-3 rounded-xl glass shadow-glow">View Projects</button><button className="px-5 py-3 rounded-xl border border-cyan/50">Download Resume</button><button className="px-5 py-3 rounded-xl border border-white/30">Contact Me</button></div>
        <div className="flex gap-3 mt-8">{[Github, Linkedin, Mail].map((I, i) => <I key={i} className="hover:text-cyan transition" />)}</div>
      </section>

      <section id="about" className="section reveal"><SectionTitle t="About" /><div className="grid md:grid-cols-2 gap-8"><div className="glass p-6 rounded-2xl">Driven software developer creating scalable and beautiful products with a mix of engineering rigor and aesthetic design sense.</div><div className="grid grid-cols-3 gap-3">{[['4+', 'Years'], ['35+', 'Projects'], ['25+', 'Tech']].map((s) => <div key={s[1]} className="glass rounded-xl p-4 text-center"><div className="text-3xl font-bold gradient-text">{s[0]}</div><p>{s[1]}</p></div>)}</div></div></section>

      <section id="skills" className="section reveal"><SectionTitle t="Skills" /><div className="grid md:grid-cols-2 gap-4">{Object.entries(skills).map(([k, arr]) => <div key={k} className="glass rounded-2xl p-5"><h3 className="text-xl mb-3">{k}</h3>{arr.map((a) => <div key={a}><div className="flex justify-between"><span>{a}</span><span>90%</span></div><div className="h-2 bg-white/10 rounded"><div className="h-full rounded bg-gradient-to-r from-neon to-cyan w-[90%]" /></div></div>)}</div>)}</div></section>

      <section id="projects" className="section reveal"><SectionTitle t="Projects" /><div className="grid md:grid-cols-2 gap-6">{projects.map((p) => <div key={p} className="glass p-6 rounded-2xl hover:-translate-y-2 transition"><h3 className="text-2xl">{p}</h3><p className="text-white/70 mt-3">Premium architecture with high performance, clean APIs, and delightful UX.</p></div>)}</div></section>

      <section id="experience" className="section reveal"><SectionTitle t="Experience" /><div className="border-l border-cyan/40 pl-6 space-y-8">{['Full Stack Java Intern - Mauqa Software', 'Open source contributor', 'Freelance web developer'].map((e) => <div key={e}><h4 className="font-semibold">{e}</h4><p className="text-white/70">Delivered measurable impact with robust code quality and product-centric execution.</p></div>)}</div></section>

      <section id="services" className="section reveal"><SectionTitle t="Services" /><div className="grid md:grid-cols-3 gap-4">{['Web App Development', 'UI/UX Design', 'Performance Optimization'].map((s) => <div key={s} className="glass rounded-2xl p-6 hover:shadow-glow transition">{s}</div>)}</div></section>
      <section id="testimonials" className="section reveal"><SectionTitle t="Testimonials" /><div className="glass rounded-2xl p-6">“Professional, creative, and exceptionally detail-oriented. Delivered a world-class experience.”</div></section>
      <section id="contact" className="section reveal"><SectionTitle t="Contact" /><form className="glass rounded-2xl p-6 grid gap-4"><input placeholder="Name" className="bg-transparent border-b border-white/30 p-3" /><input placeholder="Email" className="bg-transparent border-b border-white/30 p-3" /><textarea placeholder="Message" className="bg-transparent border-b border-white/30 p-3" /><button className="px-5 py-3 rounded-xl bg-gradient-to-r from-neon to-cyan">Send with EmailJS</button></form></section>

      <button className="fixed right-6 bottom-6 p-3 rounded-full glass" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp /></button>
      <footer className="section pt-6 text-center text-white/60">© 2026 Nasar Annam · Crafted with React, Tailwind, Framer Motion, GSAP & Three.js</footer>
    </div>
  );
}
