import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Code, Server, Database, Wrench } from 'lucide-react';
import { roles, stats, projects } from '../data/content';

export const Hero = () => (
  <section id="hero" className="relative flex min-h-screen items-center justify-center px-6">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,245,255,0.18),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(140,123,255,0.2),transparent_35%)]" />
    <div className="mx-auto max-w-4xl text-center">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-neon">Hello, I'm</motion.p>
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold md:text-7xl">Nasar Annam</motion.h2>
      <div className="mt-6 h-10 overflow-hidden text-xl text-white/80">
        <motion.div animate={{ y: [0, -40, -80, -120, 0] }} transition={{ repeat: Infinity, duration: 10 }}>
          {roles.concat(roles[0]).map((r, idx) => <p className="h-10" key={`${r}-${idx}`}>{r}</p>)}
        </motion.div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['View Projects', 'Download Resume', 'Contact Me'].map((btn) => <button key={btn} className="magnetic rounded-full border border-neon/40 bg-white/10 px-5 py-3 text-sm shadow-glow transition hover:-translate-y-1">{btn}</button>)}
      </div>
      <div className="mt-10 flex justify-center gap-4">
        {[Github, Linkedin, Mail].map((Icon, idx) => <Icon key={idx} className="h-5 w-5 text-white/80 transition hover:scale-125 hover:text-neon" />)}
      </div>
    </div>
  </section>
);

export const About = () => (
  <section id="about" className="section">
    <h3 className="title">About</h3>
    <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="card">Engineer blending clean Java architecture with cinematic UI engineering.</div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{stats.map((s)=><motion.div whileInView={{opacity:[0,1], y:[20,0]}} key={s.label} className="card text-center"><p className="text-4xl text-neon">{s.value}+</p><p>{s.label}</p></motion.div>)}</div>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-1 animate-pulseGlow rounded-3xl bg-gradient-to-r from-neon/40 to-violet/40 blur-xl" />
        <img src="/profile-photo.svg" alt="Nasar profile" className="relative w-full rounded-3xl border border-white/20 object-cover" loading="lazy" />
      </motion.div>
    </div>
  </section>
);

export const Skills = () => {
  const groups = { Frontend: ['React', 'Tailwind', 'Framer Motion'], Backend: ['Java', 'Spring Boot', 'Node'], Database: ['MySQL', 'PostgreSQL', 'MongoDB'], Tools: ['Git', 'Docker', 'Figma'] };
  const icons = [Code, Server, Database, Wrench];
  return <section id="skills" className="section"><h3 className="title">Skills</h3><div className="grid gap-4 md:grid-cols-2">{Object.entries(groups).map(([k,v],i)=>{const I=icons[i]; return <motion.div whileHover={{rotateX:4, rotateY:-4}} key={k} className="card"><div className="mb-3 flex items-center gap-2"><I className="text-neon"/><h4>{k}</h4></div>{v.map((s)=><div key={s} className="mb-2"><div className="text-sm">{s}</div><motion.div initial={{width:0}} whileInView={{width:'90%'}} className="h-1 rounded bg-gradient-to-r from-neon to-violet"/></div>)}</motion.div>})}</div><div className="mt-8 overflow-hidden whitespace-nowrap"><div className="inline-block min-w-full animate-marquee text-neon">React • Java • Spring • Tailwind • GSAP • Three.js • Framer Motion • UI Systems •</div></div></section>;
};

export const Projects = () => <section id="projects" className="section"><h3 className="title">Projects</h3><div className="grid gap-4 md:grid-cols-2">{projects.map((p)=><motion.div key={p.title} whileHover={{y:-8}} className="card"><p className="text-xs text-neon">{p.category}</p><h4 className="text-xl">{p.title}</h4><p className="text-white/70">{p.desc}</p><div className="mt-3 flex gap-3 text-sm"><button className="btn-sm">GitHub</button><button className="btn-sm">Live Demo <ArrowUpRight className="inline h-4"/></button></div></motion.div>)}</div></section>;
export const Experience = () => <section id="experience" className="section"><h3 className="title">Experience</h3><div className="relative border-l border-neon/40 pl-6"><div className="mb-6"><h4>Full Stack Java Intern</h4><p className="text-white/70">Magara Software • Jan 2025 - Present</p></div><div><h4>B.Tech CSE</h4><p className="text-white/70">Nassaraopeta Institute • 2022 - 2026</p></div></div></section>;
export const Services = () => <section id="services" className="section"><h3 className="title">Services</h3><div className="grid gap-4 md:grid-cols-3">{['Full Stack Apps','UI/UX Systems','Performance Optimization'].map((s)=><motion.div whileHover={{y:-6}} key={s} className="card">{s}</motion.div>)}</div></section>;
export const Testimonials = () => <section id="testimonials" className="section"><h3 className="title">Testimonials</h3><motion.div animate={{x:['0%','-50%']}} transition={{repeat:Infinity,duration:18,ease:'linear'}} className="flex gap-4">{['Nasar transformed our platform with elite code quality.','Incredible blend of backend rigor and frontend craft.','Reliable, creative, and deeply professional.'].map((t, idx)=><div key={`${t}-${idx}`} className="card min-w-[320px]">“{t}”</div>)}</motion.div></section>;
export const Contact = () => <section id="contact" className="section"><h3 className="title">Contact</h3><form className="card grid gap-4 md:grid-cols-2"><input className="input" placeholder="Name"/><input className="input" placeholder="Email"/><textarea className="input md:col-span-2" rows="4" placeholder="Message"/><button className="rounded-full bg-neon/20 px-6 py-3 text-neon md:col-span-2">Send via EmailJS</button></form></section>;
